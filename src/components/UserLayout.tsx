import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import * as analytics from "@/lib/mixpanel";
import { useToast } from '@/hooks/use-toast';
import { DashboardSkeleton } from '@/components/SkeletonLoaders';

export default function UserLayout() {
    const { language, t } = useLanguage();
    const { user, profile, loading } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();

    const currentTab = location.pathname.split('/').pop() || 'avatar';

    const handleLogout = async () => {
        try {
            if (user) analytics.trackLogout(user.id);
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            localStorage.removeItem('supabase.auth.token');
            navigate('/auth');
        } catch (error: any) {
            toast({
                title: language === 'ru' ? 'Ошибка' : 'Error',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    if (loading) return <DashboardSkeleton />;
    if (!user) {
        navigate('/auth');
        return null;
    }

    const translations = {
        en: { welcome: 'Welcome', logout: 'Logout', navAvatar: 'My Avatar', navDiary: 'My Diary', navNotes: 'My Notes', navAccount: 'My Account' },
        ru: { welcome: 'Добро пожаловать', logout: 'Выйти', navAvatar: 'Мой Аватар', navDiary: 'Мой Дневник', navNotes: 'Мои Заметки', navAccount: 'Мой Аккаунт' }
    };
    const ct = (translations as any)[language] || translations.en;

    const isFullWidthObj = { avatar: true };
    const isFullWidth = (isFullWidthObj as any)[currentTab];

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-background via-background to-primary/5">
            <div className={`${isFullWidth ? 'w-full max-w-[1600px]' : 'max-w-5xl'} mx-auto space-y-6`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {ct.welcome}, {profile?.full_name || user.email?.split('@')[0]}!
                        </h1>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        {ct.logout}
                    </Button>
                </div>

                <Tabs value={currentTab} onValueChange={(val) => navigate(`/${val}`)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
                        <TabsTrigger
                            value="avatar"
                            className="py-3 rounded-xl text-xs sm:text-sm font-bold transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-primary data-[state=active]:shadow-md data-[state=active]:border border-transparent data-[state=active]:border-slate-200 dark:data-[state=active]:border-white/20 text-slate-500 dark:text-white/40 hover:text-primary/70"
                        >
                            {ct.navAvatar}
                        </TabsTrigger>
                        <TabsTrigger
                            value="account"
                            className="py-3 rounded-xl text-xs sm:text-sm font-bold transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-primary data-[state=active]:shadow-md data-[state=active]:border border-transparent data-[state=active]:border-slate-200 dark:data-[state=active]:border-white/20 text-slate-500 dark:text-white/40 hover:text-primary/70"
                        >
                            {ct.navAccount}
                        </TabsTrigger>
                    </TabsList>
                    <div className="mt-6">
                        <Outlet />
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
