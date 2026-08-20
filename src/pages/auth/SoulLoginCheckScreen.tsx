import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulButton } from '@/components/soul'
import { AuthLayout } from './AuthLayout'
import bgSignInEmail from './assets/bg-signin-email.png'
import {
  authErrorMessage,
  getPostAuthPath,
  readStoredAuth,
  sendAuthEmail,
  type AuthLinkPurpose,
} from './authActions'
import { useLeaveIfSignedIn } from './useLeaveIfSignedIn'

const RESEND_SECONDS = 45

type CheckState = {
  email?: string
  purpose?: AuthLinkPurpose
}

/**
 * Figma DEV · Sign in · Check your email (952:6382)
 * Expired variant (952:6482) via ?expired=1
 */
export function SoulLoginCheckScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const stored = readStoredAuth()
  const fromState = (location.state as CheckState | null) ?? {}
  const email = fromState.email || stored.email
  const purpose: AuthLinkPurpose = fromState.purpose || stored.purpose
  const expired = params.get('expired') === '1'
  const backTo = purpose === 'reset' ? '/forgot-password' : '/login/email'
  useLeaveIfSignedIn()

  const [seconds, setSeconds] = useState(expired ? 0 : RESEND_SECONDS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!email) navigate(backTo, { replace: true })
  }, [email, backTo, navigate])

  useEffect(() => {
    if (seconds <= 0) return
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => window.clearTimeout(t)
  }, [seconds])

  const waiting = seconds > 0 && !expired
  const title = expired ? 'That link has expired' : 'Check your email'
  const cta = expired ? 'Send a new link' : 'Resend link'

  const body = useMemo(() => {
    if (!email) return ''
    return `I sent a link to ${email}. It works once and expires in 15 minutes.`
  }, [email])

  const resend = async () => {
    if (waiting || loading || !email) return
    setLoading(true)
    try {
      await sendAuthEmail(email, purpose, getPostAuthPath(location.search))
      toast.success('I sent a new link.')
      setSeconds(RESEND_SECONDS)
      if (expired) {
        navigate('/login/check', { replace: true, state: { email, purpose } })
      }
    } catch (err) {
      toast.error(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout bg={bgSignInEmail} name="Sign in · Check your email" centered>
      <div className="soul-auth__check">
        <section className="soul-auth__hero soul-auth__hero--center">
          <h1 className="soul-auth__title">{title}</h1>
          <p className="soul-auth__subtitle">{body}</p>
        </section>

        <div className="soul-auth__stack soul-auth__stack--check">
          <SoulButton type="button" block disabled={waiting} loading={loading} onClick={() => void resend()}>
            {cta}
          </SoulButton>
          {waiting ? <p className="soul-auth__wait">Send again in {seconds}s</p> : null}
          <Link to={backTo} state={{ email }} className="soul-auth__alt">
            Use a different email
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
