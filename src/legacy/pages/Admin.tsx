import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Users, CreditCard, BarChart3, TrendingUp, Activity, DollarSign, Search, X } from 'lucide-react';
import { AdminDashboardSkeleton } from '@/components/SkeletonLoaders';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface AnalyticsMetrics {
    totalUsers: number;
    dailyNewUsers: number;
    weeklyNewUsers: number;
    monthlyNewUsers: number;
    activeSubscriptions: {
        basic: number;
        slim: number;
        full: number;
        total: number;
    };
    mostVisitedSections: { name: string; visits: number }[];
    recentSignups: { id: string; email: string; created_at: string }[];
    pageVisits: { date: string; count: number }[];
    pageViewDistribution: { name: string; value: number; color: string }[];
}

export default function Admin() {
    const { isAdmin, loading: adminLoading, dataLoaded } = useAdmin();
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState<AnalyticsMetrics>({
        totalUsers: 0,
        dailyNewUsers: 0,
        weeklyNewUsers: 0,
        monthlyNewUsers: 0,
        activeSubscriptions: {
            basic: 0,
            slim: 0,
            full: 0,
            total: 0,
        },
        mostVisitedSections: [],
        recentSignups: [],
        pageVisits: [],
        pageViewDistribution: [],
    });
    const [loading, setLoading] = useState(true);
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [subscriptionSearch, setSubscriptionSearch] = useState('');
    const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
    const [cancelModal, setCancelModal] = useState<{ userId: string; email: string } | null>(null);

    useEffect(() => {
        if (!adminLoading && dataLoaded) {
            if (!isAdmin) {
                console.log('[Admin] Access denied - redirecting to dashboard');
                navigate('/dashboard');
            } else {
                console.log('[Admin] Access granted - fetching analytics');
                fetchAnalytics();
            }
        }
    }, [isAdmin, adminLoading, dataLoaded, navigate]);

    const [userGrowthData, setUserGrowthData] = useState<{ date: string; users: number }[]>([]);

    const handleCancelSubscription = async (userId: string) => {
        // Find email for display in modal
        const sub = subscriptions.find(s => s.user_id === userId);
        setCancelModal({
            userId,
            email: sub?.profiles?.email || sub?.email || userId,
        });
    };

    const filteredSubscriptions = useMemo(() => {
        const q = subscriptionSearch.trim().toLowerCase();
        if (!q) return subscriptions;
        return subscriptions.filter((sub) => {
            const email = (sub.profiles?.email || sub.email || '').toLowerCase();
            const name = (sub.profiles?.full_name || '').toLowerCase();
            return email.includes(q) || name.includes(q);
        });
    }, [subscriptions, subscriptionSearch]);

    const confirmCancelSubscription = async () => {
        if (!cancelModal) return;
        const { userId } = cancelModal;
        setCancelModal(null);
        setIsActionLoading(userId);
        try {
            const { data, error } = await supabase.functions.invoke('admin-cancel-subscription', {
                body: { userId },
            });

            if (error || data?.error) {
                throw new Error(data?.error || error?.message || 'Cancellation failed');
            }

            await fetchAnalytics();
        } catch (err: any) {
            console.error('[Admin] Cancel error:', err.message);
            alert(`Error: ${err.message}`);
        } finally {
            setIsActionLoading(null);
        }
    };

    const fetchAnalytics = async () => {
        try {
            setLoading(true);

            // 1. Fetch Page Visits for Analytics (Last 30 days)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const { data: visitsData, error: visitsError } = await supabase
                .from('page_visits')
                .select('created_at, page_path, user_id')
                .gte('created_at', thirtyDaysAgo.toISOString());

            if (visitsError) console.error('Error fetching page visits:', visitsError);

            // 2. Fetch Real-time User Counts via SECURITY DEFINER RPC (bypasses RLS, reads auth.users)
            const { data: adminStats, error: statsError } = await supabase.rpc('get_admin_stats');

            if (statsError) {
                console.error('Error fetching admin stats:', statsError);
            }

            const totalCount = adminStats?.totalUsers ?? 0;
            const dailyCount = adminStats?.dailyNewUsers ?? 0;
            const weeklyCount = adminStats?.weeklyNewUsers ?? 0;
            const monthlyCount = adminStats?.monthlyNewUsers ?? 0;
            const recentProfiles: { id: string; email: string; created_at: string }[] =
                adminStats?.recentSignups ?? [];

            // 3. Subscription counts — read from RPC (SECURITY DEFINER bypasses RLS)
            const activeSubs = {
                basic: adminStats?.subscriptions?.basic ?? 0,
                slim:  adminStats?.subscriptions?.slim  ?? 0,
                full:  adminStats?.subscriptions?.full  ?? 0,
                total: adminStats?.subscriptions?.total ?? 0,
            };

            // Process Visits Data
            const visits = visitsData || [];

            // Calculate Daily Active Users (DAU)
            const dailyActiveUsers = new Map<string, Set<string>>();

            // Calculate Page Views
            const pageViews: Record<string, number> = {};

            visits.forEach((visit: any) => {
                const date = new Date(visit.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                // DAU
                if (visit.user_id) {
                    if (!dailyActiveUsers.has(date)) {
                        dailyActiveUsers.set(date, new Set());
                    }
                    dailyActiveUsers.get(date)?.add(visit.user_id);
                }

                // Page Views
                const path = visit.page_path;
                pageViews[path] = (pageViews[path] || 0) + 1;
            });

            // Prepare Chart Data for DAU
            const activityChartData = Array.from(dailyActiveUsers.entries()).map(([date, usersSet]) => ({
                date,
                users: usersSet.size
            })).reverse(); // Reverse if needed, but Map iteration order is insertion order usually. 
            // Better to sort by date
            activityChartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            setUserGrowthData(activityChartData);

            // Prepare Most Visited Sections (Top 10)
            const topSections = Object.entries(pageViews)
                .map(([name, visits]) => ({ name, visits }))
                .sort((a, b) => b.visits - a.visits)
                .slice(0, 10);

            // Prepare Page View Distribution (Pie Chart)
            const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#84cc16', '#a855f7', '#d946ef', '#f43f5e'];
            const pageViewDistribution = topSections.map((section, index) => ({
                name: section.name,
                value: section.visits,
                color: COLORS[index % COLORS.length]
            }));

            setMetrics({
                totalUsers: totalCount || 0,
                dailyNewUsers: dailyCount || 0,
                weeklyNewUsers: weeklyCount || 0,
                monthlyNewUsers: monthlyCount || 0,
                activeSubscriptions: activeSubs,
                mostVisitedSections: topSections,
                recentSignups: recentProfiles as any || [],
                pageVisits: [],
                pageViewDistribution: pageViewDistribution,
            });

            // Fetch Subscriptions List
            const { data: subData, error: subError } = await supabase
                .from('subscriptions')
                .select(`
                    *,
                    profiles:user_id (email, full_name)
                `)
                .order('created_at', { ascending: false });

            if (subError) {
                console.error('Error fetching subscriptions:', subError);
            } else {
                setSubscriptions(subData || []);
            }

        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    // Chart data
    const subscriptionDistribution = [
        { name: 'Basic', value: metrics.activeSubscriptions.basic, color: '#8b5cf6' },
        { name: 'Slim', value: metrics.activeSubscriptions.slim, color: '#ec4899' },
        { name: 'Full', value: metrics.activeSubscriptions.full, color: '#f59e0b' },
    ];

    if (loading || adminLoading || !dataLoaded) {
        return <AdminDashboardSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Custom Admin Header */}
            <header className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2" onClick={() => navigate('/')} role="button">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            Soul+AI
                        </span>
                        <span className="text-sm font-medium text-muted-foreground border-l pl-2 ml-2">
                            Admin Console
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                            Exit
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-gold">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground text-lg">Analytics and user management overview</p>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-8 p-1 bg-muted/50 backdrop-blur rounded-xl border">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg">Overview</TabsTrigger>
                        <TabsTrigger value="users" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg">Users</TabsTrigger>
                        <TabsTrigger value="subscriptions" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg">Subscriptions</TabsTrigger>
                        <TabsTrigger value="content" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg">Content</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Key Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.totalUsers}</div>
                                    <p className="text-xs text-muted-foreground mt-1">All time</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Daily New Users</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.dailyNewUsers}</div>
                                    <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Weekly New Users</CardTitle>
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.weeklyNewUsers}</div>
                                    <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.activeSubscriptions.total}</div>
                                    <p className="text-xs text-muted-foreground mt-1">Total active plans</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* User Growth Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Daily Active Users (Trend)</CardTitle>
                                    <CardDescription>Active users over last 30 days</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={userGrowthData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} />
                                        </LineChart>

                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Subscription Distribution Chart */}
                            <Card className="glass-intense border-primary/10">
                                <CardHeader>
                                    <CardTitle>Active Plans Distribution</CardTitle>
                                    <CardDescription>Breakdown by plan type</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={subscriptionDistribution}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {subscriptionDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Page Analytics Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Page View Distribution */}
                            <Card className="glass-intense border-primary/10">
                                <CardHeader>
                                    <CardTitle>Page Traffic Distribution</CardTitle>
                                    <CardDescription>Share of views by page</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={metrics.pageViewDistribution}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                dataKey="value"
                                                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                            >
                                                {metrics.pageViewDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Most Visited Sections */}
                            <Card className="glass-intense border-primary/10">
                                <CardHeader>
                                    <CardTitle>Top Visited Pages</CardTitle>
                                    <CardDescription>Top 10 most active sections</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={metrics.mostVisitedSections} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                                            <XAxis type="number" hide />
                                            <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px' }} />
                                            <Bar dataKey="visits" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                                                {metrics.mostVisitedSections.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={index < 3 ? '#8b5cf6' : '#a78bfa'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Users Tab */}
                    <TabsContent value="users" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent User Signups</CardTitle>
                                <CardDescription>Latest user registrations</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-4">Email</th>
                                                <th className="text-left py-3 px-4">Signup Date</th>
                                                <th className="text-left py-3 px-4">ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {metrics.recentSignups.map((user) => (
                                                <tr key={user.id} className="border-b hover:bg-muted/50">
                                                    <td className="py-3 px-4">{user.email}</td>
                                                    <td className="py-3 px-4">
                                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </td>
                                                    <td className="py-3 px-4 text-xs text-muted-foreground">{user.id.slice(0, 8)}...</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Monthly Growth</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{metrics.monthlyNewUsers}</div>
                                    <p className="text-sm text-muted-foreground mt-1">New users (30 days)</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Weekly Growth</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{metrics.weeklyNewUsers}</div>
                                    <p className="text-sm text-muted-foreground mt-1">New users (7 days)</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Daily Growth</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{metrics.dailyNewUsers}</div>
                                    <p className="text-sm text-muted-foreground mt-1">New users (24 hours)</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Subscriptions Tab */}
                    <TabsContent value="subscriptions" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Total Active</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{metrics.activeSubscriptions.total}</div>
                                    <p className="text-sm text-muted-foreground mt-1">All active plans</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Basic Plans</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-purple-600">{metrics.activeSubscriptions.basic}</div>
                                    <p className="text-sm text-muted-foreground mt-1">$9.99/month</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Slim Plans</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-pink-600">{metrics.activeSubscriptions.slim}</div>
                                    <p className="text-sm text-muted-foreground mt-1">$23.90/3 months</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Full Plans</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-amber-600">{metrics.activeSubscriptions.full}</div>
                                    <p className="text-sm text-muted-foreground mt-1">$39.90/year</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Subscription Management</CardTitle>
                                <CardDescription>View and manage all user subscriptions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="relative mb-4 max-w-md">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                    <Input
                                        type="search"
                                        value={subscriptionSearch}
                                        onChange={(e) => setSubscriptionSearch(e.target.value)}
                                        placeholder="Search by email…"
                                        className="pl-9 pr-9"
                                        aria-label="Search subscriptions by email"
                                    />
                                    {subscriptionSearch && (
                                        <button
                                            type="button"
                                            onClick={() => setSubscriptionSearch('')}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                                            aria-label="Clear search"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                {subscriptionSearch.trim() && (
                                    <p className="mb-3 text-sm text-muted-foreground">
                                        Showing {filteredSubscriptions.length} of {subscriptions.length} subscription
                                        {subscriptions.length === 1 ? '' : 's'}
                                    </p>
                                )}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-4">User</th>
                                                <th className="text-left py-3 px-4">Plan</th>
                                                <th className="text-left py-3 px-4">Status</th>
                                                <th className="text-left py-3 px-4">Renewal Date</th>
                                                <th className="text-left py-3 px-4">Cancellation</th>
                                                <th className="text-left py-3 px-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSubscriptions.map((sub) => (
                                                <tr key={sub.id} className="border-b hover:bg-muted/50">
                                                    <td className="py-3 px-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{sub.profiles?.full_name || 'User'}</span>
                                                            <span className="text-xs text-muted-foreground">{sub.profiles?.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="capitalize">{sub.plan_type}</span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            sub.status === 'active' ? 'bg-green-100 text-green-700' :
                                                            sub.status === 'trialing' ? 'bg-blue-100 text-blue-700' :
                                                            sub.status === 'canceled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                                        }`}>
                                                            {sub.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {sub.expires_at ? new Date(sub.expires_at).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {sub.cancel_at_period_end ? (
                                                            <span className="text-amber-600 text-xs flex flex-col">
                                                                <span>Scheduled</span>
                                                                <span>{sub.cancel_at ? new Date(sub.cancel_at).toLocaleDateString() : ''}</span>
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted-foreground text-xs">No</span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {(sub.status === 'active' || sub.status === 'trialing') && !sub.cancel_at_period_end && (
                                                            <button
                                                                style={{
                                                                    fontSize: '12px',
                                                                    fontWeight: 500,
                                                                    padding: '4px 10px',
                                                                    borderRadius: '6px',
                                                                    border: '1px solid #ef4444',
                                                                    color: '#ef4444',
                                                                    background: 'transparent',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 150ms',
                                                                }}
                                                                onMouseEnter={e => {
                                                                    (e.currentTarget as HTMLButtonElement).style.background = '#ef4444';
                                                                    (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                                                                }}
                                                                onMouseLeave={e => {
                                                                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                                                                    (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
                                                                }}
                                                                onClick={() => handleCancelSubscription(sub.user_id)}
                                                                disabled={isActionLoading === sub.user_id}
                                                            >
                                                                {isActionLoading === sub.user_id ? '...' : 'Cancel'}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredSubscriptions.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                                        {subscriptionSearch.trim()
                                                            ? `No subscriptions match “${subscriptionSearch.trim()}”`
                                                            : 'No subscriptions found'}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Content Analytics Tab */}
                    <TabsContent value="content" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Interaction Analysis</CardTitle>
                                <CardDescription>Free vs Premium content clicks</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        Track which content blocks users interact with to understand feature engagement.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                            <h4 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-400">Free Content Clicks</h4>
                                            <div className="text-4xl font-bold text-green-600 dark:text-green-500">TBD</div>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Tracked via Mixpanel "Free Content Clicked" events
                                            </p>
                                        </div>

                                        <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                            <h4 className="text-lg font-semibold mb-2 text-amber-700 dark:text-amber-400">Premium Content Clicks</h4>
                                            <div className="text-4xl font-bold text-amber-600 dark:text-amber-500">TBD</div>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Tracked via Mixpanel "Premium Content Clicked" events
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                                        <p className="text-sm">
                                            <strong>Implementation Note:</strong> Content click tracking is set up in the codebase.
                                            As users interact with premium features, data will populate automatically via Mixpanel.
                                            You'll need to add tracking calls in Dashboard components for locked premium features.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Page Analytics</CardTitle>
                                <CardDescription>Most visited sections and user behavior</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {metrics.mostVisitedSections.map((section, index) => (
                                        <div key={section.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <span className="text-sm font-bold">{index + 1}</span>
                                                </div>
                                                <span className="font-medium">{section.name}</span>
                                            </div>
                                            <span className="text-muted-foreground">{section.visits} visits</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Admin Actions */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Admin Actions</CardTitle>
                            <CardDescription>Quick access to common admin tasks</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => window.open('https://mixpanel.com/project/3978742', '_blank')}
                                >
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    Open Mixpanel Dashboard
                                </Button>
                                <Button variant="outline" onClick={fetchAnalytics}>
                                    <Activity className="mr-2 h-4 w-4" />
                                    Refresh Analytics
                                </Button>
                                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                                    Return to User Dashboard
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Tabs>
            </div>

            {/* ── Cancel Subscription Confirmation Modal ── */}
            {cancelModal && (
                <div
                    style={{
                        position: 'fixed', inset: 0, zIndex: 1000,
                        background: 'rgba(15, 23, 42, 0.55)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '16px',
                        backdropFilter: 'blur(4px)',
                    }}
                    onClick={() => setCancelModal(null)}
                >
                    <div
                        style={{
                            background: '#ffffff',
                            borderRadius: '16px',
                            padding: '32px',
                            maxWidth: '420px',
                            width: '100%',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
                            border: '1px solid #e5e7eb',
                            color: '#111827',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Icon */}
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '50%',
                                background: '#fee2e2', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto',
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#111827' }}>
                            Cancel Subscription
                        </h2>

                        {/* Body */}
                        <p style={{ textAlign: 'center', fontSize: '14px', color: '#4b5563', marginBottom: '8px' }}>
                            Are you sure you want to cancel the subscription for:
                        </p>
                        <p style={{
                            textAlign: 'center', fontSize: '14px', fontWeight: 600,
                            background: '#f3f4f6', borderRadius: '8px',
                            padding: '8px 12px', marginBottom: '20px',
                            wordBreak: 'break-all', color: '#111827',
                            border: '1px solid #e5e7eb',
                        }}>
                            {cancelModal.email}
                        </p>
                        <p style={{
                            textAlign: 'left', fontSize: '13px', color: '#374151', marginBottom: '24px',
                            background: '#fff7ed', border: '1px solid #fed7aa',
                            borderRadius: '10px', padding: '12px 14px', lineHeight: 1.5,
                        }}>
                            The user keeps access until the end of their current period (including the $0.99 trial). This stops the upcoming $6.99 renewal. They will receive a cancellation email.
                        </p>

                        {/* Buttons */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setCancelModal(null)}
                                style={{
                                    flex: 1, padding: '10px', borderRadius: '8px',
                                    border: '1px solid #d1d5db', background: '#f9fafb',
                                    fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                                    color: '#111827',
                                }}
                            >
                                Keep Subscription
                            </button>
                            <button
                                onClick={confirmCancelSubscription}
                                style={{
                                    flex: 1, padding: '10px', borderRadius: '8px',
                                    border: 'none', background: '#ef4444',
                                    fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                                    color: '#ffffff',
                                }}
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
