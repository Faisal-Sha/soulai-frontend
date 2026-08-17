import { getAIProvider } from "./factory.ts";

export async function runHumanDesignStream(
  birthData: { date: string; time?: string; city: string; country: string },
  topic: string,
  fullName: string
): Promise<string> {
  console.log(`[Stream 2] Starting Human Design stream for topic: ${topic}`);

  let hdData: any = null;
  const apiKey = Deno.env.get("HD_API_KEY");
  const apiUrl = Deno.env.get("HD_API_URL") || "https://api.bodygraphchart.com/v1";

  if (apiKey) {
    try {
      const response = await fetch(`${apiUrl}/chart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(birthData),
      });

      if (response.ok) {
        hdData = await response.json();
      } else {
        console.warn("[Stream 2] Bodygraph API returned error:", response.status);
      }
    } catch (error) {
      console.error("[Stream 2] Error calling Bodygraph API:", error);
    }
  }

  // Fallback/Placeholder if API fails or no key
  if (!hdData) {
    console.log("[Stream 2] Using AI inference fallback for Bodygraph data");
  }

  const provider = getAIProvider(); // Use OpenAI (GPT-4o) as per spec

  const systemPrompt = `You are a certified Human Design analyst with deep expertise.
You will receive bodygraph data or birth details for a person.
Your task: provide a detailed, insightful Human Design interpretation specifically focused on the topic of ${topic}.
Cover: type, strategy, authority, profile, key defined centers, most significant channels and gates — all through the lens of ${topic}.
Be specific, personal, and avoid generic descriptions.
Output length: 400–600 words.`;

  const userMessage = `Topic: ${topic}
Name: ${fullName}

${hdData ? `Bodygraph Data:
Type: ${hdData.type}
Profile: ${hdData.profile}
Authority: ${hdData.authority}
Strategy: ${hdData.strategy}
Defined Centers: ${hdData.defined_centers?.join(", ")}
Active Channels: ${hdData.active_channels?.join(", ")}
Active Gates: ${hdData.active_gates?.join(", ")}
Incarnation Cross: ${hdData.incarnation_cross}` : `Birth Details:
Date: ${birthData.date}
Time: ${birthData.time || "Not provided"}
Place: ${birthData.city}, ${birthData.country}`}

Provide the full Human Design interpretation for ${fullName}.`;

  try {
    const interpretation = await provider.generateText(userMessage, systemPrompt, {
      temperature: 0.7,
      maxTokens: 2000,
    });

    return interpretation;
  } catch (error) {
    console.error("[Stream 2] Error generating HD interpretation:", error);
    return "Error generating Human Design interpretation.";
  }
}
