export type SavedInsight = {
  id: string
  quote: string
  /** Figma chip-source label */
  source: string
  /** Display date e.g. Jul 22 */
  savedAt: string
  /** Optional max height for clamped cards — Figma 955:7534 / 955:8400 */
  clampLines?: 3 | 4
}

/** Figma DEV · Saved insights · Card close (955:7508) */
export const SAVED_INSIGHTS: SavedInsight[] = [
  {
    id: 'boundary-rejection',
    quote:
      'You read a boundary as a rejection — yours and other people’s. Three weeks is long enough that the waiting has become the decision',
    source: 'Your pattern',
    savedAt: 'Jul 22',
    clampLines: 3,
  },
  {
    id: 'waiting-decision',
    quote: 'Three weeks is long enough that the waiting has become the decision.',
    source: 'Your pattern',
    savedAt: 'Jul 22',
  },
  {
    id: 'easiest-to-love',
    quote: 'You hand people the version of yourself that’s easiest to love.',
    source: 'Your pattern',
    savedAt: 'Jul 22',
  },
  {
    id: 'earn-in-bursts',
    quote: 'You earn in bursts, then cap yourself the moment things feel stable.',
    source: 'Your pattern',
    savedAt: 'Jul 22',
    clampLines: 3,
  },
]
