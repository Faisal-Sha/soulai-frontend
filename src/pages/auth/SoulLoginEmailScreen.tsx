import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulButton, SoulField } from '@/components/soul'
import iconArrowLink from '@/components/soul/assets/icon-arrow-link.svg'
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

/**
 * Figma DEV · Sign in · Email (952:6107)
 */
export function SoulLoginEmailScreen() {
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
      await sendAuthEmail(trimmed, 'login', getPostAuthPath(location.search))
      navigate('/login/check', { state: { email: trimmed, purpose: 'login' } })
    } catch (err) {
      toast.error(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout bg={bgSignInEmail} name="Sign in · Email">
      <section className="soul-auth__hero">
        <h1 className="soul-auth__title">Welcome back</h1>
        <p className="soul-auth__subtitle">
          Use the email you gave me when I wrote your reading.
        </p>
      </section>

      <form className="soul-auth__stack soul-auth__stack--form" onSubmit={onSubmit} noValidate>
        <SoulField
          htmlFor="soul-auth-email"
          label="Your email"
          tone={submitted && !emailOk ? 'error' : 'none'}
          message={submitted && !emailOk ? 'Enter a valid email.' : undefined}
          inputProps={{
            id: 'soul-auth-email',
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
          Send me a link
        </SoulButton>

        <Link to="/quiz/welcome" className="soul-auth__quiz">
          <span>
            New here? <u>Take the quiz</u>
          </span>
          <img src={iconArrowLink} alt="" width={15} height={15} />
        </Link>
      </form>
    </AuthLayout>
  )
}
