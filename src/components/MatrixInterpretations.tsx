import { type MatrixValues } from "@/core/calc";
import { useLanguage } from "@/contexts/LanguageContext";
import { energies as energiesRu } from "@/content/energies.ru";
import { energies as energiesEn } from "@/content/energies.en";
import { zones as zonesRu } from "@/content/zones.ru";
import { zones as zonesEn } from "@/content/zones.en";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Youtube } from "lucide-react";

interface MatrixInterpretationsProps {
  result: MatrixValues;
}

export function MatrixInterpretations({ result }: MatrixInterpretationsProps) {
  const { language } = useLanguage();
  const energies = language === 'ru' ? energiesRu : energiesEn;
  const zones = language === 'ru' ? zonesRu : zonesEn;
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleAllSections = () => {
    const allExpanded = sections.every(section => expandedSections[section.key]);
    const newState: Record<string, boolean> = {};
    sections.forEach(section => {
      newState[section.key] = !allExpanded;
    });
    setExpandedSections(newState);
  };

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    // If already an embed URL, return as is
    if (url.includes('/embed/')) {
      return url;
    }

    // Extract video ID from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    return url;
  };

  const sections = [
    { key: 'a', value: result.a, zone: zones.a, zoneKey: 'a' },
    { key: 'e', value: result.e, zone: zones.e, zoneKey: 'e' },
    { key: 'b', value: result.b, zone: zones.b, zoneKey: 'b' },
    { key: 'c', value: result.c, zone: zones.c, zoneKey: 'c' },
    { key: 'd', value: result.d, zone: zones.d, zoneKey: 'd' },
  ];

  const allExpanded = sections.every(section => expandedSections[section.key]);

  const t = {
    howItManifests: language === 'ru' ? 'Как проявляется в жизни:' : 'How it manifests:',
    practicalApplication: language === 'ru' ? 'Практическое применение:' : 'Practical application:',
    prosAndCons: language === 'ru' ? 'Плюсы и минусы:' : 'Pros and cons:',
    recommendations: language === 'ru' ? 'Рекомендации:' : 'Recommendations:',
    readMore: language === 'ru' ? 'Читать подробнее' : 'Read more',
    showLess: language === 'ru' ? 'Свернуть' : 'Show less',
    expandAll: language === 'ru' ? 'Развернуть все' : 'Expand all',
    collapseAll: language === 'ru' ? 'Свернуть все' : 'Collapse all',
    videoGuide: language === 'ru' ? 'Видео-гид' : 'Video Guide',
    energyExplanation: language === 'ru' ? 'Объяснение энергии' : 'Energy Explanation'
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex justify-end px-2 sm:px-0">
        <Button
          variant="outline"
          onClick={toggleAllSections}
          className="gap-1.5 sm:gap-2 h-8 sm:h-9 text-xs sm:text-sm px-2.5 sm:px-3"
        >
          {allExpanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{t.collapseAll}</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{t.expandAll}</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {sections.map((section) => {
          const energy = energies[section.value];
          const isExpanded = expandedSections[section.key];

          return (
            <div
              key={section.key}
              className={`group relative overflow-hidden rounded-3xl border bg-card backdrop-blur-xl transition-all duration-500 hover:border-border/80 hover:shadow-2xl ${isExpanded ? 'shadow-2xl ring-1 ring-border' : ''}`}

            >
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Watermark Number */}
              <div className="absolute -right-6 -top-10 text-[120px] sm:text-[180px] font-black text-foreground/5 select-none pointer-events-none z-0 tracking-tighter transition-transform duration-700 group-hover:scale-110 group-hover:text-foreground/10">
                {section.value}
              </div>

              <div className="relative z-10 p-6 sm:p-8">
                {/* Header Section */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] bg-primary/20 text-primary border border-primary/20 shadow-[0_0_10px_-3px_var(--tw-shadow-color)] shadow-primary/30">
                        {section.zone.title}
                      </span>
                      <div className="h-px w-8 bg-border/20" />
                    </div>

                    <h3 className="text-xl sm:text-4xl font-black text-foreground tracking-tight leading-tight mb-2 drop-shadow-sm text-balance">
                      {energy?.name || 'Unknown'}
                    </h3>

                    <p className="text-sm sm:text-base text-muted-foreground/90 font-light leading-relaxed max-w-[85%]">
                      {section.zone.description}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => toggleSection(section.key)}
                    className="shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-foreground/5 border border-border/80 hover:bg-foreground/10 hover:scale-110 transition-all duration-300 flex items-center justify-center group/btn"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-foreground/70 group-hover/btn:text-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-foreground/70 group-hover/btn:text-foreground" />
                    )}
                  </Button>
                </div>

                {/* Keywords (Tags) */}
                {!isExpanded && energy?.keywords && energy.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {energy.keywords.slice(0, 4).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-foreground/5 border border-border/80 text-[11px] uppercase font-semibold tracking-wider text-muted-foreground transition-all duration-300 hover:bg-foreground/10 hover:text-foreground hover:border-border"
                      >
                        {keyword}
                      </span>
                    ))}
                    {energy.keywords.length > 4 && (
                      <span className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-muted-foreground/50">
                        +{energy.keywords.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-8 pt-8 border-t border-border/80 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">

                    {/* Full Description & Keywords */}
                    <div className="space-y-4">
                      {energy?.shortDesc && (
                        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-light">
                          {energy.shortDesc}
                        </p>
                      )}

                      {energy?.keywords && (
                        <div className="flex flex-wrap gap-2">
                          {energy.keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-[11px] uppercase font-bold tracking-wider text-primary shadow-[0_0_15px_-5px_var(--tw-shadow-color)] shadow-primary/30"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* YouTube Video */}
                    {energy?.videoUrl && (
                      <div className="rounded-2xl overflow-hidden border border-border/80 bg-foreground/5 shadow-2xl ring-1 ring-border/20 group/video">
                        <div className="relative w-full aspect-video">
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`${getEmbedUrl(energy.videoUrl)}?rel=0&modestbranding=1&controls=1`}
                            title={`${energy.name} - ${t.energyExplanation}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                        <div className="py-3 px-5 bg-foreground/5 backdrop-blur-md border-t border-border/20 flex items-center gap-3">
                          <div className="p-1.5 rounded-full bg-red-500/20 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                            <Youtube className="w-3.5 h-3.5 fill-current" />
                          </div>
                          <span className="text-xs font-bold text-foreground/70 uppercase tracking-widest flex-1">
                            {t.videoGuide}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Interpretation Blocks - Grid Layout */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Manifestation */}
                      {section.zone.manifestation && (
                        <div className="p-5 rounded-2xl bg-foreground/5 border border-border/80 hover:bg-foreground/10 transition-colors">
                          <h5 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
                            <span>🧭</span> {t.howItManifests}
                          </h5>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {section.zone.manifestation}
                          </p>
                        </div>
                      )}

                      {/* Practical Application */}
                      {section.zone.application && (
                        <div className="p-5 rounded-2xl bg-foreground/5 border border-border/80 hover:bg-foreground/10 transition-colors">
                          <h5 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
                            <span>🧱</span> {t.practicalApplication}
                          </h5>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {section.zone.application}
                          </p>
                        </div>
                      )}

                      {/* Pros and Cons */}
                      {section.zone.plusMinus && (
                        <div className="p-5 rounded-2xl bg-foreground/5 border border-border/80 hover:bg-foreground/10 transition-colors">
                          <h5 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
                            <span>🌗</span> {t.prosAndCons}
                          </h5>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {section.zone.plusMinus}
                          </p>
                        </div>
                      )}

                      {/* Recommendations */}
                      {section.zone.recommendations && (
                        <div className="p-5 rounded-2xl bg-foreground/5 border border-border/80 hover:bg-foreground/10 transition-colors">
                          <h5 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
                            <span>🛠</span> {t.recommendations}
                          </h5>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {section.zone.recommendations}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
