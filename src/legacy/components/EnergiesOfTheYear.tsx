import React, { useState } from "react";
import { MatrixValues } from "@/core/calc";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sun } from "lucide-react";
import { AvatarYearEnergiesTable } from "./AvatarYearEnergiesTable";

interface EnergiesOfTheYearProps {
    matrix: MatrixValues;
}

export const EnergiesOfTheYear: React.FC<EnergiesOfTheYearProps> = ({ matrix }) => {
    const [showEnergies, setShowEnergies] = useState(false);
    const { language } = useLanguage();

    // Labels based on language
    const labels = {
        title: language === 'ru' ? 'Энергии Года' : 'Energies of the Year',
        toggleLabel: language === 'ru' ? 'Показать энергии года' : 'Show energies of the year',
        description: language === 'ru'
            ? 'Таблица энергий года показывает основные влияния на каждый период вашей жизни.'
            : 'The yearly energy table shows the main influences for each period of your life.',
    };

    return (
        <div className="w-full mt-8 max-w-4xl mx-auto px-2">
            <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="energies-toggle"
                        checked={showEnergies}
                        onCheckedChange={setShowEnergies}
                    />
                    <Label htmlFor="energies-toggle" className="text-base font-medium cursor-pointer">
                        {labels.toggleLabel}
                    </Label>
                </div>
            </div>

            {showEnergies && (
                <Card className="glass-card p-0 overflow-hidden border-border/50 dark:bg-gray-800/80 animate-in fade-in zoom-in-95 duration-300 bg-white/50 dark:bg-transparent shadow-sm dark:shadow-none border dark:border-none border-black/5">
                    <div className="p-4 sm:p-6 bg-background/50 border-b border-border/10 rounded-t-3xl backdrop-blur-md mb-4 rounded-3xl border border-black/5 dark:border-white/10">
                        <h3 className="text-xl font-medium text-center flex items-center justify-center gap-2 text-foreground">
                            <Sun className="w-5 h-5 text-orange-500" />
                            {labels.title}
                        </h3>
                        <p className="text-sm text-center text-muted-foreground mt-2 max-w-lg mx-auto">
                            {labels.description}
                        </p>
                    </div>

                    <AvatarYearEnergiesTable matrix={matrix} className="max-h-[600px] sm:max-h-[800px]" />
                </Card>
            )}
        </div>
    );
};
