import { useCallback, useEffect, useState } from 'react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export type PwaPlatform = 'ios' | 'android' | 'desktop'

function getPlatform(): PwaPlatform {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent || ''
  // iPadOS 13+ reports as Mac but is touch
  if (
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  ) {
    return 'ios'
  }
  if (/Android/i.test(ua)) return 'android'
  return 'desktop'
}

function isStandaloneDisplay(): boolean {
  if (typeof window === 'undefined') return false
  const nav = navigator as Navigator & { standalone?: boolean }
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    Boolean(nav.standalone)
  )
}

/**
 * Chrome/Edge Android: native install via beforeinstallprompt.
 * iOS Safari: no prompt — guide user through Add to Home Screen.
 */
export function usePwaInstall() {
  const [isInstalled, setIsInstalled] = useState(isStandaloneDisplay)
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [platform] = useState<PwaPlatform>(getPlatform)

  useEffect(() => {
    setIsInstalled(isStandaloneDisplay())

    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      setDeferred(event as BeforeInstallPromptEvent)
    }
    const onAppInstalled = () => {
      setIsInstalled(true)
      setDeferred(null)
    }
    const onDisplayChange = () => setIsInstalled(isStandaloneDisplay())

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onAppInstalled)

    const standaloneMq = window.matchMedia('(display-mode: standalone)')
    standaloneMq.addEventListener?.('change', onDisplayChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onAppInstalled)
      standaloneMq.removeEventListener?.('change', onDisplayChange)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (!deferred) return false
    await deferred.prompt()
    const { outcome } = await deferred.userChoice
    setDeferred(null)
    if (outcome === 'accepted') setIsInstalled(true)
    return outcome === 'accepted'
  }, [deferred])

  return {
    isInstalled,
    canNativeInstall: Boolean(deferred),
    platform,
    promptInstall,
  }
}
