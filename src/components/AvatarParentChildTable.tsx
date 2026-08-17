import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Baby, Handshake, HeartHandshake, Target, Activity, Stars } from 'lucide-react';
import { EnergyDetailModal } from './EnergyDetailModal';
import { EnergyChip } from './EnergyChip';
import { cn } from '@/lib/utils';
import { EnergySectorInterpretation } from '@/content/sectorInterpretations.en';

interface AvatarParentChildTableProps {
    matrix: MatrixValues;
    className?: string;
}

export const AvatarParentChildTable: React.FC<AvatarParentChildTableProps> = ({ matrix, className }) => {
    const { language } = useLanguage();
    const [selectedEnergy, setSelectedEnergy] = useState<{ number: number; label: string; color: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEnergyClick = (energyNumber: number, label: string, color: string) => {
        setSelectedEnergy({ number: energyNumber, label, color });
        setIsModalOpen(true);
    };

    const content = {
        en: {
            title: 'PARENT-CHILD RELATIONSHIP',
            sections: {
                parents: 'Relationship with Parents',
                parentsDesc: 'Lessons inherited from your parents',
                ancestral: 'Ancestral Lessons',
                ancestralDesc: 'Ancient wisdom and patterns',
                lineage: 'Spiritual Lineage',
                lineageDesc: 'Your connection to ancestor energy',
                children: 'Relationship with Children',
                childrenDesc: 'Your approach to parenting and future',
                heritage: 'Spiritual Heritage',
                heritageDesc: 'What you pass on to next generation',
                guidance: 'Parental Guidance',
                guidanceDesc: 'The spiritual bond within the family'
            }
        },
        ru: {
            title: 'ДЕТСКО-РОДИТЕЛЬСКИЕ ОТНОШЕНИЯ',
            sections: {
                parents: 'Отношения с Родителями',
                parentsDesc: 'Уроки, унаследованные от родителей',
                ancestral: 'Родовые Уроки',
                ancestralDesc: 'Мудрость и паттерны предков',
                lineage: 'Духовная Линия',
                lineageDesc: 'Ваша связь с энергией рода',
                children: 'Отношения с Детьми',
                childrenDesc: 'Ваш подход к родительству и будущему',
                heritage: 'Духовное Наследие',
                heritageDesc: 'Что вы передаете следующему поколению',
                guidance: 'Родительское Руководство',
                guidanceDesc: 'Духовная связь внутри семьи'
            }
        }
    };

    const t = content[language === 'ru' ? 'ru' : 'en'];

    const rows = [
        {
            id: 'pc-parents',
            name: t.sections.parents,
            desc: t.sections.parentsDesc,
            icon: Users,
            energies: [matrix.a],
            color: '#900490' // Violet
        },
        {
            id: 'pc-ancestral',
            name: t.sections.ancestral,
            desc: t.sections.ancestralDesc,
            icon: Target,
            energies: [matrix.a2],
            color: '#3a06e2' // Indigo
        },
        {
            id: 'pc-lineage',
            name: t.sections.lineage,
            desc: t.sections.lineageDesc,
            icon: Activity,
            energies: [matrix.a1],
            color: '#00BFFF' // Blue
        },
        {
            id: 'pc-children',
            name: t.sections.children,
            desc: t.sections.childrenDesc,
            icon: Baby,
            energies: [matrix.a],
            color: '#900490' // Violet
        },
        {
            id: 'pc-heritage',
            name: t.sections.heritage,
            desc: t.sections.heritageDesc,
            icon: Stars,
            energies: [matrix.a2],
            color: '#3a06e2' // Indigo
        },
        {
            id: 'pc-guidance',
            name: t.sections.guidance,
            desc: t.sections.guidanceDesc,
            icon: HeartHandshake,
            energies: [matrix.a1],
            color: '#00BFFF' // Blue
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
                sector="family"
                categoryLabel={selectedEnergy?.label || ''}
                headerColor={selectedEnergy?.color}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
