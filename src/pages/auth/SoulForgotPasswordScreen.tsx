import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulButton, SoulField } from '@/components/soul'
import { AuthLayout } from './AuthLayout'
import { isValidEmail } from './authValidation'
import bgSignInEmail from './assets/bg-signin-email.png'
import {
  authErrorMessage,
  getPostAuthPath,
  readStoredAuth,
  sendAuthEmail,
} from './authActions'
import { useLeaveIfSignedIn } from './useLeaveIfSignedIn'

export function SoulForgotPasswordScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const stored = readStoredAuth()
  const preset = (location.state as { email?: string } | null)?.email ?? stored.email
  const [email, setEmail] = useState(preset)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const emailOk = isValidEmail(email)
  useLeaveIfSignedIn()

  useEffect(() => {
    if (preset) setEmail(preset)
  }, [preset])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (!emailOk) return
    setLoading(true)
    try {
      const trimmed = email.trim()
      await sendAuthEmail(trimmed, 'reset', getPostAuthPath(location.search))
      navigate('/login/check', { state: { email: trimmed, purpose: 'reset' } })
    } catch (err) {
      toast.error(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout bg={bgSignInEmail} name="Forgot password">
      <section className="soul-auth__hero">
        <h1 className="soul-auth__title">Forgot your password?</h1>
        <p className="soul-auth__subtitle">
          Enter the email on this account — I’ll send a reset link.
        </p>
      </section>

      <form className="soul-auth__stack soul-auth__stack--form" onSubmit={onSubmit} noValidate>
        <SoulField
          htmlFor="soul-auth-link-email"
          label="Your email"
          tone={submitted && !emailOk ? 'error' : 'none'}
          message={submitted && !emailOk ? 'Enter a valid email.' : undefined}
          inputProps={{
            id: 'soul-auth-link-email',
            size: 'lg',
            type: 'email',
            name: 'email',
            autoComplete: 'email',
            inputMode: 'email',
            placeholder: 'name@email.com',
            value: email,
            onChange: (e) => setEmail(e.target.value),
          }}
        />

        <SoulButton type="submit" block disabled={!email.trim()} loading={loading}>
          Send reset link
        </SoulButton>

        <Link to="/login/email" className="soul-auth__alt">
          Back to sign in
        </Link>
      </form>
    </AuthLayout>
  )
}
