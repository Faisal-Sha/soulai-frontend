import React, { useState } from 'react';
import { MatrixValues } from '../core/calc';
import { calculateYearEnergiesTable, YearEnergyRow } from '../core/utils';
// import { EnergyChip } from './EnergyChip'; // Replaced with manual implementation
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Info } from 'lucide-react';
import { EnergyDetailModal } from './EnergyDetailModal';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AvatarYearEnergiesTableProps {
    matrix: MatrixValues;
    className?: string;
}

export const AvatarYearEnergiesTable: React.FC<AvatarYearEnergiesTableProps> = ({ matrix, className }) => {
    const { language } = useLanguage();
    const [selectedEnergy, setSelectedEnergy] = useState<{ number: number; name: string } | null>(null);

    const yearEnergies: YearEnergyRow[] = calculateYearEnergiesTable(matrix);

    const content = {
        en: {
            headers: [
                { label: 'YEAR', tooltip: 'Age interval' },
                { label: '1', tooltip: 'The main energy of the year - key trends, directions of the year.' },
                { label: '2', tooltip: 'Problems we may encounter.' },
                { label: '3', tooltip: 'The reward we can receive by realizing the 1st and 2nd energies of the year.' },
            ]
        },
        ru: {
            headers: [
                { label: 'ГОД', tooltip: 'Возрастной интервал' },
                { label: '1', tooltip: 'Главная энергия года - ключевые тенденции, направления года.' },
                { label: '2', tooltip: 'Проблемы, с которыми мы можем столкнуться.' },
                { label: '3', tooltip: 'Награда, которую мы можем получить, реализовав 1-ю и 2-ю энергии года.' },
            ]
        }
    };

    const tc = content[language === 'ru' ? 'ru' : 'en'];
    const headers = tc.headers;

    return (
        <div className={cn("w-full h-full animate-fade-in bg-transparent rounded-3xl overflow-hidden flex flex-col gap-0", className)}>
            <div className="px-3 pt-3">
                <table className="w-full text-[10px] sm:text-xs text-center border-separate border-spacing-x-2 border-spacing-y-0 table-fixed">
                    <thead>
                        <tr>
                            {/* Year Header */}
                            <th className="px-1 sm:px-4 w-1/4 bg-transparent border-b-0 align-bottom pb-2 sm:pb-4">
                                <div className="bg-black/5 dark:bg-white/10 backdrop-blur-md rounded-full py-2 sm:py-3 text-center text-foreground font-medium shadow-sm text-[9px] sm:text-xs border border-black/5 dark:border-none">
                                    {headers[0].label}
                                </div>
                            </th>

                            {/* Energy 1 Header */}
                            <th className="px-1 sm:px-4 w-1/4 bg-transparent border-b-0 align-bottom pb-2 sm:pb-4">
                                <div className="bg-black/5 dark:bg-white/10 backdrop-blur-md rounded-full py-2 sm:py-3 shadow-sm border border-black/5 dark:border-none">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center justify-center gap-1 w-full group cursor-help text-foreground font-medium text-[10px] sm:text-sm">
                                                    1 <Info className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-black text-white border-white/20 z-[60]">
                                                <p className="max-w-xs text-center">{headers[1].tooltip}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </th>

                            {/* Energy 2 Header */}
                            <th className="px-1 sm:px-4 w-1/4 bg-transparent border-b-0 align-bottom pb-2 sm:pb-4">
                                <div className="bg-black/5 dark:bg-white/10 backdrop-blur-md rounded-full py-2 sm:py-3 shadow-sm border border-black/5 dark:border-none">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center justify-center gap-1 w-full group cursor-help text-foreground font-medium text-[10px] sm:text-sm">
                                                    2 <Info className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-black text-white border-white/20 z-[60]">
                                                <p className="max-w-xs text-center">{headers[2].tooltip}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </th>

                            {/* Energy 3 Header */}
                            <th className="px-1 sm:px-4 w-1/4 bg-transparent border-b-0 align-bottom pb-2 sm:pb-4">
                                <div className="bg-black/5 dark:bg-white/10 backdrop-blur-md rounded-full py-2 sm:py-3 shadow-sm border border-black/5 dark:border-none">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center justify-center gap-1 w-full group cursor-help text-foreground font-medium text-[10px] sm:text-sm">
                                                    3 <Info className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-black text-white border-white/20 z-[60]">
                                                <p className="max-w-xs text-center">{headers[3].tooltip}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="p-3 pt-0 flex-1 flex flex-col min-h-0">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .custom-minimal-scroll::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-minimal-scroll::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-minimal-scroll::-webkit-scrollbar-thumb {
                        background: rgba(0, 0, 0, 0.1);
                        border-radius: 20px;
                    }
                    .dark .custom-minimal-scroll::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.1);
                    }
                `}} />
                <div className="overflow-auto flex-1 custom-minimal-scroll">
                    <table className="w-full text-[10px] sm:text-xs text-center border-separate border-spacing-x-2 border-spacing-y-1 table-fixed">
                        <tbody className="">
                            {yearEnergies.map((row, index) => {
                                const isLast = index === yearEnergies.length - 1;
                                const cornerClass = `${index === 0 ? "rounded-t-2xl" : ""} ${isLast ? "rounded-b-2xl" : ""}`;

                                return (
                                    <tr key={index} className="group">
                                        {/* Year Val */}
                                        <td className={`px-1.5 py-1.5 w-1/4 text-center font-medium bg-black/5 dark:bg-white/10 text-foreground border-l border-r border-black/5 dark:border-none ${cornerClass}`}>
                                            {row.ageRange}
                                        </td>
                                        {/* E1 Val */}
                                        <td className={`px-1.5 py-1.5 w-1/4 bg-black/5 dark:bg-black/40 ${cornerClass}`}>
                                            <div
                                                onClick={() => setSelectedEnergy({ number: row.energy1, name: 'Main Energy' })}
                                                className="flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                                            >
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-primary/30 dark:border-white text-foreground dark:text-white font-bold text-sm shadow-sm bg-background/50 dark:bg-transparent">
                                                    {row.energy1}
                                                </span>
                                            </div>
                                        </td>
                                        {/* E2 Val */}
                                        <td className={`px-1.5 py-1.5 w-1/4 bg-black/5 dark:bg-black/40 ${cornerClass}`}>
                                            <div
                                                onClick={() => setSelectedEnergy({ number: row.energy2, name: 'Problem Energy' })}
                                                className="flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                                            >
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-primary/30 dark:border-white text-foreground dark:text-white font-bold text-sm shadow-sm bg-background/50 dark:bg-transparent">
                                                    {row.energy2}
                                                </span>
                                            </div>
                                        </td>
                                        {/* E3 Val */}
                                        <td className={`px-1.5 py-1.5 w-1/4 bg-black/5 dark:bg-black/40 ${cornerClass}`}>
                                            <div
                                                onClick={() => setSelectedEnergy({ number: row.energy3, name: 'Reward Energy' })}
                                                className="flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                                            >
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-primary/30 dark:border-white text-foreground dark:text-white font-bold text-sm shadow-sm bg-background/50 dark:bg-transparent">
                                                    {row.energy3}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedEnergy && (
                <EnergyDetailModal
                    energyNumber={selectedEnergy.number}
                    sector="forecast"
                    isOpen={!!selectedEnergy}
                    onClose={() => setSelectedEnergy(null)}
                />
            )}
        </div>
    );
};
