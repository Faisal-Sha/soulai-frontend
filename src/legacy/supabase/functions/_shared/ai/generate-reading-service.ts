import { getAIProvider } from "./factory.ts";
import { Reading, ReadingSchema } from "./types.ts";
import { MatrixValues } from "../core/calc.ts";
import { partnerArchetype } from "./partner-archetypes.ts";

export interface GenerateReadingParams {
  userId: string;
  planType: string;
  matrix: MatrixValues;
  dob: string;
  fullName: string;
  topic?: string;
  quizAnswers?: Record<string, unknown>;
}

function energyBrief(n: number): string {
  return `${n} · ${partnerArchetype(n)}`;
}

/**
 * Generate a premium partner/soulmate reading (partner_v2).
 * Matrix energies guide the model privately; user-facing prose is behavioral & personal.
 */
export async function generateReading(params: GenerateReadingParams): Promise<Reading> {
  const provider = getAIProvider();
  const { matrix, dob, fullName, quizAnswers } = params;

  const x1 = matrix.x1;
  const d1 = matrix.d1;
  const x = matrix.x;
  const e1 = matrix.e1;
  const e2 = matrix.e2;
  const a = matrix.a;

  const x1Name = partnerArchetype(x1);
  const d1Name = partnerArchetype(d1);
  const xName = partnerArchetype(x);
  const e1Name = partnerArchetype(e1);
  const aName = partnerArchetype(a);
  const firstName = (fullName.split(" ")[0] || fullName || "Seeker").trim();

  const systemPrompt = `You are Soul + AI — a premium Destiny Matrix soulmate-reading engine.
You write deep, personal, emotionally intelligent PARTNER / SOULMATE readings that feel AI-crafted for ONE person.

═══ NON-NEGOTIABLE RULES ═══
1. Return ONLY valid JSON. No markdown fences.
2. Keep EXACT section ids, labels, titles, glyphs, and block titles from the user prompt. Fill every block richly.
3. NEVER invent different matrix energy numbers. Use the given numbers only as silent guidance for psychology/behaviour.
4. Do NOT explain Destiny Matrix methodology, "points", arcana theory, or archetype definitions to the user.
5. Speak directly to ${firstName} in second person ("You naturally…", "In relationships, you tend to…").
6. Describe the soulmate in concrete everyday behaviour (communication, affection, stress, conflict, commitment).
7. Every body field must be SUBSTANTIAL: typically 2–4 paragraphs (\\n\\n separated), ~120–220 words. Not a brochure.
8. Bullets must be vivid, specific, and personal — never generic advice like "read a book together" or "plan a trip".
9. Include realistic micro-scenes (dinner talk, texting habits, weekend rhythm, conflict moments).
10. For insight blocks: set insightLabel + insightText (1–3 sentences). Labels rotate among:
    "AI Insight", "Relationship Insight", "Compatibility Signal", "Personal Pattern", "Growth Opportunity".
11. Tone: intimate, clear, empowering, premium. Gender: default he/him for the partner unless quiz context says otherwise.
12. Each chapter must leave ${firstName} with a clear new insight about herself, her patterns, or her future soulmate.
`;

  const prompt = `Create a partner_v2 premium soulmate reading for ${firstName}.

Name: ${fullName}
Date of Birth: ${dob}

=== INTERNAL MATRIX GUIDANCE (DO NOT LECTURE ABOUT THESE IN THE TEXT) ===
Use these as psychological sources of truth for behaviour:
- User resource a = ${energyBrief(a)}  → how ${firstName} shows up / what she radiates
- Ideal partner x1 = ${energyBrief(x1)} → who he is day-to-day
- Relationship entrance d1 = ${energyBrief(d1)} → how love begins, early friction, how he loves
- Couple balance x = ${energyBrief(x)} → shared rhythm money/love/roles
- Intimacy force e1 = ${energyBrief(e1)}, e2 = ${energyBrief(e2)}

Full matrix JSON:
${JSON.stringify(matrix)}

Quiz context (weave personal details when useful; invent nothing false):
${JSON.stringify(quizAnswers || {}, null, 2)}

=== REQUIRED JSON SHAPE ===
{
  "format": "partner_v2",
  "title": "Your Soulmate Reading",
  "summary": "4-6 sentence premium overview: who her soulmate is, what ${firstName} will feel with him, and the growth edge of the bond",
  "heroTitle": "Portrait of the ideal partner",
  "heroEyebrow": "Your Soulmate Reading",
  "mantra": "One powerful closing mantra for ${firstName}",
  "affirmations": ["5 short personal affirmations spoken to ${firstName}"],
  "recommendations": [
    "8 highly specific recommendations for ${firstName} (practice / stop / notice / communicate / emotional pattern / daily action). No generic couple activities."
  ],
  "matrixSnapshot": { "a": ${a}, "d1": ${d1}, "x": ${x}, "x1": ${x1}, "e1": ${e1}, "e2": ${e2} },
  "metadata": {
    "generatedAt": "${new Date().toISOString()}",
    "model": "${provider.name}",
    "provider": "Soul+AI Partner Reading V2",
    "dob": "${dob}",
    "fullName": "${fullName}"
  },
  "sections": [ /* exactly the 10 sections below */ ]
}

Block fields you may use:
- level: "h2" | "h3"
- title: string (EXACT titles below)
- body: long multi-paragraph prose
- bullets: string[]
- plusList / minusList: string[] when asked
- insightLabel + insightText: short AI callout after the block content

=== SECTIONS — keep ids/labels/titles/glyphs/block titles EXACT ===

1) id "section_1", label "SECTION 1", title "Who is him", tocTitle "PORTRAIT OF THE IDEAL PARTNER", glyph "✦",
   pointKey "x1", energyNumber ${x1}, energyName "${x1Name}",
   blocks (fill ALL richly; this is the CORE product value):
   - h2 "Your soulmate portrait" (body: 3-4 paragraphs — who he is in real life; insightLabel+insightText)
   - h3 "How you will recognize him" (body: recognition cues in first meetings, dating apps, mutual friends — scenes)
   - h3 "What usually attracts him to you" (body: what in ${firstName}'s energy draws him; insight)
   - h3 "How he shows up day to day" (body: lifestyle, pace, values in action)
   - h3 "His communication style" (body + bullets 5-7: how he texts, argues, apologizes, celebrates)
   - h3 "His emotional needs" (body: what he needs to feel safe and chosen)
   - h3 "His attachment style in practice" (body: how closeness/distance shows up week to week)
   - h3 "His love language" (bullets 5-7, each with a real-life example line)
   - h3 "His strengths in love" (bullets 6-8)
   - h3 "His challenges in love" (bullets 6-8)
   - h3 "His relationship fears" (body)
   - h3 "Green flags" (bullets 5-7)
   - h3 "Red flags" (bullets 5-7)
   - h3 "How he behaves when he is deeply in love" (body: 3 paragraphs of vivid scenes; insight)

2) id "section_2", label "SECTION 2", title "HOW HE LOVES", tocTitle "HOW HE LOVES", glyph "♡",
   pointKey "d1", energyNumber ${d1}, energyName "${d1Name}",
   blocks:
   - h2 "The way love begins with him" (body: 3 paragraphs; insight)
   - h3 "How he falls in love" (body: early dating behaviour, pacing, signals)
   - h3 "How he expresses affection" (body + bullets 5-6 with scenes)
   - h3 "What makes him feel loved by you" (body spoken to ${firstName})
   - h3 "What shuts his heart down" (body + bullets 4-6)
   - h3 "His needs once the relationship is real" (body)
   - h3 "The early friction pattern to expect" (body: first difficulties as lived situations, not theory)

3) id "section_3", label "SECTION 3", title "COMMUNICATION CODE", tocTitle "COMMUNICATION CODE", glyph "◎",
   pointKey "x1", energyNumber ${x1}, energyName "${x1Name}",
   blocks:
   - h2 "How to speak with him so he opens" (body: 2-3 paragraphs; insight)
   - h3 "Rules of communication that work with him" (bullets 6-8, each actionable for ${firstName})
   - h3 "Words and tones that open him" (bullets 5-7 with example phrases)
   - h3 "Words and tones that close him" (bullets 5-7 with example phrases)
   - h3 "A real conflict conversation — what it looks like" (body: full scene + better rewrite)
   - h3 "Communication habits for ${firstName} to practice" (bullets 5)

4) id "section_4", label "SECTION 4", title "BALANCE IN THE COUPLE", tocTitle "BALANCE IN THE COUPLE", glyph "⚖",
   pointKey "x", energyNumber ${x}, energyName "${xName}",
   blocks:
   - h2 "Your shared rhythm as a couple" (body: 3 paragraphs; insight)
   - h3 "Where you naturally fit together" (body)
   - h3 "Where imbalance shows up in daily life" (body: money, time, care, initiative — scenes)
   - h3 "How to keep the relationship steady" (bullets 6-8 specific to ${firstName})
   - h3 "Strengths & pressure points of this bond"
     (plusList 4-6 strengths, minusList 4-6 pressure points — behavioural, not abstract)

5) id "section_5", label "SECTION 5", title "INTIMACY AND SEXUALITY", tocTitle "INTIMACY AND SEXUALITY", glyph "♥",
   pointKey "e1", energyNumber ${e1}, energyName "${e1Name}",
   blocks:
   - h2 "Intimacy with your soulmate" (body: 3 paragraphs; insight)
   - h3 "How desire and closeness work for him" (body)
   - h3 "What helps him feel safe in intimacy" (bullets 5-7)
   - h3 "What creates distance in the bedroom and beyond" (body)
   - h3 "Emotional intimacy ${firstName} should nurture" (body + bullets 4-6)

6) id "section_6", label "SECTION 6", title "ZONES OF FRICTION", tocTitle "ZONES OF FRICTION", glyph "⚡",
   blocks:
   - h2 "Where conflict will most often appear" (body: 2 paragraphs; insight)
   - Exactly 4 patterns as h3 titles starting with "Pattern 1 —", "Pattern 2 —", "Pattern 3 —", "Pattern 4 —"
     Titles MUST be specific to the chemistry between ${firstName}'s style (${aName}) and his style (${x1Name}/${d1Name}).
     Each pattern body: trigger scene + how it escalates + how ${firstName} can resolve it (3 paragraphs).

7) id "section_7", label "SECTION 7", title "THE PURPOSE OF THE COUPLE", tocTitle "THE PURPOSE OF THE COUPLE", glyph "✧",
   pointKey "x", energyNumber ${x}, energyName "${xName}",
   blocks:
   - h2 "What you build together" (body: 3 paragraphs; insight)
   - h3 "How this relationship changes ${firstName}" (body)
   - h3 "What you give each other" (bullets 6-8 alternating gifts both ways)
   - h3 "Your shared mission in real life" (body: how it shows in work, home, community — not slogans)

8) id "section_8", label "SECTION 8", title "PRACTICAL TOOLKIT", tocTitle "PRACTICAL TOOLKIT", glyph "✦",
   blocks:
   - h2 "Your personal relationship toolkit" (body: 2 paragraphs framing why these actions fit ${firstName})
   - h3 "Practice this week" (bullets: exactly 6 — tiny daily/weekly actions tied to her patterns)
   - h3 "Stop doing these" (bullets: exactly 5 — specific self-sabotage patterns)
   - h3 "Pay attention to this in future connections" (bullets: exactly 5 green/red attention points)
   - h3 "Communication habits to install" (bullets: exactly 5)
   - h3 "Emotional patterns to observe in yourself" (bullets: exactly 5)
   - insight on the last toolkit block

9) id "section_9", label "SECTION 9", title "HOW TO ATTRACT YOUR PARTNER", tocTitle "HOW TO ATTRACT YOUR PARTNER", glyph "◉",
   pointKey "d1", energyNumber ${d1}, energyName "${d1Name}",
   blocks:
   - h2 "Activating the relationship path for ${firstName}" (body: 3 paragraphs; insight)
   - h3 "What opens your path to him" (bullets 6-8 behavioural)
   - h3 "What blocks your path" (bullets 6-8)
   - h3 "The version of you that magnetizes the right partner" (body: identity + daily embodiment)
   - h3 "Where you are most likely to meet him" (body: realistic contexts, not fantasy)

10) id "conclusion", label "CONCLUSION", title "YOUR SOULMATE BLUEPRINT", tocTitle "SOULMATE BLUEPRINT", glyph "✦",
   blocks:
   - h2 "Your Soulmate Blueprint" (body: powerful 2-paragraph emotional opening for ${firstName})
   - h3 "Personality overview" (body: dense paragraph on him)
   - h3 "Communication style" (body)
   - h3 "Emotional needs" (body)
   - h3 "Love language" (body)
   - h3 "Relationship strengths" (bullets 5-6)
   - h3 "Possible challenges" (bullets 5-6)
   - h3 "What helps this relationship thrive" (bullets 5-7)
   - h3 "What ${firstName} should remember" (body: 2 paragraphs — inspiring close)
   - h3 "Mantra for ${firstName}" (body: mantra + short blessing)
   - Include at least 2 insight callouts across this conclusion

QUALITY BAR:
- Total reading must feel 2–3× denser than a short brochure.
- No empty filler. Every paragraph teaches something useful.
- End state for the reader: "I feel I already know my future soulmate, I understand myself better, and I know how to build a healthier relationship."
`;

  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    try {
      const result = await provider.generateJSON<Reading>(prompt, systemPrompt, {
        temperature: 0.75,
        maxTokens: 16000,
      });

      const normalized: Reading = {
        ...result,
        format: "partner_v2",
        title: result.title || "Your Soulmate Reading",
        heroTitle: result.heroTitle || "Portrait of the ideal partner",
        heroEyebrow: result.heroEyebrow || "Your Soulmate Reading",
        summary: result.summary || "",
        mantra: result.mantra || "",
        affirmations: result.affirmations || [],
        recommendations: result.recommendations || [],
        sections: result.sections || [],
        matrixSnapshot: {
          a,
          d1,
          x,
          x1,
          e1,
          e2,
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          model: provider.name,
          provider: "Soul+AI Partner Reading V2",
          dob,
          fullName,
        },
      };

      try {
        return ReadingSchema.parse(normalized);
      } catch (parseErr) {
        console.error("Zod parse failed, returning soft-normalized reading:", parseErr);
        if (!normalized.sections?.length) throw parseErr;
        return normalized as Reading;
      }
    } catch (e) {
      console.error(`Attempt ${attempts + 1} failed:`, e);
      attempts++;
      if (attempts >= maxAttempts) throw e;
    }
  }

  throw new Error("Failed to generate valid partner reading after multiple attempts");
}
