import { isValidBirthdate } from '../lib/dateValidation'
import type { BirthdateValue } from '../lib/dateValidation'

interface DateInputProps {
  value: BirthdateValue | undefined
  onChange: (v: BirthdateValue) => void
}

const FIELDS = [
  { k: 'month' as const, label: 'Month', maxLength: 2, placeholder: '09' },
  { k: 'day' as const,   label: 'Day',   maxLength: 2, placeholder: '14' },
  { k: 'year' as const,  label: 'Year',  maxLength: 4, placeholder: '1996' },
]

export default function DateInput({ value = { day: '', month: '', year: '' }, onChange }: DateInputProps) {
  const fieldsFilled = Boolean(value.day && value.month && value.year.length === 4)
  const isInvalid = fieldsFilled && !isValidBirthdate(value)

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1.2fr',
          gap: 10,
          margin: '4px 0 8px',
        }}
      >
        {FIELDS.map(f => (
          <div
            key={f.k}
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
              WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
              border: `1.5px solid ${isInvalid ? 'var(--danger)' : 'var(--glass-border)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '12px 8px',
              textAlign: 'center',
              transition: 'border-color 150ms',
            }}
            onFocusCapture={e => {
              if (!isInvalid) e.currentTarget.style.borderColor = 'var(--accent)'
            }}
            onBlurCapture={e => {
              e.currentTarget.style.borderColor = isInvalid ? 'var(--danger)' : 'var(--glass-border)'
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 4 }}>
              {f.label}
            </div>
            <input
              id={`date-${f.k}`}
              type="text"
              inputMode="numeric"
              maxLength={f.maxLength}
              placeholder={f.placeholder}
              value={value[f.k] || ''}
              aria-label={f.label}
              aria-invalid={isInvalid}
              aria-describedby={isInvalid ? 'quiz-birthdate-error' : undefined}
              onChange={e => {
                const clean = e.target.value.replace(/\D/g, '').slice(0, f.maxLength)
                onChange({ ...value, [f.k]: clean })
              }}
              style={{
                background: 'transparent',
                border: 'none',
                width: '100%',
                textAlign: 'center',
                color: 'var(--text-primary)',
                fontFamily: 'var(--display)',
                fontSize: 22,
                fontWeight: 600,
                outline: 'none',
                letterSpacing: '-0.02em',
              }}
            />
          </div>
        ))}
      </div>

      {isInvalid && (
        <p
          id="quiz-birthdate-error"
          role="alert"
          style={{
            fontSize: 12,
            color: 'var(--danger)',
            margin: '0 0 16px',
            textAlign: 'center',
          }}
        >
          Please enter a valid date of birth.
        </p>
      )}
      {!isInvalid && <div style={{ marginBottom: 12 }} />}
    </div>
  )
}
