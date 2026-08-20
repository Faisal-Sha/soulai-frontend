import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulNav } from '@/components/soul'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/integrations/supabase/client'
import { ResumeSheet } from '@/pages/home/ResumeSheet'
import { useSoulSheetParams } from '@/pages/home/useSoulSheetParams'
import './soul-account.css'
import bgRipple from '../home/assets/bg-ripple.png'
import iconArrow from './assets/icon-arrow.svg'
import iconChevron from './assets/icon-chevron.svg'
import { getKnowSections, knowProgress } from './knowData'

const DEMO = {
  name: 'Pavel',
  place: 'Mogilev',
  birthDate: '30 August 1990',
  birthTime: '14:20',
  planLine: '$6.99 a month · renews 6 September',
  notificationsLine: 'Balanced · most mornings',
  /** Figma Account · Full copy (805:2143) */
  subtitle: 'She reads one line — then her own.',
  endedDay: '6 September',
  resumePrice: '$6.99',
} as const

const ENDED_STATUSES = new Set([
  'canceled',
  'cancelled',
  'expired',
  'inactive',
  'unpaid',
])

function readNotificationsLine() {
  try {
    return sessionStorage.getItem('soul-account-notifications-line') || DEMO.notificationsLine
  } catch {
    return DEMO.notificationsLine
  }
}

function initialFromName(name: string) {
  const t = name.trim()
  return t ? t.charAt(0).toUpperCase() : '?'
}

function formatPlanLine(opts: {
  isPremium: boolean
  expiresAt?: string | null
  planType?: string | null
}) {
  if (!opts.isPremium) return 'Free · upgrade anytime'
  const renew = opts.expiresAt
    ? new Date(opts.expiresAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
      })
    : null
  const price = '$6.99 a month'
  return renew ? `${price} · renews ${renew}` : price
}

function formatEndedOn(raw?: string | null) {
  if (!raw) return DEMO.endedDay
  try {
    return new Date(raw).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'long',
    })
  } catch {
    return DEMO.endedDay
  }
}

/**
 * Figma WIP · Account · Full (805:2128)
 * Subscription ended (955:10342) — `/account?ended=1`
 * Hub for profile, plan, notifications, and account rows.
 */
export function SoulAccountScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, profile, isPremium, subscription } = useUser()
  const [signingOut, setSigningOut] = useState(false)

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

  const name = profile?.full_name?.trim() || DEMO.name
  const know = useMemo(() => knowProgress(getKnowSections()), [])
  const metaLine = useMemo(() => {
    const parts: string[] = []
    if (DEMO.place) parts.push(DEMO.place)
    if (profile?.dob) {
      try {
        parts.push(
          new Date(profile.dob).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
        )
      } catch {
        parts.push(DEMO.birthDate)
      }
    } else {
      parts.push(DEMO.birthDate)
    }
    parts.push(DEMO.birthTime)
    return parts.join(' · ')
  }, [profile?.dob])

  const notificationsLine = readNotificationsLine()

  const planLine = subscriptionEnded
    ? `Ended on ${formatEndedOn(subscription?.expires_at ?? subscription?.current_period_end)}`
    : formatPlanLine({
        isPremium,
        expiresAt: subscription?.expires_at ?? subscription?.current_period_end,
        planType: subscription?.plan_type,
      })

  const knowPct = Math.round((know.answered / Math.max(1, know.total)) * 100)

  const onResume = () => openResume('confirm')

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
      className="soul-account"
      data-name={subscriptionEnded ? 'Account · Subscription ended' : 'Account · Full'}
    >
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
        <header className="soul-account__header">
          <button
            type="button"
            className="soul-account__brand"
            onClick={() => navigate('/')}
            aria-label="SOUL+AI home"
          >
            <SoulBrand />
          </button>
          <div className="soul-account__header-nav" aria-label="Desktop navigation">
            <SoulNav variant="desktop" />
          </div>
        </header>

        <section
          className={`soul-account__intro${subscriptionEnded ? ' soul-account__intro--solo' : ''}`}
          aria-labelledby="soul-account-title"
        >
          <h1 id="soul-account-title" className="soul-account__title">
            Your account
          </h1>
          {!subscriptionEnded ? (
            <p className="soul-account__subtitle">{DEMO.subtitle}</p>
          ) : null}
        </section>

        <div className="soul-account__stack">
          {/* Identity */}
          <article className="soul-account__card soul-account__card--identity">
            <div className="soul-account__identity">
              <span className="soul-account__monogram" aria-hidden="true">
                {initialFromName(name)}
              </span>
              <div className="soul-account__identity-text">
                <p className="soul-account__name">{name}</p>
                <p className="soul-account__meta">{metaLine}</p>
              </div>
            </div>
          </article>

          {/* What I know */}
          <article className="soul-account__card">
            <div className="soul-account__card-heading">
              <h2 className="soul-account__card-title">What I know about you</h2>
              <p className="soul-account__card-meta">
                {know.answered} of {know.total} answered
              </p>
            </div>
            <div
              className="soul-account__progress"
              role="progressbar"
              aria-valuenow={know.answered}
              aria-valuemin={0}
              aria-valuemax={know.total}
              aria-label="Profile questions answered"
            >
              <span className="soul-account__progress-fill" style={{ width: `${knowPct}%` }} />
            </div>
            <button
              type="button"
              className="soul-account__text-link"
              onClick={() => navigate('/account/know')}
            >
              Add more
              <img src={iconArrow} alt="" width={14} height={14} />
            </button>
          </article>

          {/* Plan */}
          <article className="soul-account__card">
            <div className="soul-account__card-heading">
              <h2 className="soul-account__card-title">
                {subscriptionEnded ? 'Your plan · ended' : 'Your plan'}
              </h2>
              <p className="soul-account__card-meta">{planLine}</p>
            </div>
            {subscriptionEnded ? (
              <button type="button" className="soul-account__text-link" onClick={onResume}>
                Resume · {DEMO.resumePrice}/mo
                <img src={iconArrow} alt="" width={14} height={14} />
              </button>
            ) : (
              <button
                type="button"
                className="soul-account__text-link"
                onClick={() => navigate('/account/plan')}
              >
                Manage plan
                <img src={iconArrow} alt="" width={14} height={14} />
              </button>
            )}
          </article>

          {/* Notifications */}
          <article className="soul-account__card">
            <div className="soul-account__card-heading">
              <h2 className="soul-account__card-title">Notifications</h2>
              <p className="soul-account__card-meta">{notificationsLine}</p>
            </div>
            <button
              type="button"
              className="soul-account__text-link"
              onClick={() => navigate('/account/notifications')}
            >
              Change
              <img src={iconArrow} alt="" width={14} height={14} />
            </button>
          </article>

          {/* Rows — Account · Full (805:2228) */}
          <div className="soul-account__card soul-account__card--rows">
            <button
              type="button"
              className="soul-account__row"
              onClick={() => toast.message('Coming next — Birth details')}
            >
              <span className="soul-account__row-text">
                <span className="soul-account__row-label">Birth details</span>
                <span className="soul-account__row-hint">
                  Changing these rewrites your reading
                </span>
              </span>
              <img
                className="soul-account__row-chevron"
                src={iconChevron}
                alt=""
                width={16}
                height={16}
              />
            </button>
            <hr className="soul-account__hairline" />
            {subscriptionEnded ? (
              <>
                <button
                  type="button"
                  className="soul-account__row"
                  onClick={() =>
                    toast.message('Download everything', {
                      description: 'Export comes next — not wired yet.',
                    })
                  }
                >
                  <span className="soul-account__row-text">
                    <span className="soul-account__row-label">Download everything</span>
                  </span>
                  <img
                    className="soul-account__row-chevron"
                    src={iconChevron}
                    alt=""
                    width={16}
                    height={16}
                  />
                </button>
                <hr className="soul-account__hairline" />
              </>
            ) : null}
            <Link to="/contact" className="soul-account__row">
              <span className="soul-account__row-text">
                <span className="soul-account__row-label">Contact support</span>
              </span>
              <img
                className="soul-account__row-chevron"
                src={iconChevron}
                alt=""
                width={16}
                height={16}
              />
            </Link>
            <hr className="soul-account__hairline" />
            <Link to="/terms" className="soul-account__row">
              <span className="soul-account__row-text">
                <span className="soul-account__row-label">Terms and Privacy</span>
              </span>
              <img
                className="soul-account__row-chevron"
                src={iconChevron}
                alt=""
                width={16}
                height={16}
              />
            </Link>
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
        <SoulNav />
      </div>

      <ResumeSheet
        open={resumeOpen}
        mode={resumeMode}
        price={DEMO.resumePrice}
        onClose={closeResume}
        onModeChange={openResume}
      />
    </div>
  )
}
