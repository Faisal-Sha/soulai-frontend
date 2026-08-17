import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createAdminClient, createUserClient } from "../_shared/supabase-client.ts";
import { generateEmbedding } from "../_shared/embeddings.ts";
import { isServiceRole } from "../_shared/auth.ts";
import {
  validateQuery,
  validateSearchParams,
  ValidationError,
  safeErrorResponse,
} from "../_shared/validation.ts";

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
    // Allow both authenticated users and service role
    if (!(await isServiceRole(req))) {
      const userClient = createUserClient(req);
      const {
        data: { user },
        error: authError,
      } = await userClient.auth.getUser();

      if (authError || !user) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    const body = await req.json();
    const query = validateQuery(body.query);
    const { limit, threshold } = validateSearchParams({
      limit: body.limit,
      threshold: body.threshold,
    });
    const language = body.language || null;

    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // Perform semantic search via the match_documents RPC function
    const supabase = createAdminClient();
    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: JSON.stringify(queryEmbedding),
      match_threshold: threshold,
      match_count: limit,
      filter_language: language,
    });

    if (error) {
      throw new Error("Search operation failed");
    }

    return new Response(
      JSON.stringify({
        results: data || [],
        query,
        count: data?.length || 0,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const message = safeErrorResponse(error, "Search knowledge error");
    const status = error instanceof ValidationError ? 400 : 500;
    return new Response(
      JSON.stringify({ error: message }),
      {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Force deploy
