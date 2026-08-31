import type { UserSubscription } from '@/hooks/useUser'
import type { SoulHomeVariant } from './SoulHomeScreen'
import { isTrialEndingSoon } from './trialNotice'

export { isTrialEndingSoon, trialBannerCopy, trialDaysLeft, TRIAL_ENDING_WINDOW_DAYS } from './trialNotice'

/** One canonical preview URL per home screen — `/?home=<key>` */
export const HOME_PREVIEW_KEYS = {
  default: null,
  day1: 'day1',
  trial: 'trial',
  loading: 'loading',
  unpaid: 'unpaid',
  poolExhausted: 'pool-exhausted',
  paymentConfirmation: 'payment-confirmation',
} as const

const UNPAID_STATUSES = new Set([
  'canceled',
  'cancelled',
  'expired',
  'inactive',
  'unpaid',
])

export function variantFromUrlParam(param: string | null): SoulHomeVariant | null {
  switch (param) {
    case HOME_PREVIEW_KEYS.day1:
      return 'day1'
    case HOME_PREVIEW_KEYS.trial:
      return 'trial'
    case HOME_PREVIEW_KEYS.loading:
      return 'loading'
    case HOME_PREVIEW_KEYS.unpaid:
      return 'unpaid'
    case HOME_PREVIEW_KEYS.poolExhausted:
      return 'unpaid-pool'
    case HOME_PREVIEW_KEYS.paymentConfirmation:
      return 'payment-confirmation'
    default:
      return null
  }
}

export function resolveHomeVariant(
  param: string | null,
  subscription: UserSubscription | null,
  isPremium: boolean,
): SoulHomeVariant {
  const fromUrl = variantFromUrlParam(param)
  if (fromUrl) return fromUrl

  if (!subscription) return 'day1'

  const status = subscription.status?.toLowerCase() ?? ''
  if (UNPAID_STATUSES.has(status)) return 'unpaid'

  if (status === 'trialing' && isTrialEndingSoon(subscription)) return 'trial'

  const day = membershipDayNumber(
    subscription.created_at ?? subscription.current_period_start,
  )
  if (day <= 1) return 'day1'

  void isPremium
  return 'default'
}

/** Days since the member started (first paid row), 1-based. */
export function membershipDayNumber(startedAt?: string | null): number {
  if (!startedAt) return 1
  const start = new Date(startedAt)
  if (Number.isNaN(start.getTime())) return 1

  const startDay = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
  const now = new Date()
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const days = Math.floor((today - startDay) / (24 * 60 * 60 * 1000))
  return Math.max(1, days + 1)
}

export function trialDayNumber(periodStart?: string | null): number {
  return membershipDayNumber(periodStart)
}
