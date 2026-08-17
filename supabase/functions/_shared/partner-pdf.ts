/**
 * Partner reading PDF — visual match for /reading (lavender paper, accent purple).
 * No sidebar. Uses pdf-lib with WinAnsi-safe text (custom fonts still fail on missing glyphs).
 */
import {
  PDFDocument,
  rgb,
  StandardFonts,
} from "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm";
import {
  INTER_REGULAR,
  INTER_SEMIBOLD,
  FRAUNCES_SEMIBOLD,
  FRAUNCES_ITALIC,
} from "./partner-pdf-fonts.ts";

type Font = Awaited<ReturnType<PDFDocument["embedFont"]>>;

/** Strip / replace glyphs pdf-lib often cannot encode */
export function sanitizePdfText(input: unknown): string {
  let text = String(input ?? "");
  text = text
    .replace(/\u0000/g, "")
    .replace(/[✦✧◉◎♡♥⚖⚡★☆●○■□▪▫]/g, "*")
    .replace(/[\u201C\u201D\u00AB\u00BB]/g, '"')
    .replace(/[\u2018\u2019`]/g, "'")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[\u00B7\u2022]/g, "-")
    .replace(/\u00A0/g, " ")
    .replace(/[^\t\n\r\x20-\x7E\u00A0-\u00FF]/g, "");
  return text;
}

function centerX(text: string, size: number, font: Font, pageWidth: number) {
  try {
    return (pageWidth - font.widthOfTextAtSize(text, size)) / 2;
  } catch {
    return pageWidth / 2;
  }
}

export interface PartnerPdfInput {
  content: any;
  fullName: string;
  dobDisplay: string;
  dobShort?: string;
}

export async function buildPartnerReadingPdf(input: PartnerPdfInput): Promise<Uint8Array> {
  const { content, fullName, dobDisplay } = input;
  const firstName = sanitizePdfText((fullName || "Seeker").split(" ")[0]);
  const initial = (firstName[0] || "S").toUpperCase();

  const pdfDoc = await PDFDocument.create();

  // Bundled Inter + Fraunces — same families as the /reading sample UI
  let bodyFont: Font;
  let bodyBold: Font;
  let display: Font;
  let displayItalic: Font;

  try {
    bodyFont = await pdfDoc.embedFont(INTER_REGULAR, { subset: true });
    bodyBold = await pdfDoc.embedFont(INTER_SEMIBOLD, { subset: true });
    display = await pdfDoc.embedFont(FRAUNCES_SEMIBOLD, { subset: true });
    displayItalic = await pdfDoc.embedFont(FRAUNCES_ITALIC, { subset: true });
    console.log("[PartnerPDF] Embedded Inter + Fraunces");
  } catch (e) {
    console.warn("[PartnerPDF] Embedded fonts failed, using StandardFonts:", e);
    bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    bodyBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    display = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    displayItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  }

  const PAGE_W = 595.28;
  const PAGE_H = 841.89;
  const MARGIN = 48;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  const FOOTER_Y = 28;

  const SURFACE = rgb(0.925, 0.906, 0.973);
  const PAPER = rgb(0.980, 0.969, 1.0);
  const INK = rgb(0.078, 0.035, 0.243);
  const INK_SOFT = rgb(0.267, 0.216, 0.525);
  const INK_MUTED = rgb(0.459, 0.412, 0.667);
  const ACCENT = rgb(0.365, 0.294, 0.878);
  const BORDER = rgb(0.86, 0.84, 0.92);
  const WHITE = rgb(1, 1, 1);
  const CARD = rgb(0.99, 0.985, 1);

  let page = pdfDoc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;

  const safeDraw = (
    text: string,
    opts: { x: number; y: number; font: Font; size: number; color: ReturnType<typeof rgb> },
  ) => {
    const clean = sanitizePdfText(text);
    if (!clean) return;
    try {
      page.drawText(clean, opts);
    } catch (err) {
      // Last resort: ASCII only
      try {
        page.drawText(clean.replace(/[^\x20-\x7E]/g, ""), opts);
      } catch (err2) {
        console.warn("[PartnerPDF] drawText skipped:", clean.slice(0, 40), err2);
      }
    }
  };

  const widthOf = (text: string, size: number, font: Font) => {
    try {
      return font.widthOfTextAtSize(sanitizePdfText(text), size);
    } catch {
      return text.length * size * 0.5;
    }
  };

  const paintPage = (p: typeof page) => {
    p.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: SURFACE });
    p.drawRectangle({
      x: 28,
      y: 28,
      width: PAGE_W - 56,
      height: PAGE_H - 56,
      color: PAPER,
      borderColor: BORDER,
      borderWidth: 0.6,
    });
  };

  const newPage = () => {
    page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    paintPage(page);
    y = PAGE_H - MARGIN - 12;
  };

  const ensureSpace = (need: number) => {
    if (y - need < MARGIN + 40) newPage();
  };

  const drawWrapped = (
    text: string,
    size: number,
    font: Font,
    color = INK,
    lineSpacing = 1.55,
    x = MARGIN,
    width = CONTENT_W,
  ) => {
    const clean = sanitizePdfText(text);
    if (!clean.trim()) return;
    for (const para of clean.split(/\r?\n/)) {
      if (!para.trim()) {
        y -= size * lineSpacing * 0.45;
        continue;
      }
      let line = "";
      for (const word of para.split(" ")) {
        if (!word) continue;
        const test = line + word + " ";
        if (widthOf(test, size, font) > width) {
          if (line.trim()) {
            ensureSpace(size * lineSpacing);
            safeDraw(line.trim(), { x, y, font, size, color });
            y -= size * lineSpacing;
          }
          line = word + " ";
        } else {
          line = test;
        }
      }
      if (line.trim()) {
        ensureSpace(size * lineSpacing);
        safeDraw(line.trim(), { x, y, font, size, color });
        y -= size * lineSpacing;
      }
    }
  };

  const drawCentered = (text: string, size: number, font: Font, color: ReturnType<typeof rgb>) => {
    const clean = sanitizePdfText(text);
    if (!clean) return;
    ensureSpace(size + 4);
    safeDraw(clean, {
      x: centerX(clean, size, font, PAGE_W),
      y,
      font,
      size,
      color,
    });
    y -= size * 1.35;
  };

  // ── Cover ─────────────────────────────────────────────────────────────────
  paintPage(page);
  y = PAGE_H - 90;

  drawCentered("SOUL + AI", 10, bodyBold, ACCENT);
  y -= 8;

  const blobR = 42;
  const blobY = y - blobR;
  page.drawCircle({ x: PAGE_W / 2, y: blobY, size: blobR, color: ACCENT });
  page.drawCircle({
    x: PAGE_W / 2 - 8,
    y: blobY + 10,
    size: blobR * 0.55,
    color: WHITE,
    opacity: 0.18,
  });
  safeDraw(initial, {
    x: PAGE_W / 2 - widthOf(initial, 36, display) / 2,
    y: blobY - 12,
    font: display,
    size: 36,
    color: WHITE,
  });
  y = blobY - blobR - 28;

  const eyebrow = content?.heroEyebrow || "Your Soulmate Reading";
  drawCentered(String(eyebrow).toUpperCase(), 9, bodyBold, ACCENT);
  y -= 6;

  const heroTitle = content?.heroTitle || "Portrait of the ideal partner";
  {
    const size = 26;
    const words = sanitizePdfText(heroTitle).split(" ");
    let line = "";
    const lines: string[] = [];
    for (const w of words) {
      const test = `${line}${w} `;
      if (widthOf(test, size, display) > CONTENT_W - 40) {
        if (line.trim()) lines.push(line.trim());
        line = `${w} `;
      } else line = test;
    }
    if (line.trim()) lines.push(line.trim());
    for (const ln of lines) drawCentered(ln, size, display, INK);
  }

  y -= 4;
  drawCentered(`A personal reading for ${firstName}`, 14, displayItalic, INK_SOFT);
  y -= 10;

  const meta = sanitizePdfText(`Born ${dobDisplay}  |  Partner Decoding`);
  const metaW = Math.min(CONTENT_W, widthOf(meta, 9, bodyBold) + 36);
  page.drawRectangle({
    x: (PAGE_W - metaW) / 2,
    y: y - 8,
    width: metaW,
    height: 22,
    borderColor: BORDER,
    borderWidth: 0.8,
    color: CARD,
  });
  safeDraw(meta, {
    x: (PAGE_W - widthOf(meta, 9, bodyBold)) / 2,
    y: y - 2,
    font: bodyBold,
    size: 9,
    color: INK_SOFT,
  });
  y -= 48;

  if (content?.summary) {
    drawWrapped(String(content.summary), 11, displayItalic, INK_SOFT, 1.6, MARGIN + 10, CONTENT_W - 20);
  }

  // ── Sections ──────────────────────────────────────────────────────────────
  const sections: any[] = Array.isArray(content?.sections) ? content.sections : [];

  for (const section of sections) {
    newPage();

    const label = String(section.label || "").toUpperCase();
    if (label) drawCentered(label, 9, bodyBold, ACCENT);

    page.drawCircle({
      x: PAGE_W / 2,
      y: y - 6,
      size: 16,
      color: rgb(0.93, 0.91, 0.98),
      borderColor: ACCENT,
      borderWidth: 0.7,
    });
    safeDraw("*", {
      x: PAGE_W / 2 - widthOf("*", 12, display) / 2,
      y: y - 10,
      font: display,
      size: 12,
      color: ACCENT,
    });
    y -= 36;

    const title = String(section.title || "Chapter");
    {
      const size = 20;
      const words = sanitizePdfText(title).split(" ");
      let line = "";
      const lines: string[] = [];
      for (const w of words) {
        const test = `${line}${w} `;
        if (widthOf(test, size, display) > CONTENT_W) {
          if (line.trim()) lines.push(line.trim());
          line = `${w} `;
        } else line = test;
      }
      if (line.trim()) lines.push(line.trim());
      for (const ln of lines) drawCentered(ln, size, display, INK);
    }

    page.drawLine({
      start: { x: PAGE_W / 2 - 32, y: y + 4 },
      end: { x: PAGE_W / 2 + 32, y: y + 4 },
      color: ACCENT,
      thickness: 1,
    });
    y -= 22;

    const blocks: any[] = Array.isArray(section.blocks) ? section.blocks : [];
    for (const block of blocks) {
      const level = block.level === "h2" ? "h2" : "h3";
      const blockTitle = String(block.title || "");

      if (blockTitle) {
        ensureSpace(28);
        if (level === "h2") {
          safeDraw(blockTitle, { x: MARGIN, y, font: display, size: 12, color: ACCENT });
          y -= 6;
          page.drawLine({
            start: { x: MARGIN, y },
            end: { x: PAGE_W - MARGIN, y },
            color: BORDER,
            thickness: 0.7,
          });
          y -= 16;
        } else {
          safeDraw(blockTitle, { x: MARGIN, y, font: display, size: 11, color: INK });
          y -= 14;
        }
      }

      if (block.body) {
        drawWrapped(String(block.body), 10, bodyFont, INK, 1.55);
        y -= 8;
      }

      const bullets: string[] = Array.isArray(block.bullets) ? block.bullets : [];
      for (const item of bullets) {
        ensureSpace(18);
        safeDraw("*", { x: MARGIN, y, font: bodyBold, size: 9, color: ACCENT });
        drawWrapped(String(item), 10, bodyFont, INK, 1.45, MARGIN + 14, CONTENT_W - 14);
        y -= 4;
      }

      const plus: string[] = Array.isArray(block.plusList) ? block.plusList : [];
      const minus: string[] = Array.isArray(block.minusList) ? block.minusList : [];
      if (plus.length || minus.length) {
        y -= 4;
        if (plus.length) {
          ensureSpace(16);
          safeDraw("STRENGTH", { x: MARGIN, y, font: bodyBold, size: 8, color: ACCENT });
          y -= 12;
          for (const item of plus) {
            safeDraw("*", { x: MARGIN, y, font: bodyBold, size: 9, color: ACCENT });
            drawWrapped(String(item), 10, bodyFont, INK, 1.45, MARGIN + 14, CONTENT_W - 14);
            y -= 2;
          }
        }
        if (minus.length) {
          y -= 6;
          ensureSpace(16);
          safeDraw("WEAKNESS", { x: MARGIN, y, font: bodyBold, size: 8, color: ACCENT });
          y -= 12;
          for (const item of minus) {
            safeDraw("*", { x: MARGIN, y, font: bodyBold, size: 9, color: ACCENT });
            drawWrapped(String(item), 10, bodyFont, INK, 1.45, MARGIN + 14, CONTENT_W - 14);
            y -= 2;
          }
        }
      }

      y -= 10;
    }
  }

  // ── Closing ───────────────────────────────────────────────────────────────
  newPage();
  y = PAGE_H - 140;
  drawCentered("*", 28, display, ACCENT);
  y -= 8;
  drawCentered("Your soulmate isn't a destination.", 16, display, INK);
  y -= 12;

  if (content?.mantra) {
    drawWrapped(`"${String(content.mantra)}"`, 13, displayItalic, INK, 1.6, MARGIN + 20, CONTENT_W - 40);
    y -= 16;
  }

  if (content?.summary) {
    drawWrapped(String(content.summary), 10, bodyFont, INK_SOFT, 1.5, MARGIN + 10, CONTENT_W - 20);
  }

  y -= 24;
  drawCentered(
    sanitizePdfText(`Soul + AI | Partner Decoding | ${firstName} | ${dobDisplay}`),
    8,
    bodyBold,
    INK_MUTED,
  );

  const pages = pdfDoc.getPages();
  const total = pages.length;
  for (let i = 0; i < total; i++) {
    const p = pages[i];
    const ft = sanitizePdfText(`Soul + AI Partner Reading  |  ${i + 1} / ${total}`);
    try {
      p.drawText(ft, {
        x: centerX(ft, 7, bodyBold, PAGE_W),
        y: FOOTER_Y,
        font: bodyBold,
        size: 7,
        color: INK_MUTED,
      });
    } catch (_) {}
  }

  const bytes = await pdfDoc.save({ useObjectStreams: false });
  return bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
}
