import { useSearchParams } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { getSavedInsightsCount } from '@/pages/insights/insightsStore'
import { SoulHomeScreen } from './SoulHomeScreen'
import { membershipDayNumber, resolveHomeVariant, trialBannerCopy } from './resolveHomeVariant'

/** Wires SoulHomeScreen to profile + subscription. Figma previews still use `?home=`. */
export function SoulHomeRoute() {
  const { user, subscription, isPremium, loading } = useUser()
  const [searchParams] = useSearchParams()
  const previewKey = searchParams.get('home')

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
      chaptersDone={live ? 0 : 3}
      insightsCount={live ? getSavedInsightsCount(false) : 12}
      compatSummary={live ? 'Add someone close to you' : 'Anna, Mark and 2 more'}
      trialTitle={trialCopy?.title}
      trialDetail={trialCopy?.detail}
    />
  )
}
