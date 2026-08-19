import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export type DownloadPdfErrorCode =
  | "unauthorized"
  | "reading_not_found"
  | "forbidden"
  | "pdf_not_ready"
  | "server_error"
  | "unknown";

export type DownloadPdfResult =
  | { ok: true }
  | { ok: false; code: DownloadPdfErrorCode };

function safeFilename(name: string): string {
  return name.replace(/[^\w.-]+/g, "_").replace(/_+/g, "_") || "User";
}

/** Streams PDF via download-pdf edge function — never exposes a storage signed URL. */
export async function downloadReadingPdf(options?: {
  readingId?: string;
  fullName?: string;
}): Promise<DownloadPdfResult> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    return { ok: false, code: "unauthorized" };
  }

  const res = await fetch(`${SUPABASE_URL}/functions/v1/download-pdf`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options?.readingId ? { readingId: options.readingId } : {}),
  });

  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const payload = await res.json().catch(() => ({}));
    const code = (payload?.code as DownloadPdfErrorCode) || "unknown";
    return { ok: false, code };
  }

  if (!res.ok) {
    return { ok: false, code: "server_error" };
  }

  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = `Soul_AI_Reading_${safeFilename(options?.fullName ?? "User")}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);

  return { ok: true };
}
