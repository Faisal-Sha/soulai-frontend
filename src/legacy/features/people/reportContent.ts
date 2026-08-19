export type PeopleReportSection = {
  n: number
  title: string
  paragraphs: string[]
}

export const PEOPLE_REPORT_META = {
  selfName: 'Pavel',
  partnerName: 'Anna',
  subtitle: 'Where you meet, where you grind, and what this year asks.',
  closingTitle: "That's the two of you.",
  closingBody: "It won't stay exactly like this. Come back in a few months and see what moved.",
  shareQuote:
    'The pull between you is not slow-burning. You read each other early, and both of you mistake that speed for certainty.',
  shareLink: 'soulplus.ai/p/8f2k9d',
} as const

export const PEOPLE_REPORT_SECTIONS: PeopleReportSection[] = [
  {
    n: 1,
    title: 'Where the two of you meet',
    paragraphs: [
      'The pull between you is not slow-burning. You read each other early, and both of you mistake that speed for certainty. It is not certainty — it is familiarity. You have each met this shape of person before.',
      'That recognition is real, and it is also the reason you skipped a few steps. Neither of you asked the slow questions, because it felt like you already knew the answers. Some of them you did. A few you invented.',
    ],
  },
  {
    n: 2,
    title: 'What works without effort',
    paragraphs: [
      'Neither of you needs the other to explain twice.',
      'She says less than she means and you hear the rest. You say more than you need to and she does not hold it against you. That saves you both a great deal of talking, and it is why the good stretches between you feel effortless rather than worked at.',
      'You are also both unbothered by silence. Most pairs have to negotiate that. You never did — it arrived already agreed.',
    ],
  },
  {
    n: 3,
    title: 'Where you grind',
    paragraphs: [
      'You hand her the easy version. She takes it at face value.',
      'You give people the self that is simplest to love, and Anna is not someone who digs for the other one. She responds to what she is shown. So the version she answers is the one you are performing — and some part of you resents her for believing it.',
      'That is not her failure and it is not yours. It is a loop: you make yourself easy, she treats you as easy, you feel unseen, you make yourself easier. Nobody in it is doing anything wrong, which is exactly why it holds.',
    ],
  },
  {
    n: 4,
    title: 'What this year asks of you',
    paragraphs: [
      'The arrangement works until one of you needs something.',
      'Right now neither of you is asking the other for much, and you have both decided that this is what compatibility feels like. It is not. It is what low demand feels like.',
      'Something is going to require more this year — a decision, a move, a bad stretch that one of you cannot handle alone. That is the real test, and it will arrive before either of you feels ready for it.',
    ],
  },
  {
    n: 5,
    title: 'The one thing worth changing',
    paragraphs: [
      'Say the small thing early.',
      'Not the confession. Not the conversation you have been rehearsing. The small thing, on the day it happens — the plan that annoyed you, the reply that landed wrong, the thing you decided not to mention because it was not worth it.',
      'Everything heavy between you started as something light that waited three weeks. Change the timing, and most of the rest sorts itself out without a single difficult conversation.',
    ],
  },
]
