import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { useLanguage } from '@/contexts/LanguageContext';
import { History, Anchor, Sparkles, AlertCircle } from 'lucide-react';
import { EnergyDetailModal } from './EnergyDetailModal';
import { EnergyChip } from './EnergyChip';
import { cn } from '@/lib/utils';
import { EnergySectorInterpretation } from '@/content/sectorInterpretations.en';

interface AvatarKarmaTailTableProps {
    matrix: MatrixValues;
    className?: string;
}

export const AvatarKarmaTailTable: React.FC<AvatarKarmaTailTableProps> = ({ matrix, className }) => {
    const { language } = useLanguage();
    const [selectedEnergy, setSelectedEnergy] = useState<{ number: number; label: string; color: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEnergyClick = (energyNumber: number, label: string, color: string) => {
        setSelectedEnergy({ number: energyNumber, label, color });
        setIsModalOpen(true);
    };

    const content = {
        en: {
            title: 'KARMA TAIL FROM PAST LIFE',
            sections: {
                main: 'Main Karmic Lesson',
                mainDesc: 'The primary challenge carried from a past life',
                base: 'Karmic Base',
                baseDesc: 'The foundation of your past experience',
                bridge: 'Karmic Bridge',
                bridgeDesc: 'The link between past and current soul tasks'
            }
        },
        ru: {
            title: 'КАРМИЧЕСКИЙ ХВОСТ ИЗ ПРОШЛОЙ ЖИЗНИ',
            sections: {
                main: 'Главный Кармический Урок',
                mainDesc: 'Основной вызов, перенесенный из прошлой жизни',
                base: 'Кармическая База',
                baseDesc: 'Фундамент вашего прошлого опыта',
                bridge: 'Кармический Мост',
                bridgeDesc: 'Связь между прошлыми и текущими задачами души'
            }
        }
    };

    const t = content[language === 'ru' ? 'ru' : 'en'];

    const rows = [
        {
            id: 'kt-bridge',
            name: t.sections.bridge,
            desc: t.sections.bridgeDesc,
            icon: Sparkles,
            energies: [matrix.d1],
            color: '#ee9120' // Orange
        },
        {
            id: 'kt-base',
            name: t.sections.base,
            desc: t.sections.baseDesc,
            icon: History,
            energies: [matrix.d2],
            color: '#6552B0' // Purple
        },
        {
            id: 'kt-main',
            name: t.sections.main,
            desc: t.sections.mainDesc,
            icon: Anchor,
            energies: [matrix.d],
            color: '#f72828' // Red
        }
    ];

    return (
        <div className={cn("w-full h-full animate-fade-in backdrop-blur-md bg-background/80 dark:bg-black/30 rounded-3xl border border-border dark:border-white/40 shadow-xl overflow-hidden flex flex-col", className)}>
            <div className="p-3 flex-1 flex flex-col">
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {rows.map((row) => (
                        <div
                            key={row.id}
                            className="flex items-center p-3 rounded-2xl border border-border/50 dark:border-white/10 bg-muted/50 dark:bg-white/5 hover:bg-muted dark:hover:bg-white/10 transition-all gap-4 group cursor-pointer text-left relative overflow-hidden"
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
                                <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-white/90 leading-tight uppercase tracking-wide truncate">{row.name}</span>
                                <span className="text-[10px] text-muted-foreground truncate">{row.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <EnergyDetailModal
                energyNumber={selectedEnergy?.number || null}
                sector="others"
                categoryLabel={selectedEnergy?.label || ''}
                headerColor={selectedEnergy?.color}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
