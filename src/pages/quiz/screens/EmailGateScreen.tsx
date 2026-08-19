// EmailGateScreen — dedicated email capture screen before teaser
// Ported from soul-v6.html renderEmailGate()

import { useState } from 'react'
import PrimaryButton from '../atoms/PrimaryButton'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface EmailGateScreenProps {
  value: string | undefined
  onChange: (v: string) => void
  onContinue: () => void
  isLoading?: boolean
}

export default function EmailGateScreen({ value = '', onChange, onContinue, isLoading }: EmailGateScreenProps) {
  const [touched, setTouched] = useState(false)
  const [tcAccepted, setTcAccepted] = useState(false)
  const isInvalid = touched && value.length > 0 && !EMAIL_RE.test(value)
  const canProceed = EMAIL_RE.test(value) && tcAccepted

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
        {/* Title */}
        <div style={{ textAlign: 'center', paddingTop: 4, marginBottom: 16 }}>
          <h2
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 600,
              fontSize: 22,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            Your soulmate portrait is ready
          </h2>
        </div>

        {/* Email card */}
        <div
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
            WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '22px 20px 18px',
            margin: '4px 0 16px',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: '-0.01em',
              color: 'var(--accent)',
              lineHeight: 1.2,
            }}
          >
            See your soulmate now
          </div>
          <div
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 600,
              fontSize: 20,
              letterSpacing: '-0.015em',
              color: 'var(--text-primary)',
              marginBottom: 4,
              lineHeight: 1.2,
            }}
          >
            Where should we send it?
          </div>

          {/* Input */}
          <input
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={value}
            aria-label="Email address"
            aria-invalid={isInvalid}
            onChange={e => onChange(e.target.value)}
            onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={e => {
              setTouched(true)
              e.target.style.borderColor = isInvalid ? 'var(--danger)' : 'var(--glass-border)'
            }}
            style={{
              width: '100%',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(var(--glass-blur))',
              border: `1.5px solid ${isInvalid ? 'var(--danger)' : 'var(--glass-border)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '16px 18px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--ui)',
              fontSize: 16,
              outline: 'none',
              transition: 'border-color 150ms',
              boxSizing: 'border-box',
              margin: 0,
              textAlign: 'left',
            }}
          />

          {/* CTA */}
          <div style={{ margin: '4px 0 2px' }}>
            <PrimaryButton onClick={onContinue} disabled={!canProceed} loading={isLoading}>
              Reveal my portrait
            </PrimaryButton>
          </div>

          {/* T&C checkbox */}
          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              fontSize: 13,
              lineHeight: 1.45,
              color: 'var(--text-secondary)',
              textAlign: 'left',
              cursor: 'pointer',
              padding: '4px 2px',
            }}
          >
            {/* Custom checkbox — fully React-controlled, no ::after needed */}
            <div
              role="checkbox"
              aria-checked={tcAccepted}
              tabIndex={0}
              onClick={() => setTcAccepted(v => !v)}
              onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setTcAccepted(v => !v) } }}
              style={{
                width: 18,
                height: 18,
                flexShrink: 0,
                border: `1.5px solid ${tcAccepted ? 'var(--accent)' : 'var(--border-strong)'}`,
                borderRadius: 5,
                background: tcAccepted ? 'var(--accent)' : 'var(--card)',
                cursor: 'pointer',
                marginTop: 1,
                transition: 'background 150ms var(--ease), border-color 150ms var(--ease)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {tcAccepted && (
                <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M2 6l3 3 5-6"
                    stroke="var(--text-inverse)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span>
              I accept the{' '}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: 2 }}
              >
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: 2 }}
              >
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
              padding: '12px 0 4px',
              borderTop: '1px solid var(--border)',
              marginTop: 4,
            }}
          >
            {[
              { icon: '⏱', label: 'Analysis time', num: '43s' },
              { icon: '✦', label: 'Data points', num: '24' },
              { icon: '♡', label: 'Profile match', num: '98%' },
            ].map(s => (
              <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textAlign: 'center' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--accent-soft)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    marginBottom: 2,
                  }}
                >
                  {s.icon}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.2 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  {s.num}
                </div>
              </div>
            ))}
          </div>

          {/* Privacy note */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, lineHeight: 1.4, color: 'var(--text-muted)', textAlign: 'left', padding: '10px 2px 2px' }}>
            <span style={{ color: 'var(--success)', flexShrink: 0 }}>🛡</span>
            <span>Your privacy is protected — we don't store or share your data.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
