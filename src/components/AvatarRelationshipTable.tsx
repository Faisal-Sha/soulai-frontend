import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Stars, Users, Flame, UserPlus, Sparkles, Target } from 'lucide-react';
import { EnergyDetailModal } from './EnergyDetailModal';
import { EnergyChip } from './EnergyChip';
import { cn } from '@/lib/utils';
import { EnergySectorInterpretation } from '@/content/sectorInterpretations.en';
import { useTheme } from 'next-themes';

interface AvatarRelationshipTableProps {
    matrix: MatrixValues;
    className?: string;
    isCompatibility?: boolean;
}

export const AvatarRelationshipTable: React.FC<AvatarRelationshipTableProps> = ({ matrix, className, isCompatibility = false }) => {
    const { language } = useLanguage();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const adaptiveWhite = isDark ? '#FFFFFF' : '#000000';
    const [selectedEnergy, setSelectedEnergy] = useState<{ number: number; label: string; color: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEnergyClick = (energyNumber: number, label: string, color: string) => {
        setSelectedEnergy({ number: energyNumber, label, color });
        setIsModalOpen(true);
    };

    const content = {
        en: {
            title: 'RELATIONSHIP INSIGHTS',
            sections: {
                entrance: 'Relationship Entrance',
                entranceDesc: 'How you attract partners',
                main: 'Main Love Energy',
                mainDesc: 'The core of your romantic connection',
                harmony: 'Relationship Harmony',
                harmonyDesc: 'What brings balance to your union',
                character: 'Relationship Character',
                characterDesc: 'How your personality shines in love',
                essence: 'Soul Essence in Love',
                essenceDesc: 'Your inner drive in relationships',
                depth: 'Relationship Depth',
                depthDesc: 'The spiritual depth of your connection'
            }
        },
        ru: {
            title: 'ИНСАЙТЫ ОТНОШЕНИЙ',
            sections: {
                entrance: 'Вход в Отношения',
                entranceDesc: 'Как вы привлекаете партнеров',
                main: 'Главная Энергия Любви',
                mainDesc: 'Ядро вашей романтической связи',
                harmony: 'Гармония в Отношениях',
                harmonyDesc: 'Что приносит баланс в ваш союз',
                character: 'Характер в Отношениях',
                characterDesc: 'Как ваша личность проявляется в любви',
                essence: 'Духовная Суть Любви',
                essenceDesc: 'Ваш внутренний драйв в отношениях',
                depth: 'Глубина Отношений',
                depthDesc: 'Духовная глубина вашей связи'
            }
        }
    };

    const t = content[language === 'ru' ? 'ru' : 'en'];

    const rows = [
        {
            id: 'rel-entrance',
            name: t.sections.entrance || 'Entrance',
            desc: t.sections.entranceDesc || 'How you attract partners',
            icon: UserPlus,
            energies: [matrix.d1],
            color: '#ee9120' // Orange
        },
        {
            id: 'rel-main',
            name: t.sections.main,
            desc: t.sections.mainDesc,
            icon: Heart,
            energies: [matrix.x1],
            color: '#6552B0' // Purple
        },
        {
            id: 'rel-harmony',
            name: t.sections.harmony,
            desc: t.sections.harmonyDesc,
            icon: Flame,
            energies: [matrix.x],
            color: '#6552B0' // Purple
        },
        {
            id: 'rel-character',
            name: t.sections.character,
            desc: t.sections.characterDesc,
            icon: Sparkles,
            energies: [matrix.e],
            color: '#dbdb0b' // Yellow
        },
        {
            id: 'rel-essence',
            name: t.sections.essence,
            desc: t.sections.essenceDesc,
            icon: Target,
            energies: [matrix.e1],
            color: adaptiveWhite
        },
        {
            id: 'rel-depth',
            name: t.sections.depth,
            desc: t.sections.depthDesc,
            icon: Users,
            energies: [matrix.e2],
            color: adaptiveWhite
        }
    ].filter(r => !isCompatibility || (r.id !== 'rel-essence' && r.id !== 'rel-depth'));

    return (
        <div className={cn("w-full h-full animate-fade-in backdrop-blur-md bg-white/70 dark:bg-black/30 rounded-3xl border border-border dark:border-white/10 shadow-xl overflow-hidden flex flex-col", className)}>
            <div className="p-3 flex-1 flex flex-col">
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {rows.map((row) => (
                        <div
                            key={row.id}
                            className="flex items-center p-3 rounded-2xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all gap-4 group cursor-pointer text-left relative overflow-hidden"
                            onClick={() => handleEnergyClick(row.energies[0], row.name, row.color)}
                        >
                            {/* Icon Background (Optional, subtle) */}
                            <row.icon className="absolute -right-4 -bottom-4 w-12 h-12 text-primary/5 opacity-0 group-hover:opacity-10 transition-opacity" />

                            {/* Value (Outlined) */}
                            <div className="shrink-0">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-transform group-hover:scale-105"
                                    style={{
                                        borderColor: row.color,
                                        color: row.color,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    {row.energies[0]}
                                </div>
                            </div>

                            {/* Name/Description */}
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-xs sm:text-sm text-foreground leading-tight uppercase tracking-wide text-balance">{row.name}</span>
                                <span className="text-[10px] text-muted-foreground text-balance">{row.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <EnergyDetailModal
                energyNumber={selectedEnergy?.number || null}
                sector="relationships"
                categoryLabel={selectedEnergy?.label || ''}
                headerColor={selectedEnergy?.color}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
