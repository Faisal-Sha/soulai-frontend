import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulNav, SoulRippleBg } from '@/components/soul'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/integrations/supabase/client'
import { ResumeSheet } from '@/pages/home/ResumeSheet'
import { useSoulSheetParams } from '@/pages/home/useSoulSheetParams'
import { CancelPlanSheet, type CancelPlanSheetView } from './CancelPlanSheet'
import './soul-account.css'
import iconArrow from './assets/icon-arrow.svg'
import iconArrowLight from './assets/icon-arrow-light.svg'
import iconBack from '../people/assets/icon-chevron.svg'

const DEMO_PLAN = {
  priceTitle: '$6.99 a month',
  renewDay: '6 September',
  resumePrice: '$6.99',
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

const ENDED_STATUSES = new Set([
  'canceled',
  'cancelled',
  'expired',
  'inactive',
  'unpaid',
])

/**
 * Figma · Account · Plan (860:3515)
 * Subscription ended (955:10560) — `/account/plan?ended=1`
 */
export function SoulAccountPlanScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, isPremium, subscription, refetch } = useUser()
  const [signingOut, setSigningOut] = useState(false)
  const [planBusy, setPlanBusy] = useState(false)
  const [planError, setPlanError] = useState(false)
  const [sheetView, setSheetView] = useState<CancelPlanSheetView | null>(
    () => (searchParams.get('cancel') === '1' ? 'cancel' : null),
  )
  const live = Boolean(user && subscription)

  const subscriptionEnded = useMemo(() => {
    if (searchParams.get('ended') === '1' || searchParams.get('ended') === 'true') {
      return true
    }
    const status = subscription?.status?.toLowerCase() ?? ''
    return !isPremium && ENDED_STATUSES.has(status)
  }, [searchParams, subscription?.status, isPremium])

  const resumeExtra = useMemo(
    () => (subscriptionEnded ? { ended: '1' } : undefined),
    [subscriptionEnded],
  )
  const { resumeOpen, resumeMode, openResume, closeResume } = useSoulSheetParams(resumeExtra)

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

  const trialing = live && subscription?.status?.toLowerCase() === 'trialing'
  const cancelledAtPeriodEnd = Boolean(
    subscription?.cancel_at_period_end || subscription?.cancel_at,
  )

  const priceTitle = subscriptionEnded
    ? 'Ended'
    : trialing
      ? '7-day trial'
      : DEMO_PLAN.priceTitle

  const planBody = subscriptionEnded
    ? `Ended on ${renewLabel}. Resume anytime.`
    : trialing && cancelledAtPeriodEnd
      ? `Access until ${renewLabel}. You will not be charged $6.99.`
      : trialing
        ? `$6.99/month starts ${renewLabel} unless you cancel.`
        : `Renews on ${renewLabel}. Cancel anytime - it stays active until then.`

  const messagesMeta = live
    ? 'Included with your plan · usage tracking comes with chat'
    : `${DEMO_PLAN.messagesLeft} of ${DEMO_PLAN.messagesTotal} left today · ${DEMO_PLAN.topUpPrice} adds another ${DEMO_PLAN.topUpAmount}`

  const paymentMethod = live ? 'Card on file' : DEMO_PLAN.paymentMethod

  const billingHistory = useMemo(() => {
    if (!live) return DEMO_PLAN.history
    const date = subscription?.created_at
      ? new Date(subscription.created_at).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'long',
        })
      : renewLabel
    return [{ id: 'intro', date, detail: 'Seven-day trial', amount: '$0.99' }]
  }, [live, subscription?.created_at, renewLabel])

  const onResume = () => openResume('confirm')

  const invokePlan = async (action: 'cancel' | 'resume') => {
    if (planBusy) return
    setPlanBusy(true)
    setPlanError(false)
    try {
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: { action },
      })
      if (error) {
        const detail = (data as { error?: string } | null)?.error
        throw new Error(detail || error.message)
      }
      if (data?.error) throw new Error(data.error)
      await refetch()
      if (action === 'cancel') setSheetView('done')
      else setSheetView(null)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not update plan'
      toast.error(message)
      setPlanError(true)
    } finally {
      setPlanBusy(false)
    }
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
    <div
      className={`soul-account${sheetView ? ' soul-account--sheet-open' : ''}`}
      data-name={
        subscriptionEnded ? 'Account · Plan · Subscription ended' : 'Account · Plan'
      }
    >
      <SoulRippleBg className="soul-account__bg" />
      <div className="soul-account__scrim" aria-hidden="true" />
      <div className="soul-account__dock-scrim" aria-hidden="true" />

      <div className="soul-account__scroll">
        <header className="soul-account__header soul-account__header--back">
          <div className="soul-account__header-left">
            <button
              type="button"
              className="soul-account__back"
              onClick={() =>
                navigate(subscriptionEnded ? '/account?ended=1' : '/account')
              }
              aria-label="Back to account"
            >
              <img src={iconBack} alt="" width={22} height={22} />
            </button>
            <SoulBrand />
          </div>
          <div className="soul-account__header-nav" aria-label="Desktop navigation">
            <SoulNav variant="desktop" />
          </div>
        </header>

        <section
          className="soul-account__intro soul-account__intro--solo"
          aria-labelledby="soul-account-plan-title"
        >
          <h1 id="soul-account-plan-title" className="soul-account__title">
            Your plan
          </h1>
        </section>

        <div className="soul-account__stack">
          <article className="soul-account__card">
            <div className="soul-account__card-heading">
              <h2 className="soul-account__card-title">{priceTitle}</h2>
              <p className="soul-account__card-meta">{planBody}</p>
            </div>
            {subscriptionEnded ? (
              <button type="button" className="soul-account__text-link" onClick={onResume}>
                Resume · {DEMO_PLAN.resumePrice}/mo
                <img src={iconArrow} alt="" width={14} height={14} />
              </button>
            ) : null}
          </article>

          <article className="soul-account__card soul-account__card--frost">
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
              <img src={iconArrowLight} alt="" width={14} height={14} />
            </button>
          </article>

          <article className="soul-account__card soul-account__card--frost">
            <div className="soul-account__card-heading">
              <h2 className="soul-account__card-title">Payment method</h2>
              <p className="soul-account__card-meta">{paymentMethod}</p>
            </div>
            <button
              type="button"
              className="soul-account__text-link"
              onClick={() => openResume('methods')}
            >
              Change
              <img src={iconArrowLight} alt="" width={14} height={14} />
            </button>
          </article>

          <div className="soul-account__card soul-account__card--frost soul-account__card--rows">
            {billingHistory.map((row, i) => (
              <div key={row.id} className="soul-account__billing-block">
                {i > 0 ? <hr className="soul-account__hairline" /> : null}
                <div className="soul-account__row soul-account__row--billing">
                  <span className="soul-account__row-text">
                    <span className="soul-account__row-label">{row.date}</span>
                    <span className="soul-account__row-hint">{row.detail}</span>
                  </span>
                  <span className="soul-account__row-amount">{row.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="soul-account__signout-wrap">
          {subscriptionEnded ? (
            <button
              type="button"
              className="soul-account__signout"
              onClick={onSignOut}
              disabled={signingOut}
            >
              {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
          ) : cancelledAtPeriodEnd ? (
            <button
              type="button"
              className="soul-account__signout"
              onClick={() => {
                setPlanError(false)
                setSheetView('keep')
              }}
            >
              Keep plan
            </button>
          ) : (
            <button
              type="button"
              className="soul-account__signout"
              onClick={() => {
                setPlanError(false)
                setSheetView('cancel')
              }}
            >
              Cancel plan
            </button>
          )}
        </div>
      </div>

      <div className="soul-account__nav soul-account__nav--mobile">
        <SoulNav />
      </div>

      <ResumeSheet
        open={resumeOpen}
        mode={resumeMode}
        price={DEMO_PLAN.resumePrice}
        onClose={closeResume}
        onModeChange={openResume}
      />
      <CancelPlanSheet
        open={sheetView != null}
        view={sheetView ?? 'cancel'}
        accessUntil={renewLabel}
        busy={planBusy}
        error={planError}
        onClose={() => {
          if (planBusy) return
          setSheetView(null)
          setPlanError(false)
        }}
        onConfirmCancel={() => void invokePlan('cancel')}
        onConfirmKeep={() => void invokePlan('resume')}
      />
    </div>
  )
}
