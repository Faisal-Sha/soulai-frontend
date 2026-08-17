import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createAdminClient } from "../_shared/supabase-client.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { calcMatrix } from "../_shared/core/calc.ts";
import { generateReading } from "../_shared/ai/generate-reading-service.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl      = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    const body = await req.json();
    // planType is accepted for backwards-compat but ignored — all users get the same standard reading.
    const { userId, leadId, topic } = body;

    console.log(`[GenerateReading] Request for user ${userId}, lead ${leadId}`);

    if (!userId) {
      throw new Error("Missing userId");
    }

    const supabase = createAdminClient();

    /** Normalize any common DOB shape → YYYY-MM-DD */
    const toIsoDob = (input: unknown): string | null => {
      if (input == null || input === "") return null;

      // Postgres date / ISO string / timestamp
      if (typeof input === "string") {
        const s = input.trim();
        const iso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
        if (iso) {
          return `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;
        }
        const dmy = s.match(/^(\d{1,2})[./\-](\d{1,2})[./\-](\d{4})$/);
        if (dmy) {
          return `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`;
        }
        return null;
      }

      // Quiz stores { day, month, year } as strings OR numbers
      if (typeof input === "object") {
        const b = input as Record<string, unknown>;
        const day = b.day ?? b.d ?? b.DD;
        const month = b.month ?? b.m ?? b.MM;
        const year = b.year ?? b.y ?? b.YYYY;
        if (day != null && month != null && year != null) {
          const ds = String(day).trim();
          const ms = String(month).trim();
          const ys = String(year).trim();
          if (ds && ms && ys && /^\d+$/.test(ds) && /^\d+$/.test(ms) && /^\d{4}$/.test(ys)) {
            return `${ys}-${ms.padStart(2, "0")}-${ds.padStart(2, "0")}`;
          }
        }
      }
      return null;
    };

    const dobFromAnswers = (answers: unknown): string | null => {
      let raw: unknown = answers;
      if (typeof raw === "string") {
        try {
          raw = JSON.parse(raw);
        } catch {
          return null;
        }
      }
      if (!raw || typeof raw !== "object") return null;
      const a = raw as Record<string, unknown>;
      return (
        toIsoDob(a.birthdate) ||
        toIsoDob(a.birthDate) ||
        toIsoDob(a.dob) ||
        toIsoDob(a.date_of_birth) ||
        toIsoDob(a.dateOfBirth) ||
        null
      );
    };

    const matrixFromSnapshot = (content: any) => {
      const s = content?.matrixSnapshot;
      if (!s || s.a == null || s.x1 == null || s.d1 == null) return null;
      // Full matrix isn't stored — but calc needs DOB. We only need partner points for AI;
      // rebuild a minimal usable MatrixValues by recalculating if we later get DOB.
      return s as { a: number; d1: number; x: number; x1: number; e1: number; e2: number };
    };

    // ── 1. Fetch profile + existing reading + optional lead ───────────────────
    const [{ data: profile }, { data: existingReading }, { data: lead }] = await Promise.all([
      supabase.from("profiles").select("full_name, dob, email").eq("id", userId).maybeSingle(),
      supabase
        .from("readings")
        .select("id, status, updated_at, content, pdf_url, lead_id")
        .eq("user_id", userId)
        .maybeSingle(),
      leadId
        ? supabase.from("quiz_leads").select("*").eq("id", leadId).maybeSingle()
        : Promise.resolve({ data: null }),
    ]);

    // Auth email fallback (profiles.email is often null)
    let userEmail = (profile?.email || "").trim() || null;
    if (!userEmail) {
      try {
        const { data: authData } = await supabase.auth.admin.getUserById(userId);
        userEmail = authData?.user?.email || null;
        if (userEmail) {
          console.log(`[GenerateReading] Got email from auth.users: ${userEmail}`);
          void supabase.from("profiles").update({ email: userEmail }).eq("id", userId);
        }
      } catch (e: any) {
        console.warn(`[GenerateReading] auth email lookup failed:`, e?.message || e);
      }
    }

    console.log(`[GenerateReading] DOB probe start`, {
      userId,
      profileDob: profile?.dob ?? null,
      profileDobType: profile?.dob == null ? "null" : typeof profile.dob,
      email: userEmail,
      leadId: leadId || null,
      readingLeadId: (existingReading as any)?.lead_id || null,
      readingMetaDob: (existingReading?.content as any)?.metadata?.dob || null,
      hasMatrixSnapshot: !!matrixFromSnapshot(existingReading?.content),
    });

    let dob: string | null = toIsoDob(profile?.dob);
    if (profile?.dob && !dob) {
      console.warn(`[GenerateReading] profile.dob present but unparseable:`, profile.dob);
    }
    const fullName = profile?.full_name || "Valued User";
    let quizAnswers: Record<string, unknown> = (lead?.answers as Record<string, unknown>) || {};
    let resolvedLeadId: string | null = leadId || (existingReading as any)?.lead_id || lead?.id || null;

    // From request lead answers
    if (!dob) {
      dob = dobFromAnswers(quizAnswers);
      if (dob) console.log(`[GenerateReading] DOB from request lead answers: ${dob}`);
    }

    // From existing reading metadata (V1→V2 regen)
    if (!dob) {
      dob = toIsoDob((existingReading?.content as any)?.metadata?.dob);
      if (dob) console.log(`[GenerateReading] DOB from reading metadata: ${dob}`);
    }

    // From reading.lead_id / request leadId
    if (!dob && resolvedLeadId) {
      const { data: linkedLead } = await supabase
        .from("quiz_leads")
        .select("id, answers, email, user_id")
        .eq("id", resolvedLeadId)
        .maybeSingle();
      dob = dobFromAnswers(linkedLead?.answers);
      if (dob) {
        quizAnswers = (linkedLead?.answers as Record<string, unknown>) || quizAnswers;
        console.log(`[GenerateReading] DOB from linked lead ${resolvedLeadId}: ${dob}`);
      }
    }

    // From recent quiz_leads by user_id
    if (!dob) {
      const { data: recentLeads } = await supabase
        .from("quiz_leads")
        .select("id, answers")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

      for (const row of recentLeads || []) {
        dob = dobFromAnswers(row?.answers);
        if (dob) {
          quizAnswers = (row.answers as Record<string, unknown>) || quizAnswers;
          resolvedLeadId = row.id || resolvedLeadId;
          console.log(`[GenerateReading] DOB from user quiz_leads: ${dob}`);
          break;
        }
      }
    }

    // From quiz_leads by email (older leads often lack user_id)
    if (!dob && userEmail) {
      const { data: emailLeads } = await supabase
        .from("quiz_leads")
        .select("id, answers, user_id")
        .ilike("email", userEmail)
        .order("created_at", { ascending: false })
        .limit(10);

      for (const row of emailLeads || []) {
        dob = dobFromAnswers(row?.answers);
        if (dob) {
          quizAnswers = (row.answers as Record<string, unknown>) || quizAnswers;
          resolvedLeadId = row.id || resolvedLeadId;
          console.log(`[GenerateReading] DOB from email quiz_leads: ${dob}`);
          if (!row.user_id) {
            void supabase.from("quiz_leads").update({ user_id: userId }).eq("id", row.id);
          }
          break;
        }
      }
    }

    // Always backfill profile.dob when we found one
    if (dob && !toIsoDob(profile?.dob)) {
      const { error: dobUpErr } = await supabase.from("profiles").update({ dob }).eq("id", userId);
      if (dobUpErr) console.warn(`[GenerateReading] profile.dob backfill failed:`, dobUpErr.message);
      else console.log(`[GenerateReading] Backfilled profile.dob=${dob}`);
    }

    // ── 2. Matrix: prefer DOB calc; else reuse existing snapshot for regen ────
    let matrix: ReturnType<typeof calcMatrix> | null = null;

    if (dob) {
      const [year, month, day] = dob.split("-").map(Number);
      if (year && month && day) {
        matrix = calcMatrix({ day, month, year });
      }
    }

    if (!matrix) {
      const snap = matrixFromSnapshot(existingReading?.content);
      if (snap) {
        // Rebuild full matrix from DOB if we somehow get it later; for now use calc with a
        // synthetic date is wrong. Instead: require DOB OR expand generateReading to accept snapshot.
        // Practical path: if we have snapshot points, invent matrix via a known DOB is bad.
        // Re-calc is mandatory for full MatrixValues — so try harder OR use snap by recomputing
        // from reading content if full matrix was never stored.
        console.warn(`[GenerateReading] No DOB — cannot calc full matrix. snapshot=`, snap);
      }
    }

    if (!dob || !matrix) {
      console.error(`[GenerateReading] DOB unresolved for user ${userId}`, {
        hasProfileDob: !!profile?.dob,
        parsedProfileDob: toIsoDob(profile?.dob),
        hasLeadId: !!resolvedLeadId,
        hasReadingMeta: !!(existingReading?.content as any)?.metadata?.dob,
        email: userEmail,
        quizBirthdateSample: (quizAnswers as any)?.birthdate ?? null,
      });
      throw new Error(
        "Date of birth is required to generate a reading. Please ensure the quiz was completed, or set DOB on your profile.",
      );
    }

    console.log(`[GenerateReading] DOB resolved: ${dob}`);

    // ── 3. Concurrency / duplicate guard (existingReading already fetched) ────
    if (existingReading) {
      const existingFormat = (existingReading.content as any)?.format;
      const isCurrentPartnerFormat = existingFormat === "partner_v2";

      if (existingReading.status === "ready" && existingReading.content && isCurrentPartnerFormat) {
        console.log(`[GenerateReading] Partner reading already ready for ${userId}. Skipping.`);

        // Patch metadata.dob on existing content if missing (fixes Born — on /reading)
        const meta = (existingReading.content as any)?.metadata || {};
        if (!meta.dob && dob) {
          const patched = {
            ...(existingReading.content as any),
            metadata: { ...meta, dob, fullName },
          };
          await supabase.from("readings").update({ content: patched }).eq("id", existingReading.id);
          console.log(`[GenerateReading] Patched reading metadata.dob=${dob}`);
        }

        // Trigger PDF if not yet generated
        if (!existingReading.pdf_url) {
          triggerPdf(supabaseUrl, supabaseServiceKey, userId, existingReading);
        }

        return new Response(
          JSON.stringify({ success: true, message: "Reading already ready", readingId: existingReading.id }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
        );
      }

      if (existingReading.status === "ready" && existingReading.content && !isCurrentPartnerFormat) {
        console.log(`[GenerateReading] Older reading format (${existingFormat}) found for ${userId}. Regenerating as partner_v2.`);
      }

      if (existingReading.status === "generating") {
        const age = Date.now() - new Date(existingReading.updated_at).getTime();
        if (age < 10 * 60 * 1000) {
          console.log(`[GenerateReading] Already generating for ${userId}. Skipping.`);
          return new Response(
            JSON.stringify({ success: true, message: "Already generating" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
          );
        }
      }
    }

    // ── 4. Mark as generating ─────────────────────────────────────────────────
    // Clear old PDF when regenerating so partner_v2 content gets a fresh PDF.
    await supabase
      .from("readings")
      .upsert(
        {
          user_id: userId,
          status: "generating",
          pdf_url: null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );

    // ── 5. Generate AI reading (standard — same for all users) ────────────────
    console.log(`[GenerateReading] Calling AI service for ${userId}...`);
    const readingJson = await generateReading({
      userId,
      planType: "standard",   // fixed — no plan-based branching
      matrix,
      dob,
      fullName,
      topic,
      quizAnswers,
    });

    // ── 6. Persist result ─────────────────────────────────────────────────────
    const { data: reading, error: dbError } = await supabase
      .from("readings")
      .upsert(
        {
          user_id:    userId,
          lead_id:    resolvedLeadId || leadId || lead?.id || (existingReading as any)?.lead_id || null,
          plan_type:  "standard",
          content:    readingJson,
          status:     "ready",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      )
      .select()
      .maybeSingle();

    if (dbError) throw dbError;

    console.log(`[GenerateReading] Reading ${reading?.id} ready for user ${userId}`);

    // ── 7. Trigger PDF generation ─────────────────────────────────────────────
    if (reading) {
      await triggerPdf(supabaseUrl, supabaseServiceKey, userId, reading);
    }

    return new Response(
      JSON.stringify({ success: true, readingId: reading?.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );

  } catch (error: any) {
    console.error(`[GenerateReading] Error: ${error.message}`);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 },
    );
  }
});

// ── Helper: fire-and-forget PDF trigger ──────────────────────────────────────
async function triggerPdf(url: string, key: string, uid: string, rd: any) {
  if (!rd?.id) return;
  console.log(`[GenerateReading] Triggering PDF for reading ${rd.id}...`);
  try {
    const res = await fetch(`${url}/functions/v1/generate-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`,
      },
      body: JSON.stringify({ userId: uid, readingId: rd.id }),
    });
    console.log(`[GenerateReading] PDF trigger handshake: ${res.status}`);
  } catch (err: any) {
    console.warn(`[GenerateReading] PDF trigger failed: ${err.message}`);
  }
}
