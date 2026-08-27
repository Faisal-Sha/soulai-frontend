import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SoulBrand } from "@/components/soul";
import bgRipple from "@/pages/home/assets/bg-ripple.png";
import "@/pages/legal/soul-legal.css";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  paragraphsAfter?: string[];
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
}: LegalDocumentLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="soul-legal" data-name={`Legal · ${title}`}>
      <div className="soul-legal__bg" aria-hidden="true">
        <img className="soul-legal__bg-img" src={bgRipple} alt="" />
        <div className="soul-legal__bg-dim" />
      </div>
      <div className="soul-legal__scrim" aria-hidden="true" />

      <div className="soul-legal__scroll">
        <div className="soul-legal__column">
          <header className="soul-legal__header">
            <Link to="/" className="soul-legal__brand-link" aria-label="Soul+AI home">
              <SoulBrand />
            </Link>
          </header>

            <div className="soul-legal__spacer" aria-hidden="true" />

            <div className="soul-legal__hero">
              <div className="soul-legal__hero-head">
                <p className="soul-legal__meta">Last Updated:&nbsp;{lastUpdated}</p>
                <h1 className="soul-legal__title">{title}</h1>
              </div>
              <div className="soul-legal__intro">{intro}</div>
            </div>

            <div className="soul-legal__stack">
              {sections.map((section) => (
                <section key={section.title} className="soul-legal__card-wrap">
                  <div className="soul-legal__card">
                    <h2 className="soul-legal__section-title">{section.title}</h2>

                    {section.paragraphs?.map((paragraph, index) => (
                      <p key={`${section.title}-p-${index}`} className="soul-legal__paragraph">
                        {paragraph}
                      </p>
                    ))}

                    {section.items && section.items.length > 0 && (
                      <ul className="soul-legal__list">
                        {section.items.map((item, index) => (
                          <li key={`${section.title}-i-${index}`}>• {item}</li>
                        ))}
                      </ul>
                    )}

                    {section.paragraphsAfter?.map((paragraph, index) => (
                      <p
                        key={`${section.title}-after-${index}`}
                        className={
                          index === 0
                            ? "soul-legal__paragraph soul-legal__paragraph--after-list"
                            : "soul-legal__paragraph soul-legal__paragraph--tight"
                        }
                      >
                        {paragraph}
                      </p>
                    ))}

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
                              <li key={`${sub.title}-i-${index}`}>• {item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <footer className="soul-legal__footer">
              <hr className="soul-legal__divider" />
              <p className="soul-legal__footer-tag">
                Helping you unlock your potential through ancient wisdom and modern technology.
              </p>
              <div className="soul-legal__footer-links">
                <Link to="/contact">Support</Link>
                <Link to="/account">Manage subscription</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/faq">Refund Policy</Link>
              </div>
              <a className="soul-legal__footer-email" href="mailto:support@soulplusai.com">
                support@soulplusai.com
              </a>
              <div className="soul-legal__footer-links">
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  Facebook
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  Twitter
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                  Youtube
                </a>
              </div>
              <p className="soul-legal__footer-copy">© 2026 Soul+AI. All rights reserved.</p>
            </footer>
        </div>
      </div>
    </div>
  );
}
