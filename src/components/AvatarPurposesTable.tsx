import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { useLanguage } from '@/contexts/LanguageContext';
import { Compass, User, Globe, Moon } from 'lucide-react';
import { EnergyDetailModal } from './EnergyDetailModal';
import { EnergyChip } from './EnergyChip';
import { cn } from '@/lib/utils';
import { EnergySectorInterpretation } from '@/content/sectorInterpretations.en';

interface AvatarPurposesTableProps {
    matrix: MatrixValues;
    className?: string;
}

export const AvatarPurposesTable: React.FC<AvatarPurposesTableProps> = ({ matrix, className }) => {
    const { language } = useLanguage();
    const [selectedEnergy, setSelectedEnergy] = useState<{ number: number; label: string; color: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEnergyClick = (energyNumber: number, label: string, color: string) => {
        setSelectedEnergy({ number: energyNumber, label, color });
        setIsModalOpen(true);
    };

    const content = {
        en: {
            title: 'LIFE PURPOSES',
            sections: {
                personal: 'Personal Purpose (until 40)',
                personalDesc: 'Your task for self-realization and inner growth',
                social: 'Social Purpose (40-60)',
                socialDesc: 'Your contribution to the world and society',
                spiritual: 'Spiritual Purpose (60+)',
                spiritualDesc: 'The ultimate mission of your soul in this life'
            }
        },
        ru: {
            title: 'ПРЕДНАЗНАЧЕНИЯ ЖИЗНИ',
            sections: {
                personal: 'Личное Предназначение (до 40 лет)',
                personalDesc: 'Ваша задача по самореализации и внутреннему росту',
                social: 'Социальное Предназначение (40-60 лет)',
                socialDesc: 'Ваш вклад в мир и общество',
                spiritual: 'Духовное Предназначение (после 60 лет)',
                spiritualDesc: 'Высшая миссия вашей души в этой жизни'
            }
        }
    };

    const t = content[language === 'ru' ? 'ru' : 'en'];

    const rows = [
        {
            id: 'purp-personal',
            name: t.sections.personal,
            desc: t.sections.personalDesc,
            icon: User,
            energies: [matrix.m]
        },
        {
            id: 'purp-social',
            name: t.sections.social,
            desc: t.sections.socialDesc,
            icon: Globe,
            energies: [matrix.z]
        },
        {
            id: 'purp-spiritual',
            name: t.sections.spiritual,
            desc: t.sections.spiritualDesc,
            icon: Moon,
            energies: [matrix.s]
        }
    ];

    return (
        <div className={cn("w-full h-full animate-fade-in backdrop-blur-md bg-white/70 dark:bg-black/30 rounded-3xl border border-border dark:border-white/10 shadow-xl overflow-hidden flex flex-col", className)}>
            <div className="p-3 flex-1 flex flex-col">
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {rows.map((row) => (
                        <div
                            key={row.id}
                            className="flex items-center p-3 rounded-2xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all gap-4 group cursor-pointer text-left relative overflow-hidden"
                            onClick={() => handleEnergyClick(row.energies[0], row.name, '#6552B0')}
                        >
                            {/* Icon Background (Optional, subtle) */}
                            <row.icon className="absolute -right-4 -bottom-4 w-12 h-12 text-primary/5 opacity-0 group-hover:opacity-10 transition-opacity" />

                            {/* Value (Outlined) */}
                            <div className="shrink-0">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-transform group-hover:scale-105"
                                    style={{
                                        borderColor: '#6552B0', // Default purple for purposes if no color defined
                                        color: '#6552B0',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    {row.energies[0]}
                                </div>
                            </div>

                            {/* Name/Description */}
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-xs sm:text-sm text-foreground leading-tight uppercase tracking-wide truncate">{row.name}</span>
                                <span className="text-[10px] text-muted-foreground truncate">{row.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <EnergyDetailModal
                energyNumber={selectedEnergy?.number || null}
                sector="lifePurpose"
                categoryLabel={selectedEnergy?.label || ''}
                headerColor={selectedEnergy?.color}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
