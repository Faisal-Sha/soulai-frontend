import { useState } from 'react'
import { createPortal } from 'react-dom'
import { SoulButton } from '@/components/soul'
import { useCopy } from '@/i18n'
import { usePwaInstall, type PwaPlatform } from './usePwaInstall'
import './soul-home.css'
import markApp from '../../components/soul/assets/mark-hero.svg'
import iconShare from './assets/icon-share.svg'
import iconAddHome from './assets/icon-add-home.svg'
import iconCheckStep from './assets/icon-check-step.svg'

type Step = {
  n: string
  titleKey: string
  title: string
  detailKey: string
  detail: string
  icon: string
}

const IOS_STEPS: Step[] = [
  {
    n: '1',
    titleKey: 'home.addToHome.step1Title',
    title: 'Tap the share button',
    detailKey: 'home.addToHome.step1Detail',
    detail: 'At the bottom of Safari',
    icon: iconShare,
  },
  {
    n: '2',
    titleKey: 'home.addToHome.step2Title',
    title: 'Choose “Add to Home Screen”',
    detailKey: 'home.addToHome.step2Detail',
    detail: 'You may need to scroll the list',
    icon: iconAddHome,
  },
  {
    n: '3',
    titleKey: 'home.addToHome.step3Title',
    title: 'Tap “Add”',
    detailKey: 'home.addToHome.step3Detail',
    detail: 'That’s it. The icon appears on your screen',
    icon: iconCheckStep,
  },
]

const ANDROID_STEPS: Step[] = [
  {
    n: '1',
    titleKey: 'home.addToHome.androidStep1Title',
    title: 'Open the Chrome menu',
    detailKey: 'home.addToHome.androidStep1Detail',
    detail: 'Tap ⋮ in the top-right',
    icon: iconShare,
  },
  {
    n: '2',
    titleKey: 'home.addToHome.androidStep2Title',
    title: 'Tap “Install app”',
    detailKey: 'home.addToHome.androidStep2Detail',
    detail: 'Not “Add to Home screen” / shortcut — that still opens in Chrome',
    icon: iconAddHome,
  },
  {
    n: '3',
    titleKey: 'home.addToHome.androidStep3Title',
    title: 'Confirm Install',
    detailKey: 'home.addToHome.androidStep3Detail',
    detail: 'It should open full-screen, with no address bar',
    icon: iconCheckStep,
  },
]

function stepsFor(platform: PwaPlatform): Step[] {
  return platform === 'ios' ? IOS_STEPS : ANDROID_STEPS
}

type AddToHomeSheetProps = {
  open: boolean
  onClose: () => void
}

/**
 * Figma Popups · Add to home screen · Instructions (955:9162 / sheet 955:9253)
 * Android Chrome: native install when available; otherwise menu steps.
 * iOS Safari: Share → Add to Home Screen (no install API).
 */
export function AddToHomeSheet({ open, onClose }: AddToHomeSheetProps) {
  const t = useCopy()
  const { canNativeInstall, platform, promptInstall } = usePwaInstall()
  const [installing, setInstalling] = useState(false)

  if (!open) return null

  const steps = stepsFor(platform)
  const showNativeInstall = canNativeInstall && platform !== 'ios'

  const handlePrimary = async () => {
    if (!showNativeInstall) {
      onClose()
      return
    }
    setInstalling(true)
    try {
      await promptInstall()
    } finally {
      setInstalling(false)
      onClose()
    }
  }

  return createPortal(
    <div className="soul-home__sheet-root" role="presentation">
      <button
        type="button"
        className="soul-home__sheet-dim"
        aria-label={t('home.addToHome.closeAria', 'Close add to home screen')}
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
              {t('home.addToHome.title', 'Add SOUL+AI to your home screen')}
            </p>
            <p className="soul-home__install-sheet-sub">
              {t('home.addToHome.sub', 'Two taps. It opens like any other app.')}
            </p>
          </span>
        </div>

        {showNativeInstall ? (
          <p className="soul-home__install-android">
            {t(
              'home.addToHome.androidNativeHint',
              'Tap below and confirm Install when Chrome asks.',
            )}
          </p>
        ) : (
          <ol className="soul-home__install-steps">
            {steps.map((step) => (
              <li key={step.n} className="soul-home__install-step">
                <span className="soul-home__install-step-n">{step.n}</span>
                <span className="soul-home__install-step-copy">
                  <p className="soul-home__install-step-title">
                    {t(step.titleKey, step.title)}
                  </p>
                  <p className="soul-home__install-step-detail">
                    {t(step.detailKey, step.detail)}
                  </p>
                </span>
                <span className="soul-home__install-step-icon">
                  <img src={step.icon} alt="" width={22} height={22} />
                </span>
              </li>
            ))}
          </ol>
        )}

        <p className="soul-home__sheet-note">
          {platform === 'ios'
            ? t(
                'home.addToHome.note',
                'On iPhone this is also what lets me send your morning note. Notifications do not work in the browser.',
              )
            : t(
                'home.addToHome.androidNote',
                'Once installed, open SOUL+AI from your home screen — it feels like a real app.',
              )}
        </p>
        <SoulButton block onClick={() => void handlePrimary()} disabled={installing}>
          {showNativeInstall
            ? installing
              ? t('home.addToHome.installing', 'Installing…')
              : t('home.addToHome.install', 'Add to home screen')
            : t('home.addToHome.gotIt', 'Got it')}
        </SoulButton>
      </div>
    </div>,
    document.body,
  )
}
