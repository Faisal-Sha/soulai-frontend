import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { calcCompatibility, calcCompatibilityMatrix, parseDOB, CompatibilityMatrix, MatrixValues } from "@/core/calc";
import { validateDOB, validateDateInput } from "@/lib/dateValidation";
import { LadiniMatrixDiagram } from "@/components/LadiniMatrixDiagram";
import { Heart, Users, ArrowLeft, Calculator, Sparkles, Languages, Save, RotateCcw, User, Calendar, FileText, Loader2, Lock } from "lucide-react";
import { checkDeepDiveAccess, generateCompatibilityReport } from "@/lib/compatibilityReportService";
import { upsellPurchaseStandalone } from "@/lib/upsellB";
import { CompatibilityReportsPanel } from "@/components/CompatibilityReportsPanel";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { format, parse, isValid } from "date-fns";
import { cn } from "@/lib/utils";

function toIsoDate(ddMmYyyy: string): string {
  const [day, month, year] = ddMmYyyy.split('/');
  return `${year}-${month}-${day}`;
}

type CompatibilityCalculatorProps = {
  /** Rendered inside Avatar dashboard tab — tighter layout, reports list is above. */
  embedded?: boolean;
  onReportGenerated?: () => void;
  /** After saving matrix to saved_matrices (Avatar list refresh). */
  onMatrixSaved?: () => void;
};

export default function CompatibilityCalculator({
  embedded = false,
  onReportGenerated,
  onMatrixSaved,
}: CompatibilityCalculatorProps = {}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const deepDivePrompt = searchParams.get('deepDive') === '1';
  const { language, setLanguage, t } = useLanguage();
  const { theme } = useTheme();
  const { user } = useUser();
  const [dateInputA, setDateInputA] = useState("");
  const [dateInputB, setDateInputB] = useState("");
  const [selectedDateA, setSelectedDateA] = useState<Date | undefined>(undefined);
  const [selectedDateB, setSelectedDateB] = useState<Date | undefined>(undefined);
  const [dateErrorA, setDateErrorA] = useState<string | null>(null);
  const [dateErrorB, setDateErrorB] = useState<string | null>(null);
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [genderA, setGenderA] = useState<"male" | "female">("male");
  const [genderB, setGenderB] = useState<"male" | "female">("female");
  const [result, setResult] = useState<CompatibilityMatrix | null>(null);
  const [combinedMatrix, setCombinedMatrix] = useState<MatrixValues | null>(null);

  // Save functionality state
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [matrixTitle, setMatrixTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [hasDeepDive, setHasDeepDive] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isPurchasingDeepDive, setIsPurchasingDeepDive] = useState(false);
  const [reportsRefreshKey, setReportsRefreshKey] = useState(0);

  const ADDON_PRICE = 9.99;

  const reportCopy = language === 'ru'
    ? {
        generate: 'Создать отчёт Deep-Dive',
        generating: 'Создаём отчёт…',
        unlocked: 'Совместимость Deep-Dive доступна — создайте интерактивный отчёт с AI.',
        signIn: 'Войдите, чтобы купить или создать отчёт.',
        noAccess: 'Разблокируйте интерактивный AI-отчёт Deep-Dive одним платежом.',
        unlock: `Разблокировать Deep-Dive — $${ADDON_PRICE}`,
        unlocking: 'Обработка оплаты…',
        unlockSuccess: 'Deep-Dive разблокирован! Теперь можно создать отчёт.',
        viewRates: 'Смотреть тарифы',
        welcome: 'Введите даты и нажмите «Рассчитать», затем создайте отчёт.',
      }
    : {
        generate: 'Generate Deep-Dive Report',
        generating: 'Generating report…',
        unlocked: 'Compatibility Deep-Dive is unlocked — build your interactive AI report.',
        signIn: 'Sign in to purchase or generate your report.',
        noAccess: 'Unlock the interactive AI Deep-Dive report with a one-time purchase.',
        unlock: `Unlock Deep-Dive — $${ADDON_PRICE}`,
        unlocking: 'Processing payment…',
        unlockSuccess: 'Deep-Dive unlocked! You can generate your report now.',
        viewRates: 'View subscription plans',
        welcome: 'Enter birth dates and calculate, then generate your report.',
      };

  const refreshAccess = useCallback(async () => {
    if (!user) {
      setHasDeepDive(false);
      return;
    }
    setCheckingAccess(true);
    try {
      const { hasAccess } = await checkDeepDiveAccess();
      setHasDeepDive(hasAccess);
    } catch (e) {
      console.error(e);
    } finally {
      setCheckingAccess(false);
    }
  }, [user]);

  useEffect(() => {
    refreshAccess();
  }, [refreshAccess]);

  useEffect(() => {
    if (deepDivePrompt && user && hasDeepDive) {
      toast.success(reportCopy.unlocked);
    }
  }, [deepDivePrompt, user, hasDeepDive, reportCopy.unlocked]);

  // Sync selected dates when date strings change manually
  useEffect(() => {
    if (dateInputA.length === 10) {
      const parsed = parse(dateInputA, "dd/MM/yyyy", new Date());
      if (isValid(parsed)) setSelectedDateA(parsed);
    }
  }, [dateInputA]);

  useEffect(() => {
    if (dateInputB.length === 10) {
      const parsed = parse(dateInputB, "dd/MM/yyyy", new Date());
      if (isValid(parsed)) setSelectedDateB(parsed);
    }
  }, [dateInputB]);

  const handleDateChange = (value: string, setter: (value: string) => void, currentValue: string, errorSetter: (error: string | null) => void, dateSetter: (d: Date | undefined) => void) => {
    // Allow backspace/deletion by checking if length decreased
    if (value.length < currentValue.length) {
      setter(value);
      errorSetter(null);
      if (value.length < 10) dateSetter(undefined);
      return;
    }

    const numericValue = value.replace(/\D/g, "");

    let formattedValue = "";
    if (numericValue.length <= 2) {
      formattedValue = numericValue;
    } else if (numericValue.length <= 4) {
      formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
    } else {
      formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}/${numericValue.slice(4, 8)}`;
    }

    setter(formattedValue);

    // Validate date input in real-time
    const validation = validateDateInput(formattedValue);
    errorSetter(validation.error || null);
  };

  const handleCalendarSelectA = (d: Date | undefined) => {
    if (d) {
      setSelectedDateA(d);
      const formatted = format(d, "dd/MM/yyyy");
      setDateInputA(formatted);
      setDateErrorA(null);
    }
  };

  const handleCalendarSelectB = (d: Date | undefined) => {
    if (d) {
      setSelectedDateB(d);
      const formatted = format(d, "dd/MM/yyyy");
      setDateInputB(formatted);
      setDateErrorB(null);
    }
  };

  const handleCalculate = () => {
    // Validate both dates first
    const validationA = validateDOB(dateInputA);
    const validationB = validateDOB(dateInputB);

    if (!validationA.isValid) {
      setDateErrorA(validationA.error || "Invalid date");
      toast.error(`Person A: ${validationA.error || t('invalidDateFormat')}`);
      return;
    }

    if (!validationB.isValid) {
      setDateErrorB(validationB.error || "Invalid date");
      toast.error(`Person B: ${validationB.error || t('invalidDateFormat')}`);
      return;
    }

    try {
      const dobA = parseDOB(dateInputA);
      const dobB = parseDOB(dateInputB);
      const compatibility = calcCompatibility(dobA, dobB);
      const combined = calcCompatibilityMatrix(dobA, dobB);
      setResult(compatibility);
      setCombinedMatrix(combined);
      setDateErrorA(null);
      setDateErrorB(null);
      toast.success(t('compatibilityCalculated'));

      // Scroll to results after a brief delay
      setTimeout(() => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }, 100);
    } catch (error: any) {
      const errorMessage = error.message || t('invalidDateFormat');
      toast.error(errorMessage);
    }
  };

  const handlePurchaseDeepDive = async () => {
    if (!user) {
      toast.info(reportCopy.signIn);
      navigate('/auth');
      return;
    }

    setIsPurchasingDeepDive(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast.info(reportCopy.signIn);
        navigate('/auth');
        return;
      }

      const data = await upsellPurchaseStandalone(session.access_token);
      if (data?.error) throw new Error(data.error);

      toast.success(reportCopy.unlockSuccess);
      await refreshAccess();
      setReportsRefreshKey((k) => k + 1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      toast.error(message);
    } finally {
      setIsPurchasingDeepDive(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!result || !combinedMatrix) {
      toast.error(language === 'ru' ? 'Сначала рассчитайте совместимость' : 'Calculate compatibility first');
      return;
    }
    if (!user) {
      toast.info(reportCopy.signIn);
      navigate('/auth');
      return;
    }
    if (!hasDeepDive) {
      toast.info(reportCopy.noAccess);
      return;
    }

    setIsGeneratingReport(true);
    try {
      const { reportId } = await generateCompatibilityReport({
        personAName: nameA || 'Person A',
        personBName: nameB || 'Person B',
        personADob: toIsoDate(dateInputA),
        personBDob: toIsoDate(dateInputB),
        compatibility: result,
        combinedMatrix,
        language: language === 'ru' ? 'ru' : 'en',
      });
      setReportsRefreshKey((k) => k + 1);
      onReportGenerated?.();
      navigate(`/compatibility/report/${reportId}`, {
        state: embedded ? { from: 'avatar' as const } : undefined,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate report';
      toast.error(message);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleReset = () => {
    setDateInputA("");
    setDateInputB("");
    setSelectedDateA(undefined);
    setSelectedDateB(undefined);
    setDateErrorA(null);
    setDateErrorB(null);
    setNameA("");
    setNameB("");
    setGenderA("male");
    setGenderB("female");
    setResult(null);
    setCombinedMatrix(null);
  };

  const openSaveDialog = () => {
    if (!user) {
      toast.error(language === 'ru' ? 'Войдите для сохранения' : 'Please login to save');
      navigate('/auth');
      return;
    }
    const defaultTitle = `${nameA || 'Person A'} & ${nameB || 'Person B'}`;
    setMatrixTitle(defaultTitle);
    setIsSaveDialogOpen(true);
  };

  const handleSaveMatrix = async () => {
    if (!user || !result) return;
    setIsSaving(true);
    try {
      // Format dates to YYYY-MM-DD
      const [dayA, monthA, yearA] = dateInputA.split('/');
      const isoDateA = `${yearA}-${monthA}-${dayA}`;

      const [dayB, monthB, yearB] = dateInputB.split('/');
      const isoDateB = `${yearB}-${monthB}-${dayB}`;

      // We save Person A's birth date as the primary one, and Person B's as secondary (if schema supports it)
      // The schema likely has birth_date_partner or similar? 
      // Let's check existing SavedMatrix interface in AvatarPage. It has birth_date_partner.

      const matrixData = {
        ...result,
        personA: { name: nameA, gender: genderA, date: isoDateA },
        personB: { name: nameB, gender: genderB, date: isoDateB },
        combinedMatrix: combinedMatrix ?? undefined,
        is_compatibility: true,
      };

      const { error } = await supabase
        .from('saved_matrices')
        .insert({
          user_id: user.id,
          title: matrixTitle,
          matrix_type: 'compatibility',
          birth_date: isoDateA,
          birth_date_partner: isoDateB, // Assuming this column exists based on AvatarPage interface
          matrix_data: matrixData,
        });

      if (error) throw error;
      toast.success(language === 'ru' ? 'Матрица сохранена' : 'Matrix saved successfully');
      setIsSaveDialogOpen(false);
      onMatrixSaved?.();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Error saving matrix");
    } finally {
      setIsSaving(false);
    }
  };

  const getCompatibilityLevel = (score: number) => {
    if (score >= 1 && score <= 7) return { level: t('compatibilityHigh'), color: "text-green-600", description: t('compatibilityExcellent') };
    if (score >= 8 && score <= 14) return { level: t('compatibilityMedium'), color: "text-yellow-600", description: t('compatibilityGood') };
    if (score >= 15 && score <= 22) return { level: t('compatibilityChallenging'), color: "text-red-600", description: t('compatibilityRequires') };
    return { level: t('compatibilityUnknown'), color: "text-gray-600", description: "" };
  };

  return (
    <div
      className={
        embedded
          ? 'overflow-x-hidden max-w-full'
          : 'min-h-screen bg-background dark:bg-gradient-cosmic pt-20 overflow-x-hidden max-w-full'
      }
    >
      <div
        className={
          embedded
            ? 'max-w-6xl overflow-hidden'
            : 'container mx-auto px-2 sm:px-4 py-8 md:py-12 max-w-6xl overflow-hidden'
        }
      >
        {!embedded && user && hasDeepDive && (
          <div className="mb-8">
            <CompatibilityReportsPanel refreshKey={reportsRefreshKey} />
          </div>
        )}

        {deepDivePrompt && hasDeepDive && (
          <div className="mb-6 max-w-2xl mx-auto rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-center text-foreground">
            {result ? reportCopy.unlocked : reportCopy.welcome}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8 md:mb-12 px-2">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-500/60 dark:text-pink-300/60" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 dark:from-purple-300 dark:via-pink-200 dark:to-blue-300 bg-clip-text text-transparent break-words">
              {t('compatibilityMatrixTitle')}
            </h1>
            <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-500/60 dark:text-blue-300/60" />
          </div>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4 break-words">
            {t('compatibilitySubtitle')}
          </p>
        </div>

        {/* Navigation managed by Global Navbar */}

        {!result ? (
          /* Input Form */
          <div className="w-full max-w-2xl mx-auto relative animate-in slide-in-from-bottom duration-700">
            {/* Decorative Glow behind form - Neutral */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-[2.5rem] blur-2xl opacity-30" />

            <div className="relative bg-white/95 dark:bg-black/60 backdrop-blur-2xl p-4 sm:p-8 rounded-[2rem] border border-black/10 dark:border-white/20 shadow-2xl flex flex-col gap-4 sm:gap-8 h-full overflow-hidden">
              <div className="text-center px-1 sm:px-2">
                <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-200 dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent">
                  {t('enterTwoBirthDates')}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t('calculateCompatibilityDesc')}
                </p>
              </div>

              {/* Person A */}
              <div className="space-y-4 px-3 py-5 sm:p-6 rounded-[1.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 relative">
                <div className="flex items-center gap-2 mb-1 sm:mb-2 ml-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-200 text-xs sm:text-sm flex items-center justify-center font-bold">
                    A
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-foreground">
                    {t('personA')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="nameA" className="text-xs uppercase tracking-wider text-slate-900 dark:text-muted-foreground font-bold ml-1">
                      {t('name')}
                    </Label>
                    <div className="relative group focus-within:ring-2 ring-primary/20 rounded-xl transition-all">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70">
                        <User className="w-5 h-5" />
                      </div>
                      <Input
                        id="nameA"
                        type="text"
                        placeholder={t('enterName')}
                        value={nameA}
                        onChange={(e) => setNameA(e.target.value)}
                        className="h-12 pl-12 bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl focus-visible:ring-0 focus-visible:border-primary transition-all font-medium text-base shadow-sm placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <Label className="text-xs uppercase tracking-wider text-slate-900 dark:text-muted-foreground font-bold ml-1">
                      {t('gender')}
                    </Label>
                    <div className="relative p-1 bg-slate-100 dark:bg-white/5 rounded-xl flex border border-slate-200 dark:border-white/5 h-12 items-center">
                      <div
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-gray-800 rounded-lg shadow-md border border-slate-200 dark:border-white/10 transition-all duration-300 ease-out ${genderA === 'male' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
                      />

                      <button
                        type="button"
                        onClick={() => setGenderA("male")}
                        className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1 rounded-lg transition-colors duration-300 ${genderA === 'male' ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <span className="text-lg">♂</span>
                        <span className="text-sm font-bold">{t('male')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setGenderA("female")}
                        className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1 rounded-lg transition-colors duration-300 ${genderA === 'female' ? 'text-foreground font-bold' : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'}`}
                      >
                        <span className="text-lg">♀</span>
                        <span className="text-sm font-bold">{t('female')}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <Label htmlFor="dateA" className="text-xs uppercase tracking-wider text-slate-900 dark:text-muted-foreground font-bold ml-1">
                    {t('dateOfBirth')}
                  </Label>
                  <div className="relative group focus-within:ring-2 ring-primary/20 rounded-xl transition-all h-12">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-primary transition-colors z-20"
                        >
                          <Calendar className="w-5 h-5" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-[100]" align="start">
                        <CalendarPicker
                          mode="single"
                          selected={selectedDateA}
                          onSelect={handleCalendarSelectA}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      id="dateA"
                      type="text"
                      placeholder={t('datePlaceholder')}
                      value={dateInputA}
                      onChange={(e) => handleDateChange(e.target.value, setDateInputA, dateInputA, setDateErrorA, setSelectedDateA)}
                      className={cn(
                        "h-12 pl-12 bg-white/50 dark:bg-black/20 border rounded-xl focus-visible:ring-0 transition-all font-medium text-base shadow-sm placeholder:text-muted-foreground/50 tracking-wider w-full",
                        dateErrorA ? 'border-red-500 focus-visible:border-red-500' : 'border-black/10 dark:border-white/10 focus-visible:border-primary'
                      )}
                      maxLength={10}
                    />
                    {dateErrorA && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      </div>
                    )}
                  </div>
                  {dateErrorA && (
                    <p className="text-xs text-red-500 ml-1 font-medium">{dateErrorA}</p>
                  )}
                </div>
              </div>

              {/* Person B */}
              <div className="space-y-4 px-3 py-5 sm:p-6 rounded-[1.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 relative">
                <div className="flex items-center gap-2 mb-1 sm:mb-2 ml-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-200 text-xs sm:text-sm flex items-center justify-center font-bold">
                    B
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-foreground">
                    {t('personB')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="nameB" className="text-xs uppercase tracking-wider text-slate-900 dark:text-muted-foreground font-bold ml-1">
                      {t('name')}
                    </Label>
                    <div className="relative group focus-within:ring-2 ring-primary/20 rounded-xl transition-all">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70">
                        <User className="w-5 h-5" />
                      </div>
                      <Input
                        id="nameB"
                        type="text"
                        placeholder={t('enterName')}
                        value={nameB}
                        onChange={(e) => setNameB(e.target.value)}
                        className="h-12 pl-12 bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl focus-visible:ring-0 focus-visible:border-primary transition-all font-medium text-base shadow-sm placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <Label className="text-xs uppercase tracking-wider text-slate-900 dark:text-muted-foreground font-bold ml-1">
                      {t('gender')}
                    </Label>
                    <div className="relative p-1 bg-slate-100 dark:bg-white/5 rounded-xl flex border border-slate-200 dark:border-white/5 h-12 items-center">
                      <div
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-gray-800 rounded-lg shadow-md border border-slate-200 dark:border-white/10 transition-all duration-300 ease-out ${genderB === 'male' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
                      />

                      <button
                        type="button"
                        onClick={() => setGenderB("male")}
                        className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1 rounded-lg transition-colors duration-300 ${genderB === 'male' ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <span className="text-lg">♂</span>
                        <span className="text-sm font-bold">{t('male')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setGenderB("female")}
                        className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1 rounded-lg transition-colors duration-300 ${genderB === 'female' ? 'text-foreground font-bold' : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'}`}
                      >
                        <span className="text-lg">♀</span>
                        <span className="text-sm font-bold">{t('female')}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <Label htmlFor="dateB" className="text-xs uppercase tracking-wider text-slate-900 dark:text-muted-foreground font-bold ml-1">
                    {t('dateOfBirth')}
                  </Label>
                  <div className="relative group focus-within:ring-2 ring-primary/20 rounded-xl transition-all h-12">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-primary transition-colors z-20"
                        >
                          <Calendar className="w-5 h-5" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-[100]" align="start">
                        <CalendarPicker
                          mode="single"
                          selected={selectedDateB}
                          onSelect={handleCalendarSelectB}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      id="dateB"
                      type="text"
                      placeholder={t('datePlaceholder')}
                      value={dateInputB}
                      onChange={(e) => handleDateChange(e.target.value, setDateInputB, dateInputB, setDateErrorB, setSelectedDateB)}
                      className={cn(
                        "h-12 pl-12 bg-white/50 dark:bg-black/20 border rounded-xl focus-visible:ring-0 transition-all font-medium text-base shadow-sm placeholder:text-muted-foreground/50 tracking-wider w-full",
                        dateErrorB ? 'border-red-500 focus-visible:border-red-500' : 'border-black/10 dark:border-white/10 focus-visible:border-primary'
                      )}
                      maxLength={10}
                    />
                    {dateErrorB && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      </div>
                    )}
                  </div>
                  {dateErrorB && (
                    <p className="text-xs text-red-500 ml-1 font-medium">{dateErrorB}</p>
                  )}
                </div>
              </div>

              <Button
                onClick={handleCalculate}
                disabled={!dateInputA || !dateInputB || !!dateErrorA || !!dateErrorB || dateInputA.length < 10 || dateInputB.length < 10}
                className="w-full h-12 mt-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] font-semibold text-base gap-2"
              >
                <Calculator className="w-4 h-4 md:w-5 md:h-5" />
                {t('calculateCompatibilityButton')}
              </Button>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-8">
            {/* Results Header */}
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-200 dark:via-pink-200 dark:to-blue-200 bg-clip-text text-transparent break-words">
                {t('compatibilityAnalysis')}
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm sm:text-lg mb-6 overflow-hidden">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-cyan-500/50 dark:border-cyan-400/50 text-cyan-700 dark:text-cyan-100 text-[10px] sm:text-sm flex items-center justify-center font-semibold shadow-md dark:shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                    A
                  </div>
                  <span className="text-foreground truncate">{nameA || "Person A"} ({dateInputA})</span>
                </div>
                <Heart className="w-5 h-5 text-red-500 shrink-0" />
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-pink-500/50 dark:border-pink-400/50 text-pink-700 dark:text-pink-100 text-[10px] sm:text-sm flex items-center justify-center font-semibold shadow-md dark:shadow-[0_0_15px_rgba(255,0,255,0.4)]">
                    B
                  </div>
                  <span className="text-foreground truncate">{nameB || "Person B"} ({dateInputB})</span>
                </div>
              </div>

              <div className="flex gap-2 justify-center mb-6">
                <Button onClick={openSaveDialog} className="gap-2 !bg-pink-600 hover:!bg-pink-700 !text-white border-0 shadow-lg transition-all active:scale-95 font-bold" size="sm">
                  <Save size={16} />
                  {language === 'ru' ? 'Сохранить' : 'Save'}
                </Button>
                <Button variant="outline" onClick={handleReset} className="gap-2" size="sm">
                  <RotateCcw size={16} />
                  {t('newCompatibilityAnalysis')}
                </Button>
              </div>
            </div>

            {/* All Matrices View */}
            <div className="space-y-16">

              {/* Compatibility Matrix Section - Centered Below */}
              {/* Compatibility Matrix Section - Centered Below */}
              <div>
                {combinedMatrix && (
                  <div className="w-full max-w-3xl mx-auto bg-white/70 dark:bg-black/30 backdrop-blur-md rounded-[32px] p-4 sm:p-12 border border-border dark:border-white/20 shadow-xl flex flex-col items-center text-center overflow-hidden">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-200 dark:via-pink-200 dark:to-blue-200 bg-clip-text text-transparent break-words">
                      {t('compatibilityMatrix')}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto mb-10 break-words line-clamp-2">
                      {t('combinedEnergies')}
                    </p>
                    <div className="w-full flex justify-center items-center">
                      <LadiniMatrixDiagram
                        matrix={combinedMatrix}
                        theme={theme as any}
                        size={700}
                        showAgeRing={true}
                        showBadges={true}
                        isCompatibility={true}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Compatibility Analysis Cards */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-200 dark:via-pink-200 dark:to-blue-200 bg-clip-text text-transparent">
                  {t('compatibilityAnalysis')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {[
                    {
                      title: t('pairCenter'),
                      value: result.pairCenter,
                      description: t('pairCenterDesc'),
                      icon: "💫"
                    },
                    {
                      title: t('loveCompatibility'),
                      value: result.relationshipEnergy,
                      description: t('loveCompatibilityDesc'),
                      icon: "❤️"
                    },
                    {
                      title: t('challengeArea'),
                      value: result.challengeArea,
                      description: t('challengeAreaDesc'),
                      icon: "⚡"
                    },
                    {
                      title: t('harmonyZone'),
                      value: result.harmonyArea,
                      description: t('harmonyZoneDesc'),
                      icon: "🕊️"
                    },
                    {
                      title: t('growthPotential'),
                      value: result.growthPotential,
                      description: t('growthPotentialDesc'),
                      icon: "🌱"
                    },
                    {
                      title: t('communication'),
                      value: result.communicationStyle,
                      description: t('communicationDesc'),
                      icon: "💬"
                    }
                  ].map((aspect) => {
                    const compatibility = getCompatibilityLevel(aspect.value);
                    return (
                      <Card key={aspect.title} className="p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="text-2xl">{aspect.icon}</div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                {aspect.value}
                              </div>
                              <div className={`text-sm font-medium ${compatibility.color}`}>
                                {compatibility.level}
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">{aspect.title}</h3>
                            <p className="text-sm text-slate-700 dark:text-muted-foreground mb-2 font-medium">
                              {aspect.description}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-muted-foreground/80 font-mediumitalic">
                              {compatibility.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Deep-Dive report CTA */}
            <Card className="bg-white/70 dark:bg-black/30 backdrop-blur-md rounded-[20px] p-8 border border-primary/20 shadow-xl max-w-2xl mx-auto">
              <div className="space-y-4 text-center">
                <FileText className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">
                  Compatibility Deep-Dive
                </h3>
                {checkingAccess ? (
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    …
                  </p>
                ) : hasDeepDive ? (
                  <p className="text-sm text-muted-foreground">{reportCopy.unlocked}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">{reportCopy.noAccess}</p>
                )}
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  {hasDeepDive ? (
                    <Button
                      size="lg"
                      onClick={handleGenerateReport}
                      disabled={isGeneratingReport}
                      className="gap-2"
                    >
                      {isGeneratingReport ? (
                        <><Loader2 className="w-4 h-4 animate-spin" />{reportCopy.generating}</>
                      ) : (
                        <><Sparkles className="w-4 h-4" />{reportCopy.generate}</>
                      )}
                    </Button>
                  ) : user ? (
                    <>
                      <Button
                        size="lg"
                        onClick={handlePurchaseDeepDive}
                        disabled={isPurchasingDeepDive}
                        className="gap-2"
                      >
                        {isPurchasingDeepDive ? (
                          <><Loader2 className="w-4 h-4 animate-spin" />{reportCopy.unlocking}</>
                        ) : (
                          <><Lock className="w-4 h-4" />{reportCopy.unlock}</>
                        )}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate('/rates')}
                        className="gap-2"
                      >
                        {reportCopy.viewRates}
                      </Button>
                    </>
                  ) : (
                    <Button size="lg" variant="secondary" onClick={() => navigate('/auth')}>
                      {language === 'ru' ? 'Войти' : 'Sign in'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>

          </div>
        )}
      </div>

      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{language === 'ru' ? 'Сохранить матрицу совместимости' : 'Save Compatibility Matrix'}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <Label>Title</Label>
            <Input value={matrixTitle} onChange={(e) => setMatrixTitle(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveMatrix} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
