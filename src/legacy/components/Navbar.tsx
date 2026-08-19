import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { useUser } from "@/hooks/useUser";
import { useAdmin } from "@/hooks/useAdmin";
import { Moon, Sun, Languages, User as UserIcon, Menu, X, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const { theme, setTheme } = useTheme();
    const { user, profile, loading, dataLoaded } = useUser();
    const { isAdmin } = useAdmin();
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navItems = [
        { label: t("navHome"), path: "/" },
        { label: t("navCalculator"), path: "/calculator" },
        { label: t("navRates"), path: "/rates" },
        { label: t("navBlog"), path: "/blog" },
        { label: t("navAbout"), path: "/about" },
        { label: t("navContact"), path: "/contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden max-w-full ${isScrolled
                ? "bg-background/80 backdrop-blur-md shadow-sm py-2 border-b"
                : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between overflow-hidden">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <span className="text-2xl font-semibold tracking-tight text-foreground">
                        Soul+AI
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`text-base font-medium transition-colors ${isActive
                                    ? "text-primary dark:text-primary"
                                    : "text-foreground/70 hover:text-foreground dark:text-gray-300 dark:hover:text-white"
                                    }`}
                            >
                                {item.label}
                                {isActive && (
                                    <span className="block h-0.5 w-full bg-primary animate-in fade-in zoom-in duration-300" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Action Items */}
                <div className="flex items-center gap-3">
                    {/* Language Switcher */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Languages className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setLanguage("en")}>
                                English
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLanguage("ru")}>
                                Русский
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {theme === "dark" ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                    </Button>

                    {/* Auth Section */}
                    {!loading && (
                        <div className="flex items-center gap-2">
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="gap-2 border-primary/20 hover:bg-primary/5 rounded-full px-2 sm:px-4 py-2 h-auto text-foreground"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                <UserIcon className="h-4 w-4 text-primary" />
                                            </div>
                                            <span className="max-w-[150px] truncate text-sm font-medium hidden sm:inline-block text-foreground">
                                                {profile?.full_name || user.email?.split('@')[0]}
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 mt-2 p-2">
                                        <DropdownMenuItem onClick={() => navigate("/avatar")} className="cursor-pointer">
                                            {t("navMyAvatar")}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => window.open("/reading", "_blank")} className="cursor-pointer">
                                            {t("navReading")}
                                        </DropdownMenuItem>
                                        {/* <DropdownMenuItem onClick={() => navigate("/diary")} className="cursor-pointer">
                                            {t("navDiary")}
                                        </DropdownMenuItem> */}
                                        <DropdownMenuItem onClick={() => navigate("/blog")} className="cursor-pointer">
                                            {t("navBlog")}
                                        </DropdownMenuItem>
                                        {/* <DropdownMenuItem onClick={() => navigate("/notes")} className="cursor-pointer">
                                            {t("navNotes")}
                                        </DropdownMenuItem> */}
                                        <DropdownMenuItem onClick={() => {
                                            navigate("/");
                                            setTimeout(() => {
                                                document.getElementById('motd')?.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }} className="cursor-pointer">
                                            {t("navTip")}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => navigate("/calculator")} className="cursor-pointer">
                                            {t("navCalculator")}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => navigate("/compatibility")} className="cursor-pointer">
                                            {t("compatibilityMatrixTitle")}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => navigate("/account")} className="cursor-pointer border-t mt-2 pt-2">
                                            {t("navProfile")}
                                        </DropdownMenuItem>
                                        {dataLoaded && isAdmin && (
                                            <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer text-primary font-medium flex items-center gap-2">
                                                <ShieldAlert className="h-4 w-4" />
                                                {t("navAdmin")}
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem
                                            onClick={async () => {
                                                const { supabase } = await import("@/integrations/supabase/client");
                                                await supabase.auth.signOut();
                                                navigate("/");
                                            }}
                                            className="cursor-pointer text-red-500 focus:text-red-500"
                                        >
                                            {t("navLogout")}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="hidden sm:flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigate("/auth?mode=login")}
                                    >
                                        {t("navLogin")}
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-primary hover:opacity-90 text-white border-none shadow-lg px-6"
                                        onClick={() => navigate("/auth?mode=signup")}
                                    >
                                        {t("navSignup")}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden h-9 w-9"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {
                isMobileMenuOpen && (
                    <div className="md:hidden bg-background border-t animate-in slide-in-from-top duration-300">
                        <div className="flex flex-col p-4 space-y-4">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <button
                                        key={item.path}
                                        onClick={() => {
                                            navigate(item.path);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`text-left py-2 font-medium transition-colors ${isActive ? "text-primary" : "text-foreground/80"
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                            <hr className="dark:border-gray-800" />
                            {!loading && !user && (
                                <div className="flex flex-col gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => {
                                            navigate("/auth?mode=login");
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        {t("navLogin")}
                                    </Button>
                                    <Button
                                        className="w-full bg-primary text-white"
                                        onClick={() => {
                                            navigate("/auth?mode=signup");
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        {t("navSignup")}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
        </nav>
    );
}
