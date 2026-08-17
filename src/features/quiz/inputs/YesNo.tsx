interface YesNoProps {
  value: boolean | undefined
  onChange: (v: boolean) => void
  onConfirm?: () => void
}

const OPTIONS = [
  { v: true,  label: 'Yes' },
  { v: false, label: 'Not yet' },
] as const

export default function YesNo({ value, onChange, onConfirm }: YesNoProps) {
  const handlePick = (v: boolean) => {
    onChange(v)
    if (onConfirm) setTimeout(onConfirm, 280)
  }

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {OPTIONS.map(opt => {
        const active = value === opt.v
        return (
          <button
            key={String(opt.v)}
            onClick={() => handlePick(opt.v)}
            aria-pressed={active}
            className={`quiz-option${active ? ' selected' : ''}`}
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '32px 20px',
              fontFamily: 'var(--display)',
              fontSize: 26,
              fontWeight: 600,
              color: active ? 'var(--accent)' : 'var(--text-primary)',
              letterSpacing: '-0.02em',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
