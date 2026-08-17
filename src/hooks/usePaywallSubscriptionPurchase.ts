/**
 * SoulPurchaseCompleted after Stripe return — /processing?session_id=...
 * Single-plan flow (no Upsell B).
 */
import { useEffect, useRef } from 'react'
import { confirmPaywallPurchaseFromCheckout } from '@/features/quiz/lib/funnelAnalytics'

export function usePaywallSubscriptionPurchase(sessionId: string | null) {
  const startedRef = useRef(false)

  useEffect(() => {
    if (!sessionId || startedRef.current) return
    startedRef.current = true
    void confirmPaywallPurchaseFromCheckout(sessionId)
  }, [sessionId])
}
