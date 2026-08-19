import { Link } from 'react-router-dom'
import { SoulBrand, SoulButton } from '@/components/soul'
import type { QuizAnswers } from '../types'
import '../quiz-result-free.css'
import bgResult from '../assets/onboarding/bg-result.png'
import glassBead from '../assets/onboarding/glass-bead.svg'
import sheen from '../assets/onboarding/sheen.svg'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

const LOCKED_ROWS = [
  'Emotional triggers',
  'Boundary patterns',
  'Attachment style',
] as const

const FREE_CARDS = [
  {
    id: 'core-self',
    title: 'Core Self',
    meta: '1 / 42',
    body: "You process the world through feeling first and logic second. That isn't a weakness to manage — it's the instrument you read people with. The trouble only starts when you apologise for the signal before you've even read it.",
  },
  {
    id: 'your-pattern',
    title: 'Your Pattern',
    meta: '1 / 42',
    body: "You start strong, then quietly retreat the moment things get real. Your profile shows exactly where that exit door sits — and it isn't where you think.",
  },
] as const

const LOCKED_CARDS = [
  {
    id: 'purpose',
    title: 'Purpose',
    body: 'You were never built to pick one thing and stay there. What everyone reads as restlessness is actually the shape of how you learn — and your chart names the exact conditions under which you finally settle, which is not the ones you keep trying to force.',
  },
  {
    id: 'relationships',
    title: 'Relationships',
    body: "You hand people the version of yourself that's easiest to love. It works — right up until the moment you need something back, and discover you've trained them not to ask. Your chart shows where that habit began.",
  },
  {
    id: 'money',
    title: 'Money',
    body: "You earn in bursts, then cap yourself the moment things feel stable. Your block isn't money — it's what staying in one place would mean about you, and your chart is unusually direct about where that fear was formed.",
  },
  {
    id: 'year-ahead',
    title: 'Year Ahead',
    body: "The next nine months ask you to finish something you abandoned around your late twenties. There's a specific window where it becomes far easier than it has been, and it is closer than you'd expect.",
  },
] as const

const CHECKLIST = [
  'Your full profile, line by line',
  'Relationships and who fits you',
  'Money and career path',
  'Purpose and life direction',
  'Your year ahead',
  'Saved forever',
] as const

interface QuizResultFreeScreenProps {
  answers: QuizAnswers
  onUnlock: () => void
  onSave?: () => void
}

/**
 * Figma DEV · 04.1 · Result · Free (node 437:3106)
 */
export default function QuizResultFreeScreen({
  answers,
  onUnlock,
  onSave,
}: QuizResultFreeScreenProps) {
  const name = answers.name?.trim() || 'friend'
  const place =
    typeof answers['birth-place'] === 'string' ? answers['birth-place'].trim() : ''
  const birthLabel = formatBirthdate(answers.birthdate)
  const meta = [place, birthLabel].filter(Boolean).join(' · ')

  return (
    <div className="soul-rs" data-name="04.1 · Result · Free">
      <div className="soul-rs__bg" aria-hidden="true">
        <img className="soul-rs__bg-img" src={bgResult} alt="" />
        <div className="soul-rs__bg-dim" />
      </div>

      <div className="soul-rs__frame">
        <div className="soul-rs__scrim" aria-hidden="true" />

        <div className="soul-rs__content">
          <header className="soul-rs__header">
            <SoulBrand />
          </header>

          <section className="soul-rs__hero">
            <div className="soul-rs__hero-top">
              {meta ? <p className="soul-rs__meta">{meta}</p> : null}
              <h1 className="soul-rs__title">{name}, your profile is ready!</h1>
            </div>
            <p className="soul-rs__subtitle">
              Written for you — and shaped by what&apos;s on your mind.
            </p>
          </section>

          <div className="soul-rs__cards">
            {FREE_CARDS.map((card) => (
              <article key={card.id} className="soul-rs__card soul-rs__card--free">
                <div className="soul-rs__card-head">
                  <div className="soul-rs__card-title-row">
                    <SphereBullet />
                    <h2 className="soul-rs__card-title">{card.title}</h2>
                  </div>
                  <span className="soul-rs__card-meta">{card.meta}</span>
                </div>
                <hr className="soul-rs__card-rule" />
                <p className="soul-rs__card-body">{card.body}</p>
                <ul className="soul-rs__locked-list">
                  {LOCKED_ROWS.map((label) => (
                    <li key={label} className="soul-rs__locked-row">
                      <span className="soul-rs__lock" aria-hidden="true">
                        🔒
                      </span>
                      <span>{label}</span>
                    </li>
                  ))}
                  <li className="soul-rs__locked-more">+ 5 more in this section</li>
                </ul>
                <SoulButton
                  block
                  showArrow
                  className="soul-rs__words-cta"
                  onClick={onUnlock}
                  aria-label="1,240 of 18,000 words unlocked"
                >
                  1,240 of 18,000 words unlocked
                </SoulButton>
              </article>
            ))}

            {LOCKED_CARDS.map((card) => (
              <article key={card.id} className="soul-rs__card soul-rs__card--locked">
                <div className="soul-rs__card-title-row">
                  <SphereBullet />
                  <h2 className="soul-rs__card-title">{card.title}</h2>
                </div>
                <hr className="soul-rs__card-rule" />
                <div className="soul-rs__locked-copy">
                  <p className="soul-rs__card-body soul-rs__card-body--clear">{card.body}</p>
                  <p className="soul-rs__card-body soul-rs__card-body--soft" aria-hidden="true">
                    {card.body}
                  </p>
                  <p className="soul-rs__card-body soul-rs__card-body--heavy" aria-hidden="true">
                    {card.body}
                  </p>
                </div>
                <button
                  type="button"
                  className="soul-rs__unlock-pill"
                  onClick={onUnlock}
                >
                  Unlock
                </button>
              </article>
            ))}
          </div>

          <section className="soul-rs__paywall">
            <h2 className="soul-rs__paywall-title">
              We&apos;ve barely started. There&apos;s so much more of you I want to show
              you!
            </h2>
            <p className="soul-rs__paywall-body">
              Nine chapters about you, your life, and your best next move. Ask me
              anything from them — I&apos;ll show you exactly what you need. Every
              morning, a short note about your day. And that&apos;s before
              compatibility and everything else.
            </p>
            <ul className="soul-rs__checklist">
              {CHECKLIST.map((item) => (
                <li key={item} className="soul-rs__check">
                  <span className="soul-rs__tick" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="soul-rs__paywall-cta">
              <SoulButton block onClick={onUnlock} aria-label="Unlock everything — $0.99">
                Unlock everything — $0.99
              </SoulButton>
              <p className="soul-rs__paywall-sub">
                $0.99 for 7 days, then $6.99/month · Cancel anytime
              </p>
            </div>
          </section>

          <footer className="soul-rs__footer">
            <button type="button" className="soul-rs__save" onClick={onSave}>
              Save my profile
            </button>
            <p className="soul-rs__legal">
              <Link to="/terms" target="_blank" rel="noopener noreferrer">
                Terms
              </Link>
              {' & '}
              <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}

function SphereBullet() {
  return (
    <div className="soul-rs__bead" aria-hidden="true">
      <img className="soul-rs__bead-img" src={glassBead} alt="" />
      <div className="soul-rs__bead-sheen">
        <img src={sheen} alt="" />
      </div>
    </div>
  )
}

function formatBirthdate(
  birthdate: QuizAnswers['birthdate'],
): string {
  if (!birthdate?.month || !birthdate?.day || !birthdate?.year) return ''
  const monthIdx = parseInt(birthdate.month, 10) - 1
  const month = MONTHS[monthIdx]
  if (!month) return ''
  const day = parseInt(birthdate.day, 10)
  if (!Number.isFinite(day)) return ''
  return `${month} ${day}, ${birthdate.year}`
}
