import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { useLanguage } from '@/contexts/LanguageContext';
import { Network, User, UserCheck, ShieldCheck, HeartPulse } from 'lucide-react';
import { EnergyDetailModal } from './EnergyDetailModal';
import { EnergyChip } from './EnergyChip';
import { cn } from '@/lib/utils';
import { EnergySectorInterpretation } from '@/content/sectorInterpretations.en';

interface AvatarAncestralKarmaTableProps {
    matrix: MatrixValues;
    className?: string;
    isCompatibility?: boolean;
}

export const AvatarAncestralKarmaTable: React.FC<AvatarAncestralKarmaTableProps> = ({ matrix, className, isCompatibility = false }) => {
    const { language } = useLanguage();
    const [selectedEnergy, setSelectedEnergy] = useState<{ number: number; label: string; color: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEnergyClick = (energyNumber: number, label: string, color: string) => {
        setSelectedEnergy({ number: energyNumber, label, color });
        setIsModalOpen(true);
    };

    const content = {
        en: {
            title: 'ANCESTRAL KARMA',
            sections: {
                male: 'Male Lineage Programs',
                maleDesc: 'Hereditary tasks and talents from your father\'s side',
                female: 'Female Lineage Programs',
                femaleDesc: 'Hereditary tasks and talents from your mother\'s side',
                protection: 'Ancestral Protection',
                protectionDesc: 'The support and strength you receive from your roots'
            }
        },
        ru: {
            title: 'РОДОВАЯ КАРМА',
            sections: {
                male: 'Программы Мужского Рода',
                maleDesc: 'Родовые задачи и таланты по линии отца',
                female: 'Программы Женского Рода',
                femaleDesc: 'Родовые задачи и таланты по линии матери',
                protection: 'Защита Рода',
                protectionDesc: 'Поддержка и сила, которую вы получаете от корней'
            }
        }
    };

    const t = content[language === 'ru' ? 'ru' : 'en'];

    const rows = [
        {
            id: 'anc-male',
            name: t.sections.male,
            desc: t.sections.maleDesc,
            icon: User,
            energies: [
                { value: matrix.f, color: '#900490' },  // Violet
                ...(!isCompatibility ? [
                    { value: matrix.s2, color: '#3a06e2' }, // Indigo
                    { value: matrix.s1, color: '#00BFFF' }, // Blue
                ] : []),
                { value: matrix.y, color: '#900490' },  // Violet
                ...(!isCompatibility ? [
                    { value: matrix.s3, color: '#3a06e2' }, // Indigo
                    { value: matrix.s4, color: '#00BFFF' }, // Blue
                ] : []),
                { value: matrix.o, color: '#900490' }   // Violet (Summary)
            ]
        },
        {
            id: 'anc-female',
            name: t.sections.female,
            desc: t.sections.femaleDesc,
            icon: UserCheck,
            energies: [
                { value: matrix.g, color: '#900490' },  // Violet
                ...(!isCompatibility ? [
                    { value: matrix.p2, color: '#3a06e2' }, // Indigo
                    { value: matrix.p1, color: '#00BFFF' }, // Blue
                ] : []),
                { value: matrix.k, color: '#900490' },  // Violet
                ...(!isCompatibility ? [
                    { value: matrix.p4, color: '#3a06e2' }, // Indigo
                    { value: matrix.p3, color: '#00BFFF' }, // Blue
                ] : []),
                { value: matrix.u, color: '#900490' }   // Violet (Summary)
            ]
        },
        ...(!isCompatibility ? [
            {
                id: 'anc-protection',
                name: t.sections.protection,
                desc: t.sections.protectionDesc,
                icon: ShieldCheck,
                energies: [
                    { value: matrix.e1, color: '#64748b' }, // Slate for visibility (was White)
                    { value: matrix.e2, color: '#64748b' }  // Slate for visibility (was White)
                ]
            }
        ] : [])
    ];

    return (
        <div className={cn("w-full h-full animate-fade-in backdrop-blur-md bg-white/70 dark:bg-black/30 rounded-3xl border border-border dark:border-white/10 shadow-xl overflow-hidden flex flex-col", className)}>
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
                            className="flex items-center p-3 rounded-2xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all gap-4 group cursor-pointer text-left relative overflow-hidden"
                            onClick={() => handleEnergyClick(item.energy.value, item.name, item.energy.color)}
                        >
                            {/* Icon Background (Optional, subtle) */}
                            <item.icon className="absolute -right-4 -bottom-4 w-12 h-12 text-primary/5 opacity-0 group-hover:opacity-10 transition-opacity" />

                            {/* Value (Outlined) */}
                            <div className="shrink-0">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-transform group-hover:scale-105"
                                    style={{
                                        borderColor: item.energy.color,
                                        color: item.energy.color,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    {item.energy.value}
                                </div>
                            </div>

                            {/* Name/Description */}
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-xs sm:text-sm text-foreground leading-tight uppercase tracking-wide truncate">{item.name}</span>
                                <span className="text-[10px] text-muted-foreground truncate">{item.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <EnergyDetailModal
                energyNumber={selectedEnergy?.number || null}
                sector="ancestral"
                categoryLabel={selectedEnergy?.label || ''}
                headerColor={selectedEnergy?.color}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
