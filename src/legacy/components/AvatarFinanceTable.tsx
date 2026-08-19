import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { EnergySectorInterpretation } from '@/content/sectorInterpretations.en';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner';
import { SubscriptionModal } from './ui/SubscriptionModal';
import { DollarSign, Wallet, ArrowUpCircle, BarChart3, TrendingUp, Lock } from 'lucide-react';
import { EnergyDetailModal } from './EnergyDetailModal';
import { EnergyChip } from './EnergyChip';
import { cn } from '@/lib/utils';

interface AvatarFinanceTableProps {
    matrix: MatrixValues;
    className?: string;
}

export const AvatarFinanceTable: React.FC<AvatarFinanceTableProps> = ({ matrix, className }) => {
    const { language } = useLanguage();
    const { isPremium } = useUser();
    const [selectedEnergy, setSelectedEnergy] = useState<{ number: number; label: string; color: string; sector: keyof EnergySectorInterpretation['sectors'] } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);

    const handleEnergyClick = (energyNumber: number, label: string, color: string, sector: keyof EnergySectorInterpretation['sectors'], isLocked: boolean) => {
        if (isLocked) {
            setIsSubModalOpen(true);
            return;
        }
        setSelectedEnergy({ number: energyNumber, label, color, sector });
        setIsModalOpen(true);
    };

    const content = {
        en: {
            title: 'FINANCE INSIGHTS',
            sections: {
                expansion: 'Expansion of the financial channel',
                channel: 'Financial channel',
                prosperity: 'Prosperity energy',
                blocks: 'What blocks my finances and opportunities?',
                balance: 'Balance between finances and relationships'
            }
        },
        ru: {
            title: 'ФИНАНСОВЫЕ ИНСАЙТЫ',
            sections: {
                expansion: 'Расширение финансового канала',
                channel: 'Финансовый канал',
                prosperity: 'Энергия процветания',
                blocks: 'Что блокирует мои финансы и возможности?',
                balance: 'Баланс между финансами и отношениями'
            }
        }
    };

    const t = content[language === 'ru' ? 'ru' : 'en'];

    const rows: {
        id: string;
        name: string;
        icon: typeof BarChart3;
        energies: number[];
        color: string;
        sector: keyof EnergySectorInterpretation['sectors'];
    }[] = [
        {
            id: 'finance-expansion',
            name: t.sections.expansion,
            icon: BarChart3,
            energies: [matrix.c1],
            color: '#ee9120', // c1 - Orange
            sector: 'finance',
        },
        {
            id: 'finance-channel',
            name: t.sections.channel,
            icon: Wallet,
            energies: [matrix.x2],
            color: '#6552B0', // x2 - Purple
            sector: 'financeChannel',
        },
        {
            id: 'finance-prosperity',
            name: t.sections.prosperity,
            icon: TrendingUp,
            energies: [matrix.c2],
            color: '#6552B0', // c2 - Purple
            sector: 'financeProsperity',
        },
        {
            id: 'finance-blocks',
            name: t.sections.blocks,
            icon: ArrowUpCircle,
            energies: [matrix.c],
            color: '#f72828', // c - Red
            sector: 'financeBlocks',
        },
        {
            id: 'finance-balance',
            name: t.sections.balance,
            icon: DollarSign,
            energies: [matrix.x],
            color: '#6552B0', // x - Purple
            sector: 'financeBalance',
        }
    ];

    return (
        <div className={cn("w-full h-full animate-fade-in backdrop-blur-md bg-white/70 dark:bg-black/30 rounded-3xl border border-border dark:border-white/10 shadow-xl overflow-hidden flex flex-col", className)}>
            <div className="p-3 flex-1 flex flex-col">
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {rows.map((row) => {
                        const isLocked = !isPremium && row.id !== 'finance-prosperity';
                        return (
                            <div
                                key={row.id}
                                className={`flex items-center p-3 rounded-2xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all gap-4 group cursor-pointer text-left relative overflow-hidden ${isLocked ? 'opacity-75 cursor-not-allowed' : ''}`}
                                onClick={() => handleEnergyClick(row.energies[0], row.name, row.color, row.sector, isLocked)}
                            >
                                {/* Lock Icon for premium rows */}
                                {isLocked && <Lock className="absolute right-3 top-3 w-4 h-4 text-primary" />}

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
                                <div className="flex flex-col min-w-0 pr-8">
                                    <span className="font-semibold text-xs sm:text-sm text-foreground leading-tight uppercase tracking-wide">{row.name}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <EnergyDetailModal
                energyNumber={selectedEnergy?.number || null}
                sector={selectedEnergy?.sector}
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
