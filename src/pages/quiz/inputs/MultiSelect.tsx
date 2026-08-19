import type { QuizScreenOption } from '../types'

interface MultiSelectProps {
  options: QuizScreenOption[]
  value: string[] | undefined
  onChange: (v: string[]) => void
  max?: number
}

export default function MultiSelect({ options, value = [], onChange, max }: MultiSelectProps) {
  const toggle = (v: string) => {
    const set = new Set(value)
    if (set.has(v)) {
      set.delete(v)
    } else {
      if (max && set.size >= max) return
      set.add(v)
    }
    onChange([...set])
  }

  return (
    <div>
      {max && (
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 12 }}>
          {value.length} of {max} selected
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map(opt => {
          const active = value.includes(opt.v)
          const atMax = !!max && value.length >= max && !active
          return (
            <button
              key={opt.v}
              onClick={() => toggle(opt.v)}
              aria-pressed={active}
              disabled={atMax}
              className={`quiz-option${active ? ' selected' : ''}`}
              style={atMax ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border-strong)'}`,
                  background: active ? 'var(--accent)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 150ms, border-color 150ms',
                }}
              >
                {active && (
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 6l3 3 5-6" stroke="var(--text-inverse)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div style={{ flex: 1, lineHeight: 1.35, textAlign: 'left' }}>{opt.label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
