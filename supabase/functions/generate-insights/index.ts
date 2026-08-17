import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createAdminClient, createUserClient } from "../_shared/supabase-client.ts";
import { runAnalysisPipeline } from "../_shared/pipeline.ts";
import type { AIInsightRequest, AIInsightResponse } from "../_shared/types.ts";
import {
  sanitizeName,
  validateBirthDate,
  validateMatrix,
  validateLanguage,
  ValidationError,
  safeErrorResponse,
} from "../_shared/validation.ts";

const MAX_REQUESTS_PER_HOUR = 10;

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Authenticate user
    const userClient = createUserClient(req);
    const {
      data: { user },
      error: authError,
    } = await userClient.auth.getUser();

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized — valid JWT required" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse and validate request body
    const body: AIInsightRequest = await req.json();
    const { matrixId } = body;
    const birthDate = validateBirthDate(body.birthDate);
    const matrix = validateMatrix(body.matrix) as AIInsightRequest["matrix"];
    const name = sanitizeName(body.name);
    const language = validateLanguage(body.language) as AIInsightRequest["language"];

    // Use admin client for DB operations (bypasses RLS for cache check)
    const adminClient = createAdminClient();

    // Rate limiting: max requests per hour per user
    const { data: recentInsights } = await adminClient
      .from("ai_insights")
      .select("id")
      .eq("user_id", user.id)
      .gte("created_at", new Date(Date.now() - 3600000).toISOString());

    if (recentInsights && recentInsights.length >= MAX_REQUESTS_PER_HOUR) {
      return new Response(
        JSON.stringify({ error: `Rate limit exceeded: ${MAX_REQUESTS_PER_HOUR} requests per hour` }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 1. Get active prompt version for cache key
    const { data: activePrompt } = await adminClient
      .from("prompt_versions")
      .select("id")
      .eq("is_active", true)
      .limit(1);
    const promptVersionId = activePrompt?.[0]?.id || null;

    // 2. Run multi-pass analysis pipeline (handles per-section caching internally)
    const result = await runAnalysisPipeline(body, user.id, adminClient, promptVersionId);

    const response: AIInsightResponse = {
      insight: result.insight,
      fromCache: result.pipelineStats.sectionsGenerated === 0,
      sources: result.sources.length > 0 ? result.sources : undefined,
      ragStats: result.ragStats,
      structuredAnalysis: result.structuredAnalysis,
      pipelineStats: result.pipelineStats,
    };
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = safeErrorResponse(error, "Generate insights error");
    const status = error instanceof ValidationError ? 400 : 500;
    const response: AIInsightResponse = {
      insight: "",
      error: message,
    };
    return new Response(JSON.stringify(response), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Force deploy
