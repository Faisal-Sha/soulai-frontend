import { SoulBrand, SoulButton, SoulProgress } from '@/components/soul'
import { SoulLangSwitch, useCopy } from '@/i18n'
import '../quiz-reinforce.css'
import bgReinforce from '../assets/onboarding/bg-reinforce.png'
import starFill from '../assets/onboarding/icon-star-reinforce.svg'
import { SoulGlassOrb } from '../SoulGlassOrb'
import type { QuizAnswers } from '../types'

interface QuizReinforceScreenProps {
  answers: QuizAnswers
  onNext: () => void
}

/**
 * Figma DEV · 02.1.1 · Quiz · Reinforcement (node 437:2781)
 * Mobile: stacked. Desktop: split. Orb between copy paras, card up on the right.
 */
export default function QuizReinforceScreen({ onNext }: QuizReinforceScreenProps) {
  const t = useCopy()
  return (
    <div className="soul-rf" data-name="02.1.1 · Quiz · Reinforcement">
      <div className="soul-rf__bg" aria-hidden="true">
        <img className="soul-rf__bg-img" src={bgReinforce} alt="" />
        <div className="soul-rf__bg-dim" />
      </div>

      <div className="soul-rf__frame">
        <div className="soul-rf__scrim" aria-hidden="true" />

        <div className="soul-rf__content">
          <header className="soul-rf__header">
            <SoulBrand />
            <SoulLangSwitch />
          </header>

          <div className="soul-rf__progress-wrap">
            <SoulProgress step={1} total={6} />
          </div>

          <div className="soul-rf__left">
            <section className="soul-rf__hero">
              <h1 className="soul-rf__title">{t('quiz.reinforce.title', 'Awesome!')}</h1>
              <p className="soul-rf__subtitle">
                {t(
                  'quiz.reinforce.subtitle',
                  'Those who seek Ambition in their soulmate are drawn to partners who match their fire. Building something real, side by side.',
                )}
              </p>
            </section>

            <div className="soul-rf__orb-wrap" aria-hidden="true">
              <SoulGlassOrb className="soul-rf__orb" width={126} height={126} />
            </div>

            <p className="soul-rf__proof-copy">
              {t(
                'quiz.reinforce.proof',
                "14,248 people came in with the same things on their mind. Love & relationships, Purpose. Here's what they say after.",
              )}
            </p>

            <div className="soul-rf__cta soul-rf__cta--desktop">
              <SoulButton block onClick={onNext} aria-label={t('quiz.reinforce.continue', 'Continue')}>
                {t('quiz.reinforce.continue', 'Continue')}
              </SoulButton>
            </div>
          </div>

          <div className="soul-rf__stage">
            <article className="soul-rf__card">
              <div className="soul-rf__stars" aria-label={t('quiz.reinforce.starsAria', '5 out of 5 stars')}>
                {Array.from({ length: 5 }, (_, i) => (
                  <img key={i} className="soul-rf__star" src={starFill} alt="" width={14} height={14} />
                ))}
              </div>
              <p className="soul-rf__quote">
                {t(
                  'quiz.reinforce.quote',
                  "SoulPlus didn't just help me understand who I am - it gave me a real plan and helped me finally reach a goal I'd been putting off for years.",
                )}
              </p>
              <p className="soul-rf__author">{t('quiz.reinforce.author', 'Alena R. · October 2025')}</p>
            </article>
          </div>

          <div className="soul-rf__cta soul-rf__cta--mobile">
            <SoulButton block onClick={onNext} aria-label={t('quiz.reinforce.continue', 'Continue')}>
              {t('quiz.reinforce.continue', 'Continue')}
            </SoulButton>
          </div>
        </div>
      </div>
    </div>
  )
}
