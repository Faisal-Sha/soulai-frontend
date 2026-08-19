import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Coins, Sparkles, Target, Compass, Eye, Circle, Zap, Lock } from "lucide-react";
import { calcMOTDMatrix, type MatrixValues, type DOB } from "@/core/calc";
import { energies as energiesEn } from "@/content/energies.en";
import { energies as energiesRu } from "@/content/energies.ru";
import { useUser } from "@/hooks/useUser";
import { SubscriptionModal } from "./ui/SubscriptionModal";

interface MessageOfTheDayProps {
    dob?: DOB | null;
}

export function MessageOfTheDay({ dob }: MessageOfTheDayProps) {
    const { language } = useLanguage();
    const { isPremium } = useUser();
    const [messageMatrix, setMessageMatrix] = useState<MatrixValues | null>(null);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("section-0");

    useEffect(() => {
        if (dob) {
            calculateMessage(dob);
        } else {
            setMessageMatrix(null);
        }
    }, [dob]);

    const calculateMessage = (inputDob: DOB) => {
        try {
            const todayDate = new Date();
            const todayDOB: DOB = {
                day: todayDate.getDate(),
                month: todayDate.getMonth() + 1,
                year: todayDate.getFullYear()
            };

            // Using the specialized MOTD matrix calculation
            const interactionMatrix = calcMOTDMatrix(inputDob, todayDOB);
            setMessageMatrix(interactionMatrix);
        } catch (e: any) {
            console.error("Error calculating MOTD:", e);
        }
    };

    if (!messageMatrix) return null;

    const energyContent = language === "ru" ? energiesRu : energiesEn;

    const sections = [
        {
            id: "section-0",
            title: language === "ru" ? "Энергия вашего дня" : "Energy of the Day",
            shortTitle: language === "ru" ? "Энергия дня" : "Energy",
            energyKeys: ["center"],
            icon: <Sparkles className="w-4 h-4" />,
            description: language === "ru" ? "Ваша главная точка баланса и силы на сегодня." : "Your main point of balance and power today.",
            gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
            isMain: true
        },
        {
            id: "section-1",
            title: language === "ru" ? "Прогноз на день" : "Forecast",
            shortTitle: language === "ru" ? "Прогноз" : "Forecast",
            energyKeys: ["a", "a2", "a1"],
            icon: <Eye className="w-4 h-4" />,
            description: language === "ru" ? "Раскройте, как сложится ваш день через эти ключевые энергии." : "Uncover how your day will unfold through these key energies.",
            gradient: "from-blue-500/20 via-blue-500/10 to-transparent"
        },
        {
            id: "section-2",
            title: language === "ru" ? "Вдохновение дня" : "Inspiration of the day",
            shortTitle: language === "ru" ? "Вдохновение" : "Inspiration",
            energyKeys: ["b", "b2", "b1"],
            icon: <Zap className="w-4 h-4" />,
            description: language === "ru" ? "Ваше вдохновение и инсайты на сегодня через глубинные таланты." : "Your inspiration and insights for today through deep talents.",
            gradient: "from-yellow-500/20 via-yellow-500/10 to-transparent"
        },
        {
            id: "section-3",
            title: language === "ru" ? "Что вам нужно сделать" : "What you have to do",
            shortTitle: language === "ru" ? "Действие" : "Action",
            energyKeys: ["c", "c2", "c1"],
            icon: <Target className="w-4 h-4" />,
            description: language === "ru" ? "Ключевые задачи и действия, которые помогут сегодня." : "Key tasks and actions that will help you today.",
            gradient: "from-red-500/20 via-red-500/10 to-transparent"
        },
        {
            id: "section-4",
            title: language === "ru" ? "О том, что еще не сделано" : "What still missing to do",
            shortTitle: language === "ru" ? "Процесс" : "Process",
            energyKeys: ["d", "d2", "d1"],
            icon: <Zap className="w-4 h-4" />,
            description: language === "ru" ? "То, на что стоит обратить внимание для завершения циклов." : "What you should pay attention to for completing cycles.",
            gradient: "from-orange-500/20 via-orange-500/10 to-transparent"
        },
        {
            id: "section-5",
            title: language === "ru" ? "Энергия отношений это" : "Relationship energy is",
            shortTitle: language === "ru" ? "Отношения" : "Love",
            energyKeys: ["d1", "x1", "x"],
            icon: <Heart className="w-4 h-4" />,
            description: language === "ru" ? "Послание для ваших отношений и чувств сегодня." : "The message for your relationships and feelings today.",
            gradient: "from-pink-500/20 via-pink-500/10 to-transparent"
        },
        {
            id: "section-6",
            title: language === "ru" ? "Энергия денег это" : "Money energy is",
            shortTitle: language === "ru" ? "Деньги" : "Money",
            energyKeys: ["c1", "x2", "x"],
            icon: <Coins className="w-4 h-4" />,
            description: language === "ru" ? "Ваш финансовый ориентир и путь изобилия на сегодня." : "Your financial guide and path of abundance today.",
            gradient: "from-amber-500/20 via-amber-500/10 to-transparent"
        }
    ];

    const handleTabChange = (value: string) => {
        const isLocked = !isPremium && value !== "section-0";
        if (isLocked) {
            setIsSubModalOpen(true);
            return;
        }
        setActiveTab(value);
    };

    return (
        <div id="motd" className="w-full transition-all duration-1000 animate-in fade-in slide-in-from-bottom-12 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center space-y-3 sm:space-y-4">
                    <h1 className="text-lg sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/40">
                        {language === "ru" ? "Послание вашего дня" : "Your Message of the Day"}
                    </h1>
                    <div className="flex items-center justify-center gap-3 sm:gap-6">
                        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                        <p className="text-[8px] sm:text-xs text-muted-foreground/40 font-bold tracking-[0.2em] sm:tracking-[0.4em] uppercase">
                            {language === "ru" ? "Гармония вашего пути" : "HARMONY OF YOUR PATH"}
                        </p>
                        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-primary/50 to-transparent" />
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <div className="pb-4">
                        <TabsList className="flex flex-wrap bg-transparent p-0 gap-2 h-auto justify-center">
                            {sections.map((section, idx) => {
                                const isLocked = !isPremium && idx !== 0;
                                return (
                                    <TabsTrigger
                                        key={section.id}
                                        value={section.id}
                                        className={`px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl border border-border dark:border-white/10 transition-all data-[state=active]:bg-primary/10 data-[state=active]:border-primary/50 data-[state=active]:text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 shrink-0 ${isLocked ? 'opacity-70 grayscale-[0.5]' : ''}`}
                                    >
                                        {React.cloneElement(section.icon as React.ReactElement, { className: "w-3 h-3 sm:w-4 sm:h-4" })}
                                        <span>{section.shortTitle}</span>
                                        {isLocked && <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>

                    <div className="mt-4">
                        {sections.map((section) => {
                            const interpretations = section.energyKeys.map(key => {
                                const val = (messageMatrix as any)[key];
                                return {
                                    val,
                                    content: energyContent[val]
                                };
                            }).filter(i => i.content);

                            if (interpretations.length === 0) return null;

                            return (
                                <TabsContent key={section.id} value={section.id} className="focus-visible:ring-0">
                                    <div className="space-y-6 max-w-7xl mx-auto">
                                        <div className="text-center space-y-1.5 px-4">
                                            <h4 className="text-[10px] sm:text-xs font-bold text-foreground/40 dark:text-white/40 uppercase tracking-[0.2em] leading-tight">
                                                {section.title}
                                            </h4>
                                            <p className="text-[11px] sm:text-sm text-foreground/60 dark:text-white/60 font-medium leading-relaxed max-w-xl mx-auto">
                                                {section.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-2 sm:px-0 pb-8">
                                            {interpretations.map((item, idx) => (
                                                <Card key={idx} className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/5 backdrop-blur-3xl transition-all duration-500 hover:border-primary/30 shadow-sm flex flex-col">
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-30`} />

                                                    <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full gap-3 sm:gap-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                                                                <span className="text-xl sm:text-2xl font-black text-primary">
                                                                    {item.val}
                                                                </span>
                                                            </div>
                                                            <h5 className="text-sm sm:text-lg font-bold text-foreground dark:text-white tracking-tight leading-tight line-clamp-2">
                                                                {item.content.name}
                                                            </h5>
                                                        </div>

                                                        <p className="text-[12px] sm:text-sm text-foreground/80 dark:text-white/80 font-normal leading-relaxed italic border-l-2 border-primary/30 pl-3">
                                                            "{item.content.shortDesc}"
                                                        </p>

                                                        <div className="flex flex-wrap gap-1 mt-auto pt-2">
                                                            {item.content.keywords.slice(0, 4).map((keyword, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-foreground/5 dark:bg-white/5 border border-foreground/5 dark:border-white/10 text-foreground/50 dark:text-white/50 uppercase tracking-tighter font-bold"
                                                                >
                                                                    {keyword}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>
                            );
                        })}
                    </div>
                </Tabs>
            </div>

            <SubscriptionModal
                isOpen={isSubModalOpen}
                onClose={() => setIsSubModalOpen(false)}
            />
        </div>
    );
}
