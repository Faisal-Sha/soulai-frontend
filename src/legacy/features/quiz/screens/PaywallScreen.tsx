// PaywallScreen — FigJam PAYWALL / PURCHASE (frontend UX shell)
// Contextual section · plan compare · Stripe on live plan · cancel → result · exit → free mode

import { useEffect, useState } from 'react'
import PrimaryButton from '../atoms/PrimaryButton'
import {
  PAYWALL_COMPARE_TIERS,
  PAYWALL_RENEWAL_PRICE,
  PAYWALL_SINGLE_PLAN,
} from '../data/paywallPlans'
import type { PaywallPlanId } from '../types'
import type { PaywallContext } from './TeaserScreen'

interface PaywallScreenProps {
  onCheckout: (planId: PaywallPlanId) => void
  isProcessing?: boolean
  onFaqOpened?: (faqId: string) => void
  onGetPlanClicked?: (planId: PaywallPlanId, price: number) => void
  /** FigJam: contextual paywall under locked section */
  context?: PaywallContext | null
  /** Cancel → back to free result */
  onCancel?: () => void
  /** Exit → free mode */
  onExit?: () => void
}

const FAQ_ITEMS = [
  {
    q: 'What happens after 7 days?',
    a: 'After 7 days, your plan auto-renews at $6.99/month. You can cancel anytime before that — no questions asked.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, you can cancel anytime from your account settings or by emailing us. No penalties, no hidden fees.',
  },
  {
    q: "What if the reading doesn't feel accurate?",
    a: "We offer a 30-day money-back guarantee. If your reading doesn't feel right, email us and we'll refund you in full.",
  },
  {
    q: 'Is my data private?',
    a: 'Absolutely. Your data is encrypted, never shared, and never sold. Your answers are used only to generate your reading.',
  },
]

function scrollQuizToTop() {
  const shell = document.querySelector('.quiz-shell')
  if (shell instanceof HTMLElement) shell.scrollTop = 0
  window.scrollTo(0, 0)
}

export default function PaywallScreen({
  onCheckout,
  isProcessing = false,
  onFaqOpened,
  onGetPlanClicked,
  context = null,
  onCancel,
  onExit,
}: PaywallScreenProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedTierId, setSelectedTierId] = useState('fullAccess')
  const [dummyNote, setDummyNote] = useState<string | null>(null)

  const livePlan = PAYWALL_SINGLE_PLAN
  const selected = PAYWALL_COMPARE_TIERS.find(t => t.id === selectedTierId) ?? PAYWALL_COMPARE_TIERS[1]

  useEffect(() => {
    scrollQuizToTop()
    const t = requestAnimationFrame(() => scrollQuizToTop())
    return () => cancelAnimationFrame(t)
  }, [context?.sectionId])

  const handlePrimaryCta = () => {
    if (selected.checkoutPlanId) {
      onGetPlanClicked?.(selected.checkoutPlanId, livePlan.price)
      onCheckout(selected.checkoutPlanId)
      return
    }
    // FigJam: cancel / free preview → back to free RESULT (teaser), not website Home
    if (selected.id === 'preview') {
      onCancel?.()
      return
    }
    // Mentor+ and other shells stay on paywall — UI-only until wired
    setDummyNote(
      selected.dummyNote ??
        'Shell tier only — stays on paywall. Use Full Access for Stripe, or Exit → free mode / Cancel → teaser.',
    )
  }

  const contextLabel = context?.sectionLabel ?? 'YOUR FULL READING'
  const headlineFocus = context?.sectionTitle ?? 'I want depth — a plan'

  return (
    <div style={{ padding: '24px 0 40px' }}>
      <div style={{ textAlign: 'center', padding: '6px 0 18px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--accent)',
            background: 'var(--accent-soft)',
            padding: '5px 11px',
            borderRadius: 'var(--radius-pill)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Contextual paywall · {contextLabel}
        </div>
        <h1
          style={{
            fontFamily: 'var(--display)',
            fontSize: 28,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            marginBottom: 10,
          }}
        >
          {headlineFocus}
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)', padding: '0 8px' }}>
          Full Access = live Stripe. Free preview / Cancel = return to quiz teaser (not website Home).
          Mentor+ = shell only. Exit = free mode. Website Home (`/`) is the retention hub after login/pay.
        </p>
      </div>

      {/* FigJam: Choose plan / compare tiers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {PAYWALL_COMPARE_TIERS.map(tier => {
          const active = selectedTierId === tier.id
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => {
                setSelectedTierId(tier.id)
                setDummyNote(null)
              }}
              style={{
                textAlign: 'left',
                background: 'var(--card)',
                border: active ? '2.5px solid var(--accent)' : '1.5px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px 16px 14px',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: active ? '0 4px 20px rgba(93,75,224,0.18)' : 'none',
                fontFamily: 'inherit',
              }}
            >
              {tier.badge && (
                <span
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: 14,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: 8,
                    background: 'var(--accent)',
                    color: '#fff',
                  }}
                >
                  {tier.badge}
                </span>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {tier.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{tier.period}</div>
                </div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 26, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {tier.priceLabel}
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {tier.features.map(f => (
                  <li key={f} style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4, display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--accent)' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              {tier.dummyNote && (
                <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  {tier.dummyNote}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {dummyNote && (
        <div
          style={{
            marginBottom: 12,
            padding: '10px 12px',
            borderRadius: 12,
            background: 'var(--accent-soft)',
            color: 'var(--text-secondary)',
            fontSize: 13,
          }}
        >
          {dummyNote}
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <PrimaryButton onClick={handlePrimaryCta} variant="lavender" disabled={isProcessing}>
          {isProcessing
            ? 'Starting checkout…'
            : selected.checkoutPlanId
              ? `Checkout · $${livePlan.price.toFixed(2)} (Stripe)`
              : selected.id === 'preview'
                ? 'Stay free → back to teaser result'
                : 'Shell only — not checkout'}
        </PrimaryButton>
        {selected.checkoutPlanId && (
          <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
            ${livePlan.price.toFixed(2)} today · Then ${PAYWALL_RENEWAL_PRICE.toFixed(2)}/mo · Cancel anytime
          </div>
        )}
      </div>

      {/* FigJam: Cancel → result · Exit → free mode */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '12px',
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontFamily: 'var(--ui)',
            }}
          >
            Cancel → back to result
          </button>
        )}
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontFamily: 'var(--ui)',
            }}
          >
            Exit → free mode
          </button>
        )}
      </div>

      <section style={{ marginTop: 8, marginBottom: 14 }}>
        <h2
          style={{
            fontFamily: 'var(--display)',
            fontSize: 19,
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          Common questions
        </h2>
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className={`quiz-faq-item${openFaq === i ? ' open' : ''}`}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 7,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => {
                const opening = openFaq !== i
                setOpenFaq(opening ? i : null)
                if (opening) onFaqOpened?.(`faq-${i}`)
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: '13px 14px',
                fontFamily: 'var(--ui)',
                fontSize: 13.5,
                fontWeight: 600,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <span>{item.q}</span>
              <span>+</span>
            </button>
            {openFaq === i && (
              <div style={{ padding: '0 14px 13px', fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}
