import { supabase } from '@/integrations/supabase/client'

export type OAuthProvider = 'google' | 'apple'
export type AuthLinkPurpose = 'login' | 'reset'

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
  if (redirect?.startsWith('/') && !redirect.startsWith('//')) return redirect
  return '/'
}

export function authCallbackUrl(redirectPath?: string) {
  const url = new URL('/login/callback', window.location.origin)
  const next = redirectPath || getPostAuthPath()
  if (next !== '/') url.searchParams.set('redirect', next)
  return url.toString()
}

export function authErrorMessage(err: unknown) {
  const raw = err instanceof Error ? err.message : String(err || 'Something went wrong')
  if (/signups not allowed/i.test(raw) || /user not found/i.test(raw)) {
    return 'I don’t have an account with that email. Take the quiz to start.'
  }
  if (/invalid login/i.test(raw)) return 'That didn’t work. Try the link again.'
  if (/rate limit|too many/i.test(raw)) return 'Too many tries. Wait a minute, then send another link.'
  return raw.replace(/loginfailed/gi, 'That didn’t work')
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
