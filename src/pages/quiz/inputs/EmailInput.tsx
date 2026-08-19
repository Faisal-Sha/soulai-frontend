import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface EmailInputProps {
  value: string | undefined
  onChange: (v: string) => void
}

export default function EmailInput({ value = '', onChange }: EmailInputProps) {
  const [touched, setTouched] = useState(false)
  const isInvalid = touched && value.length > 0 && !EMAIL_RE.test(value)

  return (
    <div>
      {/* Email card with glassmorphism */}
      <div
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
          WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '22px 20px 18px',
          marginBottom: 16,
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
          ✦ Your portrait is ready
        </div>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: '-0.015em',
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}
        >
          Where should we send it?
        </div>

        {/* Input */}
        <input
          id="quiz-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={value}
          aria-label="Email address"
          aria-describedby={isInvalid ? 'quiz-email-error' : undefined}
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
          }}
        />

        {isInvalid && (
          <p
            id="quiz-email-error"
            role="alert"
            style={{ fontSize: 12, color: 'var(--danger)', margin: 0, textAlign: 'left' }}
          >
            Please enter a valid email address.
          </p>
        )}

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            paddingTop: 12,
            borderTop: '1px solid var(--border)',
          }}
        >
          {[
            { icon: '✦', num: '148K', label: 'portraits sent' },
            { icon: '◉', num: '91%',  label: 'find clarity' },
            { icon: '★', num: '4.8',  label: 'avg rating' },
          ].map(s => (
            <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
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
                  fontSize: 13,
                  marginBottom: 2,
                }}
              >
                {s.icon}
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                {s.num}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy note */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, lineHeight: 1.4, color: 'var(--text-muted)' }}>
        <span style={{ color: 'var(--success)', flexShrink: 0 }}>✓</span>
        <span>Your answers are private and never shared with third parties.</span>
      </div>
    </div>
  )
}
