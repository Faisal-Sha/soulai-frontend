import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { listSavedInsights } from '@/pages/insights/insightsApi'
import { listPeople } from '@/pages/people/peopleApi'
import { compatHomeSummary } from '@/pages/people/peopleData'
import {
  ensureReading,
  ensureTodayNote,
  summarizeProgress,
} from '@/pages/readings/readingsApi'
import { SoulHomeScreen } from './SoulHomeScreen'
import { membershipDayNumber, resolveHomeVariant, trialBannerCopy } from './resolveHomeVariant'

/** Wires SoulHomeScreen to profile + subscription. Figma previews still use `?home=`. */
export function SoulHomeRoute() {
  const { user, profile, subscription, isPremium, loading } = useUser()
  const [searchParams] = useSearchParams()
  const previewKey = searchParams.get('home')
  const [compatSummary, setCompatSummary] = useState('Add someone close to you')
  const [chaptersDone, setChaptersDone] = useState(0)
  const [chaptersTotal, setChaptersTotal] = useState(9)
  const [continueChapterId, setContinueChapterId] = useState('your-pattern')
  const [readingsProgressPct, setReadingsProgressPct] = useState(0)
  const [dailyHeadline, setDailyHeadline] = useState<string | undefined>()
  const [dailySub, setDailySub] = useState<string | undefined>()
  const [insightsCount, setInsightsCount] = useState(0)
  const [shelfReady, setShelfReady] = useState(false)

  const variant =
    loading && !previewKey
      ? 'loading'
      : resolveHomeVariant(previewKey, subscription, isPremium)

  const trial = variant === 'trial'
  const trialCopy = trial
    ? trialBannerCopy(subscription?.expires_at ?? subscription?.current_period_end, {
        cancelled: Boolean(subscription?.cancel_at_period_end),
      })
    : undefined

  const startedAt = subscription?.created_at ?? subscription?.current_period_start
  const dayNumber = membershipDayNumber(startedAt)
  const live = Boolean(user)

  useEffect(() => {
    if (!live || !profile?.id) {
      setCompatSummary(live ? 'Add someone close to you' : 'Anna, Mark and 2 more')
      setShelfReady(!live)
      return
    }
    setShelfReady(false)
    let cancelled = false
    const peopleP = listPeople(profile.id)
      .then((rows) => {
        if (!cancelled) setCompatSummary(compatHomeSummary(rows.map((r) => r.name)))
      })
      .catch(() => {
        if (!cancelled) setCompatSummary('Add someone close to you')
      })
    const readingP = ensureReading(profile.id)
      .then((rows) => {
        if (cancelled) return
        const progress = summarizeProgress(rows)
        setChaptersDone(progress.chaptersRead)
        setChaptersTotal(progress.chaptersTotal)
        setContinueChapterId(progress.continueChapterId)
        setReadingsProgressPct(progress.overallPct)
      })
      .catch(() => {
        /* keep zeros until migration is applied */
      })
    const noteP = ensureTodayNote(profile.id)
      .then((note) => {
        if (cancelled || !note) return
        setDailyHeadline(note.headline)
        setDailySub(note.sub)
      })
      .catch(() => {
        /* static home copy */
      })
    const insightsP = listSavedInsights(profile.id)
      .then((rows) => {
        if (!cancelled) setInsightsCount(rows.length)
      })
      .catch(() => {
        if (!cancelled) setInsightsCount(0)
      })
    void Promise.all([peopleP, readingP, noteP, insightsP]).finally(() => {
      if (!cancelled) setShelfReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [live, profile?.id])

  return (
    <SoulHomeScreen
      variant={variant}
      isPremium={
        isPremium &&
        variant !== 'day1' &&
        variant !== 'unpaid' &&
        variant !== 'unpaid-pool'
      }
      dayNumber={dayNumber}
      chaptersDone={live ? chaptersDone : 3}
      chaptersTotal={chaptersTotal}
      continueChapterId={continueChapterId}
      readingsProgressPct={live ? readingsProgressPct : 33}
      dailyHeadline={live ? dailyHeadline : undefined}
      dailySub={live ? dailySub : undefined}
      insightsCount={live ? insightsCount : 12}
      shelfReady={!live || shelfReady}
      compatSummary={live ? compatSummary : 'Anna, Mark and 2 more'}
      trialTitle={trialCopy?.title}
      trialDetail={trialCopy?.detail}
    />
  )
}
