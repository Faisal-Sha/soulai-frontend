interface ProgressBarProps {
  value: number  // current question (1-based)
  max: number    // total questions
}

export default function ProgressBar({ value, max }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(1, value / max)) * 100

  return (
    <div>
      {/* Text labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--text-muted)',
          }}
        >
          Question {value} of {max}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--accent)',
          }}
        >
          {Math.round(pct)}%
        </span>
      </div>

      {/* Bar — uses CSS classes for gradient */}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={1}
        aria-valuemax={max}
        aria-label={`Question ${value} of ${max}`}
        className="quiz-progress-track"
      >
        <div
          className="quiz-progress-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
