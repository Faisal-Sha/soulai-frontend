// Soul+AI quiz funnel event taxonomy — sourced from soulplus-event-taxonomy_updated.xlsx
// Event names are FINAL — do not rename without marketing approval.

import type { QuizScreen } from '../types'

export type AnswerPropertyType = 'button' | 'birthdate' | 'name' | 'email' | 'none'

export interface ScreenTaxonomyEntry {
  screenKey: string
  route: string
  viewedEvent: string
  /** Omitted for screens that use dedicated events instead (e.g. paywall) */
  passedEvent?: string
  /** Meta standard event on Viewed (Amplitude always fires) */
  metaEventViewed?: string
  /** Meta standard event on Passed */
  metaEventPassed?: string
  answerType: AnswerPropertyType
  /** Quiz answer field for Passed properties */
  answerField?: string
}

export const QUIZ_VERSION = 'v7'

export const SCREEN_TAXONOMY: ScreenTaxonomyEntry[] = [
  {
    screenKey: 'welcome',
    route: '/quiz/welcome',
    viewedEvent: 'SoulWelcomeScreenViewed',
    passedEvent: 'SoulWelcomeScreenPassed',
    metaEventViewed: 'PageView',
    answerType: 'none',
  },
  {
    screenKey: 'gender',
    route: '/quiz/q/gender',
    viewedEvent: 'SoulGenderScreenViewed',
    passedEvent: 'SoulGenderScreenPassed',
    answerType: 'button',
    answerField: 'gender',
  },
  {
    screenKey: 'age',
    route: '/quiz/q/age',
    viewedEvent: 'SoulAgeScreenViewed',
    passedEvent: 'SoulAgeScreenPassed',
    answerType: 'button',
    answerField: 'age',
  },
  {
    screenKey: 'status',
    route: '/quiz/q/status',
    viewedEvent: 'SoulStatusScreenViewed',
    passedEvent: 'SoulStatusScreenPassed',
    answerType: 'button',
    answerField: 'status',
  },
  {
    screenKey: 'social-proof',
    route: '/quiz/social-proof',
    viewedEvent: 'SoulSocialProofScreenViewed',
    passedEvent: 'SoulSocialProofScreenPassed',
    answerType: 'none',
  },
  {
    screenKey: 'hope',
    route: '/quiz/q/hope',
    viewedEvent: 'SoulHopeScreenViewed',
    passedEvent: 'SoulHopeScreenPassed',
    answerType: 'button',
    answerField: 'hope',
  },
  {
    screenKey: 'belief',
    route: '/quiz/q/belief',
    viewedEvent: 'SoulBeliefScreenViewed',
    passedEvent: 'SoulBeliefScreenPassed',
    answerType: 'button',
    answerField: 'belief',
  },
  {
    screenKey: 'block',
    route: '/quiz/q/block',
    viewedEvent: 'SoulBlockScreenViewed',
    passedEvent: 'SoulBlockScreenPassed',
    answerType: 'button',
    answerField: 'block',
  },
  {
    screenKey: 'love-receive',
    route: '/quiz/q/love-receive',
    viewedEvent: 'SoulLoveLanguageScreenViewed',
    passedEvent: 'SoulLoveLanguageScreenPassed',
    answerType: 'button',
    answerField: 'love-receive',
  },
  {
    screenKey: 'attachment',
    route: '/quiz/q/attachment',
    viewedEvent: 'SoulAttachmentScreenViewed',
    passedEvent: 'SoulAttachmentScreenPassed',
    answerType: 'button',
    answerField: 'attachment',
  },
  {
    screenKey: 'energy',
    route: '/quiz/q/energy',
    viewedEvent: 'SoulEnergyScreenViewed',
    passedEvent: 'SoulEnergyScreenPassed',
    answerType: 'button',
    answerField: 'energy',
  },
  {
    screenKey: 'soulmate-vibe',
    route: '/quiz/q/soulmate-vibe',
    viewedEvent: 'SoulVibeScreenViewed',
    passedEvent: 'SoulVibeScreenPassed',
    answerType: 'button',
    answerField: 'soulmate-vibe',
  },
  {
    screenKey: 'soulmate-pace',
    route: '/quiz/q/soulmate-pace',
    viewedEvent: 'SoulPaceScreenViewed',
    passedEvent: 'SoulPaceScreenPassed',
    answerType: 'button',
    answerField: 'soulmate-pace',
  },
  {
    screenKey: 'soulmate-strength',
    route: '/quiz/q/soulmate-strength',
    viewedEvent: 'SoulStrengthScreenViewed',
    passedEvent: 'SoulStrengthScreenPassed',
    answerType: 'button',
    answerField: 'soulmate-strength',
  },
  {
    screenKey: 'feedback',
    route: '/quiz/feedback',
    viewedEvent: 'SoulFeedbackScreenViewed',
    passedEvent: 'SoulFeedbackScreenPassed',
    answerType: 'none',
  },
  {
    screenKey: 'soulmate-tender',
    route: '/quiz/q/soulmate-tender',
    viewedEvent: 'SoulTendernessScreenViewed',
    passedEvent: 'SoulTendernessScreenPassed',
    answerType: 'button',
    answerField: 'soulmate-tender',
  },
  {
    screenKey: 'soulmate-flaw',
    route: '/quiz/q/soulmate-flaw',
    viewedEvent: 'SoulFlawScreenViewed',
    passedEvent: 'SoulFlawScreenPassed',
    answerType: 'button',
    answerField: 'soulmate-flaw',
  },
  {
    screenKey: 'recognition',
    route: '/quiz/q/recognition',
    viewedEvent: 'SoulSignsScreenViewed',
    passedEvent: 'SoulSignsScreenPassed',
    answerType: 'button',
    answerField: 'recognition',
  },
  {
    screenKey: 'birthdate',
    route: '/quiz/q/birthdate',
    viewedEvent: 'SoulBirthdateScreenViewed',
    passedEvent: 'SoulBirthdateScreenPassed',
    answerType: 'birthdate',
    answerField: 'birthdate',
  },
  {
    screenKey: 'recognition-recap',
    route: '/quiz/recognition',
    viewedEvent: 'SoulRecognitionRecapScreenViewed',
    passedEvent: 'SoulRecognitionRecapScreenPassed',
    answerType: 'none',
  },
  {
    screenKey: 'ready',
    route: '/quiz/q/ready',
    viewedEvent: 'SoulReadyScreenViewed',
    passedEvent: 'SoulReadyScreenPassed',
    answerType: 'button',
    answerField: 'ready',
  },
  {
    screenKey: 'name',
    route: '/quiz/q/name',
    viewedEvent: 'SoulNameScreenViewed',
    passedEvent: 'SoulNameScreenPassed',
    metaEventPassed: 'CompleteRegistration',
    answerType: 'name',
    answerField: 'name',
  },
  {
    screenKey: 'processing',
    route: '/quiz/processing',
    viewedEvent: 'SoulProcessingScreenViewed',
    passedEvent: 'SoulProcessingScreenPassed',
    answerType: 'none',
  },
  {
    screenKey: 'email',
    route: '/quiz/email',
    viewedEvent: 'SoulEmailScreenViewed',
    passedEvent: 'SoulEmailScreenPassed',
    metaEventPassed: 'Lead',
    answerType: 'email',
    answerField: 'email',
  },
  {
    screenKey: 'paywall',
    route: '/quiz/paywall',
    viewedEvent: 'SoulPaywallScreenViewed',
    metaEventViewed: 'ViewContent',
    answerType: 'none',
  },
]

/** Quiz routes with no Soul taxonomy events (screen exists, Amplitude does not track) */
export const QUIZ_ROUTES_WITHOUT_EVENTS: Record<string, string> = {
  teaser: '/quiz/teaser',
  focus: '/quiz/q/focus',
  reinforcement: '/quiz/reinforcement',
  'birth-time-known': '/quiz/q/birth-time-known',
  'birth-time': '/quiz/q/birth-time',
  'birth-place': '/quiz/q/birth-place',
  'free-mode': '/quiz/free-mode',
}

export const TAXONOMY_BY_KEY = Object.fromEntries(
  SCREEN_TAXONOMY.map(entry => [entry.screenKey, entry]),
) as Record<string, ScreenTaxonomyEntry>

export const ROUTE_BY_KEY = {
  ...Object.fromEntries(SCREEN_TAXONOMY.map(entry => [entry.screenKey, entry.route])),
  ...QUIZ_ROUTES_WITHOUT_EVENTS,
} as Record<string, string>

export const KEY_BY_ROUTE = {
  ...Object.fromEntries(SCREEN_TAXONOMY.map(entry => [entry.route, entry.screenKey])),
  ...Object.fromEntries(
    Object.entries(QUIZ_ROUTES_WITHOUT_EVENTS).map(([key, route]) => [route, key]),
  ),
} as Record<string, string>

/** Stable key for a QUIZ_FLOW screen */
export function getScreenKeyFromFlow(screen: QuizScreen): string {
  switch (screen.type) {
    case 'intro':
      return 'welcome'
    case 'social-proof':
      return 'social-proof'
    case 'reinforcement':
      return 'reinforcement'
    case 'feedback':
      return 'feedback'
    case 'recognition':
      return 'recognition-recap'
    case 'analyzing':
      return 'processing'
    case 'email-gate':
      return 'email'
    case 'teaser':
      return 'teaser'
    case 'paywall':
      return 'paywall'
    case 'free-mode':
      return 'free-mode'
    default:
      return screen.id ?? 'unknown'
  }
}

export function getTaxonomy(screenKey: string): ScreenTaxonomyEntry | undefined {
  return TAXONOMY_BY_KEY[screenKey]
}

/** Paywall-specific events (not Viewed/Passed pair) */
export const PAYWALL_EVENTS = {
  planSelected: 'SoulPaywallPlanSelected',
  faqOpened: 'SoulPaywallFaqOpened',
  getPlanClicked: 'SoulPaywallGetPlanClicked',
  paymentInfoAdded: 'SoulPaywallPaymentInfoAdded',
  checkoutStarted: 'SoulPaywallCheckoutStarted',
  paymentFailed: 'SoulPaywallPaymentFailed',
  purchaseCompleted: 'SoulPurchaseCompleted',
} as const

/** Optional question sheets shown during processing animation */
export const PROCESSING_SHEET_EVENTS = {
  viewed: 'SoulProcessingSheetViewed',
  answered: 'SoulProcessingSheetAnswered',
} as const

export const POST_FUNNEL_EVENTS = {
  createAccountViewed: 'SoulCreateAccountScreenViewed',
  createAccountPassed: 'SoulCreateAccountScreenPassed',
  readingViewed: 'SoulReadingScreenViewed',
} as const
