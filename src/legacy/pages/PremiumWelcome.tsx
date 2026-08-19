import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, HeartHandshake, CalendarDays, DownloadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PremiumWelcome() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    en: {
      title: "✨ Welcome to Premium",
      subtitle: "You now have full access to your SoulPlus AI insights, year-by-year energy flow, compatibility tools, and a downloadable report.",
      expandedMatrix: {
        title: "Expanded Matrix",
        description: "All positions unlocked with full interpretations of each energy.",
        button: "Explore Matrix"
      },
      relationshipDecoder: {
        title: "Relationship Decoder",
        description: "Analyze love, mission, and challenges with any partner.",
        button: "Start Compatibility"
      },
      destinyTimeline: {
        title: "Destiny Timeline",
        description: "Year-by-year energy forecast with life events and transitions.",
        button: "View Timeline"
      },
      downloadReport: {
        title: "Download Report",
        description: "Personalized PDF with full guidance and charts.",
        button: "Download"
      }
    },
    ru: {
      title: "✨ Добро пожаловать в Premium",
      subtitle: "Теперь у вас есть полный доступ к SoulPlus AI, энергиям по годам, инструментам совместимости и скачиваемому отчёту.",
      expandedMatrix: {
        title: "Расширенная Матрица",
        description: "Все позиции разблокированы с полной расшифровкой каждой энергии.",
        button: "Изучить Матрицу"
      },
      relationshipDecoder: {
        title: "Анализ Отношений",
        description: "Анализ любви, миссии и вызовов с любым партнёром.",
        button: "Начать Совместимость"
      },
      destinyTimeline: {
        title: "Линия Судьбы",
        description: "Прогноз энергий по годам с жизненными событиями и переходами.",
        button: "Смотреть Линию"
      },
      downloadReport: {
        title: "Скачать Отчёт",
        description: "Персонализированный PDF с полным руководством и графиками.",
        button: "Скачать"
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-mystical-purple via-mystical-pink to-gold p-2 sm:p-8 overflow-x-hidden max-w-full pt-20">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] space-y-6 sm:space-y-8 overflow-hidden px-2">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center text-foreground break-words">
          {t.title}
        </h1>
        <p className="text-sm sm:text-lg text-muted-foreground text-center max-w-xl px-2 break-words">
          {t.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-5xl px-4">
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="text-lg sm:text-xl font-semibold">{t.expandedMatrix.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{t.expandedMatrix.description}</p>
              <Button variant="outline" onClick={() => navigate("/")} className="w-full sm:w-auto">
                {t.expandedMatrix.button}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <HeartHandshake className="w-6 h-6 text-secondary" />
              <h3 className="text-lg sm:text-xl font-semibold">{t.relationshipDecoder.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{t.relationshipDecoder.description}</p>
              <Button variant="outline" onClick={() => navigate("/compatibility")} className="w-full sm:w-auto">
                {t.relationshipDecoder.button}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <CalendarDays className="w-6 h-6 text-accent" />
              <h3 className="text-lg sm:text-xl font-semibold">{t.destinyTimeline.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{t.destinyTimeline.description}</p>
              <Button variant="outline" className="w-full sm:w-auto">
                {t.destinyTimeline.button}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <DownloadCloud className="w-6 h-6 text-gold" />
              <h3 className="text-lg sm:text-xl font-semibold">{t.downloadReport.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{t.downloadReport.description}</p>
              <Button variant="outline" className="w-full sm:w-auto">
                {t.downloadReport.button}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
