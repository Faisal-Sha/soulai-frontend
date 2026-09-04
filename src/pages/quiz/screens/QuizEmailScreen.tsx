import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { SoulBrand, SoulButton, SoulProgress } from '@/components/soul'
import { SoulLangSwitch, useCopy } from '@/i18n'
import '../quiz-email.css'
import bgEmail from '../assets/onboarding/bg-email.png'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface QuizEmailScreenProps {
  value: string | undefined
  onChange: (v: string) => void
  onContinue: () => void
  isLoading?: boolean
}

/**
 * Figma DEV · 02.5 · Quiz · Email (node 437:2967)
 */
export default function QuizEmailScreen({
  value = '',
  onChange,
  onContinue,
  isLoading = false,
}: QuizEmailScreenProps) {
  const t = useCopy()
  const inputRef = useRef<HTMLInputElement>(null)
  const canProceed = EMAIL_RE.test(value.trim()) && !isLoading

  useEffect(() => {
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(focusTimer)
  }, [])

  return (
    <div className="soul-em" data-name="02.5 · Quiz · Email">
      <div className="soul-em__bg" aria-hidden="true">
        <img className="soul-em__bg-img" src={bgEmail} alt="" />
        <div className="soul-em__bg-dim" />
      </div>

      <div className="soul-em__frame">
        <div className="soul-em__scrim" aria-hidden="true" />

        <div className="soul-em__content">
          <header className="soul-em__header">
            <SoulBrand />
            <SoulLangSwitch />
          </header>

          <div className="soul-em__progress-wrap">
            <SoulProgress step={6} total={6} />
          </div>

          <section className="soul-em__hero">
            <h1 className="soul-em__title">{t('quiz.email.title', 'Where can I reach you?')}</h1>
            <p className="soul-em__subtitle">
              {t(
                'quiz.email.sub',
                'After you subscribe I’ll send a login link here. Until then you can stay with the free preview.',
              )}
            </p>
          </section>

          <div className="soul-em__form">
            <label className="soul-em__field" htmlFor="soul-em-input">
              <span className="soul-em__label">{t('quiz.email.label', 'Your email')}</span>
              <div className="soul-em__input-wrap">
                <input
                  ref={inputRef}
                  id="soul-em-input"
                  className="soul-em__input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  enterKeyHint="done"
                  placeholder={t('quiz.email.placeholder', 'Enter your email')}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && canProceed) {
                      e.preventDefault()
                      onContinue()
                    }
                  }}
                />
              </div>
              <p className="soul-em__helper">
                {t('quiz.email.helper', "We'll use this to personalise your reading.")}
              </p>
            </label>

            <div className="soul-em__actions">
              <SoulButton
                block
                onClick={onContinue}
                disabled={!canProceed}
                loading={isLoading}
                aria-label={t('quiz.email.continue', 'Continue')}
              >
                {t('quiz.email.continue', 'Continue')}
              </SoulButton>
              <p className="soul-em__privacy">
                {t('quiz.email.privacy', 'Your details stay private and are never shared.')}
              </p>
              <p className="soul-em__legal">
                {t('quiz.email.legalPrefix', 'By continuing you agree to our')}{' '}
                <Link to="/terms" target="_blank" rel="noopener noreferrer">
                  {t('quiz.email.terms', 'Terms')}
                </Link>
                {' & '}
                <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                  {t('quiz.email.privacyPolicy', 'Privacy Policy')}
                </Link>
              </p>
            </div>
          </div>

          <div className="soul-em__spacer" />
        </div>
      </div>
    </div>
  )
}
