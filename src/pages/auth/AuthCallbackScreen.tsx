import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { AuthLayout } from './AuthLayout'
import bgSignInEmail from './assets/bg-signin-email.png'
import { getPostAuthPath, parseAuthCallbackError, readStoredAuth } from './authActions'

/**
 * Lands from Google / Apple / magic-link / reset emails.
 * Supabase writes the session from the URL; we route on the result.
 */
export function AuthCallbackScreen() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [status, setStatus] = useState('Signing you in…')
  const done = useRef(false)

  useEffect(() => {
    const next = getPostAuthPath(`?${params.toString()}`)
    const { email, purpose } = readStoredAuth()
    const parsed = parseAuthCallbackError(window.location.search, window.location.hash)

    const succeed = (session: Session) => {
      if (done.current) return
      done.current = true
      navigate(next, { replace: true })
    }

    const fail = (expired: boolean, message?: string) => {
      if (done.current) return
      done.current = true
      if (message && !expired) toast.error(message)
      navigate(expired ? '/login/check?expired=1' : '/login', {
        replace: true,
        state: { email, purpose },
      })
    }

    if (parsed.error) {
      fail(parsed.expired, parsed.description)
      return
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY' || event === 'USER_UPDATED') {
        if (session) succeed(session)
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) succeed(session)
      else setStatus('Waiting for your session…')
    })

    const t = window.setTimeout(() => fail(true), 8000)

    return () => {
      window.clearTimeout(t)
      subscription.unsubscribe()
    }
  }, [navigate, params])

  return (
    <AuthLayout bg={bgSignInEmail} name="Sign in · Callback" centered>
      <section className="soul-auth__hero soul-auth__hero--center">
        <h1 className="soul-auth__title">One moment</h1>
        <p className="soul-auth__subtitle">{status}</p>
      </section>
    </AuthLayout>
  )
}
