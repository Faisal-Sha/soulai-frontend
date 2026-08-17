interface ResultsScreenProps {
  leadId: string | null
  onPaywallClick: () => void
}

function NatalChart({ size = 220 }: { size?: number }) {
  const cx = size / 2
  const cy = size / 2
  const rings = [0.92, 0.74, 0.58, 0.42]
  const signs = 12
  const data = [0.72, 0.48, 0.85, 0.6, 0.38, 0.92, 0.55, 0.68, 0.82, 0.45, 0.7, 0.58]

  const points = data.map((d, i) => {
    const a = (i / signs) * Math.PI * 2 - Math.PI / 2
    const r = (size / 2) * 0.92 * d
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as [number, number]
  })
  const poly = points.map(p => p.join(',')).join(' ')

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label="Natal chart visualization"
      role="img"
    >
      <defs>
        <radialGradient id="ng-v2" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(93,75,224,0.18)" />
          <stop offset="100%" stopColor="rgba(93,75,224,0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={(size / 2) * 0.92} fill="url(#ng-v2)" />
      {rings.map(r => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={(size / 2) * r}
          stroke="var(--border)"
          strokeWidth="0.5"
          fill="none"
        />
      ))}
      {Array.from({ length: signs }).map((_, i) => {
        const a = (i / signs) * Math.PI * 2 - Math.PI / 2
        const x2 = cx + Math.cos(a) * (size / 2) * 0.92
        const y2 = cy + Math.sin(a) * (size / 2) * 0.92
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke="var(--border)"
            strokeWidth="0.5"
          />
        )
      })}
      <polygon
        points={poly}
        fill="var(--accent-soft)"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill="var(--accent)" />
      ))}
      {['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'].map((g, i) => {
        const a = (i / signs) * Math.PI * 2 - Math.PI / 2
        const r = (size / 2) * 0.99
        const x = cx + Math.cos(a) * r
        const y = cy + Math.sin(a) * r
        return (
          <text
            key={g}
            x={x}
            y={y}
            fill="var(--text-muted)"
            fontSize="9"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="var(--ui)"
          >
            {g}
          </text>
        )
      })}
      <circle cx={cx} cy={cy} r="3" fill="var(--accent)" />
    </svg>
  )
}

export default function ResultsScreen({ onPaywallClick }: ResultsScreenProps) {
  return (
    <div
      style={{
        padding: '60px 0 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Your reading · ready
        </div>
        <h1
          style={{
            fontFamily: 'var(--display)',
            fontSize: 30,
            fontWeight: 600,
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}
        >
          You are{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
            The Moonlit Cartographer
          </span>
        </h1>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.55,
            color: 'var(--text-muted)',
            marginTop: 10,
          }}
        >
          Life Path 7 · Cancer stellium · Anxious-Secure leaning
        </p>
      </div>

      {/* Natal chart */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
        <NatalChart size={240} />
      </div>

      {/* Key insight card */}
      <div
        style={{
          padding: '20px 22px',
          background: 'var(--card)',
          border: '1px solid var(--accent-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          One thing we saw
        </div>
        <p
          style={{
            fontFamily: 'var(--display)',
            fontSize: 20,
            lineHeight: 1.35,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          You confuse <span style={{ fontStyle: 'italic' }}>being needed</span> with being loved.
          Your Life Path 7 wants depth, but your patterns are optimized for performance.
        </p>
      </div>

      {/* Paywall CTA card */}
      <div
        style={{
          padding: '28px 22px 22px',
          background: 'var(--card)',
          border: '1px solid var(--accent-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          Unlock full reading
        </div>
        <p
          style={{
            fontFamily: 'var(--display)',
            fontSize: 22,
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            marginBottom: 18,
            marginTop: 0,
          }}
        >
          Your complete{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
            natal + attachment
          </span>{' '}
          map, plus daily AI coaching.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {[
            'Full 40-page natal + numerology reading',
            'Unlimited AI coach conversations',
            'Daily rituals tuned to your chart',
            'Compatibility scanner for any partner',
          ].map(f => (
            <div
              key={f}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 14,
                color: 'var(--text-secondary)',
              }}
            >
              <span style={{ color: 'var(--accent)', fontSize: 12 }}>✦</span>
              {f}
            </div>
          ))}
        </div>

        <button
          onClick={onPaywallClick}
          aria-label="Start 7-day free trial"
          className="quiz-btn-primary"
          style={{
            width: '100%',
            padding: '15px 24px',
            background: 'var(--accent)',
            color: 'var(--text-inverse)',
            border: 'none',
            borderRadius: 'var(--radius-pill)',
            fontFamily: 'var(--ui)',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            minHeight: 50,
          }}
        >
          Start 7-day free trial
        </button>

        <div
          style={{
            textAlign: 'center',
            marginTop: 10,
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          Cancel anytime · 14k+ readings this week
        </div>
      </div>
    </div>
  )
}
