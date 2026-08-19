import { AIProvider, AIProviderOptions } from "./types.ts";

export class AnthropicProvider implements AIProvider {
  name = "anthropic";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateJSON<T>(prompt: string, systemPrompt: string, options?: AIProviderOptions): Promise<T> {
    // Note: Anthropic SDK usage in Deno might require different imports or fetch calls
    // For now, this is a placeholder to show the architecture support
    console.log("Anthropic provider called with:", { prompt, systemPrompt, options });
    
    // Example implementation using fetch (Claude API)
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: options?.model || "claude-3-5-sonnet-20240620",
        max_tokens: options?.maxTokens || 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt + "\n\nReturn the result in STRICT JSON format." }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${error}`);
    }

    const result = await response.json();
    const content = result.content[0]?.text;

    if (!content) {
      throw new Error("Empty response from Anthropic");
    }

    try {
      // Find the first { and last } to extract JSON if Claude adds commentary
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : content;
      return JSON.parse(jsonStr) as T;
    } catch (e) {
      console.error("Failed to parse Anthropic response as JSON:", content);
      throw new Error("Invalid JSON response from AI");
    }
  }

  async generateText(prompt: string, systemPrompt: string, options?: AIProviderOptions): Promise<string> {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: options?.model || "claude-3-5-sonnet-20240620",
        max_tokens: options?.maxTokens || 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }],
        temperature: options?.temperature ?? 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${error}`);
    }

    const result = await response.json();
    return result.content[0]?.text || "";
  }
}
