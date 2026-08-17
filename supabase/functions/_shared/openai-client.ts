import OpenAI from "https://esm.sh/openai@4";

let _client: OpenAI | null = null;

/**
 * Returns a singleton OpenAI client instance.
 */
export function getOpenAIClient(): OpenAI {
  if (_client) return _client;

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable");
  }

  _client = new OpenAI({ apiKey });
  return _client;
}
