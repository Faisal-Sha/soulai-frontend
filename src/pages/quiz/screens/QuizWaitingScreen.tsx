import { useEffect, useState } from 'react'
import { SoulBrand } from '@/components/soul'
import '../quiz-waiting.css'
import bgWaiting from '../assets/onboarding/bg-waiting.png'
import markHero from '../assets/onboarding/mark-waiting.svg'
import glassOrb from '../assets/onboarding/glass-orb.png'

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
    title: 'A reading of your day',
    body: 'Every morning, a short note on what today asks of you.',
  },
  {
    title: 'Pattern check-ins',
    body: 'Gentle nudges when old loops show up — so you can choose differently.',
  },
] as const

const STEP_MS = 1400
const CARD_MS = 3200

interface QuizWaitingScreenProps {
  name?: string
  onDone: () => void
}

/**
 * Figma DEV · 03.1 · Generate · Waiting (node 437:3056)
 * Center graphic: Mark / hero rings (176) + magnific glass orb (120).
 */
export default function QuizWaitingScreen({ name, onDone }: QuizWaitingScreenProps) {
  const [doneCount, setDoneCount] = useState(1)
  const [cardIdx, setCardIdx] = useState(1)
  const displayName = name?.trim() || 'friend'

  useEffect(() => {
    if (doneCount >= CHECKS.length) {
      const t = window.setTimeout(onDone, 900)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setDoneCount((n) => n + 1), STEP_MS)
    return () => window.clearTimeout(t)
  }, [doneCount, onDone])

  useEffect(() => {
    const t = window.setInterval(() => {
      setCardIdx((i) => (i + 1) % WAIT_CARDS.length)
    }, CARD_MS)
    return () => window.clearInterval(t)
  }, [])

  const front = WAIT_CARDS[cardIdx]
  const back = WAIT_CARDS[(cardIdx + 1) % WAIT_CARDS.length]

  return (
    <div className="soul-wt" data-name="03.1 · Generate · Waiting">
      <div className="soul-wt__bg" aria-hidden="true">
        <img className="soul-wt__bg-img" src={bgWaiting} alt="" />
        <div className="soul-wt__bg-dim" />
      </div>

      <div className="soul-wt__frame">
        <div className="soul-wt__scrim" aria-hidden="true" />

        <div className="soul-wt__content">
          <header className="soul-wt__header">
            <SoulBrand />
          </header>

          <section className="soul-wt__hero">
            <h1 className="soul-wt__title">Building your profile, {displayName}…</h1>
          </section>

          {/* Mark / hero + magnific glass orb (Figma 437:3069 / 437:3072) */}
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
            <div className="soul-wt__orb-wrap">
              <img
                className="soul-wt__orb"
                src={glassOrb}
                alt=""
                width={120}
                height={120}
              />
            </div>
          </div>

          <ul className="soul-wt__checks">
            {CHECKS.map((label, i) => {
              const active = i < doneCount
              return (
                <li
                  key={label}
                  className={`soul-wt__check${active ? ' soul-wt__check--on' : ''}`}
                >
                  <span className="soul-wt__tick" aria-hidden="true">
                    ✓
                  </span>
                  <span>{label}</span>
                </li>
              )
            })}
          </ul>

          <p className="soul-wt__wait-label">While you wait</p>

          <div className="soul-wt__cards">
            <article className="soul-wt__card soul-wt__card--back" aria-hidden="true">
              <h2 className="soul-wt__card-title">{back.title}</h2>
              <p className="soul-wt__card-body">{back.body}</p>
            </article>
            <article className="soul-wt__card soul-wt__card--front" key={front.title}>
              <h2 className="soul-wt__card-title">{front.title}</h2>
              <p className="soul-wt__card-body">{front.body}</p>
            </article>
          </div>

          <div className="soul-wt__dots" role="tablist" aria-label="While you wait">
            {WAIT_CARDS.map((card, i) => (
              <button
                key={card.title}
                type="button"
                role="tab"
                aria-selected={i === cardIdx}
                aria-label={card.title}
                className={`soul-wt__dot${i === cardIdx ? ' soul-wt__dot--active' : ''}`}
                onClick={() => setCardIdx(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
