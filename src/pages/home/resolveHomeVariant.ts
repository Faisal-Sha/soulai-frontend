import type { UserSubscription } from '@/hooks/useUser'
import type { SoulHomeVariant } from './SoulHomeScreen'

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

  if (status === 'trialing') {
    if (subscription.current_period_start) {
      const ageMs = Date.now() - new Date(subscription.current_period_start).getTime()
      if (ageMs < 36 * 60 * 60 * 1000) return 'day1'
    }
    return 'trial'
  }

  void isPremium
  return 'default'
}

export function trialDayNumber(periodStart?: string | null): number {
  if (!periodStart) return 1
  const ageMs = Date.now() - new Date(periodStart).getTime()
  if (Number.isNaN(ageMs) || ageMs < 0) return 1
  return Math.max(1, Math.floor(ageMs / (24 * 60 * 60 * 1000)) + 1)
}

export function trialBannerCopy(periodEnd?: string | null): { title: string; detail: string } {
  const end = periodEnd ? new Date(periodEnd) : null
  const valid = end && !Number.isNaN(end.getTime())
  const daysLeft = valid
    ? Math.ceil((end!.getTime() - Date.now()) / (24 * 60 * 60 * 1000))
    : null

  let title = 'Your trial ends soon.'
  if (daysLeft !== null) {
    if (daysLeft <= 0) title = 'Your trial ends today.'
    else if (daysLeft === 1) title = 'Your trial ends tomorrow.'
    else title = `Your trial ends in ${daysLeft} days.`
  }

  const startLabel = valid
    ? end!.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : 'soon'
  const detail = `$5.99/month starts ${startLabel}. Cancel anytime.`

  return { title, detail }
}
