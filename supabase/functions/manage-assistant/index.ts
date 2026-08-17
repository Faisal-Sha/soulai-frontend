import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createAdminClient } from "../_shared/supabase-client.ts";
import { getOpenAIClient } from "../_shared/openai-client.ts";
import { isServiceRole } from "../_shared/auth.ts";

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

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

  const supabase = createAdminClient();

  try {
    switch (req.method) {
      case "GET":
        return await handleList(supabase);
      case "PUT":
        return await handleUpdate(req, supabase, getOpenAIClient());
      case "DELETE":
        return await handleDelete(req, supabase, getOpenAIClient());
      default:
        return new Response(
          JSON.stringify({ error: "Method not allowed" }),
          {
            status: 405,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }
  } catch (error) {
    console.error("Manage assistant error:", error);
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

/**
 * GET — List all assistant configurations
 */
// deno-lint-ignore no-explicit-any
async function handleList(supabase: any): Promise<Response> {
  const { data, error } = await supabase
    .from("assistant_config")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return new Response(JSON.stringify({ assistants: data }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/**
 * PUT — Update an assistant's configuration
 * Body: { config_id, name?, model?, instructions?, is_active? }
 */
async function handleUpdate(
  req: Request,
  // deno-lint-ignore no-explicit-any
  supabase: any,
  // deno-lint-ignore no-explicit-any
  openai: any
): Promise<Response> {
  const body = await req.json();
  const { config_id, name, model, instructions, is_active } = body;

  if (!config_id) {
    return new Response(
      JSON.stringify({ error: "config_id is required" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // Fetch current config
  const { data: current, error: fetchError } = await supabase
    .from("assistant_config")
    .select("*")
    .eq("id", config_id)
    .single();

  if (fetchError || !current) {
    return new Response(
      JSON.stringify({ error: "Assistant config not found" }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // Update on OpenAI side
  const updateParams: Record<string, unknown> = {};
  if (name) updateParams.name = name;
  if (model) updateParams.model = model;
  if (instructions) updateParams.instructions = instructions;

  if (Object.keys(updateParams).length > 0) {
    await openai.beta.assistants.update(current.assistant_id, updateParams);
  }

  // Update in database
  const dbUpdate: Record<string, unknown> = {};
  if (name) dbUpdate.assistant_name = name;
  if (model) dbUpdate.model = model;
  if (instructions) dbUpdate.system_prompt = instructions;
  if (typeof is_active === "boolean") dbUpdate.is_active = is_active;

  const { data: updated, error: updateError } = await supabase
    .from("assistant_config")
    .update(dbUpdate)
    .eq("id", config_id)
    .select()
    .single();

  if (updateError) throw new Error(updateError.message);

  return new Response(
    JSON.stringify({ success: true, assistant: updated }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

/**
 * DELETE — Delete an assistant
 * Body: { config_id }
 */
async function handleDelete(
  req: Request,
  // deno-lint-ignore no-explicit-any
  supabase: any,
  // deno-lint-ignore no-explicit-any
  openai: any
): Promise<Response> {
  const body = await req.json();
  const { config_id } = body;

  if (!config_id) {
    return new Response(
      JSON.stringify({ error: "config_id is required" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // Fetch config
  const { data: current, error: fetchError } = await supabase
    .from("assistant_config")
    .select("assistant_id")
    .eq("id", config_id)
    .single();

  if (fetchError || !current) {
    return new Response(
      JSON.stringify({ error: "Assistant config not found" }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // Delete from OpenAI
  try {
    await openai.beta.assistants.del(current.assistant_id);
  } catch (err) {
    console.warn("Failed to delete assistant from OpenAI (may already be deleted):", err);
  }

  // Delete from database
  const { error: deleteError } = await supabase
    .from("assistant_config")
    .delete()
    .eq("id", config_id);

  if (deleteError) throw new Error(deleteError.message);

  return new Response(
    JSON.stringify({ success: true, deleted: config_id }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

// Force deploy
