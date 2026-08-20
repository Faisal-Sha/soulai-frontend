import { createPortal } from 'react-dom'
import { SoulButton } from '@/components/soul'
import './soul-home.css'
import markApp from '../../components/soul/assets/mark-hero.svg'
import iconShare from './assets/icon-share.svg'
import iconAddHome from './assets/icon-add-home.svg'
import iconCheckStep from './assets/icon-check-step.svg'

const STEPS = [
  {
    n: '1',
    title: 'Tap the share button',
    detail: 'At the bottom of Safari',
    icon: iconShare,
  },
  {
    n: '2',
    title: 'Choose “Add to Home Screen”',
    detail: 'You may need to scroll the list',
    icon: iconAddHome,
  },
  {
    n: '3',
    title: 'Tap “Add”',
    detail: 'That’s it — the icon appears on your screen',
    icon: iconCheckStep,
  },
] as const

type AddToHomeSheetProps = {
  open: boolean
  onClose: () => void
}

/**
 * Figma Popups · Add to home screen · Instructions (955:9162 / sheet 955:9253)
 */
export function AddToHomeSheet({ open, onClose }: AddToHomeSheetProps) {
  if (!open) return null

  return createPortal(
    <div className="soul-home__sheet-root" role="presentation">
      <button
        type="button"
        className="soul-home__sheet-dim"
        aria-label="Close add to home screen"
        onClick={onClose}
      />
      <div
        className="soul-home__sheet soul-home__sheet--install"
        role="dialog"
        aria-modal="true"
        aria-labelledby="soul-install-title"
        data-name="Add to home screen · Instructions"
      >
        <div className="soul-home__sheet-grabber" aria-hidden="true">
          <span />
        </div>
        <div className="soul-home__install-sheet-head">
          <span className="soul-home__install-sheet-mark" aria-hidden="true">
            <img src={markApp} alt="" width={28} height={28} />
          </span>
          <span>
            <p className="soul-home__install-sheet-title" id="soul-install-title">
              Add SOUL+AI to your home screen
            </p>
            <p className="soul-home__install-sheet-sub">Two taps. It opens like any other app.</p>
          </span>
        </div>
        <ol className="soul-home__install-steps">
          {STEPS.map((step) => (
            <li key={step.n} className="soul-home__install-step">
              <span className="soul-home__install-step-n">{step.n}</span>
              <span className="soul-home__install-step-copy">
                <p className="soul-home__install-step-title">{step.title}</p>
                <p className="soul-home__install-step-detail">{step.detail}</p>
              </span>
              <span className="soul-home__install-step-icon">
                <img src={step.icon} alt="" width={22} height={22} />
              </span>
            </li>
          ))}
        </ol>
        <p className="soul-home__sheet-note">
          On iPhone this is also what lets me send your morning note — notifications do not work in
          the browser.
        </p>
        <SoulButton block onClick={onClose}>
          Got it
        </SoulButton>
      </div>
    </div>,
    document.body,
  )
}
