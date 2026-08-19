// Display tiers for FigJam "choose plan / compare" — only fullAccess is checkout-wired.
import type { PaywallPlan, PaywallPlanId } from '../types'

export const PAYWALL_INTRO_PRICE = 0.99
export const PAYWALL_RENEWAL_PRICE = 6.99
export const PAYWALL_TRIAL_DAYS = 7

export const PAYWALL_PLANS: Record<PaywallPlanId, PaywallPlan> = {
  fullAccess: {
    id: 'fullAccess',
    name: '7-Day Full Access',
    tagline: 'Your complete soulmate portrait',
    price: PAYWALL_INTRO_PRICE,
    renewalPrice: PAYWALL_RENEWAL_PRICE,
    durationDays: PAYWALL_TRIAL_DAYS,
    durationLabel: '7 days',
    perDay: '0.14',
    badge: 'Unlock now',
    features: [
      { t: 'Your full Soulmate Portrait — 9 chapters' },
      { t: 'A complete picture of you: your patterns, behavioral models, and what you truly want' },
      { t: 'Your core tendencies across every area of life' },
      { t: 'Your karmic patterns — what keeps repeating' },
      { t: 'Compatibility with any partner, anytime' },
      { t: 'A short thought on your day — every morning' },
    ],
  },
}

export const PAYWALL_PLAN_ORDER: PaywallPlanId[] = ['fullAccess']

export const PAYWALL_SINGLE_PLAN = PAYWALL_PLANS.fullAccess

/** Frontend-only compare cards (FigJam). Checkout still uses fullAccess only. */
export interface PaywallCompareTier {
  id: string
  name: string
  priceLabel: string
  period: string
  badge?: string
  highlight?: boolean
  /** If set, CTA calls real Stripe checkout with this plan id */
  checkoutPlanId?: PaywallPlanId
  features: string[]
  dummyNote?: string
}

export const PAYWALL_COMPARE_TIERS: PaywallCompareTier[] = [
  {
    id: 'preview',
    name: 'Free preview',
    priceLabel: '$0',
    period: 'already unlocked',
    features: ['1 open chapter', 'Locked portrait teasers', 'Save & share (early)'],
    dummyNote: 'You already have this — stay in free mode anytime.',
  },
  {
    id: 'fullAccess',
    name: 'Full Access',
    priceLabel: `$${PAYWALL_INTRO_PRICE.toFixed(2)}`,
    period: `for ${PAYWALL_TRIAL_DAYS} days · then $${PAYWALL_RENEWAL_PRICE.toFixed(2)}/mo`,
    badge: 'Best value',
    highlight: true,
    checkoutPlanId: 'fullAccess',
    features: [
      'All 9 chapters unlocked',
      'PDF report',
      'AI mentor chat',
      'Compatibility tools',
      'Daily insight',
    ],
  },
  {
    id: 'mentor_plus',
    name: 'Mentor+',
    priceLabel: '$14.99',
    period: 'per month · UI shell',
    features: ['Everything in Full Access', 'Priority mentor replies', 'Extra chat credits'],
    dummyNote: 'Frontend shell only — not wired to Stripe yet.',
  },
]
