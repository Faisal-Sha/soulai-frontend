import { useEffect, useRef, useState, type FormEvent } from 'react'
import './soul-ui.css'
import { SoulIconButton } from './SoulIconButton'

type SoulComposerProps = {
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  autoFocus?: boolean
  className?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
}

/**
 * Figma WIP · Composer (569:884)
 * States: Default · Focused · Filled · Pressed · Disabled
 */
export function SoulComposer({
  value,
  defaultValue = '',
  placeholder = 'Chat with mentor…',
  disabled = false,
  autoFocus = false,
  className = '',
  onChange,
  onSubmit,
}: SoulComposerProps) {
  const [internal, setInternal] = useState(defaultValue)
  const inputRef = useRef<HTMLInputElement>(null)
  const text = value !== undefined ? value : internal
  const filled = text.trim().length > 0
  const canSend = filled && !disabled

  useEffect(() => {
    if (!autoFocus || disabled) return
    const el = inputRef.current
    if (!el) return
    el.focus()
    const len = el.value.length
    el.setSelectionRange(len, len)
  }, [autoFocus, disabled])

  const setText = (next: string) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    if (!canSend) return
    onSubmit?.(text.trim())
  }

  return (
    <form
      className={[
        'soul-composer',
        filled ? 'soul-composer--filled' : '',
        disabled ? 'soul-composer--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onSubmit={submit}
    >
      <input
        ref={inputRef}
        className="soul-composer__input"
        type="text"
        value={text}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        aria-label={placeholder}
      />
      <SoulIconButton
        type="submit"
        aria-label="Send message"
        disabled={!canSend}
      />
    </form>
  )
}
