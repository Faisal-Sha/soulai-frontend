import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { StickyNote, PenSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface SavedMatrix {
    id: string;
    title: string;
    matrix_type: string;
    birth_date: string;
    matrix_data: any;
}

export default function NotesPage() {
    const { user } = useUser();
    const [matrices, setMatrices] = useState<SavedMatrix[]>([]);
    const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
    const [selectedMatrixForNote, setSelectedMatrixForNote] = useState<SavedMatrix | null>(null);
    const [noteContent, setNoteContent] = useState("");
    const { language } = useLanguage();
    const navigate = useNavigate();
    const { toast } = useToast();

    const labels = {
        en: { title: 'My Notes', noNotes: 'No notes added yet.', noMatrices: 'No saved matrices yet.', saveNote: 'Save Note', noteSaved: 'Note saved successfully', close: 'Close', placeholder: 'Enter your private notes...' },
        ru: { title: 'Мои Заметки', noNotes: 'Заметок пока нет.', noMatrices: 'Матриц пока нет.', saveNote: 'Сохранить заметку', noteSaved: 'Заметка сохранена', close: 'Закрыть', placeholder: 'Введите ваши заметки...' }
    };
    const t = (labels as any)[language] || labels.en;

    useEffect(() => {
        if (user) fetchMatrices();
    }, [user]);

    const fetchMatrices = async () => {
        const { data } = await supabase.from('saved_matrices').select('*').order('created_at', { ascending: false });
        if (data) setMatrices(data as SavedMatrix[]);
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

    const filteredMatrices = matrices.filter(m => m.matrix_data?.notes);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><StickyNote className="w-5 h-5" />{t.title}</CardTitle>
            </CardHeader>
            <CardContent>
                {matrices.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">{t.noMatrices}</p>
                ) : filteredMatrices.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">{t.noNotes}</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredMatrices.map((matrix) => (
                            <Card key={matrix.id} className="bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => navigate('/', { state: { savedMatrix: { title: matrix.title, birthDate: matrix.birth_date, matrixData: matrix.matrix_data, matrixType: matrix.matrix_type } } })}>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base font-medium flex justify-between items-start">
                                        <span>{matrix.title}</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => handleOpenNotes(matrix, e)}><PenSquare className="h-3 w-3" /></Button>
                                    </CardTitle>
                                    <CardDescription className="text-xs">{matrix.birth_date.split('-').reverse().join('/')}</CardDescription>
                                </CardHeader>
                                <CardContent><p className="text-sm line-clamp-4 whitespace-pre-wrap font-light text-foreground/80">{matrix.matrix_data.notes}</p></CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>

            <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader><DialogTitle>{t.saveNote} - {selectedMatrixForNote?.title}</DialogTitle></DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Textarea placeholder={t.placeholder} value={noteContent} onChange={(e) => setNoteContent(e.target.value)} className="min-h-[150px]" />
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsNoteDialogOpen(false)}>{t.close}</Button>
                        <Button onClick={handleSaveNote}>{t.saveNote}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
