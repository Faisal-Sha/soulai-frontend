interface SoulStarProps {
  size?: number
  animate?: boolean
  style?: React.CSSProperties
}

// SoulStar is kept as a small decorative icon for use in lists and inline contexts.
// The main blob illustrations use CSS blob-morph animation directly.
export default function SoulStar({ size = 14, animate = false, style }: SoulStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{
        animation: animate ? 'soul-pulse 2s ease-in-out infinite' : 'none',
        flexShrink: 0,
        color: 'var(--accent)',
        ...style,
      }}
    >
      <path
        d="M12 1 L13.2 10.8 L23 12 L13.2 13.2 L12 23 L10.8 13.2 L1 12 L10.8 10.8 Z"
        fill="currentColor"
      />
    </svg>
  )
}
