import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulFooter, SoulNav, SoulRippleBg } from '@/components/soul'
import { useUser } from '@/hooks/useUser'
import {
  READING_CHAPTERS,
  type ReadingChapter,
  type ReadingChapterId,
} from './chapters'
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

/**
 * Figma DEV · Readings · Viewport (625:1793) / Full scroll (625:1663)
 * NEXT: chapter detail “Your pattern” (625:1991+)
 */
export function SoulReadingsScreen({
  chaptersRead: chaptersReadProp,
  chaptersTotal = 9,
  wordsRead: wordsReadProp,
  wordsTotal = 18000,
  isPremium: isPremiumProp,
}: SoulReadingsScreenProps) {
  const { user, isPremium: premiumFromSession, loading } = useUser()
  const isPremium = isPremiumProp ?? premiumFromSession
  const live = Boolean(user) || loading
  const chaptersRead = chaptersReadProp ?? (live ? 0 : 3)
  const wordsRead = wordsReadProp ?? (live ? 0 : 6400)
  const navigate = useNavigate()
  const progressPct = Math.min(
    100,
    Math.round((chaptersRead / Math.max(1, chaptersTotal)) * 100),
  )

  const openChapter = (chapter: ReadingChapter) => {
    if (chapter.id === 'your-pattern') {
      navigate(isPremium ? '/readings/your-pattern' : '/readings/your-pattern?ended=1')
      return
    }
    toast.message(chapter.title, {
      description: 'Chapter detail comes after Your pattern.',
    })
  }

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
            aria-label="SOUL+AI home"
          >
            <SoulBrand />
          </button>
          <div className="soul-readings__header-nav" aria-label="Desktop navigation">
            <SoulNav variant="desktop" />
          </div>
        </header>

        <section className="soul-readings__intro" aria-labelledby="soul-readings-title">
          <h1 id="soul-readings-title" className="soul-readings__title">
            Your readings
          </h1>
          <p className="soul-readings__subtitle">
            Nine chapters, written from your birth data and everything you&apos;ve told me
            since.
          </p>

          <div className="soul-readings__progress" aria-label="Reading progress">
            <div className="soul-readings__progress-meta">
              <span>
                {chaptersRead} of {chaptersTotal} chapters read
              </span>
              <span>
                {wordsRead.toLocaleString()} / {wordsTotal.toLocaleString()} words
              </span>
            </div>
            <div className="soul-readings__progress-track" aria-hidden="true">
              <span style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </section>

        <section className="soul-readings__chapters" aria-label="Chapters">
          {READING_CHAPTERS.map((chapter) => (
            <ChapterRow
              key={chapter.id}
              chapter={live ? { ...chapter, read: false } : chapter}
              onOpen={() => openChapter(chapter)}
            />
          ))}
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
