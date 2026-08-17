import React from 'react';
import { cn } from '@/lib/utils';
import { energies as energiesEn, EnergyInfo } from '@/content/energies.en';
import { energies as energiesRu } from '@/content/energies.ru';
import { getChakraInfo } from '@/lib/chakraColorMap';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnergyChipProps {
    energyNumber: number;
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    showName?: boolean;
    className?: string;
    monochrome?: boolean;
    readonly?: boolean;
    customColor?: string;
}

export const EnergyChip: React.FC<EnergyChipProps> = ({
    energyNumber,
    onClick,
    size = 'md',
    showName = false,
    className,
    monochrome = false,
    readonly = false,
    customColor
}) => {
    const { language } = useLanguage();
    const energies = language === 'ru' ? energiesRu : energiesEn;
    const energy: EnergyInfo | undefined = energies[energyNumber];

    if (!energy) return null;

    const chakraInfo = getChakraInfo(energy.chakra);

    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base'
    };

    const containerSizeClasses = {
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-3'
    };

    const sharedClasses = cn(
        "rounded-full font-semibold flex items-center justify-center border-2 shrink-0 aspect-square transition-all duration-200",
        sizeClasses[size],
        customColor ? "bg-transparent" : (
            monochrome ? [
                "border-transparent bg-transparent text-foreground hover:bg-white/10 dark:hover:bg-white/10"
            ] : (chakraInfo ? [
                chakraInfo.color,
                chakraInfo.borderColor,
                "text-white dark:text-white shadow-md"
            ] : [
                "bg-gradient-to-br from-primary/80 to-primary border-primary/50 text-primary-foreground"
            ])
        )
    );

    const sharedStyle = customColor ? {
        borderColor: customColor,
        color: customColor,
        backgroundColor: `${customColor}10` // 10 is ~6% opacity in hex
    } : ((!monochrome && chakraInfo) ? {
        boxShadow: `0 0 15px ${chakraInfo.glowColor}`
    } : undefined);

    return (
        <div className={cn("inline-flex items-center rounded-full", containerSizeClasses[size], className)}>
            {readonly ? (
                <div
                    className={sharedClasses}
                    style={sharedStyle}
                    title={energy.name}
                >
                    {energyNumber}
                </div>
            ) : (
                <button
                    onClick={onClick}
                    className={cn(sharedClasses, "hover:scale-110 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary")}
                    style={sharedStyle}
                    title={energy.name}
                >
                    {energyNumber}
                </button>
            )}
            {showName && (
                <span className="text-sm font-medium text-slate-900 dark:text-foreground/80">
                    {energy.name}
                </span>
            )}
        </div>
    );
};
