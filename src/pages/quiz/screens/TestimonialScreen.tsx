import Kicker from '../atoms/Kicker'
import PrimaryButton from '../atoms/PrimaryButton'
import type { QuizScreen } from '../types'

interface TestimonialScreenProps {
  screen: QuizScreen
  onNext: () => void
}

export default function TestimonialScreen({ screen, onNext }: TestimonialScreenProps) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        padding: '60px 0 36px',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Kicker>A moment</Kicker>

        <blockquote
          style={{
            fontFamily: 'var(--display)',
            fontSize: 26,
            fontWeight: 600,
            lineHeight: 1.25,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
            padding: '20px 22px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--accent)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              fontFamily: 'var(--display)',
              fontStyle: 'italic',
              color: 'var(--accent)',
              fontSize: 64,
              lineHeight: 0.5,
              verticalAlign: '-0.25em',
              marginRight: 4,
            }}
          >
            "
          </span>
          {screen.quote}
        </blockquote>

        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div
            aria-hidden="true"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-soft), var(--accent-softer))',
              border: '1px solid var(--accent-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--display)',
              fontStyle: 'italic',
              fontSize: 18,
              color: 'var(--accent)',
              flexShrink: 0,
            }}
          >
            {screen.author?.[0]}
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}
            >
              {screen.author}
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                marginTop: 2,
                letterSpacing: '0.04em',
              }}
            >
              {screen.meta}
            </div>
          </div>
        </div>

        {/* Stat card */}
        {screen.stat && (
          <div
            style={{
              padding: '20px 22px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--card)',
              display: 'flex',
              alignItems: 'baseline',
              gap: 16,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--display)',
                fontSize: 52,
                fontStyle: 'italic',
                color: 'var(--accent)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {screen.stat.pct}
              <span style={{ fontSize: 22 }}>%</span>
            </div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.45,
                color: 'var(--text-secondary)',
              }}
            >
              {screen.stat.label}
            </div>
          </div>
        )}
      </div>

      <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
    </div>
  )
}
