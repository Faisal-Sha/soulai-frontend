interface KickerProps {
  children: React.ReactNode
}

export default function Kicker({ children }: KickerProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.08em',
        color: 'var(--accent)',
        textTransform: 'uppercase',
        marginBottom: 14,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 0 3px var(--accent-soft)',
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  )
}
