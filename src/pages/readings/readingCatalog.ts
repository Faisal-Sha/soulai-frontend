import { PATTERN_SECTIONS, type PatternSection } from './patternContent'
import type { ReadingChapterId } from './chapters'

export type { PatternSection as ReadingSection }

export type ChapterPack = {
  id: ReadingChapterId
  title: string
  blurb: string
  readTimeMin: number
  sections: PatternSection[]
}

function sections(
  rows: { title: string; paragraphs: string[] }[],
): PatternSection[] {
  return rows.map((row, i) => ({ n: i + 1, title: row.title, paragraphs: row.paragraphs }))
}

export function countWords(pack: Pick<ChapterPack, 'title' | 'blurb' | 'sections'>): number {
  const chunks = [pack.title, pack.blurb]
  for (const section of pack.sections) {
    chunks.push(section.title, ...section.paragraphs)
  }
  return chunks.join(' ').split(/\s+/).filter(Boolean).length
}

/** Same Figma nine chapters for every user until generate-reading exists. */
export const READING_PACK: ChapterPack[] = [
  {
    id: 'core-self',
    title: 'Core self',
    blurb: 'You process the world through feeling first, logic second.',
    readTimeMin: 6,
    sections: sections([
      {
        title: 'How you take things in',
        paragraphs: [
          'You process the world through feeling first, logic second. The body votes before the mind has a sentence.',
          'That is not softness. It is speed in a different channel. You already know if a room is safe, a person is honest, a plan will cost you — and then you spend twenty minutes explaining the knowing as if it needed a proof.',
          'The work is not to feel less. It is to trust the first read enough that you do not talk yourself out of it.',
        ],
      },
      {
        title: 'The second voice',
        paragraphs: [
          'There is a second voice that arrives late and sounds reasonable. It asks you to wait, to be nicer, to collect more evidence.',
          'Sometimes it is wisdom. More often it is the habit of not wanting to be the person who named the thing first.',
        ],
      },
      {
        title: 'What you protect',
        paragraphs: [
          'You protect other people’s comfort faster than your own clarity. It looks like kindness. It is also how you disappear in rooms you meant to stay in.',
        ],
      },
      {
        title: 'The tell',
        paragraphs: [
          'When you are in your core, you go quiet and precise. When you have left it, you over-explain. Watch which one you are doing before you decide what the moment means.',
        ],
      },
    ]),
  },
  {
    id: 'your-pattern',
    title: 'Your pattern',
    blurb: "You read a boundary as a rejection — yours and other people's.",
    readTimeMin: 6,
    sections: PATTERN_SECTIONS,
  },
  {
    id: 'purpose',
    title: 'Purpose',
    blurb: 'You were never built to pick one thing and stay there.',
    readTimeMin: 6,
    sections: sections([
      {
        title: 'The myth of one lane',
        paragraphs: [
          'You were never built to pick one thing and stay there. The pressure to choose a single identity is borrowed — it is not how your attention actually works.',
          'You move in seasons. A skill, a person, a problem gets all of you, then the heat moves. From the outside that looks like quitting. From the inside it is completion.',
        ],
      },
      {
        title: 'What you are actually for',
        paragraphs: [
          'You are for making a scattered picture make sense. Not for holding still in a job title until it feels like a cage.',
          'Purpose for you is a way of seeing, not a destination. When you forget that, you punish yourself for a restlessness that is the talent.',
        ],
      },
      {
        title: 'The stall',
        paragraphs: [
          'You stall when a path would require announcing yourself. As long as the work is still private, you can love it. The moment it would have a name other people use, you start looking for the flaw.',
        ],
      },
      {
        title: 'This year',
        paragraphs: [
          'Finish one thing you already started. Not a new calling. The unfinished one is the teacher. The next lane opens after, not instead.',
        ],
      },
    ]),
  },
  {
    id: 'relationships',
    title: 'Relationships',
    blurb: "You hand people the version of yourself that's easiest to love.",
    readTimeMin: 11,
    sections: sections([
      {
        title: 'The easy version',
        paragraphs: [
          "You hand people the version of yourself that's easiest to love — generous, unbothered, low maintenance — and it works, which is exactly the problem.",
          'The version that worked is now the one they expect. Every month you keep it up, the cost of putting it down goes up.',
        ],
      },
      {
        title: 'What you want and do not ask',
        paragraphs: [
          'You want to be met without having to produce the meeting. You wait for someone to notice the gap, and when they do not, you conclude you asked for too much without having asked at all.',
        ],
      },
      {
        title: 'Conflict',
        paragraphs: [
          'You would rather be slightly false than clearly in a fight. So the fight arrives late, sharper than you meant, about a smaller thing than the real one.',
        ],
      },
      {
        title: 'Closeness that holds',
        paragraphs: [
          'Real closeness for you does not arrive through more disclosure. It arrives the first time you let someone see you need something and do not apologise for it.',
        ],
      },
    ]),
  },
  {
    id: 'money',
    title: 'Money',
    blurb: 'You earn in bursts, then cap yourself the moment things feel stable.',
    readTimeMin: 8,
    sections: sections([
      {
        title: 'Burst, then ceiling',
        paragraphs: [
          'You earn in bursts, then cap yourself the moment things feel stable. Stability reads as a trap: if it is working, it might start asking more of you than you meant to give.',
        ],
      },
      {
        title: 'What money means here',
        paragraphs: [
          'Money is not the score. It is proof that you are allowed to take up room. When that proof feels dangerous, you undercharge, delay invoices, or pick the smaller offer so nobody can say you got greedy.',
        ],
      },
      {
        title: 'The leak',
        paragraphs: [
          'You spend to reset a feeling, not to buy a thing. Watch the week after a decision you postponed. That is usually when the leak opens.',
        ],
      },
      {
        title: 'The next move',
        paragraphs: [
          'Name a number that is slightly uncomfortable and stop negotiating it down in the same conversation. The skill is not earning more. It is not shrinking after you do.',
        ],
      },
    ]),
  },
  {
    id: 'health',
    title: 'Health and energy',
    blurb: 'Your body keeps the score of decisions you keep postponing.',
    readTimeMin: 7,
    sections: sections([
      {
        title: 'Where it lands',
        paragraphs: [
          'Your body keeps the score of decisions you keep postponing. The jaw, the sleep, the week after — that is the archive, not a random glitch.',
        ],
      },
      {
        title: 'Competence as camouflage',
        paragraphs: [
          'Under pressure you get competent. Everyone sees someone handling it, so nobody asks how you are, so you conclude that asking was not an option.',
        ],
      },
      {
        title: 'Rest you do not take',
        paragraphs: [
          'You rest after you have earned it, which means you almost never rest. The body does not wait for permission. It takes the payment in other currency.',
        ],
      },
      {
        title: 'A small practice',
        paragraphs: [
          'One postponed decision, named out loud, is more medicine than a new routine. Energy returns when the loop is shorter, not when you add more discipline on top of it.',
        ],
      },
    ]),
  },
  {
    id: 'how-you-speak',
    title: 'How you speak',
    blurb: 'You over-explain when you are asking for something small.',
    readTimeMin: 6,
    sections: sections([
      {
        title: 'The long ask',
        paragraphs: [
          'You over-explain when you are asking for something small. Explaining feels like negotiating your way back into someone’s good standing, and the longer the explanation, the smaller the request underneath it.',
        ],
      },
      {
        title: 'Silence you can use',
        paragraphs: [
          'You are good at filling air so nobody has to sit in the want. Try leaving one sentence unpadded. The want is clearer when it is shorter.',
        ],
      },
      {
        title: 'When you go quiet',
        paragraphs: [
          'Genuine unfairness makes you quiet and exact. This pattern makes you fast and long. Learn the difference in your own mouth before you decide what they meant.',
        ],
      },
      {
        title: 'The edit',
        paragraphs: [
          'Say the request first. Context second, and only if they ask. Most of what you add is a defence against a rejection that has not happened yet.',
        ],
      },
    ]),
  },
  {
    id: 'family',
    title: 'Family and roots',
    blurb: 'You inherited a rule nobody in your family says out loud.',
    readTimeMin: 6,
    sections: sections([
      {
        title: 'The unspoken rule',
        paragraphs: [
          'You inherited a rule nobody in your family says out loud. It still runs the room: do not need too much, do not make it heavier, be the one who holds it.',
        ],
      },
      {
        title: 'Loyalty as shape',
        paragraphs: [
          'Loyalty for you looks like becoming useful. It is how you stayed in. It is also how you learned that your needs were optional.',
        ],
      },
      {
        title: 'What you repeat',
        paragraphs: [
          'You recreate the rule with people who never asked for it. They get the easy version. You get the job of keeping the weather stable.',
        ],
      },
      {
        title: 'A different loyalty',
        paragraphs: [
          'You can love them and still stop performing the rule. The family story does not have to be the adult contract. Naming the rule is the first time it is not invisible.',
        ],
      },
    ]),
  },
  {
    id: 'year-ahead',
    title: 'Year ahead',
    blurb: 'The next nine months ask you to finish something you abandoned.',
    readTimeMin: 6,
    sections: sections([
      {
        title: 'The unfinished thing',
        paragraphs: [
          'The next nine months ask you to finish something you abandoned. Not because the old project is sacred — because leaving it open is how the loop keeps running.',
        ],
      },
      {
        title: 'What will test you',
        paragraphs: [
          'A decision, a move, a stretch you cannot handle alone. Low demand has felt like compatibility with your own life. That is not the same as being ready.',
        ],
      },
      {
        title: 'The permission trap',
        paragraphs: [
          'You will wait for a signal that it is allowed. The signal will not come from the people you assigned it to. Move before it feels official.',
        ],
      },
      {
        title: 'How to use the year',
        paragraphs: [
          'Pick the abandoned thing. Give it a date. Tell one person. Visibility is the part you usually skip, and it is the part that keeps the door from opening behind you.',
        ],
      },
    ]),
  },
]

export function packById(id: string): ChapterPack | undefined {
  return READING_PACK.find((pack) => pack.id === id)
}

export function nextPack(id: ReadingChapterId): ChapterPack | null {
  const i = READING_PACK.findIndex((pack) => pack.id === id)
  if (i < 0 || i === READING_PACK.length - 1) return null
  return READING_PACK[i + 1]
}

export const STATIC_DAILY_NOTE = {
  headline:
    'You move fastest right after you decide — and slowest while you look for permission.',
  sub: 'Today asks for a small decision made without asking anyone.',
} as const
