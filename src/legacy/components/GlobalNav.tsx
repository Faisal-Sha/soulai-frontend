import { Languages, Moon, Sun, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

export function GlobalNav() {
    const { language, setLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();
    const { user, loading } = useUser();
    const navigate = useNavigate();

    return (
        <div className="fixed top-3 sm:top-4 right-3 sm:right-4 z-50 flex gap-1.5 sm:gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="gap-1 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3"
            >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
                className="gap-1 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
            >
                <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{language.toUpperCase()}</span>
            </Button>
            {!loading && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(user ? "/dashboard" : "/auth")}
                    className="gap-1 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3"
                >
                    <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline text-xs sm:text-sm">
                        {user ? (language === 'ru' ? 'Профиль' : 'Profile') : (language === 'ru' ? 'Войти' : 'Login')}
                    </span>
                </Button>
            )}
        </div>
    );
}
