/**
 * Extract text content from a PDF file buffer.
 * Uses pdf-parse via esm.sh for Deno compatibility.
 */
export async function extractTextFromPDF(pdfBuffer: Uint8Array): Promise<string> {
  // Dynamic import for Deno Edge Function compatibility
  const pdfParse = (await import("https://esm.sh/pdf-parse@1.1.1")).default;
  const result = await pdfParse(pdfBuffer);
  return result.text;
}

/**
 * Extract text from various file types.
 */
export async function extractText(
  buffer: Uint8Array,
  contentType: string
): Promise<string> {
  switch (contentType) {
    case "application/pdf":
      return extractTextFromPDF(buffer);

    case "text/plain":
    case "text/markdown":
    case "text/csv":
      return new TextDecoder().decode(buffer);

    default:
      throw new Error(`Unsupported content type: ${contentType}`);
  }
}
