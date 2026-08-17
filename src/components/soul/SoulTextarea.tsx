import type { TextareaHTMLAttributes } from 'react'
import './soul-ui.css'

export type SoulTextareaStatus = 'default' | 'error' | 'success'
export type SoulTextareaRows = 3 | 5 | 8

type SoulTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> & {
  rows?: SoulTextareaRows
  status?: SoulTextareaStatus
  readOnly?: boolean
}

/**
 * Figma Components · Textarea (424:1831)
 * States: Default · Hover · Focus · Error · Success · Disabled · Read-only
 * Rows: 3 · 5 · 8
 */
export function SoulTextarea({
  rows = 3,
  status = 'default',
  readOnly = false,
  className = '',
  disabled,
  ...rest
}: SoulTextareaProps) {
  return (
    <div
      className={[
        'soul-textarea',
        `soul-textarea--rows-${rows}`,
        status !== 'default' ? `soul-textarea--${status}` : '',
        readOnly ? 'soul-textarea--readonly' : '',
        disabled ? 'soul-textarea--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <textarea
        className="soul-textarea__control"
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={status === 'error' || undefined}
        {...rest}
      />
    </div>
  )
}
