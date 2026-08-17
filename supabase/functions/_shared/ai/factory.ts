import { OpenAIProvider } from "./openai.ts";
import { AnthropicProvider } from "./anthropic.ts";
import { AIProvider } from "./types.ts";

export function getAIProvider(): AIProvider {
  const provider = Deno.env.get("AI_PROVIDER") || "openai";

  if (provider === "openai") {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) throw new Error("Missing OPENAI_API_KEY");
    return new OpenAIProvider(apiKey);
  }

  if (provider === "anthropic") {
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");
    return new AnthropicProvider(apiKey);
  }

  throw new Error(`Unsupported AI provider: ${provider}`);
}
