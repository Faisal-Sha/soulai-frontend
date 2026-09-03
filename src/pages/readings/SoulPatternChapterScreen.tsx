import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulNav, SoulPending, SoulRippleBg } from '@/components/soul'
import { useUser } from '@/hooks/useUser'
import { ResumeSheet } from '@/pages/home/ResumeSheet'
import { useSoulSheetParams } from '@/pages/home/useSoulSheetParams'
import { saveInsight } from '@/pages/insights/insightsApi'
import { READING_CHAPTERS, type ReadingChapterId } from './chapters'
import { countWords, nextPack, packById } from './readingCatalog'
import {
  ensureReading,
  getChapterRow,
  markChapterOpened,
  saveChapterProgress,
  type ChapterProgressRow,
} from './readingsApi'
import './soul-pattern.css'
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

const ENDED_STATUSES = new Set([
  'canceled',
  'cancelled',
  'expired',
  'inactive',
  'unpaid',
])

function isChapterId(raw: string | undefined): raw is ReadingChapterId {
  return Boolean(raw && packById(raw))
}

/**
 * Figma DEV · Reading chapter (Your pattern 625:1991). Same chrome for all nine.
 */
export function SoulPatternChapterScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { chapterId: chapterParam } = useParams()
  const chapterId: ReadingChapterId = isChapterId(chapterParam) ? chapterParam : 'your-pattern'
  const { profile, subscription, isPremium } = useUser()
  const sheetRef = useRef<HTMLDivElement>(null)
  const articleRef = useRef<HTMLElement>(null)
  const persistTimer = useRef<number | null>(null)
  const rowRef = useRef<ChapterProgressRow | null>(null)
  const latestRef = useRef({ pct: 0.12, section: 1, complete: false })
  const restoredScrollRef = useRef(false)
  const [row, setRow] = useState<ChapterProgressRow | null>(null)
  const [progress, setProgress] = useState(0.12)
  const [menu, setMenu] = useState<MenuState>(null)
  const [savedToast, setSavedToast] = useState(false)
  const toastTimer = useRef<number | null>(null)

  const catalog = packById(chapterId)
  const pack = row?.content ?? catalog
  const demo = READING_CHAPTERS.find((c) => c.id === chapterId)

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
  const canAskAboutSelection = !subscriptionEnded

  const next = pack ? nextPack(pack.id) : null
  const words = pack ? countWords(pack) : 0
  const mins = row?.read_time_min ?? pack?.readTimeMin ?? 6
  const title = pack?.title ?? demo?.title ?? 'Chapter'
  const endedQuery = subscriptionEnded ? '?ended=1' : ''

  useEffect(() => {
    restoredScrollRef.current = false
    let cancelled = false
    void (async () => {
      if (!profile?.id || !isChapterId(chapterId)) return
      try {
        await ensureReading(profile.id)
        const loaded = await getChapterRow(profile.id, chapterId)
        if (cancelled || !loaded) return
        rowRef.current = loaded
        setRow(loaded)
        if (loaded.scroll_pct > 0) setProgress(Math.max(0.08, loaded.scroll_pct / 100))
        await markChapterOpened(loaded.id)
      } catch {
        /* catalog fallback */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [chapterId, profile?.id])

  const persistProgress = useCallback(
    (pct: number, lastSection: number, complete: boolean, immediate = false) => {
      const current = rowRef.current
      if (!current) return
      latestRef.current = { pct, section: lastSection, complete }
      const write = () => {
        const row = rowRef.current
        if (!row) return
        const alreadyDone = Boolean(row.completed_at)
        if (complete && !alreadyDone) {
          rowRef.current = {
            ...row,
            completed_at: new Date().toISOString(),
            scroll_pct: 100,
            last_section_n: lastSection,
          }
        }
        void saveChapterProgress({
          rowId: row.id,
          scrollPct: Math.round(pct * 100),
          lastSectionN: lastSection,
          complete: complete && !alreadyDone,
        }).catch(() => {
          /* ignore */
        })
      }
      if (immediate || complete) {
        if (persistTimer.current) window.clearTimeout(persistTimer.current)
        write()
        return
      }
      if (persistTimer.current) window.clearTimeout(persistTimer.current)
      persistTimer.current = window.setTimeout(write, 400)
    },
    [],
  )

  const onScroll = useCallback(() => {
    const el = sheetRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    const article = articleRef.current
    let lastSection = 1
    if (article) {
      const sheetTop = el.getBoundingClientRect().top
      article.querySelectorAll<HTMLElement>('[data-section-n]').forEach((node) => {
        const top = node.getBoundingClientRect().top - sheetTop
        if (top <= el.clientHeight * 0.5) {
          lastSection = Number(node.dataset.sectionN) || lastSection
        }
      })
    }

    if (max <= 8) {
      const imagesPending = Array.from(el.querySelectorAll('img')).some((img) => !img.complete)
      if (imagesPending || el.scrollHeight < 240) return
      setProgress(1)
      persistProgress(1, pack?.sections.length ?? lastSection, true, true)
      return
    }
    const pct = Math.min(1, Math.max(0.08, el.scrollTop / max))
    setProgress(pct)
    persistProgress(pct, lastSection, pct >= 0.88)
  }, [pack?.sections.length, persistProgress])

  const hydrating = Boolean(profile?.id) && !row

  useEffect(() => {
    const el = sheetRef.current
    if (!el || hydrating) return

    const restore = () => {
      const saved = rowRef.current
      if (restoredScrollRef.current || !saved || saved.scroll_pct <= 0) return
      const max = el.scrollHeight - el.clientHeight
      if (max <= 8) return
      el.scrollTop = (saved.scroll_pct / 100) * max
      restoredScrollRef.current = true
    }

    restore()
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(() => {
      restore()
      onScroll()
    })
    ro.observe(el)
    el.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', onScroll, { once: true })
    })
    return () => {
      el.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [hydrating, onScroll, pack?.id, row?.id])

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
      if (persistTimer.current) window.clearTimeout(persistTimer.current)
      const row = rowRef.current
      const latest = latestRef.current
      if (row) {
        void saveChapterProgress({
          rowId: row.id,
          scrollPct: Math.round(latest.pct * 100),
          lastSectionN: latest.section,
          complete: latest.complete && !row.completed_at,
        }).catch(() => {
          /* ignore */
        })
      }
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
    const menuW = canAskAboutSelection ? 280 : 168
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
      /* keep CSS selection */
    }
  }

  const onSave = () => {
    wrapSelectionMark()
    const text = menu?.text ?? ''
    setMenu(null)
    if (!text.trim()) return
    if (!profile?.id) {
      showSavedToast()
      return
    }
    void saveInsight({
      ownerProfileId: profile.id,
      quote: text,
      source: title,
      sourceKind: 'reading',
    })
      .then((row) => {
        if (row) showSavedToast()
      })
      .catch(() => {
        /* keep the toast off so they can retry */
      })
  }

  const onAsk = () => {
    if (!canAskAboutSelection) return
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
    if (subscriptionEnded) {
      openResume('confirm')
      return
    }
    navigate('/agent', {
      state: {
        starter: `Talk through my ${title} chapter with me.`,
        quotedNote: title,
        newChat: true,
      },
    })
  }

  const goNext = () => {
    const current = rowRef.current
    if (current) {
      void saveChapterProgress({
        rowId: current.id,
        scrollPct: 100,
        lastSectionN: pack?.sections.length ?? 0,
        complete: true,
      })
    }
    if (next) {
      navigate(`/readings/${next.id}${endedQuery}`)
      return
    }
    navigate('/readings')
  }

  if (!pack) return null

  const sectionCount = pack.sections.length
  const progressPct = Math.round(progress * 100)

  return (
    <div className="soul-pattern">
      <SoulRippleBg className="soul-pattern__bg" />

      <div className="soul-pattern__chrome-wrap">
        <header className="soul-pattern__chrome">
          <button type="button" className="soul-pattern__brand" onClick={() => navigate('/')}>
            <SoulBrand />
          </button>
          <div className="soul-pattern__header-nav" aria-label="Desktop navigation">
            <SoulNav variant="desktop" />
          </div>
        </header>
        <div className="soul-pattern__chrome-bar">
          <button
            type="button"
            className="soul-pattern__chrome-back"
            onClick={() => navigate('/readings')}
          >
            ‹ Back to readings
          </button>
        </div>
      </div>

      {hydrating ? (
        <div className="soul-pattern__hydrate">
          <SoulPending variant="center" label="Opening chapter" />
        </div>
      ) : null}
      <div
        className="soul-pattern__sheet"
        ref={sheetRef}
        role="document"
        aria-label={`${title} chapter`}
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
                  <h1 className="soul-pattern__title">{title}</h1>
                  <p className="soul-pattern__read-time">{mins} min read</p>
                </div>
                <p className="soul-pattern__progress-label" aria-hidden="true">
                  {progressPct}%
                </p>
              </div>
              <div className="soul-pattern__progress" aria-hidden="true">
                <span style={{ width: `${progressPct}%` }} />
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
              {pack.sections.map((section) => (
                <section
                  key={section.n}
                  id={`${pack.id}-section-${section.n}`}
                  data-section-n={section.n}
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
                <p className="soul-pattern__end-title">You’ve finished {title}</p>
                <p className="soul-pattern__end-meta">
                  {sectionCount} sections · {words.toLocaleString()} words
                </p>
              </div>
              {!subscriptionEnded ? (
                <button type="button" className="soul-pattern__cta" onClick={talkThrough}>
                  Talk this chapter through
                  <img src={iconArrowLight} alt="" width={15} height={15} />
                </button>
              ) : null}

              {next ? (
                <button type="button" className="soul-pattern__next soul-pattern__next--mobile" onClick={goNext}>
                  <span className="soul-pattern__next-body">
                    <span className="soul-pattern__next-label">Next · {next.title}</span>
                    <span className="soul-pattern__next-blurb">{next.blurb}</span>
                  </span>
                  <img src={iconArrowDark} alt="" width={18} height={18} />
                </button>
              ) : null}

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
              <p className="soul-pattern__rail-title">{title}</p>
              <p className="soul-pattern__rail-meta">
                {mins} min read · {sectionCount} sections
              </p>
              <div className="soul-pattern__rail-progress" aria-hidden="true">
                <span style={{ width: `${progressPct}%` }} />
              </div>
              <ol className="soul-pattern__rail-toc">
                {pack.sections.map((section) => (
                  <li key={section.n}>
                    <button
                      type="button"
                      onClick={() => {
                        document
                          .getElementById(`${pack.id}-section-${section.n}`)
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                    >
                      <span>{section.n}</span>
                      {section.title}
                    </button>
                  </li>
                ))}
              </ol>
              {!subscriptionEnded ? (
                <button
                  type="button"
                  className="soul-pattern__cta soul-pattern__cta--rail"
                  onClick={talkThrough}
                >
                  Talk this through
                  <img src={iconArrowLight} alt="" width={15} height={15} />
                </button>
              ) : null}
              {next ? (
                <button type="button" className="soul-pattern__next" onClick={goNext}>
                  <span className="soul-pattern__next-body">
                    <span className="soul-pattern__next-label">Next · {next.title}</span>
                    <span className="soul-pattern__next-blurb">{next.blurb}</span>
                  </span>
                  <img src={iconArrowDark} alt="" width={18} height={18} />
                </button>
              ) : null}
            </div>
          </aside>
        </div>
      </div>

      {menu ? (
        <div
          className={`soul-pattern__menu${canAskAboutSelection ? '' : ' soul-pattern__menu--compact'}`}
          style={{ top: menu.top, left: menu.left }}
          role="toolbar"
          aria-label="Selection actions"
        >
          <button type="button" onClick={onSave}>
            <img src={iconSave} alt="" width={14} height={14} />
            Save
          </button>
          <span className="soul-pattern__menu-div" aria-hidden="true" />
          {canAskAboutSelection ? (
            <>
              <button type="button" onClick={onAsk}>
                <img src={iconAsk} alt="" width={14} height={14} />
                Ask about this
              </button>
              <span className="soul-pattern__menu-div" aria-hidden="true" />
            </>
          ) : null}
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
              navigate('/insights')
            }}
          >
            View
          </button>
        </div>
      ) : null}

      <ResumeSheet
        open={resumeOpen}
        mode={resumeMode}
        onClose={closeResume}
        onModeChange={openResume}
      />
    </div>
  )
}
