import { useSearchParams } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { SoulHomeScreen } from './SoulHomeScreen'
import { resolveHomeVariant, trialBannerCopy, trialDayNumber } from './resolveHomeVariant'

/** Wires SoulHomeScreen to subscription state + Figma variants. */
export function SoulHomeRoute() {
  const { subscription, isPremium } = useUser()
  const [searchParams] = useSearchParams()

  const variant = resolveHomeVariant(
    searchParams.get('home'),
    subscription,
    isPremium,
  )

  const trial = variant === 'trial'
  const trialCopy = trial
    ? trialBannerCopy(subscription?.current_period_end)
    : undefined

  const dayNumber =
    variant === 'day1'
      ? 1
      : trial
        ? trialDayNumber(subscription?.current_period_start)
        : 12

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
      trialTitle={trialCopy?.title}
      trialDetail={trialCopy?.detail}
    />
  )
}
