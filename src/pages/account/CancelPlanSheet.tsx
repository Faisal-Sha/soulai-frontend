import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { SoulButton, SoulOutlineButton } from '@/components/soul'
import { useCopy } from '@/i18n'
import '@/pages/home/soul-home.css'

export type CancelPlanSheetView = 'cancel' | 'keep' | 'done'

type CancelPlanSheetProps = {
  open: boolean
  view: CancelPlanSheetView
  accessUntil: string
  busy?: boolean
  error?: boolean
  onClose: () => void
  onConfirmCancel: () => void
  onConfirmKeep: () => void
}

/**
 * Figma Popups sheet chrome (Resume 955:12436) +
 * Primary 242:2289 + outline Skip 244:2245.
 */
export function CancelPlanSheet({
  open,
  view,
  accessUntil,
  busy = false,
  error = false,
  onClose,
  onConfirmCancel,
  onConfirmKeep,
}: CancelPlanSheetProps) {
  const t = useCopy()
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busy, onClose, open])

  if (!open) return null

  const titleId = 'soul-cancel-plan-title'
  const title =
    view === 'done'
      ? t('account.cancel.titleDone', 'Plan cancelled')
      : view === 'keep'
        ? t('account.cancel.titleKeep', 'Keep your plan?')
        : t('account.cancel.titleCancel', 'Cancel your plan?')
  const sub =
    view === 'done' || view === 'cancel'
      ? t(
          'account.cancel.subAccess',
          `You keep access until ${accessUntil}. You will not be charged $6.99.`,
          { date: accessUntil },
        )
      : t(
          'account.cancel.subKeep',
          `$6.99/month starts ${accessUntil}. Cancel anytime before then.`,
          { date: accessUntil },
        )

  return createPortal(
    <div className="soul-home__sheet-root" role="presentation">
      <button
        type="button"
        className="soul-home__sheet-dim"
        aria-label={t('account.cancel.closeAria', 'Close')}
        disabled={busy}
        onClick={onClose}
      />
      <div
        className="soul-home__sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-name={
          view === 'done'
            ? 'Account · Plan · Cancelled'
            : view === 'keep'
              ? 'Account · Plan · Keep'
              : 'Account · Plan · Cancel'
        }
      >
        <div className="soul-home__sheet-grabber" aria-hidden="true">
          <span />
        </div>
        <div className="soul-home__sheet-heading">
          <h2 id={titleId} className="soul-home__sheet-title">
            {title}
          </h2>
          <p className="soul-home__sheet-sub">{sub}</p>
        </div>
        <p className="soul-home__sheet-note">
          {view === 'keep'
            ? t('account.cancel.noteKeep', 'One tap. Your trial stays on.')
            : view === 'done'
              ? t('account.cancel.noteDone', 'You can keep the plan again before that date.')
              : t('account.cancel.noteCancel', 'One tap. Access stays until then.')}
        </p>
        <div className="soul-home__sheet-actions">
          {view === 'done' ? (
            <SoulButton block onClick={onClose}>
              {t('account.cancel.done', 'Done')}
            </SoulButton>
          ) : view === 'keep' ? (
            <>
              <SoulButton block loading={busy} onClick={onConfirmKeep}>
                {t('account.plan.keepPlan', 'Keep plan')}
              </SoulButton>
              <SoulOutlineButton block disabled={busy} onClick={onClose}>
                {t('account.cancel.notNow', 'Not now')}
              </SoulOutlineButton>
            </>
          ) : (
            <>
              <SoulButton block disabled={busy} onClick={onClose}>
                {t('account.plan.keepPlan', 'Keep plan')}
              </SoulButton>
              <SoulOutlineButton
                block
                loading={busy}
                error={error}
                onClick={onConfirmCancel}
              >
                {error
                  ? t('account.cancel.tryAgain', 'Try again')
                  : t('account.plan.cancelPlan', 'Cancel plan')}
              </SoulOutlineButton>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
