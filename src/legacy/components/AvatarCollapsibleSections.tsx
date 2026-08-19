import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChakraHealthTable } from './ChakraHealthTable';
import { AvatarIdentityTable } from './AvatarIdentityTable';
import { AvatarYearEnergiesTable } from './AvatarYearEnergiesTable';
import { AvatarFinanceTable } from './AvatarFinanceTable';
import { AvatarRelationshipTable } from './AvatarRelationshipTable';
import { AvatarParentChildTable } from './AvatarParentChildTable';
import { AvatarSocialTable } from './AvatarSocialTable';
import { AvatarKarmaTailTable } from './AvatarKarmaTailTable';
import { AvatarPurposesTable } from './AvatarPurposesTable';
import { AvatarAncestralKarmaTable } from './AvatarAncestralKarmaTable';
import { AvatarKarmaProgramsTable } from './AvatarKarmaProgramsTable';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner';
import { SubscriptionModal } from './ui/SubscriptionModal';
import { Activity, Sun, User, DollarSign, Heart, Handshake, Zap, AlertCircle, Compass, Network, LayoutGrid, Calendar, Lock } from 'lucide-react';
import healthStatue from '@/assets/health-statue.png';
import { EnergyChip } from './EnergyChip';
import { useTheme } from 'next-themes';

interface AvatarCollapsibleSectionsProps {
    matrix: MatrixValues;
    isCompatibility?: boolean;
}

export const AvatarCollapsibleSections: React.FC<AvatarCollapsibleSectionsProps> = ({ matrix, isCompatibility = false }) => {
    const { language } = useLanguage();
    const { isPremium } = useUser();
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const adaptiveWhite = isDark ? '#FFFFFF' : '#000000';

    const t = {
        en: {
            healthChart: 'HEALTH CHART',
            identityInsights: 'IDENTITY',
            yearEnergies: 'ENERGIES OF THE YEAR',
            finances: 'FINANCES',
            relationships: 'ROMANTIC RELATIONSHIPS',
            parentChild: 'PARENT-CHILD RELATIONSHIP',
            social: 'RELATIONSHIP WITH OTHERS',
            karmaTail: 'KARMA TAIL FROM PAST LIFE',
            purposes: 'LIFE PURPOSES',
            ancestral: 'ANCESTRAL KARMA',
            karmaPrograms: 'KARMIC PROGRAMS'
        },
        ru: {
            healthChart: 'КАРТА ЗДОРОВЬЯ',
            identityInsights: 'ИДЕНТИЧНОСТЬ',
            yearEnergies: 'ЭНЕРГИИ ГОДА',
            finances: 'ФИНАНСЫ',
            relationships: 'РОМАНТИЧЕСКИЕ ОТНОШЕНИЯ',
            parentChild: 'ДЕТСКО-РОДИТЕЛЬСКИЕ ОТНОШЕНИЯ',
            social: 'ОТНОШЕНИЯ С ОКРУЖАЮЩИМИ',
            karmaTail: 'КАРМИЧЕСКИЙ ХВОСТ ИЗ ПРОШЛОЙ ЖИЗНИ',
            purposes: 'ПРЕДНАЗНАЧЕНИЯ ЖИЗНИ',
            ancestral: 'РОДОВАЯ КАРМА',
            karmaPrograms: 'КАРМИЧЕСКИЕ ПРОГРАММЫ'
        }
    }[language === 'ru' ? 'ru' : 'en'];

    // Energies to display in Identity header: e, b, b2, b1, d, a, c
    const identityHeaderEnergies = [
        { value: matrix.e, color: '#dbdb0b' },  // Yellow
        { value: matrix.b, color: '#900490' },  // Violet
        { value: matrix.b2, color: '#3a06e2' }, // Indigo
        { value: matrix.b1, color: '#00BFFF' }, // Blue
        { value: matrix.d, color: '#f72828' },   // Red
        { value: matrix.a, color: '#900490' },  // Violet
        { value: matrix.c, color: '#f72828' }    // Red
    ];

    // Finance header energies: c1, x2, c2, c, x
    const financeHeaderEnergies = [
        { value: matrix.c1, color: '#ee9120' }, // Orange
        { value: matrix.x2, color: '#6552B0' }, // Purple
        { value: matrix.c2, color: '#6552B0' }, // Purple
        { value: matrix.c, color: '#f72828' },   // Red
        { value: matrix.x, color: '#6552B0' }   // Purple
    ];

    // Romantic Relationship header energies: d1, x1, x, e, e1, e2
    const relationshipHeaderEnergies = [
        { value: matrix.d1, color: '#ee9120' }, // Orange
        { value: matrix.x1, color: '#6552B0' }, // Purple
        { value: matrix.x, color: '#6552B0' },  // Purple
        { value: matrix.e, color: '#dbdb0b' },  // Yellow
        ...(!isCompatibility ? [
            { value: matrix.e1, color: adaptiveWhite },
            { value: matrix.e2, color: adaptiveWhite }
        ] : [])
    ];

    // Parent-Child header energies: a, a2, a1, a, a2, a1
    const parentChildHeaderEnergies = [
        { value: matrix.a, color: '#900490' },  // Violet
        { value: matrix.a2, color: '#3a06e2' }, // Indigo
        { value: matrix.a1, color: '#00BFFF' }, // Blue
        { value: matrix.a, color: '#900490' },  // Violet
        { value: matrix.a2, color: '#3a06e2' }, // Indigo
        { value: matrix.a1, color: '#00BFFF' }  // Blue
    ];

    // Socialization header energies: a3, b3
    const socialHeaderEnergies = !isCompatibility ? [
        { value: matrix.a3, color: '#13bc13' }, // Green
        { value: matrix.b3, color: '#13bc13' }  // Green
    ] : [];

    // Karmic Tail header energies: d1, d2, d
    const karmaTailHeaderEnergies = [
        { value: matrix.d1, color: '#ee9120' }, // Orange
        { value: matrix.d2, color: '#6552B0' }, // Purple
        { value: matrix.d, color: '#f72828' }    // Red
    ];

    // Ancestral Karma header energies (Full diagonal sequence)
    const ancestralHeaderEnergies = [
        { value: matrix.f, color: '#900490' },  // Violet
        ...(!isCompatibility ? [{ value: matrix.s2, color: '#3a06e2' }, { value: matrix.s1, color: '#00BFFF' }] : []),
        { value: matrix.g, color: '#900490' },  // Violet
        ...(!isCompatibility ? [{ value: matrix.p2, color: '#3a06e2' }, { value: matrix.p1, color: '#00BFFF' }] : []),
        { value: matrix.y, color: '#900490' },  // Violet
        ...(!isCompatibility ? [{ value: matrix.s3, color: '#3a06e2' }, { value: matrix.s4, color: '#00BFFF' }] : []),
        { value: matrix.k, color: '#900490' },  // Violet
        ...(!isCompatibility ? [{ value: matrix.p4, color: '#3a06e2' }, { value: matrix.p3, color: '#00BFFF' }] : [])
    ];

    return (
        <>
            <Accordion type="single" collapsible defaultValue="identity" className="w-full space-y-4 mt-8">
                {/* Health Chart */}
                <AccordionItem value="health" className="border-none">
                    <AccordionTrigger className="bg-background/80 dark:bg-black/40 hover:bg-muted/50 dark:hover:bg-black/50 border border-border dark:border-white/40 px-4 py-2.5 rounded-xl transition-all decoration-transparent data-[state=open]:rounded-b-none data-[state=open]:bg-background dark:data-[state=open]:bg-black/60 shadow-lg group/trigger">
                        <div className="flex flex-col items-start gap-1.5 text-left w-full">
                            <div className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/40 shadow-inner overflow-hidden">
                                    <img src={healthStatue} alt="Health" className="w-4 h-4 object-contain invert dark:invert-0 dark:brightness-200" />
                                </div>
                            </div>
                            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white/90">{t.healthChart}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-x border-b border-border dark:border-white/40 rounded-b-xl bg-muted/30 dark:bg-black/20 backdrop-blur-sm -mt-[1px] shadow-inner">
                        <ChakraHealthTable matrix={matrix} isCompatibility={isCompatibility} className="rounded-t-none border-t-0 border-x-0 border-b-0 bg-transparent backdrop-blur-none shadow-none" />
                    </AccordionContent>
                </AccordionItem>

                {/* Energies of the Year */}
                <AccordionItem value="year" className="border-none">
                    <AccordionTrigger className="bg-background/80 dark:bg-black/40 hover:bg-muted/50 dark:hover:bg-black/50 border border-border dark:border-white/40 px-4 py-2.5 rounded-xl transition-all decoration-transparent data-[state=open]:rounded-b-none data-[state=open]:bg-background dark:data-[state=open]:bg-black/60 shadow-lg group/trigger">
                        <div className="flex flex-col items-start gap-1.5 text-left w-full">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/40 shadow-inner">
                                    <Sun className="w-3.5 h-3.5 text-slate-900 dark:text-foreground/70" />
                                </div>
                            </div>
                            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white/90">{t.yearEnergies}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-x border-b border-border dark:border-white/40 rounded-b-xl bg-muted/30 dark:bg-black/20 backdrop-blur-sm -mt-[1px] shadow-inner">
                        <AvatarYearEnergiesTable matrix={matrix} className="rounded-t-none border-t-0 border-x-0 border-b-0 bg-transparent backdrop-blur-none shadow-none" />
                    </AccordionContent>
                </AccordionItem>

                {/* Identity Insights */}
                <AccordionItem value="identity" className="border-none">
                    <AccordionTrigger className="bg-background/80 dark:bg-black/40 hover:bg-muted/50 dark:hover:bg-black/50 border border-border dark:border-white/40 px-4 py-2.5 rounded-xl transition-all decoration-transparent data-[state=open]:rounded-b-none data-[state=open]:bg-background dark:data-[state=open]:bg-black/60 shadow-lg group/trigger">
                        <div className="flex flex-col items-start gap-1.5 text-left w-full">
                            {/* Summary Chips */}
                            <div className="flex flex-wrap gap-1.5 mb-1">
                                {identityHeaderEnergies.map((energy, index) => (
                                    <EnergyChip key={index} energyNumber={energy.value} customColor={energy.color} size="sm" className="shadow-lg border-white/40" readonly />
                                ))}
                            </div>
                            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white/90">{t.identityInsights}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-x border-b border-border dark:border-white/40 rounded-b-xl bg-muted/30 dark:bg-black/20 backdrop-blur-sm -mt-[1px] shadow-inner">
                        <AvatarIdentityTable matrix={matrix} className="rounded-t-none border-t-0 border-x-0 border-b-0 bg-transparent backdrop-blur-none shadow-none" />
                    </AccordionContent>
                </AccordionItem>

                {/* Finances */}
                <AccordionItem value="finances" className="border-none">
                    <AccordionTrigger className="bg-background/80 dark:bg-black/40 hover:bg-muted/50 dark:hover:bg-black/50 border border-border dark:border-white/40 px-4 py-2.5 rounded-xl transition-all decoration-transparent data-[state=open]:rounded-b-none data-[state=open]:bg-background dark:data-[state=open]:bg-black/60 shadow-lg group/trigger">
                        <div className="flex flex-col items-start gap-1.5 text-left w-full">
                            {/* Summary Chips */}
                            <div className="flex flex-wrap gap-1.5 mb-1">
                                {financeHeaderEnergies.map((energy, index) => (
                                    <EnergyChip key={index} energyNumber={energy.value} customColor={energy.color} size="sm" className="shadow-lg border-white/40" readonly />
                                ))}
                            </div>
                            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white/90">{t.finances}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-x border-b border-border dark:border-white/40 rounded-b-xl bg-muted/30 dark:bg-black/20 backdrop-blur-sm -mt-[1px] shadow-inner">
                        <AvatarFinanceTable matrix={matrix} className="rounded-t-none border-t-0 border-x-0 border-b-0 bg-transparent backdrop-blur-none shadow-none" />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value={(!isPremium) ? "locked-relationships" : "relationships"} className="border-none">
                    <AccordionTrigger
                        className={`bg-background/80 dark:bg-black/40 hover:bg-muted/50 dark:hover:bg-black/50 border border-border dark:border-white/40 px-4 py-2.5 rounded-xl transition-all decoration-transparent data-[state=open]:rounded-b-none data-[state=open]:bg-background dark:data-[state=open]:bg-black/60 shadow-lg group/trigger ${!isPremium ? 'cursor-not-allowed opacity-80' : ''}`}
                        onClick={(e) => {
                            if (!isPremium) {
                                e.preventDefault();
                                setIsSubModalOpen(true);
                            }
                        }}
                    >
                        <div className="flex flex-col items-start gap-1.5 text-left w-full">
                            {/* Summary Chips */}
                            <div className="flex flex-wrap gap-1.5 mb-1">
                                {relationshipHeaderEnergies.map((energy, index) => (
                                    <EnergyChip key={index} energyNumber={energy.value} customColor={energy.color} size="sm" className="shadow-lg border-white/40" readonly />
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white/90">{t.relationships}</span>
                                {!isPremium && <Lock className="w-4 h-4 text-primary" />}
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-x border-b border-border dark:border-white/40 rounded-b-xl bg-muted/30 dark:bg-black/20 backdrop-blur-sm -mt-[1px] shadow-inner">
                        <AvatarRelationshipTable matrix={matrix} isCompatibility={isCompatibility} className="rounded-t-none border-t-0 border-x-0 border-b-0 bg-transparent backdrop-blur-none shadow-none" />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value={(!isPremium) ? "locked-parent-child" : "parent-child"} className="border-none">
                    <AccordionTrigger
                        className={`bg-background/80 dark:bg-black/40 hover:bg-muted/50 dark:hover:bg-black/50 border border-border dark:border-white/40 px-4 py-2.5 rounded-xl transition-all decoration-transparent data-[state=open]:rounded-b-none data-[state=open]:bg-background dark:data-[state=open]:bg-black/60 shadow-lg group/trigger ${!isPremium ? 'cursor-not-allowed opacity-80' : ''}`}
                        onClick={(e) => {
                            if (!isPremium) {
                                e.preventDefault();
                                setIsSubModalOpen(true);
                            }
                        }}
                    >
                        <div className="flex flex-col items-start gap-1.5 text-left w-full">
                            {/* Summary Chips */}
                            <div className="flex flex-wrap gap-1.5 mb-1">
                                {parentChildHeaderEnergies.map((energy, index) => (
                                    <EnergyChip key={index} energyNumber={energy.value} customColor={energy.color} size="sm" className="shadow-lg border-white/40" readonly />
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white/90">{t.parentChild}</span>
                                {!isPremium && <Lock className="w-4 h-4 text-primary" />}
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-x border-b border-border dark:border-white/40 rounded-b-xl bg-muted/30 dark:bg-black/20 backdrop-blur-sm -mt-[1px] shadow-inner">
                        <AvatarParentChildTable matrix={matrix} className="rounded-t-none border-t-0 border-x-0 border-b-0 bg-transparent backdrop-blur-none shadow-none" />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value={(!isPremium) ? "locked-social" : "social"} className="border-none">
                    <AccordionTrigger
                        className={`bg-background/80 dark:bg-black/40 hover:bg-muted/50 dark:hover:bg-black/50 border border-border dark:border-white/40 px-4 py-2.5 rounded-xl transition-all decoration-transparent data-[state=open]:rounded-b-none data-[state=open]:bg-background dark:data-[state=open]:bg-black/60 shadow-lg group/trigger ${!isPremium ? 'cursor-not-allowed opacity-80' : ''}`}
                        onClick={(e) => {
                            if (!isPremium) {
                                e.preventDefault();
                                setIsSubModalOpen(true);
                            }
                        }}
                    >
                        <div className="flex flex-col items-start gap-1.5 text-left w-full">
                            {/* Summary Chips */}
                            <div className="flex flex-wrap gap-1.5 mb-1">
                                {socialHeaderEnergies.map((energy, index) => (
                                    <EnergyChip key={index} energyNumber={energy.value} customColor={energy.color} size="sm" className="shadow-lg border-white/40" readonly />
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white/90">{t.social}</span>
                                {!isPremium && <Lock className="w-4 h-4 text-primary" />}
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-x border-b border-border dark:border-white/40 rounded-b-xl bg-muted/30 dark:bg-black/20 backdrop-blur-sm -mt-[1px] shadow-inner">
                        <AvatarSocialTable matrix={matrix} isCompatibility={isCompatibility} className="rounded-t-none border-t-0 border-x-0 border-b-0 bg-transparent backdrop-blur-none shadow-none" />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value={(!isPremium) ? "locked-karma-tail" : "karma-tail"} className="border-none">
                    <AccordionTrigger
                        className={`bg-background/80 dark:bg-black/40 hover:bg-muted/50 dark:hover:bg-black/50 border border-border dark:border-white/40 px-4 py-2.5 rounded-xl transition-all decoration-transparent data-[state=open]:rounded-b-none data-[state=open]:bg-background dark:data-[state=open]:bg-black/60 shadow-lg group/trigger ${!isPremium ? 'cursor-not-allowed opacity-80' : ''}`}
                        onClick={(e) => {
                            if (!isPremium) {
                                e.preventDefault();
                                setIsSubModalOpen(true);
                            }
                        }}
                    >
                        <div className="flex flex-col items-start gap-1.5 text-left w-full">
                            {/* Summary Chips */}
                            <div className="flex flex-wrap gap-1.5 mb-1">
                                {karmaTailHeaderEnergies.map((energy, index) => (
                                    <EnergyChip key={index} energyNumber={energy.value} customColor={energy.color} size="sm" className="shadow-lg border-white/40" readonly />
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white/90">{t.karmaTail}</span>
                                {!isPremium && <Lock className="w-4 h-4 text-primary" />}
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-x border-b border-border dark:border-white/40 rounded-b-xl bg-muted/30 dark:bg-black/20 backdrop-blur-sm -mt-[1px] shadow-inner">
                        <AvatarKarmaTailTable matrix={matrix} className="rounded-t-none border-t-0 border-x-0 border-b-0 bg-transparent backdrop-blur-none shadow-none" />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value={(!isPremium) ? "locked-purposes" : "purposes"} className="border-none">
                    <AccordionTrigger
                        className={`bg-background/80 dark:bg-black/40 hover:bg-muted/50 dark:hover:bg-black/50 border border-border dark:border-white/40 px-4 py-2.5 rounded-xl transition-all decoration-transparent data-[state=open]:rounded-b-none data-[state=open]:bg-background dark:data-[state=open]:bg-black/60 shadow-lg group/trigger ${!isPremium ? 'cursor-not-allowed opacity-80' : ''}`}
                        onClick={(e) => {
                            if (!isPremium) {
                                e.preventDefault();
                                setIsSubModalOpen(true);
                            }
                        }}
                    >
                        <div className="flex flex-col items-start gap-1.5 text-left w-full">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/40 shadow-inner">
                                    <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white/90">{t.purposes}</span>
                                {!isPremium && <Lock className="w-4 h-4 text-primary" />}
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-x border-b border-border dark:border-white/40 rounded-b-xl bg-muted/30 dark:bg-black/20 backdrop-blur-sm -mt-[1px] shadow-inner">
                        <AvatarPurposesTable matrix={matrix} className="rounded-t-none border-t-0 border-x-0 border-b-0 bg-transparent backdrop-blur-none shadow-none" />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value={(!isPremium) ? "locked-ancestral" : "ancestral"} className="border-none">
                    <AccordionTrigger
                        className={`bg-background/80 dark:bg-black/40 hover:bg-muted/50 dark:hover:bg-black/50 border border-border dark:border-white/40 px-4 py-2.5 rounded-xl transition-all decoration-transparent data-[state=open]:rounded-b-none data-[state=open]:bg-background dark:data-[state=open]:bg-black/60 shadow-lg group/trigger ${!isPremium ? 'cursor-not-allowed opacity-80' : ''}`}
                        onClick={(e) => {
                            if (!isPremium) {
                                e.preventDefault();
                                setIsSubModalOpen(true);
                            }
                        }}
                    >
                        <div className="flex flex-col items-start gap-1.5 text-left w-full">
                            {/* Summary Chips */}
                            <div className="flex flex-wrap gap-1.5 mb-1">
                                {ancestralHeaderEnergies.map((energy, index) => (
                                    <EnergyChip key={index} energyNumber={energy.value} customColor={energy.color} size="sm" className="shadow-lg border-white/40" readonly />
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white/90">{t.ancestral}</span>
                                {!isPremium && <Lock className="w-4 h-4 text-primary" />}
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-x border-b border-border dark:border-white/40 rounded-b-xl bg-muted/30 dark:bg-black/20 backdrop-blur-sm -mt-[1px] shadow-inner">
                        <AvatarAncestralKarmaTable matrix={matrix} isCompatibility={isCompatibility} className="rounded-t-none border-t-0 border-x-0 border-b-0 bg-transparent backdrop-blur-none shadow-none" />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value={(!isPremium) ? "locked-karma-programs" : "karma-programs"} className="border-none">
                    <AccordionTrigger
                        className={`bg-background/80 dark:bg-black/40 hover:bg-muted/50 dark:hover:bg-black/50 border border-border dark:border-white/40 px-4 py-2.5 rounded-xl transition-all decoration-transparent data-[state=open]:rounded-b-none data-[state=open]:bg-background dark:data-[state=open]:bg-black/60 shadow-lg group/trigger ${!isPremium ? 'cursor-not-allowed opacity-80' : ''}`}
                        onClick={(e) => {
                            if (!isPremium) {
                                e.preventDefault();
                                setIsSubModalOpen(true);
                            }
                        }}
                    >
                        <div className="flex flex-col items-start gap-1.5 text-left w-full">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/40 shadow-inner">
                                    <Sun className="w-3.5 h-3.5 text-slate-900 dark:text-foreground/70" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white/90">{t.karmaPrograms}</span>
                                {!isPremium && <Lock className="w-4 h-4 text-primary" />}
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-x border-b border-border dark:border-white/40 rounded-b-xl bg-muted/30 dark:bg-black/20 backdrop-blur-sm -mt-[1px] shadow-inner">
                        <AvatarKarmaProgramsTable matrix={matrix} className="rounded-t-none border-t-0 border-x-0 border-b-0 bg-transparent backdrop-blur-none shadow-none" />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <SubscriptionModal
                isOpen={isSubModalOpen}
                onClose={() => setIsSubModalOpen(false)}
            />
        </>
    );
};
