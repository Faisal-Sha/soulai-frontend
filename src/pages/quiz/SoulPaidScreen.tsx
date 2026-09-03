import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/pages/auth/AuthLayout'
import bgSignInEmail from '@/pages/auth/assets/bg-signin-email.png'
import { MAGIC_LINK_HOURS, rememberAuthEmail } from '@/pages/auth/authActions'
import { SoulButton } from '@/components/soul'

function readQuizEmail(): string {
  try {
    const raw = localStorage.getItem('soul_v7_state')
    if (!raw) return ''
    const parsed = JSON.parse(raw) as { answers?: { email?: string } }
    return typeof parsed.answers?.email === 'string' ? parsed.answers.email : ''
  } catch {
    return ''
  }
}

/**
 * Stripe success return. Account + magic link are created by the webhook.
 * Guest stays here. They are not signed in yet.
 */
export function SoulPaidScreen() {
  const navigate = useNavigate()
  const email = useMemo(() => {
    const value = readQuizEmail()
    if (value) rememberAuthEmail(value, 'login')
    return value
  }, [])

  return (
    <AuthLayout bg={bgSignInEmail} name="Paid · Check your email" centered>
      <div className="soul-auth__check">
        <section className="soul-auth__hero soul-auth__hero--center">
          <h1 className="soul-auth__title">You’re in</h1>
          <p className="soul-auth__subtitle">
            {email
              ? `I sent a login link to ${email}. It works once and expires in ${MAGIC_LINK_HOURS} hours. The app opens when you tap it. Not before.`
              : `I sent a login link to the email you used at checkout. It works once and expires in ${MAGIC_LINK_HOURS} hours.`}
          </p>
        </section>

        <div className="soul-auth__stack soul-auth__stack--check">
          <SoulButton
            type="button"
            block
            onClick={() =>
              navigate(email ? '/login/check' : '/login/email', {
                state: email ? { email, purpose: 'login' } : undefined,
              })
            }
          >
            Open email instructions
          </SoulButton>
          <Link to="/quiz/teaser" className="soul-auth__alt">
            Back to the free preview
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
