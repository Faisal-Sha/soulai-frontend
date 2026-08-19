import PrimaryButton from './atoms/PrimaryButton'
import { GoMoon } from 'react-icons/go'
import SingleSelect from './inputs/SingleSelect'
import MultiSelect from './inputs/MultiSelect'
import YesNo from './inputs/YesNo'
import Slider from './inputs/Slider'
import VisualSelect from './inputs/VisualSelect'
import DateInput from './inputs/DateInput'
import EmailInput from './inputs/EmailInput'
import type { QuizScreen, QuizAnswerValue, QuizAnswers } from './types'

interface QuestionScreenProps {
  screen: QuizScreen
  answers: QuizAnswers
  value: QuizAnswerValue
  onChange: (v: QuizAnswerValue) => void
  onContinue: () => void
  onBack: () => void
  canProceed: boolean
  questionIndex: number
  totalQuestions: number
  isLoading?: boolean
  captureError?: Error | null
  onRetry?: () => void
  theme?: 'light' | 'dark'
  onToggleTheme?: () => void
}

export default function QuestionScreen({
  screen,
  answers,
  value,
  onChange,
  onContinue,
  onBack,
  canProceed,
  questionIndex,
  totalQuestions,
  isLoading = false,
  captureError,
  onRetry,
  theme,
  onToggleTheme,
}: QuestionScreenProps) {

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ── */}
      <div style={{ padding: '18px 0 0' }}>

        {/* Row 1: back button | logo | theme toggle
            Both buttons are 40px wide — their outer edges define the horizontal
            bounds. The progress bar below spans the same full width, so its
            ends sit exactly under the outer edges of the buttons. */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          {/* Back — outer left edge = left bound */}
          <button
            onClick={onBack}
            aria-label="Go back"
            className="quiz-header-btn"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Logo — centered between the two buttons */}
          <div
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Soul<span style={{ color: 'var(--accent)' }}>+</span>AI
          </div>

          {/* Theme toggle — outer right edge = right bound */}
          {onToggleTheme ? (
            <button
              onClick={onToggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="quiz-header-btn"
            >
              {theme === 'light' ? <GoMoon /> : '☀'}
            </button>
          ) : (
            /* Invisible spacer keeps logo centered when no toggle */
            <div style={{ width: 40, height: 40 }} aria-hidden="true" />
          )}
        </div>

        {/* Row 2: progress bar — full width, no extra padding,
            so its left/right ends sit directly under the button outer edges */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>
              Question {questionIndex} of {totalQuestions}
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>
              {Math.round((questionIndex / totalQuestions) * 100)}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={questionIndex}
            aria-valuemin={1}
            aria-valuemax={totalQuestions}
            aria-label={`Question ${questionIndex} of ${totalQuestions}`}
            className="quiz-progress-track"
          >
            <div
              className="quiz-progress-fill"
              style={{ width: `${(questionIndex / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

      </div>

      {/* ── Question body ── */}
      <div
        style={{
          flex: 1,
          padding: '8px 0 20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Kicker / eyebrow */}
        {screen.kicker && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--accent)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 10,
              textAlign: 'center',
            }}
          >
            {screen.kicker}
          </div>
        )}

        {/* Question title */}
        <h2
          style={{
            fontFamily: 'var(--display)',
            fontSize: 28,
            fontWeight: 600,
            lineHeight: 1.15,
            margin: '0 0 10px',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            textAlign: 'center',
          }}
        >
          {screen.q ?? screen.title}
        </h2>

        {/* Subtitle */}
        {screen.sub && (
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
              marginTop: 0,
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            {screen.sub}
          </p>
        )}

        {/* Input area */}
        <div style={{ flex: 1, marginTop: screen.sub ? 0 : 20 }}>
          {screen.type === 'single' && screen.options && (
            <SingleSelect
              options={screen.options}
              value={value as string | undefined}
              onChange={v => onChange(v)}
              onConfirm={onContinue}
            />
          )}
          {screen.type === 'multi' && screen.options && (
            <MultiSelect
              options={screen.options}
              value={value as string[] | undefined}
              onChange={v => onChange(v)}
              max={screen.max}
            />
          )}
          {screen.type === 'yesno' && (
            <YesNo
              value={value as boolean | undefined}
              onChange={v => onChange(v)}
              onConfirm={onContinue}
            />
          )}
          {screen.type === 'slider' && (
            <Slider
              min={screen.min!}
              max={screen.max!}
              default={screen.default!}
              step={screen.step}
              unit={screen.unit}
              anchors={screen.anchors}
              value={value as number | undefined}
              onChange={v => onChange(v)}
            />
          )}
          {screen.type === 'visual' && screen.options && (
            <VisualSelect
              options={screen.options}
              value={value as string | undefined}
              onChange={v => onChange(v)}
              onConfirm={onContinue}
            />
          )}
          {screen.type === 'date' && (
            <DateInput
              value={value as { day: string; month: string; year: string } | undefined}
              onChange={v => onChange(v)}
            />
          )}
          {screen.type === 'email' && (
            <EmailInput
              value={value as string | undefined}
              onChange={v => onChange(v)}
            />
          )}
          {screen.type === 'text' && (
            <>
              <input
                type="text"
                list={screen.id === 'birth-place' ? 'quiz-birth-place-suggestions' : undefined}
                autoComplete={
                  screen.id === 'name'
                    ? 'given-name'
                    : screen.id === 'birth-place'
                      ? 'off'
                      : 'off'
                }
                inputMode={screen.id === 'birth-time' ? 'numeric' : undefined}
                placeholder={screen.placeholder ?? ''}
                value={(value as string) ?? ''}
                aria-label={screen.title ?? screen.q ?? 'Text input'}
                onChange={e => onChange(e.target.value)}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--glass-border)')}
                style={{
                  width: '100%',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
                  border: '1.5px solid var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 18px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--ui)',
                  fontSize: 16,
                  outline: 'none',
                  transition: 'border-color 150ms',
                  boxSizing: 'border-box',
                  margin: '4px 0 20px',
                }}
              />
              {screen.id === 'birth-place' && (
                <datalist id="quiz-birth-place-suggestions">
                  <option value="New York, USA" />
                  <option value="Los Angeles, USA" />
                  <option value="London, UK" />
                  <option value="Paris, France" />
                  <option value="Berlin, Germany" />
                  <option value="Moscow, Russia" />
                  <option value="Kyiv, Ukraine" />
                  <option value="Dubai, UAE" />
                  <option value="Toronto, Canada" />
                  <option value="Sydney, Australia" />
                </datalist>
              )}
            </>
          )}
        </div>

        {/* Social proof hint on specific questions */}
        {screen.id && ['patterns', 'block', 'goal'].includes(screen.id) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              color: 'var(--text-muted)',
              marginTop: 16,
              marginBottom: 4,
            }}
          >
            <div
              aria-hidden="true"
              style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }}
            />
            82% of members selected more than one
          </div>
        )}
      </div>

      {/* ── Network error retry (email screen only) ── */}
      {captureError && screen.type === 'email' && (
        <div style={{ padding: '0 0 8px' }}>
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(217,122,122,0.08)',
              border: '1px solid rgba(217,122,122,0.3)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <span style={{ fontSize: 13, color: 'var(--danger)', lineHeight: 1.4 }}>
              Couldn't save your reading. Your answers are safe.
            </span>
            <button
              onClick={onRetry}
              style={{
                background: 'transparent',
                border: '1px solid var(--accent-border)',
                borderRadius: 'var(--radius-pill)',
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--accent)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--ui)',
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div style={{ padding: '8px 0 28px' }}>
        <PrimaryButton onClick={onContinue} disabled={!canProceed} loading={isLoading}>
          Continue
        </PrimaryButton>
      </div>

    </div>
  )
}
