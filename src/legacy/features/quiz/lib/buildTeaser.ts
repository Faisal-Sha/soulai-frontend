// buildTeaser — header + open chapter archetype + locked chapter fallbacks
import type { QuizAnswers } from '../types'

export interface TeaserArchetype {
  name: string
  body: string
}

export interface LockedChapterTeaser {
  id: string
  label: string
  title: string
  /** Only the first line — never full chapter text pre-payment */
  firstLine: string
  pagesHint: string
}

const ARCHETYPES: Record<string, TeaserArchetype> = {
  calm: {
    name: 'The Anchor',
    body: "Your person is calm. Not boring calm — the kind that makes your shoulders drop without you noticing. You've spent years dating people who made you feel alert. <em>This one will make you feel safe.</em> They're slow to speak, quick to show up. Earth-heavy. Deeply loyal. Probably a good cook.",
  },
  spark: {
    name: 'The Catalyst',
    body: "Your person is electric. You don't need easy, you need <em>alive</em>. They'll walk in and you'll forget what you were saying. Fire and air — fast brain, faster heart. They'll ask the question no one else asks you. The first few weeks will feel like not sleeping. That's the point.",
  },
  familiar: {
    name: 'The Returning Soul',
    body: "You already know them. Maybe not in this life, but somewhere. <em>Meeting them will feel like remembering.</em> No small talk, no performance. You'll pick up mid-sentence. This one tends to come through a mutual friend, an old photo, or somewhere you've been before but didn't know why.",
  },
  mystery: {
    name: 'The Unknown Door',
    body: "You don't get to figure this one out in one conversation. Or ten. <em>They're a slow unfold.</em> Part of you will be nervous about it — that's right. Water and shadow. Quieter than they look. They'll surprise you three years in. You'll still not have them fully mapped. That's the relationship.",
  },
  mirror: {
    name: 'The Mirror',
    body: "This person sees you. All of it — the parts you're proud of and the parts you keep in a drawer. <em>You'll feel exposed before you feel loved.</em> That order matters. They're not your opposite; they're your match. Same wiring, different expression. You'll stop performing the day you meet them.",
  },
}

/** Mockup locked chapters — first lines only (decoy blur filler is separate in UI). */
export const STATIC_LOCKED_CHAPTERS: LockedChapterTeaser[] = [
  {
    id: 'money_map',
    label: 'YOUR MONEY MAP',
    title: 'How money moves through your energy',
    firstLine: 'Your chart shows a clear money pattern most people never name —',
    pagesHint: '~2 pages',
  },
  {
    id: 'how_they_love',
    label: 'HOW THEY LOVE',
    title: "The way they'll show they care",
    firstLine: "They won't say it the way you expect —",
    pagesHint: '~2 pages',
  },
  {
    id: 'how_to_speak',
    label: 'HOW TO SPEAK TO THEM',
    title: 'The words that actually land',
    firstLine: "There's a way to reach them that skips every argument you'd otherwise have —",
    pagesHint: '~2 pages',
  },
  {
    id: 'what_balances',
    label: 'WHAT BALANCES YOU',
    title: 'Where you steady each other',
    firstLine: 'Your strengths cover their blind spots in one specific place —',
    pagesHint: '~2 pages',
  },
  {
    id: 'intimacy',
    label: 'INTIMACY',
    title: 'How closeness really works between you',
    firstLine: 'Closeness for them builds on a rhythm most people miss —',
    pagesHint: '~2 pages',
  },
  {
    id: 'where_clash',
    label: "WHERE YOU'LL CLASH",
    title: "The friction you'll have to name",
    firstLine: "There's one recurring tension between your energies, and it's fixable —",
    pagesHint: '~2 pages',
  },
  {
    id: 'why_together',
    label: "WHY YOU'RE TOGETHER",
    title: 'What you two are meant to build',
    firstLine: 'Beyond attraction, your pairing carries a shared direction —',
    pagesHint: '~2 pages',
  },
  {
    id: 'playbook',
    label: 'YOUR PLAYBOOK',
    title: 'What to actually do first',
    firstLine: 'Five concrete moves for the coming week, in order —',
    pagesHint: '~2 pages',
  },
  {
    id: 'draw_them_in',
    label: 'HOW TO DRAW THEM IN',
    title: 'What switches the connection on',
    firstLine: "It isn't what you think. The thing that draws them is the thing you hide —",
    pagesHint: '~2 pages',
  },
]

/** Decorative blur only — not real locked content (safe if inspected). */
export const TEASER_BLUR_FILLER =
  'and it quietly shapes the way this whole connection unfolds from the very first day you meet.'

export function buildTeaser(answers: QuizAnswers): {
  teaserName: string
  teaserBirth: string
  archetype: TeaserArchetype
  lockedChapters: LockedChapterTeaser[]
} {
  const name = answers.name || 'Your Portrait'
  const teaserName = `${name}'s Soulmate`

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const b = answers.birthdate
  const teaserBirth = b
    ? `Calibrated from ${months[parseInt(b.month) - 1]} ${b.day}, ${b.year}`
    : ''

  const vibe = answers['soulmate-vibe']
  const archetype = vibe && ARCHETYPES[vibe] ? ARCHETYPES[vibe] : ARCHETYPES.familiar

  return {
    teaserName,
    teaserBirth,
    archetype,
    lockedChapters: STATIC_LOCKED_CHAPTERS,
  }
}

export function silhouetteSVG(): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.7"/>
      </linearGradient>
    </defs>
    <g fill="url(#sg)">
      <circle cx="60" cy="42" r="18"/>
      <path d="M30 108 Q30 70 60 70 Q90 70 90 108 Z"/>
    </g>
  </svg>`
}
