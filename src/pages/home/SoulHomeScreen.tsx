import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  addUserSavedInsight,
  getSavedInsightsCount,
  isQuoteSaved,
} from '@/pages/insights/insightsStore'
import {
  SoulBrand,
  SoulButton,
  SoulNav,
  SoulSecondaryButton,
  SoulTextLink,
} from '@/components/soul'
import { variantFromUrlParam } from './resolveHomeVariant'
import { AddToHomeSheet } from './AddToHomeSheet'
import { ResumeSheet } from './ResumeSheet'
import { useSoulSheetParams } from './useSoulSheetParams'
import './soul-home.css'
import bgRipple from './assets/bg-ripple.png'
import iconReadings from './assets/icon-readings.png'
import iconInsights from './assets/icon-insights.png'
import iconCompat from './assets/icon-compat.png'
import markApp from '../../components/soul/assets/mark-hero.svg'
import iconMessage from './assets/icon-message.svg'
import glassOrbFab from './assets/glass-orb-fab.png'

export type SoulHomeVariant =
  | 'default'
  | 'day1'
  | 'trial'
  | 'loading'
  | 'unpaid'
  | 'unpaid-pool'
  | 'payment-confirmation'

type SoulHomeScreenProps = {
  variant?: SoulHomeVariant
  dayNumber?: number
  chaptersDone?: number
  chaptersTotal?: number
  insightsCount?: number
  compatSummary?: string
  isPremium?: boolean
  /** Trial banner — Figma 616:1545 */
  trialTitle?: string
  trialDetail?: string
  /** Unpaid home resume price — Figma 949:5189 */
  resumePrice?: string
}

const NOTE = {
  headline: 'You move fastest right after you decide — and slowest while you look for permission.',
  sub: 'Today asks for a small decision made without asking anyone.',
  unpaidSub: 'Resume to talk it through with your mentor.',
} as const

const UNPAID_BANNER = {
  title: 'Your subscription ended',
  detail: "Everything you've built stays — reading, insights, conversations.",
} as const

const POOL_NOTE = {
  headline: "You've seen everything your reading had to offer.",
  sub: 'The rest happens in conversation. Your chapters stay yours either way.',
} as const

const WELCOME_BACK = {
  title: 'Welcome back',
  body: "Payment successful. Everything's unlocked. Preparing today's insight — it'll be ready in a moment.",
} as const

function formatHomeDate(d = new Date()) {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

/**
 * SOUL+AI Home — Figma DEV
 * Unpaid #1: Home · subscription ended (949:5169)
 * Unpaid #2: Home · reading pool exhausted (950:5833)
 * Paid: Home · payment confirmation (952:6176)
 */
export function SoulHomeScreen({
  variant: variantProp,
  dayNumber = 12,
  chaptersDone = 3,
  chaptersTotal = 9,
  insightsCount = 12,
  compatSummary = 'Anna, Mark and 2 more',
  isPremium = true,
  trialTitle = 'Your trial ends tomorrow.',
  trialDetail = '$5.99/month starts soon. Cancel anytime.',
  resumePrice = '$6.99',
}: SoulHomeScreenProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const variant =
    variantProp ?? variantFromUrlParam(searchParams.get('home')) ?? 'default'
  const [savedToast, setSavedToast] = useState(false)
  const [welcomeDismissed, setWelcomeDismissed] = useState(false)
  const toastTimer = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    },
    [],
  )

  const loading = variant === 'loading'
  const paymentConfirmation = variant === 'payment-confirmation'
  const noteLoading = loading || paymentConfirmation
  const day1 = variant === 'day1'
  const trial = variant === 'trial'
  const unpaid = variant === 'unpaid'
  const unpaidPool = variant === 'unpaid-pool'
  const noteQuote = unpaidPool ? POOL_NOTE.headline : NOTE.headline
  const [noteSaved, setNoteSaved] = useState(() => isQuoteSaved(noteQuote))

  useEffect(() => {
    setNoteSaved(isQuoteSaved(noteQuote))
  }, [noteQuote])
  const unpaidLike = unpaid || unpaidPool
  const showAgentFab = unpaidPool || (paymentConfirmation && !welcomeDismissed)
  const resumeExtra = useMemo(
    () =>
      unpaid ? { home: 'unpaid' } : unpaidPool ? { home: 'pool-exhausted' } : undefined,
    [unpaid, unpaidPool],
  )
  const {
    resumeOpen,
    resumeMode,
    installOpen,
    openResume,
    closeResume,
    openInstall,
    closeInstall,
  } = useSoulSheetParams(resumeExtra)

  const eyebrow = useMemo(() => {
    const day = day1 ? 1 : dayNumber
    return `Today · ${formatHomeDate()} · Day ${day}`
  }, [day1, dayNumber])

  const readingsMeta = day1
    ? 'Nine chapters, ready when you are'
    : `${chaptersDone} of ${chaptersTotal} chapters`
  const readingsCta = day1 ? 'Start reading' : 'Continue reading'
  const insightsMeta = useMemo(() => {
    const count = getSavedInsightsCount(!day1)
    if (day1) {
      return count > 0
        ? `${count} note${count === 1 ? '' : 's'} you kept`
        : 'Anything you highlight will live here'
    }
    return `${count || insightsCount} notes you kept`
  }, [day1, insightsCount, noteSaved])
  const insightsCta =
    day1 && getSavedInsightsCount(false) === 0 ? 'Nothing saved yet' : 'See all'
  const compatMeta = day1 ? 'Add someone close to you' : compatSummary
  const compatCta = day1 ? 'Add someone' : 'See all'
  const progressPct = unpaidPool
    ? 100
    : Math.min(100, Math.round((chaptersDone / chaptersTotal) * 100))
  const showShelfProgress = !day1

  const openAgent = () => {
    const starter = unpaidPool ? POOL_NOTE.headline : NOTE.headline
    navigate('/agent', {
      state: {
        starter,
        quotedNote: starter,
        newChat: true,
      },
    })
  }

  const openReading = () => {
    navigate(unpaidLike ? '/readings?ended=1' : '/readings')
  }

  const openPattern = () => {
    navigate(unpaidLike ? '/readings/your-pattern?ended=1' : '/readings/your-pattern')
  }

  const openInsights = () => {
    const hasSaved = getSavedInsightsCount(!day1) > 0
    navigate(day1 && !hasSaved ? '/insights/empty' : '/insights')
  }

  const onResume = () => openResume('confirm')

  const showSavedToast = () => {
    setSavedToast(true)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setSavedToast(false), 3200)
  }

  const saveNote = () => {
    if (noteSaved || noteLoading) return
    addUserSavedInsight({
      quote: noteQuote,
      source: "Today's note",
    })
    setNoteSaved(true)
    showSavedToast()
  }

  return (
    <div
      className={`soul-home${paymentConfirmation && !welcomeDismissed ? ' soul-home--welcome-open' : ''}${resumeOpen || installOpen ? ' soul-home--sheet-open' : ''}`}
    >
      <div className="soul-home__bg" aria-hidden="true">
        <div className="soul-home__bg-tile soul-home__bg-tile--1">
          <img src={bgRipple} alt="" />
          <span className="soul-home__bg-dim" />
        </div>
        <div className="soul-home__bg-tile soul-home__bg-tile--2">
          <img src={bgRipple} alt="" />
          <span className="soul-home__bg-dim" />
        </div>
        <div className="soul-home__bg-tile soul-home__bg-tile--3">
          <img src={bgRipple} alt="" />
          <span className="soul-home__bg-dim" />
        </div>
        <div className="soul-home__bg-tile soul-home__bg-tile--4">
          <img src={bgRipple} alt="" />
          <span className="soul-home__bg-dim" />
        </div>
      </div>
      <div className="soul-home__scrim" aria-hidden="true" />
      <div className="soul-home__dock-scrim" aria-hidden="true" />

      <div className="soul-home__scroll">
        <header className="soul-home__header">
          <SoulBrand />
          <div className="soul-home__header-nav" aria-label="Desktop navigation">
            <SoulNav variant="desktop" />
          </div>
        </header>

        {unpaidLike ? (
          <div className="soul-home__trial soul-home__trial--notice" role="status">
            <div className="soul-home__trial-copy">
              <p className="soul-home__trial-title">{UNPAID_BANNER.title}</p>
              <p className="soul-home__trial-detail">{UNPAID_BANNER.detail}</p>
            </div>
            <Link className="soul-home__trial-manage" to="/account/plan">
              Manage
            </Link>
          </div>
        ) : null}

        {trial ? (
          <div className="soul-home__trial soul-home__trial--notice" role="status">
            <div className="soul-home__trial-copy">
              <p className="soul-home__trial-title">{trialTitle}</p>
              <p className="soul-home__trial-detail">{trialDetail}</p>
            </div>
            <Link className="soul-home__trial-manage" to="/account/plan">
              Manage
            </Link>
          </div>
        ) : null}

        <section className="soul-home__note" aria-label="Today’s note">
          {noteLoading ? (
            <div
              className={`soul-home__skeleton${paymentConfirmation ? ' soul-home__skeleton--offset' : ''}`}
              aria-busy="true"
              aria-live="polite"
            >
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--eyebrow" />
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--h1" />
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--h2" />
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--h3" />
              <p className="soul-home__skeleton-label">Writing today’s note…</p>
            </div>
          ) : (
            <div className="soul-home__note-copy">
              {!unpaidLike ? <p className="soul-home__eyebrow">{eyebrow}</p> : null}
              <h1 className="soul-home__headline">
                {unpaidPool ? POOL_NOTE.headline : NOTE.headline}
              </h1>
              <p className="soul-home__sub">
                {unpaidPool ? POOL_NOTE.sub : unpaid ? NOTE.unpaidSub : NOTE.sub}
              </p>
            </div>
          )}

          {!noteLoading ? (
            <div className="soul-home__actions">
              {unpaidLike ? (
                <div className="soul-home__action-row">
                  <SoulButton showArrow onClick={onResume}>
                    Resume · {resumePrice}/mo
                  </SoulButton>
                </div>
              ) : (
                <>
                  <div className="soul-home__action-row">
                    <SoulButton showArrow disabled={noteLoading} onClick={openAgent}>
                      Talk this through
                    </SoulButton>
                    <SoulSecondaryButton
                      aria-label={noteSaved ? 'Note saved' : 'Save today’s note'}
                      disabled={noteLoading}
                      onClick={saveNote}
                    />
                  </div>
                  <p className="soul-home__chapter">
                    Drawn from{' '}
                    <button type="button" onClick={openPattern}>
                      your Pattern chapter
                    </button>
                  </p>
                </>
              )}
            </div>
          ) : null}
        </section>

        <section className="soul-home__shelf" aria-label="Your shelf">
          <hr className="soul-home__divider" />
          <div className="soul-home__cards">
            <button type="button" className="soul-home__card" onClick={openReading}>
              <div className="soul-home__card-body">
                <div>
                  <h2 className="soul-home__card-title">Your readings</h2>
                  <p className="soul-home__card-meta">{readingsMeta}</p>
                </div>
                {showShelfProgress ? (
                  <div className="soul-home__progress" aria-hidden="true">
                    <span style={{ width: `${progressPct}%` }} />
                  </div>
                ) : null}
                <SoulTextLink showArrow>{readingsCta}</SoulTextLink>
              </div>
              <span className="soul-home__card-icon" aria-hidden="true">
                <img src={iconReadings} alt="" />
              </span>
            </button>

            <button type="button" className="soul-home__card" onClick={openInsights}>
              <div className="soul-home__card-body">
                <div>
                  <h2 className="soul-home__card-title">Saved insights</h2>
                  <p className="soul-home__card-meta">{insightsMeta}</p>
                </div>
                <SoulTextLink showArrow>{insightsCta}</SoulTextLink>
              </div>
              <span className="soul-home__card-icon" aria-hidden="true">
                <img src={iconInsights} alt="" />
              </span>
            </button>

            <button
              type="button"
              className="soul-home__card"
              onClick={() => navigate('/people')}
            >
              <div className="soul-home__card-body">
                <div>
                  <h2 className="soul-home__card-title">Compatibilities</h2>
                  <p className="soul-home__card-meta">{compatMeta}</p>
                </div>
                <SoulTextLink showArrow>{compatCta}</SoulTextLink>
              </div>
              <span className="soul-home__card-icon" aria-hidden="true">
                <img src={iconCompat} alt="" />
              </span>
            </button>
          </div>
          <hr className="soul-home__divider" />
        </section>

        <button type="button" className="soul-home__install" onClick={openInstall}>
          <span className="soul-home__install-mark">
            <img src={markApp} alt="" width={28} height={28} />
          </span>
          <span className="soul-home__install-body">
            <span>
              <p className="soul-home__install-title">Keep SOUL+AI one tap away</p>
              <p className="soul-home__install-sub">Your note is waiting each morning.</p>
            </span>
            <SoulTextLink tone="on-dark" showArrow>
              Show me how
            </SoulTextLink>
          </span>
        </button>

        <footer className="soul-home__footer">
          <hr className="soul-home__divider" />
          <p className="soul-home__footer-tag">
            Helping you unlock your potential through ancient wisdom and modern technology.
          </p>
          <div className="soul-home__footer-links">
            <Link to="/contact">Support</Link>
            <Link to="/account">Manage subscription</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/faq">Refund Policy</Link>
          </div>
          <a className="soul-home__footer-email" href="mailto:support@soulplusai.com">
            support@soulplusai.com
          </a>
          <div className="soul-home__footer-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              Youtube
            </a>
          </div>
          <p className="soul-home__footer-copy">© 2026 Soul+AI. All rights reserved.</p>
        </footer>
      </div>

      <div className="soul-home__nav soul-home__nav--mobile">
        <SoulNav />
      </div>

      {showAgentFab ? (
        <button
          type="button"
          className="soul-home__agent-fab soul-home__agent-fab--mobile"
          aria-label="Talk this through with your mentor"
          onClick={openAgent}
        >
          <img className="soul-home__agent-fab-orb" src={glassOrbFab} alt="" aria-hidden="true" />
          <img className="soul-home__agent-fab-icon" src={iconMessage} alt="" aria-hidden="true" />
        </button>
      ) : null}

      <ResumeSheet
        open={resumeOpen}
        mode={resumeMode}
        price={resumePrice}
        onClose={closeResume}
        onModeChange={openResume}
      />
      <AddToHomeSheet open={installOpen} onClose={closeInstall} />

      {savedToast ? (
        <div className="soul-home__toast" role="status">
          <span>Saved to your insights</span>
          <button
            type="button"
            onClick={() => {
              setSavedToast(false)
              navigate('/insights')
            }}
          >
            View
          </button>
        </div>
      ) : null}

      {paymentConfirmation && !welcomeDismissed ? (
        <div className="soul-home__welcome-root" role="presentation">
          <div className="soul-home__welcome-dim" aria-hidden="true" />
          <div
            className="soul-home__welcome-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="soul-home-welcome-title"
            aria-describedby="soul-home-welcome-body"
          >
            <div className="soul-home__welcome-copy">
              <p className="soul-home__welcome-title" id="soul-home-welcome-title">
                {WELCOME_BACK.title}
              </p>
              <p className="soul-home__welcome-body" id="soul-home-welcome-body">
                {WELCOME_BACK.body}
              </p>
            </div>
            <SoulButton block onClick={() => setWelcomeDismissed(true)}>
              Close
            </SoulButton>
          </div>
        </div>
      ) : null}
    </div>
  )
}
