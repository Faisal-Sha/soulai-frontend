import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";

// Try multiple common environment variable names for ElevenLabs
const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY") || Deno.env.get("ELEVEN_LABS_API_KEY");
// Fallback to "George" (JBFqnCBsd6RMkjVDRZzb) which is a pre-made voice available to free users.
// "wAGzRVkxKEs8La0lmdrE" is a library voice and requires a paid ElevenLabs subscription.
// Default model "eleven_flash_v2_5" is used as it is included in the free plan and very efficient.
const VOICE_ID = Deno.env.get("ELEVENLABS_VOICE_ID") || Deno.env.get("ELEVEN_LABS_VOICE_ID") || "JBFqnCBsd6RMkjVDRZzb";

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
     const { text, model_id = "eleven_flash_v2_5", voice_id } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use provided voice_id or default to env/fallback
    const finalVoiceId = voice_id || VOICE_ID;

    if (!ELEVENLABS_API_KEY) {
      return new Response(
        JSON.stringify({ 
          error: "ElevenLabs API key missing. Please set ELEVENLABS_API_KEY in Supabase secrets." 
        }), 
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`[TTS] Generating speech for voice: ${finalVoiceId}, model: ${model_id}`);
    console.log(`[TTS] Text: "${text.substring(0, 50)}..."`);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${finalVoiceId}/stream`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: model_id,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[TTS] ElevenLabs API error (${response.status}):`, errorText);
      
      let errorMessage = "ElevenLabs API error";
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.detail?.message || errorJson.message || errorMessage;
      } catch {
        errorMessage = `${errorMessage}: ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    const audioBuffer = await response.arrayBuffer();
    console.log(`[TTS] Successfully generated audio. Buffer size: ${audioBuffer.byteLength} bytes`);
    
    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "X-Content-Type-Options": "nosniff"
      },
    });
  } catch (error: any) {
    console.error("[TTS] Edge Function catch block error:", error.message);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
