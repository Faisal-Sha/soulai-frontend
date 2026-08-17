// Soul+AI quiz funnel analytics — Amplitude (all events) + GTM dataLayer (Meta subset) + Yandex Metrica
import { Identify } from '@amplitude/analytics-browser'
import { amplitude, initQuizAnalytics, trackYandexGoal, trackYandexHit } from './analyticsInit'
import { trackMetaPixel } from './metaPixel'
import {
  getTaxonomy,
  PAYWALL_EVENTS,
  POST_FUNNEL_EVENTS,
  PROCESSING_SHEET_EVENTS,
  QUIZ_VERSION,
  type ScreenTaxonomyEntry,
} from '../data/eventTaxonomy'
import type { QuizAnswers, UTMParams } from '../types'

const LS_STATE = 'soul_v7_state'
const BUTTON_VALUE_KEY = 'Button value key'
const INTRO_CHECKOUT_AMOUNT = 0.99

export interface FunnelPersistedState {
  step: number
  answers: QuizAnswers
  fired?: {
    viewed?: string[]
    passed?: string[]
    events?: string[]
  }
  eventIds?: Record<string, string>
}

// ── Persistence (shared with useQuizEngine) ───────────────────────────────────

export function readFunnelState(): FunnelPersistedState {
  try {
    const raw = localStorage.getItem(LS_STATE)
    if (raw) return JSON.parse(raw) as FunnelPersistedState
  } catch {
    /* ignore */
  }
  return { step: 0, answers: {}, fired: { viewed: [], passed: [], events: [] }, eventIds: {} }
}

export function patchFunnelState(patch: Partial<FunnelPersistedState>): void {
  try {
    const current = readFunnelState()
    localStorage.setItem(
      LS_STATE,
      JSON.stringify({
        ...current,
        ...patch,
        fired: { ...current.fired, ...patch.fired },
        eventIds: { ...current.eventIds, ...patch.eventIds },
      }),
    )
  } catch {
    /* ignore */
  }
}

function wasFired(bucket: 'viewed' | 'passed' | 'events', key: string): boolean {
  const state = readFunnelState()
  return (state.fired?.[bucket] ?? []).includes(key)
}

function markFired(bucket: 'viewed' | 'passed' | 'events', key: string): void {
  const state = readFunnelState()
  const list = state.fired?.[bucket] ?? []
  if (list.includes(key)) return
  patchFunnelState({
    fired: { ...state.fired, [bucket]: [...list, key] },
  })
}

function getOrCreateEventId(screenKey: string): string {
  const state = readFunnelState()
  if (state.eventIds?.[screenKey]) return state.eventIds[screenKey]
  const eventId = crypto.randomUUID()
  patchFunnelState({
    eventIds: { ...(state.eventIds ?? {}), [screenKey]: eventId },
  })
  return eventId
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function baseProps(screenKey: string, taxonomy: ScreenTaxonomyEntry): Record<string, unknown> {
  return {
    screen_path: taxonomy.route,
    screen_key: screenKey,
    quiz_version: QUIZ_VERSION,
    event_id: getOrCreateEventId(screenKey),
  }
}

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.toLowerCase().trim())
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown'
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

function trackAmplitudeAndYandex(eventName: string, props: Record<string, unknown>): void {
  amplitude.track(eventName, props)
  trackYandexGoal(eventName, props)
}

async function buildPassedProps(
  taxonomy: ScreenTaxonomyEntry,
  answers: QuizAnswers,
  screenKey: string,
): Promise<Record<string, unknown>> {
  const props: Record<string, unknown> = baseProps(screenKey, taxonomy)

  if (taxonomy.answerType === 'button' && taxonomy.answerField) {
    props[BUTTON_VALUE_KEY] = (answers as Record<string, unknown>)[taxonomy.answerField]
  }
  if (taxonomy.answerType === 'name' && answers.name) {
    props.name = answers.name
  }
  if (taxonomy.answerType === 'birthdate' && answers.birthdate) {
    props.m = answers.birthdate.month
    props.d = answers.birthdate.day
    props.y = answers.birthdate.year
  }
  if (taxonomy.answerType === 'email' && answers.email) {
    props.email = await sha256Hex(answers.email)
  }

  return props
}

// ── User properties (segmentation) ────────────────────────────────────────────

let userPropsInitialized = false

export function initFunnelUserProperties(utm: UTMParams, adVariant?: string | null): void {
  initQuizAnalytics()
  if (userPropsInitialized) return
  userPropsInitialized = true

  const identify = new Identify()
  identify.set('utm_source', utm.utm_source ?? '')
  identify.set('utm_campaign', utm.utm_campaign ?? '')
  identify.set('ad_variant', adVariant ?? utm.utm_medium ?? '')
  identify.set('device_type', getDeviceType())
  identify.set('quiz_version', QUIZ_VERSION)
  amplitude.identify(identify)
}

export function updateFunnelSegmentation(answers: QuizAnswers): void {
  const identify = new Identify()
  if (answers.age) identify.set('age_range', answers.age)
  if (answers.status) identify.set('status', answers.status)
  amplitude.identify(identify)
}

// ── Screen Viewed / Passed ────────────────────────────────────────────────────

/** Meta mapped events — Amplitude dedupe does not block Meta. */
function fireMetaIfMapped(
  metaEvent: string | undefined,
  dedupeKey: string,
  props: Record<string, unknown>,
): void {
  if (!metaEvent) return
  // DEV: always re-fire so Test Events can be verified (same as when CompleteRegistration worked)
  if (!import.meta.env.DEV && wasFired('events', dedupeKey)) return
  trackMetaPixel(metaEvent, props)
  if (!import.meta.env.DEV) markFired('events', dedupeKey)
}

export function trackScreenViewed(screenKey: string, extra?: Record<string, unknown>): void {
  const taxonomy = getTaxonomy(screenKey)
  if (!taxonomy) return

  initQuizAnalytics()
  const props = { ...baseProps(screenKey, taxonomy), ...extra }

  if (!wasFired('viewed', screenKey)) {
    trackAmplitudeAndYandex(taxonomy.viewedEvent, props)
    trackYandexHit(taxonomy.route, { title: taxonomy.viewedEvent })
    markFired('viewed', screenKey)
  }

  // Meta: PageView (welcome) / ViewContent (paywall) — standard names only
  fireMetaIfMapped(
    taxonomy.metaEventViewed,
    `meta-viewed:${screenKey}:${taxonomy.metaEventViewed}`,
    props,
  )
}

export async function trackScreenPassed(
  screenKey: string,
  answers: QuizAnswers,
  extra?: Record<string, unknown>,
): Promise<void> {
  const taxonomy = getTaxonomy(screenKey)
  if (!taxonomy?.passedEvent) return

  initQuizAnalytics()
  const props = { ...(await buildPassedProps(taxonomy, answers, screenKey)), ...extra }

  if (!wasFired('passed', screenKey)) {
    trackAmplitudeAndYandex(taxonomy.passedEvent, props)

    if (screenKey === 'age' || screenKey === 'status') {
      updateFunnelSegmentation(answers)
    }

    markFired('passed', screenKey)
  }

  // Meta: CompleteRegistration (name) / Lead (email) — even if Amplitude already fired
  fireMetaIfMapped(
    taxonomy.metaEventPassed,
    `meta-passed:${screenKey}:${taxonomy.metaEventPassed}`,
    props,
  )
}

// ── Paywall events ────────────────────────────────────────────────────────────

function paywallBaseProps(): Record<string, unknown> {
  return {
    screen_path: '/quiz/paywall',
    quiz_version: QUIZ_VERSION,
  }
}

function trackPaywallEvent(
  eventName: string,
  props: Record<string, unknown>,
  metaEvent?: string,
  dedupeKey?: string,
): void {
  initQuizAnalytics()
  const eventProps = { ...paywallBaseProps(), ...props }

  const alreadyFired = dedupeKey ? wasFired('events', dedupeKey) : false
  if (!alreadyFired) {
    trackAmplitudeAndYandex(eventName, eventProps)
    if (dedupeKey) markFired('events', dedupeKey)
  }

  if (metaEvent) {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: eventName,
      meta_event_name: metaEvent,
      ...eventProps,
    })
    fireMetaIfMapped(
      metaEvent,
      `meta-paywall:${metaEvent}:${dedupeKey ?? eventName}`,
      eventProps,
    )
  }
}

export function trackPaywallViewed(selectedPlan: string): void {
  trackScreenViewed('paywall', { content_ids: [selectedPlan] })
}

/** Fires once per paywall visit — single plan, no picker */
export function trackPaywallPlanSelected(plan: string, price: number): void {
  trackPaywallEvent(PAYWALL_EVENTS.planSelected, { plan, price }, undefined, `plan-selected:${plan}`)
}

export function trackPaywallFaqOpened(faqId: string): void {
  trackPaywallEvent(PAYWALL_EVENTS.faqOpened, { faq_id: faqId })
}

export function trackPaywallGetPlanClicked(plan: string, price: number): void {
  trackPaywallEvent(PAYWALL_EVENTS.getPlanClicked, { plan, price })
}

export function trackPaywallPaymentInfoAdded(plan: string, price: number): void {
  trackPaywallEvent(
    PAYWALL_EVENTS.paymentInfoAdded,
    { plan, price },
    'AddPaymentInfo',
    `payment-info:${plan}`,
  )
}

export function trackPaywallCheckoutStarted(
  plan: string,
  price: number,
  _leadId: string | null,
): string {
  const eventId = crypto.randomUUID()
  trackPaywallEvent(
    PAYWALL_EVENTS.checkoutStarted,
    { event_id: eventId, plan, price, currency: 'USD' },
    'InitiateCheckout',
  )
  return eventId
}

export function trackPaywallPaymentFailed(errorMessage: string): void {
  trackPaywallEvent(PAYWALL_EVENTS.paymentFailed, { error_message: errorMessage })
}

export async function trackPurchaseCompleted(props: {
  event_id: string
  amount: number
  currency?: string
  plan?: string
  email?: string
  external_id?: string | null
}): Promise<void> {
  const dedupeKey = `purchase:${props.event_id}`
  const alreadyFired = wasFired('events', dedupeKey)

  initQuizAnalytics()
  const eventProps: Record<string, unknown> = {
    ...paywallBaseProps(),
    event_id: props.event_id,
    amount: props.amount,
    currency: props.currency ?? 'USD',
    plan: props.plan,
    external_id: props.external_id ?? undefined,
  }
  if (props.email) {
    eventProps.email = await sha256Hex(props.email)
  }

  if (!alreadyFired) {
    trackAmplitudeAndYandex(PAYWALL_EVENTS.purchaseCompleted, eventProps)
    markFired('events', dedupeKey)
  }

  ;(window as any).dataLayer = (window as any).dataLayer || []
  ;(window as any).dataLayer.push({
    event: PAYWALL_EVENTS.purchaseCompleted,
    meta_event_name: 'Purchase',
    value: props.amount,
    currency: props.currency ?? 'USD',
    ...eventProps,
  })
  fireMetaIfMapped('Purchase', `meta-paywall:Purchase:${dedupeKey}`, {
    value: props.amount,
    ...eventProps,
  })
}

/** Fire SoulPurchaseCompleted from Stripe session_id after checkout return */
export async function trackPurchaseCompletedFromSession(stripeSessionId: string): Promise<void> {
  const { planId, leadId } = readCheckoutAnalytics()
  const funnelEmail = readFunnelState().answers?.email
  await trackPurchaseCompleted({
    event_id: stripeSessionId,
    amount: INTRO_CHECKOUT_AMOUNT,
    currency: 'USD',
    plan: planId ?? 'fullAccess',
    email: typeof funnelEmail === 'string' ? funnelEmail : undefined,
    external_id: leadId,
  })
}

/**
 * Confirm main paywall purchase on /processing after Stripe redirect.
 * Single-plan flow — no Upsell B; uses session_id + checkout context from sessionStorage.
 */
export async function confirmPaywallPurchaseFromCheckout(stripeSessionId: string): Promise<void> {
  initQuizAnalytics()
  await trackPurchaseCompletedFromSession(stripeSessionId)
}

// ── Processing sheet events (optional overlays during analyzing) ───────────────

export function trackProcessingSheetViewed(sheetId: string): void {
  const dedupeKey = `processing-sheet-viewed:${sheetId}`
  if (wasFired('events', dedupeKey)) return
  initQuizAnalytics()
  const props = {
    screen_path: '/quiz/processing',
    quiz_version: QUIZ_VERSION,
    sheet_id: sheetId,
  }
  trackAmplitudeAndYandex(PROCESSING_SHEET_EVENTS.viewed, props)
  markFired('events', dedupeKey)
}

export function trackProcessingSheetAnswered(sheetId: string, value: string): void {
  initQuizAnalytics()
  trackAmplitudeAndYandex(PROCESSING_SHEET_EVENTS.answered, {
    screen_path: '/quiz/processing',
    quiz_version: QUIZ_VERSION,
    sheet_id: sheetId,
    value,
  })
}

// ── Post-funnel (tracking only — no flow changes) ─────────────────────────────

export function trackCreateAccountViewed(): void {
  if (wasFired('viewed', 'create-account')) return
  initQuizAnalytics()
  trackAmplitudeAndYandex(POST_FUNNEL_EVENTS.createAccountViewed, {
    screen_path: '/set-password',
    quiz_version: QUIZ_VERSION,
  })
  trackYandexHit('/set-password', { title: POST_FUNNEL_EVENTS.createAccountViewed })
  markFired('viewed', 'create-account')
}

export function trackCreateAccountPassed(): void {
  if (wasFired('passed', 'create-account')) return
  initQuizAnalytics()
  trackAmplitudeAndYandex(POST_FUNNEL_EVENTS.createAccountPassed, {
    screen_path: '/set-password',
    quiz_version: QUIZ_VERSION,
  })
  markFired('passed', 'create-account')
}

export function trackReadingViewed(plan?: string): void {
  if (wasFired('viewed', 'reading')) return
  initQuizAnalytics()
  trackAmplitudeAndYandex(POST_FUNNEL_EVENTS.readingViewed, {
    screen_path: '/reading',
    quiz_version: QUIZ_VERSION,
    plan,
  })
  trackYandexHit('/reading', { title: POST_FUNNEL_EVENTS.readingViewed })
  markFired('viewed', 'reading')
}

// ── Legacy re-exports (keep existing imports working) ─────────────────────────

export { initQuizAnalytics }

export function persistCheckoutAnalytics(planId: string, leadId: string | null): void {
  try {
    sessionStorage.setItem('soul_checkout_plan', planId)
    if (leadId) sessionStorage.setItem('soul_checkout_lead_id', leadId)
  } catch {
    /* ignore */
  }
}

export function readCheckoutAnalytics(): { planId: string | null; leadId: string | null } {
  try {
    return {
      planId: sessionStorage.getItem('soul_checkout_plan'),
      leadId: sessionStorage.getItem('soul_checkout_lead_id'),
    }
  } catch {
    return { planId: null, leadId: null }
  }
}

export type CheckoutCompletedProps = {
  session_id: string
  plan_type?: string
  plan_id?: string
  amount?: number
  currency?: string
  lead_id?: string | null
}

/** Browser-side purchase confirmation — does not modify Stripe/webhook flows */
export async function reportPaywallCheckoutCompleted(
  data: { subscription_purchase?: CheckoutCompletedProps } | null | undefined,
): Promise<void> {
  const purchase = data?.subscription_purchase
  if (!purchase?.session_id) return

  const { planId, leadId } = readCheckoutAnalytics()
  const funnelEmail = readFunnelState().answers?.email
  await trackPurchaseCompleted({
    event_id: purchase.session_id,
    amount: purchase.amount ?? 0,
    currency: purchase.currency ?? 'USD',
    plan: planId ?? purchase.plan_type,
    email: typeof funnelEmail === 'string' ? funnelEmail : undefined,
    external_id: leadId,
  })
}

export function trackCheckoutStarted(
  leadId: string | null,
  planId: string,
  price: number,
  _planLabel?: string,
): void {
  trackPaywallCheckoutStarted(planId, price, leadId)
}

export const trackCheckoutCompleted = confirmPaywallPurchaseFromCheckout
export const trackPaywallSubscriptionPurchase = confirmPaywallPurchaseFromCheckout
export const trackInitiateCheckout = trackCheckoutStarted
export const fireCheckoutCompletedFromUpsellCheck = confirmPaywallPurchaseFromCheckout
