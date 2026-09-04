import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SoulBrand, SoulButton, SoulPending, SoulRippleBg } from '@/components/soul'
import { useCopy, useI18n } from '@/i18n'
import { useUser } from '@/hooks/useUser'
import {
  deleteInsight,
  listSavedInsights,
} from './insightsApi'
import { getSavedInsights, localizeInsight, SAVED_INSIGHTS, type SavedInsight } from './insightsData'
import './soul-insights.css'
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
  const t = useCopy()
  const { locale } = useI18n()
  const { pathname } = useLocation()
  const { user, profile, loading } = useUser()
  const variant = variantProp ?? variantFromPath(pathname)
  const includeDemo = !user

  const [insights, setInsights] = useState<SavedInsight[]>([])
  const [openId, setOpenId] = useState<string | null>(null)
  const [ready, setReady] = useState(variant === 'empty')

  useEffect(() => {
    if (variant === 'empty') {
      setInsights([])
      setReady(true)
      return
    }
    if (loading) {
      setReady(false)
      return
    }
    if (!profile?.id) {
      setInsights(includeDemo ? getSavedInsights() : [])
      setReady(true)
      return
    }
    setReady(false)
    let cancelled = false
    void listSavedInsights(profile.id)
      .then((rows) => {
        if (!cancelled) setInsights(rows)
      })
      .catch(() => {
        if (!cancelled) setInsights([])
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [variant, includeDemo, loading, profile?.id])

  useEffect(() => {
    if (variant === 'open' && includeDemo) {
      setOpenId(SAVED_INSIGHTS[0]?.id ?? null)
    }
  }, [variant, includeDemo])

  const waiting = !ready
  const empty = ready && insights.length === 0
  const visibleInsights = useMemo(() => insights.map(localizeInsight), [insights, locale])

  const removeInsight = (id: string) => {
    setInsights((items) => items.filter((item) => item.id !== id))
    setOpenId((current) => (current === id ? null : current))
    if (profile?.id) {
      void deleteInsight(profile.id, id).catch(() => {
        /* list already updated; next load will reconcile */
      })
    }
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
      <SoulRippleBg className="soul-insights__bg" />
      <div className="soul-insights__scrim" aria-hidden="true" />

      <div className="soul-insights__scroll">
        <header className="soul-insights__header">
          <div className="soul-insights__header-left">
            <button
              type="button"
              className="soul-insights__back"
              onClick={goBack}
              aria-label={t('insights.backAria', 'Back')}
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
          {waiting ? (
            <>
              <h1 id="soul-insights-title" className="soul-insights__title">
                {t('insights.title', 'Saved insights')}
              </h1>
              <SoulPending rows={3} variant="cards" label={t('insights.loading', 'Loading insights')} />
            </>
          ) : empty ? (
            <>
              <div className="soul-insights__empty-head">
                <h1 id="soul-insights-title" className="soul-insights__title">
                  {t('insights.title', 'Saved insights')}
                </h1>
                <div className="soul-insights__empty-copy-block">
                  <p className="soul-insights__empty-lead">{t('insights.emptyLead', 'Nothing saved yet.')}</p>
                  <p className="soul-insights__empty-copy">
                    {t(
                      'insights.emptyCopy',
                      'Hold any line in your reading, or tap the bookmark under something the mentor said. It will wait for you here.',
                    )}
                  </p>
                </div>
              </div>
              <SoulButton showArrow onClick={() => navigate('/readings')}>
                {t('insights.openReading', 'Open your reading')}
              </SoulButton>
            </>
          ) : (
            <>
              <h1 id="soul-insights-title" className="soul-insights__title">
                {t('insights.title', 'Saved insights')}
              </h1>
              <ul className="soul-insights__list">
                {visibleInsights.map((insight) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    open={openId === insight.id}
                    onToggle={() => toggleOpen(insight.id)}
                    onRemove={() => removeInsight(insight.id)}
                    removeLabel={t('insights.removeAria', 'Remove saved insight')}
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
  removeLabel: string
}

function InsightCard({ insight, open, onToggle, onRemove, removeLabel }: InsightCardProps) {
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
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <img src={iconBookmark} alt="" width={20} height={20} />
        </button>
      </div>
    </li>
  )
}
