import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { SoulButton, SoulOutlineButton } from '@/components/soul'
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
      ? 'Plan cancelled'
      : view === 'keep'
        ? 'Keep your plan?'
        : 'Cancel your plan?'
  const sub =
    view === 'done'
      ? `You keep access until ${accessUntil}. You will not be charged $6.99.`
      : view === 'keep'
        ? `$6.99/month starts ${accessUntil}. Cancel anytime before then.`
        : `You keep access until ${accessUntil}. You will not be charged $6.99.`

  return createPortal(
    <div className="soul-home__sheet-root" role="presentation">
      <button
        type="button"
        className="soul-home__sheet-dim"
        aria-label="Close"
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
            ? 'One tap. Your trial stays on.'
            : view === 'done'
              ? 'You can keep the plan again before that date.'
              : 'One tap. Access stays until then.'}
        </p>
        <div className="soul-home__sheet-actions">
          {view === 'done' ? (
            <SoulButton block onClick={onClose}>
              Done
            </SoulButton>
          ) : view === 'keep' ? (
            <>
              <SoulButton block loading={busy} onClick={onConfirmKeep}>
                Keep plan
              </SoulButton>
              <SoulOutlineButton block disabled={busy} onClick={onClose}>
                Not now
              </SoulOutlineButton>
            </>
          ) : (
            <>
              <SoulButton block disabled={busy} onClick={onClose}>
                Keep plan
              </SoulButton>
              <SoulOutlineButton
                block
                loading={busy}
                error={error}
                onClick={onConfirmCancel}
              >
                {error ? 'Try again' : 'Cancel plan'}
              </SoulOutlineButton>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
