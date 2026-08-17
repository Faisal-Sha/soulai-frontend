export type PatternSection = {
  n: number
  title: string
  paragraphs: string[]
}

/** Figma DEV · Reading · Your pattern body (625:1991) */
export const PATTERN_SECTIONS: PatternSection[] = [
  {
    n: 1,
    title: 'What sets you off',
    paragraphs: [
      "What sets you off is rarely the thing in front of you. It's the second meaning you hear underneath it — the one about whether you're allowed to take up space.",
      "A tone, a delay in a reply, a plan changed without asking you. On paper none of it is an offence. But you don't react to the event, you react to what it implies about your standing, and by the time you notice the difference you're already three steps into the feeling.",
      'The tell is speed. When something is genuinely unfair, you go quiet and think. When something touches this, you answer fast.',
    ],
  },
  {
    n: 2,
    title: 'How you hold a line',
    paragraphs: [
      "You read a boundary as a rejection — yours and other people's. When someone tells you what they can't give, you hear a verdict about your worth rather than a fact about their capacity.",
      "This is why you over-explain. Explaining feels like negotiating your way back into someone's good standing, and the longer the explanation, the smaller the request underneath it.",
      "It also means you set boundaries late. Not because you don't know where yours are — you know precisely — but because naming one early feels like starting a fight you'd rather not have. So you wait until the line has already been crossed several times, and then it comes out sharper than you meant.",
    ],
  },
  {
    n: 3,
    title: 'How you get close',
    paragraphs: [
      "You get close quickly and carefully at the same time. Early on you give people the version of yourself that's easiest to love — generous, unbothered, low maintenance — and it works, which is exactly the problem.",
      "Because the version that worked is now the one they expect. Every month you keep it up, the cost of putting it down goes up. What started as warmth turns into a performance you can't stop without explaining why you started.",
      "Real closeness for you doesn't arrive through more disclosure. It arrives the first time you let someone see you need something and don't apologise for it.",
    ],
  },
  {
    n: 4,
    title: 'What you do under pressure',
    paragraphs: [
      "Under pressure you get competent. Not calm — competent. You organise, you take responsibility that isn't yours, you make yourself the person the situation can't afford to lose.",
      "It works, and it hides you. Everyone sees someone handling it, so nobody asks how you are, so you conclude that asking wasn't an option. That conclusion is the part worth watching, because you reached it alone.",
      'Your body notices before you do. The decisions you postpone don’t disappear — they move into your sleep, your jaw, the week after.',
    ],
  },
  {
    n: 5,
    title: 'The loop you keep running',
    paragraphs: [
      'The loop is short and you’ve run it for years. Something matters to you, you wait for a signal that it’s allowed, the signal doesn’t come, you decide the thing mattered less than you thought.',
      "You look for permission from people who were never going to give it. Not because they're withholding, but because they don't have it to give — the authority you want them to have isn't theirs. It's a role you assigned them.",
      'This is also why you move fastest right after you decide. The decision was never the hard part. The waiting before it was.',
    ],
  },
  {
    n: 6,
    title: 'Where your exit door is',
    paragraphs: [
      "You start strong, then quietly retreat the moment things get real. Not dramatic exits — you don't slam anything. You get busy. You reply a little slower. You let the thing thin out until leaving looks like a natural conclusion rather than a choice.",
      "The exit door sits right where commitment would become visible to other people. As long as it's still deniable, you stay. The moment it would have to be announced, you find a reason it isn't the right time.",
      "Knowing where the door is doesn't mean you'll stop using it. But it does mean that from now on you'll notice the exact moment you reach for the handle.",
    ],
  },
]

export const PATTERN_META = {
  title: 'Your pattern',
  readTime: '6 min read',
  finishedTitle: 'You’ve finished Your pattern.',
  finishedMeta: 'Six sections · 2,100 words',
  nextChapter: {
    label: 'Next · Purpose',
    blurb: 'You were never built to pick one thing and stay there.',
    id: 'purpose' as const,
  },
} as const
