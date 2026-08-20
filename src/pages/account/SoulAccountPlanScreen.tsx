import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulNav, type SoulNavTab } from '@/components/soul'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/integrations/supabase/client'
import './soul-account.css'
import bgRipple from '../home/assets/bg-ripple.png'
import iconArrow from './assets/icon-arrow.svg'
import iconChevron from './assets/icon-chevron.svg'
import iconBack from '../people/assets/icon-chevron.svg'

const DEMO_PLAN = {
  priceTitle: '$5.99 a month',
  renewDay: '6 September',
  messagesLeft: 3,
  messagesTotal: 10,
  topUpPrice: '$7',
  topUpAmount: 10,
  paymentMethod: 'Visa 4242',
  history: [
    { id: 'msg-pack', date: '6 August', detail: '10 messages', amount: '$7.00' },
    { id: 'trial', date: '6 August', detail: 'Seven-day trial', amount: '$0.99' },
  ],
} as const

/**
 * Figma WIP · Account · Plan (818:3587)
 */
export function SoulAccountPlanScreen() {
  const navigate = useNavigate()
  const { user, isPremium, subscription } = useUser()
  const [signingOut, setSigningOut] = useState(false)

  const renewLabel = useMemo(() => {
    const raw = subscription?.expires_at ?? subscription?.current_period_end
    if (!raw) return DEMO_PLAN.renewDay
    try {
      return new Date(raw).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
      })
    } catch {
      return DEMO_PLAN.renewDay
    }
  }, [subscription?.expires_at, subscription?.current_period_end])

  const priceTitle = isPremium ? DEMO_PLAN.priceTitle : 'Free'
  const planBody = isPremium
    ? `Renews on ${renewLabel}. Cancel anytime - it stays active until then.`
    : 'Upgrade anytime for full access and daily messages.'

  const messagesMeta = `${DEMO_PLAN.messagesLeft} of ${DEMO_PLAN.messagesTotal} left today · ${DEMO_PLAN.topUpPrice} adds another ${DEMO_PLAN.topUpAmount}`

  const onNav = (tab: SoulNavTab) => {
    if (tab === 'profile') {
      navigate('/account')
      return
    }
    if (tab === 'home') navigate('/')
    else if (tab === 'readings') navigate('/readings')
    else if (tab === 'people') navigate('/people')
  }

  const onSignOut = async () => {
    if (signingOut) return
    setSigningOut(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      localStorage.removeItem('supabase.auth.token')
      navigate('/login', { replace: true })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not sign out'
      toast.error(message)
      setSigningOut(false)
    }
  }

  return (
    <div className="soul-account" data-name="Account · Plan">
      <div className="soul-account__bg" aria-hidden="true">
        <div className="soul-account__bg-tile soul-account__bg-tile--1">
          <img src={bgRipple} alt="" />
          <span className="soul-account__bg-dim" />
        </div>
        <div className="soul-account__bg-tile soul-account__bg-tile--2">
          <img src={bgRipple} alt="" />
          <span className="soul-account__bg-dim" />
        </div>
      </div>
      <div className="soul-account__scrim" aria-hidden="true" />
      <div className="soul-account__dock-scrim" aria-hidden="true" />

      <div className="soul-account__scroll">
        <header className="soul-account__header soul-account__header--back">
          <div className="soul-account__header-left">
            <button
              type="button"
              className="soul-account__back"
              onClick={() => navigate('/account')}
              aria-label="Back to account"
            >
              <img src={iconBack} alt="" width={22} height={22} />
            </button>
            <SoulBrand />
          </div>
          <div className="soul-account__header-nav" aria-label="Desktop navigation">
            <SoulNav active="profile" onChange={onNav} className="soul-account__top-nav" />
          </div>
        </header>

        <section className="soul-account__intro soul-account__intro--solo" aria-labelledby="soul-account-plan-title">
          <h1 id="soul-account-plan-title" className="soul-account__title">
            Your plan
          </h1>
        </section>

        <div className="soul-account__stack">
          <article className="soul-account__card soul-account__card--tight">
            <div className="soul-account__card-heading">
              <h2 className="soul-account__card-title">{priceTitle}</h2>
              <p className="soul-account__card-meta">{planBody}</p>
            </div>
          </article>

          <article className="soul-account__card">
            <div className="soul-account__card-heading">
              <h2 className="soul-account__card-title">Messages</h2>
              <p className="soul-account__card-meta">{messagesMeta}</p>
            </div>
            <button
              type="button"
              className="soul-account__text-link"
              onClick={() => navigate('/agent')}
            >
              Add messages
              <img src={iconArrow} alt="" width={14} height={14} />
            </button>
          </article>

          <article className="soul-account__card soul-account__card--tight">
            <div className="soul-account__card-heading">
              <h2 className="soul-account__card-title">Payment method</h2>
              <p className="soul-account__card-meta">{DEMO_PLAN.paymentMethod}</p>
            </div>
          </article>

          <div className="soul-account__card soul-account__card--rows">
            {DEMO_PLAN.history.map((row, i) => (
              <div key={row.id}>
                {i > 0 ? <hr className="soul-account__hairline" /> : null}
                <button
                  type="button"
                  className="soul-account__row soul-account__row--billing"
                  onClick={() => toast.message('Receipt coming soon')}
                >
                  <span className="soul-account__row-text">
                    <span className="soul-account__row-label">{row.date}</span>
                    <span className="soul-account__row-hint">{row.detail}</span>
                  </span>
                  <span className="soul-account__row-amount">{row.amount}</span>
                  <img
                    className="soul-account__row-chevron"
                    src={iconChevron}
                    alt=""
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="soul-account__signout-wrap">
          <button
            type="button"
            className="soul-account__signout"
            onClick={onSignOut}
            disabled={signingOut}
          >
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </div>

      <div className="soul-account__nav soul-account__nav--mobile">
        <SoulNav active="profile" onChange={onNav} />
      </div>
    </div>
  )
}
