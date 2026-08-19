interface SliderProps {
  min: number
  max: number
  default: number
  step?: number
  unit?: string
  anchors?: [string, string]
  value: number | undefined
  onChange: (v: number) => void
}

export default function Slider({
  min,
  max,
  default: defaultVal,
  step = 1,
  unit = '',
  anchors,
  value,
  onChange,
}: SliderProps) {
  const v = value ?? defaultVal
  const pct = Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100))
  const displayValue = Number.isInteger(v) ? String(v) : v.toFixed(1)

  return (
    <div>
      {/* Large value display */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--display)',
            fontStyle: 'italic',
            fontSize: 72,
            color: 'var(--accent)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {displayValue}
        </span>
        {unit && (
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-muted)',
              marginLeft: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {unit}
          </span>
        )}
      </div>

      {/* Track + thumb + native input */}
      <div
        style={{
          position: 'relative',
          height: 44,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Track background */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 3,
            background: 'var(--border)',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          {/* Filled portion */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${pct}%`,
              background: 'var(--accent)',
              borderRadius: 'var(--radius-pill)',
            }}
          />
        </div>

        {/* Thumb */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: `${pct}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'var(--text-inverse)',
            boxShadow: `0 0 0 2px var(--accent), var(--shadow-sm)`,
            pointerEvents: 'none',
          }}
        />

        {/* Native range input — transparent overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={v}
          aria-label={`${unit ? unit : 'value'}: ${displayValue}`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={v}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            margin: 0,
            padding: 0,
            zIndex: 1,
          }}
        />
      </div>

      {/* Anchor labels */}
      {anchors && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--text-muted)',
            marginTop: 10,
          }}
        >
          <span>{anchors[0]}</span>
          <span>{anchors[1]}</span>
        </div>
      )}
    </div>
  )
}
