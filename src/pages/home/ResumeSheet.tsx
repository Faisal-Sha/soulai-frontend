import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { SoulButton } from '@/components/soul'
import { useCopy } from '@/i18n'
import type { ResumeSheetMode } from './useSoulSheetParams'
import './soul-home.css'
import iconBack from './assets/icon-sheet-back.svg'
import iconCard from './assets/icon-card.svg'
import iconSelected from './assets/icon-selected.svg'
import iconApplePay from './assets/icon-apple-pay.svg'
import iconAddCard from './assets/icon-add-card.svg'

export type { ResumeSheetMode }

type MethodId = 'visa' | 'mc' | 'apple' | 'add'

const METHODS: {
  id: MethodId
  title: string
  detail?: string
  icon: string
  confirmLabel: string
}[] = [
  {
    id: 'visa',
    title: 'Visa · 4242',
    detail: 'Expires 06/28',
    icon: iconCard,
    confirmLabel: 'Visa ending 4242',
  },
  {
    id: 'mc',
    title: 'Mastercard · 8811',
    detail: 'Expires 11/26',
    icon: iconCard,
    confirmLabel: 'Mastercard ending 8811',
  },
  {
    id: 'apple',
    title: 'Apple Pay',
    icon: iconApplePay,
    confirmLabel: 'Apple Pay',
  },
  {
    id: 'add',
    title: 'Add a card',
    icon: iconAddCard,
    confirmLabel: 'New card',
  },
]

type ResumeSheetProps = {
  open: boolean
  mode?: ResumeSheetMode
  price?: string
  onClose: () => void
  onModeChange?: (mode: ResumeSheetMode) => void
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

function formatCardNumber(value: string) {
  const d = digitsOnly(value).slice(0, 16)
  return d.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

function formatExpiry(value: string) {
  const d = digitsOnly(value).slice(0, 4)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)}/${d.slice(2)}`
}

function brandFromNumber(num: string): string {
  if (num.startsWith('4')) return 'Visa'
  if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return 'Mastercard'
  if (num.startsWith('3')) return 'Amex'
  return 'Card'
}

/**
 * Figma Popups · Resume · Confirm (955:12436 / sheet 955:13019)
 * Resume · Payment method (955:13052 / sheet 955:13159)
 */
export function ResumeSheet({
  open,
  mode: modeProp = 'confirm',
  price = '$6.99',
  onClose,
  onModeChange,
}: ResumeSheetProps) {
  const navigate = useNavigate()
  const t = useCopy()
  const [view, setView] = useState<ResumeSheetMode | 'add'>(modeProp)
  const [selected, setSelected] = useState<MethodId>('visa')
  const [customLabel, setCustomLabel] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if (open) setView(modeProp)
  }, [open, modeProp])

  const confirmLabel = useMemo(() => {
    if (customLabel) return customLabel
    const method = METHODS.find((m) => m.id === selected)
    if (!method) return t('home.resume.visaEnding', 'Visa ending 4242')
    const key =
      method.id === 'visa'
        ? 'home.resume.visaEnding'
        : method.id === 'mc'
          ? 'home.resume.mcEnding'
          : method.id === 'apple'
            ? 'home.resume.applePay'
            : 'home.resume.newCard'
    return t(key, method.confirmLabel)
  }, [customLabel, selected, t])

  const rawNumber = digitsOnly(cardNumber)
  const canSave =
    rawNumber.length >= 12 &&
    digitsOnly(expiry).length === 4 &&
    digitsOnly(cvc).length >= 3 &&
    name.trim().length > 1

  const goView = (next: ResumeSheetMode | 'add') => {
    setView(next)
    if (next === 'methods' || next === 'confirm') onModeChange?.(next)
  }

  const resume = () => {
    if (paying) return
    setPaying(true)
    window.setTimeout(() => {
      onClose()
      navigate('/?home=payment-confirmation')
    }, 400)
  }

  const saveCard = () => {
    if (!canSave) return
    const last4 = rawNumber.slice(-4)
    const label = t('common.payment.cardLabel', `${brandFromNumber(rawNumber)} ending ${last4}`, {
      brand: brandFromNumber(rawNumber),
      last4,
    })
    setCustomLabel(label)
    setSelected('visa')
    goView('confirm')
    setCardNumber('')
    setExpiry('')
    setCvc('')
    setName('')
  }

  const pickMethod = (id: MethodId) => {
    if (id === 'add') {
      setView('add')
      return
    }
    setSelected(id)
    setCustomLabel(null)
  }

  if (!open) return null

  return createPortal(
    <div className="soul-home__sheet-root" role="presentation">
      <button
        type="button"
        className="soul-home__sheet-dim"
        aria-label={t('home.resume.closeAria', 'Close resume sheet')}
        onClick={onClose}
      />
      <div
        className="soul-home__sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="soul-resume-title"
        data-name={view === 'methods' ? 'Resume · Payment method' : 'Resume · Confirm'}
      >
        <div className="soul-home__sheet-grabber" aria-hidden="true">
          <span />
        </div>

        {view === 'add' ? (
          <>
            <div className="soul-home__sheet-heading soul-home__sheet-heading--row">
              <button
                type="button"
                className="soul-home__sheet-back"
                aria-label={t('home.resume.backAria', 'Back')}
                onClick={() => goView('methods')}
              >
                <img src={iconBack} alt="" width={20} height={20} />
              </button>
              <h2 id="soul-resume-title" className="soul-home__sheet-title">
                {t('home.resume.addCard', 'Add a card')}
              </h2>
            </div>
            <label className="soul-home__sheet-field">
              <span className="soul-home__sheet-field-label">{t('home.resume.cardNumber', 'Card number')}</span>
              <input
                className="soul-home__sheet-input"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              />
            </label>
            <div className="soul-home__sheet-field-row">
              <label className="soul-home__sheet-field">
                <span className="soul-home__sheet-field-label">{t('home.resume.expiry', 'Expiry')}</span>
                <input
                  className="soul-home__sheet-input"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                />
              </label>
              <label className="soul-home__sheet-field">
                <span className="soul-home__sheet-field-label">{t('home.resume.cvc', 'CVC')}</span>
                <input
                  className="soul-home__sheet-input"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(digitsOnly(e.target.value).slice(0, 4))}
                />
              </label>
            </div>
            <label className="soul-home__sheet-field">
              <span className="soul-home__sheet-field-label">{t('home.resume.nameOnCard', 'Name on card')}</span>
              <input
                className="soul-home__sheet-input"
                autoComplete="cc-name"
                placeholder={t('home.resume.fullName', 'Full name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <div className="soul-home__sheet-actions">
              <SoulButton block disabled={!canSave} onClick={saveCard}>
                {t('home.resume.useThisCard', 'Use this card')}
              </SoulButton>
            </div>
          </>
        ) : view === 'methods' ? (
          <>
            <div className="soul-home__sheet-heading soul-home__sheet-heading--row">
              <button
                type="button"
                className="soul-home__sheet-back"
                aria-label={t('home.resume.backAria', 'Back')}
                onClick={() => goView('confirm')}
              >
                <img src={iconBack} alt="" width={20} height={20} />
              </button>
              <h2 id="soul-resume-title" className="soul-home__sheet-title">
                {t('home.resume.paymentMethod', 'Payment method')}
              </h2>
            </div>
            <div className="soul-home__method-list">
              {METHODS.map((method) => {
                const active = method.id !== 'add' && method.id === selected
                const titleKey =
                  method.id === 'visa'
                    ? 'home.resume.visa4242'
                    : method.id === 'mc'
                      ? 'home.resume.mc8811'
                      : method.id === 'apple'
                        ? 'home.resume.applePay'
                        : 'home.resume.addCard'
                const detailKey =
                  method.id === 'visa'
                    ? 'home.resume.visaExpires'
                    : method.id === 'mc'
                      ? 'home.resume.mcExpires'
                      : null
                return (
                  <button
                    key={method.id}
                    type="button"
                    className={`soul-home__method${active ? ' soul-home__method--selected' : ''}`}
                    onClick={() => pickMethod(method.id)}
                  >
                    <img
                      className="soul-home__method-icon"
                      src={method.icon}
                      alt=""
                      width={22}
                      height={22}
                    />
                    <span className="soul-home__method-text">
                      <span className="soul-home__method-title">{t(titleKey, method.title)}</span>
                      {method.detail && detailKey ? (
                        <span className="soul-home__method-detail">{t(detailKey, method.detail)}</span>
                      ) : null}
                    </span>
                    {active ? (
                      <img
                        className="soul-home__method-check"
                        src={iconSelected}
                        alt=""
                        width={18}
                        height={18}
                      />
                    ) : null}
                  </button>
                )
              })}
            </div>
            <div className="soul-home__sheet-actions">
              <SoulButton block onClick={() => goView('confirm')}>
                {t('home.resume.useThisCard', 'Use this card')}
              </SoulButton>
            </div>
          </>
        ) : (
          <>
            <div className="soul-home__sheet-heading">
              <h2 id="soul-resume-title" className="soul-home__sheet-title">
                {t('home.resume.title', 'Pick up where you left off')}
              </h2>
              <p className="soul-home__sheet-sub">
                {t('home.resume.sub', 'Everything you built stays exactly as you left it.')}
              </p>
            </div>
            <div className="soul-home__sheet-row">
              <span className="soul-home__sheet-row-label">{t('home.resume.price', 'Price')}</span>
              <span className="soul-home__sheet-row-value">
                {t('home.resume.priceValue', `${price} · renews monthly`, { price })}
              </span>
            </div>
            <div className="soul-home__sheet-row">
              <span className="soul-home__sheet-row-label">{t('home.resume.paymentMethod', 'Payment method')}</span>
              <div className="soul-home__sheet-row-right">
                <span className="soul-home__sheet-row-value">{confirmLabel}</span>
                <button
                  type="button"
                  className="soul-home__sheet-change"
                  onClick={() => goView('methods')}
                >
                  {t('home.resume.change', 'Change')}
                </button>
              </div>
            </div>
            <p className="soul-home__sheet-note">
              {t('home.resume.note', 'Cancel anytime. Charged today, then monthly on this date.')}
            </p>
            <div className="soul-home__sheet-actions">
              <SoulButton block disabled={paying} onClick={resume}>
                {paying
                  ? t('home.resume.resuming', 'Resuming…')
                  : t('home.resume.resume', `Resume · ${price}/mo`, { price })}
              </SoulButton>
              <button type="button" className="soul-home__sheet-ghost" onClick={onClose}>
                {t('home.resume.cancel', 'Cancel')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
