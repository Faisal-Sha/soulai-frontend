import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { energies as energiesEn, EnergyInfo } from '@/content/energies.en';
import { energies as energiesRu } from '@/content/energies.ru';
import { sectorInterpretations as sectorInterpretationsEn, EnergySectorInterpretation, SectorCardContent } from '@/content/sectorInterpretations.en';
import { sectorInterpretations as sectorInterpretationsRu } from '@/content/sectorInterpretations.ru';
import { getChakraInfo } from '@/lib/chakraColorMap';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, TrendingUp, TrendingDown, Heart, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnergyDetailModalProps {
    energyNumber: number | null;
    sector?: keyof EnergySectorInterpretation['sectors'];
    categoryLabel?: string;
    headerColor?: string;
    isOpen: boolean;
    onClose: () => void;
}

/** Sectors whose copy lives in dedicated content files — never fall back to global energy archetype/summary. */
const SECTOR_OWNED_CONTENT = new Set<keyof EnergySectorInterpretation['sectors']>([
    'identity',
    'talents',
    'intellect',
    'social',
    'karma',
    'energySource',
    'lifePurpose',
    'finance',
    'financeChannel',
    'financeProsperity',
    'financeBlocks',
    'financeBalance',
]);

export const EnergyDetailModal: React.FC<EnergyDetailModalProps> = ({
    energyNumber,
    sector,
    categoryLabel,
    headerColor,
    isOpen,
    onClose
}) => {
    const { language } = useLanguage();
    const energies = language === 'ru' ? energiesRu : energiesEn;
    const sectorInterpretations = language === 'ru' ? sectorInterpretationsRu : sectorInterpretationsEn;

    const [activeIdentityTab, setActiveIdentityTab] = useState<string>('positives');
    const [checklistStates, setChecklistStates] = useState<Record<string, 'yes' | 'no' | null>>({});

    useEffect(() => {
        if (!isOpen) return;
        if (energyNumber && sector) {
            const detailed = sectorInterpretations[energyNumber];
            const openedSectorContent = detailed?.sectors[sector];
            const firstTabId = openedSectorContent?.identitySections?.[0]?.tabs?.[0]?.id;
            setActiveIdentityTab(firstTabId ?? 'positives');
        } else {
            setActiveIdentityTab('positives');
        }
    }, [isOpen, energyNumber, sector, language]);

    if (!energyNumber) return null;

    const energy: EnergyInfo | undefined = energies[energyNumber];
    const detailedEnergy: EnergySectorInterpretation | undefined = sectorInterpretations[energyNumber];

    if (!energy) return null;

    const sectorContent: SectorCardContent | undefined = sector ? detailedEnergy?.sectors[sector] : undefined;
    const usesSectorOwnedContent = !!sector && SECTOR_OWNED_CONTENT.has(sector);
    const sectorArchetype = sectorContent?.identitySections?.[0]?.archetype;
    const archetypeText = sectorArchetype ?? (usesSectorOwnedContent ? undefined : detailedEnergy?.archetype.description);

    const content = {
        en: {
            yourEnergy: 'Your energy',
            healthChart: 'Health Chart',
            archetype: 'Energy Archetype',
            plus: 'Positive manifestations',
            minus: 'Negative manifestations',
            characteristics: 'CHARACTERISTICS',
            highEnergy: 'AT HIGH ENERGY LEVELS:',
            lowEnergy: 'AT LOW ENERGY LEVELS:',
            yearForecast: 'Year forecast:',
            expressionInLife: 'Expression in life?',
            yes: 'Yes',
            no: 'No',
            description: 'DESCRIPTION',
            comingSoon: 'Interpretation coming soon...'
        },
        ru: {
            yourEnergy: 'Ваша энергия',
            healthChart: 'Карта здоровья',
            archetype: 'Архетип энергии',
            plus: 'Позитив',
            minus: 'Негатив',
            characteristics: 'ХАРАКТЕРИСТИКИ',
            highEnergy: 'НА ВЫСОКИХ ВИБРАЦИЯХ:',
            lowEnergy: 'НА НИЗКИХ ВИБРАЦИЯХ:',
            yearForecast: 'Прогноз на год:',
            expressionInLife: 'Проявление в жизни?',
            yes: 'Да',
            no: 'Нет',
            description: 'ОПИСАНИЕ',
            comingSoon: 'Интерпретация скоро появится...'
        }
    };

    const t = content[language];

    // Determine the main heading
    const displayHeading = (sector === 'health' || categoryLabel?.toLowerCase().includes('physiolog') || categoryLabel?.toLowerCase().includes('health'))
        ? t.healthChart
        : (sector === 'forecast' ? t.yearForecast : (categoryLabel || t.healthChart));

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* Modal with consistent presence, full-screen on mobile, 30px margin on desktop */}
            <DialogContent
                aria-describedby={undefined}
                className="fixed inset-0 sm:inset-[30px] translate-x-0 translate-y-0 max-w-none w-full sm:w-auto h-full sm:h-auto p-0 border-none bg-background sm:border sm:border-border overflow-hidden shadow-2xl sm:rounded-2xl"
            >
                {/* Hidden title/description for accessibility to satisfy Radix UI */}
                <DialogTitle className="sr-only">{energyNumber} {displayHeading}</DialogTitle>
                {/* Minimal Premium Scrollbar Styling & Clear Close Button Styling */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .custom-minimal-scroll::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-minimal-scroll::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-minimal-scroll::-webkit-scrollbar-thumb {
                        background: rgba(128, 128, 128, 0.2);
                        border-radius: 20px;
                    }
                    .custom-minimal-scroll::-webkit-scrollbar-thumb:hover {
                        background: rgba(128, 128, 128, 0.3);
                    }
                    /* HIDE the default Radix close button to prevent "two X signs" */
                    .absolute.right-4.top-4, 
                    [data-radix-collection-item] button {
                        display: none !important;
                    }
                    /* Hide scrollbar for tabs */
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}} />

                <div className="h-full flex flex-col overflow-y-auto custom-minimal-scroll relative bg-background">

                    {/* Functional Minimal Close Button - No Circle, Just X */}
                    <DialogClose asChild>
                        <button
                            className="absolute top-6 right-6 sm:top-8 sm:right-8 z-[100] group p-2 hover:opacity-80 transition-all cursor-pointer"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
                        </button>
                    </DialogClose>

                    <div className="flex-1 w-full max-w-6xl mx-auto p-6 sm:p-14 relative z-10 space-y-8 sm:space-y-12">
                        {/* Heading Section */}
                        <div className="relative">
                            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight uppercase">
                                <span className="text-purple-600 dark:text-purple-400 mr-2">{energyNumber}</span>
                                <span className="text-foreground/90">{displayHeading}</span>
                            </h2>
    {sectorContent?.identitySections?.[0]?.intro && sector !== 'energySource' && (
        <p className="mt-4 sm:mt-6 text-sm sm:text-base text-foreground leading-relaxed max-w-4xl font-medium animate-in fade-in slide-in-from-top-4 duration-700">
            {sectorContent.identitySections[0].intro.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                    {line}
                    {i < sectorContent.identitySections[0].intro.split('\n').length - 1 && <br />}
                </React.Fragment>
            ))}
        </p>
    )}
    {sector === 'energySource' && sectorContent?.identitySections?.[0] && (
        <div className="mt-4 sm:mt-6 space-y-4">
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed max-w-4xl font-normal animate-in fade-in slide-in-from-top-4 duration-700">
                {sectorContent.identitySections[0].intro?.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        {i < sectorContent.identitySections[0].intro!.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}
            </p>
        </div>
    )}
                        </div>

                        {/* Top Content: Image and Archetype Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-start">
                            {/* Left Side: Image Container */}
                            <div className="relative group w-full aspect-[4/5] mx-auto shadow-2xl rounded-xl overflow-hidden border border-border bg-black/5 dark:bg-black">
                                <img
                                    src={`/images/energies/${energyNumber}.PNG`}
                                    alt={`Energy ${energyNumber}`}
                                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${energyNumber}`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                            </div>

                            {/* Right Side: Archetype Content */}
                            <div className="space-y-8 py-4 text-left">
                                <div className="space-y-2">
                                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tighter text-foreground">
                                        {t.yourEnergy} {energyNumber}
                                    </h3>
                                    <div className="h-1 w-20 bg-purple-600/40 dark:bg-purple-500/40 rounded-full" />
                                </div>

                                {archetypeText && (
                                    <div className="p-8 rounded-2xl bg-secondary/30 dark:bg-white/[0.03] border border-border dark:border-white/5 backdrop-blur-sm">
                                        <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium">
                                            {archetypeText}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Identity/Talents Tabs - MOVED OUTSIDE BORDER BOX */}
                        {(sectorContent?.identitySections) && (
                            <div className="flex flex-wrap gap-2 max-w-5xl mx-auto px-6 pb-2 no-scrollbar overflow-x-auto">
                                {sectorContent.identitySections.filter(Boolean).map((sec) => (
                                    <React.Fragment key={sec.title}>
                                        {sec.tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveIdentityTab(tab.id)}
                                                className={cn(
                                                    "whitespace-nowrap px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[9px] sm:text-xs font-bold uppercase tracking-widest transition-all border shrink-0",
                                                    activeIdentityTab === tab.id
                                                        ? "bg-purple-600 dark:bg-purple-500 text-white border-purple-600 dark:border-purple-500 shadow-md"
                                                        : "bg-secondary dark:bg-white/[0.02] border-border dark:border-white/5 text-slate-500 dark:text-white/30 hover:border-muted dark:hover:border-white/10 hover:text-foreground dark:hover:text-white/50"
                                                )}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}

                        {/* Bottom Content Area */}
                        <div className="relative p-6 sm:p-10 rounded-[2rem] bg-secondary/20 dark:bg-white/[0.02] border border-border dark:border-white/5 backdrop-blur-xl shadow-xl text-left">
                            <div className="space-y-10 max-w-5xl mx-auto">

                                {/* Manifestation Keywords & Description - Hide if identitySections exist */}
                                {detailedEnergy && !sectorContent?.identitySections && !usesSectorOwnedContent && (
                                    <div className="pb-6 border-b border-border dark:border-white/10 text-left">
                                        <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-foreground/80">
                                            <span className="text-purple-600 dark:text-purple-400/60">+</span>
                                            {detailedEnergy.summary.plus.join(' • ')}
                                            <span className="mx-2 text-foreground/10 font-thin text-xl">|</span>
                                            <span className="text-purple-600 dark:text-purple-400/60">-</span>
                                            {detailedEnergy.summary.minus.join(' • ')}
                                        </div>
                                    </div>
                                )}

                                {/* Main Content Body - Hide if identitySections exist */}
                                {!sectorContent?.identitySections && (
                                    <div className="space-y-6">
                                        {sectorContent?.body?.map((para, i) => (
                                            <p key={i} className="text-sm sm:text-base text-foreground/90 leading-tight font-normal text-left">
                                                {para}
                                            </p>
                                        ))}

                                        {(!sectorContent?.body && !sectorContent?.bullets && !sectorContent?.characteristics) && (
                                            <div className="py-20 text-center space-y-4">
                                                <Sparkles className="w-12 h-12 text-foreground/5 mx-auto animate-pulse" />
                                                <p className="text-foreground/30 italic tracking-widest font-semibold uppercase text-[10px]">
                                                    {t.comingSoon}
                                                </p>
                                            </div>
                                        )}

                                        {/* Forecast-Specific Bullets: High and Low Levels */}
                                        {sectorContent?.bullets && (
                                            <div className="pt-8 space-y-8 border-t border-border dark:border-white/5 mt-8">
                                                {/* High Energy Level */}
                                                <div className="space-y-4">
                                                    <h4 className="text-xs font-bold tracking-[0.2em] text-purple-600 dark:text-purple-400 uppercase">
                                                        {t.highEnergy}
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {sectorContent.bullets.high.map((bullet, i) => (
                                                            <li key={i} className="group flex items-start gap-3">
                                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600/40 dark:bg-purple-400/40 shrink-0 group-hover:bg-purple-600 dark:group-hover:bg-purple-400 transition-colors" />
                                                                <span className="text-sm sm:text-base text-foreground/80 leading-tight">
                                                                    {bullet}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Low Energy Level */}
                                                <div className="space-y-4">
                                                    <h4 className="text-xs font-bold tracking-[0.2em] text-red-600 dark:text-red-400/80 uppercase">
                                                        {t.lowEnergy}
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {sectorContent.bullets.low.map((bullet, i) => (
                                                            <li key={i} className="group flex items-start gap-3">
                                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600/20 dark:bg-red-400/20 shrink-0 group-hover:bg-red-600 dark:group-hover:bg-red-400/50 transition-colors" />
                                                                <span className="text-sm sm:text-base text-foreground/80 leading-tight">
                                                                    {bullet}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Enhanced Identity Sections 内容 */}
                                {sectorContent?.identitySections?.filter(Boolean).map((sec, sIdx) => {
                                    // Filter tabs based on active tab ID
                                    const tabsToRender = sec.tabs.filter(t => t.id === activeIdentityTab);
                                    
                                    // For energySource, we only want to render the current sector's tabs if multiple identitySections exist
                                    // But since we mapped each sector specifically, we just render what matches activeIdentityTab
                                    if (tabsToRender.length === 0) return null;

                                    return (
                                        <div key={sIdx} className="space-y-16">
                                            {tabsToRender.map((tab) => {
                                                const hasItems = tab.items && tab.items.length > 0;
                                                const hasDesc = !!tab.description;
                                                const isChecklistable = true;

                                                return (
                                                    <div key={tab.id} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                        {(tab.keywords || sector === 'energySource') && (
                                                            <div className="pb-4 border-b border-border dark:border-white/5">
                                                                <h4 className="text-xs font-semibold tracking-[0.3em] text-purple-600 dark:text-purple-400 uppercase">
                                                                    {sector === 'energySource' ? tab.label : tab.keywords}
                                                                </h4>
                                                            </div>
                                                        )}

                                                        {tab.intro && (
                                                            <div className="text-sm sm:text-base leading-relaxed font-medium space-y-4">
                                                                {tab.intro.split('\n').map((line, i) => {
                                                                    const trimmed = line.trim();
                                                                    const tagPrefix = trimmed.match(/^(tags|теги):\s*/i);
                                                                    const isTag = !!tagPrefix;
                                                                    const cleanLine = isTag ? trimmed.slice(tagPrefix![0].length) : line;

                                                                    return (
                                                                        <p key={i} className={cn(
                                                                            "animate-in fade-in slide-in-from-left-4 duration-500",
                                                                            isTag ? "text-amber-600 dark:text-amber-400 font-bold tracking-[0.05em] uppercase text-xs sm:text-sm" : "text-foreground"
                                                                        )}>
                                                                            {cleanLine}
                                                                        </p>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}

                                                        <div className={cn(
                                                            "grid gap-8",
                                                            (hasItems && hasDesc) ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                                                        )}>
                                                            {hasItems && (
                                                                <div className="rounded-2xl bg-black/5 dark:bg-black/20 border border-border dark:border-white/5 overflow-hidden">
                                                                    <table className="w-full text-left border-collapse">
                                                                        <thead>
                                                                            <tr className="bg-black/5 dark:bg-white/[0.03] border-b border-border dark:border-white/5">
                                                                                <th className="px-3 sm:px-6 py-3 sm:py-4 text-[9px] sm:text-[10px] font-semibold tracking-widest text-slate-500 dark:text-white/40 uppercase">
                                                                                    {tab.id === 'personalStrength' ? 'PERSONAL POWER' :
                                                                                        tab.id === 'lifePurpose' ? 'LIFE PURPOSE' :
                                                                                            tab.id === 'activation' || tab.id === 'resource' ? 'ENTRY POINT' :
                                                                                                tab.id === 'recommendations' ? 'RECOMMENDATION' :
                                                                                                    tab.id === 'guidance' ? 'GUIDANCE' :
                                                                                                        tab.id === 'wideningFlow' ? 'MANIFESTATION' :
                                                                                                            tab.id === 'professionalDirection' ? 'PROFESSIONAL DIRECTION' :
                                                                                                                tab.id === 'myTalents' ? 'TALENT DESCRIPTION' :
                                                                                                                    tab.id === 'talentObstruction' || tab.id === 'obstruction' ? 'TALENT LOCK' :
                                                                                                                        tab.id === 'howToOvercome' ? 'HOW TO OVERCOME' :
                                                                                                                            'CHARACTERISTICS'}
                                                                                </th>
                                                                                {isChecklistable && (
                                                                                    <th className="px-2 sm:px-6 py-3 sm:py-4 text-[9px] sm:text-[10px] font-semibold tracking-widest text-slate-500 dark:text-white/40 uppercase text-center w-16 sm:w-32">
                                                                                        {t.expressionInLife}
                                                                                    </th>
                                                                                )}
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="divide-y divide-border dark:divide-white/5">
                                                                            {tab.items!.map((item, i) => {
                                                                                const stateKey = `${energyNumber}-${tab.id}-${i}`;
                                                                                return (
                                                                                    <tr key={i} className="group hover:bg-black/5 dark:hover:bg-white/[0.01] transition-colors">
                                                                                        <td className="px-3 py-2.5 sm:px-6 sm:py-4 text-[10px] sm:text-xs text-foreground group-hover:text-foreground transition-colors">
                                                                                            {item.label}
                                                                                        </td>
                                                                                        {isChecklistable && (
                                                                                            <td className="px-2 py-2.5 sm:px-6 sm:py-4">
                                                                                                <div className="flex items-center justify-center gap-1 sm:gap-2">
                                                                                                    <button
                                                                                                        onClick={() => setChecklistStates(s => ({ ...s, [stateKey]: s[stateKey] === 'yes' ? null : 'yes' }))}
                                                                                                        className={cn(
                                                                                                            "px-1 py-0.5 sm:px-2 sm:py-1 rounded text-[8px] sm:text-[10px] font-bold uppercase transition-all shadow-sm",
                                                                                                            checklistStates[stateKey] === 'yes'
                                                                                                                ? "bg-green-500 text-black border-green-600 font-bold"
                                                                                                                : "bg-black/5 dark:bg-white/5 text-foreground/20 dark:text-white/20 border-transparent hover:bg-black/10 dark:hover:bg-white/10"
                                                                                                        )}
                                                                                                    >
                                                                                                        {t.yes}
                                                                                                    </button>
                                                                                                    <button
                                                                                                        onClick={() => setChecklistStates(s => ({ ...s, [stateKey]: s[stateKey] === 'no' ? null : 'no' }))}
                                                                                                        className={cn(
                                                                                                            "px-1 py-0.5 sm:px-2 sm:py-1 rounded text-[8px] sm:text-[10px] font-bold uppercase transition-all shadow-sm",
                                                                                                            checklistStates[stateKey] === 'no'
                                                                                                                ? "bg-red-500 text-white border-red-600 font-bold"
                                                                                                                : "bg-black/5 dark:bg-white/5 text-foreground/20 dark:text-white/20 border-transparent hover:bg-black/10 dark:hover:bg-white/10"
                                                                                                        )}
                                                                                                    >
                                                                                                        {t.no}
                                                                                                    </button>
                                                                                                </div>
                                                                                            </td>
                                                                                        )}
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )}

                                                            {/* Description Box */}
                                                            {hasDesc && (
                                                                <div className={cn(
                                                                    "rounded-2xl bg-secondary/30 dark:bg-white/[0.02] border border-border dark:border-white/5 p-8 space-y-6",
                                                                    !hasItems && "w-full"
                                                                )}>
                                                                    <h5 className="text-[10px] font-semibold tracking-[0.3em] text-slate-500 dark:text-white/40 uppercase">
                                                                        {t.description}
                                                                    </h5>
                                                                    <div className="space-y-4">
                                                                        {tab.description!.split('\n\n').map((p, i) => (
                                                                            <p key={i} className="text-sm sm:text-base text-foreground leading-relaxed font-normal">
                                                                                {p.split('\n').map((line, li) => (
                                                                                    <React.Fragment key={li}>
                                                                                        {line}
                                                                                        {li < p.split('\n').length - 1 && <br />}
                                                                                    </React.Fragment>
                                                                                ))}
                                                                            </p>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}

                                {/* Characteristics Tags - Hide if identitySections exist */}
                                {sectorContent?.characteristics && !sectorContent?.identitySections && (
                                    <div className="mt-10 pt-8 border-t border-border dark:border-white/5 text-left">
                                        <h5 className="text-[9px] font-semibold tracking-[0.3em] text-slate-400 dark:text-white/20 mb-6 uppercase">
                                            {t.characteristics}
                                        </h5>
                                        <div className="flex flex-wrap gap-4">
                                            {sectorContent.characteristics.map((c, i) => (
                                                <span key={i} className="px-5 py-2.5 rounded-full bg-secondary dark:bg-white/[0.03] border border-border dark:border-white/5 text-[9px] text-slate-600 dark:text-white/40 font-bold uppercase tracking-widest transition-all hover:bg-secondary/80 dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white">
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="h-10" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
