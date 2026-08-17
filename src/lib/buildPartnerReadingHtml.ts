/**
 * Client-side print HTML for partner readings (mirrors edge partner-reading-html.ts).
 * Used for browser Save-as-PDF which matches /reading visuals.
 */

function esc(input: unknown): string {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphsHtml(text?: string): string {
  if (!text?.trim()) return "";
  return text
    .split(/\n\n+/)
    .map((p) => `<p>${esc(p.trim()).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function bulletsHtml(items?: string[]): string {
  if (!items?.length) return "";
  return `<ul>${items.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`;
}

function blockHtml(block: {
  level?: string;
  title?: string;
  body?: string;
  bullets?: string[];
  plusList?: string[];
  minusList?: string[];
  insightLabel?: string;
  insightText?: string;
}): string {
  const level = block?.level === "h2" ? "h2" : "h3";
  const title = block?.title
    ? level === "h2"
      ? `<h2 class="pr-sub-title">${esc(block.title)}</h2>`
      : `<h3 class="pr-sub-title">${esc(block.title)}</h3>`
    : "";

  let plusMinus = "";
  if (block?.plusList?.length || block?.minusList?.length) {
    plusMinus = `<div class="plus-minus">`;
    if (block?.plusList?.length) {
      plusMinus += `<div class="plus-minus-col"><h4>Strength</h4>${bulletsHtml(block.plusList)}</div>`;
    }
    if (block?.minusList?.length) {
      plusMinus += `<div class="plus-minus-col"><h4>Weakness</h4>${bulletsHtml(block.minusList)}</div>`;
    }
    plusMinus += `</div>`;
  }

  const insight = block?.insightText
    ? `<aside class="pr-insight"><div class="pr-insight-label">${esc(block.insightLabel || "AI Insight")}</div><p class="pr-insight-text">${esc(block.insightText)}</p></aside>`
    : "";

  return `<div class="pr-sub level-${level}">
    ${title}
    ${paragraphsHtml(block?.body)}
    ${bulletsHtml(block?.bullets)}
    ${plusMinus}
    ${insight}
  </div>`;
}

function formatDob(dob?: string | null): string {
  if (!dob) return "—";
  const m = String(dob).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[3]}.${m[2]}.${m[1]}`;
  return String(dob);
}

function calcAge(dob?: string | null): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

const PRINT_CSS = `
:root {
  --surface: #ECE7F8; --surface-alt: #DDD3F2; --paper: #FAF7FF;
  --card: rgba(255,255,255,0.85); --ink: #14093E; --ink-soft: #443786;
  --ink-muted: #7569AA; --accent: #5D4BE0; --accent-soft: rgba(93,75,224,0.10);
  --accent-border: rgba(93,75,224,0.30); --border: rgba(40,22,110,0.10);
  --border-strong: rgba(40,22,110,0.18);
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', -apple-system, system-ui, sans-serif;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  font-family: var(--font-body); color: var(--ink); background-color: #ECE7F8;
  -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
}
body::before {
  content: ''; position: fixed; inset: 0; z-index: -1;
  background: linear-gradient(180deg, #ECE7F8 0%, #DDD3F2 100%);
  -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
}
h1,h2,h3,h4 { font-family: var(--font-display); font-weight: 600; letter-spacing: -0.01em; color: var(--ink); }
p { line-height: 1.75; } ul { list-style: none; }
.partner-reading {
  background: linear-gradient(180deg, var(--surface) 0%, var(--surface-alt) 100%);
  background-color: var(--surface); min-height: 0; position: relative; z-index: 0;
}
.main { width: 100%; max-width: 820px; margin: 0 auto; }
.hero { padding: 48px 40px 40px; text-align: center; border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
.hero::before { content:''; position:absolute; inset:-40% -40% auto auto; width:70%; aspect-ratio:1; background: radial-gradient(circle, var(--accent-soft) 0%, transparent 60%); }
.hero-inner { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }
.hero-blob {
  width: 110px; height: 110px; margin: 0 auto 22px;
  background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 35%, transparent 70%), linear-gradient(135deg, #5D4BE0 0%, #9B82FF 100%);
  border-radius: 50% 40% 55% 45% / 50% 50% 45% 55%;
  display: grid; place-items: center; font-family: var(--font-display); font-size: 48px; font-weight: 500; color: white;
}
.hero-eyebrow { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); font-weight: 600; margin-bottom: 12px; }
.hero-title { font-size: 40px; font-weight: 500; line-height: 1.08; letter-spacing: -0.025em; margin-bottom: 14px; }
.hero-sub { font-family: var(--font-display); font-size: 17px; font-style: italic; color: var(--ink-soft); margin-bottom: 24px; }
.hero-meta-row {
  display: inline-flex; padding: 10px 24px; border: 1px solid var(--border-strong); border-radius: 999px;
  background: var(--card); font-size: 11px; letter-spacing: 0.14em; color: var(--ink-soft); font-weight: 600; text-transform: uppercase;
}
.hero-meta-row span:not(:first-child)::before { content: '·'; margin: 0 10px; opacity: 0.5; }
.article { padding: 36px 40px 56px; }
.chapter { max-width: 720px; margin: 0 auto 36px; page-break-inside: auto; break-inside: auto; }
.chapter-head {
  text-align: center; padding: 32px 0 22px; border-bottom: 1px solid var(--border); margin-bottom: 22px; position: relative;
  page-break-after: avoid; break-after: avoid-page; page-break-inside: avoid; break-inside: avoid;
}
.chapter-head::after { content:''; position:absolute; left:50%; bottom:-1px; transform:translateX(-50%); width:64px; height:1px; background: var(--accent); }
.chapter-glyph {
  width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 50%;
  background: var(--accent-soft); border: 1px solid var(--accent-border);
  display: grid; place-items: center; font-family: var(--font-display); font-size: 22px; color: var(--accent);
}
.chapter-label { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); font-weight: 600; margin-bottom: 12px; }
.chapter-title { font-size: 28px; font-weight: 500; line-height: 1.15; }
.pr-sub { margin: 0 0 18px; page-break-inside: auto; break-inside: auto; }
.pr-sub.level-h2 .pr-sub-title { font-size: 20px; padding-bottom: 8px; border-bottom: 1px solid var(--border-strong); margin: 0 0 14px; color: var(--accent); font-weight: 500; }
.pr-sub.level-h3 .pr-sub-title { font-size: 16px; margin: 0 0 10px; color: var(--ink); font-weight: 500; }
.pr-sub p { font-size: 14.5px; line-height: 1.75; margin: 0 0 10px; }
.pr-sub ul { padding: 4px 0; margin: 8px 0; }
.pr-sub ul li { font-size: 14px; line-height: 1.65; padding: 10px 0 10px 26px; position: relative; border-bottom: 1px solid rgba(40,22,110,0.06); page-break-inside: avoid; break-inside: avoid; }
.pr-sub ul li:last-child { border-bottom: none; }
.pr-sub ul li::before { content: '✦'; position: absolute; left: 2px; top: 11px; color: var(--accent); font-size: 12px; }
.plus-minus { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 10px; }
.plus-minus-col h4 { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; font-family: var(--font-body); font-weight: 600; }
.pr-insight { margin-top: 14px; padding: 14px 16px; border-radius: 14px; border: 1px solid var(--accent-border); background: var(--accent-soft); page-break-inside: avoid; }
.pr-insight-label { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; color: var(--accent); margin-bottom: 6px; font-family: var(--font-body); }
.pr-insight-text { font-size: 13.5px; line-height: 1.65; color: var(--ink); margin: 0; }
.closing-card { max-width: 600px; margin: 28px auto 0; padding: 32px 28px; background: var(--card); border: 1px solid var(--border); border-radius: 24px; text-align: center; page-break-inside: avoid; break-inside: avoid; }
.closing-glyph { font-family: var(--font-display); font-size: 42px; color: var(--accent); margin-bottom: 16px; }
.closing-title { font-size: 24px; font-weight: 500; margin-bottom: 12px; }
.mantra-line { font-family: var(--font-display); font-style: italic; font-size: 18px; color: var(--ink); line-height: 1.5; margin: 18px 0; }
.closing-body { font-size: 14px; color: var(--ink-soft); line-height: 1.7; }
.closing-foot { font-size: 11px; color: var(--ink-muted); letter-spacing: 0.06em; margin-top: 20px; }
@page { size: A4; margin: 1cm 1.1cm; }
@media print {
  html, body { background-color: #ECE7F8 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  body::before { background: linear-gradient(180deg, #ECE7F8 0%, #DDD3F2 100%) !important; }
  .partner-reading { background: linear-gradient(180deg, #ECE7F8 0%, #DDD3F2 100%) !important; background-color: #ECE7F8 !important; min-height: 0 !important; }
  .hero { padding: 18px 24px 20px !important; page-break-after: avoid; break-after: avoid-page; }
  .hero-blob { width: 72px; height: 72px; font-size: 32px; margin-bottom: 12px; }
  .hero-title { font-size: 28px; margin-bottom: 8px; }
  .hero-sub { font-size: 15px; margin-bottom: 12px; }
  .article { padding: 16px 24px 28px !important; }
  .chapter { margin-bottom: 22px !important; page-break-inside: auto !important; break-inside: auto !important; }
  .chapter-head { padding: 22px 0 16px !important; margin-bottom: 14px !important; }
  .chapter-title { font-size: 22px; }
}
`;

export function buildPartnerReadingHtml(opts: {
  content: any;
  fullName: string;
  dob?: string | null;
}): string {
  const { content, fullName, dob } = opts;
  const firstName = (fullName || "Seeker").split(" ")[0] || "Seeker";
  const initial = (firstName[0] || "S").toUpperCase();
  const dobDisplay = formatDob(dob);
  const age = calcAge(dob);
  const sections: any[] = Array.isArray(content?.sections) ? content.sections : [];
  const chapterCount = Math.max(9, sections.filter((s) => s?.id !== "conclusion").length);

  const chaptersHtml = sections
    .map((section, i) => {
      const blocks = Array.isArray(section?.blocks)
        ? section.blocks.map(blockHtml).join("")
        : "";
      return `<article class="chapter" id="chapter-${i + 1}">
        <header class="chapter-head">
          <div class="chapter-glyph">${esc(section?.glyph || "✦")}</div>
          <div class="chapter-label">${esc(section?.label || "")}</div>
          <h1 class="chapter-title">${esc(section?.title || "")}</h1>
        </header>
        ${blocks}
      </article>`;
    })
    .join("\n");

  const closing = content?.mantra
    ? `<div class="closing-card">
        <div class="closing-glyph">✦</div>
        <div class="closing-title">Your soulmate isn't a destination.</div>
        <p class="mantra-line">"${esc(content.mantra)}"</p>
        <p class="closing-body">${esc(content.summary || "")}</p>
        <div class="closing-foot">Soul + AI · Partner Decoding · ${esc(firstName)} · ${esc(dobDisplay)}</div>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${esc(firstName)}'s Reading - Soul + AI</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>${PRINT_CSS}</style>
</head>
<body>
<div class="partner-reading">
  <main class="main">
    <header class="hero">
      <div class="hero-inner">
        <div class="hero-blob">${esc(initial)}</div>
        <div class="hero-eyebrow">${esc(content?.heroEyebrow || "Your Soulmate Reading")}</div>
        <h1 class="hero-title">${esc(content?.heroTitle || "Portrait of the ideal partner")}</h1>
        <div class="hero-sub">A personal reading for ${esc(firstName)}</div>
        <div class="hero-meta-row">
          <span>Born ${esc(dobDisplay)}</span>
          ${age != null ? `<span>${age} years</span>` : ""}
          <span>${chapterCount} chapters</span>
        </div>
      </div>
    </header>
    <div class="article">
      ${chaptersHtml}
      ${closing}
    </div>
  </main>
</div>
</body>
</html>`;
}

/** Open the print-ready HTML and trigger the browser print dialog (Save as PDF). */
export function printPartnerReadingHtml(opts: {
  content: any;
  fullName: string;
  dob?: string | null;
}): void {
  const html = buildPartnerReadingHtml(opts);
  const w = window.open("", "_blank");
  if (!w) {
    throw new Error("Popup blocked — allow popups to export the reading PDF.");
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
  // Wait for fonts, then print (same path as your successful Microsoft Print to PDF export)
  const trigger = () => {
    try {
      w.focus();
      w.print();
    } catch (_) {
      /* ignore */
    }
  };
  w.onload = () => setTimeout(trigger, 600);
  setTimeout(trigger, 1200);
}
