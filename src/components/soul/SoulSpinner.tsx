import './soul-ui.css'
import iconSpinner from './assets/icon-spinner.svg'

type SoulSpinnerProps = {
  className?: string
  /** Visual size in px (Figma icon-spinner is 16). */
  size?: number
  /** Accessible label; omit for decorative. */
  label?: string
}

/** Figma Components · icon-spinner (424:1561) */
export function SoulSpinner({ className = '', size = 16, label = 'Loading' }: SoulSpinnerProps) {
  return (
    <img
      className={`soul-spinner ${className}`.trim()}
      src={iconSpinner}
      alt=""
      width={size}
      height={size}
      role="status"
      aria-label={label}
    />
  )
}
