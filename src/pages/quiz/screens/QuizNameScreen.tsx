import { useEffect, useRef } from 'react'
import { SoulBrand, SoulButton, SoulProgress } from '@/components/soul'
import '../quiz-name.css'
import bgName from '../assets/onboarding/bg-name.png'

interface QuizNameScreenProps {
  value: string | undefined
  onChange: (v: string) => void
  onContinue: () => void
  canProceed: boolean
}

/**
 * Figma DEV · 02.2 · Quiz · Name (node 437:2823)
 * Native keyboard only — no mock iOS keyboard chrome.
 */
export default function QuizNameScreen({
  value = '',
  onChange,
  onContinue,
  canProceed,
}: QuizNameScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className="soul-qn" data-name="02.2 · Quiz · Name">
      <div className="soul-qn__bg" aria-hidden="true">
        <img className="soul-qn__bg-img" src={bgName} alt="" />
        <div className="soul-qn__bg-dim" />
      </div>

      <div className="soul-qn__frame">
        <div className="soul-qn__scrim" aria-hidden="true" />

        <div className="soul-qn__content">
          <header className="soul-qn__header">
            <SoulBrand />
          </header>

          <div className="soul-qn__progress-wrap">
            <SoulProgress step={2} total={6} />
          </div>

          <section className="soul-qn__hero">
            <h1 className="soul-qn__title">What can I call you?</h1>
            <p className="soul-qn__subtitle">
              Just your first name — that&apos;s how I&apos;ll talk to you from here on.
            </p>
          </section>

          <div className="soul-qn__form">
            <label className="soul-qn__field" htmlFor="soul-qn-name">
              <span className="soul-qn__label">Your name</span>
              <input
                ref={inputRef}
                id="soul-qn-name"
                className="soul-qn__input"
                type="text"
                name="given-name"
                autoComplete="given-name"
                autoCapitalize="words"
                enterKeyHint="done"
                placeholder="Enter your name"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && canProceed) {
                    e.preventDefault()
                    onContinue()
                  }
                }}
              />
            </label>

            <div className="soul-qn__actions">
              <SoulButton
                block
                onClick={onContinue}
                disabled={!canProceed}
                aria-label="Continue"
              >
                Continue
              </SoulButton>
              <p className="soul-qn__privacy">
                Your details stay private and are never shared.
              </p>
            </div>
          </div>

          <div className="soul-qn__spacer" />
        </div>
      </div>
    </div>
  )
}
