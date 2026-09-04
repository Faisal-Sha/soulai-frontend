import { Link } from 'react-router-dom'
import { SoulBrand, SoulButton } from '@/components/soul'
import { SoulLangSwitch, useCopy, type CopyFn } from '@/i18n'
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

const MONTH_KEYS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
] as const

const LOCKED_ROW_IDS = ['triggers', 'boundaries', 'attachment'] as const

const LOCKED_ROWS = [
  'Emotional triggers',
  'Boundary patterns',
  'Attachment style',
] as const

const FREE_CARDS = [
  {
    id: 'who-you-really-are',
    title: 'Who You Really Are',
    meta: '1 / 42',
    body: "You process the world through feeling first and logic second. That isn't a weakness to manage. It's the instrument you read people with. The trouble only starts when you apologise for the signal before you've even read it.",
  },
  {
    id: 'strengths-and-talents',
    title: 'Your strengths and talents',
    meta: '1 / 42',
    body: "You start strong, then quietly retreat the moment things get real. Your profile shows exactly where that exit door sits. And it isn't where you think.",
  },
] as const

const LOCKED_CARDS = [
  {
    id: 'blind-spots',
    title: 'Your blind spots and blocks',
    body: 'You were never built to pick one thing and stay there. What everyone reads as restlessness is actually the shape of how you learn. And your chart names the exact conditions under which you finally settle, which is not the ones you keep trying to force.',
  },
  {
    id: 'money',
    title: 'Your money',
    body: "You hand people the version of yourself that's easiest to love. It works. Right up until the moment you need something back, and discover you've trained them not to ask. Your chart shows where that habit began.",
  },
  {
    id: 'purpose',
    title: 'Your purpose and direction',
    body: "You earn in bursts, then cap yourself the moment things feel stable. Your block isn't money. It's what staying in one place would mean about you, and your chart is unusually direct about where that fear was formed.",
  },
  {
    id: 'relationships',
    title: 'Your relationships',
    body: "The next nine months ask you to finish something you abandoned around your late twenties. There's a specific window where it becomes far easier than it has been, and it is closer than you'd expect.",
  },
  {
    id: 'energy',
    title: 'Your energy and resources',
    body: "The next nine months ask you to finish something you abandoned around your late twenties. There's a specific window where it becomes far easier than it has been, and it is closer than you'd expect.",
  },
  {
    id: 'family',
    title: 'Your family and roots',
    body: "The next nine months ask you to finish something you abandoned around your late twenties. There's a specific window where it becomes far easier than it has been, and it is closer than you'd expect.",
  },
  {
    id: 'next-step',
    title: 'Your next step',
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
 * Figma DEV · 04.1 · Result · Free (node 1189:3486)
 */
export default function QuizResultFreeScreen({
  answers,
  onUnlock,
  onSave,
}: QuizResultFreeScreenProps) {
  const t = useCopy()
  const name = answers.name?.trim() || t('quiz.result.friend', 'friend')
  const place =
    typeof answers['birth-place'] === 'string' ? answers['birth-place'].trim() : ''
  const birthLabel = formatBirthdate(answers.birthdate, t)
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
            <SoulLangSwitch />
          </header>

          <section className="soul-rs__hero">
            <div className="soul-rs__hero-top">
              {meta ? <p className="soul-rs__meta">{meta}</p> : null}
              <h1 className="soul-rs__title">
                {t('quiz.result.title', `${name}, your profile is ready!`, { name })}
              </h1>
            </div>
            <p className="soul-rs__subtitle">
              {t('quiz.result.subtitle', 'In our main readings we use 9 chapters')}
            </p>
          </section>

          <div className="soul-rs__cards">
            {FREE_CARDS.map((card) => (
              <article key={card.id} className="soul-rs__card soul-rs__card--free">
                <div className="soul-rs__card-head">
                  <div className="soul-rs__card-title-row">
                    <SphereBullet />
                    <h2 className="soul-rs__card-title">
                      {t(`quiz.result.freeCards.${card.id}.title`, card.title)}
                    </h2>
                  </div>
                  <span className="soul-rs__card-meta">{card.meta}</span>
                </div>
                <hr className="soul-rs__card-rule" />
                <p className="soul-rs__card-body">
                  {t(`quiz.result.freeCards.${card.id}.body`, card.body)}
                </p>
                <ul className="soul-rs__locked-list">
                  {LOCKED_ROWS.map((label, i) => (
                    <li key={label} className="soul-rs__locked-row">
                      <span className="soul-rs__lock" aria-hidden="true">
                        🔒
                      </span>
                      <span>{t(`quiz.result.lockedRows.${LOCKED_ROW_IDS[i]}`, label)}</span>
                    </li>
                  ))}
                  <li className="soul-rs__locked-more">
                    {t('quiz.result.lockedMore', '+ 5 more in this section')}
                  </li>
                </ul>
                <SoulButton
                  block
                  showArrow
                  className="soul-rs__words-cta"
                  onClick={onUnlock}
                  aria-label={t('quiz.result.wordsUnlocked', '134 of 1580 words unlocked', {
                    words: 134,
                    total: 1580,
                  })}
                >
                  {t('quiz.result.wordsUnlocked', '134 of 1580 words unlocked', {
                    words: 134,
                    total: 1580,
                  })}
                </SoulButton>
              </article>
            ))}

            {LOCKED_CARDS.map((card) => (
              <article key={card.id} className="soul-rs__card soul-rs__card--locked">
                <div className="soul-rs__card-title-row">
                  <SphereBullet />
                  <h2 className="soul-rs__card-title">
                    {t(`quiz.result.lockedCards.${card.id}.title`, card.title)}
                  </h2>
                </div>
                <hr className="soul-rs__card-rule" />
                <div className="soul-rs__locked-copy">
                  <p className="soul-rs__card-body soul-rs__card-body--clear">
                    {t(`quiz.result.lockedCards.${card.id}.body`, card.body)}
                  </p>
                  <p className="soul-rs__card-body soul-rs__card-body--soft" aria-hidden="true">
                    {t(`quiz.result.lockedCards.${card.id}.body`, card.body)}
                  </p>
                  <p className="soul-rs__card-body soul-rs__card-body--heavy" aria-hidden="true">
                    {t(`quiz.result.lockedCards.${card.id}.body`, card.body)}
                  </p>
                </div>
                <button
                  type="button"
                  className="soul-rs__unlock-pill"
                  onClick={onUnlock}
                >
                  {t('quiz.result.unlock', 'Unlock')}
                </button>
              </article>
            ))}
          </div>

          <section className="soul-rs__paywall">
            <h2 className="soul-rs__paywall-title">
              {t(
                'quiz.result.paywallTitle',
                "We've barely started. There's so much more of you I want to show you!",
              )}
            </h2>
            <p className="soul-rs__paywall-body">
              {t(
                'quiz.result.paywallBody',
                "Nine chapters about you, your life, and your best next move. Ask me anything from them. I'll show you exactly what you need. Every morning, a short note about your day. And that's before compatibility and everything else.",
              )}
            </p>
            <ul className="soul-rs__checklist">
              {CHECKLIST.map((item, i) => (
                <li key={item} className="soul-rs__check">
                  <span className="soul-rs__tick" aria-hidden="true">
                    ✓
                  </span>
                  <span>{t(`quiz.result.checklist.${i + 1}`, item)}</span>
                </li>
              ))}
            </ul>
            <div className="soul-rs__paywall-cta">
              <SoulButton
                block
                onClick={onUnlock}
                aria-label={t('quiz.result.unlockEverything', 'Unlock everything')}
              >
                {t('quiz.result.unlockEverything', 'Unlock everything')}
              </SoulButton>
            </div>
          </section>

          <footer className="soul-rs__footer">
            <button type="button" className="soul-rs__save" onClick={onSave}>
              {t('quiz.result.saveProfile', 'Save my profile')}
            </button>
            <p className="soul-rs__legal">
              <Link to="/terms" target="_blank" rel="noopener noreferrer">
                {t('quiz.result.terms', 'Terms')}
              </Link>
              {' & '}
              <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                {t('quiz.result.privacy', 'Privacy Policy')}
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
  t: CopyFn,
): string {
  if (!birthdate?.month || !birthdate?.day || !birthdate?.year) return ''
  const monthIdx = parseInt(birthdate.month, 10) - 1
  const month = MONTHS[monthIdx]
  const monthKey = MONTH_KEYS[monthIdx]
  if (!month || !monthKey) return ''
  const day = parseInt(birthdate.day, 10)
  if (!Number.isFinite(day)) return ''
  return `${t(`common.months.${monthKey}`, month)} ${day}, ${birthdate.year}`
}
