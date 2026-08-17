import { Calculator, CalendarClock, Eye, ArrowRight, ChevronRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function CalculatorHowItWorks() {
    const { t } = useLanguage();

    const steps = [
        {
            icon: <CalendarClock className="w-5 h-5" />,
            title: t('stepEnterDate'),
            desc: t('stepEnterDateDesc')
        },
        {
            icon: <Calculator className="w-5 h-5" />,
            title: t('stepCalculate'),
            desc: t('stepCalculateDesc')
        },
        {
            icon: <Eye className="w-5 h-5" />,
            title: t('stepReveal'),
            desc: t('stepRevealDesc')
        }
    ];

    return (
        <div className="pt-6 border-t border-border/50 overflow-hidden">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 text-center break-words">{t('howItWorks')}</h4>
            <div className="relative flex items-start justify-between gap-1 overflow-hidden">
                {/* Connecting Line (Absolute) - Centered with 40px icons (top-5 = 20px) */}
                <div className="absolute top-5 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10 opacity-50 -translate-y-1/2" />

                {steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center gap-2 flex-1 relative group">

                        {/* Icon Circle */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/10 flex items-center justify-center text-primary relative z-10 group-hover:scale-110 transition-transform duration-300">
                            {/* Adjusted Icon Size for mobile */}
                            <div className="scale-90 sm:scale-100">
                                {step.icon}
                            </div>
                        </div>

                        {/* Text */}
                        <div className="space-y-0.5">
                            <div className="font-semibold text-sm text-foreground">{step.title}</div>
                            <div className="text-[10px] text-muted-foreground leading-tight px-1">{step.desc}</div>
                        </div>

                        {/* Arrow between steps - Centered with icons */}
                        {idx < steps.length - 1 && (
                            <div className="absolute top-5 -right-[50%] left-[50%] flex justify-center items-center pointer-events-none opacity-40 -translate-y-1/2">
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
