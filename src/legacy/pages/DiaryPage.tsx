import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { PenSquare, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface DiaryEntry {
    id: string;
    content: string;
    created_at: string;
}

export default function DiaryPage() {
    const { user } = useUser();
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
    const [newDiaryEntry, setNewDiaryEntry] = useState("");
    const { language } = useLanguage();
    const { toast } = useToast();

    const labels = {
        en: { title: 'My Diary', description: 'Your personal diary of observations', placeholder: 'What is on your mind today?', save: 'Save Entry', entryAdded: 'Entry added', entryDeleted: 'Entry deleted', noEntries: 'No entries yet', error: 'Error saving entry' },
        ru: { title: 'Мой Дневник', description: 'Ваш личный дневник наблюдений', placeholder: 'Что у вас на уме сегодня?', save: 'Сохранить запись', entryAdded: 'Запись добавлена', entryDeleted: 'Запись удалена', noEntries: 'Записей пока нет', error: 'Ошибка сохранения' }
    };
    const t = (labels as any)[language] || labels.en;

    useEffect(() => {
        if (user) {
            const fetchDiary = async () => {
                const { data } = await supabase.from('diary_entries').select('*').order('created_at', { ascending: false });
                if (data) setDiaryEntries(data as DiaryEntry[]);
            };
            fetchDiary();
        }
    }, [user]);

    const handleSaveDiaryEntry = async () => {
        if (!newDiaryEntry.trim() || !user) return;
        try {
            const { data, error } = await supabase.from('diary_entries').insert([{ user_id: user.id, content: newDiaryEntry }]).select().single();
            if (error) throw error;
            if (data) {
                setDiaryEntries([data as DiaryEntry, ...diaryEntries]);
                setNewDiaryEntry("");
                toast({ title: t.entryAdded });
            }
        } catch (error) {
            toast({ title: t.error, variant: 'destructive' });
        }
    };

    const handleDeleteDiaryEntry = async (id: string) => {
        try {
            const { error } = await supabase.from('diary_entries').delete().eq('id', id);
            if (error) throw error;
            setDiaryEntries(diaryEntries.filter(e => e.id !== id));
            toast({ title: t.entryDeleted });
        } catch (error) {
            toast({ title: 'Error', variant: 'destructive' });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><PenSquare className="w-5 h-5" />{t.title}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Textarea value={newDiaryEntry} onChange={(e) => setNewDiaryEntry(e.target.value)} placeholder={t.placeholder} className="min-h-[100px]" />
                        <Button onClick={handleSaveDiaryEntry} className="w-full sm:w-auto">{t.save}</Button>
                    </div>
                    <div className="space-y-4 mt-6">
                        {diaryEntries.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">{t.noEntries}</p>
                        ) : (
                            diaryEntries.map(entry => (
                                <div key={entry.id} className="p-4 rounded-lg bg-secondary/30 relative group">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" onClick={() => handleDeleteDiaryEntry(entry.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                    <p className="text-sm text-muted-foreground mb-2">{new Date(entry.created_at).toLocaleDateString()} {new Date(entry.created_at).toLocaleTimeString()}</p>
                                    <p className="whitespace-pre-wrap">{entry.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
