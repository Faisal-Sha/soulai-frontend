import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react'
import { SoulBrand, SoulButton } from '@/components/soul'
import { SoulLangSwitch, useCopy } from '@/i18n'
import '../onboarding-reading.css'
import bgReading from '../assets/onboarding/bg-reading.png'
import glassBead from '../assets/onboarding/glass-bead.svg'
import sheen from '../assets/onboarding/sheen.svg'

/** Figma 1017:4476. Next card starts 350ms after exit begins (not after it finishes). */
const FIRST_ENTER_DELAY_MS = 800
const ENTER_MS = 500
const HOLD_MS = 1800
const EXIT_LEAD_MS = 350

type CardPhase = 'enter-first' | 'enter' | 'hold' | 'exit'

interface OnboardingReadingScreenProps {
  onStart: () => void
}

const CARDS = [
  {
    id: 'money',
    label: 'Money',
    body: "You earn in bursts, then cap yourself the moment things feel stable. Your block isn't money. It's committing to one path.",
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
  const t = useCopy()
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState<CardPhase>('enter-first')
  const touchX = useRef<number | null>(null)
  const pending = useRef<number | null>(null)
  const activeRef = useRef(active)
  activeRef.current = active
  const reduceMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const front = CARDS[active]
  const frontLabel = t(`quiz.onboarding.cards.${front.id}.label`, front.label)
  const frontBody = t(`quiz.onboarding.cards.${front.id}.body`, front.body)
  const frontMeta = t(`quiz.onboarding.cards.${front.id}.meta`, front.meta)

  useEffect(() => {
    if (reduceMotion.current) {
      setPhase('hold')
      return
    }
    const wait =
      phase === 'enter-first'
        ? FIRST_ENTER_DELAY_MS + ENTER_MS
        : phase === 'enter'
          ? ENTER_MS
          : phase === 'hold'
            ? HOLD_MS
            : EXIT_LEAD_MS
    const timer = window.setTimeout(() => {
      if (phase === 'enter-first' || phase === 'enter') setPhase('hold')
      else if (phase === 'hold') setPhase('exit')
      else {
        const next = pending.current ?? (activeRef.current + 1) % CARDS.length
        pending.current = null
        setActive(next)
        setPhase('enter')
      }
    }, wait)
    return () => window.clearTimeout(timer)
  }, [phase])

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % CARDS.length) + CARDS.length) % CARDS.length
      if (next === active) return
      pending.current = next
      if (reduceMotion.current) {
        pending.current = null
        setActive(next)
        setPhase('hold')
        return
      }
      if (phase !== 'hold') return
      setPhase('exit')
    },
    [active, phase],
  )

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
          <header className="soul-ob__header soul-ob__enter soul-ob__enter--header">
            <SoulBrand />
            <SoulLangSwitch />
          </header>

          <div className="soul-ob__main">
            <section className="soul-ob__hero">
              <h1 className="soul-ob__title soul-ob__enter soul-ob__enter--title">
                {t('quiz.onboarding.reading.title', 'The better you know yourself, the further you go')}
              </h1>
              <p className="soul-ob__subtitle soul-ob__enter soul-ob__enter--subtitle">
                {t(
                  'quiz.onboarding.reading.subtitle',
                  "I'm your AI Mentor. Together we'll find what makes you you: your strengths, your blocks, and turn it into real steps for your life, your relationships, your goals.",
                )}
              </p>
            </section>

            <div className="soul-ob__stage">
              <div className="soul-ob__stack">
                <article
                  className={`soul-ob__card soul-ob__card--front soul-ob__card--${phase}`}
                  key={`front-${front.id}`}
                  onClick={() => goTo(active + 1)}
                  role="button"
                  tabIndex={0}
                  aria-label={t(
                    'quiz.onboarding.reading.cardAria',
                    `${frontLabel} insight. Tap or swipe for next.`,
                    { label: frontLabel },
                  )}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      goTo(active + 1)
                    }
                  }}
                >
                  <div className="soul-ob__card-head">
                    <SphereBullet />
                    <p className="soul-ob__card-label">{frontLabel}</p>
                  </div>
                  <hr className="soul-ob__card-rule" />
                  <p className="soul-ob__card-body">{frontBody}</p>
                  <p className="soul-ob__card-meta">{frontMeta}</p>
                </article>
              </div>
            </div>

            <div className="soul-ob__footer">
              <div
                className="soul-ob__dots-wrap soul-ob__enter soul-ob__enter--dots"
                role="tablist"
                aria-label={t('quiz.onboarding.reading.cardsAria', 'Insight cards')}
              >
                {CARDS.map((card, i) => (
                  <button
                    key={card.id}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={t(`quiz.onboarding.cards.${card.id}.label`, card.label)}
                    className={`soul-ob__dot${i === active ? ' soul-ob__dot--active' : ''}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>

              <div className="soul-ob__cta soul-ob__enter soul-ob__enter--cta">
                <SoulButton block onClick={onStart} aria-label={t('quiz.onboarding.reading.cta', "Let's go")}>
                  {t('quiz.onboarding.reading.cta', "Let's go")}
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
