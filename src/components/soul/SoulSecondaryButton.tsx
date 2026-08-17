import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './soul-ui.css'
import iconBookmark from './assets/icon-bookmark.svg'
import { SoulSpinner } from './SoulSpinner'

type SoulSecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Defaults to bookmark icon from Figma. Pass custom node for other icons. */
  children?: ReactNode
  'aria-label': string
  loading?: boolean
}

/**
 * Figma WIP · Button / Secondary (559:569) — 50×50 circular icon button.
 * States: Default · Pressed · Disabled (+ loading)
 */
export function SoulSecondaryButton({
  children,
  className = '',
  type = 'button',
  loading = false,
  disabled,
  ...rest
}: SoulSecondaryButtonProps) {
  return (
    <button
      type={type}
      className={[
        'soul-btn-secondary',
        loading ? 'soul-btn-secondary--loading' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <SoulSpinner size={20} label="Loading" />
      ) : (
        (children ?? <img src={iconBookmark} alt="" width={20} height={20} />)
      )}
    </button>
  )
}
