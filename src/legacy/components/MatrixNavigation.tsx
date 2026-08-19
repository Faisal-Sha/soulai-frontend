import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export function MatrixNavigation() {
  const location = useLocation();
  const { language } = useLanguage();

  const tabs = [
    {
      path: "/",
      labelRu: "Персональная матрица",
      labelEn: "Personal Matrix"
    },
    {
      path: "/compatibility",
      labelRu: "Матрица совместимости",
      labelEn: "Compatibility Matrix"
    }
  ];

  return (
    <div className="flex gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-background/50 backdrop-blur-xl rounded-t-[20px] border-b border-border">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={cn(
              "flex-1 px-2 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-300 text-center rounded-[14px] sm:rounded-[16px] border",
              isActive
                ? "bg-gradient-to-br from-primary/10 via-glass-pink/20 to-glass-purple/20 text-foreground shadow-[0_4px_30px_rgba(0,0,0,0.15),inset_0_0_40px_rgba(255,255,255,0.3)] border-primary/50 scale-[1.02] backdrop-blur-3xl"
                : "glass text-muted-foreground hover:text-foreground hover:bg-primary/5 hover:scale-[1.01] hover:shadow-[0_2px_20px_rgba(0,0,0,0.1)] border-border/50"
            )}
          >
            <span className="block sm:hidden">
              {language === 'ru' ? (tab.path === '/' ? 'Персональная' : 'Совместимость') : (tab.path === '/' ? 'Personal' : 'Compatibility')}
            </span>
            <span className="hidden sm:block">
              {language === 'ru' ? tab.labelRu : tab.labelEn}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
