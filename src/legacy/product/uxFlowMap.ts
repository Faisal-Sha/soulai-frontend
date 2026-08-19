/**
 * Canonical map: FigJam USER-FLOW ↔ current production routes/screens.
 *
 * Remap rule (until UI design pass):
 * - Only wire existing screens into UX phases.
 * - Gaps listed as `deferred` are NOT built here — they land with the UI design.
 * - Do not change quiz answer IDs, analytics event names, or backend contracts.
 *
 * ── SOUL+AI Figma DEV build progress (WEB-APP · Er6qBY73Oy3mlqcxNv5CNB) ──
 * DONE
 *   Quiz funnel (onboarding → paywall)
 *   Chat /agent (empty → generating → response → errors → limit/ended → top-up → save)
 *   Home / signed-in — all 4 variants (default · day1 · trial · loading) + full-bleed ripple bg
 *   Soul reusable kit — full Figma WIP + Components states (buttons, chip, composer, link,
 *     input, textarea, form field, spinner, nav, progress)
 *   Readings · list (`/readings`) — Figma 625:1793 / 625:1663
 *   Reading · Your pattern (`/readings/your-pattern`) — detail + action bar + saved toast
 *   People (`/people`) — Empty · List · Add · Generate · Report · Share
 *   Account · Full (`/account`) — hub (805:2128)
 *   Account · Plan (`/account/plan`) — 818:3587
 *   Account · Notifications (`/account/notifications`) — 818:3719 (+ blocked `?blocked=1`)
 *   Account · What I know (`/account/know`) — 805:2283
 *   Account · What I know · Answering (`/account/know/:questionId`) — 818:3017
 * AFTER
 *   Backend wiring: quota, top-up payment, insight save, daily note API, people reports API
 */

export type UxLifecyclePhase = 'get_client' | 'activation' | 'retention'

/** FigJam GET CLIENT sections */
export type GetClientSection =
  | 'entry'
  | 'landing'
  | 'quiz'
  | 'email_account'
  | 'generation'
  | 'free_result'
  | 'paywall'
  | 'exit_return'

/** FigJam ACTIVATION sections */
export type ActivationSection =
  | 'reward'
  | 'first_value'
  | 'onboarding'
  | 'handoff_home'

/** FigJam RETENTION sections */
export type RetentionSection =
  | 'home'
  | 'ai_chat'
  | 'readings'
  | 'compatibility'
  | 'account'
  | 'viral'

export type UxNodeStatus = 'mapped' | 'partial' | 'deferred'

export interface UxFlowNode {
  phase: UxLifecyclePhase
  section: string
  /** FigJam label */
  label: string
  /** Current production paths or quiz screen keys that fill this slot */
  current: string[]
  status: UxNodeStatus
  /** Why partial / what the UI pass should add */
  note?: string
}

/**
 * Full product map. Safe to import anywhere — pure data, no side effects.
 */
export const UX_FLOW_NODES: UxFlowNode[] = [
  // ── GET CLIENT ──────────────────────────────────────────────
  {
    phase: 'get_client',
    section: 'entry',
    label: 'Entry: direct / ads / returning login',
    current: ['/', '/quiz/welcome', '/auth'],
    status: 'mapped',
    note: 'Ads enter /quiz directly. Returning users use /auth → Home (/).',
  },
  {
    phase: 'get_client',
    section: 'landing',
    label: 'Landing + calculator',
    current: ['/', '/calculator'],
    status: 'mapped',
    note: 'Matrix calculator is the public landing. Quiz is a separate ad funnel.',
  },
  {
    phase: 'get_client',
    section: 'quiz',
    label: 'Quiz · multi-step input',
    current: [
      '/quiz/welcome',
      '/quiz/q/focus',
      '/quiz/q/*',
      '/quiz/social-proof',
      '/quiz/feedback',
      '/quiz/recognition',
      '/quiz/q/birth-time-known',
      '/quiz/q/birth-time',
      '/quiz/q/birth-place',
    ],
    status: 'mapped',
    note: 'Frontend UX aligned: focus, birth time branch, place. Time/place stored in answers JSON only — backend unchanged.',
  },
  {
    phase: 'get_client',
    section: 'email_account',
    label: 'Email / account',
    current: ['/quiz/email'],
    status: 'mapped',
    note: 'Account created server-side via quiz-lead; browser session later via set-password. Now before generation wait (FigJam order).',
  },
  {
    phase: 'get_client',
    section: 'generation',
    label: 'Generation / wait',
    current: ['/quiz/processing', '/processing'],
    status: 'mapped',
    note: 'In-funnel analyzing after email + post-pay /processing poll.',
  },
  {
    phase: 'get_client',
    section: 'free_result',
    label: 'Free result + conversion moment',
    current: ['/quiz/teaser'],
    status: 'mapped',
    note: 'Tap locked → contextual teaser · Save · Share shells. CTA → contextual paywall.',
  },
  {
    phase: 'get_client',
    section: 'paywall',
    label: 'Paywall / purchase (Stripe)',
    current: ['/quiz/paywall', '/rates'],
    status: 'mapped',
    note: 'Contextual section · plan compare UI · live Stripe on Full Access · Cancel→teaser · Exit→free-mode. Mentor+ tier is shell only.',
  },
  {
    phase: 'get_client',
    section: 'exit_return',
    label: 'Exit / return (free mode, remarketing)',
    current: ['/quiz/free-mode', '/quiz/teaser'],
    status: 'mapped',
    note: 'FreeModeScreen shell. Remarketing email/ads remain ops — not a product screen.',
  },

  // ── ACTIVATION ──────────────────────────────────────────────
  {
    phase: 'activation',
    section: 'reward',
    label: 'Full reading unlocked + PDF',
    current: ['/processing', '/reading', '/download-report'],
    status: 'mapped',
    note: 'Post-pay always lands on /reading (not Home). PDF via reading + download-report.',
  },
  {
    phase: 'activation',
    section: 'first_value',
    label: 'Mentor ready + first conversation',
    current: ['/activation/mentor', '/reading', '/?mentor=1', '/'],
    status: 'mapped',
    note: 'MentorReadyPage shell → notifications → Home chat with starter questions.',
  },
  {
    phase: 'activation',
    section: 'onboarding',
    label: 'Notifications / home-screen icon',
    current: ['/activation/notifications'],
    status: 'mapped',
    note: 'Frontend shell only — push/PWA not wired.',
  },
  {
    phase: 'activation',
    section: 'handoff_home',
    label: 'Handoff → HOME (retention)',
    current: ['/', '/?mentor=1'],
    status: 'mapped',
    note: 'Post-pay still lands on /reading first; activation shells hand off to Home chat.',
  },

  // ── RETENTION ───────────────────────────────────────────────
  {
    phase: 'retention',
    section: 'home',
    label: 'HOME · daily hub',
    current: ['/'],
    status: 'partial',
    note: 'DONE UI: all Home variants + full-bleed ripple. Wired Talk→/agent, readings→/readings|/rates, compat→/compatibility, profile→/account.',
  },
  {
    phase: 'retention',
    section: 'ai_chat',
    label: 'AI chat — product core',
    current: ['/agent'],
    status: 'mapped',
    note: 'DONE: AgentPage = Figma chat (empty/generating/response/errors/limit/ended/top-up/save). Preview ?gate=limit|ended · ?sheet=topup.',
  },
  {
    phase: 'retention',
    section: 'readings',
    label: 'Readings · list + chapter detail',
    current: ['/readings', '/readings/your-pattern', '/reading'],
    status: 'mapped',
    note: 'DONE: list + Your pattern detail (action bar Save/Ask/Copy + saved toast). /reading remains activation PDF.',
  },
  {
    phase: 'retention',
    section: 'compatibility',
    label: 'Compatibility report + chat',
    current: ['/people', '/people/add', '/people/:id', '/compatibility', '/compatibility/report/:id'],
    status: 'partial',
    note: 'DONE UI: SOUL People hub/add/generate/report/share. Legacy /compatibility calculator still exists.',
  },
  {
    phase: 'retention',
    section: 'account',
    label: 'Profile & subscription',
    current: ['/account', '/profile', '/rates'],
    status: 'partial',
    note: 'DONE UI: Full · Plan · Notifications · What I know · Answering. Sign-out wired. NEXT: backend (quota, top-up, insight save).',
  },
  {
    phase: 'retention',
    section: 'viral',
    label: 'Share / referral',
    current: ['/quiz/teaser'],
    status: 'partial',
    note: 'Early share shell on teaser. Beautiful card + referral attribution still UI/backend later.',
  },
]

/** Quiz screen key → GET CLIENT section (in-funnel only). */
export const QUIZ_SCREEN_TO_GET_CLIENT: Record<string, GetClientSection> = {
  welcome: 'quiz',
  gender: 'quiz',
  age: 'quiz',
  status: 'quiz',
  'social-proof': 'quiz',
  hope: 'quiz',
  belief: 'quiz',
  block: 'quiz',
  'love-receive': 'quiz',
  attachment: 'quiz',
  energy: 'quiz',
  'soulmate-vibe': 'quiz',
  'soulmate-pace': 'quiz',
  'soulmate-strength': 'quiz',
  feedback: 'quiz',
  'soulmate-tender': 'quiz',
  'soulmate-flaw': 'quiz',
  recognition: 'quiz',
  birthdate: 'quiz',
  '_recognition': 'quiz',
  ready: 'quiz',
  name: 'quiz',
  analyzing: 'generation',
  processing: 'generation',
  email: 'email_account',
  teaser: 'free_result',
  paywall: 'paywall',
}

/** App pathname → lifecycle phase (best-effort). */
export function resolveLifecyclePhase(pathname: string): UxLifecyclePhase | null {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path.startsWith('/quiz')) return 'get_client'
  if (path === '/rates') return 'get_client'
  if (path === '/processing' || path === '/upsell') return 'activation'
  if (path.startsWith('/readings')) return 'retention'
  if (path === '/reading' || path === '/download-report' || path === '/set-password') {
    return 'activation'
  }
  if (
    path === '/' ||
    path === '/calculator' ||
    path === '/avatar' ||
    path === '/dashboard' ||
    path === '/account' ||
    path === '/profile' ||
    path === '/agent' ||
    path.startsWith('/people') ||
    path.startsWith('/compatibility')
  ) {
    return 'retention'
  }
  return null
}

export function getNodesForPhase(phase: UxLifecyclePhase): UxFlowNode[] {
  return UX_FLOW_NODES.filter(n => n.phase === phase)
}

export function getDeferredNodes(): UxFlowNode[] {
  return UX_FLOW_NODES.filter(n => n.status === 'deferred')
}
