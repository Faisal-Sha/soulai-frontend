import { getLocale, translate } from '@/i18n'
import { supabase } from '@/integrations/supabase/client'

export type OAuthProvider = 'google' | 'apple'
export type AuthLinkPurpose = 'login' | 'reset'

export const APP_HOME = '/'
export const QUIZ_START = '/quiz/welcome'
/** Magic-link lifetime. Must match supabase/config.toml [auth.email] otp_expiry. */
export const MAGIC_LINK_HOURS = 24

const EMAIL_KEY = 'soul-auth-email'
const PURPOSE_KEY = 'soul-auth-purpose'

export function rememberAuthEmail(email: string, purpose: AuthLinkPurpose) {
  try {
    sessionStorage.setItem(EMAIL_KEY, email)
    sessionStorage.setItem(PURPOSE_KEY, purpose)
  } catch {
    /* ignore */
  }
}

export function readStoredAuth(): { email: string; purpose: AuthLinkPurpose } {
  try {
    const email = sessionStorage.getItem(EMAIL_KEY) ?? ''
    const purpose = sessionStorage.getItem(PURPOSE_KEY) === 'reset' ? 'reset' : 'login'
    return { email, purpose }
  } catch {
    return { email: '', purpose: 'login' }
  }
}

export function getPostAuthPath(search = window.location.search) {
  const redirect = new URLSearchParams(search).get('redirect')
  if (
    redirect?.startsWith('/') &&
    !redirect.startsWith('//') &&
    !redirect.startsWith('/login')
  ) {
    return redirect
  }
  return APP_HOME
}

export function authCallbackUrl(redirectPath?: string) {
  const url = new URL('/login/callback', window.location.origin)
  const next = redirectPath || getPostAuthPath()
  if (next !== APP_HOME) url.searchParams.set('redirect', next)
  return url.toString()
}

export function isQuizComplete(profile: { quiz_completed_at?: string | null } | null | undefined) {
  return Boolean(profile?.quiz_completed_at)
}

export function pathAfterSignIn(quizComplete: boolean, requested = APP_HOME) {
  if (!quizComplete) return QUIZ_START
  if (requested.startsWith('/quiz')) return APP_HOME
  return requested || APP_HOME
}

export async function resolveSignedInPath(userId: string, requested = APP_HOME) {
  const { data } = await supabase
    .from('soul_profiles')
    .select('quiz_completed_at')
    .eq('auth_user_id', userId)
    .maybeSingle()
  return pathAfterSignIn(Boolean(data?.quiz_completed_at), requested)
}

export function authErrorMessage(err: unknown) {
  const raw = err instanceof Error ? err.message : String(err || 'Something went wrong')
  if (/signups not allowed/i.test(raw) || /user not found/i.test(raw)) {
    const en = 'I don’t have an account with that email. Take the quiz and subscribe to start.'
    return getLocale() !== 'en' ? translate(getLocale(), 'auth.errors.noAccount', en) : en
  }
  if (/invalid login/i.test(raw)) {
    const en = 'That didn’t work. Try the link again.'
    return getLocale() !== 'en' ? translate(getLocale(), 'auth.errors.invalidLogin', en) : en
  }
  if (/rate limit|too many/i.test(raw)) {
    const en = 'Too many tries. Wait a minute, then send another link.'
    return getLocale() !== 'en' ? translate(getLocale(), 'auth.errors.rateLimit', en) : en
  }
  const fallback = raw.replace(/loginfailed/gi, 'That didn’t work')
  if (getLocale() !== 'en' && fallback === 'Something went wrong') {
    return translate(getLocale(), 'auth.errors.generic', 'Something went wrong')
  }
  return fallback
}

export async function signInWithOAuth(provider: OAuthProvider, redirectPath?: string) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: authCallbackUrl(redirectPath) },
  })
  if (error) throw error
}

export async function sendAuthEmail(email: string, purpose: AuthLinkPurpose, redirectPath?: string) {
  const redirectTo = authCallbackUrl(redirectPath)
  rememberAuthEmail(email, purpose)

  if (purpose === 'reset') {
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    if (error) throw error
    return
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: false,
    },
  })
  if (error) throw error
}

export function parseAuthCallbackError(search: string, hash: string) {
  const fromSearch = new URLSearchParams(search)
  const fromHash = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash)
  const code = fromSearch.get('error_code') || fromHash.get('error_code') || ''
  const error = fromSearch.get('error') || fromHash.get('error') || ''
  const description =
    fromSearch.get('error_description') || fromHash.get('error_description') || ''
  const expired = /expired|otp_expired/i.test(`${code} ${error} ${description}`)
  return { error, expired, description: description.replace(/\+/g, ' ') }
}
