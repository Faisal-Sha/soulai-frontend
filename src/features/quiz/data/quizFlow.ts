// QUIZ_FLOW — ported verbatim from soul-v6.html QUESTIONS array
// Question IDs and answer value keys are FINAL — do not rename
//
// UX remap (FigJam GET CLIENT): same screens, tagged with uxSection.
// Order and analytics keys are unchanged — production-safe.

import type { QuizScreen, ScreenType } from '../types'

// ── Paywall plan data (ported from soul-v6.html PAYWALL_PLANS) ──
export { PAYWALL_PLANS, PAYWALL_PLAN_ORDER } from './paywallPlans'

// ── Illustration glyphs per question id (from soul-v6.html ILLUSTRATION_MAP) ──
export const ILLUSTRATION_MAP: Record<string, string> = {
  focus: '◎', status: '☾', hope: '✦', belief: '☾', block: '∞',
  gender: '◐', age: '◉', 'love-receive': '♡', attachment: '◈', energy: '△',
  'soulmate-vibe': '✦', 'soulmate-pace': '⚡', 'soulmate-strength': '✧',
  'soulmate-tender': '◎', 'soulmate-flaw': '◇', recognition: '◉',
  birthdate: '☾', 'birth-time-known': '⏰', 'birth-time': '🕐', 'birth-place': '⌖',
  ready: '✦', name: '❋', email: '✉',
}

// ── Raw questions (mirrors QUESTIONS array in soul-v6.html) ──
// FigJam GET CLIENT quiz: focus → questions → reviews → birth data → name
const QUESTIONS: QuizScreen[] = [
  // ── Focus (Figma DEV 02.1 · Quiz · Topics) ──
  {
    type: 'multi', id: 'focus', uxSection: 'quiz_questions',
    title: 'Where do you want things to change?',
    sub: 'Pick as many as you want — it tells me where to focus for you first.',
    options: [
      { v: 'money-career', label: 'Money & career' },
      { v: 'family-roots', label: 'Family & roots' },
      { v: 'confidence', label: 'Confidence' },
      { v: 'purpose-meaning', label: 'Purpose & meaning' },
      { v: 'big-decisions', label: 'Big decisions' },
      { v: 'love-relationships', label: 'Love & relationships' },
      { v: 'emotional-balance', label: 'Emotional balance' },
      { v: 'just-curious', label: 'Just curious' },
    ],
  },

  // ── Figma DEV 02.1.1 · Quiz · Reinforcement ──
  { type: 'reinforcement', id: '_reinforce_after_focus', uxSection: 'quiz_reviews' },

  // ── Figma DEV 02.2 · Quiz · Name ──
  {
    type: 'text', id: 'name', uxSection: 'quiz_name',
    title: 'What can I call you?',
    sub: "Just your first name — that's how I'll talk to you from here on.",
    placeholder: 'Enter your name',
    ctaLabel: 'Continue',
  },

  // ── Figma DEV 02.3 · Quiz · Birth data ──
  {
    type: 'date', id: 'birthdate', uxSection: 'quiz_birth_data',
    title: 'When were you born?',
    sub: "This is where your profile begins — it's what makes it about you, not everyone.",
    ctaLabel: 'Continue',
  },
  {
    type: 'text', id: 'birth-time', uxSection: 'quiz_birth_data',
    title: 'What time were you born?',
    sub: "If you know it, it makes your profile a bit sharper. If you don't — no worries, we'll work with what we've got.",
    placeholder: '--:--',
    ctaLabel: 'Continue',
    optional: true,
  },
  {
    type: 'text', id: 'birth-place', uxSection: 'quiz_birth_data',
    title: 'Where were you born?',
    sub: 'The place you come from shapes how you think — it helps me read your patterns more accurately.',
    placeholder: 'Select option',
    ctaLabel: 'Continue',
  },

  // ── Figma DEV 02.5 · Quiz · Email ──
  { type: 'email-gate', id: 'email', uxSection: 'email_account' },

  // ── Figma DEV 03.1 · Generate · Waiting ──
  { type: 'analyzing', uxSection: 'generation' },

  // Figma path: Waiting → Result Free (teaser). Legacy love-quiz screens below
  // are kept for remap but appended after free-mode so they stay off the funnel.
]

/** Legacy love-quiz screens (pre-SOUL funnel). Not in active Figma path. */
export const LEGACY_QUESTIONS: QuizScreen[] = [
  // Mid-quiz reinforcement after birth data
  { type: 'recognition', id: '_recognition', uxSection: 'quiz_birth_data' },

  // ── quiz_questions ──
  {
    type: 'single', id: 'gender', uxSection: 'quiz_questions',
    title: 'How do you identify?',
    sub: 'This helps us calibrate the language.',
    options: [
      { v: 'female', icon: '👩', label: 'Woman' },
      { v: 'male',   icon: '👨', label: 'Man' },
    ],
  },
  {
    type: 'single', id: 'age', uxSection: 'quiz_questions',
    title: 'Your age range?',
    sub: 'Your life stage shapes which archetype is closest right now.',
    options: [
      { v: '18-24', label: '18 – 24' },
      { v: '25-34', label: '25 – 34' },
      { v: '35-44', label: '35 – 44' },
      { v: '45-54', label: '45 – 54' },
      { v: '55+',   label: '55 and above' },
    ],
  },
  {
    type: 'single', id: 'status', uxSection: 'quiz_questions',
    title: 'Where are you in love right now?',
    sub: "There's no wrong answer. This calibrates your portrait.",
    options: [
      { v: 'single-ready',        icon: '🌙', label: 'Single and quietly hoping' },
      { v: 'single-healing',      icon: '🌱', label: 'Single and healing' },
      { v: 'dating',              icon: '💫', label: "Dating, unsure if they're the one" },
      { v: 'relationship-good',   icon: '💞', label: 'In a relationship that feels right' },
      { v: 'relationship-unsure', icon: '🌀', label: "In a relationship I'm questioning" },
      { v: 'divorced',            icon: '🔄', label: 'Starting over after something ended' },
    ],
  },

  // ── quiz_reviews (FigJam: Reviews) ──
  { type: 'social-proof', id: '_proof_after_status', uxSection: 'quiz_reviews' },

  {
    type: 'single', id: 'hope', uxSection: 'quiz_questions',
    title: 'What are you hoping to discover?',
    sub: 'Be honest — this shapes what your portrait reveals first.',
    options: [
      { v: 'who',       label: 'Who my true soulmate really is' },
      { v: 'when',      label: "When they'll finally show up" },
      { v: 'where',     label: "Where I'll meet them" },
      { v: 'recognize', label: "How I'll recognize them" },
      { v: 'current',   label: 'If my current partner is the one' },
      { v: 'why',       label: 'Why love has been so hard for me' },
    ],
  },
  {
    type: 'single', id: 'belief', uxSection: 'quiz_questions',
    title: 'Do you believe you have a soulmate?',
    sub: 'Your belief is part of your energetic signature.',
    options: [
      { v: 'yes',       label: 'Yes — I feel them out there' },
      { v: 'hope',      label: 'I hope so' },
      { v: 'unsure',    label: "I'm not sure anymore" },
      { v: 'multiple',  label: 'I believe in multiple soul connections' },
      { v: 'skeptical', label: 'Skeptical but open' },
    ],
  },
  {
    type: 'single', id: 'block', uxSection: 'quiz_questions',
    title: "What's been your biggest block in love?",
    sub: 'This is the pattern your soulmate is coming to help you heal.',
    options: [
      { v: 'wrong-people', icon: '🔁', label: 'I keep attracting the wrong people' },
      { v: 'fear',         icon: '🛡',  label: 'Fear of getting hurt again' },
      { v: 'self-worth',   icon: '🪞', label: 'Not feeling worthy of real love' },
      { v: 'unavailable',  icon: '🚪', label: 'Emotionally unavailable partners' },
      { v: 'timing',       icon: '⏰', label: 'Terrible timing, always' },
      { v: 'overgiving',   icon: '🎁', label: 'Giving too much of myself' },
    ],
  },
  {
    type: 'single', id: 'love-receive', uxSection: 'quiz_questions',
    title: 'How do you receive love best?',
    sub: 'Your love language is a frequency. Your soulmate matches it.',
    options: [
      { v: 'words', icon: '💬', label: 'Words — tell me how you feel' },
      { v: 'touch', icon: '🤗', label: 'Touch — hold me' },
      { v: 'time',  icon: '⏳', label: 'Time — be fully present with me' },
      { v: 'acts',  icon: '🛠',  label: 'Acts — show me through what you do' },
      { v: 'gifts', icon: '🎁', label: 'Gifts — small, thoughtful, meaningful' },
    ],
  },
  {
    type: 'single', id: 'attachment', uxSection: 'quiz_questions',
    title: 'When someone gets close to you…',
    sub: 'This reveals your attachment signature.',
    options: [
      { v: 'secure',   icon: '🌳', label: 'I feel calm and open' },
      { v: 'anxious',  icon: '🌊', label: "I want more and worry they'll leave" },
      { v: 'avoidant', icon: '🚪', label: 'I pull back and need my space' },
      { v: 'mixed',    icon: '♾',  label: 'I swing between closeness and distance' },
      { v: 'shutdown', icon: '🧊', label: "I shut down when things get too real" },
    ],
  },
  {
    type: 'single', id: 'energy', uxSection: 'quiz_questions',
    title: 'Which energy describes you most?',
    sub: 'Your dominant energy determines the one that completes you.',
    options: [
      { v: 'fire',  icon: '🔥', label: 'Fire — passionate, driven, intense' },
      { v: 'water', icon: '💧', label: 'Water — intuitive, emotional, deep' },
      { v: 'earth', icon: '🌿', label: 'Earth — grounded, loyal, steady' },
      { v: 'air',   icon: '🌬', label: 'Air — curious, witty, free' },
      { v: 'mix',   icon: '✨', label: "A mix — I shift depending on who I'm with" },
    ],
  },
  {
    type: 'single', id: 'soulmate-vibe', uxSection: 'quiz_questions',
    title: "Your soulmate's presence feels like…",
    sub: 'Trust your first instinct.',
    options: [
      { v: 'calm',      icon: '🌙', label: 'A deep calm — finally, I can exhale' },
      { v: 'spark',     icon: '⚡', label: 'An electric spark — alive and magnetic' },
      { v: 'familiar',  icon: '🪶', label: "Familiar — like I've known them forever" },
      { v: 'mystery',   icon: '🌀', label: 'A mystery — pulling me into the unknown' },
      { v: 'mirror',    icon: '🪞', label: 'A mirror — they see me completely' },
    ],
  },
  {
    type: 'single', id: 'soulmate-pace', uxSection: 'quiz_questions',
    title: 'How will your love begin?',
    sub: 'Soulmate connections unfold in patterns. What\'s yours?',
    options: [
      { v: 'slow',        icon: '🌱', label: 'Slowly — a friendship that deepens' },
      { v: 'instant',     icon: '⚡', label: 'Instantly — a thunderbolt' },
      { v: 'return',      icon: '♾',  label: 'A reunion — someone returning to me' },
      { v: 'unexpected',  icon: '🎲', label: "Unexpected — someone I didn't see coming" },
      { v: 'transform',   icon: '🦋', label: 'A transformation — someone already near me' },
    ],
  },
  {
    type: 'single', id: 'soulmate-strength', uxSection: 'quiz_questions',
    title: 'What strength will draw you in?',
    sub: "Soulmates don't complete you — they activate you.",
    options: [
      { v: 'emotional', icon: '💝', label: 'Emotional depth and openness' },
      { v: 'intellect', icon: '🧠', label: 'Sharp mind and curiosity' },
      { v: 'spiritual', icon: '🔮', label: 'Spiritual wisdom and presence' },
      { v: 'ambition',  icon: '🏔', label: 'Ambition and life force' },
      { v: 'humor',     icon: '😄', label: 'Humor that disarms me' },
      { v: 'kindness',  icon: '🕊',  label: 'Quiet, unwavering kindness' },
    ],
  },

  // ── quiz_reviews ──
  { type: 'feedback', id: '_feedback_after_strength', uxSection: 'quiz_reviews' },

  {
    type: 'single', id: 'soulmate-tender', uxSection: 'quiz_questions',
    title: 'How will they show tenderness?',
    sub: 'The small things reveal the soul.',
    options: [
      { v: 'listen',   icon: '👂', label: 'Listening — really, really listening' },
      { v: 'protect',  icon: '🛡',  label: 'Protecting what matters to me' },
      { v: 'remember', icon: '🎀', label: 'Remembering the details' },
      { v: 'play',     icon: '🎈', label: "Making me laugh when I'm heavy" },
      { v: 'touch',    icon: '🤝', label: "A hand on my back that says I'm here" },
    ],
  },
  {
    type: 'single', id: 'soulmate-flaw', uxSection: 'quiz_questions',
    title: 'What flaw will you accept in them?',
    sub: "Soulmates aren't perfect. They're perfect for you.",
    options: [
      { v: 'messy',   icon: '🌧', label: "They're emotionally messy sometimes" },
      { v: 'slow',    icon: '🐢', label: 'They move at their own slow pace' },
      { v: 'intense', icon: '🔥', label: 'They feel everything too much' },
      { v: 'distant', icon: '🌫', label: 'They need time alone to recharge' },
      { v: 'unsure',  icon: '🌪', label: "They're still figuring themselves out" },
    ],
  },
  {
    type: 'single', id: 'recognition', uxSection: 'quiz_questions',
    title: 'How will you recognize them?',
    sub: 'The body knows before the mind does.',
    options: [
      { v: 'eyes',   icon: '👁',  label: 'Through their eyes — a knowing' },
      { v: 'chest',  icon: '💗', label: 'A warm opening in my chest' },
      { v: 'calm',   icon: '🌙', label: "A calm I haven't felt in years" },
      { v: 'dream',  icon: '💭', label: 'Through a dream or a sign' },
      { v: 'slowly', icon: '☀️', label: "Slowly — I'll just know one morning" },
    ],
  },

  // birth data moved earlier — Figma DEV 02.3 after name

  {
    type: 'single', id: 'ready', uxSection: 'quiz_questions',
    title: 'How ready are you to meet them?',
    sub: 'Energetic readiness is its own signal.',
    options: [
      { v: 'fully',  icon: '🌟', label: "Fully — I've been waiting" },
      { v: 'mostly', icon: '🌗', label: "Mostly — there's still work to do" },
      { v: 'unsure', icon: '🤷', label: "I don't know how to answer this" },
      { v: 'scared', icon: '😬', label: 'Honestly? A little scared' },
    ],
  },

  // name moved earlier — Figma DEV 02.2 after reinforcement
]

// ── Build the full QUIZ_FLOW ──
// Figma DEV: intro → topics → … → email → waiting → result free → paywall
// (Backend unchanged: lead capture still fires on email; analyzing is UI wait only.)
export const QUIZ_FLOW: QuizScreen[] = [
  { type: 'intro', uxSection: 'quiz_intro' },
  ...QUESTIONS,
  { type: 'teaser', uxSection: 'free_result' },
  { type: 'paywall', uxSection: 'paywall' },
  { type: 'free-mode', uxSection: 'exit_return' },
]

// ── Question types that show the progress bar ──
export const QUESTION_SCREEN_TYPES: ScreenType[] = [
  'single', 'multi', 'yesno', 'slider', 'visual', 'date', 'text', 'email',
]

// Legacy alias — useQuizEngine imports this name
export const QUESTION_TYPES = QUESTION_SCREEN_TYPES

// ── All screen types that count as "question" steps for progress bar ──
// (excludes interstitials, recognition, analyzing, email-gate, teaser, paywall)
export const PROGRESS_SCREEN_TYPES: ScreenType[] = [
  'single', 'multi', 'yesno', 'slider', 'visual', 'date', 'text',
]

// Total question count (excluding interstitials and special screens)
export const TOTAL_QUESTIONS = QUESTIONS.filter(
  q => !['social-proof', 'feedback', 'recognition', 'reinforcement'].includes(q.type)
).length

// Re-export ScreenType so consumers don't need to import from types separately
export type { ScreenType }
