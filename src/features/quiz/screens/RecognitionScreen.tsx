// RecognitionScreen — mid-quiz reinforcement after birthdate question
// Logic ported verbatim from soul-v6.html buildRecognition()

import PrimaryButton from '../atoms/PrimaryButton'
import { buildRecognition } from '../lib/buildRecognition'
import type { QuizAnswers } from '../types'

interface RecognitionScreenProps {
  answers: QuizAnswers
  onNext: () => void
}

export default function RecognitionScreen({ answers, onNext }: RecognitionScreenProps) {
  const paragraphs = buildRecognition(answers)

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0 0',
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          A quick check-in
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--display)',
            fontSize: 26,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: 28,
            textAlign: 'center',
          }}
        >
          Based on what you've told us so far…
        </h2>

        {/* Personalized paragraphs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            marginBottom: 32,
          }}
        >
          {paragraphs.map((p, i) => (
            <div
              key={i}
              style={{
                background: 'var(--card)',
                backdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
                WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
                border: '1px solid var(--border)',
                borderLeft: `3px solid ${i === 1 ? 'var(--accent-hover)' : 'var(--accent)'}`,
                borderRadius: 12,
                padding: '16px 18px',
                fontFamily: 'var(--display)',
                fontSize: 16.5,
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                fontWeight: 400,
                letterSpacing: '-0.005em',
                opacity: i === 2 ? 0.94 : 1,
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '8px 0 28px' }}>
        <PrimaryButton onClick={onNext}>Keep going</PrimaryButton>
        <div
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--text-muted)',
            marginTop: 10,
          }}
        >
          4 quick questions left
        </div>
      </div>
    </div>
  )
}
