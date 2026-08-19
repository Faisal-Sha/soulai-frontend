import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './soul-ui.css'
import iconArrow from './assets/icon-arrow.svg'
import iconWarning from './assets/icon-warning.svg'
import { SoulSpinner } from './SoulSpinner'

type SoulButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  /** Full-width block CTA (quiz / onboarding). */
  block?: boolean
  /** Trailing arrow icon (Home “Talk this through” style). */
  showArrow?: boolean
  /** Figma primary-button State=Loading — spinner replaces label. */
  loading?: boolean
  /** Figma primary-button State=Error — red fill + warning icon. */
  error?: boolean
}

/**
 * Figma WIP · Button / Primary (559:560) + primary-button states (242:2289)
 * States: Default · Hover · Pressed · Loading · Disabled · Error
 */
export function SoulButton({
  children,
  block = false,
  showArrow = false,
  loading = false,
  error = false,
  className = '',
  disabled,
  type = 'button',
  ...rest
}: SoulButtonProps) {
  const classes = [
    'soul-btn',
    block ? 'soul-btn--block' : '',
    showArrow ? 'soul-btn--arrow' : '',
    loading ? 'soul-btn--loading' : '',
    error ? 'soul-btn--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <SoulSpinner className="soul-btn__spinner" size={20} label="Loading" />
      ) : error ? (
        <>
          <img className="soul-btn__warning" src={iconWarning} alt="" width={16} height={14} />
          {children}
        </>
      ) : (
        children
      )}
      {showArrow && !loading && !error && (
        <img className="soul-btn__icon" src={iconArrow} alt="" width={16} height={16} />
      )}
    </button>
  )
}
