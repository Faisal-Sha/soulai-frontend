import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import {
  SoulBrand,
  SoulButton,
  SoulNav,
  SoulSecondaryButton,
  SoulTextLink,
  type SoulNavTab,
} from '@/components/soul'
import './soul-home.css'
import bgRipple from './assets/bg-ripple.png'
import iconReadings from './assets/icon-readings.png'
import iconInsights from './assets/icon-insights.png'
import iconCompat from './assets/icon-compat.png'
import markApp from '../../components/soul/assets/mark-hero.svg'

export type SoulHomeVariant = 'default' | 'day1' | 'trial' | 'loading'

type SoulHomeScreenProps = {
  variant?: SoulHomeVariant
  /** Trial / membership day number for eyebrow */
  dayNumber?: number
  chaptersDone?: number
  chaptersTotal?: number
  insightsCount?: number
  compatSummary?: string
  isPremium?: boolean
  /** Trial banner — Figma 694:2664 */
  trialTitle?: string
  trialDetail?: string
}

const NOTE = {
  headline: 'You move fastest right after you decide — and slowest while you look for permission.',
  sub: 'Today asks for a small decision made without asking anyone.',
} as const

function formatHomeDate(d = new Date()) {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function variantFromUrl(param: string | null): SoulHomeVariant | null {
  if (param === 'day1' || param === 'dayone') return 'day1'
  if (param === 'trial') return 'trial'
  if (param === 'loading') return 'loading'
  return null
}

/**
 * SOUL+AI Home — Figma DEV 625:1573 (+ day-one / trial / loading)
 *
 * Variants: default · day1 · trial · loading (?home=)
 * Desktop (≥900): top nav + content column; mobile dock unchanged.
 * NEXT Figma slice: Account nested screens (Plan · Notifications · What I know).
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
}: SoulHomeScreenProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const variant = variantProp ?? variantFromUrl(searchParams.get('home')) ?? 'default'
  const [noteSaved, setNoteSaved] = useState(false)
  const loading = variant === 'loading'
  const day1 = variant === 'day1'
  const trial = variant === 'trial'

  const eyebrow = useMemo(() => {
    const day = day1 ? 1 : dayNumber
    return `Today · ${formatHomeDate()} · Day ${day}`
  }, [day1, dayNumber])

  const readingsMeta = day1
    ? 'Nine chapters, ready when you are'
    : `${chaptersDone} of ${chaptersTotal} chapters`
  const readingsCta = day1 ? 'Start reading' : 'Continue reading'
  const insightsMeta = day1
    ? 'Anything you highlight will live here'
    : `${insightsCount} notes you kept`
  const insightsCta = day1 ? 'Nothing saved yet' : 'See all'
  const compatMeta = day1 ? 'Add someone close to you' : compatSummary
  const compatCta = day1 ? 'Add someone' : 'See all'
  const progressPct = Math.min(100, Math.round((chaptersDone / chaptersTotal) * 100))

  const onNav = (tab: SoulNavTab) => {
    if (tab === 'home') return
    if (tab === 'readings') navigate(isPremium ? '/readings' : '/rates')
    else if (tab === 'people') navigate('/people')
    else if (tab === 'profile') navigate('/account')
  }

  const openAgent = () => {
    navigate('/agent', {
      state: {
        starter: NOTE.headline,
        quotedNote: NOTE.headline,
        newChat: true,
      },
    })
  }

  const openReading = () => {
    navigate(isPremium ? '/readings' : '/rates')
  }

  const openPattern = () => {
    navigate(isPremium ? '/readings/your-pattern' : '/rates')
  }

  const openInsights = () => {
    if (day1) {
      toast.message('Nothing saved yet', {
        description: 'Highlights and bookmarked notes will appear here.',
      })
      return
    }
    toast.message('Saved insights', {
      description: 'Insights list UI comes next — not wired yet.',
    })
  }

  const openInstall = () => {
    toast.message('Install SOUL+AI', {
      description: 'Add-to-home / PWA guide comes next — not wired yet.',
    })
  }

  const saveNote = () => {
    if (noteSaved || loading) return
    setNoteSaved(true)
    toast.message('Saved to your insights', {
      description: 'Insight save is a UI shell until backend is wired.',
    })
  }

  return (
    <div className="soul-home">
      {/* Figma _background: stacked 390×848 ripples + dim overlay */}
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
            <SoulNav active="home" onChange={onNav} className="soul-home__top-nav" />
          </div>
        </header>

        {trial ? (
          <div className="soul-home__trial" role="status">
            <div className="soul-home__trial-copy">
              <p className="soul-home__trial-title">{trialTitle}</p>
              <p className="soul-home__trial-detail">{trialDetail}</p>
            </div>
            <Link className="soul-home__trial-manage" to="/account">
              Manage
            </Link>
          </div>
        ) : null}

        <section className="soul-home__note" aria-label="Today’s note">
          {loading ? (
            <div className="soul-home__skeleton" aria-busy="true" aria-live="polite">
              {/* Figma Skeleton · Note 625:3382 */}
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--eyebrow" />
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--h1" />
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--h2" />
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--h3" />
              <p className="soul-home__skeleton-label">Writing today’s note…</p>
            </div>
          ) : (
            <div className="soul-home__note-copy">
              <p className="soul-home__eyebrow">{eyebrow}</p>
              <h1 className="soul-home__headline">{NOTE.headline}</h1>
              <p className="soul-home__sub">{NOTE.sub}</p>
            </div>
          )}

          <div className="soul-home__actions">
            <div className="soul-home__action-row">
              <SoulButton showArrow disabled={loading} onClick={openAgent}>
                Talk this through
              </SoulButton>
              <SoulSecondaryButton
                aria-label={noteSaved ? 'Note saved' : 'Save today’s note'}
                disabled={loading}
                onClick={saveNote}
              />
            </div>
            <p className="soul-home__chapter">
              Drawn from{' '}
              <button type="button" onClick={openPattern}>
                your Pattern chapter
              </button>
            </p>
          </div>
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
                {!day1 ? (
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
        <SoulNav active="home" onChange={onNav} />
      </div>
    </div>
  )
}
