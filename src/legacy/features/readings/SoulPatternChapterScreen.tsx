import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand } from '@/components/soul'
import { PATTERN_META, PATTERN_SECTIONS } from './patternContent'
import './soul-pattern.css'
import bgRipple from '../home/assets/bg-ripple.png'
import patternHero from './assets/pattern-hero.png'
import iconArrowLight from './assets/icon-arrow-light.svg'
import iconArrowDark from './assets/icon-arrow-dark.svg'
import iconSave from './assets/icon-action-save.svg'
import iconAsk from './assets/icon-action-ask.svg'
import iconCopy from './assets/icon-action-copy.svg'

type MenuState = {
  top: number
  left: number
  text: string
} | null

/**
 * Figma DEV · Reading · Your pattern
 * Viewport 625:1991 · Action bar 625:2054 · Saved toast 625:2238
 */
export function SoulPatternChapterScreen() {
  const navigate = useNavigate()
  const sheetRef = useRef<HTMLDivElement>(null)
  const articleRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0.12)
  const [menu, setMenu] = useState<MenuState>(null)
  const [savedToast, setSavedToast] = useState(false)
  const toastTimer = useRef<number | null>(null)

  const onScroll = useCallback(() => {
    const el = sheetRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    if (max <= 0) {
      setProgress(0.12)
      return
    }
    const pct = el.scrollTop / max
    setProgress(Math.min(1, Math.max(0.08, pct)))
  }, [])

  useEffect(() => {
    const el = sheetRef.current
    if (!el) return
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => {
    const clearMenuIfOutside = () => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || !sel.toString().trim()) {
        setMenu(null)
      }
    }
    document.addEventListener('selectionchange', clearMenuIfOutside)
    return () => document.removeEventListener('selectionchange', clearMenuIfOutside)
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    }
  }, [])

  const placeMenuFromSelection = () => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      setMenu(null)
      return
    }
    const text = sel.toString().trim()
    if (!text || text.length < 8) {
      setMenu(null)
      return
    }
    const article = articleRef.current
    if (!article) return
    const anchor = sel.anchorNode
    if (!anchor || !article.contains(anchor)) {
      setMenu(null)
      return
    }
    const range = sel.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    if (!rect.width && !rect.height) {
      setMenu(null)
      return
    }
    const menuW = 280
    const left = Math.min(
      window.innerWidth - menuW - 12,
      Math.max(12, rect.left + rect.width / 2 - menuW / 2),
    )
    const top = Math.max(12, rect.top - 52)
    setMenu({ top, left, text })
  }

  const onArticleMouseUp = () => {
    window.setTimeout(placeMenuFromSelection, 0)
  }

  const showSavedToast = () => {
    setSavedToast(true)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setSavedToast(false), 3200)
  }

  const wrapSelectionMark = () => {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return
    const range = sel.getRangeAt(0)
    try {
      const mark = document.createElement('mark')
      mark.className = 'soul-pattern__mark'
      range.surroundContents(mark)
      sel.removeAllRanges()
    } catch {
      // Multi-node ranges can't surround — keep highlight via CSS selection only
    }
  }

  const onSave = () => {
    wrapSelectionMark()
    setMenu(null)
    showSavedToast()
  }

  const onAsk = () => {
    const text = menu?.text ?? ''
    setMenu(null)
    navigate('/agent', {
      state: {
        starter: text,
        quotedNote: text,
        newChat: true,
      },
    })
  }

  const onCopy = async () => {
    const text = menu?.text ?? ''
    try {
      await navigator.clipboard.writeText(text)
      toast.message('Copied')
    } catch {
      toast.message('Could not copy')
    }
    setMenu(null)
  }

  const talkThrough = () => {
    navigate('/agent', {
      state: {
        starter: 'Talk through my Pattern chapter with me.',
        quotedNote: PATTERN_META.title,
        newChat: true,
      },
    })
  }

  return (
    <div className="soul-pattern">
      <div className="soul-pattern__bg" aria-hidden="true">
        <div className="soul-pattern__bg-tile soul-pattern__bg-tile--1">
          <img src={bgRipple} alt="" />
          <span className="soul-pattern__bg-dim" />
        </div>
        <div className="soul-pattern__bg-tile soul-pattern__bg-tile--2">
          <img src={bgRipple} alt="" />
          <span className="soul-pattern__bg-dim" />
        </div>
      </div>

      <header className="soul-pattern__chrome">
        <button type="button" className="soul-pattern__brand" onClick={() => navigate('/')}>
          <SoulBrand />
        </button>
        <button
          type="button"
          className="soul-pattern__chrome-back"
          onClick={() => navigate('/readings')}
        >
          ‹ Back to readings
        </button>
      </header>

      <div
        className="soul-pattern__sheet"
        ref={sheetRef}
        role="document"
        aria-label="Your pattern chapter"
      >
        <div className="soul-pattern__layout">
          <div className="soul-pattern__main">
            <div className="soul-pattern__head">
              <button
                type="button"
                className="soul-pattern__grabber"
                aria-label="Close chapter"
                onClick={() => navigate('/readings')}
              >
                <span />
              </button>
              <div className="soul-pattern__head-row">
                <div className="soul-pattern__head-copy">
                  <h1 className="soul-pattern__title">{PATTERN_META.title}</h1>
                  <p className="soul-pattern__read-time">{PATTERN_META.readTime}</p>
                </div>
                <p className="soul-pattern__progress-label" aria-hidden="true">
                  {Math.round(progress * 100)}%
                </p>
              </div>
              <div className="soul-pattern__progress" aria-hidden="true">
                <span style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
            </div>

            <div className="soul-pattern__hero">
              <img src={patternHero} alt="" />
            </div>

            <article
              className="soul-pattern__article"
              ref={articleRef}
              onMouseUp={onArticleMouseUp}
              onTouchEnd={onArticleMouseUp}
            >
              {PATTERN_SECTIONS.map((section) => (
                <section
                  key={section.n}
                  id={`pattern-section-${section.n}`}
                  className="soul-pattern__section"
                >
                  <h2 className="soul-pattern__section-title">
                    <span className="soul-pattern__section-num">{section.n}.</span> {section.title}
                  </h2>
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </section>
              ))}
            </article>

            <div className="soul-pattern__end">
              <hr className="soul-pattern__end-rule" />
              <div className="soul-pattern__end-copy">
                <p className="soul-pattern__end-title">{PATTERN_META.finishedTitle}</p>
                <p className="soul-pattern__end-meta">{PATTERN_META.finishedMeta}</p>
              </div>
              <button type="button" className="soul-pattern__cta" onClick={talkThrough}>
                Talk this chapter through
                <img src={iconArrowLight} alt="" width={15} height={15} />
              </button>

              <button
                type="button"
                className="soul-pattern__next soul-pattern__next--mobile"
                onClick={() =>
                  toast.message('Purpose', {
                    description: 'Next chapter detail comes after this screen.',
                  })
                }
              >
                <span className="soul-pattern__next-body">
                  <span className="soul-pattern__next-label">{PATTERN_META.nextChapter.label}</span>
                  <span className="soul-pattern__next-blurb">{PATTERN_META.nextChapter.blurb}</span>
                </span>
                <img src={iconArrowDark} alt="" width={18} height={18} />
              </button>

              <button
                type="button"
                className="soul-pattern__back"
                onClick={() => navigate('/readings')}
              >
                ‹ Back to your readings
              </button>
            </div>
          </div>

          <aside className="soul-pattern__rail" aria-label="Chapter guide">
            <div className="soul-pattern__rail-card">
              <p className="soul-pattern__rail-kicker">Chapter</p>
              <p className="soul-pattern__rail-title">{PATTERN_META.title}</p>
              <p className="soul-pattern__rail-meta">{PATTERN_META.readTime} · 6 sections</p>
              <div className="soul-pattern__rail-progress" aria-hidden="true">
                <span style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
              <ol className="soul-pattern__rail-toc">
                {PATTERN_SECTIONS.map((section) => (
                  <li key={section.n}>
                    <button
                      type="button"
                      onClick={() => {
                        document
                          .getElementById(`pattern-section-${section.n}`)
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                    >
                      <span>{section.n}</span>
                      {section.title}
                    </button>
                  </li>
                ))}
              </ol>
              <button type="button" className="soul-pattern__cta soul-pattern__cta--rail" onClick={talkThrough}>
                Talk this through
                <img src={iconArrowLight} alt="" width={15} height={15} />
              </button>
              <button
                type="button"
                className="soul-pattern__next"
                onClick={() =>
                  toast.message('Purpose', {
                    description: 'Next chapter detail comes after this screen.',
                  })
                }
              >
                <span className="soul-pattern__next-body">
                  <span className="soul-pattern__next-label">{PATTERN_META.nextChapter.label}</span>
                  <span className="soul-pattern__next-blurb">{PATTERN_META.nextChapter.blurb}</span>
                </span>
                <img src={iconArrowDark} alt="" width={18} height={18} />
              </button>
            </div>
          </aside>
        </div>
      </div>

      {menu ? (
        <div
          className="soul-pattern__menu"
          style={{ top: menu.top, left: menu.left }}
          role="toolbar"
          aria-label="Selection actions"
        >
          <button type="button" onClick={onSave}>
            <img src={iconSave} alt="" width={14} height={14} />
            Save
          </button>
          <span className="soul-pattern__menu-div" aria-hidden="true" />
          <button type="button" onClick={onAsk}>
            <img src={iconAsk} alt="" width={14} height={14} />
            Ask about this
          </button>
          <span className="soul-pattern__menu-div" aria-hidden="true" />
          <button type="button" onClick={() => void onCopy()}>
            <img src={iconCopy} alt="" width={14} height={14} />
            Copy
          </button>
        </div>
      ) : null}

      {savedToast ? (
        <div className="soul-pattern__toast" role="status">
          <span>Saved to your insights</span>
          <button
            type="button"
            onClick={() => {
              setSavedToast(false)
              toast.message('Saved insights', {
                description: 'Insights list UI comes next.',
              })
            }}
          >
            View
          </button>
        </div>
      ) : null}
    </div>
  )
}
