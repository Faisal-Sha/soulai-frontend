import React, { useEffect, useMemo, useState } from "react";
import type { PartnerReadingData, ReadingBlock, PartnerSectionData } from "@/types/reading";

function formatDob(dob?: string | null): string {
  if (!dob) return "—";
  const s = String(dob).trim();
  // YYYY-MM-DD → DD.MM.YYYY
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[3]}.${m[2]}.${m[1]}`;
  // Already DD.MM.YYYY or DD/MM/YYYY
  m = s.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (m) return `${m[1].padStart(2, "0")}.${m[2].padStart(2, "0")}.${m[3]}`;
  return s;
}

function calcAge(dob?: string | null): number | null {
  if (!dob) return null;
  const s = String(dob).trim();
  let iso = s;
  const dmy = s.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (dmy) iso = `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`;
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age >= 0 && age < 130 ? age : null;
}

function Paragraphs({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <>
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i}>{para.trim()}</p>
      ))}
    </>
  );
}

function BlockView({ block }: { block: ReadingBlock }) {
  // Use level-h2/level-h3 — never bare "h2"/"h3" classes (collide with pdf-report.css height rules)
  const levelClass = block.level === "h2" ? "level-h2" : "level-h3";
  return (
    <div className={`pr-sub ${levelClass}`}>
      {block.title ? (
        block.level === "h2" ? (
          <h2 className="pr-sub-title">{block.title}</h2>
        ) : (
          <h3 className="pr-sub-title">{block.title}</h3>
        )
      ) : null}
      <Paragraphs text={block.body} />
      {block.bullets && block.bullets.length > 0 && (
        <ul>
          {block.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {(block.plusList?.length || block.minusList?.length) ? (
        <div className="plus-minus">
          {block.plusList && block.plusList.length > 0 && (
            <div className="plus-minus-col">
              <h4>Strength</h4>
              <ul>
                {block.plusList.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}
          {block.minusList && block.minusList.length > 0 && (
            <div className="plus-minus-col">
              <h4>Weakness</h4>
              <ul>
                {block.minusList.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : null}
      {block.insightText ? (
        <aside className="pr-insight">
          <div className="pr-insight-label">{block.insightLabel || "AI Insight"}</div>
          <p className="pr-insight-text">{block.insightText}</p>
        </aside>
      ) : null}
    </div>
  );
}

function Chapter({
  section,
  index,
}: {
  section: PartnerSectionData;
  index: number;
}) {
  return (
    <article className="chapter" id={`chapter-${index + 1}`}>
      <header className="chapter-head">
        <div className="chapter-glyph">{section.glyph || "✦"}</div>
        <div className="chapter-label">{section.label}</div>
        <h1 className="chapter-title">{section.title}</h1>
      </header>
      {section.blocks.map((block, i) => (
        <BlockView key={`${section.id}-${i}`} block={block} />
      ))}
    </article>
  );
}

export interface PartnerReadingViewProps {
  content: PartnerReadingData;
  fullName: string;
  dob?: string | null;
  onDownload: () => void;
  isDownloading?: boolean;
  downloadLabel?: string;
  onBack?: () => void;
  /** ACTIVATION: open mentor chat on Home */
  onAskMentor?: () => void;
}

export const PartnerReadingView: React.FC<PartnerReadingViewProps> = ({
  content,
  fullName,
  dob,
  onDownload,
  isDownloading = false,
  downloadLabel = "Download as PDF",
  onBack,
  onAskMentor,
}) => {
  const [activeId, setActiveId] = useState("chapter-1");
  const [progress, setProgress] = useState(0);
  const firstName = fullName.split(" ")[0] || fullName || "Seeker";
  const initial = (firstName[0] || "S").toUpperCase();
  const dobDisplay = formatDob(dob);
  const age = calcAge(dob);

  const chapters = content.sections;

  const chapterCount = chapters.length;

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);

      const nodes = chapters
        .map((_, i) => document.getElementById(`chapter-${i + 1}`))
        .filter(Boolean) as HTMLElement[];
      let current = "chapter-1";
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= 120) current = node.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [chapters]);

  const topbarIndex = useMemo(() => {
    const idx = chapters.findIndex((_, i) => `chapter-${i + 1}` === activeId);
    return idx >= 0 ? idx + 1 : 1;
  }, [activeId, chapters]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="partner-reading">
      <div className="reading-progress">
        <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="app-shell">
        <aside className="sidebar no-print">
          <div className="sidebar-brand">
            <div className="sidebar-brand-glyph">✦</div>
            <span>Soul + AI</span>
          </div>

          <div className="sidebar-user">
            <div className="sidebar-user-name">{firstName}</div>
            <div className="sidebar-user-meta">
              {dobDisplay}
              {age != null ? ` · ${age} years` : ""}
            </div>
          </div>

          <nav className="sidebar-toc">
            <div className="sidebar-toc-label">Your reading</div>
            {chapters.map((section, i) => {
              const id = `chapter-${i + 1}`;
              const num = section.id === "conclusion" ? "✦" : String(i + 1).padStart(2, "0");
              return (
                <button
                  key={section.id}
                  type="button"
                  className={`toc-link${activeId === id ? " active" : ""}`}
                  onClick={() => scrollTo(id)}
                >
                  <span className="toc-link-num">{num}</span>
                  <span>{section.tocTitle || section.title}</span>
                </button>
              );
            })}
          </nav>

          <div className="sidebar-foot">
            {onAskMentor && (
              <button type="button" className="sidebar-action" onClick={onAskMentor}>
                <span className="sidebar-action-icon">✦</span>
                <span>Ask your mentor</span>
              </button>
            )}
            {onBack && (
              <button type="button" className="sidebar-action" onClick={onBack}>
                <span className="sidebar-action-icon">←</span>
                <span>Back</span>
              </button>
            )}
            <button
              type="button"
              className="sidebar-action"
              onClick={onDownload}
              disabled={isDownloading}
            >
              <span className="sidebar-action-icon">⬇</span>
              <span>{isDownloading ? "Downloading…" : downloadLabel}</span>
            </button>
            <button type="button" className="sidebar-action" onClick={() => window.print()}>
              <span className="sidebar-action-icon">⎙</span>
              <span>Print this reading</span>
            </button>
          </div>
        </aside>

        <main className="main">
          <div className="topbar no-print">
            <div className="topbar-name">{firstName}&apos;s reading</div>
            <div className="topbar-progress">
              {topbarIndex} of {chapterCount}
            </div>
          </div>

          <header className="hero">
            <div className="hero-inner">
              <div className="hero-blob">{initial}</div>
              <div className="hero-eyebrow">{content.heroEyebrow || "Your Soulmate Reading"}</div>
              <h1 className="hero-title">{content.heroTitle || "Portrait of the ideal partner"}</h1>
              <div className="hero-sub">A personal reading for {firstName}</div>
              <div className="hero-meta-row">
                <span>Born {dobDisplay}</span>
                {age != null && <span>{age} years</span>}
                <span>9 chapters</span>
              </div>
            </div>
          </header>

          <div className="article">
            {chapters.map((section, i) => (
              <Chapter key={section.id} section={section} index={i} />
            ))}

            {content.mantra && (
              <div className="closing-card">
                <div className="closing-glyph">✦</div>
                <div className="closing-title">Your soulmate isn&apos;t a destination.</div>
                <p className="mantra-line">&ldquo;{content.mantra}&rdquo;</p>
                <p className="closing-body">
                  {content.summary}
                </p>
                <div className="closing-foot">
                  Soul + AI · Partner Decoding · {firstName} · {dobDisplay}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartnerReadingView;
