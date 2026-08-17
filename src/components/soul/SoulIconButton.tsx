import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './soul-ui.css'
import iconSend from './assets/icon-send.svg'
import iconSendDisabled from './assets/icon-send-disabled.svg'

type SoulIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  'aria-label': string
}

export function SoulIconButton({
  children,
  className = '',
  disabled,
  type = 'button',
  ...rest
}: SoulIconButtonProps) {
  return (
    <button
      type={type}
      className={`soul-icon-btn ${className}`.trim()}
      disabled={disabled}
      {...rest}
    >
      {children ?? (
        <img
          src={disabled ? iconSendDisabled : iconSend}
          alt=""
          width={20}
          height={20}
        />
      )}
    </button>
  )
}
