import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SoulBrand, SoulButton } from '@/components/soul'
import { SoulLangSwitch, useCopy } from '@/i18n'
import {
  PAYWALL_INTRO_PRICE,
  PAYWALL_RENEWAL_PRICE,
  PAYWALL_SINGLE_PLAN,
} from '../data/paywallPlans'
import type { PaywallPlanId } from '../types'
import '../quiz-paywall.css'
import bgPaywall from '../assets/onboarding/bg-paywall.png'
import iconCheckFilled from '../assets/onboarding/icon-check-filled.svg'
import iconShield from '../assets/onboarding/icon-shield-check.svg'
import iconStar from '../assets/onboarding/icon-star-gold.svg'
import iconChevron from '../assets/onboarding/icon-chevron-down.svg'

const FEATURE_IDS = ['profile', 'mentor', 'compat', 'daily', 'steps'] as const
const STAT_IDS = ['profiles', 'accurate', 'rating'] as const

const FEATURES = [
  {
    title: 'Your full profile',
    body: 'A deep, honest read on who you really are',
  },
  {
    title: 'Your AI mentor',
    body: 'Ask me anything about your life, and I answer based on you, to help you actually move forward',
  },
  {
    title: 'Compatibility',
    body: 'See how you truly match with any partner, friend, or family member',
  },
  {
    title: 'Daily insight',
    body: 'Every morning, a short note on what today asks of you',
  },
  {
    title: 'Action steps',
    body: 'Clear next moves made for your nature, not generic advice',
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
    a: 'Yes. Cancel anytime from your profile. One tap. No penalties, no hidden fees.',
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
  const t = useCopy()
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
            <SoulLangSwitch />
          </header>

          <div className="soul-pw__offer">
            <section className="soul-pw__hero">
              <h1 className="soul-pw__title">{t('quiz.paywall.title', 'Everything opens right now!')}</h1>
              <p className="soul-pw__body">
                {t(
                  'quiz.paywall.body1',
                  'Your full profile. Everything about you and your patterns, your behavior models and recommendations, your personal mentor, your notes every morning.',
                )}
              </p>
              <p className="soul-pw__body">
                {t('quiz.paywall.body2', 'All of it opens the moment you tap.')}
              </p>
              <p className="soul-pw__body">
                {t('quiz.paywall.body3', "Nobody's forcing you. But honestly. You should try this!")}
              </p>
            </section>

            <article className="soul-pw__card">
              <div className="soul-pw__price-head">
                <h2 className="soul-pw__card-title">{t('quiz.paywall.planTitle', '7-Day Full Access')}</h2>
                <p className="soul-pw__card-sub">
                  {t('quiz.paywall.planSub', 'Everything I have to say about you')}
                </p>
              </div>
              <div className="soul-pw__price-row">
                <span className="soul-pw__price">{priceLabel}</span>
                <span className="soul-pw__price-then">
                  {t('quiz.paywall.thenMo', `then ${renewalLabel}/mo`, { price: renewalLabel })}
                </span>
              </div>
              <hr className="soul-pw__rule" />
              <p className="soul-pw__gets">{t('quiz.paywall.gets', 'What you get today:')}</p>
              <ul className="soul-pw__features">
                {FEATURES.map((item, i) => (
                  <li key={item.title} className="soul-pw__feature">
                    <div className="soul-pw__feature-head">
                      <span className="soul-pw__feature-icon" aria-hidden="true">
                        <img src={iconCheckFilled} alt="" width={16} height={16} />
                      </span>
                      <p className="soul-pw__feature-title">
                        {t(`quiz.paywall.features.${FEATURE_IDS[i]}.title`, item.title)}
                      </p>
                    </div>
                    <p className="soul-pw__feature-body">
                      {t(`quiz.paywall.features.${FEATURE_IDS[i]}.body`, item.body)}
                    </p>
                  </li>
                ))}
              </ul>
            </article>

            <div className="soul-pw__guarantee">
              <img className="soul-pw__shield" src={iconShield} alt="" aria-hidden="true" />
              <p>
                {t(
                  'quiz.paywall.guarantee',
                  "30-day money-back guarantee. If your profile doesn't feel like you, email us in the first 30 days for a full refund.",
                )}
              </p>
            </div>

            <div className="soul-pw__cta">
              <SoulButton
                block
                disabled={isProcessing}
                onClick={handleCheckout}
                aria-label={t('quiz.paywall.cta', `Start my 7 days for ${priceLabel}`, {
                  price: priceLabel,
                })}
              >
                {isProcessing
                  ? t('quiz.paywall.starting', 'Starting checkout…')
                  : t('quiz.paywall.cta', `Start my 7 days for ${priceLabel}`, {
                      price: priceLabel,
                    })}
              </SoulButton>
              <p className="soul-pw__cta-sub">
                {t(
                  'quiz.paywall.ctaSub',
                  `${priceLabel} today · Then ${renewalLabel}/month · Cancel anytime`,
                  { intro: priceLabel, renewal: renewalLabel },
                )}
              </p>
            </div>
          </div>

          <div className="soul-pw__aside">
            <section className="soul-pw__social" aria-label={t('quiz.paywall.reviewsAria', 'Reviews')} aria-roledescription="carousel">
              <div className="soul-pw__carousel">
                <article
                  key={activeReview.author}
                  className="soul-pw__quote soul-pw__quote--active"
                  aria-live="polite"
                >
                  <div
                    className="soul-pw__stars"
                    aria-label={t(
                      'quiz.paywall.starsAria',
                      `${activeReview.stars} out of 5 stars`,
                      { stars: activeReview.stars },
                    )}
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
                  <p className="soul-pw__quote-text">
                    {t(`quiz.paywall.testimonials.${reviewIdx + 1}.quote`, activeReview.quote)}
                  </p>
                  <p className="soul-pw__quote-author">
                    {t(`quiz.paywall.testimonials.${reviewIdx + 1}.author`, activeReview.author)}
                  </p>
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
                  <p className="soul-pw__quote-text">
                    {t(
                      `quiz.paywall.testimonials.${((reviewIdx + 1) % TESTIMONIALS.length) + 1}.quote`,
                      nextReview.quote,
                    )}
                  </p>
                  <p className="soul-pw__quote-author">
                    {t(
                      `quiz.paywall.testimonials.${((reviewIdx + 1) % TESTIMONIALS.length) + 1}.author`,
                      nextReview.author,
                    )}
                  </p>
                </article>
              </div>
              <div className="soul-pw__dots" role="tablist" aria-label={t('quiz.paywall.reviewPagesAria', 'Review pages')}>
                {TESTIMONIALS.map((item, i) => (
                  <button
                    key={item.author}
                    type="button"
                    role="tab"
                    aria-selected={i === reviewIdx}
                    aria-label={t('quiz.paywall.reviewN', `Review ${i + 1}`, { n: i + 1 })}
                    className={`soul-pw__dot${i === reviewIdx ? ' is-active' : ''}`}
                    onClick={() => setReviewIdx(i)}
                  />
                ))}
              </div>
            </section>

            <section className="soul-pw__stats" aria-label={t('quiz.paywall.statsAria', 'Social proof stats')}>
              {STATS.map((stat, i) => (
                <div key={stat.label} className="soul-pw__stat">
                  <p className="soul-pw__stat-value">{stat.value}</p>
                  <p className="soul-pw__stat-label">
                    {t(`quiz.paywall.stats.${STAT_IDS[i]}`, stat.label)}
                  </p>
                </div>
              ))}
            </section>

            <section className="soul-pw__faq">
              <h2 className="soul-pw__faq-title">{t('quiz.paywall.faqTitle', 'Common Questions')}</h2>
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
                        <span>{t(`quiz.paywall.faq.${i}.q`, item.q)}</span>
                        <img
                          className="soul-pw__faq-chevron"
                          src={iconChevron}
                          alt=""
                          aria-hidden="true"
                        />
                      </button>
                      {open ? (
                        <p className="soul-pw__faq-a">{t(`quiz.paywall.faq.${i}.a`, item.a)}</p>
                      ) : null}
                      <hr className="soul-pw__faq-rule" />
                    </div>
                  )
                })}
              </div>
            </section>

            <footer className="soul-pw__footer">
              <p>
                {t(
                  'quiz.paywall.legal',
                  `You'll be charged ${priceLabel} today for 7 days of full access. After 7 days it renews at ${renewalLabel} per month until cancelled. Cancel any time in your profile. By continuing you agree to our`,
                  { intro: priceLabel, renewal: renewalLabel },
                )}{' '}
                <Link to="/terms" target="_blank" rel="noopener noreferrer">
                  {t('quiz.paywall.terms', 'Terms')}
                </Link>{' '}
                {t('quiz.paywall.and', 'and')}{' '}
                <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                  {t('quiz.paywall.privacy', 'Privacy Policy')}
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
