// Upsell A — Pre-Checkout Tier Upgrade Modal (disabled in quiz flow — preserved for re-enable)

import PrimaryButton from '../atoms/PrimaryButton'

interface UpsellAModalProps {
  onAccept: () => void
  onDecline: () => void
  isProcessing?: boolean
}

// Legacy plan copy — kept for when upsell is re-enabled
const LEGACY_TRIAL = { name: '1-Week Trial', price: 9.99, perDay: '1.43' }
const LEGACY_POPULAR = { name: '4-Week Plan', price: 29.99, perDay: '1.07' }

// Only show the key differentiators — not the full feature list
const UPGRADE_HIGHLIGHTS = [
  '3 compatibility readings',
  '3 deep matrix readings',
  '10 AI chat questions',
]

export default function UpsellAModal({ onAccept, onDecline, isProcessing = false }: UpsellAModalProps) {
  const trial = LEGACY_TRIAL
  const popular = LEGACY_POPULAR

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Upgrade your plan"
    >
      <div
        style={{
          background: 'var(--bg)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 18px 18px',
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          animation: 'slideUp 260ms var(--ease) both',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onDecline}
          disabled={isProcessing}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'var(--card)',
            color: 'var(--text-muted)',
            fontSize: 16,
            lineHeight: 1,
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          ×
        </button>

        {/* Header — compact */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 10, fontWeight: 700, color: 'var(--accent)',
            background: 'var(--accent-soft)', padding: '3px 9px',
            borderRadius: 'var(--radius-pill)', letterSpacing: '0.06em',
            textTransform: 'uppercase', marginBottom: 8,
          }}>
            ✦ Before you go
          </div>
          <h2 style={{
            fontFamily: 'var(--display)', fontSize: 18, fontWeight: 600,
            color: 'var(--text-primary)', letterSpacing: '-0.02em',
            lineHeight: 1.2, margin: 0,
          }}>
            Get 3× more for <span style={{ color: 'var(--accent)' }}>$20 extra</span>
          </h2>
        </div>

        {/* Horizontal plan comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'stretch', marginBottom: 14 }}>

          {/* Trial — dimmed */}
          <div style={{
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            padding: '12px 10px', background: 'var(--card)', opacity: 0.6,
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your pick
            </div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
              {trial.name}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
              ${trial.price.toFixed(2)}
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>
              ${trial.perDay}/day · 3 AI questions
            </div>
          </div>

          {/* VS divider */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
            padding: '0 2px',
          }}>
            vs
          </div>

          {/* 4-Week — highlighted */}
          <div style={{
            border: '2px solid var(--accent)', borderRadius: 'var(--radius-md)',
            padding: '12px 10px',
            background: 'linear-gradient(160deg, rgba(93,75,224,0.10) 0%, var(--card) 80%)',
            position: 'relative', display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            {/* Badge */}
            <div style={{
              position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)',
              background: 'var(--accent)', color: '#fff', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '2px 8px', borderRadius: 'var(--radius-pill)', whiteSpace: 'nowrap',
            }}>
              ★ Recommended
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>
              Upgrade to
            </div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
              {popular.name}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
              ${popular.price.toFixed(2)}
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-secondary)', marginTop: 2 }}>
              ${popular.perDay}/day · 10 AI questions
            </div>
          </div>
        </div>

        {/* What you get extra — compact pill list */}
        <div style={{
          background: 'var(--accent-soft)', borderRadius: 'var(--radius-md)',
          padding: '10px 12px', marginBottom: 14,
          display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center',
        }}>
          <div style={{ width: '100%', fontSize: 10.5, fontWeight: 600, color: 'var(--accent)', textAlign: 'center', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Also included in 4-Week
          </div>
          {UPGRADE_HIGHLIGHTS.map((h, i) => (
            <div key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 11.5, color: 'var(--text-primary)', fontWeight: 500,
              background: 'var(--card)', border: '1px solid var(--accent-border)',
              borderRadius: 'var(--radius-pill)', padding: '3px 9px',
            }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 10 }}>✓</span>
              {h}
            </div>
          ))}
        </div>

        {/* Accept CTA */}
        <div style={{ marginBottom: 8 }}>
          <PrimaryButton onClick={onAccept} variant="lavender" disabled={isProcessing}>
            {isProcessing ? 'Starting checkout…' : `Upgrade to 4-Week — $${popular.price.toFixed(2)}`}
          </PrimaryButton>
        </div>

        {/* Decline */}
        <button
          onClick={onDecline}
          disabled={isProcessing}
          style={{
            width: '100%', background: 'none', border: 'none',
            fontSize: 12.5, color: 'var(--text-muted)',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            padding: '6px 0', textDecoration: 'underline', textUnderlineOffset: 2,
          }}
        >
          No thanks, keep my 1-Week Trial
        </button>

      </div>
    </div>
  )
}
