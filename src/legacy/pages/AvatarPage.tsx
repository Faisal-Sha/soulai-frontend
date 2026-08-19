import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Calendar, Star, StickyNote, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { zones as zonesRu } from '@/content/zones.ru';
import { zones as zonesEn } from '@/content/zones.en';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AvatarIdentitySections } from '@/components/AvatarIdentitySections';
import { LadiniMatrixDiagram } from '@/components/LadiniMatrixDiagram';
import { ChakraHealthTable } from '@/components/ChakraHealthTable';
import { AvatarCollapsibleSections } from '@/components/AvatarCollapsibleSections';
import { useTheme } from 'next-themes';
import { calcMatrix, calcCompatibilityMatrix, parseDOB, type MatrixValues } from '@/core/calc';
import { MatrixListSkeleton } from '@/components/SkeletonLoaders';
import CompatibilityCalculator from "@/pages/Compatibility";
import { CompatibilityReportsPanel } from '@/components/CompatibilityReportsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as analytics from "@/lib/mixpanel";

interface SavedMatrix {
    id: string;
    title: string;
    matrix_type: string;
    birth_date: string;
    birth_date_partner: string | null;
    matrix_data: any;
    created_at: string;
}

export default function AvatarPage() {
    const { user, profile, isPremium } = useUser();
    const [matrices, setMatrices] = useState<SavedMatrix[]>([]);
    const [loadingMatrices, setLoadingMatrices] = useState(true);
    const [expandedZones, setExpandedZones] = useState<Record<string, boolean>>({});
    const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
    const [selectedMatrixForNote, setSelectedMatrixForNote] = useState<SavedMatrix | null>(null);
    const [noteContent, setNoteContent] = useState("");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { language } = useLanguage();
    const { toast } = useToast();
    const { theme } = useTheme();

    const content = {
        en: {
            yourMatrices: 'Your Saved Matrices',
            noMatrices: 'No saved matrices yet',
            noOthersMatrices: 'No matrices for other people yet',
            addMatrix: '+ Add New Matrix',
            personal: 'Personal',
            compatibility: 'Compatibility',
            deleteSuccess: 'Matrix deleted successfully',
            deleteError: 'Error deleting matrix',
            matrixGuide: 'Matrix Guide',
            matrixGuideDescription: 'Understanding the key zones of your SoulPlus AI matrix',
            howItManifests: 'How it manifests:',
            practicalApplication: 'Practical application:',
            prosAndCons: 'Pros and cons:',
            recommendations: 'Recommendations:',
            saveNote: 'Save Note',
            noteSaved: 'Note saved successfully',
            close: 'Close',
            notesPlaceholder: 'Enter your private notes for this matrix...',
            tabForMe: 'For Me',
            tabOthers: 'Other People',
            tabCompatibility: 'Compatibility',
            savedCompatibilityMatrices: 'Saved compatibility matrices',
            noCompatibilityMatrices: 'No saved compatibility matrices yet. Calculate below and tap Save.',
            addCompatibility: '+ New compatibility calculation',
            sectionReports: 'Deep-Dive reports',
            sectionMatrices: 'Saved matrices',
        },
        ru: {
            yourMatrices: 'Сохранённые матрицы',
            noMatrices: 'Пока нет сохранённых матриц',
            noOthersMatrices: 'Пока нет матриц других людей',
            addMatrix: '+ Добавить матрицу',
            personal: 'Персональная',
            compatibility: 'Совместимость',
            deleteSuccess: 'Матрица удалена',
            deleteError: 'Ошибка при удалении',
            matrixGuide: 'Руководство по матрице',
            matrixGuideDescription: 'Понимание ключевых зон вашей SoulPlus AI',
            howItManifests: 'Как проявляется в жизни:',
            practicalApplication: 'Практическое применение:',
            prosAndCons: 'Плюсы и минусы:',
            recommendations: 'Рекомендации:',
            saveNote: 'Сохранить заметку',
            noteSaved: 'Заметка сохранена',
            close: 'Закрыть',
            notesPlaceholder: 'Введите ваши личные заметки для этой матрицы...',
            tabForMe: 'Для меня',
            tabOthers: 'Другие люди',
            tabCompatibility: 'Совместимость',
            savedCompatibilityMatrices: 'Сохранённые матрицы совместимости',
            noCompatibilityMatrices: 'Пока нет сохранённых матриц. Рассчитайте ниже и нажмите «Сохранить».',
            addCompatibility: '+ Новый расчёт совместимости',
            sectionReports: 'Отчёты Deep-Dive',
            sectionMatrices: 'Сохранённые матрицы',
        }
    };

    const t = (content as any)[language] || content.en;
    const zones = language === 'ru' ? zonesRu : zonesEn;

    useEffect(() => {
        if (user) fetchMatrices();
    }, [user]);

    const fetchMatrices = async () => {
        try {
            const { data, error } = await supabase
                .from('saved_matrices')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            const sortedData = (data || []).sort((a: any, b: any) => {
                const aFav = a.matrix_data?.is_favorite ? 1 : 0;
                const bFav = b.matrix_data?.is_favorite ? 1 : 0;
                return bFav - aFav;
            });
            setMatrices(sortedData);
        } catch (error) {
            console.error('Error fetching matrices:', error);
        } finally {
            setLoadingMatrices(false);
        }
    };

    const handleDeleteMatrix = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const { error } = await supabase.from('saved_matrices').delete().eq('id', id);
            if (error) throw error;
            toast({ title: t.deleteSuccess });
            fetchMatrices();
        } catch (error) {
            toast({ title: t.deleteError, variant: 'destructive' });
        }
    };

    const handleToggleFavorite = async (matrix: SavedMatrix, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const isFavorite = !!matrix.matrix_data?.is_favorite;
            const updatedData = { ...matrix.matrix_data, is_favorite: !isFavorite };
            await supabase.from('saved_matrices').update({ matrix_data: updatedData }).eq('id', matrix.id);
            fetchMatrices();
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenNotes = (matrix: SavedMatrix, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedMatrixForNote(matrix);
        setNoteContent(matrix.matrix_data?.notes || "");
        setIsNoteDialogOpen(true);
    };

    const handleSaveNote = async () => {
        if (!selectedMatrixForNote) return;
        try {
            const updatedData = { ...selectedMatrixForNote.matrix_data, notes: noteContent };
            await supabase.from('saved_matrices').update({ matrix_data: updatedData }).eq('id', selectedMatrixForNote.id);
            toast({ title: t.noteSaved });
            setIsNoteDialogOpen(false);
            fetchMatrices();
        } catch (error) {
            toast({ title: 'Error', variant: 'destructive' });
        }
    };

    const toggleZone = (zoneKey: string) => {
        if (!expandedZones[zoneKey]) {
            analytics.trackContentClick(isPremium ? 'premium' : 'free', `zone_${zoneKey}`, isPremium ? 'premium_user' : 'free_user');
        }
        setExpandedZones(prev => ({ ...prev, [zoneKey]: !prev[zoneKey] }));
    };


    const [selectedMatrix, setSelectedMatrix] = useState<SavedMatrix | null>(null);
    const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || 'for-me');
    const [reportsRefreshKey, setReportsRefreshKey] = useState(0);

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab === 'compatibility' || tab === 'for-me' || tab === 'others') {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const profileDob = (profile as any)?.dob as string | undefined;
    const profileName = (profile as any)?.full_name as string | undefined;

    const profileMatrix: SavedMatrix | null = useMemo(() => {
        if (!profileDob) return null;
        return {
            id: 'profile-matrix',
            title: profileName || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'My Profile',
            matrix_type: 'personal',
            birth_date: profileDob,
            birth_date_partner: null,
            matrix_data: { is_self: true, name: profileName },
            created_at: '',
        };
    }, [profileDob, profileName, user?.user_metadata?.full_name, user?.email]);

    const otherMatrices = useMemo(() => matrices.filter(m => {
        if (m.matrix_type !== 'personal') return false;

        if (profileDob && m.birth_date === profileDob) return false;
        if (m.matrix_data?.is_self === true) return false;

        const matrixName = (m.matrix_data?.name || m.title || "").toLowerCase().trim();
        const userName = (user?.user_metadata?.full_name || user?.email?.split('@')[0] || "").toLowerCase().trim();
        if (matrixName && userName && (matrixName.includes(userName) || userName.includes(matrixName))) return false;

        return true;
    }), [matrices, profileDob, user?.user_metadata?.full_name, user?.email]);

    const compatibilityMatrices = useMemo(
        () => matrices.filter(m => m.matrix_type === 'compatibility'),
        [matrices],
    );

    useEffect(() => {
        if (activeTab === 'for-me') {
            setSelectedMatrix((prev) => (prev?.id === 'profile-matrix' ? prev : profileMatrix));
            return;
        }
        if (activeTab === 'others') {
            const next = otherMatrices[0] ?? null;
            setSelectedMatrix((prev) => (prev?.id === next?.id ? prev : next));
            return;
        }
        if (activeTab === 'compatibility') {
            if (compatibilityMatrices.length === 0) {
                setSelectedMatrix((prev) => (prev === null ? prev : null));
                return;
            }
            setSelectedMatrix((prev) => {
                if (prev?.matrix_type === 'compatibility' && compatibilityMatrices.some((m) => m.id === prev.id)) {
                    return prev;
                }
                return compatibilityMatrices[0];
            });
        }
    }, [activeTab, profileMatrix, otherMatrices, compatibilityMatrices]);

    const renderMatrixList = (
        list: SavedMatrix[],
        emptyMsg: string,
        showAdd: boolean = true,
        showHeader: boolean = true,
        addState?: Record<string, unknown>,
        headerTitle?: string,
        addLinkPath: string = '/calculator',
        addLinkLabel?: string,
    ) => (
        <Card className={`${showHeader ? 'border-none sm:border bg-white/50 dark:bg-black/20 backdrop-blur-sm' : 'border-none bg-transparent shadow-none'}`}>
            {showHeader && (
                <CardHeader className="p-3 sm:p-4">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Calendar className="w-4 h-4 text-primary" />
                        {headerTitle ?? t.yourMatrices}
                    </CardTitle>
                </CardHeader>
            )}
            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
                {loadingMatrices ? <MatrixListSkeleton /> : list.length === 0 ? (
                    <p className="text-sm text-muted-foreground mb-4">{emptyMsg}</p>
                ) : (
                    <ul className="space-y-2 mb-4">
                        {list.map((matrix) => {
                            const isFav = !!matrix.matrix_data?.is_favorite;
                            const isSelected = selectedMatrix?.id === matrix.id;
                            return (
                                <li key={matrix.id}
                                    className={`flex items-center justify-between p-2 sm:p-3 rounded-xl transition-all group cursor-pointer border ${isSelected ? 'bg-primary/10 border-primary/40 shadow-sm' : 'bg-white/5 dark:bg-white/5 border-transparent hover:border-white/20'}`}
                                    onClick={() => setSelectedMatrix(matrix)}
                                >
                                    <div className="flex-1 text-left min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold truncate text-xs sm:text-sm">{matrix.title}</p>
                                            {isFav && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 shrink-0" />}
                                        </div>
                                        <p className="text-xs text-slate-900 dark:text-muted-foreground mt-0.5 font-medium">
                                            {matrix.matrix_type === 'personal' ? t.personal : t.compatibility} • {matrix.birth_date.split('-').reverse().join('/')}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0 ml-2">
                                        {matrix.id !== 'profile-matrix' ? (
                                            <>
                                                <Button variant="ghost" size="icon" className={`h-7 w-7 sm:h-8 w-8 ${isFav ? "text-yellow-500" : "text-muted-foreground/60"}`} onClick={(e) => handleToggleFavorite(matrix, e)}>
                                                    <Star className={`w-3.5 h-3.5 ${isFav ? "fill-yellow-500" : ""}`} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 w-8 text-muted-foreground/60" onClick={(e) => handleOpenNotes(matrix, e)}>
                                                    <StickyNote className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 w-8 text-muted-foreground/60 hover:text-red-500" onClick={(e) => handleDeleteMatrix(matrix.id, e)}>
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </>
                                        ) : (
                                            <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">Profile</span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
                {showAdd && (
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-11 sm:h-12 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-md transition-all active:scale-[0.98]" asChild>
                        <Link to={addLinkPath} state={addState}>{addLinkLabel ?? t.addMatrix}</Link>
                    </Button>
                )}
            </CardContent>
        </Card>
    );

    const resolveCompatibilityDiagram = (matrixToRender: SavedMatrix): MatrixValues | null => {
        const stored = matrixToRender.matrix_data?.combinedMatrix as MatrixValues | undefined;
        if (stored?.a != null && stored?.e != null) return stored;

        const partner = matrixToRender.birth_date_partner;
        if (!partner) return null;

        try {
            return calcCompatibilityMatrix(
                parseDOB(matrixToRender.birth_date),
                parseDOB(partner),
            );
        } catch {
            return null;
        }
    };

    const renderSelectedMatrix = (matrixToRender: SavedMatrix | null = selectedMatrix) => {
        if (!matrixToRender) return null;

        const isCompMatrix = matrixToRender.matrix_type === 'compatibility';

        try {
            if (isCompMatrix) {
                const matrixValues = resolveCompatibilityDiagram(matrixToRender);
                if (!matrixValues) return null;
                const personA = matrixToRender.matrix_data?.personA?.name || 'Person A';
                const personB = matrixToRender.matrix_data?.personB?.name || 'Person B';

                return (
                    <div className="-mx-4 sm:mx-0 px-4 sm:px-0 mt-6 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
                        <p className="text-sm text-muted-foreground mb-4 text-center">
                            {personA} & {personB}
                        </p>
                        <div className="flex flex-col-reverse md:flex-row gap-4 items-start justify-between">
                            <div className="w-full md:w-[45%]">
                                <AvatarCollapsibleSections matrix={matrixValues} isCompatibility />
                            </div>
                            <div className="w-full md:w-[55%]">
                                <LadiniMatrixDiagram
                                    matrix={matrixValues}
                                    theme={theme as any}
                                    size={700}
                                    showAgeRing
                                    isCompatibility
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            const dob = parseDOB(matrixToRender.birth_date);
            const matrixValues: MatrixValues = calcMatrix(dob);
            return (
                <div className="-mx-4 sm:mx-0 px-4 sm:px-0 mt-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
                    <div className="flex flex-col-reverse md:flex-row gap-4 items-start justify-between">
                        <div className="w-full md:w-[45%]">
                            <AvatarCollapsibleSections matrix={matrixValues} isCompatibility={false} />
                        </div>
                        <div className="w-full md:w-[55%]">
                            <LadiniMatrixDiagram matrix={matrixValues} theme={theme as any} size={700} showAgeRing isCompatibility={false} />
                        </div>
                    </div>
                </div>
            );
        } catch {
            return null;
        }
    };

    const renderCompatibilityMatrixList = () =>
        renderMatrixList(
            compatibilityMatrices,
            t.noCompatibilityMatrices,
            true,
            true,
            { fromAvatar: true },
            t.savedCompatibilityMatrices,
            '/compatibility',
            t.addCompatibility,
        );

    return (
        <div className="space-y-6 overflow-x-hidden max-w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="-mx-4 px-4 sm:mx-0 sm:px-0 bg-background/95 backdrop-blur-md mb-8">
                    <TabsList className="flex w-full justify-start gap-4 sm:gap-8 bg-transparent p-0 border-b border-border/40 rounded-none overflow-x-auto scrollbar-none h-auto">
                        <TabsTrigger
                            value="for-me"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-[12px] sm:text-sm font-medium text-muted-foreground data-[state=active]:text-primary transition-all hover:text-primary/70 bg-transparent shadow-none w-auto"
                        >
                            {t.tabForMe}
                        </TabsTrigger>
                        <TabsTrigger
                            value="others"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-[12px] sm:text-sm font-medium text-muted-foreground data-[state=active]:text-primary transition-all hover:text-primary/70 bg-transparent shadow-none w-auto"
                        >
                            {t.tabOthers}
                        </TabsTrigger>
                        <TabsTrigger
                            value="compatibility"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-[12px] sm:text-sm font-medium text-muted-foreground data-[state=active]:text-primary transition-all hover:text-primary/70 bg-transparent shadow-none w-auto"
                        >
                            {t.tabCompatibility}
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="for-me" className="space-y-6">
                    {profileMatrix ? (
                        <>
                            <Card className="border-none sm:border bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                                <CardContent className="p-3 sm:p-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="font-semibold truncate text-sm">
                                                {profileMatrix.matrix_data?.name || profileMatrix.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {profileMatrix.birth_date.split('-').reverse().join('/')}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            {renderSelectedMatrix(profileMatrix)}
                        </>
                    ) : (
                        <Card className="p-6 text-center border-dashed border-2">
                            <p className="text-muted-foreground mb-4">Set your birth date in profile to see your avatar here.</p>
                            <Button asChild variant="outline">
                                <Link to="/profile">Go to Profile</Link>
                            </Button>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="others" className="space-y-6">
                    {renderMatrixList(otherMatrices, t.noOthersMatrices, true, true, { disableAutoLoad: true })}
                    {renderSelectedMatrix()}
                </TabsContent>

                <TabsContent value="compatibility" className="space-y-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                      {t.sectionReports}
                    </p>
                    <CompatibilityReportsPanel
                      compact
                      refreshKey={reportsRefreshKey}
                    />

                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1 pt-2">
                      {t.sectionMatrices}
                    </p>
                    {renderCompatibilityMatrixList()}
                    {selectedMatrix?.matrix_type === 'compatibility' && renderSelectedMatrix(selectedMatrix)}

                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1 pt-2">
                      {language === 'ru' ? 'Новый расчёт' : 'New calculation'}
                    </p>
                    <CompatibilityCalculator
                      embedded
                      onReportGenerated={() => setReportsRefreshKey((k) => k + 1)}
                      onMatrixSaved={fetchMatrices}
                    />
                </TabsContent>
            </Tabs>

            <Card className="mt-6 overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5" />{t.matrixGuide}</CardTitle>
                    <CardDescription>{t.matrixGuideDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {['a', 'e', 'b', 'c', 'd'].map((zoneKey) => {
                            const zone = (zones as any)[zoneKey];
                            if (!zone) return null;
                            return (
                                <div key={zoneKey} className="rounded-xl overflow-hidden border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md max-w-full">
                                    <div className="p-4 sm:p-5 space-y-3 overflow-hidden">
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className="text-lg sm:text-xl font-semibold text-primary flex-1 break-words">{zone.title}</h3>
                                            <Button variant="ghost" size="sm" onClick={() => toggleZone(zoneKey)} className="shrink-0 h-8 w-8 p-0">
                                                {expandedZones[zoneKey] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                        <p className="text-sm leading-relaxed text-slate-800 dark:text-muted-foreground font-medium">{zone.description}</p>
                                        {expandedZones[zoneKey] && (
                                            <div className="mt-4 pt-4 border-t border-border space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                                {zone.manifestation && <div className="p-3 rounded-lg bg-muted/50"><p className="font-medium text-sm mb-1.5 text-primary">🧭 {t.howItManifests}</p><p className="text-sm text-slate-700 dark:text-muted-foreground leading-relaxed">{zone.manifestation}</p></div>}
                                                {zone.application && <div className="p-3 rounded-lg bg-muted/50"><p className="font-medium text-sm mb-1.5 text-primary">🧱 {t.practicalApplication}</p><p className="text-sm text-slate-700 dark:text-muted-foreground leading-relaxed">{zone.application}</p></div>}
                                                {zone.plusMinus && <div className="p-3 rounded-lg bg-muted/50"><p className="font-medium text-sm mb-1.5 text-primary">🌗 {t.prosAndCons}</p><p className="text-sm text-slate-700 dark:text-muted-foreground leading-relaxed">{zone.plusMinus}</p></div>}
                                                {zone.recommendations && <div className="p-3 rounded-lg bg-muted/50"><p className="font-medium text-sm mb-1.5 text-primary">🛠 {t.recommendations}</p><p className="text-sm text-slate-700 dark:text-muted-foreground leading-relaxed">{zone.recommendations}</p></div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader><DialogTitle>{t.saveNote} - {selectedMatrixForNote?.title}</DialogTitle></DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Textarea placeholder={t.notesPlaceholder} value={noteContent} onChange={(e) => setNoteContent(e.target.value)} className="min-h-[150px]" />
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsNoteDialogOpen(false)}>{t.close}</Button>
                        <Button onClick={handleSaveNote}>{t.saveNote}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
