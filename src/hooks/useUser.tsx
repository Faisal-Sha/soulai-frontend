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
import { upsertDestinyMetrics } from '@/services/destinyMetrics'

export interface UserProfile {
  id: string
  auth_user_id?: string | null
  full_name: string | null
  email: string | null
  avatar_url: string | null
  dob?: string | null
  birth_place?: string | null
  birth_time?: string | null
  quiz_completed_at?: string | null
  know_answers: Record<string, string>
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
  created_at: string | null
}

export type IdentityPatch = {
  full_name: string
  birth_date: string | null
  birth_time: string | null
  birth_place: string | null
}

type UserContextValue = {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  subscription: UserSubscription | null
  isPremium: boolean
  loading: boolean
  refetch: () => Promise<void>
  saveKnowAnswer: (questionId: string, answer: string) => Promise<void>
  updateIdentity: (patch: IdentityPatch) => Promise<void>
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

function asKnowAnswers(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof value === 'string' && value.trim()) out[key] = value.trim()
  }
  return out
}

function oauthPicture(user: User) {
  const meta = user.user_metadata ?? {}
  const picture = meta.avatar_url || meta.picture
  return typeof picture === 'string' && picture.trim() ? picture.trim() : null
}

function oauthName(user: User) {
  const meta = user.user_metadata ?? {}
  const name = meta.full_name || meta.name
  return typeof name === 'string' && name.trim() ? name.trim() : null
}

function mapSoulProfile(row: Record<string, unknown> | null, user?: User | null): UserProfile | null {
  if (!row) return null
  const birthDate = typeof row.birth_date === 'string' ? row.birth_date : null
  return {
    id: String(row.id),
    auth_user_id: typeof row.auth_user_id === 'string' ? row.auth_user_id : null,
    full_name: (typeof row.full_name === 'string' ? row.full_name : null) || (user ? oauthName(user) : null),
    email: typeof row.email === 'string' ? row.email : null,
    avatar_url:
      (typeof row.avatar_url === 'string' ? row.avatar_url : null) || (user ? oauthPicture(user) : null),
    dob: birthDate,
    birth_place: typeof row.birth_place === 'string' ? row.birth_place : null,
    birth_time: typeof row.birth_time === 'string' ? row.birth_time : null,
    quiz_completed_at: typeof row.quiz_completed_at === 'string' ? row.quiz_completed_at : null,
    know_answers: asKnowAnswers(row.know_answers),
  }
}

function mergeQuizAnswers(
  raw: unknown,
  patch: IdentityPatch,
): Record<string, unknown> {
  const qa =
    raw && typeof raw === 'object' && !Array.isArray(raw)
      ? { ...(raw as Record<string, unknown>) }
      : {}

  qa.name = patch.full_name

  if (patch.birth_date) {
    const [year, month, day] = patch.birth_date.split('-')
    qa.birthdate = {
      day: String(Number(day)),
      month: String(Number(month)),
      year,
    }
  }

  if (patch.birth_time) {
    qa['birth-time'] = patch.birth_time.slice(0, 5)
    qa['birth-time-known'] = 'yes'
  } else {
    qa['birth-time-known'] = 'no'
    delete qa['birth-time']
  }

  if (patch.birth_place) {
    qa['birth-place'] = patch.birth_place
  } else {
    delete qa['birth-place']
  }

  return qa
}

function asTimeValue(raw: string | null): string | null {
  if (!raw) return null
  const trimmed = raw.trim()
  if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(trimmed)) return null
  const [h, m, s] = trimmed.split(':')
  const hour = Number(h)
  const minute = Number(m)
  if (hour > 23 || minute > 59) return null
  return `${String(hour).padStart(2, '0')}:${m}${s ? `:${s}` : ':00'}`
}

async function loadUserRows(user: User) {
  const profileRes = await supabase
    .from('soul_profiles')
    .select(
      'id,auth_user_id,full_name,email,avatar_url,birth_date,birth_place,birth_time,quiz_completed_at,know_answers',
    )
    .eq('auth_user_id', user.id)
    .maybeSingle()

  const row = (profileRes.data as Record<string, unknown> | null) ?? null
  const profile = mapSoulProfile(row, user)

  const backfill: Record<string, string> = {}
  const picture = oauthPicture(user)
  const name = oauthName(user)
  const rowAvatar = typeof row?.avatar_url === 'string' ? row.avatar_url.trim() : ''
  const rowName = typeof row?.full_name === 'string' ? row.full_name.trim() : ''
  if (profile && picture && !rowAvatar) backfill.avatar_url = picture
  if (profile && name && !rowName) backfill.full_name = name
  if (Object.keys(backfill).length) {
    void supabase.from('soul_profiles').update(backfill).eq('auth_user_id', user.id)
  }

  let subscription: UserSubscription | null = null
  if (profile) {
    const subRes = await supabase
      .from('subscriptions')
      .select(
        'owner_profile_id,status,plan_type,expires_at,cancel_at_period_end,cancel_at,current_period_start,current_period_end,created_at',
      )
      .eq('owner_profile_id', profile.id)
      .maybeSingle()
    const sub = subRes.data as Record<string, unknown> | null
    if (sub) {
      subscription = {
        id: String(sub.owner_profile_id),
        user_id: user.id,
        status: typeof sub.status === 'string' ? sub.status : '',
        plan_type: typeof sub.plan_type === 'string' ? sub.plan_type : '',
        expires_at: typeof sub.expires_at === 'string' ? sub.expires_at : null,
        cancel_at_period_end: Boolean(sub.cancel_at_period_end),
        cancel_at: typeof sub.cancel_at === 'string' ? sub.cancel_at : null,
        current_period_start:
          typeof sub.current_period_start === 'string' ? sub.current_period_start : null,
        current_period_end:
          typeof sub.current_period_end === 'string' ? sub.current_period_end : null,
        created_at: typeof sub.created_at === 'string' ? sub.created_at : null,
      }
    }
  }

  return {
    profile,
    subscription,
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
      const rows = await loadUserRows(nextUser)
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

  const saveKnowAnswer = useCallback(
    async (questionId: string, answer: string) => {
      if (!user) throw new Error('Not signed in')
      const trimmed = answer.trim()
      const next = { ...(profile?.know_answers ?? {}) }
      if (trimmed) next[questionId] = trimmed
      else delete next[questionId]

      const { error } = await supabase
        .from('soul_profiles')
        .update({ know_answers: next })
        .eq('auth_user_id', user.id)
      if (error) throw error

      setProfile((prev) => (prev ? { ...prev, know_answers: next } : prev))
    },
    [profile?.know_answers, user],
  )

  const updateIdentity = useCallback(
    async (patch: IdentityPatch) => {
      if (!user) throw new Error('Not signed in')
      if (!profile) throw new Error('Profile not found')

      const birthTime = asTimeValue(patch.birth_time)
      const birthDate = patch.birth_date?.trim() || null
      const birthPlace = patch.birth_place?.trim() || null
      const fullName = patch.full_name.trim()
      if (!fullName) throw new Error('Name is required')

      const { data: current, error: readErr } = await supabase
        .from('soul_profiles')
        .select('quiz_answers')
        .eq('auth_user_id', user.id)
        .maybeSingle()
      if (readErr) throw readErr

      const quiz_answers = mergeQuizAnswers(current?.quiz_answers, {
        full_name: fullName,
        birth_date: birthDate,
        birth_time: birthTime,
        birth_place: birthPlace,
      })

      const { error } = await supabase
        .from('soul_profiles')
        .update({
          full_name: fullName,
          birth_date: birthDate,
          birth_time: birthTime,
          birth_place: birthPlace,
          quiz_answers,
        })
        .eq('auth_user_id', user.id)
      if (error) throw error

      if (birthDate) {
        try {
          await upsertDestinyMetrics(supabase, profile.id, birthDate)
        } catch (metricsErr) {
          console.error('[destiny-metrics]', metricsErr)
        }
      }

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              full_name: fullName,
              dob: birthDate,
              birth_time: birthTime,
              birth_place: birthPlace,
            }
          : prev,
      )
    },
    [profile, user],
  )

  const value = useMemo<UserContextValue>(
    () => ({
      user,
      session,
      profile,
      subscription,
      isPremium: isPremiumSubscription(subscription),
      loading,
      refetch,
      saveKnowAnswer,
      updateIdentity,
    }),
    [user, session, profile, subscription, loading, refetch, saveKnowAnswer, updateIdentity],
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
