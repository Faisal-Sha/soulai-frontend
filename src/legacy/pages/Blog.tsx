import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Blog() {
    const { language } = useLanguage();

    const labels = {
        en: { title: "Blog & Insights", subtitle: "Deep dives into numerology and destiny matrices.", readMore: "Read More" },
        ru: { title: "Блог и Инсайты", subtitle: "Глубокое погружение в нумерологию и матрицы судьбы.", readMore: "Читать далее" }
    };
    const t = (labels as any)[language] || labels.en;

    const posts = [
        {
            title: language === 'ru' ? "Понимание 22 энергий" : "Understanding the 22 Energies",
            description: language === 'ru' ? "Как старшие арканы влияют на вашу повседневную жизнь." : "How the major arcana influence your daily life and decisions.",
            date: "2024-01-15",
            author: "Soul+AI Team"
        },
        {
            title: language === 'ru' ? "Магия совместимости" : "The Magic of Compatibility",
            description: language === 'ru' ? "Почему некоторые отношения чувствуются кармическими." : "Why some relationships feel karmic and how to navigate them.",
            date: "2024-01-10",
            author: "Soul+AI Team"
        },
        {
            title: language === 'ru' ? "Планирование года по матрице" : "Yearly Planning with Matrix",
            description: language === 'ru' ? "Использование персональных циклов для успеха." : "Using your personal year cycles to set goals and achieve success.",
            date: "2024-01-05",
            author: "Soul+AI Team"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl overflow-hidden">
            <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t.title}</h1>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg">{t.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
                {posts.map((post, i) => (
                    <Card key={i} className="flex flex-col h-full shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="aspect-video bg-muted relative overflow-hidden rounded-t-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary/40 font-bold">
                                SOUL+AI
                            </div>
                        </div>
                        <CardHeader>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                            </div>
                            <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.description}</p>
                            <Button variant="link" className="px-0 gap-2">
                                {t.readMore}
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
