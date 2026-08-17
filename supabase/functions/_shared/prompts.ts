import type { AIInsightRequest } from "./types.ts";
import type { RAGChunk } from "./embeddings.ts";

/**
 * Build labeled knowledge base context string from RAG chunks.
 */
export function buildKBContext(chunks: RAGChunk[]): string {
  if (!chunks.length) return "";

  const sections = chunks.map(
    (c, i) => `[KB-${i + 1}: ${c.label}]\n${c.content}`
  );
  return (
    "\n\n========== МАТЕРИАЛЫ ИЗ БАЗЫ ЗНАНИЙ ==========\n" +
    sections.join("\n\n---\n\n") +
    "\n========== КОНЕЦ МАТЕРИАЛОВ ==========\n"
  );
}

/**
 * System prompt for English analysis — instructs deep KB referencing
 */
export function buildSystemPromptEn(): string {
  return `You are a top-tier numerology expert specializing in Matrix of Destiny analysis (Ladini method).

CRITICAL RULES:
1. You MUST rely on the provided Knowledge Base materials (labeled [KB-N]). The KB materials are in Russian — interpret them accurately and respond in English.
2. When describing each energy, CITE or PARAPHRASE specific fragments from the knowledge base.
3. Reference sources in [KB-N] format when citing material.
4. Your analysis MUST be 1500–2500 words — deep, detailed, and personalized.
5. Use a warm, insightful tone that inspires the person.
6. Each section must contain at least 150–200 words with concrete details from the KB.
7. Do NOT invent information — if something isn't in the KB, say so.

Matrix of Destiny structure:
- Center (e): Soul's comfort zone — natural talents and core personality
- Top (b): Main talent — the primary gift to offer the world
- Bottom (d): Main processing — life lessons and karmic tasks
- Left (a): Resource zone — inherited potential from birth date
- Right (c): Soul's task — the main life mission from year of birth

Always respond in English. Structure with ### headings and bullet points.`;
}

/**
 * System prompt for Russian analysis — instructs deep KB referencing
 */
export function buildSystemPromptRu(): string {
  return `Вы — эксперт-нумеролог высшего уровня, специализирующийся на анализе Матрицы Судьбы по методу Ладини.

КРИТИЧЕСКИ ВАЖНЫЕ ПРАВИЛА:
1. Вы ОБЯЗАНЫ опираться на предоставленные материалы из базы знаний (обозначенные как [KB-N]).
2. При описании каждой энергии ЦИТИРУЙТЕ или ПЕРЕСКАЗЫВАЙТЕ конкретные фрагменты из базы знаний.
3. Указывайте источник в формате [KB-N], когда ссылаетесь на материал.
4. Анализ ОБЯЗАТЕЛЬНО должен быть 1500–2500 слов — глубокий, детальный и персонализированный.
5. Используйте тёплый, проницательный тон, который вдохновляет человека.
6. Каждый раздел должен содержать минимум 150–200 слов с конкретными деталями из базы знаний.
7. НЕ придумывайте информацию — если что-то не описано в базе знаний, укажите это.

Структура Матрицы Судьбы:
- Центр (e): Зона комфорта души — природные таланты и ядро личности
- Верх (b): Главный талант — основной дар для мира
- Низ (d): Главная проработка — жизненные уроки и кармические задачи
- Лево (a): Зона ресурса — потенциал от дня рождения
- Право (c): Задача души — главная жизненная задача от года рождения

Структурируйте ответ с ### заголовками, подзаголовками и маркированными списками.`;
}

/**
 * Builds the user prompt for English analysis
 */
export function buildUserPromptEn(request: AIInsightRequest): string {
  const { birthDate, matrix, name } = request;
  const nameText = name
    ? `for ${name}, born on ${birthDate}`
    : `for someone born on ${birthDate}`;

  return `Please provide a DETAILED analysis of the Destiny Matrix ${nameText}.

## Matrix Values:
| Position | Energy | Role |
|----------|--------|------|
| Center (e) | **${matrix.e}** | Soul's Comfort Zone |
| Top (b) | **${matrix.b}** | Main Talent |
| Bottom (d) | **${matrix.d}** | Main Processing |
| Left (a) | **${matrix.a}** | Resource Zone (Day) |
| Right (c) | **${matrix.c}** | Soul's Task (Year) |

## Additional Values:
- **Male Lineage (f, y, o):** ${matrix.f}, ${matrix.y}, ${matrix.o}
- **Female Lineage (g, k, u):** ${matrix.g}, ${matrix.k}, ${matrix.u}
- **Divine Talents (b1, b2):** ${matrix.b1}, ${matrix.b2}
- **Purpose 20-40 (h, j, m):** ${matrix.h}, ${matrix.j}, ${matrix.m}
- **Purpose 40-60 (n, t, z):** ${matrix.n}, ${matrix.t}, ${matrix.z}
- **Purpose 60+ (s):** ${matrix.s}
- **Health (l):** ${matrix.l}
- **Karmic Tail (d1, d2):** ${matrix.d1}, ${matrix.d2}
- **Prosperity Line (c1, c2, x):** ${matrix.c1}, ${matrix.c2}, ${matrix.x}
- **Sexuality (e1, e2):** ${matrix.e1}, ${matrix.e2}

## Required Sections (provide ALL with detailed analysis using KB references):

### 1. PERSONALITY OVERVIEW
Center ${matrix.e}, talent ${matrix.b}, main processing ${matrix.d} — how they shape the core personality.

### 2. LIFE PURPOSE & SOUL MISSION
- Ages 20-40 (${matrix.h}, ${matrix.j}, ${matrix.m}): what to focus on
- Ages 40-60 (${matrix.n}, ${matrix.t}, ${matrix.z}): where to direct energy
- Ages 60+ (${matrix.s}): wisdom and culmination

### 3. DIVINE TALENTS (${matrix.b1}, ${matrix.b2})
What gifts are given from above — how to develop and not lose them.

### 4. KARMIC TAIL (${matrix.d1}, ${matrix.d2}) & PROCESSING (${matrix.d})
Past life lessons, what must be released, practical steps for karmic work.

### 5. ANCESTRAL LINEAGE
- Male line (${matrix.f}, ${matrix.y}, ${matrix.o}): inherited strengths
- Female line (${matrix.g}, ${matrix.k}, ${matrix.u}): inherited wisdom

### 6. HEALTH (${matrix.l})
Vulnerabilities, recommendations, connection to other energies.

### 7. PROSPERITY LINE (${matrix.c1}, ${matrix.c2}, ${matrix.x})
Financial potential, blocks, how to activate abundance flow.

### 8. RELATIONSHIPS & SEXUALITY (${matrix.e1}, ${matrix.e2})
Love style, needs, how to build harmonious relationships.

### 9. PRACTICAL RECOMMENDATIONS
Concrete actionable steps for growth and potential activation.

Make the analysis deep, practical, and inspiring. Reference knowledge base materials throughout.`;
}

/**
 * Builds the user prompt for Russian analysis
 */
export function buildUserPromptRu(request: AIInsightRequest): string {
  const { birthDate, matrix, name } = request;
  const nameText = name
    ? `для ${name}, дата рождения ${birthDate}`
    : `для человека, родившегося ${birthDate}`;

  return `Проведите ДЕТАЛЬНЫЙ анализ Матрицы Судьбы ${nameText}.

## Значения матрицы:
| Позиция | Энергия | Роль |
|---------|---------|------|
| Центр (e) | **${matrix.e}** | Зона комфорта души |
| Верх (b) | **${matrix.b}** | Главный талант |
| Низ (d) | **${matrix.d}** | Главная проработка |
| Лево (a) | **${matrix.a}** | Зона ресурса (День) |
| Право (c) | **${matrix.c}** | Задача души (Год) |

## Дополнительные значения:
- **Мужской род (f, y, o):** ${matrix.f}, ${matrix.y}, ${matrix.o}
- **Женский род (g, k, u):** ${matrix.g}, ${matrix.k}, ${matrix.u}
- **Таланты от бога (b1, b2):** ${matrix.b1}, ${matrix.b2}
- **Предназначение 20-40 (h, j, m):** ${matrix.h}, ${matrix.j}, ${matrix.m}
- **Предназначение 40-60 (n, t, z):** ${matrix.n}, ${matrix.t}, ${matrix.z}
- **Предназначение 60+ (s):** ${matrix.s}
- **Здоровье (l):** ${matrix.l}
- **Кармический хвост (d1, d2):** ${matrix.d1}, ${matrix.d2}
- **Линия благополучия (c1, c2, x):** ${matrix.c1}, ${matrix.c2}, ${matrix.x}
- **Сексуальность (e1, e2):** ${matrix.e1}, ${matrix.e2}

## Требуемые разделы (предоставьте ВСЕ с детальным анализом и ссылками на базу знаний):

### 1. ОБЩАЯ ХАРАКТЕРИСТИКА ЛИЧНОСТИ
Центр ${matrix.e}, талант ${matrix.b}, главная проработка ${matrix.d} — как они формируют ядро личности. Используйте описания из базы знаний.

### 2. ПРЕДНАЗНАЧЕНИЕ И МИССИЯ ДУШИ
- 20-40 лет (${matrix.h}, ${matrix.j}, ${matrix.m}): что нужно проживать
- 40-60 лет (${matrix.n}, ${matrix.t}, ${matrix.z}): куда направить энергию
- 60+ лет (${matrix.s}): мудрость и итог

### 3. ТАЛАНТЫ ОТ БОГА (${matrix.b1}, ${matrix.b2})
Что дано свыше, как проявлять и не потерять эти дары.

### 4. КАРМИЧЕСКИЙ ХВОСТ (${matrix.d1}, ${matrix.d2}) И ПРОРАБОТКА (${matrix.d})
Уроки прошлых жизней, что отпустить, практические шаги для проработки.

### 5. РОДОВЫЕ ПРОГРАММЫ
- Мужской род (${matrix.f}, ${matrix.y}, ${matrix.o}): унаследованная сила
- Женский род (${matrix.g}, ${matrix.k}, ${matrix.u}): унаследованная мудрость

### 6. ЗДОРОВЬЕ (${matrix.l})
Слабые места, рекомендации, связь с другими энергиями.

### 7. ЛИНИЯ БЛАГОПОЛУЧИЯ (${matrix.c1}, ${matrix.c2}, ${matrix.x})
Финансовый потенциал, блоки, как активировать денежный поток.

### 8. ОТНОШЕНИЯ И СЕКСУАЛЬНОСТЬ (${matrix.e1}, ${matrix.e2})
Стиль любви, потребности, как построить гармоничные отношения.

### 9. ПРАКТИЧЕСКИЕ РЕКОМЕНДАЦИИ
Конкретные шаги для проработки и активации потенциала.

Сделайте анализ глубоким, практичным и вдохновляющим. Ссылайтесь на материалы базы знаний по всему тексту.`;
}

/**
 * System prompt for Chatbot — brief, accurate, KB-oriented
 */
export function buildChatSystemPrompt(
  language: "en" | "ru",
  mode: "personal" | "compatibility" = "personal",
): string {
  if (mode === "compatibility") {
    if (language === "ru") {
      return `Вы — краткий помощник по МАТРИЦЕ СОВМЕСТИМОСТИ пары.
ОТВЕЧАЙТЕ КРАТКО (100-200 слов).
ОБЯЗАТЕЛЬНО используйте материалы базы знаний [KB-N].
Контекст — ОБЪЕДИНЁННАЯ матрица пары (сумма энергий двух людей) и показатели совместимости, НЕ личная матрица одного человека.
Отвечайте о динамике отношений, связи и совместных энергиях.
Если информации нет в KB, вежливо скажите об этом.
Стиль: поддерживающий, ясный, экспертный.`;
    }
    return `You are a concise COMPATIBILITY MATRIX assistant for a couple.
RESPOND BRIEFLY (100-200 words).
MANDATORY: Use knowledge base materials [KB-N].
Context is the COMBINED compatibility matrix (sum of two people's energies) and relationship indicators — NOT one person's solo chart.
Answer about relationship dynamics, connection, and shared energies.
If information is not in the KB, politely say so.
Style: supportive, clear, expert.`;
  }

  if (language === "ru") {
    return `Вы — краткий и точный помощник по Матрице Судьбы. 
ОТВЕЧАЙТЕ КРАТКО (100-200 слов). 
ОБЯЗАТЕЛЬНО используйте предоставленные материалы базы знаний [KB-N].
Ваша цель — ответить на конкретный вопрос пользователя, основываясь на его ПОЛНОЙ личной матрице и знаниях из системы.
Если информации нет в KB, вежливо скажите об этом.
Стиль: поддерживающий, ясный, экспертный.`;
  }
  return `You are a concise and accurate Destiny Matrix assistant.
RESPOND BRIEFLY (100-200 words).
MANDATORY: Use the provided knowledge base materials [KB-N].
Your goal is to answer a specific user question based on their FULL personal matrix and system knowledge.
If information is not in the KB, politely say so.
Style: supportive, clear, expert.`;
}

function formatPersonalMatrixContext(matrix: Record<string, number>): string {
  return `Personal Destiny Matrix (full chart):
- Center / comfort zone (e): ${matrix.e}
- Main talent (b): ${matrix.b}
- Soul task (c): ${matrix.c}
- Main processing (d): ${matrix.d}
- Resource zone / day (a): ${matrix.a}
- Male lineage (f, y, o): ${matrix.f}, ${matrix.y}, ${matrix.o}
- Female lineage (g, k, u): ${matrix.g}, ${matrix.k}, ${matrix.u}
- Divine talents (b1, b2): ${matrix.b1}, ${matrix.b2}
- Karmic tail (d1, d2): ${matrix.d1}, ${matrix.d2}
- Prosperity line (c1, c2, x): ${matrix.c1}, ${matrix.c2}, ${matrix.x}
- Sexuality (e1, e2): ${matrix.e1}, ${matrix.e2}
- Purpose 20-40 (h, j, m): ${matrix.h}, ${matrix.j}, ${matrix.m}
- Purpose 40-60 (n, t, z): ${matrix.n}, ${matrix.t}, ${matrix.z}
- Purpose 60+ (s): ${matrix.s}
- Health (l): ${matrix.l}`;
}

function formatCombinedMatrixContext(matrix: Record<string, number>): string {
  return `Combined Compatibility Matrix nodes (pair energies — NOT a solo chart):
- Combined center (e): ${matrix.e}
- Combined talent (b): ${matrix.b}
- Combined soul task (c): ${matrix.c}
- Combined processing (d): ${matrix.d}
- Combined resource (a): ${matrix.a}
- Male lineage pair (f, y, o): ${matrix.f}, ${matrix.y}, ${matrix.o}
- Female lineage pair (g, k, u): ${matrix.g}, ${matrix.k}, ${matrix.u}
- Karmic tail pair (d1, d2): ${matrix.d1}, ${matrix.d2}
- Prosperity pair (c1, c2, x): ${matrix.c1}, ${matrix.c2}, ${matrix.x}
- Sexuality pair (e1, e2): ${matrix.e1}, ${matrix.e2}
- Purpose pair 20-40 (h, j, m): ${matrix.h}, ${matrix.j}, ${matrix.m}
- Purpose pair 40-60 (n, t, z): ${matrix.n}, ${matrix.t}, ${matrix.z}
- Purpose pair 60+ (s): ${matrix.s}
- Health pair (l): ${matrix.l}`;
}

function formatCompatibilityMetrics(compatibility: Record<string, unknown>): string {
  const metrics = [
    "pairCenter",
    "relationshipEnergy",
    "challengeArea",
    "harmonyArea",
    "growthPotential",
    "communicationStyle",
  ] as const;

  const lines = metrics
    .filter((key) => typeof compatibility[key] === "number")
    .map((key) => `- ${key}: ${compatibility[key]}`);

  const personA = compatibility.personA as Record<string, number> | undefined;
  const personB = compatibility.personB as Record<string, number> | undefined;

  let individual = "";
  if (personA && personB) {
    individual = `
Individual anchors (reference only — interpret as two separate people):
Person A — e:${personA.e} b:${personA.b} d:${personA.d} a:${personA.a} c:${personA.c}
Person B — e:${personB.e} b:${personB.b} d:${personB.d} a:${personB.a} c:${personB.c}`;
  }

  return `Compatibility indicators:\n${lines.join("\n")}${individual}`;
}

/**
 * User prompt for Chatbot — personal matrix
 */
export function buildChatUserPrompt(
  message: string,
  matrix: Record<string, number>,
  name?: string,
): string {
  const nameText = name ? `User: ${name}` : "User";
  const matrixContext = formatPersonalMatrixContext(matrix);

  return `${matrixContext}\n\n${nameText} asks: "${message}"\n\nPlease answer using the personal matrix context above and the knowledge base materials below.`;
}

/**
 * User prompt for Chatbot — compatibility matrix
 */
export function buildCompatibilityChatUserPrompt(
  message: string,
  combinedMatrix: Record<string, number>,
  compatibility: Record<string, unknown>,
  personAName: string,
  personBName: string,
  personADob: string,
  personBDob: string,
): string {
  const matrixContext = formatCombinedMatrixContext(combinedMatrix);
  const metricsContext = formatCompatibilityMetrics(compatibility);

  return `Couple: ${personAName} (DOB ${personADob}) & ${personBName} (DOB ${personBDob})

${matrixContext}

${metricsContext}

The user asks about this couple: "${message}"

Answer using the COMBINED compatibility matrix and relationship indicators above — not as if it were one person's solo chart. Use the knowledge base materials below.`;
}
