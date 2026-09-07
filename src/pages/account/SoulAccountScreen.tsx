import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulNav, SoulRippleBg } from '@/components/soul'
import { useCopy, useI18n } from '@/i18n'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/integrations/supabase/client'
import { ResumeSheet } from '@/pages/home/ResumeSheet'
import { useSoulSheetParams } from '@/pages/home/useSoulSheetParams'
import './soul-account.css'
import iconArrow from './assets/icon-arrow.svg'
import iconChevron from './assets/icon-chevron.svg'
import { displayName, identityMetaLine } from './profileDisplay'
import { useKnowAnswers } from './useKnowAnswers'

const DEMO = {
  name: 'Pavel',
  place: 'Mogilev',
  birthDate: '30 August 1990',
  birthTime: '14:20',
  planLine: '$6.99 a month · renews 6 September',
  notificationsLine: 'Balanced · most mornings',
  /** Figma Account · Full copy (805:2143) */
  subtitle: 'She reads one line. Then her own.',
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

function readNotificationsLine(signedIn: boolean, fallback: string) {
  try {
    const stored = sessionStorage.getItem('soul-account-notifications-line')
    if (stored) return stored
  } catch {
    /* ignore */
  }
  return signedIn ? fallback : DEMO.notificationsLine
}

function initialFromName(name: string) {
  const t = name.trim()
  return t ? t.charAt(0).toUpperCase() : '?'
}

function formatPlanLine(
  opts: {
    isPremium: boolean
    expiresAt?: string | null
    status?: string | null
    cancelAtPeriodEnd?: boolean
  },
  t: (key: string, english: string, vars?: Record<string, string | number>) => string,
) {
  if (!opts.isPremium) return t('account.plan.free', 'Free · upgrade anytime')
  const date = opts.expiresAt
    ? new Date(opts.expiresAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
      })
    : null
  const trialing = opts.status?.toLowerCase() === 'trialing'
  if (trialing && opts.cancelAtPeriodEnd) {
    return date
      ? t('account.plan.endsDate', `Ends ${date} · no monthly charge`, { date })
      : t('account.plan.cancelledTrial', 'Cancelled · ends at trial')
  }
  if (trialing) {
    return date
      ? t('account.plan.startsDate', `$6.99 a month · starts ${date}`, { date })
      : t('account.plan.afterTrial', '$6.99 a month after trial')
  }
  if (opts.cancelAtPeriodEnd) {
    return date
      ? t('account.plan.endsMonthly', `$6.99 a month · ends ${date}`, { date })
      : t('account.plan.monthly', '$6.99 a month')
  }
  return date
    ? t('account.plan.renewsDate', `$6.99 a month · renews ${date}`, { date })
    : t('account.plan.monthly', '$6.99 a month')
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
 * Subscription ended (955:10342). `/account?ended=1`
 * Hub for profile, plan, notifications, and account rows.
 */
export function SoulAccountScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const t = useCopy()
  const { locale } = useI18n()
  const { user, profile, isPremium, subscription } = useUser()
  const [signingOut, setSigningOut] = useState(false)
  const { progress: know } = useKnowAnswers()

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

  const signedIn = Boolean(user)
  const name = signedIn
    ? displayName(profile?.full_name, profile?.email ?? user?.email)
    : DEMO.name
  const avatarUrl = signedIn ? profile?.avatar_url : null
  const metaLine = useMemo(() => {
    if (!signedIn) {
      return [DEMO.place, DEMO.birthDate, DEMO.birthTime].join(' · ')
    }
    return (
      identityMetaLine({
        birthPlace: profile?.birth_place,
        dob: profile?.dob,
        birthTime: profile?.birth_time,
      }) || t('account.addBirth', 'Add your birth details')
    )
  }, [signedIn, profile?.birth_place, profile?.birth_time, profile?.dob, t])

  const notificationsLine = readNotificationsLine(
    signedIn,
    t('account.notifications.choose', 'Choose how we write to you'),
  )

  const endedDay = formatEndedOn(subscription?.expires_at ?? subscription?.current_period_end)
  const planLine = subscriptionEnded
    ? t('account.plan.endedOn', `Ended on ${endedDay}`, { date: endedDay })
    : formatPlanLine(
        {
          isPremium,
          expiresAt: subscription?.expires_at ?? subscription?.current_period_end,
          status: subscription?.status,
          cancelAtPeriodEnd: subscription?.cancel_at_period_end,
        },
        t,
      )

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
      <SoulRippleBg className="soul-account__bg" />
      <div className="soul-account__scrim" aria-hidden="true" />
      <div className="soul-account__dock-scrim" aria-hidden="true" />

      <div className="soul-account__scroll">
        <header className="soul-account__header">
          <button
            type="button"
            className="soul-account__brand"
            onClick={() => navigate('/')}
            aria-label={t('account.homeAria', 'SOUL+AI home')}
          >
            <SoulBrand />
          </button>
          <div className="soul-account__header-nav" aria-label={t('account.desktopNavAria', 'Desktop navigation')}>
            <SoulNav variant="desktop" />
          </div>
        </header>

        <section
          className={`soul-account__intro${subscriptionEnded ? ' soul-account__intro--solo' : ''}`}
          aria-labelledby="soul-account-title"
        >
          <h1 id="soul-account-title" className="soul-account__title">
            {t('account.title', 'Your account')}
          </h1>
          {!subscriptionEnded ? (
            <p className="soul-account__subtitle">{t('account.subtitle', DEMO.subtitle)}</p>
          ) : null}
        </section>

        <div className="soul-account__stack">
          {/* Identity */}
          <article className="soul-account__card soul-account__card--identity">
            <div className="soul-account__identity">
              <span className="soul-account__monogram" aria-hidden="true">
                {avatarUrl ? <img src={avatarUrl} alt="" /> : initialFromName(name)}
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
              <h2 className="soul-account__card-title">
                {t('account.know.title', 'What I know about you')}
              </h2>
              <p className="soul-account__card-meta">
                {t('account.know.answeredOf', `${know.answered} of ${know.total} answered`, {
                  answered: know.answered,
                  total: know.total,
                })}
              </p>
            </div>
            <div
              className="soul-account__progress"
              role="progressbar"
              aria-valuenow={know.answered}
              aria-valuemin={0}
              aria-valuemax={know.total}
              aria-label={t('account.know.answeredAria', 'Profile questions answered')}
            >
              <span className="soul-account__progress-fill" style={{ width: `${knowPct}%` }} />
            </div>
            <button
              type="button"
              className="soul-account__text-link"
              onClick={() => navigate('/account/know')}
            >
              {t('account.know.addMore', 'Add more')}
              <img src={iconArrow} alt="" width={14} height={14} />
            </button>
          </article>

          {/* Plan */}
          <article className="soul-account__card">
            <div className="soul-account__card-heading">
              <h2 className="soul-account__card-title">
                {subscriptionEnded
                  ? t('account.plan.titleEnded', 'Your plan · ended')
                  : t('account.plan.title', 'Your plan')}
              </h2>
              <p className="soul-account__card-meta">{planLine}</p>
            </div>
            {subscriptionEnded ? (
              <button type="button" className="soul-account__text-link" onClick={onResume}>
                {t('account.plan.resume', `Resume · ${DEMO.resumePrice}/mo`, {
                  price: DEMO.resumePrice,
                })}
                <img src={iconArrow} alt="" width={14} height={14} />
              </button>
            ) : (
              <button
                type="button"
                className="soul-account__text-link"
                onClick={() => navigate('/account/plan')}
              >
                {t('account.plan.manage', 'Manage plan')}
                <img src={iconArrow} alt="" width={14} height={14} />
              </button>
            )}
          </article>

          {/* Notifications */}
          <article className="soul-account__card">
            <div className="soul-account__card-heading">
              <h2 className="soul-account__card-title">
                {t('account.notifications.title', 'Notifications')}
              </h2>
              <p className="soul-account__card-meta">{notificationsLine}</p>
            </div>
            <button
              type="button"
              className="soul-account__text-link"
              onClick={() => navigate('/account/notifications')}
            >
              {t('account.notifications.change', 'Change')}
              <img src={iconArrow} alt="" width={14} height={14} />
            </button>
          </article>

          {/* Rows. Account · Full (805:2228) */}
          <div className="soul-account__card soul-account__card--rows">
            <button
              type="button"
              className="soul-account__row"
              onClick={() => navigate('/account/birth')}
            >
              <span className="soul-account__row-text">
                <span className="soul-account__row-label">
                  {t('account.birth.rowLabel', 'Birth details')}
                </span>
                <span className="soul-account__row-hint">
                  {t('account.birth.rowHint', 'Changing these rewrites your reading')}
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
            <button
              type="button"
              className="soul-account__row"
              onClick={() => navigate('/account/language')}
            >
              <span className="soul-account__row-text">
                <span className="soul-account__row-label">
                  {t('account.language.rowLabel', 'Language')}
                </span>
                <span className="soul-account__row-hint">
                  {t(
                    `common.language.name.${locale}`,
                    locale === 'ru' ? 'Русский' : 'English',
                  )}
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
                    toast.message(t('account.plan.download', 'Download everything'), {
                      description: t(
                        'account.plan.downloadSoon',
                        'Export comes next. Not wired yet.',
                      ),
                    })
                  }
                >
                  <span className="soul-account__row-text">
                    <span className="soul-account__row-label">
                      {t('account.plan.download', 'Download everything')}
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
              </>
            ) : null}
            <a href="mailto:support@soulplusai.com" className="soul-account__row">
              <span className="soul-account__row-text">
                <span className="soul-account__row-label">
                  {t('account.rows.contact', 'Contact support')}
                </span>
              </span>
              <img
                className="soul-account__row-chevron"
                src={iconChevron}
                alt=""
                width={16}
                height={16}
              />
            </a>
            <hr className="soul-account__hairline" />
            <Link to="/terms" className="soul-account__row">
              <span className="soul-account__row-text">
                <span className="soul-account__row-label">
                  {t('account.rows.legal', 'Terms and Privacy')}
                </span>
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
            {signingOut
              ? t('account.plan.signingOut', 'Signing out…')
              : t('account.plan.signOut', 'Sign out')}
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
