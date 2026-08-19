import type { InputHTMLAttributes, ReactNode } from 'react'
import './soul-ui.css'
import iconCalendar from './assets/icon-calendar.svg'
import iconClock from './assets/icon-clock.svg'
import iconChevronDown from './assets/icon-chevron-down.svg'
import { SoulSpinner } from './SoulSpinner'

export type SoulInputStatus = 'default' | 'error' | 'success'
export type SoulInputSize = 'md' | 'lg'
export type SoulInputKind = 'text' | 'date' | 'time' | 'select'

type SoulInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: SoulInputSize
  /** Visual status (maps to Figma State=Error / Success). */
  status?: SoulInputStatus
  kind?: SoulInputKind
  readOnly?: boolean
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  /** Hide the default trailing icon for date/time/select. */
  hideTrailing?: boolean
}

const KIND_ICON: Record<Exclude<SoulInputKind, 'text'>, string> = {
  date: iconCalendar,
  time: iconClock,
  select: iconChevronDown,
}

/**
 * Figma Components · Input Field (424:1788)
 * States: Default · Hover · Focus · Error · Success · Disabled · Read-only
 * Sizes: MD · LG · Types: Text · Date · Time · Select
 */
export function SoulInput({
  size = 'md',
  status = 'default',
  kind = 'text',
  readOnly = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  hideTrailing = false,
  className = '',
  disabled,
  ...rest
}: SoulInputProps) {
  const defaultTrailing =
    !hideTrailing && kind !== 'text' ? (
      <img
        className="soul-input__icon"
        src={KIND_ICON[kind]}
        alt=""
        width={kind === 'select' ? 12 : 16}
        height={20}
      />
    ) : null

  return (
    <div
      className={[
        'soul-input',
        `soul-input--${size}`,
        status !== 'default' ? `soul-input--${status}` : '',
        readOnly ? 'soul-input--readonly' : '',
        disabled ? 'soul-input--disabled' : '',
        loading ? 'soul-input--loading' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {leadingIcon && <span className="soul-input__leading">{leadingIcon}</span>}
      <input
        className="soul-input__control"
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={status === 'error' || undefined}
        {...rest}
      />
      {loading ? (
        <SoulSpinner size={16} label="Loading" />
      ) : (
        (trailingIcon ?? defaultTrailing)
      )}
    </div>
  )
}
