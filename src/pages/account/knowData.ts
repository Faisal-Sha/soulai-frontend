export type KnowQuestion = {
  id: string
  prompt: string
  /** Demo answer from Figma; omit = unanswered */
  answer?: string
}

export type KnowSection = {
  id: string
  title: string
  /** Shown under section title when all answered (Figma Core self) */
  completeNote?: string
  questions: KnowQuestion[]
}

/**
 * Figma Account · What I know about you · Full (805:2283)
 * Demo answers match the design; unanswered prompts are Answer slots.
 */
export const KNOW_SECTIONS: KnowSection[] = [
  {
    id: 'core-self',
    title: 'Core self',
    completeNote: 'This chapter now uses what you told me.',
    questions: [
      {
        id: 'core-evening',
        prompt: 'What do you do with an evening when nobody expects anything from you?',
        answer: 'Nothing planned. I end up working, which is not the same as resting.',
      },
      {
        id: 'core-first-meet',
        prompt: 'What do people get wrong about you when they first meet you?',
        answer: 'That I am easy-going. I am just slow to object.',
      },
      {
        id: 'core-right',
        prompt:
          'When you know something is right but cannot explain why — what happens next?',
        answer: 'I look for a reason good enough to say out loud.',
      },
    ],
  },
  {
    id: 'pattern',
    title: 'Your pattern',
    questions: [
      {
        id: 'pattern-evening',
        prompt: 'What do you do with an evening when nobody expects anything from you?',
        answer: 'Nothing planned. I end up working, which is not the same as resting.',
      },
      {
        id: 'pattern-sets-off',
        prompt: 'What sets you off faster than it should?',
      },
      {
        id: 'pattern-quiet',
        prompt: 'When you go quiet, what is usually happening?',
      },
    ],
  },
  {
    id: 'purpose',
    title: 'Purpose',
    questions: [
      {
        id: 'purpose-time',
        prompt: 'What were you doing the last time you lost track of time?',
      },
      {
        id: 'purpose-started',
        prompt: 'What have you started more than once and never finished?',
      },
      {
        id: 'purpose-approve',
        prompt: 'If nobody had to approve it, what would you be doing this year?',
      },
    ],
  },
  {
    id: 'relationships',
    title: 'Relationships',
    questions: [
      {
        id: 'rel-version',
        prompt: 'Who knows the version of you that you do not perform?',
      },
      {
        id: 'rel-upset',
        prompt: 'What do you do when someone is upset with you?',
      },
      {
        id: 'rel-need',
        prompt: 'What do you need that you find hard to ask for?',
      },
    ],
  },
  {
    id: 'money',
    title: 'Money',
    questions: [
      {
        id: 'money-house',
        prompt: 'What did money mean in the house you grew up in?',
      },
      {
        id: 'money-spend',
        prompt: 'What do you spend on without thinking, and what do you hesitate over?',
      },
      {
        id: 'money-twice',
        prompt: 'What would change if you had twice as much — and what would not?',
      },
    ],
  },
  {
    id: 'health',
    title: 'Health and energy',
    questions: [
      {
        id: 'health-time',
        prompt: 'What time of day are you actually good?',
      },
      {
        id: 'health-body',
        prompt: 'What does your body do first when things get heavy?',
      },
      {
        id: 'health-postpone',
        prompt: 'What have you been postponing that you know is physical?',
      },
    ],
  },
  {
    id: 'speak',
    title: 'How you speak',
    questions: [
      {
        id: 'speak-over',
        prompt: 'What do you over-explain?',
      },
      {
        id: 'speak-avoid',
        prompt: 'What do you say when you do not want to answer?',
      },
      {
        id: 'speak-shorter',
        prompt: 'Who do you get shorter with than you mean to be?',
      },
    ],
  },
  {
    id: 'family',
    title: 'Family and roots',
    questions: [
      {
        id: 'family-rule',
        prompt: 'What rule did your family live by without ever saying out loud?',
      },
      {
        id: 'family-like',
        prompt: 'Who in your family are you most like, and how do you feel about that?',
      },
      {
        id: 'family-differently',
        prompt: 'What did you decide you would do differently?',
      },
    ],
  },
  {
    id: 'year',
    title: 'Year ahead',
    questions: [
      {
        id: 'year-head',
        prompt: 'What is taking up most of your head this month?',
      },
      {
        id: 'year-changed',
        prompt: 'What changed in the last year that you did not choose?',
      },
      {
        id: 'year-different',
        prompt: 'If one thing were different a year from now, what would it be?',
      },
    ],
  },
]

export function knowProgress(sections: KnowSection[] = KNOW_SECTIONS) {
  let answered = 0
  let total = 0
  for (const s of sections) {
    for (const q of s.questions) {
      total += 1
      if (q.answer?.trim()) answered += 1
    }
  }
  return { answered, total }
}

const ANSWERS_KEY = 'soul-account-know-answers'

export function readKnowAnswers(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(ANSWERS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, string>
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function writeKnowAnswer(questionId: string, answer: string) {
  const next = { ...readKnowAnswers(), [questionId]: answer.trim() }
  if (!answer.trim()) delete next[questionId]
  try {
    sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(next))
  } catch {
    /* ignore */
  }
}

/** Merge demo defaults with any session overrides. */
export function getKnowSections(): KnowSection[] {
  const overrides = readKnowAnswers()
  return KNOW_SECTIONS.map((section) => ({
    ...section,
    questions: section.questions.map((q) => {
      if (Object.prototype.hasOwnProperty.call(overrides, q.id)) {
        const value = overrides[q.id]
        return value ? { ...q, answer: value } : { ...q, answer: undefined }
      }
      return { ...q }
    }),
  }))
}

export function findKnowQuestion(questionId: string) {
  const sections = getKnowSections()
  for (const section of sections) {
    const index = section.questions.findIndex((q) => q.id === questionId)
    if (index >= 0) {
      return {
        section,
        question: section.questions[index],
        index,
        nextQuestion: section.questions[index + 1] ?? null,
      }
    }
  }
  return null
}
