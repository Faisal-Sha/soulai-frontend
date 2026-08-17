import { createAdminClient, createUserClient } from "../_shared/supabase-client.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { hasDeepDiveAccess } from "../_shared/deep-dive-access.ts";
import { generateCompatibilityReport } from "../_shared/ai/generate-compatibility-report-service.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status,
    });

  try {
    const userClient = createUserClient(req);
    const { data: { user }, error: authErr } = await userClient.auth.getUser();

    if (authErr || !user) {
      return json({ error: "Please sign in to generate your report." }, 401);
    }

    const admin = createAdminClient();

    if (!(await hasDeepDiveAccess(admin, user.id))) {
      return json({ error: "Compatibility Deep-Dive is not available on your plan." }, 403);
    }

    const body = await req.json();
    const {
      personAName,
      personBName,
      personADob,
      personBDob,
      compatibility,
      combinedMatrix,
      language = "en",
    } = body;

    if (!personADob || !personBDob || !compatibility || !combinedMatrix) {
      return json({ error: "Missing required compatibility data." }, 400);
    }

    const title = `${personAName || "Person A"} & ${personBName || "Person B"}`;

    const { data: row, error: insertErr } = await admin
      .from("compatibility_reports")
      .insert({
        user_id: user.id,
        title,
        person_a_name: personAName || null,
        person_b_name: personBName || null,
        person_a_dob: personADob,
        person_b_dob: personBDob,
        matrix_data: { compatibility, combinedMatrix },
        status: "processing",
      })
      .select("id")
      .single();

    if (insertErr || !row) {
      console.error("[generate-compatibility-report] insert:", insertErr?.message);
      return json({ error: "Failed to create report record." }, 500);
    }

    const reportId = row.id;

    try {
      const content = await generateCompatibilityReport({
        personAName: personAName || "Person A",
        personBName: personBName || "Person B",
        personADob,
        personBDob,
        compatibility,
        combinedMatrix,
        language: language === "ru" ? "ru" : "en",
      });

      await admin
        .from("compatibility_reports")
        .update({ content, status: "ready" })
        .eq("id", reportId);

      return json({ success: true, reportId, status: "ready" });
    } catch (genErr: { message?: string }) {
      console.error("[generate-compatibility-report] AI:", genErr.message);
      await admin
        .from("compatibility_reports")
        .update({ status: "failed" })
        .eq("id", reportId);
      return json({ error: genErr.message || "Report generation failed.", reportId }, 500);
    }
  } catch (err: { message?: string }) {
    console.error("[generate-compatibility-report]", err.message);
    return json({ error: err.message || "Unexpected error" }, 500);
  }
});
