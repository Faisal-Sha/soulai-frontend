import type { QuizScreenOption } from '../types'

interface VisualSelectProps {
  options: QuizScreenOption[]
  value: string | undefined
  onChange: (v: string) => void
  onConfirm?: () => void
}

export default function VisualSelect({ options, value, onChange, onConfirm }: VisualSelectProps) {
  const handlePick = (v: string) => {
    onChange(v)
    if (onConfirm) setTimeout(onConfirm, 280)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {options.map(opt => {
        const active = value === opt.v
        return (
          <button
            key={opt.v}
            onClick={() => handlePick(opt.v)}
            aria-pressed={active}
            className={`quiz-option${active ? ' selected' : ''}`}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              padding: '22px 16px',
              gap: 12,
            }}
          >
            {/* Glyph circle */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: active ? 'var(--accent)' : 'var(--accent-soft)',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--accent-border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--display)',
                fontStyle: 'italic',
                fontSize: 20,
                color: active ? 'var(--text-inverse)' : 'var(--accent)',
                transition: 'background 150ms, color 150ms',
              }}
            >
              {opt.glyph}
            </div>
            <div
              style={{
                fontFamily: 'var(--ui)',
                fontSize: 13.5,
                fontWeight: 500,
                textAlign: 'center',
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              {opt.label}
            </div>
          </button>
        )
      })}
    </div>
  )
}
