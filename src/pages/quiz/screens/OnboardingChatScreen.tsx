import { useRef, type TouchEvent } from 'react'
import { SoulBrand, SoulButton } from '@/components/soul'
import { SoulLangSwitch, useCopy } from '@/i18n'
import '../onboarding-reading.css'
import bgChat from '../assets/onboarding/bg-chat.png'

interface OnboardingChatScreenProps {
  onStart: () => void
  onBack: () => void
}

/**
 * Figma DEV · 01.2 · Onboarding · Chat (node 437:3029)
 * Mobile 390×844. 1:1 from design.
 */
export default function OnboardingChatScreen({ onStart, onBack }: OnboardingChatScreenProps) {
  const t = useCopy()
  const touchX = useRef<number | null>(null)

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current
    touchX.current = null
    if (dx > 48) onBack()
  }

  return (
    <div
      className="soul-ob soul-ob--chat"
      data-name="01.2 · Onboarding · Chat"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="soul-ob__bg soul-ob__bg--active" aria-hidden="true">
        <img className="soul-ob__bg-img" src={bgChat} alt="" />
        <div className="soul-ob__bg-dim" />
      </div>

      <div className="soul-ob__frame">
        <div className="soul-ob__scrim" aria-hidden="true" />

        <div className="soul-ob__content">
          <header className="soul-ob__header soul-ob-chat__enter soul-ob-chat__enter--header">
            <SoulBrand />
            <SoulLangSwitch />
          </header>

          <div className="soul-ob__main">
            <section className="soul-ob__hero">
              <h1 className="soul-ob__title soul-ob-chat__enter soul-ob-chat__enter--title">
                {t('quiz.onboarding.chat.title', 'Looking for the right move for you? Ask me!')}
              </h1>
              <p className="soul-ob__subtitle soul-ob-chat__enter soul-ob-chat__enter--subtitle">
                {t(
                  'quiz.onboarding.chat.subtitle',
                  "My advice comes only from your patterns and your profile. Nothing generic. I'll show you the options; the choice is always yours.",
                )}
              </p>
            </section>

            <div className="soul-ob__stage soul-ob-chat__stage">
              <div className="soul-ob-chat__thread">
                <div className="soul-ob-chat__row soul-ob-chat__row--user">
                  <div className="soul-ob-chat__bubble soul-ob-chat__bubble--user soul-ob-chat__enter soul-ob-chat__enter--user1">
                    {t('quiz.onboarding.chat.user1', 'Why do I always fall for the wrong people?')}
                  </div>
                </div>

                <div className="soul-ob-chat__row soul-ob-chat__row--mentor">
                  <div className="soul-ob-chat__bubble soul-ob-chat__bubble--mentor soul-ob-chat__enter soul-ob-chat__enter--mentor">
                    <p>
                      {t(
                        'quiz.onboarding.chat.mentor1',
                        'Because being needed feels safer to you than being chosen. So you pick people you can rescue, and call it love, Jane.',
                      )}
                    </p>
                    <p>
                      {t(
                        'quiz.onboarding.chat.mentor2',
                        "Notice it: the same pattern shows up in every relationship you've had. Want to see where it starts?",
                      )}
                    </p>
                  </div>
                  <p className="soul-ob-chat__mentor-label soul-ob-chat__enter soul-ob-chat__enter--label">
                    {t('quiz.onboarding.chat.mentorLabel', 'Your mentor')}
                  </p>
                </div>

                <div className="soul-ob-chat__row soul-ob-chat__row--user">
                  <div className="soul-ob-chat__bubble soul-ob-chat__bubble--user soul-ob-chat__enter soul-ob-chat__enter--user2">
                    {t('quiz.onboarding.chat.user2', "Wait. You actually caught that? Okay, let's get into it.")}
                  </div>
                </div>
              </div>
            </div>

            <div className="soul-ob__footer">
              <div
                className="soul-ob__dots-wrap soul-ob-chat__enter soul-ob-chat__enter--dots"
                role="tablist"
                aria-label={t('quiz.onboarding.chat.slidesAria', 'Onboarding slides')}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={false}
                  aria-label={t('quiz.onboarding.chat.readingDot', 'Reading')}
                  className="soul-ob__dot"
                  onClick={onBack}
                />
                <button
                  type="button"
                  role="tab"
                  aria-selected={true}
                  aria-label={t('quiz.onboarding.chat.chatDot', 'Chat')}
                  className="soul-ob__dot soul-ob__dot--active"
                />
              </div>

              <div className="soul-ob__cta soul-ob-chat__enter soul-ob-chat__enter--cta">
                <SoulButton
                  block
                  onClick={onStart}
                  aria-label={t('quiz.onboarding.chat.cta', 'Start my reading')}
                >
                  {t('quiz.onboarding.chat.cta', 'Start my reading')}
                </SoulButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
