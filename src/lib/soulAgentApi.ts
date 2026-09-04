import { getLocale, translate } from "@/i18n";

const API_BASE =
  import.meta.env.VITE_SOULAI_AGENT_API_URL ||
  "https://soulai-agents-production.up.railway.app";

export type AgentThread = {
  thread_id: string;
  preview?: string;
  updated_at?: string;
  message_count?: number;
};

export type AgentMessage = {
  role: "user" | "assistant" | string;
  content: string;
};

export type ChatResponse = {
  answer?: string;
  status?: string;
  detail?: string | unknown;
};

/** Turn FastAPI / Pydantic / network errors into short UI-safe copy. */
export function formatApiError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err ?? "");
  const text = raw.trim();

  if (!text) {
    const en = "Something went wrong. Please try again.";
    return getLocale() !== "en" ? translate(getLocale(), "errors.agent.generic", en) : en;
  }
  if (/failed to fetch|networkerror|load failed/i.test(text)) {
    const en = "Could not reach the agent. Check your connection and try again.";
    return getLocale() !== "en" ? translate(getLocale(), "errors.agent.unreachable", en) : en;
  }
  if (/string_type|validation error|pydantic/i.test(text)) {
    const en = "The agent returned an unexpected response. Please try again.";
    return getLocale() !== "en" ? translate(getLocale(), "errors.agent.unexpected", en) : en;
  }
  if (text.length > 160) {
    return text.slice(0, 157).trimEnd() + "…";
  }
  return text;
}

function formatDetail(detail: unknown): string {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const parts = detail
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "msg" in item) {
          const msg = String((item as { msg: unknown }).msg);
          const loc = Array.isArray((item as { loc?: unknown }).loc)
            ? (item as { loc: unknown[] }).loc.filter((x) => x !== "body").join(".")
            : "";
          return loc ? `${loc}: ${msg}` : msg;
        }
        return null;
      })
      .filter(Boolean);
    if (parts.length) return parts.join("; ");
  }
  if (detail && typeof detail === "object") {
    try {
      return JSON.stringify(detail);
    } catch {
      const en = "Request failed";
      return getLocale() !== "en" ? translate(getLocale(), "errors.agent.requestFailed", en) : en;
    }
  }
  const en = "Request failed";
  return getLocale() !== "en" ? translate(getLocale(), "errors.agent.requestFailed", en) : en;
}

async function parseError(res: Response, data: unknown): Promise<never> {
  const detail =
    data && typeof data === "object" && "detail" in data
      ? (data as { detail: unknown }).detail
      : data;
  const fallback = `Request failed (${res.status})`;
  throw new Error(
    formatDetail(detail) ||
      (getLocale() !== "en"
        ? translate(getLocale(), "errors.agent.requestFailedStatus", fallback, {
            status: res.status,
          })
        : fallback),
  );
}

/** Normalize agent answer whether backend sends a string or content blocks. */
export function normalizeAnswer(answer: unknown): string | null {
  if (typeof answer === "string") {
    const t = answer.trim();
    return t || null;
  }
  if (Array.isArray(answer)) {
    const parts = answer
      .map((block) => {
        if (typeof block === "string") return block;
        if (block && typeof block === "object" && "text" in block) {
          return String((block as { text: unknown }).text ?? "");
        }
        return "";
      })
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.length ? parts.join("\n\n") : null;
  }
  if (answer && typeof answer === "object" && "text" in answer) {
    const t = String((answer as { text: unknown }).text ?? "").trim();
    return t || null;
  }
  return null;
}

export async function fetchThreads(userId: string): Promise<AgentThread[]> {
  const res = await fetch(
    `${API_BASE}/chat/threads?user_id=${encodeURIComponent(userId)}`
  );
  const data = await res.json();
  if (!res.ok) await parseError(res, data);
  return Array.isArray(data) ? data : [];
}

export async function fetchHistory(
  userId: string,
  threadId: string
): Promise<AgentMessage[]> {
  const res = await fetch(
    `${API_BASE}/chat/history?user_id=${encodeURIComponent(userId)}&thread_id=${encodeURIComponent(threadId)}`
  );
  const data = await res.json();
  if (!res.ok) await parseError(res, data);
  return Array.isArray(data) ? data : [];
}

export async function sendChat(
  userId: string,
  threadId: string,
  message: string
): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      thread_id: threadId,
      user_id: userId,
    }),
  });
  const data = await res.json();
  if (!res.ok) await parseError(res, data);

  const answer = normalizeAnswer((data as ChatResponse).answer);
  if (!answer) {
    const en = "The agent returned an empty or invalid answer. Please try again.";
    throw new Error(
      getLocale() !== "en" ? translate(getLocale(), "errors.agent.unexpected", en) : en,
    );
  }

  return {
    ...(data as ChatResponse),
    answer,
  };
}

export async function deleteThread(
  userId: string,
  threadId: string
): Promise<void> {
  const res = await fetch(
    `${API_BASE}/chat/threads?user_id=${encodeURIComponent(userId)}&thread_id=${encodeURIComponent(threadId)}`,
    { method: "DELETE" }
  );

  if (res.status === 204 || res.status === 205) return;

  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }
  if (!res.ok) await parseError(res, data);
}

export { API_BASE as SOULAI_AGENT_API_BASE };
