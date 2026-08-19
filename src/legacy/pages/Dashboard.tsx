import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, LogOut, User as UserIcon, Calendar, Trash2, BookOpen, ChevronDown, ChevronUp, Star, StickyNote, PenSquare, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { zones as zonesRu } from '@/content/zones.ru';
import { zones as zonesEn } from '@/content/zones.en';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AvatarIdentitySections } from '@/components/AvatarIdentitySections';
import { calcMatrix, parseDOB, type MatrixValues } from '@/core/calc';
import { DashboardSkeleton, MatrixListSkeleton } from '@/components/SkeletonLoaders';
import * as analytics from "@/lib/mixpanel";

interface SavedMatrix {
  id: string;
  title: string;
  matrix_type: string;
  birth_date: string;
  birth_date_partner: string | null;
  matrix_data: any; // includes is_favorite, notes
  created_at: string;
}

export default function Dashboard() {
  const { user, profile, subscription, isPremium, loading } = useUser();
  const [matrices, setMatrices] = useState<SavedMatrix[]>([]);
  const [loadingMatrices, setLoadingMatrices] = useState(true);
  const [expandedZones, setExpandedZones] = useState<Record<string, boolean>>({});
  const [currentTab, setCurrentTab] = useState("avatar");
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [selectedMatrixForNote, setSelectedMatrixForNote] = useState<SavedMatrix | null>(null);
  const [noteContent, setNoteContent] = useState("");

  // Diary State
  interface DiaryEntry {
    id: string;
    content: string; // Changed from text to match DB
    created_at: string; // Changed from date to match DB
  }
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newDiaryEntry, setNewDiaryEntry] = useState("");

  useEffect(() => {
    if (user) {
      const fetchDiary = async () => {
        const { data, error } = await supabase
          .from('diary_entries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching diary:', error);
          return;
        }

        if (data) {
          setDiaryEntries(data as DiaryEntry[]);
        }
      };
      fetchDiary();
    }
  }, [user]);

  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();

  const content = {
    en: {
      welcome: 'Welcome',
      loading: 'Loading...',
      pleaseLogin: 'Please log in to access your dashboard',
      loginButton: 'Go to Login',
      yourMatrices: 'Your Saved Matrices',
      noMatrices: 'No saved matrices yet',
      addMatrix: '+ Add New Matrix',
      subscription: 'Subscription',
      freePlan: 'Free Plan — Upgrade for full access',
      premiumPlan: 'Premium Plan ✨',
      upgradePremium: 'Upgrade to Premium',
      accountSettings: 'Account Settings',
      email: 'Email',
      editProfile: 'Edit Profile',
      logout: 'Logout',
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
      navAvatar: 'My Avatar',
      navDiary: 'My Diary',
      navNotes: 'My Notes',
      navAccount: 'My Account',
      saveNote: 'Save Note',
      noteSaved: 'Note saved successfully',
      close: 'Close',
      notesPlaceholder: 'Enter your private notes for this matrix...',
      noNotes: 'No notes added yet.',
      allNotes: 'My Notes',
      myDiary: 'My Diary'
    },
    ru: {
      welcome: 'Добро пожаловать',
      loading: 'Загрузка...',
      pleaseLogin: 'Войдите для доступа к личному кабинету',
      loginButton: 'Перейти ко входу',
      yourMatrices: 'Сохранённые матрицы',
      noMatrices: 'Пока нет сохранённых матриц',
      addMatrix: '+ Добавить матрицу',
      subscription: 'Подписка',
      freePlan: 'Бесплатный план — Обновите для полного доступа',
      premiumPlan: 'Премиум подписка ✨',
      upgradePremium: 'Обновить до Премиум',
      accountSettings: 'Настройки аккаунта',
      email: 'Email',
      editProfile: 'Редактировать профиль',
      logout: 'Выйти',
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
      navAvatar: 'Мой Аватар',
      navDiary: 'Мой Дневник',
      navNotes: 'Мои Заметки',
      navAccount: 'Мой Аккаунт',
      saveNote: 'Сохранить заметку',
      noteSaved: 'Заметка сохранена',
      close: 'Закрыть',
      notesPlaceholder: 'Введите ваши личные заметки для этой матрицы...',
      noNotes: 'Заметок пока нет.',
      allNotes: 'Мои Заметки',
      myDiary: 'Мой Дневник'
    }
  };

  const t = content[language];
  const zones = language === 'ru' ? zonesRu : zonesEn;

  const toggleZone = (zoneKey: string) => {
    // Track content interaction
    if (!expandedZones[zoneKey]) {
      // Logic to determine if this is premium or free content
      // Currently all guide zones are free, but we track them to know what users are interested in
      analytics.trackContentClick(
        isPremium ? 'premium' : 'free',
        `zone_${zoneKey}`,
        isPremium ? 'premium_user' : 'free_user'
      );
    }

    setExpandedZones(prev => ({
      ...prev,
      [zoneKey]: !prev[zoneKey]
    }));
  };

  useEffect(() => {
    if (user) {
      fetchMatrices();
    }
  }, [user]);

  const fetchMatrices = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_matrices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Client-side sort: Favorites first
      const sortedData = (data || []).sort((a: any, b: any) => {
        const aFav = a.matrix_data?.is_favorite ? 1 : 0;
        const bFav = b.matrix_data?.is_favorite ? 1 : 0;
        return bFav - aFav; // Descending order of favorites
      });

      setMatrices(sortedData);
    } catch (error) {
      console.error('Error fetching matrices:', error);
    } finally {
      setLoadingMatrices(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (user) {
        analytics.trackLogout(user.id);
      }

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: language === 'ru' ? 'Ошибка' : 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
      localStorage.removeItem('supabase.auth.token');
      navigate('/auth');
    } catch (error) {
      console.error('Logout exception:', error);
      navigate('/auth');
    }
  };

  const handleDeleteMatrix = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { error } = await supabase
        .from('saved_matrices')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: t.deleteSuccess,
      });
      fetchMatrices();
    } catch (error) {
      console.error('Error deleting matrix:', error);
      toast({
        title: t.deleteError,
        variant: 'destructive',
      });
    }
  };

  const handleToggleFavorite = async (matrix: SavedMatrix, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const isFavorite = !!matrix.matrix_data?.is_favorite;
      const updatedData = { ...matrix.matrix_data, is_favorite: !isFavorite };

      const { error } = await supabase
        .from('saved_matrices')
        .update({ matrix_data: updatedData })
        .eq('id', matrix.id);

      if (error) throw error;
      fetchMatrices(); // Refresh list to re-sort
    } catch (error) {
      console.error('Error toggling favorite:', error);
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

      const { error } = await supabase
        .from('saved_matrices')
        .update({ matrix_data: updatedData })
        .eq('id', selectedMatrixForNote.id);

      if (error) throw error;

      toast({ title: t.noteSaved });
      setIsNoteDialogOpen(false);
      fetchMatrices();
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: language === 'ru' ? 'Ошибка сохранения' : 'Error saving note',
        variant: 'destructive',
      });
    }
  };

  const handleSaveDiaryEntry = async () => {
    if (!newDiaryEntry.trim() || !user) return;

    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .insert([{
          user_id: user.id,
          content: newDiaryEntry
        }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const newEntry = data as DiaryEntry;
        setDiaryEntries([newEntry, ...diaryEntries]);
        setNewDiaryEntry("");
        toast({ title: language === 'ru' ? 'Запись добавлена' : 'Entry added' });
      }
    } catch (error) {
      console.error('Error saving diary entry:', error);
      toast({
        title: language === 'ru' ? 'Ошибка сохранения' : 'Error saving entry',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteDiaryEntry = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('diary_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDiaryEntries(diaryEntries.filter(e => e.id !== id));
      toast({ title: language === 'ru' ? 'Запись удалена' : 'Entry deleted' });
    } catch (error) {
      console.error('Error deleting diary entry:', error);
      toast({
        title: language === 'ru' ? 'Ошибка удаления' : 'Error deleting entry',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-lg text-muted-foreground mb-4">{t.pleaseLogin}</p>
        <Button asChild>
          <Link to="/auth">{t.loginButton}</Link>
        </Button>
      </div>
    );
  }

  // --- Components for Reuse ---

  const MatrixList = () => (
    <Card className="md:col-span-2">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg break-words">
          <Calendar className="w-4 h-4 text-primary" />
          {t.yourMatrices}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
        {loadingMatrices ? (
          <MatrixListSkeleton />
        ) : matrices.length === 0 ? (
          <p className="text-xs text-muted-foreground mb-4">{t.noMatrices}</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {matrices.map((matrix) => {
              const isFav = !!matrix.matrix_data?.is_favorite;
              return (
                <li key={matrix.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors group">
                  <button
                    onClick={() => {
                      navigate('/', {
                        state: {
                          savedMatrix: {
                            title: matrix.title,
                            birthDate: matrix.birth_date,
                            matrixData: matrix.matrix_data,
                            matrixType: matrix.matrix_type
                          }
                        }
                      });
                    }}
                    className="flex-1 text-left hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-xs sm:text-sm">{matrix.title}</p>
                      {isFav && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {matrix.matrix_type === 'personal' ? t.personal : t.compatibility} • {matrix.birth_date.split('-').reverse().join('/')}
                    </p>
                  </button>

                  <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleToggleFavorite(matrix, e)}
                      className={isFav ? "text-yellow-500" : "text-muted-foreground"}
                    >
                      <Star className={`w-4 h-4 ${isFav ? "fill-yellow-500" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleOpenNotes(matrix, e)}
                    >
                      <StickyNote className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDeleteMatrix(matrix.id, e)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-11 sm:h-12 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-md transition-all active:scale-[0.98] mt-2" asChild>
          <Link to="/">{t.addMatrix}</Link>
        </Button>
      </CardContent>
    </Card>
  );

  const MatrixGuide = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          {t.matrixGuide}
        </CardTitle>
        <CardDescription>{t.matrixGuideDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {['a', 'e', 'b', 'c', 'd'].map((zoneKey) => {
            const zone = zones[zoneKey as keyof typeof zones];
            if (!zone) return null;
            return (
              <div key={zoneKey} className="rounded-xl overflow-hidden border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-xl transition-all">
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-primary flex-1">{zone.title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleZone(zoneKey)}
                      className="shrink-0 h-8 w-8 p-0 hover:bg-white/20"
                    >
                      {expandedZones[zoneKey] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed">{zone.description}</p>

                  {expandedZones[zoneKey] && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      {zone.manifestation && (
                        <div className="p-3 rounded-lg bg-white/5">
                          <p className="font-medium text-sm mb-1.5 text-primary">🧭 {t.howItManifests}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{zone.manifestation}</p>
                        </div>
                      )}
                      {zone.application && (
                        <div className="p-3 rounded-lg bg-white/5">
                          <p className="font-medium text-sm mb-1.5 text-primary">🧱 {t.practicalApplication}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{zone.application}</p>
                        </div>
                      )}
                      {zone.plusMinus && (
                        <div className="p-3 rounded-lg bg-white/5">
                          <p className="font-medium text-sm mb-1.5 text-primary">🌗 {t.prosAndCons}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{zone.plusMinus}</p>
                        </div>
                      )}
                      {zone.recommendations && (
                        <div className="p-3 rounded-lg bg-white/5">
                          <p className="font-medium text-sm mb-1.5 text-primary">🛠 {t.recommendations}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{zone.recommendations}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen p-2 sm:p-6 lg:p-8 bg-gradient-to-br from-background via-background to-primary/5 overflow-x-hidden max-w-full">
      <div className="max-w-5xl mx-auto space-y-6 overflow-hidden pt-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold break-words">
              {t.welcome}, {profile?.full_name || user.email?.split('@')[0]}!
            </h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            {t.logout}
          </Button>
        </div>

        {/* Simplified Dashboard - Account Section Only */}
        <div className="space-y-6">
          {/* My Account Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {t.subscription}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {isPremium ? t.premiumPlan : t.freePlan}
                </p>
                {!isPremium && (
                  <Button className="w-full" asChild>
                    <Link to="/rates">{t.upgradePremium}</Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  {t.accountSettings}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-1">{t.email}</p>
                <p className="text-sm font-medium mb-4">{profile?.email || user.email}</p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link to="/profile">{t.editProfile}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Notes Dialog */}
        <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t.saveNote} - {selectedMatrixForNote?.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Textarea
                placeholder={t.notesPlaceholder}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsNoteDialogOpen(false)}>
                {t.close}
              </Button>
              <Button type="submit" onClick={handleSaveNote}>
                {t.saveNote}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}