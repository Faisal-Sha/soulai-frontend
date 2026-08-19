import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import * as analytics from "@/lib/mixpanel";

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
  analyticsName: string;
  analyticsPath: string;
  relatedLink?: { label: string; path: string };
};

export function LegalDocumentLayout({
  title,
  lastUpdated,
  intro,
  sections,
  analyticsName,
  analyticsPath,
  relatedLink,
}: LegalDocumentLayoutProps) {
  useEffect(() => {
    analytics.trackPageView(analyticsName, analyticsPath);
    window.scrollTo(0, 0);
  }, [analyticsName, analyticsPath]);

  return (
    <main className="min-h-screen transition-colors text-foreground pt-24 pb-16 overflow-x-hidden max-w-full">
      <div className="container mx-auto px-4 max-w-4xl overflow-hidden">
        <div className="mb-10 md:mb-14 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            SoulPlus
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent">
              {title}
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">Last Updated: {lastUpdated}</p>
          {relatedLink && (
            <p className="mt-4 text-sm text-muted-foreground">
              Also see our{" "}
              <Link
                to={relatedLink.path}
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                {relatedLink.label}
              </Link>
            </p>
          )}
        </div>

        <div className="bg-card border border-border rounded-lg p-5 sm:p-8 mb-6 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {intro}
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="bg-card border border-border rounded-lg p-5 sm:p-8"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 tracking-tight">
                {section.title}
              </h2>

              {section.paragraphs?.map((paragraph, index) => (
                <p
                  key={`${section.title}-p-${index}`}
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}

              {section.items && section.items.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 last:mb-0">
                  {section.items.map((item, index) => (
                    <li key={`${section.title}-i-${index}`}>{item}</li>
                  ))}
                </ul>
              )}

              {section.subsections?.map((sub) => (
                <div key={sub.title} className="mt-6 first:mt-4">
                  <h3 className="text-base sm:text-lg font-medium text-foreground mb-3">
                    {sub.title}
                  </h3>
                  {sub.paragraphs?.map((paragraph, index) => (
                    <p
                      key={`${sub.title}-p-${index}`}
                      className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {sub.items && sub.items.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
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
    </main>
  );
}
