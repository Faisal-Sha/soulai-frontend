/**
 * Convert print-ready HTML → PDF via Chromium (Browserless REST /pdf).
 * Fast path: one /pdf call (no multi-region retry chains).
 *
 * Env:
 *   BROWSERLESS_API_KEY or BROWSERLESS_TOKEN — required
 *   BROWSERLESS_URL — optional override
 */

export function hasChromiumPdfConfig(): boolean {
  return !!(Deno.env.get("BROWSERLESS_API_KEY") || Deno.env.get("BROWSERLESS_TOKEN"));
}

function getToken(): string {
  return (
    Deno.env.get("BROWSERLESS_API_KEY") ||
    Deno.env.get("BROWSERLESS_TOKEN") ||
    ""
  ).trim();
}

function getBase(): string {
  return (
    Deno.env.get("BROWSERLESS_URL") ||
    "https://production-sfo.browserless.io"
  ).replace(/\/$/, "");
}

const PDF_OPTIONS = {
  displayHeaderFooter: false,
  printBackground: true,
  format: "A4",
  margin: {
    top: "1cm",
    bottom: "1cm",
    left: "1.1cm",
    right: "1.1cm",
  },
};

export async function htmlToPdfChromium(html: string): Promise<Uint8Array> {
  const token = getToken();
  if (!token) {
    throw new Error(
      "BROWSERLESS_API_KEY is not set. Chromium HTML→PDF requires Browserless for reading-page fidelity.",
    );
  }

  const base = getBase();
  const url = `${base}/pdf?token=${encodeURIComponent(token)}`;
  console.log(`[htmlToPdf] POST ${base}/pdf htmlChars=${html.length}`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify({
      html,
      options: PDF_OPTIONS,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(
      `HTML→PDF failed (${res.status}): ${errText.replace(/\s+/g, " ").slice(0, 400)}`,
    );
  }

  const buf = new Uint8Array(await res.arrayBuffer());
  if (buf.byteLength < 1000) {
    throw new Error(`HTML→PDF returned tiny payload (${buf.byteLength} bytes)`);
  }
  console.log(`[htmlToPdf] Chromium PDF ok (${buf.byteLength} bytes)`);
  return buf;
}
