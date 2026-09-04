import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SoulBrand, SoulFooter, SoulNav, SoulPending, SoulRippleBg } from '@/components/soul'
import { useCopy, useI18n } from '@/i18n'
import { useUser } from '@/hooks/useUser'
import {
  getReadingChapters,
  localizeReadingChapter,
  type ReadingChapter,
  type ReadingChapterId,
} from './chapters'
import {
  ensureReading,
  summarizeProgress,
  toListChapter,
  type ChapterProgressRow,
  type ReadingProgress,
} from './readingsApi'
import './soul-readings.css'
import iconRead from './assets/icon-read.svg'
import iconChevron from './assets/icon-chevron.svg'

type SoulReadingsScreenProps = {
  chaptersRead?: number
  chaptersTotal?: number
  wordsRead?: number
  wordsTotal?: number
  isPremium?: boolean
}

const ENDED_STATUSES = new Set([
  'canceled',
  'cancelled',
  'expired',
  'inactive',
  'unpaid',
])

/**
 * Figma DEV · Readings · Viewport (625:1793) / Full scroll (625:1663)
 */
export function SoulReadingsScreen({
  chaptersRead: chaptersReadProp,
  chaptersTotal: chaptersTotalProp,
  wordsRead: wordsReadProp,
  wordsTotal: wordsTotalProp,
  isPremium: isPremiumProp,
}: SoulReadingsScreenProps) {
  const { user, profile, isPremium: premiumFromSession, subscription, loading } = useUser()
  const t = useCopy()
  const { locale } = useI18n()
  const isPremium = isPremiumProp ?? premiumFromSession
  const live = Boolean(user)
  const [searchParams] = useSearchParams()
  const [rows, setRows] = useState<ChapterProgressRow[] | null>(null)
  const [list, setList] = useState<ReadingChapter[]>([])
  const [progress, setProgress] = useState<ReadingProgress | null>(null)
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()

  const subscriptionEnded = useMemo(() => {
    if (searchParams.get('ended') === '1' || searchParams.get('ended') === 'true') return true
    const status = subscription?.status?.toLowerCase() ?? ''
    return !isPremium && ENDED_STATUSES.has(status)
  }, [searchParams, subscription?.status, isPremium])

  useEffect(() => {
    if (loading) return
    if (!profile?.id) {
      setRows(null)
      setList(getReadingChapters())
      setProgress(null)
      setReady(true)
      return
    }
    setReady(false)
    let cancelled = false
    void ensureReading(profile.id)
      .then((loaded) => {
        if (cancelled) return
        setRows(loaded)
        setProgress(summarizeProgress(loaded))
      })
      .catch(() => {
        if (!cancelled) {
          setRows([])
          setList([])
        }
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [profile?.id, loading])

  useEffect(() => {
    if (!profile?.id) {
      setList(getReadingChapters())
      return
    }
    if (rows) setList(rows.map(toListChapter))
  }, [locale, profile?.id, rows])

  const waiting = loading || (live && !ready)
  const chaptersRead = chaptersReadProp ?? (waiting ? 0 : live ? progress?.chaptersRead ?? 0 : 3)
  const chaptersTotal = chaptersTotalProp ?? progress?.chaptersTotal ?? 9
  const wordsRead = wordsReadProp ?? (waiting ? 0 : live ? progress?.wordsRead ?? 0 : 6400)
  const wordsTotal = wordsTotalProp ?? progress?.wordsTotal ?? 18000
  const progressPct = Math.min(
    100,
    progress?.overallPct ??
      Math.round((chaptersRead / Math.max(1, chaptersTotal)) * 100),
  )

  const openChapter = (chapter: ReadingChapter) => {
    const q = !isPremium || subscriptionEnded ? '?ended=1' : ''
    navigate(`/readings/${chapter.id}${q}`)
  }

  const displayList = (live ? list : getReadingChapters()).map(localizeReadingChapter)

  return (
    <div className="soul-readings">
      <SoulRippleBg className="soul-readings__bg" />
      <div className="soul-readings__scrim" aria-hidden="true" />
      <div className="soul-readings__dock-scrim" aria-hidden="true" />

      <div className="soul-readings__scroll">
        <header className="soul-readings__header">
          <button
            type="button"
            className="soul-readings__brand"
            onClick={() => navigate('/')}
            aria-label={t('readings.homeAria', 'SOUL+AI home')}
          >
            <SoulBrand />
          </button>
          <div className="soul-readings__header-nav" aria-label={t('readings.desktopNavAria', 'Desktop navigation')}>
            <SoulNav variant="desktop" />
          </div>
        </header>

        <section className="soul-readings__intro" aria-labelledby="soul-readings-title">
          <h1 id="soul-readings-title" className="soul-readings__title">
            {t('readings.title', 'Your readings')}
          </h1>
          <p className="soul-readings__subtitle">
            {t(
              'readings.subtitle',
              "Nine chapters, written from your birth data and everything you've told me since.",
            )}
          </p>

          <div className="soul-readings__progress" aria-label={t('readings.progressAria', 'Reading progress')}>
            {waiting ? (
              <SoulPending rows={1} label={t('readings.checkingChapters', 'Checking your chapters')} />
            ) : (
              <>
                <div className="soul-readings__progress-meta">
                  <span>
                    {t('readings.chaptersRead', `${chaptersRead} of ${chaptersTotal} chapters read`, {
                      read: chaptersRead,
                      total: chaptersTotal,
                    })}
                  </span>
                  <span>
                    {t('readings.wordsProgress', `${wordsRead.toLocaleString()} / ${wordsTotal.toLocaleString()} words`, {
                      read: wordsRead.toLocaleString(),
                      total: wordsTotal.toLocaleString(),
                    })}
                  </span>
                </div>
                <div className="soul-readings__progress-track" aria-hidden="true">
                  <span style={{ width: `${progressPct}%` }} />
                </div>
              </>
            )}
          </div>
        </section>

        <section className="soul-readings__chapters" aria-label={t('readings.chaptersAria', 'Chapters')}>
          {waiting ? (
            <SoulPending rows={9} label={t('readings.loadingChapters', 'Loading chapters')} />
          ) : (
            displayList.map((chapter) => (
              <ChapterRow
                key={chapter.id}
                chapter={chapter}
                onOpen={() => openChapter(chapter)}
              />
            ))
          )}
        </section>

        <SoulFooter className="soul-readings__footer" />
      </div>

      <div className="soul-readings__nav soul-readings__nav--mobile">
        <SoulNav />
      </div>
    </div>
  )
}

function ChapterRow({
  chapter,
  onOpen,
}: {
  chapter: ReadingChapter
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      className={[
        'soul-readings__chapter',
        chapter.read ? 'soul-readings__chapter--read' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onOpen}
      data-chapter={chapter.id as ReadingChapterId}
    >
      <span className="soul-readings__chapter-body">
        <span className="soul-readings__chapter-heading">
          <span className="soul-readings__chapter-title">{chapter.title}</span>
          {chapter.read ? (
            <img
              className="soul-readings__chapter-check"
              src={iconRead}
              alt=""
              width={16}
              height={16}
            />
          ) : null}
        </span>
        <span className="soul-readings__chapter-blurb">{chapter.blurb}</span>
        {chapter.meta ? (
          <span className="soul-readings__chapter-meta">{chapter.meta}</span>
        ) : null}
      </span>
      <img
        className="soul-readings__chapter-chevron"
        src={iconChevron}
        alt=""
        width={22}
        height={22}
      />
    </button>
  )
}
