import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulNav, type SoulNavTab } from '@/components/soul'
import {
  READING_CHAPTERS,
  type ReadingChapter,
  type ReadingChapterId,
} from './chapters'
import './soul-readings.css'
import bgRipple from '../home/assets/bg-ripple.png'
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
  chaptersRead = 3,
  chaptersTotal = 9,
  wordsRead = 6400,
  wordsTotal = 18000,
  isPremium = true,
}: SoulReadingsScreenProps) {
  const navigate = useNavigate()
  const progressPct = Math.min(
    100,
    Math.round((chaptersRead / Math.max(1, chaptersTotal)) * 100),
  )

  const onNav = (tab: SoulNavTab) => {
    if (tab === 'readings') return
    if (tab === 'home') navigate('/')
    else if (tab === 'people') navigate('/people')
    else if (tab === 'profile') navigate('/account')
  }

  const openChapter = (chapter: ReadingChapter) => {
    if (!isPremium) {
      navigate('/rates')
      return
    }
    if (chapter.id === 'your-pattern') {
      navigate('/readings/your-pattern')
      return
    }
    toast.message(chapter.title, {
      description: 'Chapter detail comes after Your pattern.',
    })
  }

  return (
    <div className="soul-readings">
      <div className="soul-readings__bg" aria-hidden="true">
        <div className="soul-readings__bg-tile soul-readings__bg-tile--1">
          <img src={bgRipple} alt="" />
          <span className="soul-readings__bg-dim" />
        </div>
        <div className="soul-readings__bg-tile soul-readings__bg-tile--2">
          <img src={bgRipple} alt="" />
          <span className="soul-readings__bg-dim" />
        </div>
      </div>
      <div className="soul-readings__scrim" aria-hidden="true" />
      <div className="soul-readings__dock-scrim" aria-hidden="true" />

      <div className="soul-readings__scroll">
        <header className="soul-readings__header">
          <SoulBrand />
          <div className="soul-readings__header-nav" aria-label="Desktop navigation">
            <SoulNav active="readings" onChange={onNav} className="soul-readings__top-nav" />
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
              chapter={chapter}
              onOpen={() => openChapter(chapter)}
            />
          ))}
        </section>

        <footer className="soul-readings__footer">
          <hr className="soul-readings__divider" />
          <p className="soul-readings__footer-tag">
            Helping you unlock your potential through ancient wisdom and modern technology.
          </p>
          <div className="soul-readings__footer-links">
            <Link to="/contact">Support</Link>
            <Link to="/account">Manage subscription</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <a href="mailto:support@soulplusai.com">Refund Policy</a>
          </div>
          <a className="soul-readings__footer-email" href="mailto:support@soulplusai.com">
            support@soulplusai.com
          </a>
          <div className="soul-readings__footer-links">
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
          <p className="soul-readings__footer-copy">© 2026 Soul+AI. All rights reserved.</p>
        </footer>
      </div>

      <div className="soul-readings__dock">
        <SoulNav active="readings" onChange={onNav} />
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
