import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createAdminClient, createUserClient } from "../_shared/supabase-client.ts";
import { getOpenAIClient } from "../_shared/openai-client.ts";
import {
  buildChatSystemPrompt,
  buildChatUserPrompt,
  buildCompatibilityChatUserPrompt,
  buildKBContext,
} from "../_shared/prompts.ts";
import {
  searchMultipleQueries,
  generateEmbedding,
} from "../_shared/embeddings.ts";
import type { ChatRequest, ChatResponse } from "../_shared/types.ts";
import {
  applyChatBilling,
  getChatFreeMessageLimit,
  resolveChatPlanType,
  rollbackChatBilling,
} from "../_shared/chat-limits.ts";

const MAX_COMPLETION_TOKENS = 1000;

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

    // If you want to allow anonymous chat, you could remove this check
    // or handle it differently. For now, matching generate-insights logic.
    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(
        JSON.stringify({ error: "Unauthorized — valid JWT required" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse body
    const {
      message,
      matrix,
      name,
      history,
      birthDate,
      language = "en",
      sessionId,
      sessionName,
      chatContext,
    } = await req.json() as ChatRequest;

    const isCompatibility = chatContext?.mode === "compatibility";
    const compatCtx = isCompatibility ? chatContext : null;

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 0. Check usage limits and balance
    const adminClient = createAdminClient();
    
    // Fetch user subscription and profile
    const { data: subscription, error: subError } = await adminClient
      .from("subscriptions")
      .select("plan_type, status")
      .eq("user_id", user.id)
      .maybeSingle();

    const { data: profile, error: profileError } = await adminClient
      .from("profiles")
      .select("balance, free_messages_count")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching profile for limits:", profileError);
      return new Response(JSON.stringify({ error: "Failed to verify user limits" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (subError) {
      console.warn("Subscription lookup failed, treating as free plan:", subError.message);
    }

    const effectivePlan = resolveChatPlanType(subscription?.plan_type, subscription?.status);
    const freeLimit = getChatFreeMessageLimit(effectivePlan);
    console.log(`Chat limits — user: ${user.id}, plan: ${effectivePlan}, freeLimit: ${freeLimit}, used: ${profile.free_messages_count}, balance: ${profile.balance}`);

    let billing;
    try {
      billing = await applyChatBilling(adminClient, user.id, profile, freeLimit);
    } catch (billingError) {
      const message = billingError instanceof Error ? billingError.message : "Billing failed";
      if (message === "LIMIT_REACHED") {
        return new Response(JSON.stringify({
          error: "LIMIT_REACHED",
          message: language === "ru"
            ? "Лимит бесплатных сообщений исчерпан. Пожалуйста, пополните баланс."
            : "Free message limit reached. Please recharge your balance.",
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("Chat billing error:", message);
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Multi-query RAG: retrieve relevant knowledge base context
    // For chat, we'll use the user message as the primary query plus some matrix info
    let kbContext = "";
    try {
      console.log(`Chat RAG: searching for "${message}" (mode: ${isCompatibility ? "compatibility" : "personal"})`);
      const ragQueries = isCompatibility && compatCtx
        ? [
            { query: message, label: "User Question" },
            {
              query: `совместимость пары ${compatCtx.personAName} ${compatCtx.personBName} ${message}`,
              label: "Compatibility Question",
            },
            {
              query: `матрица совместимости энергия ${matrix.e} ${matrix.b} ${matrix.d}`,
              label: "Combined Matrix Context",
            },
          ]
        : [
            { query: message, label: "User Question" },
            { query: `Энергия ${matrix.e} ${matrix.b} ${matrix.d}`, label: "Matrix Context" },
          ];

      const ragChunks = await searchMultipleQueries(ragQueries, {
        perQuery: 4,
        maxChunks: 8,
        threshold: 0.25,
        language: language === "ru" ? "ru" : "en",
      });
      kbContext = buildKBContext(ragChunks);
    } catch (ragError) {
      console.warn("Chat RAG retrieval failed:", ragError);
    }

    const openai = getOpenAIClient();
    const model = Deno.env.get("OPENAI_MODEL") || "gpt-4o";

    const chatMode = isCompatibility ? "compatibility" : "personal";
    const systemPrompt = buildChatSystemPrompt(language as "en" | "ru", chatMode);
    const userPrompt = isCompatibility && compatCtx
      ? buildCompatibilityChatUserPrompt(
          message,
          matrix,
          compatCtx.compatibility,
          compatCtx.personAName,
          compatCtx.personBName,
          compatCtx.personADob,
          compatCtx.personBDob,
        )
      : buildChatUserPrompt(message, matrix, name);

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).slice(-6),
      { role: "user", content: userPrompt + kbContext },
    ];

    let answer: string;
    try {
      const completion = await openai.chat.completions.create({
        model,
        // @ts-ignore
        messages,
        temperature: 0.6,
        max_tokens: MAX_COMPLETION_TOKENS,
      });

      answer = completion.choices?.[0]?.message?.content || "";
      if (!answer) {
        throw new Error("Empty response from AI model");
      }
    } catch (aiError) {
      await rollbackChatBilling(adminClient, user.id, billing);
      throw aiError;
    }

    // 3. Save messages (best-effort — billing already applied)
    try {
      await adminClient.from("chat_messages").insert({
        user_id: user.id,
        birth_date: birthDate,
        role: "user",
        content: message,
        session_id: sessionId,
        session_name: sessionName,
      });

      await adminClient.from("chat_messages").insert({
        user_id: user.id,
        birth_date: birthDate,
        role: "assistant",
        content: answer,
        session_id: sessionId,
        session_name: sessionName,
      });

      console.log(`Chat saved (${billing.billedAs}) — free ${billing.freeMessagesUsed}/${billing.freeLimit}, balance $${billing.balance}`);
    } catch (saveError) {
      console.warn("Failed to save chat messages:", saveError);
    }

    const response: ChatResponse = {
      answer,
      usage: {
        freeLimit: billing.freeLimit,
        freeMessagesUsed: billing.freeMessagesUsed,
        remainingFree: billing.remainingFree,
        balance: billing.balance,
        billedAs: billing.billedAs,
      },
    };
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    const response: ChatResponse = {
      answer: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
    return new Response(JSON.stringify(response), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
