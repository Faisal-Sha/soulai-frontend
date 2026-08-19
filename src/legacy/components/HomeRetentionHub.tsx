import { Link } from "react-router-dom";
import { BookOpen, HeartHandshake, MessageCircle, UserRound, LayoutGrid } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/hooks/useUser";
import { getActivationMentorPath } from "@/product/activation";

/**
 * RETENTION · HOME hub — links only to existing product surfaces.
 * No new features; FigJam hub slots mapped to current routes.
 */
export function HomeRetentionHub() {
  const { language } = useLanguage();
  const { isPremium } = useUser();

  const copy =
    language === "ru"
      ? {
          eyebrow: "Ваш хаб",
          mentor: "Ментор",
          reading: "Разбор",
          compatibility: "Совместимость",
          matrices: "Матрицы",
          account: "Аккаунт",
        }
      : {
          eyebrow: "Your hub",
          mentor: "Mentor",
          reading: "Reading",
          compatibility: "Compatibility",
          matrices: "Matrices",
          account: "Account",
        };

  const items = [
    {
      key: "mentor",
      label: copy.mentor,
      to: getActivationMentorPath(),
      icon: MessageCircle,
    },
    {
      key: "reading",
      label: copy.reading,
      to: isPremium ? "/reading" : "/rates",
      icon: BookOpen,
    },
    {
      key: "compatibility",
      label: copy.compatibility,
      to: "/compatibility",
      icon: HeartHandshake,
    },
    {
      key: "matrices",
      label: copy.matrices,
      to: "/avatar",
      icon: LayoutGrid,
    },
    {
      key: "account",
      label: copy.account,
      to: "/account",
      icon: UserRound,
    },
  ] as const;

  return (
    <nav
      aria-label={copy.eyebrow}
      className="w-full max-w-3xl mx-auto mb-10 animate-in fade-in slide-in-from-top-2 duration-500"
    >
      <p className="text-center text-[10px] sm:text-xs font-bold tracking-[0.35em] text-primary/80 uppercase mb-4">
        {copy.eyebrow}
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {items.map(({ key, label, to, icon: Icon }) => (
          <li key={key}>
            <Link
              to={to}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl border border-border/60 bg-background/60 hover:bg-primary/5 hover:border-primary/30 text-foreground/80 hover:text-foreground text-xs sm:text-sm font-medium transition-colors"
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
