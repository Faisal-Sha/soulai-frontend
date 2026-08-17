/**
 * Multi-pass analysis pipeline for Soul-AI.
 *
 * Pass 1 (GPT-4o-mini): Load pre-computed energy summaries → cross-position synthesis
 * Pass 2 (GPT-4o): Synthesis + 7-step algorithm → 7-section structured JSON
 *
 * Per-section caching: each of the 7 sections cached independently with 30-day TTL.
 */

import { createAdminClient } from "./supabase-client.ts";
import { getOpenAIClient } from "./openai-client.ts";
import {
  buildSystemPromptRu,
  buildUserPromptRu,
  buildKBContext,
  extractKBSources,
  computeRAGStats,
} from "./prompts.ts";
import { fetchTargetedChunks, fetchAgenticChunks } from "./embeddings.ts";
import type { AIInsightRequest, KBSource, RAGStats } from "./types.ts";
import type { RAGChunk } from "./embeddings.ts";

// ── Section keys aligned with the new analysis structure ──
export const SECTION_KEYS = [
  "personality_type",
  "decision_making",
  "relationships",
  "money_realization",
  "inner_conflict",
  "repeating_scenario",
  "growth_direction",
  "blind_spot_superpower",
  "engagement_questions",
] as const;

export type SectionKey = typeof SECTION_KEYS[number];

const SECTION_TITLES: Record<SectionKey, string> = {
  personality_type: "СУТЬ ЛИЧНОСТИ",
  decision_making: "КАК ТЫ ПРИНИМАЕШЬ РЕШЕНИЯ",
  relationships: "ОТНОШЕНИЯ",
  money_realization: "ДЕНЬГИ И РЕАЛИЗАЦИЯ",
  inner_conflict: "ВНУТРЕННИЙ КОНФЛИКТ",
  repeating_scenario: "ПОВТОРЯЮЩИЙСЯ СЦЕНАРИЙ",
  growth_direction: "КАК ТЕБЕ ДВИГАТЬСЯ ДАЛЬШЕ",
  blind_spot_superpower: "ТВОЯ СЛЕПАЯ ЗОНА / СУПЕРСИЛА",
  engagement_questions: "ДАЛЬШЕ МОЖНО УГЛУБИТЬСЯ",
};

export interface PipelineStats {
  pass1Model: string;
  pass1Tokens: { input: number; output: number };
  pass1LatencyMs: number;
  pass2Model: string;
  pass2Tokens: { input: number; output: number };
  pass2LatencyMs: number;
  totalLatencyMs: number;
  sectionsFromCache: number;
  sectionsGenerated: number;
  synthesisLength: number;
  summaryOnlyPositions?: string[];
  needsDetailPositions?: string[];
}

export interface PipelineResult {
  insight: string;
  structuredAnalysis: Record<string, string[]>;
  sources: KBSource[];
  ragStats?: RAGStats;
  pipelineStats: PipelineStats;
}

// ── Per-Section Cache ──

const CACHE_TTL_DAYS = 30;

interface CachedSection {
  section_key: string;
  section_items: string[];
}

async function loadCachedSections(
  adminClient: ReturnType<typeof createAdminClient>,
  birthDate: string,
  language: string,
  promptVersionId: string | null
): Promise<Map<SectionKey, string[]>> {
  const ttlDate = new Date(Date.now() - CACHE_TTL_DAYS * 24 * 3600000).toISOString();

  let query = adminClient
    .from("ai_insight_sections")
    .select("section_key, section_items")
    .eq("birth_date", birthDate)
    .eq("language", language)
    .gte("created_at", ttlDate);

  if (promptVersionId) {
    query = query.eq("prompt_version_id", promptVersionId);
  } else {
    query = query.is("prompt_version_id", null);
  }

  const { data, error } = await query;
  if (error) {
    console.warn("Section cache lookup failed:", error.message);
    return new Map();
  }

  const map = new Map<SectionKey, string[]>();
  for (const row of (data || []) as CachedSection[]) {
    if (SECTION_KEYS.includes(row.section_key as SectionKey)) {
      map.set(row.section_key as SectionKey, row.section_items);
    }
  }
  return map;
}

async function saveCachedSections(
  adminClient: ReturnType<typeof createAdminClient>,
  birthDate: string,
  language: string,
  promptVersionId: string | null,
  sections: Record<string, string[]>,
  synthesisText?: string,
  pipelineStats?: PipelineStats
): Promise<void> {
  // Delete existing sections for this cache key, then insert fresh
  let deleteQuery = adminClient
    .from("ai_insight_sections")
    .delete()
    .eq("birth_date", birthDate)
    .eq("language", language);

  if (promptVersionId) {
    deleteQuery = deleteQuery.eq("prompt_version_id", promptVersionId);
  } else {
    deleteQuery = deleteQuery.is("prompt_version_id", null);
  }
  await deleteQuery;

  const rows = SECTION_KEYS.map((key) => ({
    birth_date: birthDate,
    language,
    prompt_version_id: promptVersionId,
    section_key: key,
    section_items: sections[key] || [],
    synthesis_text: key === "personality_type" ? synthesisText : null,
    pipeline_stats: key === "personality_type" ? pipelineStats : null,
  }));

  const { error } = await adminClient
    .from("ai_insight_sections")
    .insert(rows);

  if (error) {
    console.warn("Section cache save failed:", error.message);
  }
}

// ── Pass 1: Energy Synthesis (GPT-4o-mini) ──

interface SynthesisResult {
  synthesisText: string;
  needsDetail: string[];
  pass1Stats: { input: number; output: number; latencyMs: number };
}

async function pass1Synthesis(
  request: AIInsightRequest,
  adminClient: ReturnType<typeof createAdminClient>
): Promise<SynthesisResult> {
  const start = Date.now();
  const openai = getOpenAIClient();
  const matrix = request.matrix;

  // Load pre-computed energy summaries for all matrix positions
  const positionKeys = ["a", "b", "c", "d", "e", "l", "d1", "d2", "c1", "c2", "e1", "e2", "b1", "b2", "x"];
  const energyValues = positionKeys
    .filter((k) => matrix[k] && matrix[k] >= 1 && matrix[k] <= 22)
    .map((k) => ({ position: k, energy: matrix[k] }));

  // Map position keys to position_type for summary lookup
  const positionTypeMap: Record<string, string> = {
    a: "center", b: "talent", c: "resource", d: "lesson", e: "soul_task",
    l: "health", d1: "karmic", d2: "karmic", c1: "prosperity", c2: "prosperity",
    e1: "spiritual", e2: "spiritual", b1: "talent", b2: "talent", x: "balance",
  };

  // Batch fetch all summaries we need
  const uniquePairs = new Set(
    energyValues.map((e) => `${e.energy}-${positionTypeMap[e.position] || "general"}`)
  );
  const { data: summaries } = await adminClient
    .from("energy_summaries")
    .select("energy_number, position_type, summary_text")
    .in(
      "energy_number",
      [...new Set(energyValues.map((e) => e.energy))]
    );

  const summaryMap = new Map<string, string>();
  for (const s of summaries || []) {
    summaryMap.set(`${s.energy_number}-${s.position_type}`, s.summary_text);
  }

  // Build position context from summaries
  const positionContextParts: string[] = [];
  const missingPositions: string[] = [];

  const posLabels: Record<string, string> = {
    a: "Центр/Зона комфорта", b: "Талант", c: "Ресурс рода", d: "Проработка",
    e: "Задача души", l: "Здоровье", d1: "Кармический хвост 1", d2: "Кармический хвост 2",
    c1: "Благополучие 1", c2: "Благополучие 2", e1: "Духовное/Отношения 1",
    e2: "Духовное/Отношения 2", b1: "Внутренний талант 1", b2: "Внутренний талант 2",
    x: "Точка баланса",
  };

  for (const { position, energy } of energyValues) {
    const posType = positionTypeMap[position] || "general";
    const key = `${energy}-${posType}`;
    const summary = summaryMap.get(key);
    if (summary) {
      positionContextParts.push(
        `[${posLabels[position] || position} — Энергия ${energy}]\n${summary}`
      );
    } else {
      missingPositions.push(position);
    }
  }

  // Detect hard energies and special combos (same as user prompt)
  const keyPositions = ["a", "b", "c", "d", "e"];
  const hardEnergies: number[] = [];
  for (const pos of keyPositions) {
    const val = matrix[pos];
    if ([13, 15, 16].includes(val)) hardEnergies.push(val);
  }
  const allValues = Object.values(matrix).filter((v) => typeof v === "number");
  const has15_5_8 = [15, 5, 8].every((n) => allValues.includes(n));

  // Determine center personality type
  const center = matrix.a;
  let personalityType = "нейтральный";
  if ([6, 10, 22].includes(center)) personalityType = "поток/эмоции/творчество";
  else if ([5, 7].includes(center)) personalityType = "система/структура/управление";
  else if (center === 9) personalityType = "наблюдатель/глубина/отшельник";

  const synthesisPrompt = `Ты — эксперт по Матрице Судьбы. Проанализируй сводки всех позиций и создай СИНТЕЗ.

ВАЖНО: Анализируй строго по порядку приоритетов чтения матрицы:
1. ЦЕНТР (a) = ядро личности, основа всего
2. ЛЕВАЯ СТОРОНА = проявление в мир (как видят другие)
3. ВЕРХНЯЯ ТРОЙКА (b, b1, b2) = талант, мышление, верхнее подключение
4. ПРАВАЯ СТОРОНА (e, e1, e2) = задача души (что сложнее всего)
5. КАРМИЧЕСКИЙ ХВОСТ (d, d1, d2) = старые сценарии и наработки
6. ОТНОШЕНИЯ
7. ДЕНЬГИ = через правую + нижнюю часть

ЗАДАЧА:
1. Определи главные межпозиционные паттерны и конфликты НАЧИНАЯ ОТ ЦЕНТРА
2. Покажи, как левая сторона проявляет ядро в мир
3. Как верхняя тройка поддерживает или конфликтует с центром
4. Какие задачи ставит правая сторона и где это создаёт напряжение
5. Какие кармические паттерны повторяются
6. Выдели позиции, которые требуют ГЛУБОКОГО анализа (самые сложные/противоречивые)

ДАННЫЕ ЧЕЛОВЕКА:
- Центр: Энергия ${center} (тип: ${personalityType})
- Жёсткие энергии в ключевых позициях: ${hardEnergies.length > 0 ? hardEnergies.join(", ") : "нет"}
- Комбинация 15+5+8: ${has15_5_8 ? "ДА — высокий риск деструктивных отношений" : "нет"}
${missingPositions.length > 0 ? `\n⚠️ Нет сводок для позиций: ${missingPositions.join(", ")} — учти это.` : ""}

СВОДКИ ПОЗИЦИЙ:
${positionContextParts.join("\n\n---\n\n")}

ФОРМАТ ОТВЕТА (JSON):
{
  "synthesis": "Подробный синтез 500-800 слов — строго от центра, через левую/верхнюю/правую стороны, к кармическому хвосту",
  "needsDetail": ["позиция1", "позиция2"] // позиции требующие глубокого анализа полными чанками
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Ты аналитик Матрицы Судьбы. Создаёшь межпозиционный синтез. Отвечай строго в JSON." },
      { role: "user", content: synthesisPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.5,
    max_tokens: 2000,
  });

  const raw = completion.choices?.[0]?.message?.content || "{}";
  let parsed: { synthesis?: string; needsDetail?: string[] };
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { synthesis: raw, needsDetail: [] };
  }

  return {
    synthesisText: parsed.synthesis || raw,
    needsDetail: parsed.needsDetail || [],
    pass1Stats: {
      input: completion.usage?.prompt_tokens || 0,
      output: completion.usage?.completion_tokens || 0,
      latencyMs: Date.now() - start,
    },
  };
}

// ── Pass 2: Full Analysis (GPT-4o) ──

const ANALYSIS_JSON_SCHEMA = {
  type: "json_schema" as const,
  json_schema: {
    name: "personality_analysis",
    strict: true,
    schema: {
      type: "object",
      properties: {
        personality_type: { type: "array", items: { type: "string" }, description: "СУТЬ ЛИЧНОСТИ — 3-5 коротких абзацев (2-4 предложения каждый), написанных как живая расшифровка." },
        decision_making: { type: "array", items: { type: "string" }, description: "КАК ТЫ ПРИНИМАЕШЬ РЕШЕНИЯ — 3-5 абзацев о стиле принятия решений, внутренних процессах, ловушках." },
        relationships: { type: "array", items: { type: "string" }, description: "ОТНОШЕНИЯ — 3-5 абзацев: как входит в близость, кого притягивает, где ломает связь." },
        money_realization: { type: "array", items: { type: "string" }, description: "ДЕНЬГИ И РЕАЛИЗАЦИЯ — 3-5 абзацев о зарабатывании, блокировках, реализации потенциала." },
        inner_conflict: { type: "array", items: { type: "string" }, description: "ВНУТРЕННИЙ КОНФЛИКТ — 3-5 абзацев: ключевые противоречия, как они проявляются, что делать." },
        repeating_scenario: { type: "array", items: { type: "string" }, description: "ПОВТОРЯЮЩИЙСЯ СЦЕНАРИЙ — 3-5 абзацев: кармические паттерны, деструктивные циклы." },
        growth_direction: { type: "array", items: { type: "string" }, description: "КАК ТЕБЕ ДВИГАТЬСЯ ДАЛЬШЕ — 3-5 абзацев с конкретными поведенческими переключателями." },
        blind_spot_superpower: { type: "array", items: { type: "string" }, description: "ТВОЯ СЛЕПАЯ ЗОНА / СУПЕРСИЛА — 1-2 коротких точных абзаца." },
        engagement_questions: { type: "array", items: { type: "string" }, description: "ДАЛЬШЕ МОЖНО УГЛУБИТЬСЯ — 2-4 конкретных вовлекающих вопроса, каждый с новой строки." },
      },
      required: ["personality_type", "decision_making", "relationships", "money_realization", "inner_conflict", "repeating_scenario", "growth_direction", "blind_spot_superpower", "engagement_questions"],
      additionalProperties: false,
    },
  },
};

interface Pass2Result {
  sections: Record<string, string[]>;
  pass2Stats: { input: number; output: number; latencyMs: number };
}

async function pass2FullAnalysis(
  request: AIInsightRequest,
  synthesisText: string,
  ragChunks: RAGChunk[],
  systemPromptOverride?: string
): Promise<Pass2Result> {
  const start = Date.now();
  const openai = getOpenAIClient();
  const model = Deno.env.get("OPENAI_MODEL") || "gpt-4o";

  const systemPrompt = systemPromptOverride || buildSystemPromptRu();
  const userPrompt = buildUserPromptRu(request);
  const kbContext = buildKBContext(ragChunks);

  // Inject synthesis between user prompt and KB context
  const synthesisBlock = `

========== СИНТЕЗ МЕЖПОЗИЦИОННЫХ ПАТТЕРНОВ (от предварительного анализа) ==========
${synthesisText}
========== КОНЕЦ СИНТЕЗА ==========
`;

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt + synthesisBlock + kbContext },
    ],
    response_format: ANALYSIS_JSON_SCHEMA,
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 12000,
  });

  const raw = completion.choices?.[0]?.message?.content || "";
  if (!raw) throw new Error("Empty response from GPT-4o in Pass 2");

  const sections = JSON.parse(raw);

  return {
    sections,
    pass2Stats: {
      input: completion.usage?.prompt_tokens || 0,
      output: completion.usage?.completion_tokens || 0,
      latencyMs: Date.now() - start,
    },
  };
}

// ── Pipeline Orchestrator ──

export async function runAnalysisPipeline(
  request: AIInsightRequest,
  userId: string,
  adminClient: ReturnType<typeof createAdminClient>,
  promptVersionId: string | null
): Promise<PipelineResult> {
  const pipelineStart = Date.now();

  // Load system prompt from DB (prompt_versions) if available, else use hardcoded default
  let systemPromptOverride: string | undefined;
  if (promptVersionId) {
    const { data: promptRow } = await adminClient
      .from("prompt_versions")
      .select("system_prompt")
      .eq("id", promptVersionId)
      .single();
    if (promptRow?.system_prompt) {
      systemPromptOverride = promptRow.system_prompt;
      console.log(`Pipeline: Using DB prompt version ${promptVersionId} (${promptRow.system_prompt.length} chars)`);
    }
  }

  // Step 1: Check per-section cache
  const cachedSections = await loadCachedSections(
    adminClient, request.birthDate, request.language, promptVersionId
  );

  const allCached = SECTION_KEYS.every((k) => cachedSections.has(k));
  if (allCached) {
    const structuredAnalysis: Record<string, string[]> = {};
    for (const key of SECTION_KEYS) {
      structuredAnalysis[key] = cachedSections.get(key)!;
    }
    return {
      insight: formatSectionsToText(structuredAnalysis),
      structuredAnalysis,
      sources: [],
      pipelineStats: {
        pass1Model: "cache", pass1Tokens: { input: 0, output: 0 }, pass1LatencyMs: 0,
        pass2Model: "cache", pass2Tokens: { input: 0, output: 0 }, pass2LatencyMs: 0,
        totalLatencyMs: Date.now() - pipelineStart,
        sectionsFromCache: SECTION_KEYS.length, sectionsGenerated: 0, synthesisLength: 0,
      },
    };
  }

  // Step 2: Pass 1 — Energy Synthesis
  console.log("Pipeline: Starting Pass 1 synthesis...");
  const { synthesisText, needsDetail, pass1Stats } = await pass1Synthesis(request, adminClient);
  console.log(`Pipeline: Pass 1 done (${pass1Stats.latencyMs}ms, needsDetail: [${needsDetail.join(",")}])`);

  // Step 3: Agentic RAG — use needsDetail from Pass 1 for 2-tier retrieval
  let ragChunks: RAGChunk[] = [];
  let kbSources: KBSource[] = [];
  let ragStats: RAGStats | undefined;
  let summaryOnlyPositions: string[] = [];
  try {
    console.log("Pipeline: Starting Agentic RAG...");
    const agenticResult = await fetchAgenticChunks(request.matrix, request.language, needsDetail);
    ragChunks = agenticResult.chunks;
    summaryOnlyPositions = agenticResult.summaryOnlyPositions;
    kbSources = extractKBSources(ragChunks);
    const uniqueEnergies = new Set(
      Object.values(request.matrix).filter((v) => typeof v === "number" && v >= 1 && v <= 22)
    );
    ragStats = computeRAGStats(ragChunks, uniqueEnergies.size + 6);
    console.log(`Pipeline: Agentic RAG done (${ragChunks.length} chunks, ${summaryOnlyPositions.length} summary-only)`);
  } catch (ragError) {
    console.warn("Agentic RAG failed, falling back to standard retrieval:", ragError);
    try {
      ragChunks = await fetchTargetedChunks(request.matrix, request.language);
      kbSources = extractKBSources(ragChunks);
      const uniqueEnergies = new Set(
        Object.values(request.matrix).filter((v) => typeof v === "number" && v >= 1 && v <= 22)
      );
      ragStats = computeRAGStats(ragChunks, uniqueEnergies.size + 6);
    } catch (fallbackError) {
      console.warn("RAG retrieval failed entirely (non-fatal):", fallbackError);
    }
  }

  // Step 4: Pass 2 — Full Analysis
  console.log(`Pipeline: Starting Pass 2 (${ragChunks.length} RAG chunks, prompt override: ${!!systemPromptOverride})...`);
  const { sections, pass2Stats } = await pass2FullAnalysis(request, synthesisText, ragChunks, systemPromptOverride);
  console.log(`Pipeline: Pass 2 done (${pass2Stats.latencyMs}ms, ${pass2Stats.input} in / ${pass2Stats.output} out tokens)`);

  // Step 5: Build pipeline stats
  const pipelineStats: PipelineStats = {
    pass1Model: "gpt-4o-mini",
    pass1Tokens: { input: pass1Stats.input, output: pass1Stats.output },
    pass1LatencyMs: pass1Stats.latencyMs,
    pass2Model: Deno.env.get("OPENAI_MODEL") || "gpt-4o",
    pass2Tokens: { input: pass2Stats.input, output: pass2Stats.output },
    pass2LatencyMs: pass2Stats.latencyMs,
    totalLatencyMs: Date.now() - pipelineStart,
    sectionsFromCache: cachedSections.size,
    sectionsGenerated: SECTION_KEYS.length - cachedSections.size,
    synthesisLength: synthesisText.length,
    summaryOnlyPositions,
    needsDetailPositions: needsDetail,
  };

  // Step 6: Save to per-section cache
  await saveCachedSections(
    adminClient, request.birthDate, request.language, promptVersionId,
    sections, synthesisText, pipelineStats
  );

  // Step 7: Also save to legacy ai_insights for backward compat
  const insight = formatSectionsToText(sections);
  await adminClient.from("ai_insights").insert({
    user_id: userId,
    matrix_id: request.matrixId || null,
    birth_date: request.birthDate,
    matrix_data: request.matrix,
    insight_text: insight,
    language: request.language,
    prompt_version_id: promptVersionId,
  });

  return {
    insight,
    structuredAnalysis: sections,
    sources: kbSources,
    ragStats,
    pipelineStats,
  };
}

// ── Text Formatting ──

function formatSectionsToText(sections: Record<string, string[]>): string {
  return SECTION_KEYS
    .map((key) => {
      const title = SECTION_TITLES[key];
      const items = sections[key] || [];
      // New format: paragraphs separated by blank lines (no bullet points)
      const body = items
        .map((item: string) => item.trim())
        .filter(Boolean)
        .join("\n\n");
      return `${title}\n\n${body}`;
    })
    .join("\n\n---\n\n");
}
