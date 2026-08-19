import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { calcMatrix, parseDOB, MatrixValues } from "@/core/calc";
import { LadiniMatrixDiagram } from "@/components/LadiniMatrixDiagram";
import { MatrixDiagramAurea } from "@/ui/MatrixDiagramAurea";
import { EnergiesOfTheYear } from "@/components/EnergiesOfTheYear";
import { exportDiagramAsPNG, exportElementAsPNG } from "@/lib/exportUtils";
import { generateMatrixInsights } from "@/lib/aiInsightsService";
import { validateDOB, validateDateInput } from "@/lib/dateValidation";
import { energies as energiesRu } from "@/content/energies.ru";
import { zones as zonesRu } from "@/content/zones.ru";
import { energies as energiesEn } from "@/content/energies.en";
import { zones as zonesEn } from "@/content/zones.en";
import { energiesAvatarium as energiesAvatariumEn } from "@/content/energies-avatarium.en";
import { energiesAvatarium as energiesAvatariumRu } from "@/content/energies-avatarium.ru";
import { zonesAvatarium as zonesAvatariumEn } from "@/content/zones-avatarium.en";
import { zonesAvatarium as zonesAvatariumRu } from "@/content/zones-avatarium.ru";
import { Sparkles, Download, RotateCcw, Heart, Users, Save, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { MatrixNavigation } from "@/components/MatrixNavigation";
import { MessageOfTheDay } from "./MessageOfTheDay";
import { SubscriptionModal } from "@/components/ui/SubscriptionModal";
import { ChakraHealthTable } from "@/components/ChakraHealthTable";
import { useTheme } from "next-themes";
import { useUser } from "@/hooks/useUser";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Hero } from "@/components/Hero";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MatrixChatbot } from "./MatrixChatbot";

const matrixSaveSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).max(100, { message: "Title must be less than 100 characters" }),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format" }),
  matrixData: z.object({
    a: z.number().int().min(1).max(22),
    b: z.number().int().min(1).max(22),
    c: z.number().int().min(1).max(22),
    d: z.number().int().min(1).max(22),
    e: z.number().int().min(1).max(22),
  }).passthrough(),
  name: z.string().trim().max(100).optional(),
  gender: z.enum(["male", "female"]),
});

const EnergyCardNarrative = ({ description, zones, isPremium, onLockout }: { description: string, zones: { key: string, description: string }[], isPremium: boolean, onLockout: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language } = useLanguage();
  
  const handleToggle = () => {
    if (!isPremium) {
      onLockout();
      return;
    }
    setIsExpanded(!isExpanded);
  };
  
  // Logic: Always show the main description if possible, or truncate the whole block
  // We'll wrap everything in a div and apply the clamp to the content
  const hasMultipleZones = zones.length > 0;
  
  return (
    <div className="flex flex-col gap-4">
      <div className={`flex flex-col gap-4 transition-all duration-500 ${!isExpanded ? "max-h-[140px] overflow-hidden relative" : "max-h-[2000px]"}`}>
        {/* Main Description */}
        <p className="text-[13px] sm:text-base text-slate-900 dark:text-muted-foreground/80 font-normal leading-relaxed max-w-[95%] group-hover:text-foreground transition-colors duration-300">
          {description}
        </p>

        {/* Zones */}
        {zones.map((zone, idx) => (
          <p key={idx} className="text-[13px] sm:text-base text-slate-900 dark:text-muted-foreground/80 font-normal leading-relaxed max-w-[95%] group-hover:text-foreground transition-colors duration-300">
            {zone.description}
          </p>
        ))}

        {/* Gradient fade when collapsed */}
        {!isExpanded && (zones.length > 0 || description.length > 150) && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-900/40 to-transparent pointer-events-none" />
        )}
      </div>

      {(zones.length > 0 || description.length > 150) && (
        <button 
          onClick={handleToggle}
          className="text-[10px] sm:text-xs font-bold text-primary hover:text-primary/80 mt-2 uppercase tracking-widest flex items-center gap-1.5 transition-all w-fit"
        >
          {!isPremium && <Lock size={11} className="text-primary" />}
          {isExpanded ? (language === 'ru' ? 'Скрыть' : 'Read less') : (language === 'ru' ? 'Читать далее' : 'Read more...')}
        </button>
      )}
    </div>
  );
};

interface DestinyMatrixCalculatorProps {
  externalDate?: string | null;
  simplified?: boolean;
  initialDiagramType?: "ladini" | "aurea";
  hideDiagramToggle?: boolean;
  userName?: string | null;
  initialSavedMatrix?: any;
  isHomePage?: boolean;
  /** ACTIVATION: open mentor chat on mount */
  openMentor?: boolean;
  /** ACTIVATION: first-conversation suggested prompts */
  mentorQuestions?: string[];
}

export function DestinyMatrixCalculator({
  externalDate,
  simplified = false,
  initialDiagramType = "aurea",
  hideDiagramToggle = false,
  userName,
  initialSavedMatrix,
  isHomePage = false,
  openMentor = false,
  mentorQuestions,
}: DestinyMatrixCalculatorProps) {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const { user, isPremium, profile } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [dateInput, setDateInput] = useState("");
  const [dateError, setDateError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<MatrixValues | null>(null);
  const [diagramType, setDiagramType] = useState<"ladini" | "aurea">(initialDiagramType);
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const [aureaRef, setAureaRef] = useState<HTMLDivElement | null>(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [matrixTitle, setMatrixTitle] = useState("");
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>("");
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [insightError, setInsightError] = useState<string | null>(null);
  const [showYearEnergies, setShowYearEnergies] = useState(true);
  const [currentDob, setCurrentDob] = useState<any>(null);
  const [personalMatrixId, setPersonalMatrixId] = useState<string | null>(null);

  const zones = language === 'en' ? zonesEn : zonesRu;
  const energies = language === 'en' ? energiesEn : energiesRu;
  const energiesAvatarium = language === 'en' ? energiesAvatariumEn : energiesAvatariumRu;
  const zonesAvatarium = language === 'en' ? zonesAvatariumEn : zonesAvatariumRu;

  const formatToDisplayDate = (dateStr: string) => {
    // Check if format is YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  useEffect(() => {
    if (initialSavedMatrix) {
      const { birth_date, matrix_data, id } = initialSavedMatrix;
      const formattedDate = formatToDisplayDate(birth_date);

      setDateInput(formattedDate);
      setName(matrix_data.name || "");
      setGender(matrix_data.gender || "male");
      setResult(matrix_data);
      setCurrentDob(parseDOB(formattedDate));
      setPersonalMatrixId(id);
      return;
    }

    const state = location.state as { savedMatrix?: any };
    if (state?.savedMatrix) {
      const { birthDate, matrixData } = state.savedMatrix;
      const formattedDate = formatToDisplayDate(birthDate);

      setDateInput(formattedDate);
      setName(matrixData.name || "");
      setGender(matrixData.gender || "male");
      setResult(matrixData);
      setCurrentDob(parseDOB(formattedDate));
      navigate(location.pathname, { replace: true, state: {} });
      toast.success(language === 'ru' ? 'Матрица загружена' : 'Matrix loaded');
    }
  }, [location.state, initialSavedMatrix]);

  useEffect(() => {
    if (externalDate) {
      const formattedDate = formatToDisplayDate(externalDate);
      setDateInput(formattedDate);
      try {
        const dob = parseDOB(formattedDate);
        const matrix = calcMatrix(dob);
        setResult(matrix);
        setCurrentDob(dob);
        // Only run if we actually have a valid date
        if (dob) {
          autoLoadInsights(formattedDate, matrix);
        }
      } catch (e) {
        console.error("Invalid external date", e);
      }
    }
  }, [externalDate]);

  // ACTIVATION handoff: seed matrix from profile DOB so mentor chat can open
  useEffect(() => {
    if (!openMentor || result || externalDate || initialSavedMatrix) return;
    const profileDob = profile?.dob;
    if (!profileDob) return;
    try {
      const formattedDate = formatToDisplayDate(profileDob);
      const dob = parseDOB(formattedDate);
      const matrix = calcMatrix(dob);
      setDateInput(formattedDate);
      setResult(matrix);
      setCurrentDob(dob);
      if (profile?.full_name) setName(profile.full_name);
    } catch (e) {
      console.error("Activation mentor: invalid profile DOB", e);
    }
  }, [openMentor, result, externalDate, initialSavedMatrix, profile?.dob, profile?.full_name]);


  const autoLoadInsights = async (dobStr: string, matrix: MatrixValues) => {
    // Logic to auto-load insights if needed, but we typically wait for user click
  };

  const handleHeroCalculate = (data: { date: string; name: string; gender: "male" | "female" }) => {
    setDateInput(data.date);
    setName(data.name);
    setGender(data.gender);

    try {
      const dob = parseDOB(data.date);
      const matrix = calcMatrix(dob);
      setResult(matrix);
      setCurrentDob(dob);
      setAiInsight("");
      setInsightError(null);
      setDateError(null);
      // Optional: scroll to top or result
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e: any) {
      const errorMessage = e.message || t('invalidDateFormat');
      setDateError(errorMessage);
      toast.error(errorMessage);
    }
  };



  const handleReset = () => {
    setResult(null);
    setDateInput("");
    setCurrentDob(null);
    setDateError(null);
    setName("");
    setAiInsight("");
  };

  const handleGenerateInsights = async () => {
    if (!result || !dateInput) return;
    setIsLoadingInsight(true);
    setInsightError(null);
    try {
      // Ensure date is in ISO format (YYYY-MM-DD) for consistency
      let isoDate = dateInput;
      if (dateInput.includes('/')) {
        const [day, month, year] = dateInput.split('/');
        isoDate = `${year}-${month}-${day}`;
      }

      const response = await generateMatrixInsights({
        birthDate: isoDate,
        matrix: result,
        language: language as 'en' | 'ru',
        name: name
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setAiInsight(response.insight);
    } catch (err: any) {
      setInsightError(err.message || "Failed to generate AI insights");
      toast.error(err.message || "Failed to generate AI insights");
    } finally {
      setIsLoadingInsight(false);
    }
  };

  const handleSaveMatrix = async () => {
    if (!user || !result) return;
    setIsSaving(true);
    try {
      const [day, month, year] = dateInput.split('/');
      const isoDate = `${year}-${month}-${day}`;

      const payload = {
        title: matrixTitle,
        birthDate: isoDate,
        matrixData: { ...result, name, gender },
        name: name || null,
        gender: gender,
      };

      const validated = matrixSaveSchema.parse(payload);

      if (personalMatrixId) {
        const { error } = await supabase
          .from('saved_matrices')
          .update({
            title: validated.title,
            birth_date: validated.birthDate,
            matrix_data: validated.matrixData as any,
          })
          .eq('id', personalMatrixId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('saved_matrices')
          .insert({
            user_id: user.id,
            title: validated.title,
            birth_date: validated.birthDate,
            matrix_data: validated.matrixData as any,
            matrix_type: 'personal'
          });

        if (error) throw error;
      }

      toast.success(language === 'ru' ? 'Матрица сохранена' : 'Matrix saved successfully');
      setIsSaveDialogOpen(false);
    } catch (error: any) {
      toast.error(error?.message || "Error saving matrix");
    } finally {
      setIsSaving(false);
    }
  };

  const openSaveDialog = () => {
    if (!user) {
      toast.error(language === 'ru' ? 'Войдите для сохранения' : 'Please login to save');
      navigate('/auth');
      return;
    }
    setMatrixTitle(name || dateInput);
    setIsSaveDialogOpen(true);
  };

  const handleDownloadImage = async () => {
    const targetElement = diagramType === "ladini" ? svgRef : aureaRef;
    if (!targetElement) {
      toast.error(language === 'ru' ? 'Элемент для экспорта не найден' : 'Export element not found');
      return;
    }

    setIsExporting(true);
    try {
      const fileName = `${name || 'destiny-matrix'}-${diagramType}`;
      await exportElementAsPNG(targetElement as HTMLElement, fileName);
      toast.success(language === 'ru' ? 'Изображение сохранено' : 'Image saved successfully');
    } catch (error: any) {
      console.error('Download error:', error);
      toast.error(language === 'ru' ? `Ошибка: ${error.message}` : `Error: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen transition-colors overflow-x-hidden max-w-full">
        <div className={`${result ? 'w-full px-2 py-4 pt-10' : 'container mx-auto px-2 py-4 sm:py-8'}`}>
          {!result ? (
            <div className="animate-in fade-in duration-700">
              <Hero onCalculate={handleHeroCalculate} userName={userName} isHomePage={isHomePage} />

              {/* "Why It Matters" Section Inline - Keeping it for now as a footer, or remove if user wants cleaner look. 
                   User said "decrease all form etc", "remove many coloring". 
                   I will keep it simple.
               */}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center px-2">
                {isHomePage && userName && (
                  <div className="mb-12 mt-0 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-4 duration-1000 relative">
                    {/* Subtle Glow like About page */}
                    <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-full -z-10" />
                    
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-primary uppercase mb-2 sm:mb-3">
                      {language === 'ru' ? 'ДОБРО ПОЖАЛОВАТЬ' : 'WELCOME'}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-serif font-semibold text-foreground tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                      {userName}
                    </h2>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-4 sm:mt-6" />
                  </div>
                )}
                <h2 className="text-2xl font-light mb-4 text-foreground dark:text-white">{t('yourMatrix')}</h2>
                <p className="text-foreground/80 dark:text-muted-foreground italic truncate max-w-xs mx-auto mb-4 font-medium">
                  {name} {name && dateInput ? '•' : ''} {dateInput}
                </p>
              </div>

              {!hideDiagramToggle && (
                <div className="flex gap-2 justify-center mb-6">
                  <Button variant={diagramType === "ladini" ? "default" : "outline"} size="sm" onClick={() => setDiagramType("ladini")}>
                    {language === 'ru' ? 'Полная Матрица' : 'Full Matrix'}
                  </Button>
                  <Button variant={diagramType === "aurea" ? "default" : "outline"} size="sm" onClick={() => setDiagramType("aurea")}>
                    {language === 'ru' ? 'Вид Аурелия' : 'Aurea View'}
                  </Button>
                </div>
              )}

              <div className="flex flex-col-reverse md:flex-row gap-4 items-start justify-between">
                {diagramType === "ladini" && (
                  <div className="w-full md:w-[40%]">
                    <ChakraHealthTable matrix={result} />
                  </div>
                )}
                <div className={`w-full mt-10 ${diagramType === "ladini" ? "md:w-[60%] relative" : "max-w-[500px] mx-auto"}`}>
                  {diagramType === "ladini" ? (
                    <>
                      {/* 
                      <div className="absolute top-0 right-0 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg border shadow-sm">
                        <Switch
                          id="energy-year-toggle"
                          checked={showYearEnergies}
                          onCheckedChange={setShowYearEnergies}
                        />
                        <Label htmlFor="energy-year-toggle" className="text-sm cursor-pointer">{language === 'ru' ? 'Показать энергии года' : 'Show energies of the year'}</Label>
                      </div> 
                      */}
                      <LadiniMatrixDiagram matrix={result} theme={isExporting ? "light" : (theme as any)} size={700} showAgeRing={showYearEnergies} onRef={setSvgRef} />
                    </>
                  ) : (
                    <MatrixDiagramAurea values={result} onRef={setAureaRef} />
                  )}
                </div>
              </div>

              <EnergiesOfTheYear matrix={result} />

              <Card className="p-6 md:p-10 max-w-4xl mx-auto dark:bg-gray-900">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <h3 className="text-2xl font-light">{language === 'ru' ? 'AI Анализ' : 'AI Analysis'}</h3>
                </div>
                {isLoadingInsight ? (
                  <div className="flex flex-col items-center justify-center py-10 gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground animate-pulse">
                      {language === 'ru' ? 'ИИ анализирует вашу матрицу...' : 'AI is analyzing your matrix...'}
                    </p>
                  </div>
                ) : aiInsight ? (
                  <div className="prose dark:prose-invert prose-sm sm:prose-base max-w-none 
                    prose-headings:font-bold prose-headings:text-primary dark:prose-headings:text-primary
                    prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-4
                    prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                    prose-li:text-muted-foreground
                    prose-strong:text-foreground
                    prose-table:border-collapse prose-table:w-full prose-table:my-4
                    prose-th:border prose-th:border-border prose-th:p-2 prose-th:bg-muted
                    prose-td:border prose-td:border-border prose-td:p-2">
                    <div className="bg-muted/50 p-6 rounded-2xl border border-border relative overflow-hidden">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Custom styling for elements if needed
                          h2: ({node, ...props}) => <h2 className="border-b border-border pb-2 mb-4 mt-8 first:mt-0" {...props} />,
                          h3: ({node, ...props}) => <h3 className="font-semibold text-primary mt-6 mb-3" {...props} />,
                          p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                          table: ({node, ...props}) => (
                            <div className="overflow-x-auto my-6">
                              <table className="min-w-full divide-y divide-border border border-border rounded-lg overflow-hidden" {...props} />
                            </div>
                          ),
                        }}
                      >
                        {!isPremium ? aiInsight.split('\n').slice(0, 6).join('\n') : aiInsight}
                      </ReactMarkdown>

                      {!isPremium && (
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted/95 via-muted/70 to-transparent flex items-end justify-center pb-8 rounded-b-2xl">
                          <Button 
                            onClick={() => setIsSubscriptionModalOpen(true)}
                            className="flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
                          >
                            {!isPremium && <Lock size={14} />}
                            {language === 'ru' ? 'Читать далее' : 'Read more...'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    {insightError && (
                      <p className="text-sm text-red-500 mb-4 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                        {insightError}
                      </p>
                    )}
                    <Button 
                      onClick={handleGenerateInsights}
                      variant="default"
                      className="mx-auto flex items-center gap-2 shadow-lg hover:shadow-primary/20 transition-all duration-300"
                    >
                      <Sparkles size={16} />
                      {language === 'ru' ? 'Получить AI Анализ' : 'Get AI Analysis'}
                    </Button>
                    <p className="text-[10px] text-muted-foreground mt-4 uppercase tracking-widest">
                      {language === 'ru' ? 'Глубокий анализ на основе вашей даты рождения' : 'Deep analysis based on your birth date'}
                    </p>
                  </div>
                )}
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {(() => {
                  // Define main energies for simplified view
                  const mainEnergies = [result.a, result.b, result.c, result.d, result.e];

                  // Group zones by energy number
                  const groupedEnergies: Record<number, { title: string, description: string, key: string }[]> = {};
                  Object.entries(result).forEach(([key, value]) => {
                    if (typeof value === "number" && zones[key]) {
                      // If simplified (aurea), only include if value is one of the main energies
                      if (diagramType === 'aurea') {
                        if (mainEnergies.includes(value)) {
                          if (!groupedEnergies[value]) {
                            groupedEnergies[value] = [];
                          }
                          groupedEnergies[value].push({ title: zones[key].title, description: zones[key].description, key: key });
                        }
                      } else {
                        // Full matrix - show all
                        if (!groupedEnergies[value]) {
                          groupedEnergies[value] = [];
                        }
                        groupedEnergies[value].push({ title: zones[key].title, description: zones[key].description, key: key });
                      }
                    }
                  });

                  let energiesDisplay;

                  if (diagramType === 'aurea') {
                    // Requested Order: Center (e) -> Top (b) -> Right (c) -> Bottom (d) -> Left (a)
                    const orderedKeys = ['e', 'b', 'c', 'd', 'a'];

                    // Manually construct the display array in order
                    const tempDisplay: { value: number, zones: { title: string, description: string }[] }[] = [];
                    const addedValues = new Set<number>();

                    orderedKeys.forEach(key => {
                      // @ts-ignore
                      const val = result[key] as number;
                      if (val && !addedValues.has(val)) {
                        // Find the grouped entry
                        if (groupedEnergies[val]) {
                          tempDisplay.push({ value: val, zones: groupedEnergies[val] });
                          addedValues.add(val);
                        }
                      }
                    });

                    // Map back to the entry format
                    energiesDisplay = tempDisplay.map(item => [item.value.toString(), item.zones] as [string, { title: string, description: string, key: string }[]]);

                  } else {
                    // Full Matrix Logic with Custom Order
                    // Priority Order: Center (e) -> Top (b) -> Right (c) -> Bottom (d) -> Left (a)
                    const priorityKeys = ['e', 'b', 'c', 'd', 'a'];
                    const tempDisplay: { value: number, zones: { title: string, description: string }[] }[] = [];
                    const addedValues = new Set<number>();

                    // 1. Add Priority Keys
                    priorityKeys.forEach(key => {
                      // @ts-ignore
                      const val = result[key] as number;
                      if (val && !addedValues.has(val)) {
                        if (groupedEnergies[val]) {
                          tempDisplay.push({ value: val, zones: groupedEnergies[val] });
                          addedValues.add(val);
                        }
                      }
                    });

                    // 2. Add Remaining Energies (that haven't been added yet)
                    Object.entries(groupedEnergies).forEach(([valStr, zonesList]) => {
                      const val = parseInt(valStr);
                      if (!addedValues.has(val)) {
                        tempDisplay.push({ value: val, zones: zonesList });
                        addedValues.add(val);
                      }
                    });

                    energiesDisplay = tempDisplay.map(item => [item.value.toString(), item.zones] as [string, { title: string, description: string, key: string }[]]);
                  }

                  // Display unique energies
                  return energiesDisplay.map(([valueStr, zoneList]) => {
                    const value = parseInt(valueStr);
                    const energy = energies[value];
                    const avatarium = (energiesAvatarium as any)[value];

                    // Categorize based on titles for better coloring/gradients (optional subtle hints)
                    const isFamily = zoneList.some(z => z.title.toLowerCase().includes('lineage') || z.title.toLowerCase().includes('род'));
                    const isSpirit = zoneList.some(z => z.title.toLowerCase().includes('soul') || z.title.toLowerCase().includes('душа') || z.title.toLowerCase().includes('talents') || z.title.toLowerCase().includes('талант'));
                    const isMoney = zoneList.some(z => z.title.toLowerCase().includes('money') || z.title.toLowerCase().includes('деньги') || z.title.toLowerCase().includes('prosperity') || z.title.toLowerCase().includes('благополучие'));

                    // Subtle gradient hint based on category
                    let bgGradient = "from-muted/20 to-transparent";
                    if (isFamily) bgGradient = "from-blue-500/10 to-transparent";
                    else if (isSpirit) bgGradient = "from-purple-500/10 to-transparent";
                    else if (isMoney) bgGradient = "from-emerald-500/10 to-transparent";

                    return (
                      <div
                        key={valueStr}
                        className={`group relative overflow-hidden rounded-3xl border border-border bg-background/80 backdrop-blur-xl shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-primary/20 ring-1 ring-border/5`}
                      >
                        {/* Decorative Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-50 group-hover:opacity-80 transition-opacity duration-700`} />

                        {/* Massive Watermark Number */}
                        <div className="absolute -right-2 -top-6 text-[120px] sm:text-[160px] font-black text-foreground/5 select-none pointer-events-none z-0 tracking-tighter transition-transform duration-700 group-hover:scale-110 group-hover:text-primary/5">
                          {value}
                        </div>

                        <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
                          {/* Header Section */}
                          <div className="flex flex-col gap-4 mb-6">
                            {/* Dossier Header */}
                            {avatarium && (
                              <div className="space-y-1">
                                <h3 className="text-sm sm:text-2xl font-bold text-foreground tracking-tight leading-none uppercase">
                                  {avatarium.subHeading}
                                </h3>
                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                  {avatarium.keywords.map((kw: string, i: number) => (
                                    <span key={i} className="text-[8px] sm:text-[9px] font-bold text-muted-foreground/60 tracking-wider">
                                      {kw}{i < avatarium.keywords.length - 1 ? " •" : ""}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {!avatarium && (
                              <h3 className="text-sm sm:text-3xl font-bold text-foreground tracking-tight mb-2 drop-shadow-sm text-balance leading-tight">
                                {energy?.name}
                              </h3>
                            )}

                            {/* Content Narrative */}
                            <EnergyCardNarrative 
                              description={avatarium ? avatarium.description : (energy?.shortDesc || "")}
                              isPremium={isPremium || false}
                              onLockout={() => setIsSubscriptionModalOpen(true)}
                              zones={zoneList.map(zone => {
                                let displayDesc = zone.description;
                                if (avatarium) {
                                  if (zone.key === 'b') displayDesc = avatarium.talentDescription;
                                  else if (zone.key === 'top') displayDesc = avatarium.spiritDescription;
                                  else {
                                    const customZone = zonesAvatarium[zone.key as string];
                                    if (customZone) displayDesc = customZone.description;
                                  }
                                } else {
                                  const customZone = zonesAvatarium[zone.key as string];
                                  if (customZone) displayDesc = customZone.description;
                                }
                                return { key: zone.key, description: displayDesc };
                              })}
                            />
                          </div>

                          {/* Video Section */}
                          <div className="mt-auto pt-4">
                            {energy?.videoUrl ? (
                              <div className="rounded-2xl overflow-hidden border border-border bg-background/40 shadow-lg ring-1 ring-border/5 group/video relative aspect-video">
                                <iframe
                                  className="absolute top-0 left-0 w-full h-full opacity-90 group-hover/video:opacity-100 transition-opacity duration-500"
                                  src={`${energy.videoUrl}?rel=0&modestbranding=1&controls=1`}
                                  title={language === 'ru' ? `Пояснение энергии ${energy.number}` : `${energy.name} explanation`}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                  loading="lazy"
                                />

                                {/* Video is now visible to all users */}
                              </div>
                            ) : (
                              <div className="p-6 rounded-2xl border border-dashed border-border/10 bg-muted/20 flex items-center justify-center text-muted-foreground/50 text-sm italic">
                                {language === 'ru' ? 'Видео не доступно' : 'Video not available'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              <div className="flex flex-wrap gap-2 justify-center mt-10 px-2">
                <Button onClick={openSaveDialog} variant="outline" className="gap-1.5 h-7 sm:h-10 px-3 sm:px-6 text-[9px] sm:text-xs uppercase font-bold tracking-wider border-border hover:bg-primary/10 hover:text-primary transition-all shadow-sm" size="sm">
                  <Save size={12} className="sm:w-4 sm:h-4" />
                  {language === 'ru' ? 'Сохранить' : 'Save'}
                </Button>
                <Button variant="outline" onClick={handleReset} className="gap-1.5 h-7 sm:h-10 px-3 sm:px-6 text-[9px] sm:text-xs uppercase font-bold tracking-wider border-border hover:bg-red-500/10 hover:text-red-500 transition-all shadow-sm" size="sm">
                  <RotateCcw size={12} className="sm:w-4 sm:h-4" />
                  {t('resetButton')}
                </Button>
                <Button variant="outline" onClick={handleDownloadImage} disabled={isExporting} className="gap-1.5 h-7 sm:h-10 px-3 sm:px-6 text-[9px] sm:text-xs uppercase font-bold tracking-wider border-border hover:bg-primary/10 hover:text-primary transition-all shadow-sm" size="sm">
                  {isExporting ? <Loader2 size={12} className="sm:w-4 sm:h-4 animate-spin" /> : <Download size={12} className="sm:w-4 sm:h-4" />}
                  {language === 'ru' ? 'Скачать фото' : 'Download Matrix'}
                </Button>
              </div>

              <MessageOfTheDay dob={currentDob} />

              <div className="flex flex-wrap gap-4 justify-center py-10">
                {/* Save button moved to top */}
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{language === 'ru' ? 'Сохранить матрицу' : 'Save Matrix'}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <Label>{language === 'ru' ? 'Название' : 'Title'}</Label>
            <Input value={matrixTitle} onChange={(e) => setMatrixTitle(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>{language === 'ru' ? 'Отмена' : 'Cancel'}</Button>
            <Button onClick={handleSaveMatrix} disabled={isSaving}>{isSaving ? (language === 'ru' ? 'Сохранение...' : 'Saving...') : (language === 'ru' ? 'Сохранить' : 'Save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SubscriptionModal 
        isOpen={isSubscriptionModalOpen} 
        onClose={() => setIsSubscriptionModalOpen(false)} 
      />

      <MatrixChatbot 
        matrix={result} 
        name={name} 
        birthDate={currentDob ? `${currentDob.year}-${String(currentDob.month).padStart(2, "0")}-${String(currentDob.day).padStart(2, "0")}` : undefined}
        autoOpen={openMentor}
        suggestedQuestions={mentorQuestions}
      />

    </>
  );
}