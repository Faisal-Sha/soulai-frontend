import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, ArrowLeft, FileDown, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/hooks/useUser';
import { fetchCompatibilityReport } from '@/lib/compatibilityReportService';
import type { CompatibilityReportContent, CompatibilityReportRow } from '@/types/compatibilityReport';
import { MatrixChatbot, type MatrixChatbotHandle } from '@/components/MatrixChatbot';
import type { MatrixValues } from '@/core/calc';
import { toast } from 'sonner';

function buildCompatibilityQuestion(
  text: string,
  opts: {
    personA: string;
    personB: string;
    sectionTitle?: string;
    type: 'explore' | 'topic' | 'starter';
    language: 'en' | 'ru';
  },
): string {
  const { personA, personB, sectionTitle, type, language } = opts;
  const isRu = language === 'ru';

  if (type === 'starter') return text;

  if (type === 'topic') {
    return isRu
      ? `Расскажи о «${text}» в отношениях ${personA} и ${personB}.`
      : `Tell me about "${text}" in the relationship between ${personA} and ${personB}.`;
  }

  const lower = text.toLowerCase();
  const isRhetorical =
    lower.startsWith('would you like') ||
    lower.startsWith('want to know') ||
    lower.startsWith('discover more');

  if (text.trim().endsWith('?') && !isRhetorical) return text;

  const subject = sectionTitle?.toLowerCase() || text.toLowerCase();
  return isRu
    ? `Расскажи подробнее о «${subject}» в паре ${personA} и ${personB}.`
    : `Tell me more about ${subject} between ${personA} and ${personB}.`;
}

export default function CompatibilityReportPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const fromAvatar = (location.state as { from?: string } | null)?.from === 'avatar';
  const { language } = useLanguage();
  const { user } = useUser();
  const printRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<MatrixChatbotHandle>(null);

  const [report, setReport] = useState<CompatibilityReportRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const t = language === 'ru'
    ? {
        loading: 'Создаём ваш отчёт о совместимости…',
        failed: 'Не удалось создать отчёт. Попробуйте снова.',
        back: 'Назад к совместимости',
        backDashboard: 'Назад в кабинет',
        explore: 'Спросить AI',
        askAi: 'Продолжить с AI',
        pdf: 'Сохранить как PDF',
        signInPdf: 'Войдите, чтобы экспортировать PDF',
        karmic: 'Кармическая связь',
        strengths: 'Сильные стороны',
        friction: 'Зоны роста',
        timing: 'Тайминг энергий',
        starter: 'Начните диалог с AI',
        tapToAsk: 'Нажмите на тему — AI ответит сразу',
      }
    : {
        loading: 'Generating your compatibility report…',
        failed: 'Report generation failed. Please try again.',
        back: 'Back to compatibility',
        backDashboard: 'Back to dashboard',
        explore: 'Ask AI',
        askAi: 'Continue with AI',
        pdf: 'Export as PDF',
        signInPdf: 'Sign in to export PDF',
        karmic: 'Karmic connection',
        strengths: 'Strengths',
        friction: 'Growth edges',
        timing: 'Energy timing',
        starter: 'Start a conversation with AI',
        tapToAsk: 'Tap any topic — AI answers instantly',
      };

  useEffect(() => {
    if (!id) {
      navigate('/compatibility');
      return;
    }

    let cancelled = false;
    let attempts = 0;

    const load = async () => {
      try {
        const row = await fetchCompatibilityReport(id);
        if (cancelled) return;

        if (!row) {
          toast.error('Report not found');
          navigate('/compatibility');
          return;
        }

        setReport(row);

        if (row.status === 'processing' && attempts < 30) {
          attempts++;
          setTimeout(load, 2000);
          return;
        }

        if (row.status === 'failed') {
          toast.error(t.failed);
        }

        setLoading(false);
      } catch (e) {
        console.error(e);
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [id, navigate, t.failed]);

  const content = report?.content as CompatibilityReportContent | null;
  const combinedMatrix = report?.matrix_data?.combinedMatrix as MatrixValues | undefined;
  const compatibilityMetrics = report?.matrix_data?.compatibility;
  const personAName = report?.person_a_name || 'Person A';
  const personBName = report?.person_b_name || 'Person B';
  const personADob = report?.person_a_dob || '';
  const personBDob = report?.person_b_dob || '';

  const askCompatibility = (question: string, sectionId?: string) => {
    if (sectionId) setActiveSection(sectionId);
    chatRef.current?.askQuestion(question);
  };

  const handlePrintPdf = () => {
    if (!user) {
      toast.info(t.signInPdf);
      navigate('/auth');
      return;
    }
    window.print();
  };

  if (loading || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (report.status === 'failed' || !content) {
    return (
      <div className="min-h-screen bg-background pt-24 px-4 text-center">
        <p className="text-muted-foreground mb-4">{t.failed}</p>
        <Button variant="outline" onClick={() => navigate('/compatibility')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.back}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 print:pt-0">
      <div ref={printRef} className="container mx-auto px-4 py-8 max-w-3xl print:max-w-none">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate(fromAvatar ? '/avatar?tab=compatibility' : '/compatibility')
            }
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {fromAvatar ? t.backDashboard : t.back}
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrintPdf}>
            <FileDown className="w-4 h-4 mr-2" />
            {user ? t.pdf : t.signInPdf}
          </Button>
        </div>

        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            Compatibility Deep-Dive
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            {content.title}
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
            {content.summary}
          </p>
        </header>

        <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t.karmic}</p>
              <p className="font-semibold text-lg">{content.karmicLabel}</p>
            </div>
            <div className="text-4xl font-bold text-primary">{content.karmicScore}</div>
          </div>
        </Card>

        <div className="space-y-4 mb-8">
          {content.sections.map((section) => (
            <Card
              key={section.id}
              className={`p-5 transition-shadow ${activeSection === section.id ? 'ring-2 ring-primary/30' : ''}`}
            >
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                {section.title}
              </h2>
              <p className="text-sm text-foreground leading-relaxed mb-3">
                {section.highlight}
              </p>
              {section.explorePrompt && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mb-3 h-auto py-2 px-3 text-left whitespace-normal print:hidden"
                  onClick={() =>
                    askCompatibility(
                      buildCompatibilityQuestion(section.explorePrompt, {
                        personA: personAName,
                        personB: personBName,
                        sectionTitle: section.title,
                        type: 'explore',
                        language,
                      }),
                      section.id,
                    )
                  }
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-2 shrink-0 text-primary" />
                  <span className="text-xs">{section.explorePrompt}</span>
                </Button>
              )}
              <div className="flex flex-wrap gap-2 print:hidden">
                {section.deepTopics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() =>
                      askCompatibility(
                        buildCompatibilityQuestion(topic, {
                          personA: personAName,
                          personB: personBName,
                          type: 'topic',
                          language,
                        }),
                        section.id,
                      )
                    }
                    className="text-xs bg-primary/10 hover:bg-primary/20 border border-primary/20 px-2.5 py-1 rounded-full text-primary transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-5 mb-8">
          <h3 className="font-semibold mb-2">{t.strengths}</h3>
          <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
            {content.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 mb-8">
          <h3 className="font-semibold mb-2">{t.friction}</h3>
          <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
            {content.frictionPoints.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="text-sm mt-4 text-foreground/80">{content.timingInsight}</p>
        </Card>

        <Card className="p-5 mb-24 print:hidden bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">{t.starter}</h3>
          </div>
          <ul className="space-y-2">
            {content.aiStarterQuestions.map((q) => (
              <li key={q}>
                <button
                  type="button"
                  onClick={() =>
                    askCompatibility(
                      buildCompatibilityQuestion(q, {
                        personA: personAName,
                        personB: personBName,
                        type: 'starter',
                        language,
                      }),
                    )
                  }
                  className="w-full text-left text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg px-2 py-2 transition-colors flex items-start gap-2"
                >
                  <MessageCircle className="w-4 h-4 mt-0.5 shrink-0 text-primary/70" />
                  <span>{q}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-4">{t.tapToAsk}</p>
        </Card>
      </div>

      {combinedMatrix && (
        <MatrixChatbot
          ref={chatRef}
          matrix={combinedMatrix}
          name={`${personAName} & ${personBName}`}
          birthDate={personADob}
          suggestedQuestions={content.aiStarterQuestions}
          chatContext={{
            mode: 'compatibility',
            compatibility: compatibilityMetrics ?? {},
            personAName,
            personBName,
            personADob,
            personBDob,
          }}
        />
      )}
    </div>
  );
}
