import { useRef, type TouchEvent } from 'react'
import { SoulBrand, SoulButton } from '@/components/soul'
import '../onboarding-reading.css'
import bgChat from '../assets/onboarding/bg-chat.png'

interface OnboardingChatScreenProps {
  onStart: () => void
  onBack: () => void
}

/**
 * Figma DEV · 01.2 · Onboarding · Chat (node 437:3029)
 * Mobile 390×844 — 1:1 from design.
 */
export default function OnboardingChatScreen({ onStart, onBack }: OnboardingChatScreenProps) {
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
          <header className="soul-ob__header">
            <SoulBrand />
          </header>

          <div className="soul-ob__main">
            <section className="soul-ob__hero">
              <h1 className="soul-ob__title">Looking for the right move for you? Ask me!</h1>
              <p className="soul-ob__subtitle">
                My advice comes only from your patterns and your profile — nothing generic.
                I&apos;ll show you the options; the choice is always yours.
              </p>
            </section>

            <div className="soul-ob__stage soul-ob-chat__stage">
              <div className="soul-ob-chat__thread">
                <div className="soul-ob-chat__row soul-ob-chat__row--user">
                  <div className="soul-ob-chat__bubble soul-ob-chat__bubble--user">
                    Why do I always fall for the wrong people?
                  </div>
                </div>

                <div className="soul-ob-chat__row soul-ob-chat__row--mentor">
                  <div className="soul-ob-chat__bubble soul-ob-chat__bubble--mentor">
                    <p>
                      Because being needed feels safer to you than being chosen — so you pick
                      people you can rescue, and call it love, Jane.
                    </p>
                    <p>
                      Notice it: the same pattern shows up in every relationship you&apos;ve had.
                      Want to see where it starts?
                    </p>
                  </div>
                  <p className="soul-ob-chat__mentor-label">Your mentor</p>
                </div>

                <div className="soul-ob-chat__row soul-ob-chat__row--user">
                  <div className="soul-ob-chat__bubble soul-ob-chat__bubble--user">
                    Wait — you actually caught that? Okay, let&apos;s get into it.
                  </div>
                </div>
              </div>
            </div>

            <div className="soul-ob__footer">
              <div className="soul-ob__dots-wrap" role="tablist" aria-label="Onboarding slides">
                <button
                  type="button"
                  role="tab"
                  aria-selected={false}
                  aria-label="Reading"
                  className="soul-ob__dot"
                  onClick={onBack}
                />
                <button
                  type="button"
                  role="tab"
                  aria-selected={true}
                  aria-label="Chat"
                  className="soul-ob__dot soul-ob__dot--active"
                />
              </div>

              <div className="soul-ob__cta">
                <SoulButton block onClick={onStart} aria-label="Start my reading">
                  Start my reading
                </SoulButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
