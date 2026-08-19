import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './soul-ui.css'
import iconWarning from './assets/icon-warning-outline.svg'
import { SoulSpinner } from './SoulSpinner'

type SoulOutlineButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  block?: boolean
  loading?: boolean
  error?: boolean
}

/**
 * Figma WIP · secondary-button (244:2245) — outline “Skip” / retry CTA.
 * States: Default · Hover · Pressed · Loading · Disabled · Error
 */
export function SoulOutlineButton({
  children,
  block = false,
  loading = false,
  error = false,
  className = '',
  disabled,
  type = 'button',
  ...rest
}: SoulOutlineButtonProps) {
  const classes = [
    'soul-btn-outline',
    block ? 'soul-btn-outline--block' : '',
    loading ? 'soul-btn-outline--loading' : '',
    error ? 'soul-btn-outline--error' : '',
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
    </button>
  )
}
