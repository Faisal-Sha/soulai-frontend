import { useEffect, useRef, useState } from 'react'
import { SoulBrand, SoulButton, SoulProgress } from '@/components/soul'
import { isValidBirthdate, type BirthdateValue } from '../lib/dateValidation'
import '../quiz-birthdate.css'
import bgBirthdate from '../assets/onboarding/bg-birthdate.png'

interface QuizBirthdateScreenProps {
  value: BirthdateValue | undefined
  onChange: (v: BirthdateValue) => void
  onContinue: () => void
  canProceed: boolean
}

function digitsFromValue(v?: BirthdateValue): string {
  if (!v) return ''
  return `${v.day ?? ''}${v.month ?? ''}${v.year ?? ''}`.replace(/\D/g, '').slice(0, 8)
}

function formatDisplay(digits: string): string {
  const d = digits.slice(0, 2)
  const m = digits.slice(2, 4)
  const y = digits.slice(4, 8)
  if (!digits) return ''
  if (digits.length <= 2) return d
  if (digits.length <= 4) return `${d} / ${m}`
  return `${d} / ${m} / ${y}`
}

function toBirthdate(digits: string): BirthdateValue {
  return {
    day: digits.slice(0, 2),
    month: digits.slice(2, 4),
    year: digits.slice(4, 8),
  }
}

function toIso(v?: BirthdateValue): string {
  if (!v?.day || !v?.month || v.year?.length !== 4) return ''
  return `${v.year}-${v.month.padStart(2, '0')}-${v.day.padStart(2, '0')}`
}

/**
 * Figma DEV · 02.3 · Quiz · Birthdate (node 437:2852)
 */
export default function QuizBirthdateScreen({
  value,
  onChange,
  onContinue,
  canProceed,
}: QuizBirthdateScreenProps) {
  const [digits, setDigits] = useState(() => digitsFromValue(value))
  const inputRef = useRef<HTMLInputElement>(null)
  const nativeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDigits(digitsFromValue(value))
  }, [value])

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(t)
  }, [])

  const fieldsFilled = digits.length === 8
  const parsed = toBirthdate(digits)
  const isInvalid = fieldsFilled && !isValidBirthdate(parsed)

  const applyDigits = (next: string) => {
    const clean = next.replace(/\D/g, '').slice(0, 8)
    setDigits(clean)
    onChange(toBirthdate(clean))
  }

  return (
    <div className="soul-bd" data-name="02.3 · Quiz · Birthdate">
      <div className="soul-bd__bg" aria-hidden="true">
        <img className="soul-bd__bg-img" src={bgBirthdate} alt="" />
        <div className="soul-bd__bg-dim" />
      </div>

      <div className="soul-bd__frame">
        <div className="soul-bd__scrim" aria-hidden="true" />

        <div className="soul-bd__content">
          <header className="soul-bd__header">
            <SoulBrand />
          </header>

          <div className="soul-bd__progress-wrap">
            <SoulProgress step={3} total={6} />
          </div>

          <section className="soul-bd__hero">
            <h1 className="soul-bd__title">When were you born?</h1>
            <p className="soul-bd__subtitle">
              This is where your profile begins — it&apos;s what makes it about you, not
              everyone.
            </p>
          </section>

          <div className="soul-bd__form">
            <label className="soul-bd__field" htmlFor="soul-bd-input">
              <span className="soul-bd__label">Your birthdate</span>
              <div className={`soul-bd__input-wrap${isInvalid ? ' soul-bd__input-wrap--invalid' : ''}`}>
                <input
                  ref={inputRef}
                  id="soul-bd-input"
                  className="soul-bd__input"
                  type="text"
                  inputMode="numeric"
                  autoComplete="bday"
                  placeholder="DD / MM / YYYY"
                  value={formatDisplay(digits)}
                  aria-invalid={isInvalid || undefined}
                  aria-describedby={isInvalid ? 'soul-bd-error' : undefined}
                  onChange={(e) => applyDigits(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && canProceed) {
                      e.preventDefault()
                      onContinue()
                    }
                  }}
                />
                <button
                  type="button"
                  className="soul-bd__cal-btn"
                  aria-label="Open calendar"
                  onClick={() => nativeRef.current?.showPicker?.() ?? nativeRef.current?.click()}
                >
                  <CalendarIcon />
                </button>
                <input
                  ref={nativeRef}
                  className="soul-bd__native"
                  type="date"
                  tabIndex={-1}
                  aria-hidden="true"
                  value={toIso(isValidBirthdate(parsed) ? parsed : undefined)}
                  max={new Date().toISOString().slice(0, 10)}
                  min="1900-01-01"
                  onChange={(e) => {
                    const iso = e.target.value
                    if (!iso) return
                    const [y, m, d] = iso.split('-')
                    applyDigits(`${d}${m}${y}`)
                  }}
                />
              </div>
            </label>

            {isInvalid && (
              <p id="soul-bd-error" className="soul-bd__error" role="alert">
                Please enter a valid date of birth.
              </p>
            )}

            <div className="soul-bd__actions">
              <SoulButton
                block
                onClick={onContinue}
                disabled={!canProceed}
                aria-label="Continue"
              >
                Continue
              </SoulButton>
              <p className="soul-bd__privacy">
                Your details stay private and are never shared.
              </p>
            </div>
          </div>

          <div className="soul-bd__spacer" />
        </div>
      </div>
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 8.5h15" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 2.5v3M13.5 2.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
