import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import { MatrixValues } from "@/core/calc";
import type { MatrixChatContext } from "@/types/chatContext";
import { supabase } from "@/integrations/supabase/client";

interface AIInsightRequest {
  birthDate: string;
  matrix: MatrixValues;
  name?: string;
  language: 'en' | 'ru';
  matrixId?: string;
}

interface AIInsightResponse {
  insight: string;
  error?: string;
  fromCache?: boolean;
}

/**
 * Check if an insight already exists in the database
 */
async function getExistingInsight(
  birthDate: string,
  language: string
): Promise<string | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check for existing insight
    const { data, error } = await supabase
      .from('ai_insights')
      .select('insight_text')
      .eq('birth_date', birthDate)
      .eq('language', language)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching existing insight:', error);
      return null;
    }

    return data && data.length > 0 ? data[0].insight_text : null;
  } catch (error) {
    console.error('Error in getExistingInsight:', error);
    return null;
  }
}

/**
 * Save generated insight to the database
 */
async function saveInsight(
  request: AIInsightRequest,
  insightText: string
): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('ai_insights')
      .insert({
        user_id: user?.id || null,
        matrix_id: request.matrixId || null,
        birth_date: request.birthDate,
        matrix_data: request.matrix as any,
        insight_text: insightText,
        language: request.language
      });

    if (error) {
      console.error('Error saving insight:', error);
    }
  } catch (error) {
    console.error('Error in saveInsight:', error);
  }
}

/**
 * Generates AI-powered insights for a SoulPlus AI matrix calculation
 * using Supabase Edge Function 'generate-insights'
 * Checks for existing insights first to avoid redundant API calls
 */
export async function generateMatrixInsights(
  request: AIInsightRequest
): Promise<AIInsightResponse> {
  try {
    // 1. JWT Verification: Check if user is authenticated
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return {
        insight: "",
        error: request.language === 'ru' 
          ? "Пожалуйста, войдите в систему, чтобы получить доступ к AI анализу." 
          : "Please log in to access AI analysis."
      };
    }

    // 2. Check for existing insight first
    const existingInsight = await getExistingInsight(request.birthDate, request.language);
    if (existingInsight) {
      return {
        insight: existingInsight,
        fromCache: true
      };
    }

    // 3. Call Supabase Edge Function with JWT automatically included
    const { data, error } = await supabase.functions.invoke('generate-insights', {
      body: {
        birthDate: request.birthDate,
        matrix: request.matrix,
        language: request.language,
        name: request.name || "User"
      }
    });

    if (error) {
      console.error('Edge Function Error:', error);
      // Handle specific edge function errors
      const errorMessage = error.message || 'Failed to call insight generation service';
      throw new Error(errorMessage);
    }

    const insight = data?.insight || "";
    
    if (!insight) {
      throw new Error("Empty response from AI service");
    }

    // 4. Save the generated insight
    await saveInsight(request, insight);

    return { insight };
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return {
      insight: "",
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}


/**
 * Chats with the Knowledge Base via 'chat-with-kb' Edge Function.
 * Returns a concise, RAG-enriched answer.
 */
export interface ChatUsageInfo {
  freeLimit: number;
  freeMessagesUsed: number;
  remainingFree: number;
  balance: number;
  billedAs: "free" | "paid";
}

export async function chatWithKB(params: {
  message: string;
  matrix: MatrixValues;
  language: "en" | "ru";
  name?: string;
  birthDate: string;
  sessionId?: string;
  sessionName?: string;
  history?: { role: "user" | "assistant"; content: string }[];
  chatContext?: MatrixChatContext;
}): Promise<{ answer: string; usage?: ChatUsageInfo }> {
  try {
    const { data, error } = await supabase.functions.invoke('chat-with-kb', {
      body: params
    });

    if (error) {
      console.error('Chat Edge Function Error:', error);
      throw new Error(error.message || 'Failed to get answer from AI');
    }

    if (data?.error === "LIMIT_REACHED") {
      throw new Error("LIMIT_REACHED");
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    return {
      answer: data?.answer || "",
      usage: data?.usage,
    };
  } catch (error) {
    console.error("Error in chatWithKB:", error);
    throw error;
  }
}

/**
 * Synthesizes text to speech using ElevenLabs via 'text-to-speech' Edge Function.
 * Returns a Blob containing the audio data.
 */
export async function synthesizeSpeech(text: string): Promise<Blob> {
  console.log(`[TTS Service] Starting synthesis for "${text.substring(0, 30)}..."`);
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase configuration missing");
    }

    const response = await fetch(`${supabaseUrl}/functions/v1/text-to-speech`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`,
        'apikey': supabaseAnonKey
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[TTS Service] Fetch Error Status:', response.status);
      console.error('[TTS Service] Fetch Error Body:', errorText);
      
      let errorMessage = 'Failed to synthesize speech';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorMessage;
      } catch (e) {
        errorMessage = `${errorMessage} (${response.status})`;
      }
      throw new Error(errorMessage);
    }

    const audioBlob = await response.blob();
    
    if (audioBlob.size === 0) {
      throw new Error("Received empty audio blob");
    }

    // Double check the type, if it's JSON it might still be an error (though response.ok is true)
    if (audioBlob.type.includes('json')) {
      const text = await audioBlob.text();
      const parsed = JSON.parse(text);
      if (parsed.error) throw new Error(parsed.error);
    }

    console.log(`[TTS Service] Successfully received audio blob (size: ${audioBlob.size} bytes, type: ${audioBlob.type})`);
    return audioBlob;
  } catch (error: any) {
    console.error("[TTS Service] Error in synthesizeSpeech:", error);
    throw error;
  }
}
