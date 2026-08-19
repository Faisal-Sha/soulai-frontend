// Quiz funnel — TypeScript interfaces
// Field names are FINAL — do not rename without explicit approval

export type ScreenType =
  | 'intro'
  | 'testimonial'
  | 'social-proof'   // NEW: social proof interstitial
  | 'feedback'       // NEW: feedback interstitial after soulmate-strength
  | 'recognition'    // NEW: mid-quiz reinforcement after birthdate
  | 'reinforcement'  // Figma 02.1.1 after topics
  | 'analyzing'
  | 'email-gate'     // NEW: dedicated email gate screen
  | 'teaser'         // NEW: locked portrait teaser
  | 'paywall'        // NEW: full paywall screen
  | 'free-mode'      // FigJam EXIT / RETURN — free mode shell
  | 'results'
  | 'single'
  | 'multi'
  | 'yesno'
  | 'slider'
  | 'visual'
  | 'date'
  | 'text'           // NEW: free text input (name)
  | 'email'

export interface QuizScreenOption {
  v: string
  label: string
  detail?: string
  glyph?: string
  icon?: string
}

/** FigJam GET CLIENT section — metadata only; does not affect routing or analytics. */
export type QuizUxSection =
  | 'quiz_intro'
  | 'quiz_questions'
  | 'quiz_reviews'
  | 'quiz_birth_data'
  | 'quiz_name'
  | 'generation'
  | 'email_account'
  | 'free_result'
  | 'paywall'
  | 'exit_return'

export interface QuizScreen {
  type: ScreenType
  id?: string
  kicker?: string
  q?: string
  sub?: string
  title?: string     // alias used by prototype
  options?: QuizScreenOption[]
  min?: number
  max?: number
  default?: number
  step?: number
  unit?: string
  anchors?: [string, string]
  quote?: string
  author?: string
  meta?: string
  stat?: { pct: number; label: string }
  placeholder?: string
  ctaLabel?: string
  optional?: boolean
  /** UX phase tag for remap / future UI — ignored by engine today */
  uxSection?: QuizUxSection
}

// Answer field names are FINAL — do not rename
export interface QuizAnswers {
  focus?: string | string[]
  gender?: string
  age?: string
  status?: string
  hope?: string
  belief?: string
  block?: string
  'love-receive'?: string
  attachment?: string
  energy?: string
  'soulmate-vibe'?: string
  'soulmate-pace'?: string
  'soulmate-strength'?: string
  'soulmate-tender'?: string
  'soulmate-flaw'?: string
  recognition?: string
  birthdate?: { day: string; month: string; year: string }
  /** Frontend-only UX fields — stored in answers JSON; backend ignores unknown keys */
  'birth-time-known'?: string
  'birth-time'?: string
  'birth-place'?: string
  ready?: string
  name?: string
  email?: string
  'portrait-color'?: string
}

export type QuizAnswerValue =
  | string
  | string[]
  | number
  | boolean
  | { day: string; month: string; year: string }
  | undefined

export interface UTMParams {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

export interface QuizLead {
  id: string
  email: string
  answers: QuizAnswers
  started_at: string
  completed_at: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

// ── Paywall types ──
export type PaywallPlanId = 'fullAccess'

export interface PaywallPlanFeature {
  t: string
  isNew?: boolean
  isInherit?: boolean
}

export interface PaywallPlan {
  id: PaywallPlanId
  name: string
  tagline: string
  price: number
  renewalPrice: number
  durationDays: number
  durationLabel: string
  perDay: string
  badge: string | null
  badgeStyle?: string
  features: PaywallPlanFeature[]
  coach?: {
    initials: string
    name: string
    title: string
  }
}
