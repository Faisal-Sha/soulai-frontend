import { useEffect, useState } from 'react'
import iconCheck from './assets/icon-check.svg'
import iconError from './assets/icon-error.svg'
import { useCopy } from '@/i18n'

export type TopUpSheetMode = 'pay' | 'declined' | 'change'

type TopUpSheetProps = {
  open: boolean
  mode: TopUpSheetMode
  paying?: boolean
  cardLabel: string
  onClose: () => void
  onPay: () => void
  onChangeCard: () => void
  onTryAgain: () => void
  onBackFromChange: () => void
  onSaveCard: (label: string) => void
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
 * Chat · Top-up payment sheet. Figma DEV 625:2810 / 625:2975
 * Change-card is a UI shell (no dedicated Figma frame) matching the sheet language.
 */
export function TopUpSheet({
  open,
  mode,
  paying = false,
  cardLabel,
  onClose,
  onPay,
  onChangeCard,
  onTryAgain,
  onBackFromChange,
  onSaveCard,
}: TopUpSheetProps) {
  const t = useCopy()
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if (open && mode === 'change') {
      setCardNumber('')
      setExpiry('')
      setCvc('')
      setName('')
    }
  }, [open, mode])

  if (!open) return null

  const rawNumber = digitsOnly(cardNumber)
  const canSave =
    rawNumber.length >= 12 &&
    digitsOnly(expiry).length === 4 &&
    digitsOnly(cvc).length >= 3 &&
    name.trim().length > 1

  const saveCard = () => {
    if (!canSave) return
    const last4 = rawNumber.slice(-4)
    onSaveCard(
      t('common.payment.cardLabel', `${brandFromNumber(rawNumber)} ending ${last4}`, {
        brand: brandFromNumber(rawNumber),
        last4,
      }),
    )
  }

  return (
    <div className="soul-chat__sheet-root" role="presentation">
      <button
        type="button"
        className="soul-chat__sheet-dim"
        aria-label={t('agent.topup.closeAria', 'Close payment sheet')}
        onClick={onClose}
      />
      <div
        className="soul-chat__sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="soul-topup-title"
      >
        <div className="soul-chat__sheet-grabber" aria-hidden="true">
          <span />
        </div>

        {mode === 'change' ? (
          <>
            <div className="soul-chat__sheet-heading">
              <h2 id="soul-topup-title" className="soul-chat__sheet-title">
                {t('agent.topup.changeTitle', 'Change card')}
              </h2>
              <p className="soul-chat__sheet-sub">
                {t('agent.topup.changeSub', "We'll use this for your next top-up. Nothing is charged yet.")}
              </p>
            </div>

            <label className="soul-chat__sheet-field">
              <span className="soul-chat__sheet-field-label">{t('agent.topup.cardNumber', 'Card number')}</span>
              <input
                className="soul-chat__sheet-input"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="ACCT-000015"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              />
            </label>

            <div className="soul-chat__sheet-field-row">
              <label className="soul-chat__sheet-field">
                <span className="soul-chat__sheet-field-label">{t('agent.topup.expiry', 'Expiry')}</span>
                <input
                  className="soul-chat__sheet-input"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                />
              </label>
              <label className="soul-chat__sheet-field">
                <span className="soul-chat__sheet-field-label">{t('agent.topup.cvc', 'CVC')}</span>
                <input
                  className="soul-chat__sheet-input"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(digitsOnly(e.target.value).slice(0, 4))}
                />
              </label>
            </div>

            <label className="soul-chat__sheet-field">
              <span className="soul-chat__sheet-field-label">{t('agent.topup.nameOnCard', 'Name on card')}</span>
              <input
                className="soul-chat__sheet-input"
                autoComplete="cc-name"
                placeholder={t('agent.topup.fullName', 'Full name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <p className="soul-chat__sheet-note">
              {t('agent.topup.encryptNote', 'Encrypted entry. Nothing is charged until you confirm Pay.')}
            </p>

            <div className="soul-chat__sheet-actions">
              <button
                type="button"
                className="soul-chat__sheet-pay"
                disabled={!canSave}
                onClick={saveCard}
              >
                {t('agent.topup.saveCard', 'Save card')}
              </button>
              <button type="button" className="soul-chat__sheet-cancel" onClick={onBackFromChange}>
                {t('agent.topup.back', 'Back')}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="soul-chat__sheet-heading">
              <h2 id="soul-topup-title" className="soul-chat__sheet-title">
                {t('agent.topup.title', '10 more credits')}
                </h2>
                <p className="soul-chat__sheet-sub">
                {t('agent.topup.sub', 'Your conversation stays exactly where it is.')}
              </p>
            </div>

            <div className="soul-chat__sheet-row">
              <span className="soul-chat__sheet-row-label">{t('agent.topup.price', 'Price')}</span>
              <span className="soul-chat__sheet-row-value">{t('agent.topup.priceValue', '$7.00 · one-time')}</span>
            </div>

            <div className="soul-chat__sheet-row">
              <span className="soul-chat__sheet-row-label">{t('agent.topup.paymentMethod', 'Payment method')}</span>
              <div className="soul-chat__sheet-row-right">
                <span className="soul-chat__sheet-row-value">{cardLabel}</span>
                {mode === 'pay' ? (
                  <button type="button" className="soul-chat__sheet-change" onClick={onChangeCard}>
                    {t('agent.topup.change', 'Change')}
                  </button>
                ) : null}
              </div>
            </div>

            {mode === 'declined' ? (
              <div className="soul-chat__sheet-error" role="alert">
                <img src={iconError} alt="" width={16} height={16} />
                <p>{t('agent.topup.declined', 'Your card was declined.')}</p>
              </div>
            ) : (
              <p className="soul-chat__sheet-note">
                {t('agent.topup.oneTime', 'One-time charge. Unused credits stay on your account.')}
              </p>
            )}

            <div className="soul-chat__sheet-actions">
              {mode === 'pay' ? (
                <>
                  <button
                    type="button"
                    className="soul-chat__sheet-pay"
                    disabled={paying}
                    onClick={onPay}
                  >
                    {paying ? t('agent.topup.paying', 'Paying…') : t('agent.topup.pay', 'Pay $7.00')}
                  </button>
                  <button type="button" className="soul-chat__sheet-cancel" onClick={onClose}>
                    {t('agent.topup.cancel', 'Cancel')}
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="soul-chat__sheet-pay" onClick={onChangeCard}>
                    {t('agent.topup.otherCard', 'Use another card')}
                  </button>
                  <button type="button" className="soul-chat__sheet-cancel" onClick={onTryAgain}>
                    {t('agent.topup.tryAgain', 'Try again')}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function TopUpSuccessPill() {
  const t = useCopy()
  return (
    <div className="soul-chat__topup-pill" role="status">
      <img src={iconCheck} alt="" width={13} height={13} />
      <span>{t('agent.topup.success', '10 credits added · $7.00')}</span>
    </div>
  )
}
