import type { ButtonHTMLAttributes } from 'react'
import './soul-ui.css'

type SoulChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  /** Figma Chip State=Pressed / selected */
  selected?: boolean
  /** Non-interactive display chip */
  readOnly?: boolean
}

/**
 * Figma WIP · Chip (573:877)
 * States: Default · Pressed (selected)
 */
export function SoulChip({
  label,
  selected = false,
  readOnly = false,
  className = '',
  type = 'button',
  onClick,
  ...rest
}: SoulChipProps) {
  if (readOnly) {
    return (
      <span
        className={[
          'soul-chip',
          'soul-chip--static',
          selected ? 'soul-chip--selected' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </span>
    )
  }

  return (
    <button
      type={type}
      className={['soul-chip', selected ? 'soul-chip--selected' : '', className]
        .filter(Boolean)
        .join(' ')}
      aria-pressed={selected}
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  )
}
