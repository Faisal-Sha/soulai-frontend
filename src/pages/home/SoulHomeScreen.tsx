import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useCopy, useI18n, destylizeDashes, foldCopy, isCatalogCopy, isEnglish } from '@/i18n'
import { localizeCatalogQuote } from '@/i18n/catalogSnippets'
import { STATIC_DAILY_NOTE } from '@/pages/readings/readingCatalog'
import { useUser } from '@/hooks/useUser'
import { quoteIsSaved, saveInsight } from '@/pages/insights/insightsApi'
import {
  SoulBrand,
  SoulButton,
  SoulNav,
  SoulRippleBg,
  SoulSecondaryButton,
  SoulTextLink,
} from '@/components/soul'
import { variantFromUrlParam } from './resolveHomeVariant'
import { AddToHomeSheet } from './AddToHomeSheet'
import { ResumeSheet } from './ResumeSheet'
import { useSoulSheetParams } from './useSoulSheetParams'
import { useHomeEnter } from './useHomeEnter'
import './soul-home.css'
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
  continueChapterId?: string
  readingsProgressPct?: number
  dailyHeadline?: string
  dailySub?: string
  insightsCount?: number
  shelfReady?: boolean
  compatSummary?: string
  isPremium?: boolean
  /** Trial banner. Figma 616:1545 */
  trialTitle?: string
  trialDetail?: string
  /** Unpaid home resume price. Figma 949:5189 */
  resumePrice?: string
}

const NOTE = {
  headline: 'You move fastest right after you decide. Slowest while you look for permission',
  sub: 'Today asks for a small decision made without asking anyone.',
  unpaidSub: 'Resume to talk it through with your mentor.',
} as const

const CATALOG_NOTE_HEADLINES = [
  NOTE.headline,
  'You move fastest right after you decide — and slowest while you look for permission.',
  'You move fastest right after you decide — and slowest while you look for permission',
] as const

const CATALOG_NOTE_SUBS = [
  NOTE.sub,
  'Today asks for a small decision made without asking anyone.',
] as const

const UNPAID_BANNER = {
  title: 'Your subscription ended',
  detail: "Everything you've built stays. Reading, insights, conversations.",
} as const

const POOL_NOTE = {
  headline: "You've seen everything your reading had to offer",
  sub: 'The rest happens in conversation. Your chapters stay yours either way.',
} as const

const WELCOME_BACK = {
  title: 'Welcome back',
  body: "Payment successful. Everything's unlocked. Preparing today's insight. It'll be ready in a moment.",
} as const

function formatHomeDate(d = new Date(), locale?: string) {
  return d.toLocaleDateString(locale === 'ru' ? 'ru-RU' : undefined, {
    month: 'short',
    day: 'numeric',
  })
}

/**
 * SOUL+AI Home. Figma DEV
 * Unpaid #1: Home · subscription ended (949:5169)
 * Unpaid #2: Home · reading pool exhausted (950:5833)
 * Paid: Home · payment confirmation (952:6176)
 */
export function SoulHomeScreen({
  variant: variantProp,
  dayNumber = 12,
  chaptersDone = 3,
  chaptersTotal = 9,
  continueChapterId = 'your-pattern',
  readingsProgressPct,
  dailyHeadline,
  dailySub,
  insightsCount = 12,
  shelfReady = true,
  compatSummary = 'Anna, Mark and 2 more',
  isPremium = true,
  trialTitle = 'Your trial ends tomorrow',
  trialDetail = '$6.99/month starts soon. Cancel anytime.',
  resumePrice = '$6.99',
}: SoulHomeScreenProps) {
  const navigate = useNavigate()
  const t = useCopy()
  const { locale } = useI18n()
  const { profile } = useUser()
  const [searchParams] = useSearchParams()
  const variant =
    variantProp ?? variantFromUrlParam(searchParams.get('home')) ?? 'default'
  const [savedToast, setSavedToast] = useState(false)
  const [welcomeDismissed, setWelcomeDismissed] = useState(false)
  const [notesKept, setNotesKept] = useState(insightsCount)
  const toastTimer = useRef<number | null>(null)
  const homeRootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setNotesKept(insightsCount)
  }, [insightsCount])

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
  const catalogHeadline =
    isCatalogCopy(dailyHeadline, STATIC_DAILY_NOTE.headline, ...CATALOG_NOTE_HEADLINES) ||
    foldCopy(dailyHeadline ?? '').startsWith('you move fastest right after you decide')
  const catalogSub = isCatalogCopy(dailySub, STATIC_DAILY_NOTE.sub, ...CATALOG_NOTE_SUBS)
  const rawHeadline = catalogHeadline
    ? t('home.note.headline', NOTE.headline)
    : localizeCatalogQuote((dailyHeadline ?? '').trim())
  const rawSub = catalogSub
    ? t('home.note.sub', NOTE.sub)
    : localizeCatalogQuote((dailySub ?? '').trim())
  const noteHeadline = isEnglish(locale) ? rawHeadline : destylizeDashes(rawHeadline)
  const noteSub = isEnglish(locale) ? rawSub : destylizeDashes(rawSub)
  const noteQuote = unpaidPool ? t('home.pool.headline', POOL_NOTE.headline) : noteHeadline
  const [noteSaved, setNoteSaved] = useState(false)

  useEffect(() => {
    if (!profile?.id || unpaidPool) {
      setNoteSaved(false)
      return
    }
    let cancelled = false
    void quoteIsSaved(profile.id, noteQuote)
      .then((saved) => {
        if (!cancelled) setNoteSaved(saved)
      })
      .catch(() => {
        if (!cancelled) setNoteSaved(false)
      })
    return () => {
      cancelled = true
    }
  }, [noteQuote, profile?.id, unpaidPool])
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
    const dateLabel = formatHomeDate(undefined, locale)
    return t('home.eyebrow', `Today · ${dateLabel} · Day ${day}`, {
      date: dateLabel,
      day,
    })
  }, [day1, dayNumber, locale, t])

  const readingsMeta = shelfReady
    ? t('home.shelf.chaptersOf', `${chaptersDone} of ${chaptersTotal} chapters`, {
        done: chaptersDone,
        total: chaptersTotal,
      })
    : t('home.shelf.checkingChapters', 'Checking your chapters…')
  const readingsCta = !shelfReady
    ? t('home.shelf.openReadings', 'Open readings')
    : chaptersDone === 0 && (readingsProgressPct ?? 0) === 0
      ? t('home.shelf.startReading', 'Start reading')
      : t('home.shelf.continueReading', 'Continue reading')
  const insightsMeta = useMemo(() => {
    if (!shelfReady) return t('home.shelf.checkingNotes', 'Checking notes…')
    if (day1) {
      return notesKept > 0
        ? notesKept === 1
          ? t('home.shelf.notesKeptOne', `${notesKept} note you kept`, { count: notesKept })
          : t('home.shelf.notesKept', `${notesKept} notes you kept`, { count: notesKept })
        : t('home.shelf.highlightHint', 'Anything you highlight will live here')
    }
    return t('home.shelf.notesKept', `${notesKept} notes you kept`, { count: notesKept })
  }, [day1, notesKept, noteSaved, shelfReady, t])
  const insightsCta =
    day1 && notesKept === 0
      ? t('home.shelf.nothingSaved', 'Nothing saved yet')
      : t('home.shelf.seeAll', 'See all')
  const compatEmpty =
    compatSummary.startsWith('Add someone') ||
    compatSummary === t('people.compatHomeSummary.empty', 'Add someone close to you')
  const compatMeta = !shelfReady
    ? t('home.shelf.checking', 'Checking…')
    : day1 || compatEmpty
      ? t('home.shelf.addSomeoneClose', 'Add someone close to you')
      : compatSummary
  const compatCta =
    day1 || compatEmpty
      ? t('home.shelf.addSomeone', 'Add someone')
      : t('home.shelf.seeAll', 'See all')
  const progressPct = unpaidPool
    ? 100
    : !shelfReady
      ? 0
      : Math.min(
          100,
          Math.round(
            readingsProgressPct ??
              (chaptersDone / Math.max(1, chaptersTotal)) * 100,
          ),
        )
  const showShelfProgress = true

  const openAgent = () => {
    const starter = unpaidPool ? t('home.pool.headline', POOL_NOTE.headline) : noteHeadline
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
    navigate(
      unpaidLike
        ? `/readings/${continueChapterId}?ended=1`
        : `/readings/${continueChapterId}`,
    )
  }

  const openInsights = () => {
    navigate(day1 && notesKept === 0 ? '/insights/empty' : '/insights')
  }

  const onResume = () => openResume('confirm')

  const showSavedToast = () => {
    setSavedToast(true)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setSavedToast(false), 3200)
  }

  const saveNote = () => {
    if (noteSaved || noteLoading || unpaidPool) return
    if (!profile?.id) return
    void saveInsight({
      ownerProfileId: profile.id,
      quote: noteQuote,
      source: t('home.note.sourceDaily', "Today's note"),
      sourceKind: 'daily_note',
    })
      .then((row) => {
        if (row) {
          setNoteSaved(true)
          setNotesKept((n) => n + 1)
          showSavedToast()
        }
      })
      .catch(() => {
        /* keep unsaved so they can retry */
      })
  }

  useHomeEnter(homeRootRef, [variant, noteLoading])

  return (
    <div
      ref={homeRootRef}
      className={`soul-home${paymentConfirmation && !welcomeDismissed ? ' soul-home--welcome-open' : ''}${resumeOpen || installOpen ? ' soul-home--sheet-open' : ''}`}
    >
      <SoulRippleBg className="soul-home__bg" />
      <div className="soul-home__scrim" aria-hidden="true" />
      <div className="soul-home__dock-scrim" aria-hidden="true" />

      <div className="soul-home__scroll">
        <header
          className="soul-home__header soul-home__enter soul-home__enter--header"
          data-home-enter
          data-home-enter-delay="0"
        >
          <SoulBrand />
          <div className="soul-home__header-nav" aria-label={t('home.nav.desktopAria', 'Desktop navigation')}>
            <SoulNav variant="desktop" />
          </div>
        </header>

        {unpaidLike ? (
          <div className="soul-home__trial soul-home__trial--notice soul-home__enter soul-home__enter--banner" role="status" data-home-enter data-home-enter-delay="150">
            <div className="soul-home__trial-copy">
              <p className="soul-home__trial-title">{t('home.unpaid.title', UNPAID_BANNER.title)}</p>
              <p className="soul-home__trial-detail">{t('home.unpaid.detail', UNPAID_BANNER.detail)}</p>
            </div>
            <Link className="soul-home__trial-manage" to="/account/plan">
              {t('home.trialNotice.manage', 'Manage')}
            </Link>
          </div>
        ) : null}

        {trial ? (
          <div className="soul-home__trial soul-home__trial--notice soul-home__enter soul-home__enter--banner" role="status" data-home-enter data-home-enter-delay="150">
            <div className="soul-home__trial-copy">
              <p className="soul-home__trial-title">{trialTitle}</p>
              <p className="soul-home__trial-detail">{trialDetail}</p>
            </div>
            <Link className="soul-home__trial-manage" to="/account/plan">
              {t('home.trialNotice.manage', 'Manage')}
            </Link>
          </div>
        ) : null}

        <section className="soul-home__note" aria-label={t('home.note.aria', 'Today’s note')}>
          {noteLoading ? (
            <div
              className={`soul-home__skeleton${paymentConfirmation ? ' soul-home__skeleton--offset' : ''} soul-home__enter soul-home__enter--eyebrow`}
              aria-busy="true"
              aria-live="polite"
              data-home-enter
              data-home-enter-delay="200"
            >
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--eyebrow" />
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--h1" />
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--h2" />
              <span className="soul-home__skeleton-bar soul-home__skeleton-bar--h3" />
              <p className="soul-home__skeleton-label">{t('home.note.writing', 'Writing today’s note…')}</p>
            </div>
          ) : (
            <div className="soul-home__note-copy">
              {!unpaidLike ? (
                <p
                  className="soul-home__eyebrow soul-home__enter soul-home__enter--eyebrow"
                  data-home-enter
                  data-home-enter-delay="200"
                >
                  {eyebrow}
                </p>
              ) : null}
              <h1
                className="soul-home__headline soul-home__enter soul-home__enter--headline"
                data-home-enter
                data-home-enter-delay="400"
              >
                {unpaidPool ? t('home.pool.headline', POOL_NOTE.headline) : noteHeadline}
              </h1>
              <p
                className="soul-home__sub soul-home__enter soul-home__enter--sub"
                data-home-enter
                data-home-enter-delay="600"
              >
                {unpaidPool
                  ? t('home.pool.sub', POOL_NOTE.sub)
                  : unpaid
                    ? t('home.note.unpaidSub', NOTE.unpaidSub)
                    : noteSub}
              </p>
            </div>
          )}

          {!noteLoading ? (
            <div
              className="soul-home__actions soul-home__enter soul-home__enter--actions"
              data-home-enter
              data-home-enter-delay="900"
            >
              {unpaidLike ? (
                <div className="soul-home__action-row">
                  <SoulButton showArrow onClick={onResume}>
                    {t('home.resume.resume', `Resume · ${resumePrice}/mo`, { price: resumePrice })}
                  </SoulButton>
                </div>
              ) : (
                <>
                  <div className="soul-home__action-row">
                    <SoulButton showArrow disabled={noteLoading} onClick={openAgent}>
                      {t('home.note.talkThrough', 'Talk this through')}
                    </SoulButton>
                    <SoulSecondaryButton
                      aria-label={
                        noteSaved
                          ? t('home.note.savedAria', 'Note saved')
                          : t('home.note.saveAria', 'Save today’s note')
                      }
                      disabled={noteLoading}
                      onClick={saveNote}
                    />
                  </div>
                  <p className="soul-home__chapter">
                    {t('home.note.drawnFrom', 'Drawn from')}{' '}
                    <button type="button" onClick={openPattern}>
                      {t('home.note.patternChapter', 'your Pattern chapter')}
                    </button>
                  </p>
                </>
              )}
            </div>
          ) : null}
        </section>

        <section className="soul-home__shelf" aria-label={t('home.shelf.aria', 'Your shelf')}>
          <hr
            className="soul-home__divider soul-home__enter soul-home__enter--fade"
            data-home-enter
            data-home-enter-delay="1100"
          />
          <div className="soul-home__cards">
            <button
              type="button"
              className="soul-home__card soul-home__enter soul-home__enter--card"
              data-home-enter
              data-home-enter-delay="1200"
              onClick={openReading}
            >
              <div className="soul-home__card-body">
                <div>
                  <h2 className="soul-home__card-title">{t('home.shelf.readings', 'Your readings')}</h2>
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

            <button
              type="button"
              className="soul-home__card soul-home__enter soul-home__enter--card"
              data-home-enter
              data-home-enter-delay="1400"
              onClick={openInsights}
            >
              <div className="soul-home__card-body">
                <div>
                  <h2 className="soul-home__card-title">{t('home.shelf.insights', 'Saved insights')}</h2>
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
              className="soul-home__card soul-home__enter soul-home__enter--card"
              data-home-enter
              data-home-enter-delay="1600"
              onClick={() => navigate('/people')}
            >
              <div className="soul-home__card-body">
                <div>
                  <h2 className="soul-home__card-title">{t('home.shelf.compat', 'Compatibilities')}</h2>
                  <p className="soul-home__card-meta">{compatMeta}</p>
                </div>
                <SoulTextLink showArrow>{compatCta}</SoulTextLink>
              </div>
              <span className="soul-home__card-icon" aria-hidden="true">
                <img src={iconCompat} alt="" />
              </span>
            </button>
          </div>
          <hr
            className="soul-home__divider soul-home__enter soul-home__enter--fade"
            data-home-enter
            data-home-enter-delay="1800"
          />
        </section>

        <button
          type="button"
          className="soul-home__install soul-home__enter soul-home__enter--install"
          data-home-enter
          data-home-enter-delay="1900"
          onClick={openInstall}
        >
          <span className="soul-home__install-mark">
            <img src={markApp} alt="" width={28} height={28} />
          </span>
          <span className="soul-home__install-body">
            <span>
              <p className="soul-home__install-title">
                {t('home.install.title', 'Keep SOUL+AI one tap away')}
              </p>
              <p className="soul-home__install-sub">
                {t('home.install.sub', 'Your note is waiting each morning.')}
              </p>
            </span>
            <SoulTextLink tone="on-dark" showArrow>
              {t('home.install.how', 'Show me how')}
            </SoulTextLink>
          </span>
        </button>

        <footer
          className="soul-home__footer soul-home__enter soul-home__enter--footer"
          data-home-enter
          data-home-enter-delay="2200"
        >
          <hr className="soul-home__divider" />
          <p className="soul-home__footer-tag">
            {t(
              'common.footer.tagline',
              'Helping you unlock your potential through ancient wisdom and modern technology.',
            )}
          </p>
          <div className="soul-home__footer-links">
            <Link to="/contact">{t('common.footer.support', 'Support')}</Link>
            <Link to="/about">{t('common.footer.about', 'About')}</Link>
            <Link to="/account">{t('common.footer.manageSubscription', 'Manage subscription')}</Link>
            <Link to="/terms">{t('common.footer.terms', 'Terms of Service')}</Link>
            <Link to="/privacy">{t('common.footer.privacy', 'Privacy Policy')}</Link>
            <Link to="/faq">{t('common.footer.refund', 'Refund Policy')}</Link>
          </div>
          <a className="soul-home__footer-email" href="mailto:support@soulplusai.com">
            support@soulplusai.com
          </a>
          <div className="soul-home__footer-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              {t('common.footer.social.instagram', 'Instagram')}
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              {t('common.footer.social.facebook', 'Facebook')}
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              {t('common.footer.social.twitter', 'Twitter')}
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              {t('common.footer.social.youtube', 'Youtube')}
            </a>
          </div>
          <p className="soul-home__footer-copy">
            {t('common.footer.copyright', '© 2026 Soul+AI. All rights reserved.')}
          </p>
        </footer>
      </div>

      <div className="soul-home__nav soul-home__nav--mobile">
        <SoulNav />
      </div>

      {showAgentFab ? (
        <button
          type="button"
          className="soul-home__agent-fab soul-home__agent-fab--mobile"
          aria-label={t('home.fab.talkAria', 'Talk this through with your mentor')}
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
          <span>{t('home.toast.saved', 'Saved to your insights')}</span>
          <button
            type="button"
            onClick={() => {
              setSavedToast(false)
              navigate('/insights')
            }}
          >
            {t('home.toast.view', 'View')}
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
                {t('home.welcome.title', WELCOME_BACK.title)}
              </p>
              <p className="soul-home__welcome-body" id="soul-home-welcome-body">
                {t('home.welcome.body', WELCOME_BACK.body)}
              </p>
            </div>
            <SoulButton block onClick={() => setWelcomeDismissed(true)}>
              {t('home.welcome.close', 'Close')}
            </SoulButton>
          </div>
        </div>
      ) : null}
    </div>
  )
}
