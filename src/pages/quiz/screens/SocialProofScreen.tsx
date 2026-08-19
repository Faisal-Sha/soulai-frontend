// SocialProofScreen — interstitial after status question
// Ported from soul-v6.html renderQuestion() social-proof type

import PrimaryButton from '../atoms/PrimaryButton'

interface SocialProofScreenProps {
  onNext: () => void
}

export default function SocialProofScreen({ onNext }: SocialProofScreenProps) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0 0',
      }}
    >
      <div style={{ flex: 1 }}>
        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 600,
            fontSize: 26,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            textAlign: 'center',
            marginBottom: 22,
            padding: '0 4px',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>148,000+ people</span> have read who they're meant to meet
        </h2>

        {/* Review card */}
        <div
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
            WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 18,
            marginBottom: 18,
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 10,
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>
                Rebecca Bauman
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                October 7, 2025
              </div>
            </div>
            <div style={{ color: '#F4A93C', fontSize: 14, letterSpacing: 1 }}>★★★★★</div>
          </div>
          <div
            style={{
              fontFamily: 'var(--display)',
              fontSize: 17,
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 8,
            }}
          >
            "It described him before I met him."
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text-secondary)' }}>
            Did this on a slow Sunday, half-skeptical. The reading laid out his energy, how we'd meet, even the way I'd recognize him. Specific stuff — not horoscope-vague. Three months later I went on a date with someone who matched almost every part of it. Not a sketch, not a guess. More like it was reading me, then telling me what fit.
          </div>
        </div>

        {/* Stat rows */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 0',
            fontSize: 14,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            📊
          </div>
          <div>
            <strong>900+ readings</strong> generated today.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 0',
            fontSize: 14,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            💬
          </div>
          <div>
            Trusted by <strong>148,000+</strong> people ·{' '}
            <span style={{ color: '#F4A93C', fontSize: 11, letterSpacing: '0.5px' }}>★★★★★</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '8px 0 28px' }}>
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </div>
  )
}
