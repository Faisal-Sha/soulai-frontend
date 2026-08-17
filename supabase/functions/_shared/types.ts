export interface MatrixValues {
  a: number;  // Center — Soul's comfort zone
  b: number;  // Top — Main talent
  c: number;  // Left — Resource zone
  d: number;  // Bottom — Main processing
  e: number;  // Right — Soul's task

  // Male lineage
  f: number;
  y: number;
  o: number;

  // Female lineage
  g: number;
  k: number;
  u: number;

  // Divine talents
  b1: number;
  b2: number;

  // Purpose 20-40
  h: number;
  j: number;
  m: number;

  // Purpose 40-60
  n: number;
  t: number;
  z: number;

  // Purpose 60+
  s: number;

  // Health
  l: number;

  // Karmic tail
  d1: number;
  d2: number;

  // Prosperity line
  c1: number;
  c2: number;
  x: number;

  // Sexuality
  e1: number;
  e2: number;

  // Allow additional matrix fields
  [key: string]: number;
}

export interface AIInsightRequest {
  birthDate: string;
  matrix: MatrixValues;
  name?: string;
  language: "en" | "ru";  // kept for API compatibility; all requests use Russian assistant
  matrixId?: string;
}

export interface KBSource {
  documentId: string;
  filename: string;
  sourceUrl?: string;
  similarity?: number;
  chunksMatched?: number;
}

export interface RAGStats {
  chunksUsed: number;
  queriesRun: number;
  avgSimilarity: number;
  maxSimilarity: number;
  minSimilarity: number;
  kbGroundingPct: number; // % of chunks above 0.5 similarity
  totalDocumentsHit: number;
}

export interface AIInsightResponse {
  insight: string;
  error?: string;
  debug?: string;
  fromCache?: boolean;
  sources?: KBSource[];
  ragStats?: RAGStats;
  structuredAnalysis?: Record<string, string[]>;
  // deno-lint-ignore no-explicit-any
  pipelineStats?: any;
}

export interface AssistantConfig {
  id: string;
  assistant_id: string;
  assistant_name: string;
  model: string;
  language: string;
  system_prompt: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface CompatibilityChatContext {
  mode: "compatibility";
  compatibility: Record<string, unknown>;
  personAName: string;
  personBName: string;
  personADob: string;
  personBDob: string;
}

export interface ChatRequest {
  message: string;
  matrix: MatrixValues;
  name?: string;
  history?: ChatMessage[];
  birthDate?: string;
  language?: string;
  sessionId?: string;
  sessionName?: string;
  /** personal (default) = individual destiny matrix; compatibility = pair + combined matrix */
  chatContext?: { mode: "personal" } | CompatibilityChatContext;
}

export interface ChatResponse {
  answer: string;
  error?: string;
  usage?: {
    freeLimit: number;
    freeMessagesUsed: number;
    remainingFree: number;
    balance: number;
    billedAs: "free" | "paid";
  };
}

