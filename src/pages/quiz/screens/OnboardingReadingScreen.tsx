import { useCallback, useRef, useState, type TouchEvent } from 'react'
import { SoulBrand, SoulButton } from '@/components/soul'
import '../onboarding-reading.css'
import bgReading from '../assets/onboarding/bg-reading.png'
import glassBead from '../assets/onboarding/glass-bead.svg'
import sheen from '../assets/onboarding/sheen.svg'

interface OnboardingReadingScreenProps {
  onStart: () => void
}

const CARDS = [
  {
    id: 'money',
    label: 'Money',
    body: "You earn in bursts, then cap yourself the moment things feel stable. Your block isn't money — it's committing to one path.",
    meta: "Maya's reading · 34",
  },
  {
    id: 'relationships',
    label: 'Relationships',
    body: 'Love grows where understanding and communication never stop.',
    meta: "Maya's reading · 34",
  },
] as const

/**
 * Figma DEV · 01.1 · Onboarding · Reading
 * Dots / swipe flip Money ↔ Relationships insight cards.
 */
export default function OnboardingReadingScreen({ onStart }: OnboardingReadingScreenProps) {
  const [active, setActive] = useState(0)
  const touchX = useRef<number | null>(null)
  const front = CARDS[active]
  const back = CARDS[active === 0 ? 1 : 0]

  const goTo = useCallback((index: number) => {
    setActive(((index % CARDS.length) + CARDS.length) % CARDS.length)
  }, [])

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current
    touchX.current = null
    if (Math.abs(dx) < 48) return
    if (dx < 0) goTo(active + 1)
    else goTo(active - 1)
  }

  return (
    <div
      className="soul-ob"
      data-name="01.1 · Onboarding · Reading"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="soul-ob__bg soul-ob__bg--active" aria-hidden="true">
        <img className="soul-ob__bg-img" src={bgReading} alt="" />
        <div className="soul-ob__bg-dim" />
      </div>

      <div className="soul-ob__frame">
        <div className="soul-ob__scrim" aria-hidden="true" />

        <div className="soul-ob__content">
          <header className="soul-ob__header">
            <SoulBrand />
          </header>

          <div className="soul-ob__main">
            <section className="soul-ob__hero">
              <h1 className="soul-ob__title">
                The better you know yourself, the further you go.
              </h1>
              <p className="soul-ob__subtitle">
                I&apos;m your AI Mentor. Together we&apos;ll find what makes you you — your
                strengths, your blocks — and turn it into real steps for your life, your
                relationships, your goals.
              </p>
            </section>

            <div className="soul-ob__stage">
              <div className="soul-ob__stack">
                <article
                  className="soul-ob__card soul-ob__card--back"
                  aria-hidden="true"
                  key={`back-${back.id}`}
                >
                  <div className="soul-ob__card-head">
                    <SphereBullet />
                    <p className="soul-ob__card-label">{back.label}</p>
                  </div>
                  <div className="soul-ob__card-gap" />
                  <hr className="soul-ob__card-rule" />
                  <p className="soul-ob__card-body">{back.body}</p>
                </article>

                <article
                  className="soul-ob__card soul-ob__card--front"
                  key={`front-${front.id}`}
                  onClick={() => goTo(active + 1)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${front.label} insight. Tap or swipe for next.`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      goTo(active + 1)
                    }
                  }}
                >
                  <div className="soul-ob__card-head">
                    <SphereBullet />
                    <p className="soul-ob__card-label">{front.label}</p>
                  </div>
                  <hr className="soul-ob__card-rule" />
                  <p className="soul-ob__card-body">{front.body}</p>
                  <p className="soul-ob__card-meta">{front.meta}</p>
                </article>
              </div>
            </div>

            <div className="soul-ob__footer">
              <div className="soul-ob__dots-wrap" role="tablist" aria-label="Insight cards">
                {CARDS.map((card, i) => (
                  <button
                    key={card.id}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={card.label}
                    className={`soul-ob__dot${i === active ? ' soul-ob__dot--active' : ''}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>

              <div className="soul-ob__cta">
                <SoulButton block onClick={onStart} aria-label="Let's go">
                  Let&apos;s go
                </SoulButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SphereBullet() {
  return (
    <div className="soul-ob__bead">
      <img className="soul-ob__bead-img" src={glassBead} alt="" />
      <div className="soul-ob__bead-sheen">
        <img src={sheen} alt="" />
      </div>
    </div>
  )
}
