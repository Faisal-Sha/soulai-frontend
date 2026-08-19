import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createAdminClient, createUserClient } from "../_shared/supabase-client.ts";

type ErrorCode =
  | "unauthorized"
  | "reading_not_found"
  | "forbidden"
  | "pdf_not_ready";

function json(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  if (req.method !== "POST") {
    return json({ code: "method_not_allowed", message: "POST required" }, 405);
  }

  try {
    const userClient = createUserClient(req);
    const {
      data: { user },
      error: authError,
    } = await userClient.auth.getUser();

    if (authError || !user) {
      return json(
        {
          code: "unauthorized" satisfies ErrorCode,
          message: "Please sign in to download your report.",
        },
        401,
      );
    }

    let body: { readingId?: string } = {};
    try {
      body = await req.json();
    } catch {
      // empty body is fine — use latest reading for user
    }

    const admin = createAdminClient();

    let reading: { id: string; user_id: string; pdf_generated_at: string | null } | null =
      null;

    if (body.readingId) {
      const { data, error } = await admin
        .from("readings")
        .select("id, user_id, pdf_generated_at")
        .eq("id", body.readingId)
        .maybeSingle();

      if (error) throw error;
      reading = data;

      if (reading && reading.user_id !== user.id) {
        return json(
          {
            code: "forbidden" satisfies ErrorCode,
            message: "You do not have access to this report.",
          },
          403,
        );
      }
    } else {
      const { data, error } = await admin
        .from("readings")
        .select("id, user_id, pdf_generated_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      reading = data;
    }

    if (!reading) {
      return json(
        {
          code: "reading_not_found" satisfies ErrorCode,
          message: "We could not find a reading for your account.",
        },
        404,
      );
    }

    if (!reading.pdf_generated_at) {
      return json(
        {
          code: "pdf_not_ready" satisfies ErrorCode,
          message: "Your PDF is still being prepared. Please try again in a few minutes.",
        },
        409,
      );
    }

    const filePath = `${reading.user_id}/${reading.id}.pdf`;
    const { data: fileData, error: downloadErr } = await admin.storage
      .from("readings")
      .download(filePath);

    if (downloadErr || !fileData) {
      console.error("[DownloadPDF] storage download failed:", downloadErr?.message);
      return json(
        {
          code: "pdf_not_ready" satisfies ErrorCode,
          message: "Your PDF file is not available yet. Please try again shortly.",
        },
        409,
      );
    }

    const pdfBytes = await fileData.arrayBuffer();

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Soul_AI_Reading.pdf"',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[DownloadPDF] Error:", message);
    return json({ code: "server_error", message: "Something went wrong. Please try again." }, 500);
  }
});
