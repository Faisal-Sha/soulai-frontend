// FeedbackScreen — interstitial after soulmate-strength question
// Ported from soul-v6.html renderQuestion() feedback type

import PrimaryButton from '../atoms/PrimaryButton'
import type { QuizAnswers } from '../types'

interface FeedbackScreenProps {
  answers: QuizAnswers
  onNext: () => void
}

const FEEDBACK_MAP: Record<string, string> = {
  emotional: 'Those who seek Emotional Depth in their soulmate are drawn to vulnerability, presence, and the kind of love that holds you whole.',
  intellect: 'Those who seek Intelligence in their soulmate are drawn to meaningful conversations and shared growth.',
  spiritual: 'Those who seek Spiritual Wisdom in their soulmate are drawn to depth of presence, intuition, and a love that feels like a homecoming.',
  ambition:  'Those who seek Ambition in their soulmate are drawn to partners who match their fire — building something real, side by side.',
  humor:     'Those who seek Humor in their soulmate are drawn to lightness, play, and a partner who can disarm any heaviness.',
  kindness:  'Those who seek Kindness in their soulmate are drawn to gentleness, steadiness, and love expressed in quiet daily acts.',
}

export default function FeedbackScreen({ answers, onNext }: FeedbackScreenProps) {
  const strength = answers['soulmate-strength'] ?? 'emotional'
  const body = FEEDBACK_MAP[strength] ?? FEEDBACK_MAP['emotional']

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0 0',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 0 24px',
          textAlign: 'center',
        }}
      >
        {/* Illustration */}
        <div
          style={{
            width: '100%',
            padding: '24px 0',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
            WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <svg viewBox="0 0 200 200" width="160" height="160">
            <defs>
              <radialGradient id="fbg" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#B5A7FF" />
                <stop offset="60%" stopColor="#9B82FF" />
                <stop offset="100%" stopColor="#5D4BE0" />
              </radialGradient>
              <radialGradient id="fglow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="92" fill="url(#fglow)" />
            <circle cx="100" cy="100" r="68" fill="url(#fbg)" />
            <path
              d="M100 138 C 70 116, 60 96, 60 82 C 60 70, 70 62, 82 62 C 90 62, 96 66, 100 74 C 104 66, 110 62, 118 62 C 130 62, 140 70, 140 82 C 140 96, 130 116, 100 138 Z"
              fill="#fff"
              opacity="0.96"
            />
            <circle cx="148" cy="64" r="3" fill="#fff" opacity="0.9" />
            <circle cx="56" cy="142" r="2.5" fill="#fff" opacity="0.8" />
            <circle cx="160" cy="124" r="2" fill="#fff" opacity="0.7" />
            <circle cx="44" cy="74" r="2" fill="#fff" opacity="0.7" />
          </svg>
        </div>

        <h2
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 32,
            color: 'var(--text-primary)',
            marginBottom: 12,
            letterSpacing: '-0.02em',
          }}
        >
          Awesome!
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.55,
            color: 'var(--text-secondary)',
            padding: '0 8px',
          }}
        >
          {body}
        </p>
      </div>

      {/* CTA */}
      <div style={{ padding: '8px 0 28px' }}>
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </div>
  )
}
