import OpenAI from "https://esm.sh/openai@4";
import { AIProvider, AIProviderOptions } from "./types.ts";

export class OpenAIProvider implements AIProvider {
  name = "openai";
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateJSON<T>(prompt: string, systemPrompt: string, options?: AIProviderOptions): Promise<T> {
    const response = await this.client.chat.completions.create({
      model: options?.model || "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    try {
      return JSON.parse(content) as T;
    } catch (e) {
      console.error("Failed to parse OpenAI response as JSON:", content);
      throw new Error("Invalid JSON response from AI");
    }
  }

  async generateText(prompt: string, systemPrompt: string, options?: AIProviderOptions): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: options?.model || "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens,
    });

    return response.choices[0]?.message?.content || "";
  }
}
