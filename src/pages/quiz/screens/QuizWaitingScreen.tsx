import { useEffect } from 'react'
import { SoulBrand } from '@/components/soul'
import '../quiz-waiting.css'
import bgWaiting from '../assets/onboarding/bg-waiting.png'
import markHero from '../assets/onboarding/mark-waiting.svg'
import { SoulGlassOrb } from '../SoulGlassOrb'

const CHECKS = [
  'Reading what you told me',
  'Finding your core patterns',
  'Seeing how they connect',
  'Making sense of it together',
  'Writing it in plain words',
  'Shaping it around what you asked',
] as const

const WAIT_CARDS = [
  {
    title: 'Daily insight',
    body: 'Every morning, a short note on what today asks of you.',
  },
  {
    title: 'Weekly reflection',
    body: 'A quiet space to pause and look back on what mattered this week.',
  },
  {
    title: 'Mindful moment',
    body: 'A gentle reminder to breathe and reconnect with yourself today.',
  },
] as const

/** Figma 1017:4418 cohort — 12s play-once, then a short settle */
const SEQUENCE_MS = 12000
const DONE_MS = 900

interface QuizWaitingScreenProps {
  name?: string
  onDone: () => void
}

/**
 * Figma DEV · 03.1 · Generate · Waiting (1017:4418)
 * Mark/hero steps 180° per checklist item; glass orb video loops in place.
 */
export default function QuizWaitingScreen({ name, onDone }: QuizWaitingScreenProps) {
  const displayName = name?.trim() || 'friend'

  useEffect(() => {
    const t = window.setTimeout(onDone, SEQUENCE_MS + DONE_MS)
    return () => window.clearTimeout(t)
  }, [onDone])

  return (
    <div className="soul-wt" data-name="03.1 · Generate · Waiting">
      <div className="soul-wt__bg" aria-hidden="true">
        <img className="soul-wt__bg-img" src={bgWaiting} alt="" />
        <div className="soul-wt__bg-dim" />
      </div>

      <div className="soul-wt__frame">
        <div className="soul-wt__scrim" aria-hidden="true" />

        <div className="soul-wt__content">
          <header className="soul-wt__header soul-wt-enter soul-wt-enter--header">
            <SoulBrand />
          </header>

          <section className="soul-wt__hero">
            <h1 className="soul-wt__title soul-wt-enter soul-wt-enter--title">
              Building your profile, {displayName}…
            </h1>
          </section>

          <div className="soul-wt__mark-stage" aria-hidden="true">
            <div className="soul-wt__mark-spin">
              <img
                className="soul-wt__mark-rings"
                src={markHero}
                alt=""
                width={176}
                height={176}
              />
            </div>
            <div className="soul-wt__orb-wrap soul-wt-enter soul-wt-enter--orb">
              <SoulGlassOrb className="soul-wt__orb" width={120} height={120} />
            </div>
          </div>

          <ul className="soul-wt__checks" aria-live="polite">
            {CHECKS.map((label, i) => (
              <li key={label} className={`soul-wt__check soul-wt__check--${i + 1}`}>
                <span className="soul-wt__tick" aria-hidden="true">
                  ✓
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <p className="soul-wt__wait-label soul-wt-enter soul-wt-enter--label">While you wait</p>

          <div className="soul-wt__cards">
            {WAIT_CARDS.map((card, i) => (
              <article
                key={card.title}
                className={`soul-wt__card soul-wt__card--${i + 1}`}
              >
                <h2 className="soul-wt__card-title">{card.title}</h2>
                <p className="soul-wt__card-body">{card.body}</p>
              </article>
            ))}
          </div>

          <div
            className="soul-wt__dots soul-wt-enter soul-wt-enter--dots"
            role="tablist"
            aria-label="While you wait"
          >
            {WAIT_CARDS.map((card, i) => (
              <span
                key={card.title}
                role="tab"
                aria-label={card.title}
                className={`soul-wt__dot soul-wt__dot--${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
