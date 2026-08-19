export type ReadingChapterId =
  | 'core-self'
  | 'your-pattern'
  | 'purpose'
  | 'relationships'
  | 'money'
  | 'health'
  | 'how-you-speak'
  | 'family'
  | 'year-ahead'

export type ReadingChapter = {
  id: ReadingChapterId
  title: string
  blurb: string
  /** e.g. "2 of 6 · 6 min" — omit when fully read */
  meta?: string
  read?: boolean
}

/** Figma DEV · Readings list chapters (625:1793) */
export const READING_CHAPTERS: ReadingChapter[] = [
  {
    id: 'core-self',
    title: 'Core self',
    blurb: 'You process the world through feeling first, logic second.',
    read: true,
  },
  {
    id: 'your-pattern',
    title: 'Your pattern',
    blurb: "You read a boundary as a rejection — yours and other people's.",
    meta: '2 of 6 · 6 min',
  },
  {
    id: 'purpose',
    title: 'Purpose',
    blurb: 'You were never built to pick one thing and stay there.',
    meta: '2 of 6 · 6 min',
  },
  {
    id: 'relationships',
    title: 'Relationships',
    blurb: "You hand people the version of yourself that's easiest to love.",
    meta: '11 min',
  },
  {
    id: 'money',
    title: 'Money',
    blurb: 'You earn in bursts, then cap yourself the moment things feel stable.',
    meta: '8 min',
  },
  {
    id: 'health',
    title: 'Health and energy',
    blurb: 'Your body keeps the score of decisions you keep postponing.',
    meta: '7 min',
  },
  {
    id: 'how-you-speak',
    title: 'How you speak',
    blurb: 'You over-explain when you are asking for something small.',
    meta: '6 min',
  },
  {
    id: 'family',
    title: 'Family and roots',
    blurb: 'You inherited a rule nobody in your family says out loud.',
    meta: '6 min',
  },
  {
    id: 'year-ahead',
    title: 'Year ahead',
    blurb: 'The next nine months ask you to finish something you abandoned.',
    meta: '6 min',
  },
]
