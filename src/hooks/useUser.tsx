import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'

export interface UserProfile {
  id: string
  full_name: string | null
  email: string | null
  avatar_url: string | null
  dob?: string | null
  balance?: number
  free_messages_count?: number
}

export interface UserSubscription {
  id: string
  user_id: string
  status: string
  plan_type: string
  expires_at: string | null
  cancel_at_period_end: boolean
  cancel_at: string | null
  current_period_start: string | null
  current_period_end: string | null
}

type UserContextValue = {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  subscription: UserSubscription | null
  isPremium: boolean
  loading: boolean
  refetch: () => Promise<void>
}

const PREMIUM_PLANS = new Set([
  'trial',
  'basic',
  'slim',
  'full',
  'premium',
  'discovery',
  'growth',
  'bestvalue',
  'popular',
  'fullaccess',
  'trial_1week',
  'plan_4week',
  'premium_12week',
  'full_access_7day',
  '99.9',
])

const PREMIUM_STATUSES = new Set(['active', 'trialing', 'past_due'])

const UserContext = createContext<UserContextValue | undefined>(undefined)

function isPremiumSubscription(sub: UserSubscription | null) {
  if (!sub) return false
  return (
    PREMIUM_PLANS.has(sub.plan_type?.toLowerCase()) &&
    PREMIUM_STATUSES.has(sub.status?.toLowerCase())
  )
}

async function loadUserRows(userId: string) {
  const [profileRes, subRes] = await Promise.all([
    supabase
      .from('profiles')
      .select('id,full_name,email,avatar_url,dob,balance,free_messages_count')
      .eq('id', userId)
      .maybeSingle(),
    supabase.from('subscriptions').select('*').eq('user_id', userId).maybeSingle(),
  ])

  return {
    profile: (profileRes.data as UserProfile | null) ?? null,
    subscription: (subRes.data as UserSubscription | null) ?? null,
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [loading, setLoading] = useState(true)
  const userIdRef = useRef<string | null>(null)

  const applySession = useCallback(async (next: Session | null) => {
    setSession(next)
    const nextUser = next?.user ?? null
    setUser(nextUser)
    userIdRef.current = nextUser?.id ?? null

    if (!nextUser) {
      setProfile(null)
      setSubscription(null)
      return
    }

    try {
      const rows = await loadUserRows(nextUser.id)
      if (userIdRef.current !== nextUser.id) return
      setProfile(rows.profile)
      setSubscription(rows.subscription)
    } catch {
      if (userIdRef.current !== nextUser.id) return
      setProfile(null)
      setSubscription(null)
    }
  }, [])

  useEffect(() => {
    let alive = true

    supabase.auth.getSession().then(async ({ data: { session: initial } }) => {
      if (!alive) return
      await applySession(initial ?? null)
      if (alive) setLoading(false)

      const hash = window.location.hash
      if (hash.includes('access_token=') || hash.includes('error=')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    })

    const {
      data: { subscription: authSub },
    } = supabase.auth.onAuthStateChange((_event, current) => {
      void applySession(current)
    })

    return () => {
      alive = false
      authSub.unsubscribe()
    }
  }, [applySession])

  const refetch = useCallback(async () => {
    if (user) await applySession(session)
  }, [applySession, session, user])

  const value = useMemo<UserContextValue>(
    () => ({
      user,
      session,
      profile,
      subscription,
      isPremium: isPremiumSubscription(subscription),
      loading,
      refetch,
    }),
    [user, session, profile, subscription, loading, refetch],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error('useUser must be used within UserProvider')
  }
  return ctx
}
