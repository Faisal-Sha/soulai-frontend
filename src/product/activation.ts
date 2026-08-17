/**
 * ACTIVATION remap helpers — reuse existing Home chat, no new screens.
 * FigJam: "Your mentor is ready" → 3 starter questions → Home.
 */

export const ACTIVATION_MENTOR_QUERY = 'mentor'

/** Deep-link that opens mentor chat on Home (RETENTION hub). */
export function getActivationMentorPath(): string {
  return `/?${ACTIVATION_MENTOR_QUERY}=1`
}

/** FigJam first-conversation prompts (EN). */
export const ACTIVATION_MENTOR_QUESTIONS_EN = [
  'What matters most for me right now?',
  'What am I struggling with?',
  'What do I most need to understand?',
] as const

export const ACTIVATION_MENTOR_QUESTIONS_RU = [
  'Что для меня важнее всего сейчас?',
  'С чем я сейчас борюсь?',
  'Что мне важнее всего понять?',
] as const

export function getActivationMentorQuestions(language: string): string[] {
  return language === 'ru'
    ? [...ACTIVATION_MENTOR_QUESTIONS_RU]
    : [...ACTIVATION_MENTOR_QUESTIONS_EN]
}
