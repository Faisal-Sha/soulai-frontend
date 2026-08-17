import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Brain, BookOpen, Compass, Instagram, Linkedin, Youtube, Send, Infinity } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
    const { language } = useLanguage();

    const t = {
        title: "SoulPlus AI",
        subtitle: language === "ru"
            ? "Где древняя мудрость встречается с искусственным интеллектом."
            : "Where ancient wisdom meets artificial intelligence.",
        creatorTitle: language === "ru" ? "Кто создал SoulPlus AI" : "Who Created SoulPlus AI",
        creatorName: "Maria Lit",
        creatorRole: language === "ru" ? "Лайф-коуч, Автор, Исследователь" : "Life Coach, Author, Researcher",
        story1: language === "ru"
            ? "Более десяти лет Мария работала с тысячами людей в разных странах, помогая им справляться с жизненными переменами, сменой карьеры, отношениями и личными кризисами. Одна закономерность стала очевидной:"
            : "For over a decade, Maria worked with thousands of people across different countries, helping them navigate life transitions, career shifts, relationships, and personal crises. One pattern became clear:",
        quote1: language === "ru" ? "Люди не потеряны." : "People are not lost.",
        quote2: language === "ru" ? "Они оторваны от своей собственной структуры." : "They are disconnected from their own structure.",
        quote3: language === "ru" ? "За каждой историей жизни стоит паттерн." : "Behind every life story, there is a pattern.",
        quote4: language === "ru" ? "За каждым решением стоит энергия." : "Behind every decision, there is energy.",
        quote5: language === "ru" ? "За каждым талантом стоит система." : "Behind every talent, there is a system.",
        story2: language === "ru"
            ? "Мария годы изучала систему Матрицы Судьбы, нумерологию, архетипы, поведенческую психологию и современные технологии ИИ. В какой-то момент возник вопрос:"
            : "Maria spent years studying the Destiny Matrix system, numerology, archetypes, behavioral psychology, and modern AI technologies. At some point, a question emerged:",
        mainQuestion: language === "ru"
            ? "«Что, если древние символические системы можно структурировать, анализировать и масштабировать с помощью искусственного интеллекта?»"
            : "\"What if ancient symbolic systems could be structured, analyzed, and scaled through Artificial Intelligence?\"",
        finalNote: language === "ru"
            ? "Этот вопрос превратился в SoulPlus AI."
            : "That question became SoulPlus AI.",
        philosophyTitle: language === "ru" ? "Философия SoulPlus AI" : "Philosophy Behind SoulPlus AI",
        philosophyIntro: language === "ru" ? "SoulPlus AI построен на одном базовом убеждении:" : "SoulPlus AI is built on one core belief:",
        philosophyMain: language === "ru" ? "Технологии не должны заменять человеческую интуицию." : "Technology should not replace human intuition.",
        philosophyEnhance: language === "ru" ? "Они должны ее дополнять." : "It should enhance it.",
        card1: language === "ru" ? "Матрица Судьбы дает символическую структуру." : "The Destiny Matrix gives symbolic structure.",
        card2: language === "ru" ? "ИИ дает аналитическую глубину." : "AI gives analytical depth.",
        navSystem: language === "ru"
            ? "«Вместе они создают навигационную систему для реализации человеческого потенциала»."
            : "\"Together, they create a navigational system for human potential.\"",
        pairs: [
            { not: language === "ru" ? "предсказаниях" : "Predictions", but: language === "ru" ? "осознанности" : "Awareness" },
            { not: language === "ru" ? "мистике" : "Mysticism", but: language === "ru" ? "паттернах" : "Patterns" },
            { not: language === "ru" ? "судьбе" : "Fate", but: language === "ru" ? "сознательном выборе" : "Conscious Choice" }
        ],
        pairTextNot: language === "ru" ? "Это не про " : "This is not about ",
        pairTextBut: language === "ru" ? "Это про " : "It is about ",
        pairTextButOnly: language === "ru" ? "Но про " : "But about ",
        mattersTitle: language === "ru" ? "Почему это важно" : "Why It Matters",
        mattersIntro: language === "ru" ? "В мире, управляемом алгоритмами, мы помогаем людям:" : "In a world driven by algorithms, we help people:",
        mattersItems: language === "ru" ? [
            "Понять свои сильные стороны",
            "Распознать повторяющиеся жизненные сценарии",
            "Выбрать подходящую карьеру",
            "Строить осознанные партнерства",
            "Раскрыть свои врожденные таланты"
        ] : [
            "Understand their strengths",
            "Recognize repeating life patterns",
            "Choose aligned careers",
            "Build conscious partnerships",
            "Unlock their innate talents"
        ],
        newEra: language === "ru" ? "Начало новой эры" : "The Beginning of a New Era",
        workTitle: language === "ru" ? "Работа с Марией" : "Work With Maria",
        workIntro: language === "ru" ? "Если вы хотите получить личную консультацию или стратегическую сессию:" : "If you would like a private consultation or strategic session:",
        bookButton: language === "ru" ? "Забронировать личную сессию" : "Book a personal session",
        connectTitle: language === "ru" ? "Связаться" : "Connect",
        connectIntro: language === "ru" ? "Подписывайтесь для получения инсайтов, обновлений и более глубоких исследований:" : "Follow for insights, updates, and deeper explorations:",
        founderLabel: language === "ru" ? "Основатель" : "Founder"
    };

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden max-w-full">
            {/* Intro / Founder Section (New Hero) */}
            <section className="pt-24 pb-12 md:pb-20 bg-background overflow-hidden max-w-full">
                <div className="container mx-auto px-4 max-w-6xl overflow-hidden">

                    {/* Intro Header */}
                    <div className="text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
                        {/* Amazing Icon/Visual */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                                <Infinity className="w-16 h-16 md:w-20 md:h-20 text-primary relative z-10 animate-pulse" strokeWidth={1} />
                            </div>
                        </div>

                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 sm:mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent animate-gradient-x">
                                {t.title}
                            </span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed px-2">
                            {t.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 order-2 lg:order-1 space-y-8 animate-in slide-in-from-left-8 duration-700 delay-200">
                            <div className="relative pl-6 border-l-4 border-primary/50">
                                <h2 className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-3">
                                    {t.creatorTitle}
                                </h2>
                                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground mb-1.5 sm:mb-2">
                                    {t.creatorName}
                                </h3>
                                <p className="text-base sm:text-lg text-muted-foreground">{t.creatorRole}</p>
                            </div>
                            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                                <p>{t.story1}</p>
                                <div className="p-4 sm:p-6 bg-card/50 border border-border/50 rounded-2xl backdrop-blur-sm space-y-3 italic text-foreground/90 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
                                    <p>{t.quote1}</p>
                                    <p>{t.quote2}</p>
                                    <p>{t.quote3}</p>
                                    <p>{t.quote4}</p>
                                    <p>{t.quote5}</p>
                                </div>
                                <p>{t.story2}</p>
                                <p className="font-medium text-foreground text-lg sm:text-xl">
                                    {t.mainQuestion}
                                </p>
                                <p>
                                    <span className="font-bold text-primary">{t.finalNote}</span>.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-5 order-1 lg:order-2 relative group animate-in slide-in-from-right-8 duration-700 delay-300">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-3xl rounded-[3rem] group-hover:blur-3xl transition-all duration-500" />
                            <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-card">
                                <img
                                    src="/Founder.webp"
                                    alt="Maria Lit"
                                    className="w-full h-full object-cover object-[50%_35%] transform transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="font-serif text-2xl">Maria Lit</p>
                                    <p className="text-white/70 text-sm">{t.founderLabel}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-20 bg-muted/30 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
                    <h2 className="text-xl sm:text-2xl font-bold mb-8 md:mb-12 text-foreground tracking-tight">
                        {t.philosophyTitle}
                    </h2>

                    <div className="space-y-8 md:space-y-12 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12 sm:mb-16">
                        <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
                            <p className="text-muted-foreground">{t.philosophyIntro}</p>
                            <p className="text-foreground font-medium">
                                {t.philosophyMain}
                            </p>
                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-bold text-xl sm:text-2xl py-2">
                                {t.philosophyEnhance}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 items-stretch max-w-3xl mx-auto py-8 overflow-hidden">
                            <Card className="p-4 sm:p-8 bg-background border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl flex flex-col items-center justify-center gap-4 group overflow-hidden">
                                <div className="p-4 rounded-2xl bg-primary/5 text-primary group-hover:scale-110 transition-transform">
                                    <Compass className="w-8 h-8" />
                                </div>
                                <p className="font-medium text-lg">{t.card1}</p>
                            </Card>
                            <Card className="p-4 sm:p-8 bg-background border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl flex flex-col items-center justify-center gap-4 group overflow-hidden">
                                <div className="p-4 rounded-2xl bg-purple-500/5 text-purple-500 group-hover:scale-110 transition-transform">
                                    <Brain className="w-8 h-8" />
                                </div>
                                <p className="font-medium text-lg">{t.card2}</p>
                            </Card>
                        </div>

                        <p className="text-lg md:text-xl lg:text-2xl font-serif italic text-foreground/80 max-w-3xl mx-auto">
                            {t.navSystem}
                        </p>
                    </div>

                    {/* Comparisons - No Arrows, adjusted layout */}
                    <div className="grid gap-6 max-w-4xl mx-auto">
                        {t.pairs.map((pair, idx) => (
                            <div key={idx} className="group flex flex-col md:flex-row items-center justify-between p-6 bg-background rounded-2xl border border-border/40 hover:border-primary/20 hover:shadow-lg transition-all duration-300 gap-4 md:gap-8">
                                <span className="text-muted-foreground line-through decoration-red-500/30 text-base md:text-lg decoration-2 font-light order-1">
                                    {t.pairTextNot}{pair.not}
                                </span>

                                {/* Vertical separator for desktop */}
                                <div className="hidden md:block w-px h-12 bg-border/50 order-2"></div>
                                {/* Horizontal separator for mobile */}
                                <div className="md:hidden w-12 h-px bg-border/50 order-2"></div>

                                <span className="font-semibold text-foreground text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 order-3">
                                    {pair.but === "Patterns" || pair.but === "Conscious Choice" || pair.but === "паттернах" || pair.but === "сознательном выборе" ? `${t.pairTextButOnly}${pair.but}` : `${t.pairTextBut}${pair.but}`}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why It Matters (No icons, sleek design) */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-tight">{t.mattersTitle}</h2>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                            {t.mattersIntro}
                        </p>
                    </div>

                    <div className="space-y-4 max-w-3xl mx-auto">
                        {t.mattersItems.map((item, i) => (
                            <div key={i} className="group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                                <div className="relative p-6 border-b border-border/50 flex items-baseline gap-4 hover:pl-10 transition-all duration-300 cursor-default">
                                    <span className="text-[10px] sm:text-xs font-bold text-primary/40 group-hover:text-primary transition-colors">0{i + 1}</span>
                                    <span className="text-xl sm:text-2xl font-light text-foreground group-hover:font-normal transition-all">{item}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs animate-pulse opacity-70">
                            {t.newEra}
                        </p>
                    </div>
                </div>
            </section>

            {/* Work & Connect Section */}
            <section className="py-20 bg-card/30 border-t border-border/50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-start overflow-hidden">
                        {/* Work With Maria */}
                        <div className="space-y-8 p-6 sm:p-10 rounded-[2rem] bg-gradient-to-br from-background to-background/50 border border-border/50 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />

                            <h3 className="text-xl sm:text-2xl font-semibold">{t.workTitle}</h3>
                            <p className="text-muted-foreground text-base sm:text-lg">
                                {t.workIntro}
                            </p>
                            <a
                                href="https://calendly.com/marialit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all font-semibold w-full justify-center md:w-auto hover:shadow-lg hover:translate-y-[-2px]"
                            >
                                <BookOpen className="w-5 h-5" />
                                {t.bookButton}
                            </a>
                        </div>

                        {/* Connect With Maria */}
                        <div className="space-y-8">
                            <div className="pl-4 border-l-2 border-primary">
                                <h3 className="text-2xl font-semibold mb-2">{t.connectTitle}</h3>
                                <p className="text-muted-foreground">
                                    {t.connectIntro}
                                </p>
                            </div>

                            {/* Responsive Grid: Icons only on mobile, Icon+Text on Tablet+ */}
                            <div className="flex flex-wrap justify-between md:grid md:grid-cols-2 gap-4">
                                {[
                                    { name: "Instagram", icon: <Instagram className="w-6 h-6" />, color: "hover:text-[#E4405F] hover:border-[#E4405F]/50 hover:bg-[#E4405F]/5" },
                                    { name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, color: "hover:text-[#0077B5] hover:border-[#0077B5]/50 hover:bg-[#0077B5]/5" },
                                    { name: "YouTube", icon: <Youtube className="w-6 h-6" />, color: "hover:text-[#FF0000] hover:border-[#FF0000]/50 hover:bg-[#FF0000]/5" },
                                    { name: "Telegram", icon: <Send className="w-6 h-6" />, color: "hover:text-[#0088cc] hover:border-[#0088cc]/50 hover:bg-[#0088cc]/5" }
                                ].map((platform) => (
                                    <button
                                        key={platform.name}
                                        className={`flex items-center justify-center md:justify-start gap-3 p-4 md:px-6 rounded-2xl bg-background border border-border/40 transition-all duration-300 group text-left ${platform.color} hover:shadow-md flex-1 md:flex-none aspect-square md:aspect-auto`}
                                        onClick={() => console.log(`Navigate to ${platform.name}`)}
                                        title={platform.name}
                                    >
                                        <div className="p-0 md:p-1 rounded-full bg-transparent transition-colors">
                                            {platform.icon}
                                        </div>
                                        <span className="hidden md:inline font-medium group-hover:translate-x-1 transition-transform">{platform.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
