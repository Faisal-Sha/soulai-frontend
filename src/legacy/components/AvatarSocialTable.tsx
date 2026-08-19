import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Users2, Zap, Target, Heart } from 'lucide-react';
import { EnergyDetailModal } from './EnergyDetailModal';
import { EnergyChip } from './EnergyChip';
import { cn } from '@/lib/utils';
import { EnergySectorInterpretation } from '@/content/sectorInterpretations.en';

interface AvatarSocialTableProps {
    matrix: MatrixValues;
    className?: string;
    isCompatibility?: boolean;
}

export const AvatarSocialTable: React.FC<AvatarSocialTableProps> = ({ matrix, className, isCompatibility = false }) => {
    const { language } = useLanguage();
    const [selectedEnergy, setSelectedEnergy] = useState<{ number: number; label: string; color: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEnergyClick = (energyNumber: number, label: string, color: string) => {
        setSelectedEnergy({ number: energyNumber, label, color });
        setIsModalOpen(true);
    };

    const content = {
        en: {
            title: 'RELATIONSHIP WITH OTHERS',
            sections: {
                heart: 'Heart Connection',
                heartDesc: 'How you connect with others emotionally',
                empathy: 'Empathy & Support',
                empathyDesc: 'Your approach to social interaction',
                influence: 'Personal Influence',
                influenceDesc: 'How you impact the world around you'
            }
        },
        ru: {
            title: 'ОТНОШЕНИЯ С ОКРУЖАЮЩИМИ',
            sections: {
                heart: 'Сердечная Связь',
                heartDesc: 'Как вы искренне открываетесь людям',
                empathy: 'Эмпатия и Поддержка',
                empathyDesc: 'Ваш стиль взаимодействия в обществе',
                influence: 'Личное Влияние',
                influenceDesc: 'Как вы влияете на мир вокруг'
            }
        }
    };

    const t = content[language === 'ru' ? 'ru' : 'en'];

    const rows = [
        {
            id: 'soc-heart',
            name: t.sections.heart,
            desc: t.sections.heartDesc,
            icon: Heart,
            energies: [matrix.a3],
            color: '#13bc13' // Green
        },
        {
            id: 'soc-empathy',
            name: t.sections.empathy,
            desc: t.sections.empathyDesc,
            icon: Users2,
            energies: [matrix.b3],
            color: '#13bc13' // Green
        },
        {
            id: 'soc-influence',
            name: t.sections.influence,
            desc: t.sections.influenceDesc,
            icon: Globe,
            energies: [matrix.center],
            color: '#dbdb0b' // Yellow
        }
    ].filter(r => !isCompatibility || (r.id !== 'soc-heart' && r.id !== 'soc-empathy'));

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
