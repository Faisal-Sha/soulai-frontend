import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createAdminClient } from "../_shared/supabase-client.ts";
import { getOpenAIClient } from "../_shared/openai-client.ts";
import { buildSystemPromptRu } from "../_shared/prompts.ts";
import { isServiceRole } from "../_shared/auth.ts";

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
    // Verify service role authorization
    if (!(await isServiceRole(req))) {
      return new Response(
        JSON.stringify({ error: "Unauthorized — service role key required" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const body = await req.json().catch(() => ({}));
    const model = body.model || Deno.env.get("OPENAI_MODEL") || "gpt-4o";
    const assistantName =
      body.name ||
      Deno.env.get("OPENAI_ASSISTANT_NAME") ||
      "Soul-AI Matrix of Destiny Expert";

    const openai = getOpenAIClient();
    const supabase = createAdminClient();

    // Create a single Russian assistant — clean prompt without KB citation rules
    // KB context is always injected into the user message at runtime via Supabase RAG
    const systemPrompt = buildSystemPromptRu();

    const assistant = await openai.beta.assistants.create({
      name: `${assistantName} (RU)`,
      instructions: systemPrompt,
      model,
      tools: [], // Pure chat — no tools needed initially
      metadata: {
        language: "ru",
        project: "soul-ai",
        created_by: "setup-assistant-edge-function",
      },
    });

    // Store config in database
    const { data, error } = await supabase
      .from("assistant_config")
      .insert({
        assistant_id: assistant.id,
        assistant_name: assistant.name ?? assistantName,
        model,
        language: "ru",
        system_prompt: systemPrompt,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving assistant config:", error);
      // Clean up the created assistant if DB save fails
      await openai.beta.assistants.del(assistant.id);
      throw new Error(`Failed to save assistant config: ${error.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Created 1 assistant (Russian)",
        assistant: {
          language: "ru",
          assistant_id: assistant.id,
          assistant_name: assistant.name,
          model,
          config_id: data.id,
        },
      }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Setup assistant error:", error);
    return new Response(
      JSON.stringify({
        error: "An internal error occurred. Please try again later.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Force deploy
