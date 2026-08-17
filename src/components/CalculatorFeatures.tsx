import { User, Target, TrendingUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function CalculatorFeatures() {
    const { t } = useLanguage();

    const features = [
        {
            icon: <User className="w-5 h-5 text-blue-500" />,
            title: t('featureIdentity'),
            desc: t('featureIdentityDesc')
        },
        {
            icon: <Target className="w-5 h-5 text-purple-500" />,
            title: t('featurePurpose'),
            desc: t('featurePurposeDesc')
        },
        {
            icon: <TrendingUp className="w-5 h-5 text-pink-500" />,
            title: t('featureDestiny'),
            desc: t('featureDestinyDesc')
        }
    ];

    return (
        <div className="flex flex-col gap-4 overflow-hidden">
            {features.map((feature, idx) => (
                <div
                    key={idx}
                    className="flex items-start gap-4 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-transparent hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
                >
                    <div className="shrink-0 mt-1 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        {feature.icon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground text-sm">
                            {feature.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                            {feature.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
