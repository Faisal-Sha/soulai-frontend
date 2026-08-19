import { DestinyMatrixCalculator } from "@/components/DestinyMatrixCalculator";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeartHandshake } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateDOB, validateDateInput } from "@/lib/dateValidation";
import { toast } from "sonner";
import { calcMatrix, parseDOB } from "@/core/calc";

const Calculator = () => {
    const { language } = useLanguage();
    const { user, profile, loading, dataLoaded } = useUser();
    const location = useLocation();
    const disableAutoLoad = ((location.state as any)?.disableAutoLoad) === true;
    const [initialMatrix, setInitialMatrix] = useState<any>(null);
    const [showDobDialog, setShowDobDialog] = useState(false);
    const [dobInput, setDobInput] = useState("");
    const [dobError, setDobError] = useState<string | null>(null);

    const handleDobInputChange = (value: string, currentValue: string) => {
        if (value.length < currentValue.length) {
            setDobInput(value);
            setDobError(null);
            return;
        }
        const numeric = value.replace(/\D/g, "");
        let formatted = "";
        if (numeric.length <= 2) {
            formatted = numeric;
        } else if (numeric.length <= 4) {
            formatted = `${numeric.slice(0, 2)}/${numeric.slice(2)}`;
        } else {
            formatted = `${numeric.slice(0, 2)}/${numeric.slice(2, 4)}/${numeric.slice(4, 8)}`;
        }
        setDobInput(formatted);
        const validation = validateDateInput(formatted);
        setDobError(validation.error || null);
    };

    const labels = {
        en: {
            compatibility: "Want to check Compatibility Matrix?",
            compatibilityLink: "Calculate Compatibility",
            dobTitle: "Set Your Date of Birth",
            dobSave: "Save",
            dobCancel: "Cancel",
            dobPlaceholder: "DD/MM/YYYY"
        },
        ru: {
            compatibility: "Хотите проверить матрицу совместимости?",
            compatibilityLink: "Рассчитать совместимость",
            dobTitle: "Укажите вашу дату рождения",
            dobSave: "Сохранить",
            dobCancel: "Отмена",
            dobPlaceholder: "ДД/ММ/ГГГГ"
        }
    };
    const t = (labels as any)[language] || labels.en;

    useEffect(() => {
        if (user && !disableAutoLoad) {
            const fetchPrimaryMatrix = async () => {
                let data: any[] | null = null;
                const profileDob: string | undefined = (profile as any)?.dob || undefined;

                if (profileDob) {
                    const resPreferred = await supabase
                        .from('saved_matrices')
                        .select('*')
                        .eq('user_id', user.id)
                        .eq('matrix_type', 'personal')
                        .eq('birth_date', profileDob)
                        .order('created_at', { ascending: false })
                        .limit(1);
                    data = resPreferred.data || null;
                }

                if (!data || !data[0]) {
                    const resLatest = await supabase
                        .from('saved_matrices')
                        .select('*')
                        .eq('user_id', user.id)
                        .eq('matrix_type', 'personal')
                        .order('created_at', { ascending: false })
                        .limit(1);
                    data = resLatest.data || null;
                }

                if (data && data[0]) {
                    setInitialMatrix(data[0]);
                } else if ((profile as any)?.dob) {
                    await createPersonalMatrixIfMissing((profile as any).dob as string);
                }
            };
            fetchPrimaryMatrix();
        }
    }, [user, profile, disableAutoLoad]);

    useEffect(() => {
        if (!loading && dataLoaded && user && !disableAutoLoad) {
            const dob = (profile as any)?.dob as string | undefined;
            if (!dob) {
                setShowDobDialog(true);
            }
        }
    }, [loading, dataLoaded, user, profile, disableAutoLoad]);

    const handleSaveDob = async () => {
        const value = dobInput.trim();
        const validation = validateDOB(value, { format: 'DD/MM/YYYY' });
        if (!validation.isValid) {
            setDobError(validation.error || "Invalid date");
            return;
        }
        setDobError(null);
        const [day, month, year] = value.split('/');
        const isoDob = `${year}-${month}-${day}`;
        if (user) {
            const { error } = await supabase
                .from('profiles')
                .update({ dob: isoDob, updated_at: new Date().toISOString() })
                .eq('id', user.id);
            if (error) {
                setDobError(error.message);
                toast.error(error.message);
                return;
            }
            await createPersonalMatrixIfMissing(isoDob);
        }
        setShowDobDialog(false);
    };

    const createPersonalMatrixIfMissing = async (isoDob: string) => {
        if (!user) return;
        const { data: existing } = await supabase
            .from('saved_matrices')
            .select('id')
            .eq('user_id', user.id)
            .eq('matrix_type', 'personal')
            .eq('birth_date', isoDob)
            .limit(1);
        if (existing && existing.length > 0) {
            return;
        }
        try {
            const display = `${isoDob.split('-')[2]}/${isoDob.split('-')[1]}/${isoDob.split('-')[0]}`;
            const dobObj = parseDOB(display);
            const matrix = calcMatrix(dobObj);
            const name = (profile?.full_name || (user.email ? user.email.split('@')[0] : '')) || '';
            const matrixData = { ...matrix, name, gender: 'male', is_self: true, source: 'profile_dob' };
            const title = name ? `${name}` : `${display}`;
            const { data, error } = await supabase
                .from('saved_matrices')
                .insert({
                    user_id: user.id,
                    title,
                    birth_date: isoDob,
                    matrix_data: matrixData,
                    matrix_type: 'personal'
                })
                .select('*')
                .single();
            if (error) return;
            if (data) {
                setInitialMatrix(data);
            }
        } catch {
            return;
        }
    };

    if (loading) return null;

    const userName = profile?.full_name || (user?.email ? user.email.split('@')[0] : null);
    const externalDate = !disableAutoLoad && !initialMatrix && (profile as any)?.dob ? (profile as any).dob as string : null;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 p-4 sm:p-8">
                <div className="w-full">
                    {/* Single Personal Matrix Calculator */}
                    <DestinyMatrixCalculator
                        externalDate={externalDate}
                        simplified={false}
                        initialDiagramType="ladini"
                        hideDiagramToggle={true}
                        userName={userName}
                        initialSavedMatrix={initialMatrix}
                    />

                    {/* Optional Compatibility Link */}
                    <div className="mt-12 text-center py-8 border-t border-border/40">
                        <p className="text-muted-foreground mb-4">{t.compatibility}</p>
                        <Link
                            to="/compatibility"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border border-pink-500/20 text-primary transition-all hover:scale-105"
                        >
                            <HeartHandshake className="w-5 h-5 text-pink-500" />
                            {t.compatibilityLink}
                        </Link>
                    </div>
                </div>
            </div>
            <Dialog open={showDobDialog} onOpenChange={setShowDobDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.dobTitle}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Input
                            value={dobInput}
                            onChange={(e) => handleDobInputChange(e.target.value, dobInput)}
                            placeholder={t.dobPlaceholder}
                        />
                        {dobError && <p className="text-xs text-red-500">{dobError}</p>}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDobDialog(false)}>
                            {t.dobCancel}
                        </Button>
                        <Button onClick={handleSaveDob}>{t.dobSave}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Calculator;
