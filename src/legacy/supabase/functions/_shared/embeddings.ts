import { getOpenAIClient } from "./openai-client.ts";
import { createAdminClient } from "./supabase-client.ts";

const EMBEDDING_MODEL = "text-embedding-3-small";

export interface RAGQuery {
  query: string;
  label: string;
}

export interface RAGChunk {
  id: string;
  content: string;
  similarity: number;
  label: string;
  documentId: string;
}

/**
 * Generate an embedding vector for a single text string.
 * Uses OpenAI text-embedding-3-small (1536 dimensions).
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAIClient();
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text.replace(/\n/g, " ").trim(),
  });
  return response.data[0].embedding;
}

/**
 * Multi-query RAG: runs multiple semantic searches in parallel,
 * deduplicates by chunk ID, and returns top N chunks ranked by similarity.
 */
export async function searchMultipleQueries(
  queries: RAGQuery[],
  options: {
    perQuery?: number;
    maxChunks?: number;
    threshold?: number;
    language?: string | null;
  } = {}
): Promise<RAGChunk[]> {
  const {
    perQuery = 3,
    maxChunks = 15,
    threshold = 0.30,
    language = null,
  } = options;

  const supabase = createAdminClient();
  const uniqueChunks = new Map<string, RAGChunk>();

  // Run all queries in parallel
  const results = await Promise.all(
    queries.map(async ({ query, label }) => {
      try {
        const queryEmbedding = await generateEmbedding(query);
        const { data } = await supabase.rpc("match_documents", {
          query_embedding: JSON.stringify(queryEmbedding),
          match_threshold: threshold,
          match_count: perQuery,
          filter_language: language,
        });
        return { label, data: data || [] };
      } catch (err) {
        console.warn(`RAG query failed for "${label}":`, err);
        return { label, data: [] };
      }
    })
  );

  // Deduplicate — keep highest similarity per chunk
  for (const { label, data } of results) {
    for (const r of data) {
      const existing = uniqueChunks.get(r.id);
      if (!existing || r.similarity > existing.similarity) {
        uniqueChunks.set(r.id, {
          id: r.id,
          content: r.content,
          similarity: r.similarity,
          label: existing ? `${existing.label}, ${label}` : label,
          documentId: r.document_id,
        });
      }
    }
  }

  // Rank by similarity and return top N
  return Array.from(uniqueChunks.values())
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, maxChunks);
}

/**
 * Build RAG queries for all energy positions in a Destiny Matrix.
 * Always queries in Russian since the knowledge base is in Russian.
 * Labels are in the output language for proper [KB-N] attribution.
 */
export function buildMatrixRAGQueries(
  matrix: Record<string, number>,
  language: "en" | "ru"
): RAGQuery[] {
  // Always search in Russian — that's where the KB content lives
  const queries: RAGQuery[] = [
    { query: `Энергия ${matrix.e} в матрице судьбы центр зона комфорта души`,
      label: language === "ru" ? `Энергия ${matrix.e} (Центр)` : `Energy ${matrix.e} (Center)` },
    { query: `Энергия ${matrix.b} в матрице судьбы талант главный дар`,
      label: language === "ru" ? `Энергия ${matrix.b} (Талант)` : `Energy ${matrix.b} (Talent)` },
    { query: `Энергия ${matrix.a} в матрице судьбы ресурс потенциал`,
      label: language === "ru" ? `Энергия ${matrix.a} (Ресурс)` : `Energy ${matrix.a} (Resource)` },
    { query: `Энергия ${matrix.d} в матрице судьбы проработка урок кармический`,
      label: language === "ru" ? `Энергия ${matrix.d} (Проработка)` : `Energy ${matrix.d} (Processing)` },
    { query: `Энергия ${matrix.c} в матрице судьбы задача души предназначение`,
      label: language === "ru" ? `Энергия ${matrix.c} (Задача души)` : `Energy ${matrix.c} (Soul Task)` },
    { query: `Энергия ${matrix.l} здоровье матрица судьбы тело`,
      label: language === "ru" ? `Энергия ${matrix.l} (Здоровье)` : `Energy ${matrix.l} (Health)` },
    { query: `Энергия ${matrix.d1} ${matrix.d2} кармический хвост прошлые жизни`,
      label: language === "ru" ? `Кармический хвост (${matrix.d1}, ${matrix.d2})` : `Karmic Tail (${matrix.d1}, ${matrix.d2})` },
    { query: `Энергия ${matrix.c1} ${matrix.x} линия благополучия деньги финансы`,
      label: language === "ru" ? `Благополучие (${matrix.c1}, ${matrix.c2}, ${matrix.x})` : `Prosperity (${matrix.c1}, ${matrix.c2}, ${matrix.x})` },
    { query: `предназначение матрица судьбы миссия души жизненный путь`,
      label: language === "ru" ? "Предназначение" : "Purpose" },
    { query: `зоны матрицы судьбы значение точек расшифровка позиций`,
      label: language === "ru" ? "Зоны матрицы" : "Zone meanings" },
  ];
  return queries;
}

/**
 * Generate embeddings for multiple texts in a single batch call.
 */
export async function generateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const openai = getOpenAIClient();
  const cleaned = texts.map((t) => t.replace(/\n/g, " ").trim());
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: cleaned,
  });
  // Sort by index to preserve order
  return response.data
    .sort((a, b) => a.index - b.index)
    .map((d) => d.embedding);
}

/**
 * Split text into overlapping chunks for embedding.
 *
 * @param text - Full document text
 * @param maxChunkSize - Max characters per chunk (default: 1500 ≈ ~375 tokens)
 * @param overlap - Characters of overlap between chunks (default: 200)
 */
export function chunkText(
  text: string,
  maxChunkSize = 1500,
  overlap = 200
): string[] {
  const chunks: string[] = [];
  const paragraphs = text.split(/\n\n+/);
  let currentChunk = "";

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;

    // If adding this paragraph exceeds max size, save current chunk and start new
    if (
      currentChunk.length + trimmed.length + 2 > maxChunkSize &&
      currentChunk.length > 0
    ) {
      chunks.push(currentChunk.trim());
      // Start next chunk with overlap from end of current
      const overlapText = currentChunk.slice(-overlap);
      currentChunk = overlapText + "\n\n" + trimmed;
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + trimmed;
    }
  }

  // Don't forget the last chunk
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  // Handle case where a single paragraph is very long
  const finalChunks: string[] = [];
  for (const chunk of chunks) {
    if (chunk.length > maxChunkSize * 1.5) {
      // Force split on sentence boundaries
      const sentences = chunk.match(/[^.!?]+[.!?]+/g) || [chunk];
      let subChunk = "";
      for (const sentence of sentences) {
        if (subChunk.length + sentence.length > maxChunkSize) {
          if (subChunk) finalChunks.push(subChunk.trim());
          subChunk = sentence;
        } else {
          subChunk += sentence;
        }
      }
      if (subChunk) finalChunks.push(subChunk.trim());
    } else {
      finalChunks.push(chunk);
    }
  }

  return finalChunks;
}
