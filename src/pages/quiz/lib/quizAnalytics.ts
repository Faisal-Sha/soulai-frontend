// Quiz funnel analytics — re-exports Soul taxonomy events (see funnelAnalytics.ts)
export {
  initQuizAnalytics,
  initFunnelUserProperties,
  updateFunnelSegmentation,
  trackScreenViewed,
  trackScreenPassed,
  trackPaywallViewed,
  trackPaywallPlanSelected,
  trackPaywallFaqOpened,
  trackPaywallGetPlanClicked,
  trackPaywallPaymentInfoAdded,
  trackPaywallCheckoutStarted,
  trackPaywallPaymentFailed,
  trackPurchaseCompleted,
  trackProcessingSheetViewed,
  trackProcessingSheetAnswered,
  trackCreateAccountViewed,
  trackCreateAccountPassed,
  trackReadingViewed,
  confirmPaywallPurchaseFromCheckout,
  trackPurchaseCompletedFromSession,
  persistCheckoutAnalytics,
  readCheckoutAnalytics,
  reportPaywallCheckoutCompleted,
  trackCheckoutStarted,
  trackCheckoutCompleted,
  trackPaywallSubscriptionPurchase,
  trackInitiateCheckout,
  fireCheckoutCompletedFromUpsellCheck,
  readFunnelState,
  patchFunnelState,
} from './funnelAnalytics'

export type { CheckoutCompletedProps, FunnelPersistedState } from './funnelAnalytics'

// Legacy aliases — deprecated, kept for any remaining callers
import {
  trackScreenViewed,
  trackPaywallViewed,
} from './funnelAnalytics'
import type { QuizAnswers, QuizAnswerValue, ScreenType } from '../types'

/** @deprecated Use trackScreenViewed via screen key */
export function trackStepViewed(screenType: ScreenType, _screenIndex: number, questionId?: string) {
  if (questionId) trackScreenViewed(questionId)
}

/** @deprecated Use trackScreenPassed */
export function trackOptionSelected(_questionId: string, _value: QuizAnswerValue) {
  /* no-op — Passed fires on advance */
}

/** @deprecated Use trackScreenPassed for name screen */
export function trackQuizCompleted(_answers: QuizAnswers) {
  /* handled in QuizShell */
}

/** @deprecated Teaser is not in the Soul event taxonomy */
export function trackTeaserViewed(_leadId: string | null) {
  /* no-op */
}

/** @deprecated Use trackPaywallViewed */
export function trackViewPaywall(_leadId: string | null) {
  trackPaywallViewed('fullAccess')
}

/** @deprecated Use trackScreenPassed('email') */
export function trackEmailSubmitted(_email: string, _leadId: string) {
  /* handled in QuizShell */
}

/** @deprecated */
export function trackFunnelStarted() {
  trackScreenViewed('welcome')
}

/** @deprecated */
export function trackQuizStarted() {
  /* SoulWelcomeScreenPassed */
}

export type PaywallPurchaseEventProps = import('./funnelAnalytics').CheckoutCompletedProps
export type SubscriptionPurchasePayload = {
  session_id: string
  plan_type?: string
  amount?: number
  currency?: string
}
