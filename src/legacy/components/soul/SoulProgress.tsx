import './soul-ui.css'

type SoulProgressProps = {
  /** 1–6 filled segments (Figma quiz progress). */
  step: number
  total?: number
  className?: string
}

export function SoulProgress({ step, total = 5, className = '' }: SoulProgressProps) {
  const clamped = Math.max(0, Math.min(step, total))
  return (
    <div
      className={`soul-progress ${className}`.trim()}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`soul-progress__seg${i < clamped ? ' soul-progress__seg--on' : ''}`}
        />
      ))}
    </div>
  )
}
