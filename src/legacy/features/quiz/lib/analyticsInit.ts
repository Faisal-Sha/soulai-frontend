// Quiz Analytics Initialization
// Loads Amplitude, TikTok Pixel, and GA4 for the quiz funnel.
// Meta Pixel is initialized via metaPixel.ts (VITE_META_PIXEL_ID).
// Yandex Metrica is loaded globally from index.html.

import * as amplitude from '@amplitude/analytics-browser'
import { initMetaPixel } from './metaPixel'

const AMPLITUDE_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY as string
const TIKTOK_PIXEL_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID as string
const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string
const YANDEX_METRICA_ID = (import.meta.env.VITE_YANDEX_METRICA_ID as string) || '110342301'

let initialized = false

// ── Amplitude ────────────────────────────────────────────────────────────────
function initAmplitude() {
  if (!AMPLITUDE_KEY) return
  amplitude.init(AMPLITUDE_KEY, {
    autocapture: false, // we fire events manually for full control
    defaultTracking: false,
  })
}

// ── TikTok Pixel ─────────────────────────────────────────────────────────────
function initTikTokPixel() {
  if (!TIKTOK_PIXEL_ID || (window as any).ttq) return

  const script = document.createElement('script')
  script.innerHTML = `
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
      ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
      ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
      for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
      ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
      ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
      ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
      n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src=r+"?sdkid="+e+"&lib="+t;
      e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
      ttq.load('${TIKTOK_PIXEL_ID}');
      ttq.page();
    }(window, document, 'ttq');
  `
  document.head.appendChild(script)
}

// ── GA4 ──────────────────────────────────────────────────────────────────────
function initGA4() {
  if (!GA4_ID || document.getElementById('quiz-ga4')) return

  const script1 = document.createElement('script')
  script1.id = 'quiz-ga4'
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  document.head.appendChild(script1)

  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA4_ID}');
  `
  document.head.appendChild(script2)
}

function getYandexCounterId(): number | null {
  const id = Number(YANDEX_METRICA_ID)
  return Number.isFinite(id) ? id : null
}

/** SPA page view — fires on /quiz route changes */
export function trackYandexHit(url: string, options?: Record<string, unknown>): void {
  const counterId = getYandexCounterId()
  if (!counterId || typeof window === 'undefined') return
  if (typeof window.ym !== 'function') return
  window.ym(counterId, 'hit', url, {
    referer: document.referrer,
    ...options,
  })
}

/** Custom goal/event — mirrors Amplitude event names */
export function trackYandexGoal(eventName: string, params?: Record<string, unknown>): void {
  const counterId = getYandexCounterId()
  if (!counterId || typeof window === 'undefined') return
  if (typeof window.ym !== 'function') return
  window.ym(counterId, 'reachGoal', eventName, params)
}

// ── Main init ─────────────────────────────────────────────────────────────────
export function initQuizAnalytics() {
  if (initialized) return
  initialized = true

  initAmplitude()
  initMetaPixel()
  initTikTokPixel()
  initGA4()
}

export { amplitude }
