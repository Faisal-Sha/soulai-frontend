import { getAIProvider } from "./factory.ts";

export interface CompatibilityReportContent {
  title: string;
  summary: string;
  karmicScore: number;
  karmicLabel: string;
  sections: {
    id: string;
    title: string;
    highlight: string;
    explorePrompt: string;
    deepTopics: string[];
  }[];
  aiStarterQuestions: string[];
  strengths: string[];
  frictionPoints: string[];
  timingInsight: string;
}

export interface GenerateCompatibilityReportParams {
  personAName: string;
  personBName: string;
  personADob: string;
  personBDob: string;
  compatibility: Record<string, unknown>;
  combinedMatrix: Record<string, unknown>;
  language: "en" | "ru";
}

export async function generateCompatibilityReport(
  params: GenerateCompatibilityReportParams,
): Promise<CompatibilityReportContent> {
  const provider = getAIProvider();
  const lang = params.language === "ru" ? "Russian" : "English";

  const systemPrompt = `You are Soul+AI Compatibility Deep-Dive engine.
Generate an interactive compatibility report in ${lang}.
CRITICAL PRODUCT RULES:
- Do NOT write full long-form chapters. Each section highlight is 2-4 sentences only — a teaser.
- Leave depth for follow-up AI chat; include explorePrompt and deepTopics per section.
- explorePrompt must be a short action CTA (e.g. "Explore their emotional connection" / "Ask about shared values") — NOT a rhetorical question like "Would you like to know more?"
- deepTopics must be 2-3 short topic labels (2-4 words each), not questions.
- aiStarterQuestions must be 4 concrete, complete questions the user can tap to ask AI (end with "?").
- Tone: warm, specific, empowering. Use both people's names.
- karmicScore: integer 1-100 representing karmic connection strength.
- Return ONLY valid JSON matching the schema. No markdown fences.`;

  const prompt = `Couple: ${params.personAName} (DOB ${params.personADob}) & ${params.personBName} (DOB ${params.personBDob})

Compatibility metrics:
${JSON.stringify(params.compatibility, null, 2)}

Combined matrix energies:
${JSON.stringify(params.combinedMatrix, null, 2)}

JSON schema:
{
  "title": "string — report title with both names",
  "summary": "string — 3-4 sentence overview, not exhaustive",
  "karmicScore": number,
  "karmicLabel": "string — short label e.g. Strong karmic bond",
  "sections": [
    {
      "id": "connection|strengths|friction|timing|growth",
      "title": "string",
      "highlight": "string — 2-4 sentences visible on page",
      "explorePrompt": "string — short action CTA label (not a question), e.g. Explore their communication style",
      "deepTopics": ["string — 2-3 short topic labels (2-4 words), not questions"]
    }
  ],
  "aiStarterQuestions": ["string — 4 concrete questions for the chat widget"],
  "strengths": ["string — 3 bullets"],
  "frictionPoints": ["string — 2-3 bullets, gentle tone"],
  "timingInsight": "string — 2-3 sentences on when energies align, teaser only"
}

Include exactly 5 sections with ids: connection, strengths, friction, timing, growth.`;

  const result = await provider.generateJSON<CompatibilityReportContent>(
    prompt,
    systemPrompt,
    { temperature: 0.7, maxTokens: 4000 },
  );

  if (!result?.sections?.length) {
    throw new Error("Invalid compatibility report structure from AI");
  }

  return result;
}
