import type { QuizScreenOption } from '../types'

interface SingleSelectProps {
  options: QuizScreenOption[]
  value: string | undefined
  onChange: (v: string) => void
  onConfirm?: () => void
}

export default function SingleSelect({ options, value, onChange, onConfirm }: SingleSelectProps) {
  const handlePick = (v: string) => {
    onChange(v)
    if (onConfirm) setTimeout(onConfirm, 280)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map(opt => {
        const active = value === opt.v
        return (
          <button
            key={opt.v}
            onClick={() => handlePick(opt.v)}
            aria-pressed={active}
            className={`quiz-option${active ? ' selected' : ''}`}
          >
            {/* Glyph/icon badge */}
            {(opt.icon || opt.glyph) && (
              <div
                style={{
                  flexShrink: 0,
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-sm)',
                  background: active ? 'var(--accent)' : 'var(--accent-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: active ? 'var(--text-inverse)' : 'var(--accent)',
                  transition: 'background 150ms, color 150ms',
                }}
              >
                {opt.icon ?? opt.glyph}
              </div>
            )}

            {/* Label + detail */}
            <div style={{ flex: 1, lineHeight: 1.35, textAlign: 'left' }}>
              <div>{opt.label}</div>
              {opt.detail && (
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                  {opt.detail}
                </div>
              )}
            </div>

            {/* Animated check badge */}
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: active ? 'var(--accent)' : 'transparent',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-strong)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                opacity: active ? 1 : 0,
                transform: active ? 'scale(1)' : 'scale(0.5)',
                transition: 'opacity 150ms, transform 150ms',
              }}
            >
              {active && (
                <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 6l3 3 5-6" stroke="var(--text-inverse)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
