import type Stripe from 'npm:stripe@14.21.0'

type PeriodItem = {
  current_period_start?: number
  current_period_end?: number
}

function firstItem(sub: Stripe.Subscription): PeriodItem | undefined {
  return sub.items?.data?.[0] as PeriodItem | undefined
}

export function isoFromUnix(seconds: number | null | undefined): string | null {
  if (!seconds) return null
  return new Date(seconds * 1000).toISOString()
}

export function periodStartUnix(sub: Stripe.Subscription): number | null {
  if (typeof sub.current_period_start === 'number') return sub.current_period_start
  const start = firstItem(sub)?.current_period_start
  if (typeof start === 'number') return start
  return typeof sub.trial_start === 'number' ? sub.trial_start : null
}

export function periodEndUnix(sub: Stripe.Subscription): number | null {
  if (typeof sub.current_period_end === 'number') return sub.current_period_end
  const end = firstItem(sub)?.current_period_end
  if (typeof end === 'number') return end
  return typeof sub.trial_end === 'number' ? sub.trial_end : null
}

/** When access actually ends if they cancel now (trial end, else current period end). */
export function accessEndUnix(sub: Stripe.Subscription): number | null {
  if (sub.status === 'trialing' && typeof sub.trial_end === 'number') return sub.trial_end
  return periodEndUnix(sub)
}

export function isScheduledCancel(sub: Stripe.Subscription): boolean {
  return Boolean(sub.cancel_at_period_end || sub.cancel_at)
}

/**
 * True when a trialing sub will still produce a paid invoice after trial_end.
 * A far-future cancel_at (or cancel_at_period_end that resolves past trial_end)
 * does not stop the Sep 7 $6.99 charge.
 */
export function willCollectAfterTrial(sub: Stripe.Subscription): boolean {
  if (sub.status !== 'trialing') return false
  const trialEnd = typeof sub.trial_end === 'number' ? sub.trial_end : null
  if (!trialEnd) return true
  if (typeof sub.cancel_at === 'number' && sub.cancel_at <= trialEnd) return false
  if (sub.cancel_at_period_end && (sub.cancel_at == null || sub.cancel_at <= trialEnd)) {
    return false
  }
  return true
}

export function cancelAtUnixForDb(sub: Stripe.Subscription): number | null {
  return typeof sub.cancel_at === 'number' ? sub.cancel_at : null
}

/** Copy Stripe fields only — never invent cancel/period dates. */
export function dbPeriodFields(sub: Stripe.Subscription) {
  return {
    status: sub.status,
    periodStart: isoFromUnix(periodStartUnix(sub)),
    periodEnd: isoFromUnix(periodEndUnix(sub)),
    cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end),
    cancelAt: isoFromUnix(typeof sub.cancel_at === 'number' ? sub.cancel_at : null),
  }
}

export function customerIdOf(sub: Stripe.Subscription): string {
  return typeof sub.customer === 'string' ? sub.customer : sub.customer.id
}

export function invoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  if (typeof invoice.subscription === 'string') return invoice.subscription
  if (invoice.subscription && typeof invoice.subscription === 'object') {
    return invoice.subscription.id ?? null
  }
  const parent = (
    invoice as {
      parent?: { subscription_details?: { subscription?: string | { id?: string } } }
    }
  ).parent?.subscription_details?.subscription
  if (typeof parent === 'string') return parent
  if (parent && typeof parent === 'object' && typeof parent.id === 'string') return parent.id
  return null
}

export function snapshotFromStripe(
  ownerProfileId: string,
  sub: Stripe.Subscription,
  planType: string,
  statusOverride?: string,
) {
  const fields = dbPeriodFields(sub)
  return {
    ownerProfileId,
    status: statusOverride ?? fields.status,
    planType: sub.metadata?.plan_type || planType,
    stripeCustomerId: customerIdOf(sub),
    stripeSubscriptionId: sub.id,
    periodStart: fields.periodStart,
    periodEnd: fields.periodEnd,
    cancelAtPeriodEnd: fields.cancelAtPeriodEnd,
    cancelAt: fields.cancelAt,
  }
}

export function cancelNowParams(sub: Stripe.Subscription): Stripe.SubscriptionUpdateParams {
  const when = accessEndUnix(sub)
  if (!when) throw new Error('Subscription has no trial or period end')
  return {
    cancel_at: when,
    proration_behavior: 'none',
  }
}

/** Stripe allows only one of cancel_at_period_end / cancel_at per update. */
export function clearCancelParams(sub: Stripe.Subscription): Stripe.SubscriptionUpdateParams {
  if (sub.cancel_at_period_end) return { cancel_at_period_end: false }
  return { cancel_at: '' }
}
