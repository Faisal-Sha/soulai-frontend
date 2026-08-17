import React from 'react';
import { Quote, CheckCircle2, Star } from 'lucide-react';

interface ReadingSectionProps {
  section: {
    id: string;
    title: string;
    content: string;
    highlights?: string[];
    quotes?: string[];
    actionItems?: string[];
  };
}

export const ReadingSection: React.FC<ReadingSectionProps> = ({ section }) => {
  return (
    <div id={section.id} className="report-page-wrapper p-20 flex flex-col gap-10 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="section-title-container">
        <div className="section-label">Energetic Module</div>
        <h2 className="font-serif font-bold tracking-tight">
          {section.title}
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pr-10 custom-scrollbar space-y-12">
        <div className="whitespace-pre-wrap first-letter:text-6xl first-letter:font-serif first-letter:text-gold first-letter:mr-4 first-letter:mt-2 first-letter:float-left first-letter:leading-[0.8]">
          {section.content}
        </div>

        {/* Highlights/Discovery */}
        {section.highlights && section.highlights.length > 0 && (
          <div className="grid grid-cols-1 gap-8 pt-8 border-t border-gold/10">
            <h3 className="section-label">Frequency Peaks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.highlights.map((highlight, index) => (
                <div key={index} className="bg-white/5 border border-gold/10 p-6 rounded-3xl flex gap-5 backdrop-blur-sm">
                  <Star className="text-gold shrink-0 mt-1 opacity-60" size={24} />
                  <span className="text-lg italic opacity-90 leading-snug">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Callout: What this means for you */}
        {section.actionItems && section.actionItems.length > 0 && (
          <div className="meaning-callout group p-10 bg-[#1A1230]/40 rounded-[32px] border border-gold/20">
            <h4 className="text-xs tracking-[0.4em] mb-8 opacity-50 uppercase">Alignment Practice</h4>
            <div className="space-y-8">
              {section.actionItems.map((item, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="w-3 h-3 rounded-full bg-gold mt-2.5 shrink-0 shadow-[0_0_15px_rgba(212,175,122,0.6)]" />
                  <p className="opacity-90 font-light leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Decoration */}
      <div className="mt-auto pt-10 flex items-center justify-between opacity-20">
        <div className="ornament text-3xl">✧</div>
        <div className="h-px flex-1 mx-12 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="ornament text-3xl">◇</div>
      </div>
    </div>
  );
};
