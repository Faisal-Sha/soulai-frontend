import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
    const { language, t } = useLanguage();
    const navigate = useNavigate();

    const sections = [
        {
            title: language === "ru" ? "Сервис" : "Service",
            links: [
                { label: t("navCalculator"), path: "/calculator" },
                { label: t("navRates"), path: "/rates" },
                { label: t("navBlog"), path: "/blog" },
                { label: t("navAbout"), path: "/about" },
            ],
        },
        {
            title: language === "ru" ? "Поддержка" : "Support",
            links: [
                { label: t("navContact"), path: "/contact" },
                { label: language === "ru" ? "Частые вопросы" : "FAQ", path: "/faq" },
                { label: language === "ru" ? "Политика конфиденциальности" : "Privacy Policy", path: "/privacy" },
                { label: language === "ru" ? "Условия использования" : "Terms of Service", path: "/terms" },
            ],
        },
    ];

    return (
        <footer className="border-t pt-16 pb-8 bg-background/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6 pointer-events-none">
                            <span className="text-xl font-semibold tracking-tight text-foreground">
                                Soul+AI
                            </span>
                        </div>
                        <p className="text-foreground/60 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            {language === "ru"
                                ? "Помогаем раскрыть ваш потенциал через древнюю мудрость и современные технологии."
                                : "Helping you unlock your potential through ancient wisdom and modern technology."}
                        </p>
                        <div className="flex gap-4">
                            <ButtonIcon icon={<Facebook size={18} />} aria-label="Facebook" />
                            <ButtonIcon icon={<Instagram size={18} />} aria-label="Instagram" />
                            <ButtonIcon icon={<Twitter size={18} />} aria-label="Twitter" />
                            <ButtonIcon icon={<Youtube size={18} />} aria-label="Youtube" />
                        </div>
                    </div>

                    {/* Links Sections */}
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h4 className="font-semibold mb-6 dark:text-white">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <button
                                            onClick={() => navigate(link.path)}
                                            className="text-foreground/60 hover:text-primary transition-colors text-sm dark:text-gray-400 dark:hover:text-purple-400"
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter / Contact */}
                    <div>
                        <h4 className="font-semibold mb-6 dark:text-white">
                            {language === "ru" ? "Контакты" : "Contact"}
                        </h4>
                        <p className="text-sm text-foreground/60 dark:text-gray-400 mb-4">
                            Email: support@soulplusai.com
                        </p>
                        <p className="text-sm text-foreground/60 dark:text-gray-400">
                            {language === "ru" ? "Отвечаем в течение 24 часов" : "We reply within 24 hours"}
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-foreground/40">
                        © 2026 Soul+AI. {language === "ru" ? "Все права защищены." : "All rights reserved."}
                    </p>
                    <div className="flex gap-6">
                        <button
                            onClick={() => navigate("/privacy")}
                            className="text-[10px] text-foreground/30 hover:text-foreground/60 uppercase tracking-widest font-bold"
                        >
                            Cookies
                        </button>
                        <button
                            onClick={() => navigate("/terms")}
                            className="text-[10px] text-foreground/30 hover:text-foreground/60 uppercase tracking-widest font-bold"
                        >
                            Legal
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function ButtonIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-foreground/60 hover:bg-primary hover:text-white transition-all">
            {icon}
        </button>
    );
}
