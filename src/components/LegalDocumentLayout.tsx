import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SoulBrand } from "@/components/soul";
import bgRipple from "@/pages/home/assets/bg-ripple.png";
import "@/pages/legal/soul-legal.css";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  subsections?: {
    title: string;
    paragraphs?: string[];
    items?: string[];
  }[];
};

type LegalDocumentLayoutProps = {
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
  relatedLink?: { label: string; path: string };
};

export function LegalDocumentLayout({
  title,
  lastUpdated,
  intro,
  sections,
  relatedLink,
}: LegalDocumentLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="soul-legal" data-name={`Legal · ${title}`}>
      <div className="soul-legal__bg" aria-hidden="true">
        <div className="soul-legal__bg-tile soul-legal__bg-tile--1">
          <img src={bgRipple} alt="" />
          <span className="soul-legal__bg-dim" />
        </div>
        <div className="soul-legal__bg-tile soul-legal__bg-tile--2">
          <img src={bgRipple} alt="" />
          <span className="soul-legal__bg-dim" />
        </div>
      </div>
      <div className="soul-legal__scrim" aria-hidden="true" />
      <div className="soul-legal__dock-scrim" aria-hidden="true" />

      <div className="soul-legal__scroll">
        <header className="soul-legal__header">
          <Link to="/" className="soul-legal__brand-link" aria-label="Soul+AI home">
            <SoulBrand />
          </Link>
        </header>

        <div className="soul-legal__hero">
          <p className="soul-legal__eyebrow">SoulPlus</p>
          <h1 className="soul-legal__title">{title}</h1>
          <p className="soul-legal__meta">Last updated · {lastUpdated}</p>
          {relatedLink && (
            <p className="soul-legal__related">
              Also see our{" "}
              <Link to={relatedLink.path} className="soul-legal__related-link">
                {relatedLink.label}
              </Link>
            </p>
          )}
        </div>

        <div className="soul-legal__stack">
          <div className="soul-legal__card soul-legal__card--intro">{intro}</div>

          {sections.map((section) => (
            <section key={section.title} className="soul-legal__card">
              <h2 className="soul-legal__section-title">{section.title}</h2>

              {section.paragraphs?.map((paragraph, index) => (
                <p key={`${section.title}-p-${index}`} className="soul-legal__paragraph">
                  {paragraph}
                </p>
              ))}

              {section.items && section.items.length > 0 && (
                <ul className="soul-legal__list">
                  {section.items.map((item, index) => (
                    <li key={`${section.title}-i-${index}`}>{item}</li>
                  ))}
                </ul>
              )}

              {section.subsections?.map((sub) => (
                <div key={sub.title} className="soul-legal__subsection">
                  <h3 className="soul-legal__subsection-title">{sub.title}</h3>
                  {sub.paragraphs?.map((paragraph, index) => (
                    <p key={`${sub.title}-p-${index}`} className="soul-legal__paragraph">
                      {paragraph}
                    </p>
                  ))}
                  {sub.items && sub.items.length > 0 && (
                    <ul className="soul-legal__list">
                      {sub.items.map((item, index) => (
                        <li key={`${sub.title}-i-${index}`}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
