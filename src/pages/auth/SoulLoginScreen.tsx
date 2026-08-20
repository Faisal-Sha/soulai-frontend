import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import iconArrowLink from '@/components/soul/assets/icon-arrow-link.svg'
import iconGoogle from './assets/icon-google.svg'
import iconApple from './assets/icon-apple.svg'
import { AuthLayout } from './AuthLayout'
import bgSignIn from './assets/bg-signin.png'
import { authErrorMessage, getPostAuthPath, signInWithOAuth } from './authActions'
import { useLeaveIfSignedIn } from './useLeaveIfSignedIn'

/**
 * Figma DEV · Sign in (952:6129)
 */
export function SoulLoginScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [busy, setBusy] = useState<'google' | 'apple' | null>(null)
  useLeaveIfSignedIn()

  const redirectPath = getPostAuthPath(location.search)

  const onOAuth = async (provider: 'google' | 'apple') => {
    if (busy) return
    setBusy(provider)
    try {
      await signInWithOAuth(provider, redirectPath)
    } catch (err) {
      toast.error(authErrorMessage(err))
      setBusy(null)
    }
  }

  return (
    <AuthLayout bg={bgSignIn} name="Sign in">
      <section className="soul-auth__hero">
        <h1 className="soul-auth__title">Welcome back</h1>
        <p className="soul-auth__subtitle">
          Use the email you gave me when I wrote your reading.
        </p>
      </section>

      <div className="soul-auth__stack">
        <button
          type="button"
          className="soul-auth__social soul-auth__social--google"
          disabled={busy !== null}
          onClick={() => void onOAuth('google')}
        >
          <img src={iconGoogle} alt="" width={20} height={20} />
          Continue with Google
        </button>

        <button
          type="button"
          className="soul-auth__social soul-auth__social--apple"
          disabled={busy !== null}
          onClick={() => void onOAuth('apple')}
        >
          <img src={iconApple} alt="" width={20} height={20} />
          Continue with Apple
        </button>

        <div className="soul-auth__divider" role="separator">
          <span />
          <em>or</em>
          <span />
        </div>

        <button
          type="button"
          className="soul-auth__social soul-auth__social--email"
          onClick={() =>
            navigate({ pathname: '/login/email', search: location.search })
          }
        >
          Use email instead
        </button>

        <Link to="/quiz/welcome" className="soul-auth__quiz">
          <span>
            New here? <u>Take the quiz</u>
          </span>
          <img src={iconArrowLink} alt="" width={15} height={15} />
        </Link>
      </div>
    </AuthLayout>
  )
}
