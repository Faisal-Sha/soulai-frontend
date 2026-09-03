/** Paywall Day 5 email + Stripe `trial_will_end` (3 days before trial_end). */
export const TRIAL_ENDING_WINDOW_DAYS = 3

type TrialSubscription = {
  status?: string | null
  expires_at?: string | null
  current_period_end?: string | null
}

export function trialDaysLeft(periodEnd?: string | null, now = Date.now()): number | null {
  if (!periodEnd) return null
  const end = new Date(periodEnd)
  if (Number.isNaN(end.getTime())) return null
  return Math.ceil((end.getTime() - now) / (24 * 60 * 60 * 1000))
}

export function isTrialEndingSoon(
  subscription: TrialSubscription | null,
  now = Date.now(),
  windowDays = TRIAL_ENDING_WINDOW_DAYS,
): boolean {
  if (subscription?.status?.toLowerCase() !== 'trialing') return false
  const left = trialDaysLeft(
    subscription.expires_at ?? subscription.current_period_end,
    now,
  )
  if (left === null) return true
  return left <= windowDays
}

export function trialBannerCopy(
  periodEnd?: string | null,
  opts?: { cancelled?: boolean; now?: number },
): { title: string; detail: string } {
  const now = opts?.now ?? Date.now()
  const end = periodEnd ? new Date(periodEnd) : null
  const valid = Boolean(end && !Number.isNaN(end.getTime()))
  const daysLeft = trialDaysLeft(periodEnd, now)
  const dateLabel = valid
    ? end!.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : 'soon'

  if (opts?.cancelled) {
    let title = 'Your access ends soon'
    if (daysLeft !== null) {
      if (daysLeft <= 0) title = 'Your access ends today'
      else if (daysLeft === 1) title = 'Your access ends tomorrow'
      else title = `Your access ends in ${daysLeft} days`
    }
    const detail = valid
      ? `You cancelled. Everything stays open until ${dateLabel}.`
      : 'You cancelled. You will not be charged $6.99.'
    return { title, detail }
  }

  let title = 'Your trial ends soon'
  if (daysLeft !== null) {
    if (daysLeft <= 0) title = 'Your trial ends today'
    else if (daysLeft === 1) title = 'Your trial ends tomorrow'
    else title = `Your trial ends in ${daysLeft} days`
  }

  const detail = `$6.99/month starts ${dateLabel}. Cancel anytime.`
  return { title, detail }
}
