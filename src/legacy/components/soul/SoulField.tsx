import type { ReactNode } from 'react'
import './soul-ui.css'
import { SoulInput, type SoulInputProps } from './SoulInput'
import { SoulTextarea, type SoulTextareaProps } from './SoulTextarea'

type SoulFieldTone = 'none' | 'helper' | 'error' | 'success'

type SoulFieldBase = {
  label?: string
  /** Helper / error / success message under the control. */
  message?: string
  tone?: SoulFieldTone
  className?: string
  htmlFor?: string
  children?: ReactNode
}

type WithInput = SoulFieldBase & {
  control?: 'input'
  inputProps?: SoulInputProps
  textareaProps?: never
}

type WithTextarea = SoulFieldBase & {
  control: 'textarea'
  textareaProps?: SoulTextareaProps
  inputProps?: never
}

type SoulFieldProps = WithInput | WithTextarea

/**
 * Figma Components · Form Field (424:1841 / Helper / Error / Success)
 * Label + Input/Textarea + optional message row.
 */
export function SoulField(props: SoulFieldProps) {
  const {
    label,
    message,
    tone = 'none',
    className = '',
    htmlFor,
    children,
  } = props

  const status =
    tone === 'error' ? 'error' : tone === 'success' ? 'success' : 'default'

  let control: ReactNode = children
  if (!children) {
    if (props.control === 'textarea') {
      control = (
        <SoulTextarea
          id={htmlFor}
          status={status}
          {...props.textareaProps}
        />
      )
    } else {
      control = (
        <SoulInput id={htmlFor} status={status} {...props.inputProps} />
      )
    }
  }

  return (
    <div
      className={['soul-field', tone !== 'none' ? `soul-field--${tone}` : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      {label && (
        <label className="soul-field__label" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {control}
      {message && tone !== 'none' && (
        <p
          className={[
            'soul-field__message',
            tone === 'error' ? 'soul-field__message--error' : '',
            tone === 'success' ? 'soul-field__message--success' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          role={tone === 'error' ? 'alert' : undefined}
        >
          {message}
        </p>
      )}
    </div>
  )
}
