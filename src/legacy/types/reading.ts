/**
 * Partner / Soulmate Reading content schema.
 * format: "partner_v1" | "partner_v2" — fixed section slots (V2 = denser premium content).
 */

export interface ReadingBlock {
  /** h2 or h3 visual level */
  level: "h2" | "h3";
  /** Subsection title */
  title: string;
  /** Paragraph body — plain text, paragraphs separated by \n\n */
  body?: string;
  /** Bullet list */
  bullets?: string[];
  /** Optional plus / minus columns (e.g. strength & weakness) */
  plusList?: string[];
  minusList?: string[];
  /** Optional AI callout label, e.g. "AI Insight" */
  insightLabel?: string;
  /** Optional AI callout body */
  insightText?: string;
}

export interface PartnerSectionData {
  id: string;
  /** e.g. "SECTION 1" or "CONCLUSION" */
  label: string;
  /** Chapter title shown in hero/TOC */
  title: string;
  /** Short TOC label */
  tocTitle: string;
  glyph: string;
  /** Matrix point key when applicable: x1 | d1 | x | e1 | e2 | a */
  pointKey?: string;
  energyNumber?: number;
  energyName?: string;
  blocks: ReadingBlock[];
}

export interface PartnerReadingData {
  format: "partner_v1" | "partner_v2";
  title: string;
  summary: string;
  heroTitle: string;
  heroEyebrow: string;
  sections: PartnerSectionData[];
  /** Closing mantra line(s) */
  mantra: string;
  affirmations: string[];
  recommendations: string[];
  matrixSnapshot: {
    a: number;
    d1: number;
    x: number;
    x1: number;
    e1: number;
    e2: number;
  };
  metadata: {
    generatedAt: string;
    model: string;
    provider: string;
    /** ISO YYYY-MM-DD when available */
    dob?: string;
    fullName?: string;
  };
}

/** Legacy free-form section (pre partner_v1) */
export interface ReadingSectionData {
  id: string;
  title: string;
  content: string;
  highlights?: string[];
  quotes?: string[];
  actionItems?: string[];
  blocks?: ReadingBlock[];
  label?: string;
  tocTitle?: string;
  glyph?: string;
  pointKey?: string;
  energyNumber?: number;
  energyName?: string;
}

export type ReadingData = PartnerReadingData | {
  title: string;
  summary: string;
  sections: ReadingSectionData[];
  affirmations: string[];
  recommendations: string[];
  metadata: {
    generatedAt: string;
    model: string;
    provider: string;
  };
  format?: string;
  heroTitle?: string;
  heroEyebrow?: string;
  mantra?: string;
  matrixSnapshot?: PartnerReadingData["matrixSnapshot"];
};

export interface ReadingRecord {
  id: string;
  user_id: string;
  lead_id: string | null;
  content: ReadingData;
  pdf_url: string | null;
  status: "processing" | "ready" | "failed" | "generating";
  created_at: string;
  updated_at: string;
}

export function isPartnerReading(content: ReadingData | null | undefined): content is PartnerReadingData {
  const fmt = (content as PartnerReadingData | undefined)?.format;
  return !!content && (fmt === "partner_v1" || fmt === "partner_v2");
}
