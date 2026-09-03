import { SoulSpinner } from './SoulSpinner'
import './soul-ui.css'

type SoulPendingProps = {
  rows?: number
  variant?: 'rows' | 'cards' | 'center'
  label?: string
}

/** Placeholder while list/progress loads. Avoids empty / demo flash. */
export function SoulPending({
  rows = 6,
  variant = 'rows',
  label = 'Loading',
}: SoulPendingProps) {
  if (variant === 'center') {
    return (
      <div className="soul-pending soul-pending--center" role="status" aria-label={label}>
        <SoulSpinner size={22} label={label} />
        <p className="soul-pending__label">{label}</p>
      </div>
    )
  }

  const kind = variant === 'cards' ? 'soul-pending__card' : 'soul-pending__block'
  return (
    <div className="soul-pending" role="status" aria-label={label} aria-busy="true">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className={kind}>
          <span className="soul-pending__bar soul-pending__bar--title" />
          <span className="soul-pending__bar soul-pending__bar--line" />
          {variant === 'rows' ? (
            <span className="soul-pending__bar soul-pending__bar--meta" />
          ) : null}
        </div>
      ))}
    </div>
  )
}
