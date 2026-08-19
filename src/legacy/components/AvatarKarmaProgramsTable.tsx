import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sun, Binary, GitBranch, Share2, Award } from 'lucide-react';
import { EnergyDetailModal } from './EnergyDetailModal';
import { EnergyChip } from './EnergyChip';
import { cn } from '@/lib/utils';
import { EnergySectorInterpretation } from '@/content/sectorInterpretations.en';

interface AvatarKarmaProgramsTableProps {
    matrix: MatrixValues;
    className?: string;
}

export const AvatarKarmaProgramsTable: React.FC<AvatarKarmaProgramsTableProps> = ({ matrix, className }) => {
    const { language } = useLanguage();
    const [selectedEnergy, setSelectedEnergy] = useState<{ number: number; label: string; color: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEnergyClick = (energyNumber: number, label: string, color: string) => {
        setSelectedEnergy({ number: energyNumber, label, color });
        setIsModalOpen(true);
    };

    const content = {
        en: {
            title: 'KARMIC PROGRAMS',
            sections: {
                spirits: 'Spiritual Programs',
                spiritsDesc: 'Advanced karmic patterns and spiritual tasks',
                physical: 'Physical Programs',
                physicalDesc: 'Patterns related to material life and action',
                talents: 'Ancestral Talents',
                talentsDesc: 'Specific gifts passed down through generations'
            }
        },
        ru: {
            title: 'КАРМИЧЕСКИЕ ПРОГРАММЫ',
            sections: {
                spirits: 'Духовные Программы',
                spiritsDesc: 'Сложные кармические паттерны и духовные задачи',
                physical: 'Физические Программы',
                physicalDesc: 'Паттерны, связанные с материальной жизнью и действием',
                talents: 'Родовые Таланты',
                talentsDesc: 'Особые дары, передающиеся через поколения'
            }
        }
    };

    const t = content[language === 'ru' ? 'ru' : 'en'];

    const rows = [
        {
            id: 'kp-spiritual',
            name: t.sections.spirits,
            desc: t.sections.spiritsDesc,
            icon: GitBranch,
            energies: [matrix.s1, matrix.s2, matrix.s3, matrix.s4]
        },
        {
            id: 'kp-physical',
            name: t.sections.physical,
            desc: t.sections.physicalDesc,
            icon: Share2,
            energies: [matrix.p1, matrix.p2, matrix.p3, matrix.p4]
        },
        {
            id: 'kp-talents',
            name: t.sections.talents,
            desc: t.sections.talentsDesc,
            icon: Award,
            energies: [matrix.b1, matrix.b2]
        }
    ];

    return (
        <div className={cn("w-full h-full animate-fade-in backdrop-blur-md bg-background/80 dark:bg-black/30 rounded-3xl border border-border dark:border-white/40 shadow-xl overflow-hidden flex flex-col", className)}>
            <div className="p-3 flex-1 flex flex-col">
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {rows.flatMap((row) =>
                        row.energies.map((energy, energyIdx) => ({
                            ...row,
                            uniqueId: `${row.id}-${energyIdx}`,
                            energy: energy
                        }))
                    ).map((item) => (
                        <div
                            key={item.uniqueId}
                            className="flex items-center p-3 rounded-2xl border border-border/50 dark:border-white/10 bg-muted/50 dark:bg-white/5 hover:bg-muted dark:hover:bg-white/10 transition-all gap-4 group cursor-pointer text-left relative overflow-hidden"
                            onClick={() => handleEnergyClick(item.energy, item.name, '#6552B0')}
                        >
                            {/* Icon Background (Optional, subtle) */}
                            <item.icon className="absolute -right-4 -bottom-4 w-12 h-12 text-primary/5 opacity-0 group-hover:opacity-10 transition-opacity" />

                            {/* Value (Outlined) */}
                            <div className="shrink-0">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-transform group-hover:scale-105"
                                    style={{
                                        borderColor: '#6552B0', // Default purple for karma programs
                                        color: '#6552B0',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    {item.energy}
                                </div>
                            </div>

                            {/* Name/Description */}
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-white/90 leading-tight uppercase tracking-wide truncate">{item.name}</span>
                                <span className="text-[10px] text-muted-foreground truncate">{item.desc}</span>
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
