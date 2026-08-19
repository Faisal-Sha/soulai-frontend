import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encodeBase64 } from "https://deno.land/std@0.224.0/encoding/base64.ts";
import {
  PDFDocument,
  rgb,
  StandardFonts,
  degrees,
} from "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm";
import { createAdminClient } from "../_shared/supabase-client.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { sendEmail } from "../_shared/email.ts";
import { buildPartnerReadingPdf } from "../_shared/partner-pdf.ts";
import { buildPartnerReadingHtml } from "../_shared/partner-reading-html.ts";
import { hasChromiumPdfConfig, htmlToPdfChromium } from "../_shared/html-to-pdf.ts";

async function fetchFont(url: string): Promise<Uint8Array> {
  console.log(`[GeneratePDF] Fetching font: ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch font from ${url}`);
  const buffer = await res.arrayBuffer();
  return new Uint8Array(buffer);
}

const measureWrappedTextHeight = (text: string, fontSize: number, font: any, widthCap: number, lineSpacing = 1.5): number => {
  if (!text?.trim()) return 0;
  const paragraphs = text.split(/\r?\n/);
  let linesCount = 0;
  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) { linesCount += 0.5; continue; }
    const words = paragraph.split(" ");
    let currentLine = "";
    for (const word of words) {
      if (!word) continue;
      const testLine = currentLine + word + " ";
      if (font.widthOfTextAtSize(testLine, fontSize) > widthCap) {
        linesCount++;
        currentLine = word + " ";
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine.trim()) linesCount++;
  }
  return linesCount * fontSize * lineSpacing;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { userId, readingId, forceResend = false, forceRebuild = false } = body;
    console.log(`[GeneratePDF] RECEIVED REQUEST - User: ${userId}, Reading: ${readingId}, forceResend: ${!!forceResend}, forceRebuild: ${!!forceRebuild}`);

    if (!userId || !readingId) {
      return new Response(JSON.stringify({ error: "Missing userId or readingId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createAdminClient();

    const { data: reading, error: fetchError } = await supabase
      .from("readings").select("*").eq("id", readingId).single();
    if (fetchError || !reading) throw new Error(`Reading not found: ${fetchError?.message}`);

    const [{ data: profile }, { data: sub }, { data: lead }] = await Promise.all([
      supabase.from("profiles").select("email, full_name, language, dob").eq("id", reading.user_id).maybeSingle(),
      supabase.from("subscriptions").select("plan_type, status").eq("user_id", reading.user_id).maybeSingle(),
      reading.lead_id
        ? supabase.from("quiz_leads").select("answers").eq("id", reading.lead_id).maybeSingle()
        : supabase.from("quiz_leads").select("answers").eq("user_id", reading.user_id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
    ]);

    // Resolve DOB from profile → quiz lead → reading metadata (same sources as generate-reading)
    const birthFromAnswers = (answers: any): string | null => {
      const b = answers?.birthdate || answers?.birthDate || answers?.dob;
      if (!b) return null;
      if (typeof b === "string") {
        const iso = b.match(/^(\d{4})-(\d{2})-(\d{2})/)
          ? b.slice(0, 10)
          : null;
        if (iso) return iso;
        const dmy = b.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
        if (dmy) {
          return `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`;
        }
        return null;
      }
      if (b?.day && b?.month && b?.year) {
        return `${b.year}-${String(b.month).padStart(2, "0")}-${String(b.day).padStart(2, "0")}`;
      }
      return null;
    };

    let rawDob: string | null =
      (profile?.dob ? String(profile.dob).slice(0, 10) : null) ||
      birthFromAnswers(lead?.answers) ||
      (reading.content?.metadata?.dob
        ? String(reading.content.metadata.dob).slice(0, 10)
        : null) ||
      null;

    // Extra fallback: most recent quiz lead (in case reading.lead_id is missing / stale)
    if (!rawDob) {
      const { data: recentLeads } = await supabase
        .from("quiz_leads")
        .select("answers")
        .eq("user_id", reading.user_id)
        .order("created_at", { ascending: false })
        .limit(3);
      for (const row of recentLeads || []) {
        rawDob = birthFromAnswers(row?.answers);
        if (rawDob) break;
      }
    }

    // Normalize DD.MM.YYYY profile values to ISO
    if (rawDob && !/^\d{4}-\d{2}-\d{2}/.test(rawDob)) {
      const dmy = rawDob.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
      if (dmy) {
        rawDob = `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`;
      }
    }

    let dobDisplay = "Stellar Origin";
    let dobShort = "—";
    if (rawDob) {
      try {
        const [y2, m2, d2] = rawDob.split("-").map(Number);
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        if (y2 && m2 && d2) {
          dobDisplay = `${months[m2 - 1]} ${d2}, ${y2}`;
          dobShort = `${String(d2).padStart(2, "0")}.${String(m2).padStart(2, "0")}.${y2}`;
        } else {
          dobDisplay = rawDob;
          dobShort = rawDob;
        }
      } catch (_) {
        dobDisplay = rawDob;
        dobShort = rawDob;
      }
    }
    console.log(`[GeneratePDF] DOB resolved: ${rawDob} → ${dobShort} (${dobDisplay})`);

    const isPartnerReading =
      reading.content?.format === "partner_v1" ||
      reading.content?.format === "partner_v2";
    // Partner readings always rebuild into the lavender layout (skip stale old PDFs).
    const shouldRebuild = !!forceRebuild || isPartnerReading;

    let userEmail = profile?.email;
    let fullName = profile?.full_name || "there";
    const planType = sub?.plan_type || reading.plan_type || "free";
    let lang = profile?.language || "en";

    // Any paying / trial subscriber should get the PDF email (incl. $0.99 intro → status "trialing").
    // Plan SKU is logged but no longer required — missing SKUs previously blocked full_access_7day.
    const PAID_STATUSES = new Set(["active", "trialing", "past_due"]);
    const hasActiveSubscription = PAID_STATUSES.has(sub?.status ?? "");
    const alreadyEmailed = !!(reading as any).pdf_email_sent && !forceResend;

    if ((reading as any).pdf_email_sent && !forceResend) {
      console.log(`[GeneratePDF] Email already sent for reading ${readingId}. Skipping email step.`);
    } else if (forceResend && (reading as any).pdf_email_sent) {
      console.log(`[GeneratePDF] forceResend=true — will send PDF email again for reading ${readingId}`);
    }

    if (!userEmail) {
      const { data: { user } } = await supabase.auth.admin.getUserById(reading.user_id);
      if (user?.email) {
        userEmail = user.email;
        if (fullName === "there" && user.user_metadata?.full_name) fullName = user.user_metadata.full_name;
      }
      if (!userEmail) {
        const leadQuery = reading.lead_id
          ? supabase.from("quiz_leads").select("email").eq("id", reading.lead_id).maybeSingle()
          : supabase.from("quiz_leads").select("email").eq("user_id", reading.user_id).maybeSingle();
        const { data: leadEmail } = await leadQuery;
        if (leadEmail?.email) userEmail = leadEmail.email;
      }
      if (userEmail) {
        const updateData = { email: userEmail, full_name: fullName === "there" ? "" : fullName, language: lang };
        if (profile) await supabase.from("profiles").update(updateData).eq("id", reading.user_id);
        else await supabase.from("profiles").insert({ id: reading.user_id, ...updateData });
      }
    }

    console.log(`[GeneratePDF] DATA FETCHED - Email: ${userEmail}, Plan: ${planType}, Status: ${sub?.status ?? "none"}, Eligible: ${hasActiveSubscription}, Lang: ${lang}`);
    if (!userEmail) console.warn(`[GeneratePDF] SKIPPING EMAIL - No email found for user ${userId}`);
    if (!hasActiveSubscription) {
      console.log(`[GeneratePDF] Subscription not eligible yet (status=${sub?.status ?? "none"}, plan=${planType}). Email deferred until after payment.`);
    }

    // ── Fast path: PDF already on storage, only need to send the delivery email ──
    // Used by stripe-webhook after payment — avoids regenerating the whole PDF
    // (fonts + render) so the webhook can finish before Stripe times out.
    if (
      reading.pdf_url &&
      userEmail &&
      hasActiveSubscription &&
      !alreadyEmailed &&
      !shouldRebuild
    ) {
      console.log(`[GeneratePDF] Fast path — PDF exists, sending delivery email only for reading ${readingId}`);
      try {
        const fileName = `${reading.user_id}/${readingId}.pdf`;
        const { data: fileData, error: dlErr } = await supabase.storage
          .from("readings")
          .download(fileName);

        let pdfBytes: Uint8Array | null = null;
        if (!dlErr && fileData) {
          pdfBytes = new Uint8Array(await fileData.arrayBuffer());
        } else {
          console.warn(`[GeneratePDF] Fast-path download failed (${dlErr?.message ?? "no data"}) — will rebuild PDF`);
        }

        if (pdfBytes) {
          const siteUrl = Deno.env.get("SITE_URL") || "https://soulplus-ai.com";
          const readingUrl = `${siteUrl}/auth?redirect=/reading`;
          const downloadUrl = `${siteUrl}/download-report`;
          const isTopTier = ["premium","99.9","premium_12week","12-Week Premium"].includes(planType);

          const content = lang === "ru" ? {
            subject: "Ваше чтение Soul+AI готово!",
            greeting: `Здравствуйте, ${fullName}!`,
            body: "Ваш персональный отчет синтезирован и готов к изучению.",
            viewButton: "Открыть мое чтение",
            downloadButton: "Скачать PDF отчет",
            mariaTitle: "Ваше напоминание о сессии с Марией Лит",
            mariaBody: "Как обладатель премиум-плана, вы можете забронировать сессию 1:1 здесь:",
            mariaButton: "Забронировать встречу",
            attachNote: "PDF-отчет также прикреплен к этому письму. Кнопка «Скачать» откроет Soul+AI — войдите в аккаунт, чтобы получить новую ссылку в любое время.",
            footer: "С наилучшими пожеланиями, команда Soul+AI",
          } : {
            subject: "Your Soul+AI Partner Reading is Ready!",
            greeting: `Hello, ${fullName}!`,
            body: "Your personal soulmate partner reading has been synthesized and is ready for you to explore.",
            viewButton: "Open My Reading",
            downloadButton: "Download PDF Report",
            mariaTitle: "Reminder: Your 1:1 with Maria Lit",
            mariaBody: "As a Premium member, you can book your private session here:",
            mariaButton: "Book My Session",
            attachNote: "A PDF copy is also attached to this email. The Download button opens Soul+AI — sign in anytime to get a fresh copy (older direct links expire after about an hour).",
            footer: "Best regards, The Soul+AI Team",
          };

          const meetingSection = isTopTier ? `
            <div style="background:#FFF9F2;border:1px solid #FFEDD5;padding:20px;border-radius:12px;margin:25px 0;">
              <h3 style="color:#9A3412;margin-top:0;">${content.mariaTitle}</h3>
              <p style="color:#9A3412;">${content.mariaBody}</p>
              <a href="https://calendly.com/marialit" style="background:#9A3412;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">${content.mariaButton}</a>
            </div>` : "";

          const emailResult = await sendEmail(
            userEmail, content.subject,
            `<div style="font-family:sans-serif;line-height:1.6;color:#333;padding:20px;">
              <h2>${content.greeting}</h2><p>${content.body}</p>
              <div style="margin:30px 0;">
                <a href="${readingUrl}" style="background:#5D4BE0;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;margin-right:10px;">${content.viewButton}</a>
                <a href="${downloadUrl}" style="background:#10B981;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">${content.downloadButton}</a>
              </div>
              ${meetingSection}
              <p>${content.attachNote}</p>
              <p style="margin-top:30px;border-top:1px solid #eee;padding-top:20px;">${content.footer}</p>
            </div>`,
            "SoulPlus AI",
            [{ filename: `Soul_AI_Reading_${fullName.replace(/\s+/g,"_")}.pdf`, content: encodeBase64(pdfBytes) }]
          );

          if (emailResult.error) {
            console.error(`[GeneratePDF] Fast-path email failed for ${userEmail}:`, emailResult.error);
          } else {
            console.log(`[GeneratePDF] Fast-path delivery email sent to ${userEmail}`);
            await supabase.from("readings").update({ pdf_email_sent: true }).eq("id", readingId);
            return new Response(JSON.stringify({ success: true, pdfUrl: reading.pdf_url, emailSent: true }), {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 200,
            });
          }
        }
      } catch (fastErr: any) {
        console.warn(`[GeneratePDF] Fast path failed, falling back to rebuild: ${fastErr.message}`);
      }
    }

    // Already emailed and PDF exists — nothing left to do (unless force rebuild)
    if (alreadyEmailed && reading.pdf_url && !shouldRebuild) {
      return new Response(JSON.stringify({ success: true, pdfUrl: reading.pdf_url, emailSent: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // ── 2. Build PDF ──────────────────────────────────────────────────────────
    let pdfBytes: Uint8Array;

    if (isPartnerReading) {
      console.log(`[GeneratePDF] Building partner PDF (${reading.content?.format}) for ${readingId}`);
      const html = buildPartnerReadingHtml({
        content: reading.content,
        fullName,
        dob: rawDob,
        dobDisplay: dobShort !== "—" ? dobShort : null,
      });
      console.log(`[GeneratePDF] Partner HTML DOB slot: raw=${rawDob} short=${dobShort}`);

      // Chromium only — do NOT fall back to pdf-lib (that was serving the "old" look).
      if (!hasChromiumPdfConfig()) {
        throw new Error(
          "BROWSERLESS_API_KEY is not set. Partner PDF requires Chromium HTML→PDF (Browserless free tier).",
        );
      }
      console.log(`[GeneratePDF] Using Chromium HTML→PDF (Browserless), htmlChars=${html.length}`);
      pdfBytes = new Uint8Array(await htmlToPdfChromium(html));
    } else {
    /** Legacy free-form reading PDF */
    const flattenPartnerBlocks = (section: any): string => {
      if (section?.content && typeof section.content === "string" && section.content.trim()) {
        return section.content;
      }
      const blocks = section?.blocks;
      if (!Array.isArray(blocks) || !blocks.length) return "";
      const parts: string[] = [];
      for (const b of blocks) {
        if (b?.title) parts.push(String(b.title));
        if (b?.body) parts.push(String(b.body));
        if (Array.isArray(b?.bullets) && b.bullets.length) {
          parts.push(b.bullets.map((x: string) => `• ${x}`).join("\n"));
        }
        if (Array.isArray(b?.plusList) && b.plusList.length) {
          parts.push("Strength:\n" + b.plusList.map((x: string) => `• ${x}`).join("\n"));
        }
        if (Array.isArray(b?.minusList) && b.minusList.length) {
          parts.push("Weakness:\n" + b.minusList.map((x: string) => `• ${x}`).join("\n"));
        }
      }
      return parts.join("\n\n");
    };

    const pdfDoc = await PDFDocument.create();

    let outfitRegular: any, outfitBold: any, playfairBold: any, playfairItalic: any;
    try {
      const [r, b, pb, pi] = await Promise.all([
        fetchFont("https://raw.githubusercontent.com/google/fonts/main/ofl/outfit/static/Outfit-Regular.ttf"),
        fetchFont("https://raw.githubusercontent.com/google/fonts/main/ofl/outfit/static/Outfit-Bold.ttf"),
        fetchFont("https://raw.githubusercontent.com/google/fonts/main/ofl/playfairdisplay/static/PlayfairDisplay-Bold.ttf"),
        fetchFont("https://raw.githubusercontent.com/google/fonts/main/ofl/playfairdisplay/static/PlayfairDisplay-Italic.ttf"),
      ]);
      outfitRegular  = await pdfDoc.embedFont(r);
      outfitBold     = await pdfDoc.embedFont(b);
      playfairBold   = await pdfDoc.embedFont(pb);
      playfairItalic = await pdfDoc.embedFont(pi);
    } catch (fontErr) {
      console.warn(`[GeneratePDF] Font load failed, using fallback: ${fontErr.message}`);
      outfitRegular  = await pdfDoc.embedFont(StandardFonts.Helvetica);
      outfitBold     = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      playfairBold   = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
      playfairItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    }

    const PAGE_WIDTH  = 595.28;
    const PAGE_HEIGHT = 841.89;
    const MARGIN = 50;
    const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

    // ── Colors ────────────────────────────────────────────────────────────────
    // Cover (dark purple)
    const COLOR_BG    = rgb(0.102, 0.071, 0.188); // rgb(26,18,48)
    const COLOR_GOLD  = rgb(0.831, 0.686, 0.478); // #D4AF7A
    const COLOR_WHITE = rgb(0.961, 0.902, 1.000); // #F5E6FF
    // Content pages (light)
    const COLOR_PAGE_BG    = rgb(1.000, 1.000, 1.000);
    const COLOR_TEXT       = rgb(0.133, 0.133, 0.133); // #222
    const COLOR_TEXT_MUTED = rgb(0.450, 0.450, 0.450);
    const COLOR_DIVIDER    = rgb(0.878, 0.839, 0.780); // #E0D6C7
    const COLOR_CALLOUT_BG = rgb(0.996, 0.988, 0.973); // #FEF9F8
    const COLOR_REC_BG     = rgb(0.980, 0.976, 0.969); // very light warm

    const drawCoverBg    = (p: any) => p.drawRectangle({ x:0, y:0, width:PAGE_WIDTH, height:PAGE_HEIGHT, color:COLOR_BG });
    const drawContentBg  = (p: any) => p.drawRectangle({ x:0, y:0, width:PAGE_WIDTH, height:PAGE_HEIGHT, color:COLOR_PAGE_BG });

    let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let y = PAGE_HEIGHT - MARGIN;

    const newContentPage = () => {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      drawContentBg(page);
      y = PAGE_HEIGHT - MARGIN;
    };

    const drawWrappedText = (
      text: string, fontSize: number,
      font = outfitRegular, color = COLOR_TEXT,
      lineSpacing = 1.5, xOffset = MARGIN, widthOverride = CONTENT_WIDTH,
    ) => {
      if (!text?.trim()) return;
      for (const para of text.split(/\r?\n/)) {
        if (!para.trim()) { y -= fontSize * lineSpacing * 0.5; continue; }
        let line = "";
        for (const word of para.split(" ")) {
          if (!word) continue;
          const tl = line + word + " ";
          if (font.widthOfTextAtSize(tl, fontSize) > widthOverride) {
            if (line.trim()) {
              if (y - fontSize < MARGIN + 50) newContentPage();
              page.drawText(line.trim(), { x: xOffset, y, font, size: fontSize, color });
              y -= fontSize * lineSpacing;
            }
            line = word + " ";
          } else { line = tl; }
        }
        if (line.trim()) {
          if (y - fontSize < MARGIN + 50) newContentPage();
          page.drawText(line.trim(), { x: xOffset, y, font, size: fontSize, color });
          y -= fontSize * lineSpacing;
        }
      }
    };

    // ══════════════════════════════════════════════════════════════════════════
    // PAGE 1 — COVER (dark purple)
    // ══════════════════════════════════════════════════════════════════════════
    drawCoverBg(page)
    y = PAGE_HEIGHT - 120;

    try {
      page.drawLine({ start:{x:PAGE_WIDTH/2-80,y:y+25}, end:{x:PAGE_WIDTH/2+80,y:y+25}, color:COLOR_GOLD, thickness:0.8, opacity:0.3 });
      const s1 = PAGE_WIDTH/2-40;
      page.drawLine({ start:{x:s1,y:y-5}, end:{x:s1,y:y+5}, color:COLOR_GOLD, thickness:1 });
      page.drawLine({ start:{x:s1-5,y}, end:{x:s1+5,y}, color:COLOR_GOLD, thickness:1 });
      page.drawRectangle({ x:PAGE_WIDTH/2-4, y:y-4, width:8, height:8, color:COLOR_BG, borderColor:COLOR_GOLD, borderWidth:1, rotate:degrees(45) });
      const s2 = PAGE_WIDTH/2+40;
      page.drawLine({ start:{x:s2,y:y-5}, end:{x:s2,y:y+5}, color:COLOR_GOLD, thickness:1 });
      page.drawLine({ start:{x:s2-5,y}, end:{x:s2+5,y}, color:COLOR_GOLD, thickness:1 });
    } catch (_) {}
    y -= 50;

    try {
      const sh = "HUMAN DESIGN & DESTINY MATRIX";
      page.drawText(sh, { x:(PAGE_WIDTH-outfitBold.widthOfTextAtSize(sh,10))/2, y, font:outfitBold, size:10, color:COLOR_GOLD });
    } catch (_) {}
    y -= 60;

    try {
      const dec = "Decoding";
      page.drawText(dec, { x:(PAGE_WIDTH-playfairItalic.widthOfTextAtSize(dec,32))/2, y, font:playfairItalic, size:32, color:COLOR_WHITE });
    } catch (_) {}
    y -= 45;

    try {
      const ttl = "YOUR DESTINY";
      page.drawText(ttl, { x:(PAGE_WIDTH-playfairBold.widthOfTextAtSize(ttl,32))/2, y, font:playfairBold, size:32, color:COLOR_WHITE });
    } catch (_) {}
    y -= 50;

    try {
      const desc = "A complete energetic blueprint and soul synthesis";
      page.drawText(desc, { x:(PAGE_WIDTH-outfitRegular.widthOfTextAtSize(desc,11))/2, y, font:outfitRegular, size:11, color:COLOR_WHITE, opacity:0.6 });
    } catch (_) {}
    y -= 120;

    try {
      const bl = "B O R N";
      page.drawText(bl, { x:(PAGE_WIDTH-outfitBold.widthOfTextAtSize(bl,9))/2, y, font:outfitBold, size:9, color:COLOR_WHITE, opacity:0.6 });
      y -= 28;
      page.drawText(dobDisplay, { x:(PAGE_WIDTH-playfairItalic.widthOfTextAtSize(dobDisplay,24))/2, y, font:playfairItalic, size:24, color:COLOR_WHITE });
    } catch (_) {}
    y -= 150;

    try {
      const lY = y;
      page.drawText("RECIPIENT",       { x:100,              y:lY,    font:outfitBold,   size:9,  color:COLOR_WHITE, opacity:0.6 });
      page.drawText(fullName,          { x:100,              y:lY-25, font:playfairBold,  size:18, color:COLOR_GOLD });
      page.drawLine({ start:{x:PAGE_WIDTH/2,y:lY+10}, end:{x:PAGE_WIDTH/2,y:lY-40}, color:COLOR_GOLD, thickness:0.5, opacity:0.3 });
      page.drawText("SYNTHESIS",       { x:PAGE_WIDTH/2+50,  y:lY,    font:outfitBold,   size:9,  color:COLOR_WHITE, opacity:0.6 });
      page.drawText("Soul + AI Reading",{ x:PAGE_WIDTH/2+50, y:lY-25, font:playfairBold,  size:18, color:COLOR_GOLD });
    } catch (_) {}

    // ══════════════════════════════════════════════════════════════════════════
    // PAGE 2 — EXECUTIVE INSIGHTS (white)
    // ══════════════════════════════════════════════════════════════════════════
    newContentPage();

    try { page.drawText("OPENING RESONANCE", { x:MARGIN, y, font:outfitBold, size:8, color:COLOR_GOLD }); } catch (_) {}
    y -= 16;
    page.drawLine({ start:{x:MARGIN,y}, end:{x:PAGE_WIDTH-MARGIN,y}, color:COLOR_DIVIDER, thickness:0.5 });
    y -= 26;
    try { page.drawText("Executive Insights", { x:MARGIN, y, font:playfairBold, size:26, color:COLOR_TEXT }); } catch (_) {}
    y -= 40;

    const summaryText = reading.content?.summary || "Your cosmic frequency is a unique signature in the tapestry of the universe.";
    try { page.drawText("\u201C", { x:MARGIN, y:y+8, font:playfairBold, size:48, color:COLOR_GOLD, opacity:0.25 }); } catch (_) {}
    y -= 5;
    drawWrappedText(summaryText, 13, playfairItalic, COLOR_TEXT, 1.6, MARGIN+20, CONTENT_WIDTH-20);
    y -= 28;

    page.drawLine({ start:{x:MARGIN,y}, end:{x:PAGE_WIDTH-MARGIN,y}, color:COLOR_DIVIDER, thickness:0.5 });
    y -= 22;
    try { page.drawText("PRIORITY ENERGETIC DIRECTIVES", { x:MARGIN, y, font:outfitBold, size:8, color:COLOR_GOLD }); } catch (_) {}
    y -= 18;

    const recommendations: string[] = reading.content?.recommendations ?? [];
    for (let i = 0; i < Math.min(recommendations.length, 4); i++) {
      const recText = recommendations[i];
      const recH = measureWrappedTextHeight(recText, 11, outfitRegular, CONTENT_WIDTH-55, 1.5);
      const cardH = Math.max(48, recH + 20);
      if (y - cardH < MARGIN + 50) newContentPage();

      page.drawRectangle({ x:MARGIN, y:y-cardH, width:CONTENT_WIDTH, height:cardH, color:COLOR_REC_BG, borderColor:COLOR_DIVIDER, borderWidth:0.5 });
      page.drawCircle({ x:MARGIN+22, y:y-cardH/2, size:12, color:COLOR_GOLD });
      try { page.drawText(String(i+1), { x:MARGIN+19, y:y-cardH/2-4, font:outfitBold, size:9, color:COLOR_PAGE_BG }); } catch (_) {}

      const prevY = y;
      y = prevY - 14;
      let line = "";
      const ix = MARGIN+48, wc = CONTENT_WIDTH-55;
      for (const w of recText.split(" ")) {
        const tl = line + w + " ";
        if (outfitRegular.widthOfTextAtSize(tl, 11) > wc) {
          page.drawText(line.trim(), { x:ix, y, font:outfitRegular, size:11, color:COLOR_TEXT });
          y -= 16; line = w + " ";
        } else { line = tl; }
      }
      if (line.trim()) page.drawText(line.trim(), { x:ix, y, font:outfitRegular, size:11, color:COLOR_TEXT });
      y = prevY - cardH - 12;
    }

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION PAGES — each section on its own white page
    // ══════════════════════════════════════════════════════════════════════════
    const rawSections: any[] = reading.content?.sections ?? [];
    const sections: Array<{ title?: string; content?: string; meaning?: string; actionItems?: string[] }> =
      rawSections.map((s) => ({
        title: s.title,
        content: flattenPartnerBlocks(s),
        meaning: s.meaning,
        actionItems: s.actionItems,
      }));

    for (const section of sections) {
      // Always start a fresh page per section
      newContentPage();

      // "Energetic Module" label
      try { page.drawText("ENERGETIC MODULE", { x:MARGIN, y, font:outfitBold, size:8, color:COLOR_GOLD }); } catch (_) {}
      y -= 16;
      page.drawLine({ start:{x:MARGIN,y}, end:{x:PAGE_WIDTH-MARGIN,y}, color:COLOR_DIVIDER, thickness:0.5 });
      y -= 28;

      // Section title — word-wrapped so long titles don't overflow
      if (section.title) {
        const titleSize = 22;
        const titleLineSpacing = titleSize * 1.3;
        const words = section.title.split(" ");
        let titleLine = "";
        for (const word of words) {
          const tl = titleLine + word + " ";
          if (playfairBold.widthOfTextAtSize(tl, titleSize) > CONTENT_WIDTH) {
            if (titleLine.trim()) {
              try { page.drawText(titleLine.trim(), { x:MARGIN, y, font:playfairBold, size:titleSize, color:COLOR_TEXT }); } catch (_) {}
              y -= titleLineSpacing;
            }
            titleLine = word + " ";
          } else { titleLine = tl; }
        }
        if (titleLine.trim()) {
          try { page.drawText(titleLine.trim(), { x:MARGIN, y, font:playfairBold, size:titleSize, color:COLOR_TEXT }); } catch (_) {}
          y -= titleLineSpacing;
        }
        y -= 12; // extra gap after title
      }

      // Body content — wrapped in a card (off-white bg + darker border)
      // Body content — wrapped in a card (off-white bg + darker border)
      if (section.content) {
        const cp = 18; // card padding
        const ciw = CONTENT_WIDTH - cp * 2;
        const ctH = measureWrappedTextHeight(section.content, 11, outfitRegular, ciw, 1.6);
        const cardH = ctH + cp * 2;

        if (y - cardH < MARGIN + 50) newContentPage();

        // Card: slightly off-white bg with a warm gray border
        page.drawRectangle({
          x: MARGIN, y: y - cardH,
          width: CONTENT_WIDTH, height: cardH,
          color: rgb(0.976, 0.973, 0.969),   // #F9F8F7 — warm off-white
          borderColor: rgb(0.820, 0.800, 0.776), // #D1CCC6 — darker warm gray border
          borderWidth: 0.75,
        });

        const prevY = y;
        y = y - cp;
        drawWrappedText(section.content, 11, outfitRegular, COLOR_TEXT, 1.6, MARGIN + cp, ciw);
        y = prevY - cardH - 20;
        const cp = 18; // card padding
        const ciw = CONTENT_WIDTH - cp * 2;
        const ctH = measureWrappedTextHeight(section.content, 11, outfitRegular, ciw, 1.6);
        const cardH = ctH + cp * 2;

        if (y - cardH < MARGIN + 50) newContentPage();

        // Card: slightly off-white bg with a warm gray border
        page.drawRectangle({
          x: MARGIN, y: y - cardH,
          width: CONTENT_WIDTH, height: cardH,
          color: rgb(0.976, 0.973, 0.969),   // #F9F8F7 — warm off-white
          borderColor: rgb(0.820, 0.800, 0.776), // #D1CCC6 — darker warm gray border
          borderWidth: 0.75,
        });

        const prevY = y;
        y = y - cp;
        drawWrappedText(section.content, 11, outfitRegular, COLOR_TEXT, 1.6, MARGIN + cp, ciw);
        y = prevY - cardH - 20;
      }

      // "What This Means For You" callout — left gold border (matches web)
      const calloutText: string =
        (section as any).meaning ||
        ((section.actionItems ?? []).join("\n")) ||
        "";

      if (calloutText.trim()) {
        if (y - 80 < MARGIN + 50) newContentPage();
        y -= 10;

        const cp = 16; // callout padding
        const ciw = CONTENT_WIDTH - cp * 2 - 6;
        const ctH = measureWrappedTextHeight(calloutText, 10, outfitRegular, ciw, 1.5);
        const cH  = ctH + cp * 2 + 22;

        // Background
        page.drawRectangle({ x:MARGIN+4, y:y-cH, width:CONTENT_WIDTH-4, height:cH, color:COLOR_CALLOUT_BG });
        // Left gold border bar
        page.drawRectangle({ x:MARGIN, y:y-cH, width:4, height:cH, color:COLOR_GOLD });

        try { page.drawText("WHAT THIS MEANS FOR YOU", { x:MARGIN+cp+4, y:y-cp-6, font:outfitBold, size:8, color:COLOR_GOLD }); } catch (_) {}

        y = y - cp - 22;
        drawWrappedText(calloutText, 10, outfitRegular, COLOR_TEXT, 1.5, MARGIN+cp+4, ciw);
        y -= 20;
      }

      // Bottom ornament line
      if (y > MARGIN + 60) {
        page.drawLine({ start:{x:MARGIN,y:MARGIN+40}, end:{x:PAGE_WIDTH-MARGIN,y:MARGIN+40}, color:COLOR_DIVIDER, thickness:0.5 });
      }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // AFFIRMATIONS PAGE (dark — cover page style)
    // AFFIRMATIONS PAGE (dark — cover page style)
    // ══════════════════════════════════════════════════════════════════════════
    const affirmations: string[] = [
      ...(reading.content?.mantra ? [String(reading.content.mantra)] : []),
      ...(reading.content?.affirmations ?? []),
    ];

    // Closing letter — render as a normal content section (white bg)
    const closingSection = reading.content?.closing || reading.content?.closingLetter || null;
    if (closingSection) {
      newContentPage();

      try { page.drawText("ENERGETIC MODULE", { x:MARGIN, y, font:outfitBold, size:8, color:COLOR_GOLD }); } catch (_) {}
      y -= 16;
      page.drawLine({ start:{x:MARGIN,y}, end:{x:PAGE_WIDTH-MARGIN,y}, color:COLOR_DIVIDER, thickness:0.5 });
      y -= 28;
      try { page.drawText("Closing Letter", { x:MARGIN, y, font:playfairBold, size:22, color:COLOR_TEXT }); } catch (_) {}
      y -= 35;

      const closingText = typeof closingSection === "string" ? closingSection : (closingSection.content || "");
      const closingMeaning = typeof closingSection === "object" ? (closingSection.meaning || closingSection.actionItems?.join("\n") || "") : "";

      if (closingText) {
        drawWrappedText(closingText, 11, outfitRegular, COLOR_TEXT, 1.6);
        y -= 20;
      }

      if (closingMeaning) {
        if (y - 80 < MARGIN + 50) newContentPage();
        y -= 10;
        const cp = 16, ciw = CONTENT_WIDTH - cp * 2 - 6;
        const ctH = measureWrappedTextHeight(closingMeaning, 10, outfitRegular, ciw, 1.5);
        const cH  = ctH + cp * 2 + 22;
        page.drawRectangle({ x:MARGIN+4, y:y-cH, width:CONTENT_WIDTH-4, height:cH, color:COLOR_CALLOUT_BG });
        page.drawRectangle({ x:MARGIN, y:y-cH, width:4, height:cH, color:COLOR_GOLD });
        try { page.drawText("WHAT THIS MEANS FOR YOU", { x:MARGIN+cp+4, y:y-cp-6, font:outfitBold, size:8, color:COLOR_GOLD }); } catch (_) {}
        y = y - cp - 22;
        drawWrappedText(closingMeaning, 10, outfitRegular, COLOR_TEXT, 1.5, MARGIN+cp+4, ciw);
        y -= 20;
      }
    }


    // Closing letter — render as a normal content section (white bg)
    const closingSection = reading.content?.closing || reading.content?.closingLetter || null;
    if (closingSection) {
      newContentPage();

      try { page.drawText("ENERGETIC MODULE", { x:MARGIN, y, font:outfitBold, size:8, color:COLOR_GOLD }); } catch (_) {}
      y -= 16;
      page.drawLine({ start:{x:MARGIN,y}, end:{x:PAGE_WIDTH-MARGIN,y}, color:COLOR_DIVIDER, thickness:0.5 });
      y -= 28;
      try { page.drawText("Closing Letter", { x:MARGIN, y, font:playfairBold, size:22, color:COLOR_TEXT }); } catch (_) {}
      y -= 35;

      const closingText = typeof closingSection === "string" ? closingSection : (closingSection.content || "");
      const closingMeaning = typeof closingSection === "object" ? (closingSection.meaning || closingSection.actionItems?.join("\n") || "") : "";

      if (closingText) {
        drawWrappedText(closingText, 11, outfitRegular, COLOR_TEXT, 1.6);
        y -= 20;
      }

      if (closingMeaning) {
        if (y - 80 < MARGIN + 50) newContentPage();
        y -= 10;
        const cp = 16, ciw = CONTENT_WIDTH - cp * 2 - 6;
        const ctH = measureWrappedTextHeight(closingMeaning, 10, outfitRegular, ciw, 1.5);
        const cH  = ctH + cp * 2 + 22;
        page.drawRectangle({ x:MARGIN+4, y:y-cH, width:CONTENT_WIDTH-4, height:cH, color:COLOR_CALLOUT_BG });
        page.drawRectangle({ x:MARGIN, y:y-cH, width:4, height:cH, color:COLOR_GOLD });
        try { page.drawText("WHAT THIS MEANS FOR YOU", { x:MARGIN+cp+4, y:y-cp-6, font:outfitBold, size:8, color:COLOR_GOLD }); } catch (_) {}
        y = y - cp - 22;
        drawWrappedText(closingMeaning, 10, outfitRegular, COLOR_TEXT, 1.5, MARGIN+cp+4, ciw);
        y -= 20;
      }
    }

    if (affirmations.length > 0) {
      // White page — only the cards are dark purple
      // White page — only the cards are dark purple
      newContentPage();

      // ── Top ornament: ✧ ◇ ✧ — drawn at a fixed position, doesn't affect y cursor ──
      try {
        const ornY = y - 10; // center of ornament, 10pt below current y
        const cx = PAGE_WIDTH / 2;
        // Horizontal faded line behind the icons
        page.drawLine({ start:{x:cx-90, y:ornY}, end:{x:cx+90, y:ornY}, color:COLOR_GOLD, thickness:0.5, opacity:0.3 });
        // Left ✧ sparkle
        const lx = cx - 45;
        page.drawLine({ start:{x:lx, y:ornY-7}, end:{x:lx, y:ornY+7}, color:COLOR_GOLD, thickness:1.2 });
        page.drawLine({ start:{x:lx-7, y:ornY}, end:{x:lx+7, y:ornY}, color:COLOR_GOLD, thickness:1.2 });
        // Center ◇ diamond
        page.drawRectangle({ x:cx-6, y:ornY-6, width:12, height:12, color:COLOR_PAGE_BG, borderColor:COLOR_GOLD, borderWidth:1.2, rotate:degrees(45) });
        // Right ✧ sparkle
        const rx = cx + 45;
        page.drawLine({ start:{x:rx, y:ornY-7}, end:{x:rx, y:ornY+7}, color:COLOR_GOLD, thickness:1.2 });
        page.drawLine({ start:{x:rx-7, y:ornY}, end:{x:rx+7, y:ornY}, color:COLOR_GOLD, thickness:1.2 });
      } catch (_) {}
      y -= 38; // move cursor past the ornament

      try { page.drawText("COSMIC INVOCATIONS", { x:(PAGE_WIDTH-outfitBold.widthOfTextAtSize("COSMIC INVOCATIONS",8))/2, y, font:outfitBold, size:8, color:COLOR_GOLD }); } catch (_) {}
      y -= 16;
      page.drawLine({ start:{x:MARGIN,y}, end:{x:PAGE_WIDTH-MARGIN,y}, color:COLOR_DIVIDER, thickness:0.5 });
      y -= 28;
      try {
        const aTitle = "Affirmations";
        page.drawText(aTitle, { x:MARGIN, y, font:playfairBold, size:26, color:COLOR_TEXT });
      } catch (_) {}
      try {
        const aTitle = "Affirmations";
        page.drawText(aTitle, { x:MARGIN, y, font:playfairBold, size:26, color:COLOR_TEXT });
      } catch (_) {}
      y -= 40;

      // Each affirmation as a dark purple card on the white page
      // Each affirmation as a dark purple card on the white page
      for (let i = 0; i < affirmations.length; i++) {
        const affText = `\u201C${affirmations[i]}\u201D`;
        const affH = measureWrappedTextHeight(affText, 14, playfairItalic, CONTENT_WIDTH-40, 1.6);
        const cardH = affH + 52;

        if (y - cardH < MARGIN + 50) newContentPage();
        const cardH = affH + 52;

        if (y - cardH < MARGIN + 50) newContentPage();

        // Dark purple card
        page.drawRectangle({ x:MARGIN, y:y-cardH, width:CONTENT_WIDTH, height:cardH, color:COLOR_BG, borderColor:COLOR_GOLD, borderWidth:0.5 });

        // Label
        try { page.drawText(`COSMIC INVOCATION ${i+1}`, { x:MARGIN+20, y:y-16, font:outfitBold, size:8, color:COLOR_GOLD, opacity:0.8 }); } catch (_) {}

        // Quote text in white italic
        let qLine = "", qCurY = y - 36;
        for (const word of affText.split(" ")) {
          const tl = qLine + word + " ";
          if (playfairItalic.widthOfTextAtSize(tl, 14) > CONTENT_WIDTH - 40) {
            try { page.drawText(qLine.trim(), { x:MARGIN+20, y:qCurY, font:playfairItalic, size:14, color:COLOR_WHITE }); } catch (_) {}
            qCurY -= 22; qLine = word + " ";
          } else { qLine = tl; }
        }
        if (qLine.trim()) {
          try { page.drawText(qLine.trim(), { x:MARGIN+20, y:qCurY, font:playfairItalic, size:14, color:COLOR_WHITE }); } catch (_) {}
        }

        y = y - cardH - 16;
        // Dark purple card
        page.drawRectangle({ x:MARGIN, y:y-cardH, width:CONTENT_WIDTH, height:cardH, color:COLOR_BG, borderColor:COLOR_GOLD, borderWidth:0.5 });

        // Label
        try { page.drawText(`COSMIC INVOCATION ${i+1}`, { x:MARGIN+20, y:y-16, font:outfitBold, size:8, color:COLOR_GOLD, opacity:0.8 }); } catch (_) {}

        // Quote text in white italic
        let qLine = "", qCurY = y - 36;
        for (const word of affText.split(" ")) {
          const tl = qLine + word + " ";
          if (playfairItalic.widthOfTextAtSize(tl, 14) > CONTENT_WIDTH - 40) {
            try { page.drawText(qLine.trim(), { x:MARGIN+20, y:qCurY, font:playfairItalic, size:14, color:COLOR_WHITE }); } catch (_) {}
            qCurY -= 22; qLine = word + " ";
          } else { qLine = tl; }
        }
        if (qLine.trim()) {
          try { page.drawText(qLine.trim(), { x:MARGIN+20, y:qCurY, font:playfairItalic, size:14, color:COLOR_WHITE }); } catch (_) {}
        }

        y = y - cardH - 16;
      }

      // Closing line
      page.drawLine({ start:{x:MARGIN,y:MARGIN+40}, end:{x:PAGE_WIDTH-MARGIN,y:MARGIN+40}, color:COLOR_DIVIDER, thickness:0.5 });
      try {
        const closing = "Soul+AI Blueprint \u00A9 2026 \u2022 Designed for Eternity";
        page.drawText(closing, { x:(PAGE_WIDTH-outfitBold.widthOfTextAtSize(closing,7))/2, y:MARGIN+26, font:outfitBold, size:7, color:COLOR_TEXT_MUTED });
      } catch (_) {}
      // Closing line
      page.drawLine({ start:{x:MARGIN,y:MARGIN+40}, end:{x:PAGE_WIDTH-MARGIN,y:MARGIN+40}, color:COLOR_DIVIDER, thickness:0.5 });
      try {
        const closing = "Soul+AI Blueprint \u00A9 2026 \u2022 Designed for Eternity";
        page.drawText(closing, { x:(PAGE_WIDTH-outfitBold.widthOfTextAtSize(closing,7))/2, y:MARGIN+26, font:outfitBold, size:7, color:COLOR_TEXT_MUTED });
      } catch (_) {}
    }

    // ══════════════════════════════════════════════════════════════════════════
    // FOOTERS — all pages except cover (index 0)
    // ══════════════════════════════════════════════════════════════════════════
    try {
      const pages = pdfDoc.getPages();
      const totalPages = pages.length;
      for (let i = 1; i < totalPages; i++) {
        const p = pages[i];
        p.drawLine({ start:{x:MARGIN,y:38}, end:{x:PAGE_WIDTH-MARGIN,y:38}, color:COLOR_DIVIDER, thickness:0.5 });
        const ft = `Human Design + Destiny Reading  \u00B7  Page ${i+1} of ${totalPages}`;
        p.drawText(ft, { x:(PAGE_WIDTH-outfitBold.widthOfTextAtSize(ft,7))/2, y:24, font:outfitBold, size:7, color:COLOR_TEXT_MUTED });
      }
    } catch (footErr) {
      console.warn(`[GeneratePDF] Footer rendering failed: ${footErr.message}`);
    }

    // ── 3. Serialize PDF ──────────────────────────────────────────────────────
    const savedLegacy = await pdfDoc.save({ useObjectStreams: false });
    pdfBytes = new Uint8Array(savedLegacy);
    } // end legacy PDF branch

    console.log(`[GeneratePDF] PDF serialized — size: ${pdfBytes.byteLength} bytes`);

    if (!pdfBytes || pdfBytes.byteLength < 800) {
      throw new Error(`PDF output looks invalid (${pdfBytes?.byteLength ?? 0} bytes).`);
    }

    const fileName = `${userId}/${readingId}.pdf`;

    // ── 4. Upload to Storage ──────────────────────────────────────────────────
    const { error: uploadError } = await supabase.storage
      .from("readings")
      .upload(fileName, pdfBytes, { contentType: "application/pdf", upsert: true });
    if (uploadError) { console.error(`[GeneratePDF] Upload error: ${uploadError.message}`); throw uploadError; }

    // ── 5. Get Public URL ─────────────────────────────────────────────────────
    const { data: { publicUrl } } = supabase.storage.from("readings").getPublicUrl(fileName);

    // ── 6. Update reading record ──────────────────────────────────────────────
    const { error: updateError } = await supabase
      .from("readings")
      .update({ pdf_url: publicUrl, pdf_generated_at: new Date().toISOString() })
      .eq("id", readingId);
    if (updateError) throw updateError;

    console.log(`[GeneratePDF] Successfully generated PDF for reading ${readingId}: ${publicUrl}`);

    // ── 7. Send delivery email ────────────────────────────────────────────────
    if (userEmail && hasActiveSubscription && !alreadyEmailed) {
      const siteUrl = Deno.env.get("SITE_URL") || "https://soulplus-ai.com";
      const readingUrl = `${siteUrl}/auth?redirect=/reading`;

      // App route issues a fresh signed URL after sign-in (avoids raw storage JWT errors when links expire).
      const downloadUrl = `${siteUrl}/download-report`;
      const isTopTier = ["premium","99.9","premium_12week","12-Week Premium"].includes(planType);

      const content = lang === "ru" ? {
        subject: "Ваше чтение Soul+AI готово!",
        greeting: `Здравствуйте, ${fullName}!`,
        body: "Ваш персональный отчет синтезирован и готов к изучению.",
        viewButton: "Открыть мое чтение",
        downloadButton: "Скачать PDF отчет",
        mariaTitle: "Ваше напоминание о сессии с Марией Лит",
        mariaBody: "Как обладатель премиум-плана, вы можете забронировать сессию 1:1 здесь:",
        mariaButton: "Забронировать встречу",
        attachNote: "PDF-отчет также прикреплен к этому письму. Кнопка «Скачать» откроет Soul+AI — войдите в аккаунт, чтобы получить новую ссылку в любое время.",
        footer: "С наилучшими пожеланиями, команда Soul+AI",
      } : {
        subject: "Your Soul+AI Partner Reading is Ready!",
        greeting: `Hello, ${fullName}!`,
        body: "Your personal soulmate partner reading has been synthesized and is ready for you to explore.",
        viewButton: "Open My Reading",
        downloadButton: "Download PDF Report",
        mariaTitle: "Reminder: Your 1:1 with Maria Lit",
        mariaBody: "As a Premium member, you can book your private session here:",
        mariaButton: "Book My Session",
        attachNote: "A PDF copy is also attached to this email. The Download button opens Soul+AI — sign in anytime to get a fresh copy (older direct links expire after about an hour).",
        footer: "Best regards, The Soul+AI Team",
      };

      const meetingSection = isTopTier ? `
        <div style="background:#FFF9F2;border:1px solid #FFEDD5;padding:20px;border-radius:12px;margin:25px 0;">
          <h3 style="color:#9A3412;margin-top:0;">${content.mariaTitle}</h3>
          <p style="color:#9A3412;">${content.mariaBody}</p>
          <a href="https://calendly.com/marialit" style="background:#9A3412;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">${content.mariaButton}</a>
        </div>` : "";

      const emailResult = await sendEmail(
        userEmail, content.subject,
        `<div style="font-family:sans-serif;line-height:1.6;color:#333;padding:20px;">
          <h2>${content.greeting}</h2><p>${content.body}</p>
          <div style="margin:30px 0;">
            <a href="${readingUrl}" style="background:#5D4BE0;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;margin-right:10px;">${content.viewButton}</a>
            <a href="${downloadUrl}" style="background:#10B981;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">${content.downloadButton}</a>
          </div>
          ${meetingSection}
          <p>${content.attachNote}</p>
          <p style="margin-top:30px;border-top:1px solid #eee;padding-top:20px;">${content.footer}</p>
        </div>`,
        "SoulPlus AI",
        [{ filename: `Soul_AI_Reading_${fullName.replace(/\s+/g,"_")}.pdf`, content: encodeBase64(pdfBytes) }]
      );

      if (emailResult.error) {
        console.error(`[GeneratePDF] Failed to send email to ${userEmail}:`, emailResult.error);
      } else {
        console.log(`[GeneratePDF] Delivery email sent to ${userEmail} (Plan: ${planType})`);
        await supabase.from("readings").update({ pdf_email_sent: true }).eq("id", readingId);
      }
    } else if (!hasActiveSubscription) {
      console.log(`[GeneratePDF] Skipping email — no active subscription for user ${userId}.`);
    }

    return new Response(JSON.stringify({ success: true, pdfUrl: publicUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error(`[GeneratePDF] Error: ${error.message}`);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
