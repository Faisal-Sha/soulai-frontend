import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SoulBrand, SoulButton } from '@/components/soul'
import {
  PAYWALL_INTRO_PRICE,
  PAYWALL_RENEWAL_PRICE,
  PAYWALL_SINGLE_PLAN,
} from '../data/paywallPlans'
import type { PaywallPlanId } from '../types'
import '../quiz-paywall.css'
import bgPaywall from '../assets/onboarding/bg-paywall.png'
import iconCheckFilled from '../assets/onboarding/icon-check-filled.svg'
import iconCheckOutline from '../assets/onboarding/icon-check-outline.svg'
import iconShield from '../assets/onboarding/icon-shield-check.svg'
import iconStar from '../assets/onboarding/icon-star-gold.svg'
import iconChevron from '../assets/onboarding/icon-chevron-down.svg'

const TIMELINE = [
  {
    title: 'Today',
    body: 'Your full profile, the chat, daily notes, all open.',
    active: true,
  },
  {
    title: 'Day 5',
    body: 'I email you before the trial ends. No surprises.',
    active: false,
  },
  {
    title: 'Day 7',
    body: "Your subscription begins, unless you've cancelled. One tap in your profile.",
    active: false,
  },
  {
    title: 'After that',
    body: 'I keep writing. A short note each morning, a new deep section each month, and the chat stays open.',
    active: false,
  },
] as const

const TESTIMONIALS = [
  {
    quote:
      "I've read a lot of these. This one put words to the thing about myself I've never been able to explain to anyone.",
    author: 'Elena R. · October 2025',
    stars: 5,
  },
  {
    quote:
      'Described him before I met him. Three months later, I went on a date with someone who matched almost every part of it.',
    author: 'Maya K. · September 2025',
    stars: 5,
  },
  {
    quote:
      "I kept waiting for the vague, one-size-fits-all part. It never came. Felt like it was written for me.",
    author: 'Jordan P. · November 2025',
    stars: 4,
  },
] as const

const STATS = [
  { value: '119K+', label: 'Profiles created' },
  { value: '91%', label: 'Say it is accurate' },
  { value: '4.8', label: 'Average rating' },
] as const

const FAQ_ITEMS = [
  {
    id: 'faq-0',
    q: 'What happens after 7 days?',
    a: 'Your subscription renews at $6.99/month. I email you on Day 5, so nothing catches you off guard.',
  },
  {
    id: 'faq-1',
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel anytime from your profile — one tap. No penalties, no hidden fees.',
  },
  {
    id: 'faq-2',
    q: "What if the reading doesn't feel accurate?",
    a: "30-day money-back guarantee. If it doesn't feel like you, email us in the first 30 days for a full refund.",
  },
  {
    id: 'faq-3',
    q: 'Is my data private?',
    a: 'Yes. Your data is encrypted, never shared, and never sold. Answers are used only to generate your reading.',
  },
] as const

interface QuizPaywallScreenProps {
  onCheckout: (planId: PaywallPlanId) => void
  isProcessing?: boolean
  onFaqOpened?: (faqId: string) => void
  onGetPlanClicked?: (planId: PaywallPlanId, price: number) => void
}

/**
 * Figma DEV · 05.1 · Paywall (node 437:3238)
 * Mobile: stacked scroll. Desktop: 2-column offer + social/FAQ.
 */
export default function QuizPaywallScreen({
  onCheckout,
  isProcessing = false,
  onFaqOpened,
  onGetPlanClicked,
}: QuizPaywallScreenProps) {
  const [openFaq, setOpenFaq] = useState(0)
  const [reviewIdx, setReviewIdx] = useState(0)
  const plan = PAYWALL_SINGLE_PLAN
  const priceLabel = `$${PAYWALL_INTRO_PRICE.toFixed(2)}`
  const renewalLabel = `$${PAYWALL_RENEWAL_PRICE.toFixed(2)}`

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setReviewIdx((i) => (i + 1) % TESTIMONIALS.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [])

  const handleCheckout = () => {
    onGetPlanClicked?.(plan.id, plan.price)
    onCheckout(plan.id)
  }

  const activeReview = TESTIMONIALS[reviewIdx]
  const nextReview = TESTIMONIALS[(reviewIdx + 1) % TESTIMONIALS.length]

  return (
    <div className="soul-pw" data-name="05.1 · Paywall">
      <div className="soul-pw__bg" aria-hidden="true">
        <img className="soul-pw__bg-img" src={bgPaywall} alt="" />
        <div className="soul-pw__bg-dim" />
      </div>

      <div className="soul-pw__frame">
        <div className="soul-pw__scrim" aria-hidden="true" />

        <div className="soul-pw__content">
          <header className="soul-pw__header">
            <SoulBrand />
          </header>

          <div className="soul-pw__offer">
            <section className="soul-pw__hero">
              <h1 className="soul-pw__title">Everything opens right now!</h1>
              <p className="soul-pw__body">
                Your full profile — everything about you and your patterns, your
                behavior models and recommendations, your personal mentor, your
                notes every morning.
              </p>
              <p className="soul-pw__body">All of it opens the moment you tap.</p>
              <p className="soul-pw__body">
                Nobody&apos;s forcing you. But honestly — you should try this!
              </p>
            </section>

            <article className="soul-pw__card">
              <div className="soul-pw__price-head">
                <h2 className="soul-pw__card-title">7-Day Full Access</h2>
                <p className="soul-pw__card-sub">Everything I have to say about you</p>
              </div>
              <div className="soul-pw__price-row">
                <span className="soul-pw__price">{priceLabel}</span>
                <span className="soul-pw__price-then">then {renewalLabel}/mo</span>
              </div>
              <hr className="soul-pw__rule" />
              <ol className="soul-pw__timeline">
                {TIMELINE.map((step) => (
                  <li
                    key={step.title}
                    className={`soul-pw__step${step.active ? ' soul-pw__step--active' : ''}`}
                  >
                    <span className="soul-pw__step-icon" aria-hidden="true">
                      <img
                        src={step.active ? iconCheckFilled : iconCheckOutline}
                        alt=""
                      />
                    </span>
                    <div className="soul-pw__step-copy">
                      <p className="soul-pw__step-title">{step.title}</p>
                      <p className="soul-pw__step-body">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            <div className="soul-pw__guarantee">
              <img className="soul-pw__shield" src={iconShield} alt="" aria-hidden="true" />
              <p>
                30-day money-back guarantee. If your profile doesn&apos;t feel like
                you, email us in the first 30 days for a full refund.
              </p>
            </div>

            <div className="soul-pw__cta">
              <SoulButton
                block
                disabled={isProcessing}
                onClick={handleCheckout}
                aria-label={`Start my 7 days — ${priceLabel}`}
              >
                {isProcessing ? 'Starting checkout…' : `Start my 7 days — ${priceLabel}`}
              </SoulButton>
              <p className="soul-pw__cta-sub">
                {priceLabel} today · Then {renewalLabel}/month · Cancel anytime
              </p>
            </div>
          </div>

          <div className="soul-pw__aside">
            <section className="soul-pw__social" aria-label="Reviews" aria-roledescription="carousel">
              <div className="soul-pw__carousel">
                <article
                  key={activeReview.author}
                  className="soul-pw__quote soul-pw__quote--active"
                  aria-live="polite"
                >
                  <div
                    className="soul-pw__stars"
                    aria-label={`${activeReview.stars} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, s) => (
                      <img
                        key={s}
                        src={iconStar}
                        alt=""
                        width={14}
                        height={14}
                        className={s < activeReview.stars ? undefined : 'soul-pw__star--dim'}
                      />
                    ))}
                  </div>
                  <p className="soul-pw__quote-text">{activeReview.quote}</p>
                  <p className="soul-pw__quote-author">{activeReview.author}</p>
                </article>
                <article className="soul-pw__quote soul-pw__quote--peek" aria-hidden="true">
                  <div className="soul-pw__stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <img
                        key={s}
                        src={iconStar}
                        alt=""
                        width={14}
                        height={14}
                        className={s < nextReview.stars ? undefined : 'soul-pw__star--dim'}
                      />
                    ))}
                  </div>
                  <p className="soul-pw__quote-text">{nextReview.quote}</p>
                  <p className="soul-pw__quote-author">{nextReview.author}</p>
                </article>
              </div>
              <div className="soul-pw__dots" role="tablist" aria-label="Review pages">
                {TESTIMONIALS.map((item, i) => (
                  <button
                    key={item.author}
                    type="button"
                    role="tab"
                    aria-selected={i === reviewIdx}
                    aria-label={`Review ${i + 1}`}
                    className={`soul-pw__dot${i === reviewIdx ? ' is-active' : ''}`}
                    onClick={() => setReviewIdx(i)}
                  />
                ))}
              </div>
            </section>

            <section className="soul-pw__stats" aria-label="Social proof stats">
              {STATS.map((stat) => (
                <div key={stat.label} className="soul-pw__stat">
                  <p className="soul-pw__stat-value">{stat.value}</p>
                  <p className="soul-pw__stat-label">{stat.label}</p>
                </div>
              ))}
            </section>

            <section className="soul-pw__faq">
              <h2 className="soul-pw__faq-title">Common Questions</h2>
              <div className="soul-pw__faq-list">
                {FAQ_ITEMS.map((item, i) => {
                  const open = openFaq === i
                  return (
                    <div key={item.id} className={`soul-pw__faq-item${open ? ' is-open' : ''}`}>
                      <button
                        type="button"
                        className="soul-pw__faq-q"
                        aria-expanded={open}
                        onClick={() => {
                          const next = open ? -1 : i
                          setOpenFaq(next)
                          if (!open) onFaqOpened?.(item.id)
                        }}
                      >
                        <span>{item.q}</span>
                        <img
                          className="soul-pw__faq-chevron"
                          src={iconChevron}
                          alt=""
                          aria-hidden="true"
                        />
                      </button>
                      {open ? <p className="soul-pw__faq-a">{item.a}</p> : null}
                      <hr className="soul-pw__faq-rule" />
                    </div>
                  )
                })}
              </div>
            </section>

            <footer className="soul-pw__footer">
              <p>
                You&apos;ll be charged {priceLabel} today for 7 days of full access.
                After 7 days it renews at {renewalLabel} per month until cancelled.
                Cancel any time in your profile. By continuing you agree to our{' '}
                <Link to="/terms" target="_blank" rel="noopener noreferrer">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Link>
                .
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
