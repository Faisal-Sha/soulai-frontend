import { z } from "https://deno.land/x/zod/mod.ts";

export const ReadingBlockSchema = z.object({
  level: z.preprocess(
    (v) => (v === "h2" || v === "h3" ? v : "h3"),
    z.enum(["h2", "h3"]),
  ),
  title: z.preprocess((v) => String(v ?? ""), z.string()),
  body: z.preprocess(
    (v) => (v == null ? undefined : String(v)),
    z.string().optional(),
  ),
  bullets: z.array(z.preprocess((v) => String(v ?? ""), z.string())).optional().default([]),
  plusList: z.array(z.preprocess((v) => String(v ?? ""), z.string())).optional().default([]),
  minusList: z.array(z.preprocess((v) => String(v ?? ""), z.string())).optional().default([]),
  insightLabel: z.preprocess(
    (v) => (v == null || v === "" ? undefined : String(v)),
    z.string().optional(),
  ),
  insightText: z.preprocess(
    (v) => (v == null || v === "" ? undefined : String(v)),
    z.string().optional(),
  ),
}).passthrough();

export const PartnerSectionSchema = z.object({
  id: z.preprocess((v) => String(v ?? "section"), z.string()),
  label: z.preprocess((v) => String(v ?? ""), z.string()),
  title: z.preprocess((v) => String(v ?? "Section"), z.string()),
  tocTitle: z.preprocess((v) => String(v ?? ""), z.string()).default(""),
  glyph: z.preprocess((v) => String(v ?? "*"), z.string()).default("*"),
  pointKey: z.string().optional(),
  energyNumber: z.coerce.number().optional(),
  energyName: z.string().optional(),
  blocks: z.array(ReadingBlockSchema).min(1),
}).passthrough();

export const ReadingSchema = z.object({
  format: z.string().transform((v) =>
    v === "partner_v2" || v === "partner_v1" ? v : "partner_v2"
  ),
  title: z.preprocess((v) => String(v ?? "Your Soulmate Reading"), z.string()),
  summary: z.preprocess((v) => String(v ?? ""), z.string()),
  heroTitle: z.preprocess((v) => String(v ?? "Portrait of the ideal partner"), z.string()),
  heroEyebrow: z.preprocess((v) => String(v ?? "Your Soulmate Reading"), z.string()),
  sections: z.array(PartnerSectionSchema).min(1).max(20),
  mantra: z.preprocess((v) => String(v ?? ""), z.string()),
  affirmations: z.array(z.string()).optional().default([]),
  recommendations: z.array(z.string()).optional().default([]),
  matrixSnapshot: z.object({
    a: z.coerce.number(),
    d1: z.coerce.number(),
    x: z.coerce.number(),
    x1: z.coerce.number(),
    e1: z.coerce.number(),
    e2: z.coerce.number(),
  }).passthrough(),
  metadata: z.object({
    generatedAt: z.string(),
    model: z.string(),
    provider: z.string(),
  }).passthrough(),
}).passthrough();

export type Reading = z.infer<typeof ReadingSchema>;

/** Legacy section shape kept for PDF flatten helpers */
export const ReadingSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  quotes: z.array(z.string()).optional(),
  actionItems: z.array(z.string()).optional(),
  blocks: z.array(ReadingBlockSchema).optional(),
  label: z.string().optional(),
  tocTitle: z.string().optional(),
  glyph: z.string().optional(),
});

export interface AIProviderOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: "json_object" | "text";
}

export interface AIProvider {
  name: string;
  generateJSON<T>(prompt: string, systemPrompt: string, options?: AIProviderOptions): Promise<T>;
  generateText(prompt: string, systemPrompt: string, options?: AIProviderOptions): Promise<string>;
}
