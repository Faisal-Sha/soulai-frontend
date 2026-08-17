import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, Clock, Download, FileWarning, LogIn } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/LoadingSpinner";
import {
  downloadReadingPdf,
  type DownloadPdfErrorCode,
} from "@/lib/downloadReadingPdf";
import { supabase } from "@/integrations/supabase/client";

type PageState = "loading" | "downloading" | "success" | "error";

const copy = {
  en: {
    loading: "Preparing your download…",
    downloading: "Starting download…",
    expiredTitle: "This download link has expired",
    expiredBody:
      "For your security, email download links only work for a short time. Sign in to Soul+AI to get a fresh copy of your PDF anytime.",
    notReadyTitle: "Your PDF is almost ready",
    notReadyBody:
      "We are still generating your report. Please wait a moment and try again.",
    notFoundTitle: "Report not found",
    notFoundBody:
      "We could not find a reading linked to your account. Open your reading page or contact support if this seems wrong.",
    forbiddenTitle: "Access denied",
    forbiddenBody: "This report belongs to another account. Please sign in with the email you used at checkout.",
    fetchFailedTitle: "Download could not start",
    fetchFailedBody: "Please try again. You can also open your reading online and use Download there.",
    genericTitle: "Something went wrong",
    genericBody: "Please try again in a moment.",
    signIn: "Sign in to download",
    openReading: "Open my reading",
    tryAgain: "Try again",
    loginRequired: "Sign in to download your PDF report.",
    successTitle: "Download started",
    successBody: "Your PDF should appear in your downloads folder. You can also read it online anytime.",
  },
  ru: {
    loading: "Подготовка загрузки…",
    downloading: "Запуск загрузки…",
    expiredTitle: "Срок действия ссылки истёк",
    expiredBody:
      "В целях безопасности ссылки из письма действуют ограниченное время. Войдите в Soul+AI, чтобы в любой момент скачать свежую копию PDF.",
    notReadyTitle: "PDF почти готов",
    notReadyBody:
      "Мы ещё формируем ваш отчёт. Подождите немного и попробуйте снова.",
    notFoundTitle: "Отчёт не найден",
    notFoundBody:
      "Не удалось найти чтение для вашего аккаунта. Откройте страницу чтения или обратитесь в поддержку.",
    forbiddenTitle: "Доступ запрещён",
    forbiddenBody:
      "Этот отчёт принадлежит другому аккаунту. Войдите с email, который использовали при оплате.",
    fetchFailedTitle: "Не удалось начать загрузку",
    fetchFailedBody:
      "Попробуйте снова. Также можно открыть чтение онлайн и нажать «Скачать» там.",
    genericTitle: "Что-то пошло не так",
    genericBody: "Попробуйте ещё раз через минуту.",
    signIn: "Войти для скачивания",
    openReading: "Открыть чтение",
    tryAgain: "Повторить",
    loginRequired: "Войдите, чтобы скачать PDF-отчёт.",
    successTitle: "Загрузка началась",
    successBody: "PDF должен появиться в папке «Загрузки». Вы также можете читать отчёт онлайн в любое время.",
  },
} as const;

function messageForCode(
  code: DownloadPdfErrorCode,
  lang: keyof typeof copy,
  reason: string | null,
): { title: string; body: string } {
  const t = copy[lang];
  if (reason === "expired" || code === "unauthorized") {
    return { title: t.expiredTitle, body: reason === "expired" ? t.expiredBody : t.loginRequired };
  }
  switch (code) {
    case "pdf_not_ready":
      return { title: t.notReadyTitle, body: t.notReadyBody };
    case "reading_not_found":
      return { title: t.notFoundTitle, body: t.notFoundBody };
    case "forbidden":
      return { title: t.forbiddenTitle, body: t.forbiddenBody };
    default:
      return { title: t.genericTitle, body: t.genericBody };
  }
}

export default function DownloadReportPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: userLoading } = useUser();
  const { language } = useLanguage();
  const lang = language === "ru" ? "ru" : "en";
  const t = copy[lang];

  const [pageState, setPageState] = useState<PageState>("loading");
  const [errorCode, setErrorCode] = useState<DownloadPdfErrorCode>("unknown");
  const startedRef = useRef(false);

  const reason = searchParams.get("reason");
  const readingIdParam = searchParams.get("readingId");

  const runDownload = useCallback(async () => {
    setPageState("downloading");
    setErrorCode("unknown");

    let result = await downloadReadingPdf(
      readingIdParam ? { readingId: readingIdParam } : undefined,
    );

    if (result.ok === false && result.code === "pdf_not_ready" && user) {
      let rid = readingIdParam;
      if (!rid) {
        const { data: readingRow } = await (supabase.from("readings") as any)
          .select("id")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        rid = readingRow?.id;
      }
      if (rid) {
        await supabase.functions.invoke("generate-pdf", {
          body: { userId: user.id, readingId: rid, forceRebuild: true },
        });
        result = await downloadReadingPdf({ readingId: rid });
      }
    }

    if (result.ok === false) {
      if (result.code === "unauthorized") {
        navigate(`/auth?redirect=${encodeURIComponent("/download-report")}`, { replace: true });
        return;
      }
      setErrorCode(result.code);
      setPageState("error");
      return;
    }

    setPageState("success");
  }, [navigate, readingIdParam, user]);

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      if (reason === "expired") {
        setErrorCode("unauthorized");
        setPageState("error");
        return;
      }
      navigate(
        `/auth?redirect=${encodeURIComponent(
          `/download-report${readingIdParam ? `?readingId=${readingIdParam}` : ""}`,
        )}`,
        { replace: true },
      );
      return;
    }

    if (startedRef.current) return;
    startedRef.current = true;
    void runDownload();
  }, [user, userLoading, navigate, runDownload, reason, readingIdParam]);

  if (userLoading || pageState === "loading" || pageState === "downloading") {
    const text = pageState === "downloading" ? t.downloading : t.loading;
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <PageLoader text={text} />
      </div>
    );
  }

  if (pageState === "success") {
    return (
      <div className="min-h-screen bg-[#0F0F0F] relative overflow-hidden flex flex-col items-center justify-center text-white px-4">
        <div className="relative z-10 w-full max-w-md text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
            <Download className="w-9 h-9 text-gold" />
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gold">{t.successTitle}</h1>
            <p className="text-white/65 leading-relaxed text-sm sm:text-base">{t.successBody}</p>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-gold/80"
            onClick={() => navigate("/reading")}
          >
            {t.openReading}
          </Button>
        </div>
      </div>
    );
  }

  const { title, body } = messageForCode(errorCode, lang, reason);
  const showExpiredHint = reason === "expired" || errorCode === "unauthorized";

  return (
    <div className="min-h-screen bg-[#0F0F0F] relative overflow-hidden flex flex-col items-center justify-center text-white px-4">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      <div className="relative z-10 w-full max-w-md text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
          {showExpiredHint ? (
            <Clock className="w-9 h-9 text-gold" />
          ) : errorCode === "pdf_not_ready" ? (
            <FileWarning className="w-9 h-9 text-gold" />
          ) : (
            <AlertCircle className="w-9 h-9 text-gold" />
          )}
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gold">{title}</h1>
          <p className="text-white/65 leading-relaxed text-sm sm:text-base">{body}</p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          {!user ? (
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-gold/80"
              onClick={() =>
                navigate(`/auth?redirect=${encodeURIComponent("/download-report")}`)
              }
            >
              <LogIn className="w-4 h-4 mr-2" />
              {t.signIn}
            </Button>
          ) : (
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-gold/80"
              onClick={() => {
                startedRef.current = false;
                void runDownload();
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              {t.tryAgain}
            </Button>
          )}

          <Button
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
            onClick={() => navigate(user ? "/reading" : "/auth?redirect=/reading")}
          >
            {t.openReading}
          </Button>
        </div>
      </div>
    </div>
  );
}
