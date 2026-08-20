import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SoulBrand, SoulButton } from '@/components/soul'
import { SAVED_INSIGHTS, type SavedInsight } from './insightsData'
import { loadAllSavedInsights, removeUserSavedInsight } from './insightsStore'
import './soul-insights.css'
import bgRipple from '../home/assets/bg-ripple.png'
import iconBack from './assets/icon-back.svg'
import iconBookmark from './assets/icon-bookmark.svg'

export type InsightsVariant = 'list' | 'open' | 'empty'

type SoulSavedInsightsScreenProps = {
  variant?: InsightsVariant
}

function variantFromPath(pathname: string): InsightsVariant {
  if (pathname.endsWith('/empty')) return 'empty'
  if (pathname.endsWith('/open')) return 'open'
  return 'list'
}

/**
 * Figma DEV · Saved insights
 * Card close 955:7508 → /insights
 * Card open 955:8437 → /insights/open
 * Empty 955:8167 → /insights/empty
 */
export function SoulSavedInsightsScreen({ variant: variantProp }: SoulSavedInsightsScreenProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const variant = variantProp ?? variantFromPath(pathname)

  const [insights, setInsights] = useState(() =>
    variant === 'empty' ? [] : loadAllSavedInsights(),
  )
  const [openId, setOpenId] = useState<string | null>(() =>
    variant === 'open' ? SAVED_INSIGHTS[0]?.id ?? null : null,
  )

  const empty = insights.length === 0

  const removeInsight = (id: string) => {
    removeUserSavedInsight(id)
    setInsights((items) => items.filter((item) => item.id !== id))
    setOpenId((current) => (current === id ? null : current))
  }

  const toggleOpen = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  const goBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

  return (
    <div className="soul-insights">
      <div className="soul-insights__bg" aria-hidden="true">
        <div className="soul-insights__bg-tile soul-insights__bg-tile--1">
          <img src={bgRipple} alt="" />
          <span className="soul-insights__bg-dim" />
        </div>
        <div className="soul-insights__bg-tile soul-insights__bg-tile--2">
          <img src={bgRipple} alt="" />
          <span className="soul-insights__bg-dim" />
        </div>
      </div>
      <div className="soul-insights__scrim" aria-hidden="true" />

      <div className="soul-insights__scroll">
        <header className="soul-insights__header">
          <div className="soul-insights__header-left">
            <button
              type="button"
              className="soul-insights__back"
              onClick={goBack}
              aria-label="Back"
            >
              <img src={iconBack} alt="" width={22} height={22} />
            </button>
            <SoulBrand />
          </div>
        </header>

        <section
          className={`soul-insights__main${empty ? ' soul-insights__main--empty' : ''}`}
          aria-labelledby="soul-insights-title"
        >
          {empty ? (
            <>
              <div className="soul-insights__empty-head">
                <h1 id="soul-insights-title" className="soul-insights__title">
                  Saved insights
                </h1>
                <div className="soul-insights__empty-copy-block">
                  <p className="soul-insights__empty-lead">Nothing saved yet.</p>
                  <p className="soul-insights__empty-copy">
                    Hold any line in your reading, or tap the bookmark under something the mentor
                    said. It will wait for you here.
                  </p>
                </div>
              </div>
              <SoulButton showArrow onClick={() => navigate('/readings')}>
                Open your reading
              </SoulButton>
            </>
          ) : (
            <>
              <h1 id="soul-insights-title" className="soul-insights__title">
                Saved insights
              </h1>
              <ul className="soul-insights__list">
                {insights.map((insight) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    open={openId === insight.id}
                    onToggle={() => toggleOpen(insight.id)}
                    onRemove={() => removeInsight(insight.id)}
                  />
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

type InsightCardProps = {
  insight: SavedInsight
  open: boolean
  onToggle: () => void
  onRemove: () => void
}

function InsightCard({ insight, open, onToggle, onRemove }: InsightCardProps) {
  const clamp = !open && Boolean(insight.clampLines)
  const clampClass = clamp ? 'soul-insights__quote--clamp-3' : ''

  return (
    <li className="soul-insights__card">
      <button
        type="button"
        className={`soul-insights__quote ${clampClass}`.trim()}
        onClick={onToggle}
        aria-expanded={open}
      >
        “{insight.quote}”
      </button>
      <hr className="soul-insights__card-divider" aria-hidden="true" />
      <div className="soul-insights__card-foot">
        <div className="soul-insights__card-meta">
          <span className="soul-insights__chip">{insight.source}</span>
          <span className="soul-insights__date">{insight.savedAt}</span>
        </div>
        <button
          type="button"
          className="soul-insights__bookmark"
          aria-label="Remove saved insight"
          onClick={onRemove}
        >
          <img src={iconBookmark} alt="" width={20} height={20} />
        </button>
      </div>
    </li>
  )
}
