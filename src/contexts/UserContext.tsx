import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { features } from '@/config/features';
import { isMissingRelationError } from '@/lib/supabaseErrors';

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  dob?: string | null;
  balance?: number;
  free_messages_count?: number;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  status: string;
  plan_type: string;
  expires_at: string | null;
  cancel_at_period_end: boolean;
  cancel_at: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
}

interface UserContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  subscription: UserSubscription | null;
  isPremium: boolean;
  isAdmin: boolean;
  adminRole: string | null;
  loading: boolean;
  dataLoaded: boolean;
  sessionValidated: boolean;
  refetch: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const CACHE_KEY_PREFIX = 'soul_user_';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  
  // Initialize state from localStorage if available (stale-while-revalidate)
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    try {
      const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}profile`);
      return cached ? JSON.parse(cached) : null;
    } catch { return null; }
  });
  const [subscription, setSubscription] = useState<UserSubscription | null>(() => {
    try {
      const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}subscription`);
      return cached ? JSON.parse(cached) : null;
    } catch { return null; }
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionValidated, setSessionValidated] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [hasNetworkError, setHasNetworkError] = useState(false);
  const isFetchingRef = useRef<string | null>(null);
  const userRef = useRef<User | null>(null);
  const profileRef = useRef<UserProfile | null>(null);

  // Initial sticky premium check
  const [isPremiumSticky, setIsPremiumSticky] = useState(() => {
    return localStorage.getItem(`${CACHE_KEY_PREFIX}is_premium`) === 'true';
  });

  // Sync refs with state to avoid stale closures in effects
  useEffect(() => {
    userRef.current = user;
    profileRef.current = profile;
    
    // Persist to localStorage whenever state changes
    if (profile) localStorage.setItem(`${CACHE_KEY_PREFIX}profile`, JSON.stringify(profile));
    if (subscription) {
      localStorage.setItem(`${CACHE_KEY_PREFIX}subscription`, JSON.stringify(subscription));
      
      // Update sticky premium status
      const premiumPlans = [
        'trial', 'basic', 'slim', 'full', 'premium', 
        'discovery', 'growth', 'bestValue', 'popular', 'fullAccess',
        'trial_1week', 'plan_4week', 'premium_12week', 'full_access_7day', '99.9'
      ];
      const isActuallyPremium = premiumPlans.some(p => p.toLowerCase() === subscription.plan_type?.toLowerCase()) &&
                               ['active', 'trialing', 'past_due'].includes(subscription.status?.toLowerCase());
      
      if (isActuallyPremium) {
        localStorage.setItem(`${CACHE_KEY_PREFIX}is_premium`, 'true');
        setIsPremiumSticky(true);
      } else {
        localStorage.removeItem(`${CACHE_KEY_PREFIX}is_premium`);
        setIsPremiumSticky(false);
      }
    }
  }, [user, profile, subscription]);

  const fetchUserData = async (userId: string, retryCount = 0) => {
    if (isFetchingRef.current === userId && retryCount === 0) return;
    try {
      isFetchingRef.current = userId;
      console.log(`[UserProvider] Fetching data for: ${userId} (Attempt ${retryCount + 1})`);
      
      const [profileRes, subRes, adminRes] = await Promise.all([
        supabase.from('profiles')
          .select('id,full_name,email,avatar_url,dob,balance,free_messages_count')
          .eq('id', userId)
          .maybeSingle(),
        supabase.from('subscriptions')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle(),
        features.admin
          ? supabase.from('admins')
              .select('role, is_active')
              .eq('user_id', userId)
              .maybeSingle()
          : Promise.resolve({ data: null, error: null }),
      ]);

      // Reset network error on any successful communication
      setHasNetworkError(false);

      if (profileRes.error && isMissingRelationError(profileRes.error)) {
        const authUser = userRef.current;
        setProfile({
          id: userId,
          full_name: (authUser?.user_metadata?.full_name as string | undefined) ?? null,
          email: authUser?.email ?? null,
          avatar_url: (authUser?.user_metadata?.avatar_url as string | undefined) ?? null,
        });
      } else if (profileRes.error) {
        console.error('[UserProvider] Profile Fetch Error:', profileRes.error.message);
        if (profileRes.error.message.includes('fetch')) throw profileRes.error;
      } else if (profileRes.data) {
        setProfile(profileRes.data as any);
      } else {
        const authUser = userRef.current;
        setProfile({
          id: userId,
          full_name: (authUser?.user_metadata?.full_name as string | undefined) ?? null,
          email: authUser?.email ?? null,
          avatar_url: (authUser?.user_metadata?.avatar_url as string | undefined) ?? null,
        });
      }

      if (subRes.error && isMissingRelationError(subRes.error)) {
        setSubscription(null);
      } else if (subRes.error) {
        console.error('[UserProvider] Subscription Fetch Error:', subRes.error.message);
        if (subRes.error.message.includes('fetch')) throw subRes.error;
      } else if (subRes.data) {
        setSubscription(subRes.data as any);
      } else {
        setSubscription(null);
      }

      if (!features.admin || (adminRes.error && isMissingRelationError(adminRes.error))) {
        setIsAdmin(false);
        setAdminRole(null);
      } else if (adminRes.error) {
        console.error('[UserProvider] Admin Fetch Error:', adminRes.error.message);
        setIsAdmin(false);
        setAdminRole(null);
      } else if (adminRes.data) {
        const admin = adminRes.data as any;
        setIsAdmin(!!admin.is_active);
        setAdminRole(admin.is_active ? admin.role : null);
      } else {
        setIsAdmin(false);
        setAdminRole(null);
      }

      setDataLoaded(true);
    } catch (err: any) {
      console.error('[UserProvider] Network/Fetch error:', err);
      setHasNetworkError(true);

      // Retry logic for 525/Network errors
      if (retryCount < 2) {
        console.log(`[UserProvider] Retrying fetch in 3s...`);
        setTimeout(() => fetchUserData(userId, retryCount + 1), 3000);
      } else {
        // After 3 failed attempts, we mark data as loaded but rely on sticky cache
        console.warn('[UserProvider] Max retries reached. Falling back to cached state.');
        setDataLoaded(true);
      }
    } finally {
      isFetchingRef.current = null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // 1. Initial Session Check (Immediate)
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (!isMounted) return;

      // Clear hash if it contains auth info to prevent stale session warnings/loops
      if (window.location.hash && (window.location.hash.includes('access_token=') || window.location.hash.includes('error='))) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }

      if (initialSession?.user) {
        setUser(initialSession.user);
        setSession(initialSession);
        setSessionValidated(true);
        fetchUserData(initialSession.user.id);
      } else {
        setDataLoaded(true);
      }
      setLoading(false);
    });

    // 2. Continuous Auth Listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!isMounted) return;

        const currentUser = currentSession?.user ?? null;
        console.log('[UserProvider] Auth Event:', event);

        // Prevent infinite loops on TOKEN_REFRESHED if user is already set
        if (event === 'TOKEN_REFRESHED' && userRef.current?.id === currentUser?.id && profileRef.current) {
          console.log('[UserProvider] Skipping fetch for token refresh (user already loaded)');
          setSession(currentSession);
          return;
        }

        setUser(currentUser);
        setSession(currentSession);

        if (currentUser) {
          setSessionValidated(true);
          fetchUserData(currentUser.id);
        } else {
          // Clear everything on logout
          setProfile(null);
          setSubscription(null);
          setIsAdmin(false);
          setAdminRole(null);
          setSessionValidated(false);
          setLoading(false);
          setDataLoaded(true);
          
          // Clear cache
          localStorage.removeItem(`${CACHE_KEY_PREFIX}profile`);
          localStorage.removeItem(`${CACHE_KEY_PREFIX}subscription`);
        }
      }
    );

    return () => {
      isMounted = false;
      authSubscription.unsubscribe();
    };
  }, []);

  const refetch = async () => {
    if (user) await fetchUserData(user.id);
  };

  const premiumPlans = [
    'trial', 'basic', 'slim', 'full', 'premium', 
    'discovery', 'growth', 'bestValue', 'popular', 'fullAccess',
    'trial_1week', 'plan_4week', 'premium_12week', 'full_access_7day', '99.9'
  ];
  const isPremium = !!(subscription &&
    premiumPlans.some(p => p.toLowerCase() === subscription.plan_type?.toLowerCase()) &&
    ['active', 'trialing', 'past_due'].includes(subscription.status?.toLowerCase())) || (hasNetworkError && isPremiumSticky);

  // Debugging subscription state
  useEffect(() => {
    if (dataLoaded && user) {
      console.log('[UserProvider] Premium Check:', {
        userId: user.id,
        isPremium,
        hasSubscription: !!subscription,
        planType: subscription?.plan_type,
        status: subscription?.status,
        allowedPlans: premiumPlans
      });
    }
  }, [dataLoaded, user, isPremium, subscription]);

  const value = {
    user,
    session,
    profile,
    subscription,
    isPremium,
    isAdmin,
    adminRole,
    loading,
    dataLoaded,
    sessionValidated,
    refetch
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
