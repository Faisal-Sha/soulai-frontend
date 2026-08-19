interface PaywallModalProps {
  open: boolean
  onClose: () => void
}

export default function PaywallModal({ open, onClose }: PaywallModalProps) {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'rgba(10, 6, 18, 0.85)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          background: 'linear-gradient(160deg, #0a0612 0%, #140c1f 100%)',
          border: '0.5px solid rgba(217,180,115,0.35)',
          borderRadius: 20,
          padding: '36px 28px 28px',
          maxWidth: 360,
          width: '100%',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        {/* Gold aura */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,180,115,0.2) 0%, transparent 70%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.2em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Soul + AI
        </div>

        <p
          style={{
            fontFamily: 'var(--display)',
            fontSize: 22,
            fontWeight: 400,
            lineHeight: 1.35,
            color: 'var(--fg)',
            margin: '0 0 28px',
            letterSpacing: '-0.01em',
          }}
        >
          Your full reading is being written.{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
            We'll email it to you in the next few hours.
          </span>
        </p>

        {/* TODO(pricing-ticket): wire Stripe/Paddle checkout here */}

        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: '100%',
            padding: '16px 24px',
            background: 'rgba(217,180,115,0.12)',
            border: '0.5px solid rgba(217,180,115,0.4)',
            borderRadius: 999,
            fontFamily: 'var(--ui)',
            fontSize: 14,
            color: 'var(--accent)',
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
        >
          Got it
        </button>
      </div>
    </div>
  )
}
