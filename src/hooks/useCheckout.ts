// Shared checkout hook — used by both /rates page and /quiz paywall
// Handles guest checkout (no login required) and logged-in users identically.
// Pass leadId from quiz funnel to link quiz answers to the purchase.

import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import {
  persistCheckoutAnalytics,
  trackCheckoutStarted,
  trackPaywallPaymentFailed,
  trackPaywallPaymentInfoAdded,
} from '@/pages/quiz/lib/funnelAnalytics'

/** Canonical Stripe SKU for the single-plan offer (issue #31) */
export const SINGLE_PLAN_STRIPE_ID = 'full_access_7day'

// Maps internal plan IDs to Stripe SKU + display info
export const PLAN_MAP = {
  fullAccess: { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  // Legacy aliases — all route to the single plan
  trial:      { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  popular:    { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  bestValue:  { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  discovery:  { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  growth:     { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  premium:    { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
} as const

export type CheckoutPlanId = keyof typeof PLAN_MAP

interface UseCheckoutOptions {
  /** Lead ID from quiz funnel — links quiz answers to the purchase */
  leadId?: string | null
  /** Called just before redirecting to Stripe — use for analytics */
  onBeforeRedirect?: (planId: CheckoutPlanId) => void
  /** Meta InitiateCheckout + checkout_started — quiz paywall only */
  trackMetaInitiateCheckout?: boolean
}

export function useCheckout({
  leadId,
  onBeforeRedirect,
  trackMetaInitiateCheckout = false,
}: UseCheckoutOptions = {}) {
  const [isProcessing, setIsProcessing] = useState<CheckoutPlanId | null>(null)

  const startCheckout = async (planId: CheckoutPlanId) => {
    try {
      setIsProcessing(planId)
      persistCheckoutAnalytics(planId, leadId ?? null)

      const mapped = PLAN_MAP[planId]
      onBeforeRedirect?.(planId)

      // Meta payment events first (before Stripe redirect can drop them)
      if (trackMetaInitiateCheckout) {
        trackPaywallPaymentInfoAdded(planId, mapped.price)
        trackCheckoutStarted(leadId ?? null, planId, mapped.price, mapped.label)
      }

      const { data: { session } } = await supabase.auth.getSession()

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          planId: mapped.stripeId,
          leadId: leadId ?? null,
          mode: 'subscription',
          siteUrl: window.location.origin,
        },
        headers: session?.access_token
          ? { Authorization: `Bearer ${session.access_token}` }
          : {},
      })

      if (error) {
        const detail = (data as { error?: string } | null)?.error
        throw new Error(detail || error.message)
      }
      if (data?.error) throw new Error(data.error)
      if (!data?.url) throw new Error('No checkout URL returned')

      await new Promise(resolve => setTimeout(resolve, 400))
      window.location.href = data.url
    } catch (err: any) {
      console.error('[useCheckout] error:', err)
      trackPaywallPaymentFailed(err.message || 'checkout_failed')
      toast.error(err.message || 'Failed to start checkout. Please try again.')
      setIsProcessing(null)
    }
  }

  return { startCheckout, isProcessing }
}
