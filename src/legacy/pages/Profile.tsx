import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, User as UserIcon, Loader2, Save, Lock, Calendar as CalendarIcon } from "lucide-react";
import { ProfileSkeleton } from '@/components/SkeletonLoaders';
import * as analytics from "@/lib/mixpanel";
import { validateDOB, validateDateInput } from "@/lib/dateValidation";
import { calcMatrix, parseDOB } from "@/core/calc";

export default function Profile() {
    const { user, profile, loading: userLoading } = useUser();
    const { language } = useLanguage();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [dobInput, setDobInput] = useState("");
    const [dobError, setDobError] = useState<string | null>(null);

    const handleDobChange = (value: string, currentValue: string) => {
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

    // Initialize form with profile data
    useEffect(() => {
        if (profile?.full_name) {
            setFullName(profile.full_name);
        }
        if (user?.email) {
            setEmail(user.email);
        }
        if ((profile as any)?.dob) {
            try {
                const iso = (profile as any).dob as string;
                const parts = iso.split("-");
                if (parts.length === 3) {
                    const formatted = `${parts[2]}/${parts[1]}/${parts[0]}`;
                    setDobInput(formatted);
                } else {
                    setDobInput("");
                }
            } catch {
                setDobInput("");
            }
        }
    }, [profile, user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        // Validate password match if password is provided
        if (password && password !== confirmPassword) {
            toast({
                title: language === 'ru' ? "Ошибка" : "Error",
                description: language === 'ru'
                    ? "Пароли не совпадают"
                    : "Passwords do not match",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const updates: any[] = [];

            // 1. Update Profile (Name)
            if (fullName !== profile?.full_name) {
                const updateProfile = supabase
                    .from('profiles')
                    .update({
                        full_name: fullName,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', user.id);
                updates.push(updateProfile);
            }

            // 1b. Update Profile (DOB)
            const trimmedDob = dobInput.trim();
            if (trimmedDob) {
                const validation = validateDOB(trimmedDob, { format: 'DD/MM/YYYY' });
                if (!validation.isValid) {
                    setDobError(validation.error || (language === 'ru' ? "Неверная дата" : "Invalid date"));
                    setLoading(false);
                    return;
                }
                setDobError(null);
                const [day, month, year] = trimmedDob.split('/');
                const isoDob = `${year}-${month}-${day}`;
                if ((profile as any)?.dob !== isoDob) {
                    const updateDob = supabase
                        .from('profiles')
                        .update({
                            dob: isoDob,
                            updated_at: new Date().toISOString(),
                        })
                        .eq('id', user.id);
                    updates.push(updateDob);
                }
            } else if ((profile as any)?.dob) {
                // Allow clearing DOB if input emptied
                const clearDob = supabase
                    .from('profiles')
                    .update({
                        dob: null,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', user.id);
                updates.push(clearDob);
            }

            // 2. Update Auth (Email & Password)
            const authUpdates: { email?: string; password?: string } = {};
            if (email !== user.email) {
                authUpdates.email = email;
            }
            if (password) {
                authUpdates.password = password;
            }

            if (Object.keys(authUpdates).length > 0) {
                const updateAuth = supabase.auth.updateUser(authUpdates);
                updates.push(updateAuth);
            }

            if (updates.length === 0) {
                setLoading(false);
                return;
            }

            const results = await Promise.all(updates);

            // Check for errors in results
            for (const result of results) {
                if (result.error) throw result.error;
            }

            let successMessage = language === 'ru' ? "Профиль обновлен" : "Profile updated";
            let successDesc = language === 'ru' ? "Ваши данные успешно сохранены" : "Your information has been saved successfully.";


            // 3. Track Profile Update in Mixpanel
            const changedFields: string[] = [];
            if (fullName !== profile?.full_name) changedFields.push('full_name');
            if (password) changedFields.push('password');

            if (changedFields.length > 0) {
                analytics.trackProfileUpdate(user.id, changedFields);
            }

            toast({
                title: successMessage,
                description: successDesc,
            });

            if (trimmedDob) {
                const [d, m, y] = trimmedDob.split('/');
                const isoDob = `${y}-${m}-${d}`;
                const { data: exists } = await supabase
                    .from('saved_matrices')
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('matrix_type', 'personal')
                    .eq('birth_date', isoDob)
                    .limit(1);
                if (!exists || exists.length === 0) {
                    try {
                        const display = `${d}/${m}/${y}`;
                        const dobObj = parseDOB(display);
                        const matrix = calcMatrix(dobObj);
                        const nameDefault = fullName || (user.email ? user.email.split('@')[0] : '') || '';
                        const matrixData = { ...matrix, name: nameDefault, gender: 'male' };
                        const titleDefault = nameDefault ? `${nameDefault}` : `${display}`;
                        await supabase.from('saved_matrices').insert({
                            user_id: user.id,
                            title: titleDefault,
                            birth_date: isoDob,
                            matrix_data: matrixData,
                            matrix_type: 'personal'
                        });
                    } catch {
                    }
                }
            }

            // Clear password fields
            setPassword("");
            setConfirmPassword("");

            // If password was changed, logout and redirect to auth
            if (password) {
                setTimeout(async () => {
                    await supabase.auth.signOut();
                    navigate('/auth', {
                        state: {
                            message: language === 'ru'
                                ? 'Пароль изменен. Пожалуйста, войдите снова с новым паролем.'
                                : 'Password changed successfully. Please sign in again with your new password.'
                        }
                    });
                }, 1500); // Give time for toast to show
            }

        } catch (error: any) {
            toast({
                title: language === 'ru' ? "Ошибка" : "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const t = {
        back: language === 'ru' ? "Назад" : "Back",
        title: language === 'ru' ? "Профиль" : "Profile",
        description: language === 'ru' ? "Управляйте личной информацией" : "Manage your personal information",
        fullName: language === 'ru' ? "Полное имя" : "Full Name",
        email: language === 'ru' ? "Email" : "Email",
        dob: language === 'ru' ? "Дата рождения" : "Date of Birth",
        dobPlaceholder: language === 'ru' ? "ДД/ММ/ГГГГ" : "DD/MM/YYYY",
        password: language === 'ru' ? "Новый пароль" : "New Password",
        confirmPassword: language === 'ru' ? "Подтвердите пароль" : "Confirm Password",
        save: language === 'ru' ? "Сохранить" : "Save Changes",
        saving: language === 'ru' ? "Сохранение..." : "Saving...",
        emailNote: language === 'ru'
            ? "Email нельзя изменить в целях безопасности."
            : "Email cannot be changed for security reasons.",
        passwordPlaceholder: language === 'ru' ? "Оставьте пустым, чтобы не менять" : "Leave empty to keep current password",
    };

    if (userLoading) {
        return <ProfileSkeleton />;
    }

    if (!user) {
        navigate('/auth');
        return null;
    }

    return (
        <div className="min-h-screen p-2 sm:p-6 lg:p-8 bg-gradient-to-br from-background via-background to-primary/5 flex flex-col items-center overflow-x-hidden max-w-full pt-20">
            <div className="w-full max-w-2xl space-y-6 overflow-hidden">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
                        <Link to="/dashboard">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t.back}
                        </Link>
                    </Button>
                </div>

                <Card className="glass-card border-white/20 dark:bg-gray-800/80 overflow-hidden">
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 break-words">
                            <UserIcon className="w-6 h-6 text-primary shrink-0" />
                            {t.title}
                        </CardTitle>
                        <CardDescription className="break-words">{t.description}</CardDescription>
                    </CardHeader>

                    <form onSubmit={handleUpdateProfile}>
                        <CardContent className="space-y-6">

                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label htmlFor="fullName">{t.fullName}</Label>
                                <Input
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email (Read-only for security) */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    {t.email}
                                    <Lock className="w-3 h-3 text-muted-foreground" />
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    disabled
                                    className="bg-muted/50 cursor-not-allowed"
                                />
                                <p className="text-xs text-muted-foreground">{t.emailNote}</p>
                            </div>

                            {/* Date of Birth */}
                            <div className="space-y-2">
                                <Label htmlFor="dob" className="flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                                    {t.dob}
                                </Label>
                                <Input
                                    id="dob"
                                    value={dobInput}
                                    onChange={(e) => handleDobChange(e.target.value, dobInput)}
                                    placeholder={t.dobPlaceholder}
                                />
                                {dobError && <p className="text-xs text-red-500">{dobError}</p>}
                            </div>

                            {/* Password Section */}
                            <div className="pt-4 border-t border-border space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">{t.password}</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder={t.passwordPlaceholder}
                                    />
                                </div>

                                {password && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder={t.confirmPassword}
                                        />
                                    </div>
                                )}
                            </div>

                        </CardContent>

                        <CardFooter className="flex justify-end border-t border-border pt-6">
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        {t.saving}
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        {t.save}
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
