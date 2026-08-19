import type { Session, User } from '@supabase/supabase-js'

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

/** V2 open mode — no auth session yet. Wire Supabase auth here when login ships. */
export function useUser() {
  return {
    user: null as User | null,
    session: null as Session | null,
    profile: null as UserProfile | null,
    subscription: null as UserSubscription | null,
    isPremium: false,
    loading: false,
    refetch: async () => {},
  }
}
