import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulNav, SoulRippleBg } from '@/components/soul'
import { useCopy } from '@/i18n'
import { AddToHomeSheet } from '@/pages/home/AddToHomeSheet'
import { useSoulSheetParams } from '@/pages/home/useSoulSheetParams'
import './soul-account.css'
import iconArrowLight from '../readings/assets/icon-arrow-light.svg'
import iconChevron from './assets/icon-chevron.svg'
import iconBack from '../people/assets/icon-chevron.svg'
import markHero from '@/components/soul/assets/mark-hero.svg'

type Frequency = 'gentle' | 'balanced' | 'deep'

const FREQUENCY: {
  id: Frequency
  title: string
  meta: string
}[] = [
  { id: 'gentle', title: 'Gentle', meta: 'Most mornings' },
  { id: 'balanced', title: 'Balanced', meta: 'Most mornings' },
  {
    id: 'deep',
    title: 'Deep journey',
    meta: 'Every day, plus a nudge in the evening',
  },
]

/**
 * Figma WIP · Account · Notifications (818:3719)
 * Blocked install banner: Account · Notifications · Blocked (824:3849) via `?blocked=1`
 */
export function SoulAccountNotificationsScreen() {
  const navigate = useNavigate()
  const t = useCopy()
  const [params] = useSearchParams()
  const blocked = params.get('blocked') === '1' || params.get('blocked') === 'true'

  const [frequency, setFrequency] = useState<Frequency>('balanced')
  const [morningNote, setMorningNote] = useState(true)
  const [nudges, setNudges] = useState(true)
  const [morningTime] = useState('08:00')
  const [quietHours] = useState('22:00. 08:00')
  const { installOpen, openInstall, closeInstall } = useSoulSheetParams()

  const frequencyLabel = useMemo(() => {
    const row = FREQUENCY.find((f) => f.id === frequency)
    if (!row) return t('account.notifications.balancedLine', 'Balanced · most mornings')
    const title = t(`account.notifications.${row.id}`, row.title)
    const meta = t(`account.notifications.${row.id}Meta`, row.meta)
    return t('account.notifications.frequencyLine', `${title} · ${meta.toLowerCase()}`, {
      title,
      meta: meta.toLowerCase(),
    })
  }, [frequency, t])

  // Keep Full card copy in sync when returning (session only)
  useEffect(() => {
    try {
      sessionStorage.setItem('soul-account-notifications-line', frequencyLabel)
    } catch {
      /* ignore */
    }
  }, [frequencyLabel])

  const settingsDisabled = blocked

  return (
    <div
      className="soul-account"
      data-name={blocked ? 'Account · Notifications · Blocked' : 'Account · Notifications'}
    >
      <SoulRippleBg className="soul-account__bg" />
      <div className="soul-account__scrim" aria-hidden="true" />
      <div className="soul-account__dock-scrim" aria-hidden="true" />

      <div className="soul-account__scroll">
        <header className="soul-account__header soul-account__header--back">
          <div className="soul-account__header-left">
            <button
              type="button"
              className="soul-account__back"
              onClick={() => navigate('/account')}
              aria-label={t('account.backAria', 'Back to account')}
            >
              <img src={iconBack} alt="" width={22} height={22} />
            </button>
            <SoulBrand />
          </div>
          <div className="soul-account__header-nav" aria-label={t('account.desktopNavAria', 'Desktop navigation')}>
            <SoulNav variant="desktop" />
          </div>
        </header>

        <section className="soul-account__intro" aria-labelledby="soul-account-notif-title">
          <h1 id="soul-account-notif-title" className="soul-account__title">
            {t('account.notifications.title', 'Notifications')}
          </h1>
          <p className="soul-account__subtitle">
            {t(
              'account.notifications.subtitle',
              'You decide how often I show up. I would rather be useful once a week than ignored every day.',
            )}
          </p>
        </section>

        <div className="soul-account__stack">
          {blocked ? (
            <article className="soul-account__install">
              <div className="soul-account__install-icon" aria-hidden="true">
                <img src={markHero} alt="" width={28} height={28} />
              </div>
              <div className="soul-account__install-body">
                <p className="soul-account__install-title">
                  {t('account.notifications.blockedTitle', 'Notifications are off')}
                </p>
                <p className="soul-account__install-copy">
                  {t(
                    'account.notifications.blockedCopy',
                    'On iPhone I can only reach you once SOUL+AI is on your home screen. It takes two taps.',
                  )}
                </p>
                <button
                  type="button"
                  className="soul-account__install-link"
                  onClick={openInstall}
                >
                  {t('account.notifications.how', 'Show me how')}
                  <img src={iconArrowLight} alt="" width={14} height={14} />
                </button>
              </div>
            </article>
          ) : null}

          <div
            className={`soul-account__section${settingsDisabled ? ' soul-account__section--dim' : ''}`}
          >
            <p className="soul-account__section-label">{t('account.notifications.howOften', 'How often')}</p>
            <div className="soul-account__freq" role="radiogroup" aria-label={t('account.notifications.howOften', 'How often')}>
              {FREQUENCY.map((opt) => {
                const selected = frequency === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={settingsDisabled}
                    className={`soul-account__freq-card${
                      selected ? ' soul-account__freq-card--selected' : ''
                    }`}
                    onClick={() => setFrequency(opt.id)}
                  >
                    <span className="soul-account__freq-title">
                      {t(`account.notifications.${opt.id}`, opt.title)}
                    </span>
                    <span className="soul-account__freq-meta">
                      {t(`account.notifications.${opt.id}Meta`, opt.meta)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div
            className={`soul-account__section${settingsDisabled ? ' soul-account__section--dim' : ''}`}
          >
            <p className="soul-account__section-label">{t('account.notifications.whatISend', 'What I send')}</p>
            <div className="soul-account__card soul-account__card--rows">
              <div className="soul-account__toggle-row">
                <span className="soul-account__row-text">
                  <span className="soul-account__row-label">{t('account.notifications.morningNote', 'Your morning note')}</span>
                  <span className="soul-account__row-hint">
                    {t('account.notifications.morningHint', 'The one thing I noticed for today')}
                  </span>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={morningNote}
                  disabled={settingsDisabled}
                  className={`soul-account__switch${morningNote ? ' soul-account__switch--on' : ''}`}
                  onClick={() => setMorningNote((v) => !v)}
                  aria-label={t('account.notifications.morningNote', 'Your morning note')}
                >
                  <span className="soul-account__switch-knob" />
                </button>
              </div>
              <hr className="soul-account__hairline" />
              <div className="soul-account__toggle-row">
                <span className="soul-account__row-text">
                  <span className="soul-account__row-label">{t('account.notifications.nudges', 'Nudges')}</span>
                  <span className="soul-account__row-hint">
                    {t('account.notifications.nudgesHint', 'When a conversation is left open')}
                  </span>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={nudges}
                  disabled={settingsDisabled}
                  className={`soul-account__switch${nudges ? ' soul-account__switch--on' : ''}`}
                  onClick={() => setNudges((v) => !v)}
                  aria-label={t('account.notifications.nudges', 'Nudges')}
                >
                  <span className="soul-account__switch-knob" />
                </button>
              </div>
            </div>
          </div>

          <div
            className={`soul-account__section soul-account__section--when${
              settingsDisabled ? ' soul-account__section--dim' : ''
            }`}
          >
            <p className="soul-account__section-label">{t('account.notifications.when', 'When')}</p>
            <div className="soul-account__card soul-account__card--rows">
              <button
                type="button"
                className="soul-account__row soul-account__row--billing"
                disabled={settingsDisabled}
                onClick={() => toast.message(t('account.notifications.timeSoon', 'Time picker coming soon'))}
              >
                <span className="soul-account__row-label soul-account__row-label--grow">
                  {t('account.notifications.morningTime', 'Morning note')}
                </span>
                <span className="soul-account__row-amount">{morningTime}</span>
                <img
                  className="soul-account__row-chevron"
                  src={iconChevron}
                  alt=""
                  width={16}
                  height={16}
                />
              </button>
              <hr className="soul-account__hairline" />
              <button
                type="button"
                className="soul-account__row soul-account__row--billing"
                disabled={settingsDisabled}
                onClick={() => toast.message(t('account.notifications.quietSoon', 'Quiet hours coming soon'))}
              >
                <span className="soul-account__row-label soul-account__row-label--grow">
                  {t('account.notifications.quietHours', 'Quiet hours')}
                </span>
                <span className="soul-account__row-amount">{quietHours}</span>
                <img
                  className="soul-account__row-chevron"
                  src={iconChevron}
                  alt=""
                  width={16}
                  height={16}
                />
              </button>
            </div>
            <button
              type="button"
              className="soul-account__footnote soul-account__footnote--btn"
              onClick={openInstall}
            >
              {t(
                'account.notifications.iphoneFoot',
                'On iPhone, notifications only work once SOUL+AI is added to your home screen.',
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="soul-account__nav soul-account__nav--mobile">
        <SoulNav />
      </div>

      <AddToHomeSheet open={installOpen} onClose={closeInstall} />
    </div>
  )
}
