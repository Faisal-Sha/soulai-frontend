import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { EnergySectorInterpretation } from '@/content/sectorInterpretations.en';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, Sparkles, TrendingUp, Brain, Target, TrendingDown, Zap, DollarSign, Heart, Activity, Lock } from 'lucide-react';
import { EnergyDetailModal } from './EnergyDetailModal';
import { EnergyChip } from './EnergyChip';
import { cn } from '@/lib/utils';
import { getChakraInfo } from '@/lib/chakraColorMap';
import { energies as energiesEn } from '@/content/energies.en';
import { energies as energiesRu } from '@/content/energies.ru';
import { useUser } from '@/hooks/useUser';
import { SubscriptionModal } from './ui/SubscriptionModal';

interface AvatarIdentityTableProps {
    matrix: MatrixValues;
    className?: string; // Allow style overrides
}

export const AvatarIdentityTable: React.FC<AvatarIdentityTableProps> = ({ matrix, className }) => {
    const { language } = useLanguage();
    const { isPremium } = useUser();
    const [selectedEnergy, setSelectedEnergy] = useState<{ number: number; label: string; color: string; sector: keyof EnergySectorInterpretation['sectors'] } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);

    const handleEnergyClick = (energyNumber: number, label: string, color: string, sector: keyof EnergySectorInterpretation['sectors']) => {
        setSelectedEnergy({ number: energyNumber, label, color, sector });
        setIsModalOpen(true);
    };

    const content = {
        en: {
            title: 'IDENTITY INSIGHTS',
            sections: {
                whoAmI: 'Who am I?',
                strengths: 'My Strengths',
                intellect: 'My Intellect',
                selfManifestation: 'Self-Manifestation',
                weaknesses: 'My Weaknesses',
                energySource: 'My Energy Source',
                lifePurpose: 'My Life Purpose'
            }
        },
        ru: {
            title: 'ИНСАЙТЫ ЛИЧНОСТИ',
            sections: {
                whoAmI: 'Кто я?',
                strengths: 'Мои Сильные Стороны',
                intellect: 'Мой Интеллект',
                selfManifestation: 'Самопроявление',
                weaknesses: 'Мои Слабости',
                energySource: 'Мой Источник Энергии',
                lifePurpose: 'Моя Жизненная Цель'
            }
        }
    };

    const t = content[language === 'ru' ? 'ru' : 'en'];

    const rows = [
        {
            id: 'who-am-i',
            name: t.sections.whoAmI,
            icon: User,
            energies: [{ value: matrix.e, color: '#dbdb0b' }] // e - Yellow
        },
        {
            id: 'strengths',
            name: t.sections.strengths,
            icon: Sparkles,
            energies: [{ value: matrix.b, color: '#900490' }] // b - Purple
        },
        {
            id: 'intellect',
            name: t.sections.intellect,
            icon: Brain,
            energies: [{ value: matrix.b2, color: '#3a06e2' }] // b2 - Indigo
        },
        {
            id: 'self-manifestation',
            name: t.sections.selfManifestation,
            icon: Target,
            energies: [{ value: matrix.b1, color: '#00BFFF' }] // b1 - Blue
        },
        {
            id: 'weaknesses',
            name: t.sections.weaknesses,
            icon: TrendingDown,
            energies: [{ value: matrix.d, color: '#f72828' }] // d - Red
        },
        {
            id: 'energy-source',
            name: t.sections.energySource,
            icon: Zap,
            energies: [{ value: matrix.a, color: '#900490' }] // a - Purple
        },
        {
            id: 'life-purpose',
            name: t.sections.lifePurpose,
            icon: Activity,
            energies: [{ value: matrix.c, color: '#f72828' }] // c - Red
        }
    ];

    return (
        <div className={cn("w-full h-full animate-fade-in backdrop-blur-md bg-white/70 dark:bg-black/30 rounded-3xl border border-border dark:border-white/10 shadow-xl overflow-hidden flex flex-col", className)}>
            <div className="p-3 flex-1 flex flex-col">
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {rows.map((row) => {
                        const premiumRows = ['intellect', 'self-manifestation', 'energy-source', 'life-purpose'];
                        const isLocked = !isPremium && premiumRows.includes(row.id);
                        return (
                            <div
                                key={row.id}
                                className={`flex items-center p-3 rounded-2xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all gap-4 group cursor-pointer text-left relative overflow-hidden ${isLocked ? 'opacity-75 cursor-not-allowed' : ''}`}
                                onClick={() => {
                                    if (isLocked) {
                                        setIsSubModalOpen(true);
                                        return;
                                    }
                                    let sector: keyof EnergySectorInterpretation['sectors'] = 'identity';
                                    if (row.id === 'strengths') sector = 'talents';
                                    if (row.id === 'intellect') sector = 'intellect';
                                    if (row.id === 'self-manifestation') sector = 'social';
                                    if (row.id === 'weaknesses') sector = 'karma';
                                    if (row.id === 'energy-source') sector = 'energySource';
                                    if (row.id === 'life-purpose') sector = 'lifePurpose';
                                    handleEnergyClick(row.energies[0].value, row.name, row.energies[0].color, sector);
                                }}
                            >
                                {isLocked && <Lock className="absolute right-3 top-3 w-4 h-4 text-primary" />}
                                <row.icon className="absolute -right-4 -bottom-4 w-12 h-12 text-primary/5 opacity-0 group-hover:opacity-10 transition-opacity" />
                                <div className="shrink-0">
                                    {row.energies.map((energy, idx) => (
                                        <div
                                            key={`${row.id}-${energy.value}-${idx}`}
                                            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-transform group-hover:scale-105"
                                            style={{
                                                borderColor: energy.color,
                                                color: energy.color,
                                                backgroundColor: 'transparent'
                                            }}
                                        >
                                            {energy.value}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-semibold text-xs sm:text-sm text-foreground leading-tight uppercase tracking-wide truncate">{row.name}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <EnergyDetailModal
                energyNumber={selectedEnergy?.number || null}
                sector={selectedEnergy?.sector as any}
                categoryLabel={selectedEnergy?.label || ''}
                headerColor={selectedEnergy?.color}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <SubscriptionModal
                isOpen={isSubModalOpen}
                onClose={() => setIsSubModalOpen(false)}
            />
        </div>
    );
};
