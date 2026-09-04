import { useEffect, useRef, useState } from 'react'
import { SoulBrand, SoulButton, SoulChip, SoulProgress } from '@/components/soul'
import { SoulLangSwitch, useCopy } from '@/i18n'
import '../quiz-birthtime.css'
import bgBirthTime from '../assets/onboarding/bg-birthtime.png'

const CERTAINTY = [
  { v: 'yes', label: 'Exact' },
  { v: 'approximate', label: 'Give or take an hour' },
  { v: 'guess', label: 'Just a rough guess' },
] as const

type Certainty = (typeof CERTAINTY)[number]['v']

interface QuizBirthTimeScreenProps {
  time: string | undefined
  certainty: string | undefined
  onChangeTime: (v: string) => void
  onChangeCertainty: (v: string) => void
  onContinue: () => void
  onSkip: () => void
}

function formatTime(digits: string): string {
  const h = digits.slice(0, 2)
  const m = digits.slice(2, 4)
  if (!digits) return ''
  if (digits.length <= 2) return h
  return `${h}:${m}`
}

function isValidTime(digits: string): boolean {
  if (digits.length !== 4) return false
  const h = Number(digits.slice(0, 2))
  const m = Number(digits.slice(2, 4))
  return Number.isInteger(h) && Number.isInteger(m) && h >= 0 && h <= 23 && m >= 0 && m <= 59
}

function digitsFromTime(time?: string): string {
  if (!time) return ''
  return time.replace(/\D/g, '').slice(0, 4)
}

/**
 * Figma DEV · 02.3 · Quiz · Birth time (+ Clarification)
 * Nodes 437:2879 / 437:2906. Certainty chips appear once a time is entered.
 */
export default function QuizBirthTimeScreen({
  time,
  certainty,
  onChangeTime,
  onChangeCertainty,
  onContinue,
  onSkip,
}: QuizBirthTimeScreenProps) {
  const t = useCopy()
  const [digits, setDigits] = useState(() => digitsFromTime(time))
  const inputRef = useRef<HTMLInputElement>(null)
  const nativeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDigits(digitsFromTime(time))
  }, [time])

  useEffect(() => {
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(focusTimer)
  }, [])

  const valid = isValidTime(digits)
  const showCertainty = valid
  const selected = CERTAINTY.some((c) => c.v === certainty) ? (certainty as Certainty) : undefined
  const canProceed = valid && !!selected

  const applyDigits = (raw: string) => {
    const clean = raw.replace(/\D/g, '').slice(0, 4)
    setDigits(clean)
    onChangeTime(clean.length ? formatTime(clean) : '')
    if (clean.length < 4) onChangeCertainty('')
  }

  return (
    <div className="soul-bt" data-name="02.3 · Quiz · Birth time">
      <div className="soul-bt__bg" aria-hidden="true">
        <img className="soul-bt__bg-img" src={bgBirthTime} alt="" />
        <div className="soul-bt__bg-dim" />
      </div>

      <div className="soul-bt__frame">
        <div className="soul-bt__scrim" aria-hidden="true" />

        <div className="soul-bt__content">
          <header className="soul-bt__header">
            <SoulBrand />
            <SoulLangSwitch />
          </header>

          <div className="soul-bt__progress-wrap">
            <SoulProgress step={4} total={6} />
          </div>

          <section className="soul-bt__hero">
            <h1 className="soul-bt__title">{t('quiz.birthTime.title', 'What time were you born?')}</h1>
            <p className="soul-bt__subtitle">
              {t(
                'quiz.birthTime.sub',
                "If you know it, it makes your profile a bit sharper. If you don't, no worries, we'll work with what we've got.",
              )}
            </p>
          </section>

          <div className="soul-bt__form">
            <label className="soul-bt__field" htmlFor="soul-bt-input">
              <span className="soul-bt__label">{t('quiz.birthTime.label', 'Your birth time')}</span>
              <div className="soul-bt__input-wrap">
                <input
                  ref={inputRef}
                  id="soul-bt-input"
                  className="soul-bt__input"
                  type="text"
                  inputMode="numeric"
                  placeholder={t('quiz.birthTime.placeholder', '--:--')}
                  value={formatTime(digits)}
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
                  className="soul-bt__clock-btn"
                  aria-label={t('quiz.birthTime.timeAria', 'Open time picker')}
                  onClick={() => nativeRef.current?.showPicker?.() ?? nativeRef.current?.click()}
                >
                  <ClockIcon />
                </button>
                <input
                  ref={nativeRef}
                  className="soul-bt__native"
                  type="time"
                  tabIndex={-1}
                  aria-hidden="true"
                  value={valid ? `${digits.slice(0, 2)}:${digits.slice(2, 4)}` : ''}
                  onChange={(e) => {
                    const v = e.target.value
                    if (!v) return
                    applyDigits(v.replace(':', ''))
                  }}
                />
              </div>
              <p className="soul-bt__helper">
                {t('quiz.birthTime.helper', 'A precise time makes for a sharper reading.')}
              </p>
            </label>

            {showCertainty && (
              <div className="soul-bt__certainty">
                <p className="soul-bt__certainty-title">
                  {t('quiz.birthTime.certaintyTitle', 'How sure are you about this time?')}
                </p>
                <div className="soul-bt__chips" role="group" aria-label={t('quiz.birthTime.certaintyAria', 'Time certainty')}>
                  {CERTAINTY.map((opt) => (
                    <SoulChip
                      key={opt.v}
                      label={t(
                        opt.v === 'yes'
                          ? 'quiz.birthTime.exact'
                          : opt.v === 'approximate'
                            ? 'quiz.birthTime.approximate'
                            : 'quiz.birthTime.guess',
                        opt.label,
                      )}
                      selected={selected === opt.v}
                      onClick={() => onChangeCertainty(opt.v)}
                      className="soul-bt__chip"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="soul-bt__actions">
              <SoulButton
                block
                onClick={onContinue}
                disabled={!canProceed}
                aria-label={t('quiz.birthTime.continue', 'Continue')}
              >
                {t('quiz.birthTime.continue', 'Continue')}
              </SoulButton>
              <button type="button" className="soul-bt__skip" onClick={onSkip}>
                {t('quiz.birthTime.skip', "I don't know my birth time")}
              </button>
              <p className="soul-bt__privacy">
                {t('quiz.birthTime.privacy', 'Your details stay private and are never shared.')}
              </p>
            </div>
          </div>

          <div className="soul-bt__spacer" />
        </div>
      </div>
    </div>
  )
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6.5V10l2.5 1.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
