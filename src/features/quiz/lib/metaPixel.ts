// Meta Pixel — ID from VITE_META_PIXEL_ID (.env). Not loaded from index.html.
// Only the 7 sheet-mapped STANDARD events (never Soul* names).

const META_PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() ?? ''

export const META_STANDARD_EVENTS = [
  'PageView',
  'CompleteRegistration',
  'Lead',
  'ViewContent',
  'AddPaymentInfo',
  'InitiateCheckout',
  'Purchase',
] as const

export type MetaStandardEvent = (typeof META_STANDARD_EVENTS)[number]

let initStarted = false

function isStandardEvent(name: string): name is MetaStandardEvent {
  return (META_STANDARD_EVENTS as readonly string[]).includes(name)
}

/**
 * Init from .env. Does NOT auto-fire PageView —
 * sheet maps PageView to SoulWelcomeScreenViewed only.
 * autoConfig=false stops SubscribedButtonClick / SPA noise.
 */
export function initMetaPixel(): void {
  if (!META_PIXEL_ID || typeof window === 'undefined') {
    console.warn('[Meta Pixel] VITE_META_PIXEL_ID missing — pixel not loaded')
    return
  }
  if (initStarted) return
  initStarted = true

  if (!window.fbq) {
    const script = document.createElement('script')
    script.innerHTML = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,
      'script','https://connect.facebook.net/en_US/fbevents.js');
    `
    document.head.appendChild(script)
  }

  window.fbq?.('set', 'autoConfig', false, META_PIXEL_ID)
  window.fbq?.('init', META_PIXEL_ID)

  console.info(`[Meta Pixel] init ${META_PIXEL_ID} (autoConfig=false, PageView only on welcome)`)
}

export function getMetaPixelId(): string {
  return META_PIXEL_ID
}

export function buildMetaPixelParams(
  metaEvent: string,
  props: Record<string, unknown> = {},
): { params: Record<string, unknown>; eventID?: string } {
  const planFromIds = Array.isArray(props.content_ids) ? props.content_ids[0] : undefined
  const plan = String(props.plan ?? planFromIds ?? 'fullAccess')
  const contentIds = Array.isArray(props.content_ids)
    ? (props.content_ids as string[])
    : [plan]

  const price =
    typeof props.price === 'number'
      ? props.price
      : typeof props.value === 'number'
        ? props.value
        : typeof props.amount === 'number'
          ? props.amount
          : undefined

  const currency = typeof props.currency === 'string' ? props.currency.toUpperCase() : 'USD'
  const eventID =
    typeof props.event_id === 'string'
      ? props.event_id
      : typeof props.eventID === 'string'
        ? props.eventID
        : undefined

  switch (metaEvent) {
    case 'PageView':
      return { params: {} }
    case 'CompleteRegistration':
      return { params: { content_name: 'name_submitted', status: true } }
    case 'Lead':
      return { params: { content_name: 'email_submitted' }, eventID }
    case 'ViewContent':
      return {
        params: {
          content_ids: contentIds,
          content_type: 'product',
          content_name: plan,
        },
      }
    case 'AddPaymentInfo':
      return {
        params: {
          content_ids: contentIds,
          content_type: 'product',
          value: price,
          currency,
        },
      }
    case 'InitiateCheckout':
      return {
        params: {
          content_ids: contentIds,
          content_type: 'product',
          value: price,
          currency,
          num_items: 1,
        },
        eventID,
      }
    case 'Purchase':
      return {
        params: {
          content_ids: contentIds,
          content_type: 'product',
          value: price ?? props.amount,
          currency,
          num_items: 1,
        },
        eventID,
      }
    default:
      return { params: {} }
  }
}

/** Fire one of the 7 sheet Meta standard events via fbq('track', …). */
export function trackMetaPixel(
  metaEvent: string,
  props: Record<string, unknown> = {},
): void {
  if (!META_PIXEL_ID) {
    console.warn('[Meta Pixel] missing VITE_META_PIXEL_ID — skipped:', metaEvent)
    return
  }
  if (!isStandardEvent(metaEvent)) {
    console.warn('[Meta Pixel] only these events are allowed:', META_STANDARD_EVENTS, 'got:', metaEvent)
    return
  }

  initMetaPixel()

  const fbq = window.fbq
  if (typeof fbq !== 'function') {
    console.warn('[Meta Pixel] fbq unavailable — skipped:', metaEvent)
    return
  }

  const { params, eventID } = buildMetaPixelParams(metaEvent, props)
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null),
  )

  if (metaEvent === 'PageView' && Object.keys(cleaned).length === 0) {
    fbq('track', 'PageView')
  } else if (eventID) {
    fbq('track', metaEvent, cleaned, { eventID })
  } else {
    fbq('track', metaEvent, cleaned)
  }

  console.info(`[Meta Pixel] ✓ ${metaEvent}`, cleaned, eventID ? { eventID } : '')
}
