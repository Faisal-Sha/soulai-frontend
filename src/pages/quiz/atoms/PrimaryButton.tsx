interface PrimaryButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'lavender' | 'gold'
  'aria-label'?: string
}

export default function PrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'lavender',
  'aria-label': ariaLabel,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={`quiz-btn-primary${variant === 'gold' ? ' btn-gold' : ''}`}
      style={isDisabled ? {
        background: 'var(--border)',
        boxShadow: 'none',
        color: 'var(--text-dim)',
        cursor: 'not-allowed',
        opacity: 0.5,
      } : undefined}
    >
      {loading ? 'Loading…' : children}
    </button>
  )
}
