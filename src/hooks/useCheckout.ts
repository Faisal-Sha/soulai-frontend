import { useState } from 'react'
import { getLocale, translate } from '@/i18n'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import {
  persistCheckoutAnalytics,
  trackCheckoutStarted,
  trackPaywallPaymentFailed,
  trackPaywallPaymentInfoAdded,
} from '@/pages/quiz/lib/funnelAnalytics'
import type { QuizAnswers, UTMParams } from '@/pages/quiz/types'

export const SINGLE_PLAN_STRIPE_ID = 'full_access_7day'

export const PLAN_MAP = {
  fullAccess: { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  trial: { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  popular: { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  bestValue: { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  discovery: { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  growth: { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
  premium: { stripeId: SINGLE_PLAN_STRIPE_ID, label: '7-Day Full Access', price: 0.99 },
} as const

export type CheckoutPlanId = keyof typeof PLAN_MAP

type CheckoutPayload = {
  email?: string
  answers: QuizAnswers
  utm?: UTMParams
}

interface UseCheckoutOptions {
  getPayload: () => CheckoutPayload
  onBeforeRedirect?: (planId: CheckoutPlanId) => void
  trackMetaInitiateCheckout?: boolean
}

export function useCheckout({
  getPayload,
  onBeforeRedirect,
  trackMetaInitiateCheckout = false,
}: UseCheckoutOptions) {
  const [isProcessing, setIsProcessing] = useState<CheckoutPlanId | null>(null)

  const startCheckout = async (planId: CheckoutPlanId) => {
    try {
      setIsProcessing(planId)
      const payload = getPayload()
      const email = payload.answers.email || payload.email
      if (!email) {
        const en = 'Add your email in the quiz first.'
        throw new Error(
          getLocale() !== 'en' ? translate(getLocale(), 'errors.checkout.addEmail', en) : en,
        )
      }
      persistCheckoutAnalytics(planId, null)

      const mapped = PLAN_MAP[planId]
      onBeforeRedirect?.(planId)

      if (trackMetaInitiateCheckout) {
        trackPaywallPaymentInfoAdded(planId, mapped.price)
        trackCheckoutStarted(null, planId, mapped.price, mapped.label)
      }

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          planId: mapped.stripeId,
          email,
          answers: payload.answers,
          utm_source: payload.utm?.utm_source,
          utm_medium: payload.utm?.utm_medium,
          utm_campaign: payload.utm?.utm_campaign,
          siteUrl: window.location.origin,
        },
      })

      if (error) {
        const detail = (data as { error?: string } | null)?.error
        throw new Error(detail || error.message)
      }
      if (data?.error) throw new Error(data.error)
      if (!data?.url) {
        const en = 'No checkout URL returned'
        throw new Error(
          getLocale() !== 'en' ? translate(getLocale(), 'errors.checkout.noUrl', en) : en,
        )
      }

      await new Promise((resolve) => setTimeout(resolve, 400))
      window.location.href = data.url
    } catch (err: unknown) {
      const fallback = 'Failed to start checkout. Please try again.'
      const message =
        err instanceof Error
          ? err.message
          : getLocale() !== 'en'
            ? translate(getLocale(), 'errors.checkout.failed', fallback)
            : fallback
      console.error('[useCheckout] error:', err)
      trackPaywallPaymentFailed(message)
      toast.error(message)
      setIsProcessing(null)
    }
  }

  return { startCheckout, isProcessing }
}
