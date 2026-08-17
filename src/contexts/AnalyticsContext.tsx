import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import * as analytics from '@/lib/mixpanel';
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsContextType {
    trackEvent: typeof analytics.trackEvent;
    trackContentClick: typeof analytics.trackContentClick;
    trackPremiumFeatureLocked: typeof analytics.trackPremiumFeatureLocked;
    trackProfileUpdate: typeof analytics.trackProfileUpdate;
    trackMatrixSaved: typeof analytics.trackMatrixSaved;
    trackMatrixDeleted: typeof analytics.trackMatrixDeleted;
    trackDiaryEntry: typeof analytics.trackDiaryEntry;
    trackCompatibilityCheck: typeof analytics.trackCompatibilityCheck;
    trackPlanSelected: typeof analytics.trackPlanSelected;
    trackPurchaseInitiated: typeof analytics.trackPurchaseInitiated;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within AnalyticsProvider');
    }
    return context;
};

// Helper function moved outside to fix Vite Fast Refresh warning
function getPageName(pathname: string): string {
    const routes: Record<string, string> = {
        '/': 'Home',
        '/calculator': 'Calculator',
        '/rates': 'Rates',
        '/blog': 'Blog',
        '/about': 'About',
        '/faq': 'FAQ',
        '/privacy': 'Privacy Policy',
        '/terms': 'Terms & Conditions',
        '/contact': 'Contact us',
        '/avatar': 'My Avatar',
        '/account': 'My Account',
        '/auth': 'Authentication',
        '/dashboard': 'Dashboard',
        '/profile': 'Profile',
        '/compatibility': 'Compatibility',
        '/compatibility-result': 'Compatibility Result',
        '/premium-welcome': 'Premium Welcome',
        '/admin': 'Admin Dashboard',
    };

    return routes[pathname] || pathname;
}

interface AnalyticsProviderProps {
    children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
    const location = useLocation();
    const { user, profile, subscription } = useUser();

    // Identify user when authenticated
    useEffect(() => {
        if (user && profile) {
            analytics.identifyUser(user.id, {
                email: profile.email,
                full_name: profile.full_name,
                plan_type: subscription?.plan_type || 'free',
                subscription_status: subscription?.status || 'none',
                created_at: user.created_at,
            });
        }
        // Don't reset user on else, to keep anonymous history
    }, [user, profile, subscription]);

    // Use refs to access latest user/subscription state inside effect without triggering it
    const userRef = React.useRef(user);
    const subscriptionRef = React.useRef(subscription);

    useEffect(() => {
        userRef.current = user;
        subscriptionRef.current = subscription;
    }, [user, subscription]);

    // Track page views on route change (Mixpanel + Supabase)
    useEffect(() => {
        const pageName = getPageName(location.pathname);
        const currentUser = userRef.current;
        const currentSubscription = subscriptionRef.current;

        console.log(`[Analytics] Tracking page view: ${pageName} (${location.pathname})`);

        // 1. Mixpanel Tracking
        analytics.trackPageView(pageName, location.pathname, {
            user_id: currentUser?.id,
            user_plan: currentSubscription?.plan_type || 'free',
        });

        // 2. Supabase Tracking (Page Visits)
        const trackSupabaseVisit = async () => {
            try {
                const { error } = await supabase.from('page_visits').insert({
                    user_id: currentUser?.id || null,
                    page_path: pageName
                });
                if (error) {
                    // Silence common tracking errors (like ad-blockers) in production
                    if (import.meta.env.DEV) {
                        console.warn('[Analytics] Supabase tracking issue:', error.message);
                    }
                }
            } catch (err: any) {
                // If the request is blocked by an ad-blocker, it throws a fetch error
                if (import.meta.env.DEV) {
                    console.warn('[Analytics] Tracking request was blocked or failed:', err.message);
                }
            }
        };

        trackSupabaseVisit();

    }, [location.pathname, location.search]);

    const value: AnalyticsContextType = {
        trackEvent: analytics.trackEvent,
        trackContentClick: analytics.trackContentClick,
        trackPremiumFeatureLocked: analytics.trackPremiumFeatureLocked,
        trackProfileUpdate: analytics.trackProfileUpdate,
        trackMatrixSaved: analytics.trackMatrixSaved,
        trackMatrixDeleted: analytics.trackMatrixDeleted,
        trackDiaryEntry: analytics.trackDiaryEntry,
        trackCompatibilityCheck: analytics.trackCompatibilityCheck,
        trackPlanSelected: analytics.trackPlanSelected,
        trackPurchaseInitiated: analytics.trackPurchaseInitiated,
    };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );

    // Helper function moved inside to fix Vite Fast Refresh warning
    function getPageName(pathname: string): string {
        const routes: Record<string, string> = {
            '/': 'Home',
            '/calculator': 'Calculator',
            '/rates': 'Rates',
            '/blog': 'Blog',
            '/about': 'About',
            '/faq': 'FAQ',
            '/privacy': 'Privacy Policy',
            '/terms': 'Terms & Conditions',
            '/contact': 'Contact us',
            '/avatar': 'My Avatar',
            '/account': 'My Account',
            '/auth': 'Authentication',
            '/dashboard': 'Dashboard',
            '/profile': 'Profile',
            '/compatibility': 'Compatibility',
            '/compatibility-result': 'Compatibility Result',
            '/premium-welcome': 'Premium Welcome',
            '/admin': 'Admin Dashboard',
        };

        return routes[pathname] || pathname;
    }
};
