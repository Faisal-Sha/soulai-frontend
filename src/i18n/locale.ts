export const LOCALES = ['en', 'ru'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_STORAGE_KEY = 'soul_locale'

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ru'
}

export function isEnglish(locale: string | undefined | null): boolean {
  return !locale || locale === 'en' || locale.startsWith('en')
}

/** {{name}} interpolation. Used for RU strings and optional EN templates. */
export function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    vars[key] === undefined || vars[key] === null ? '' : String(vars[key]),
  )
}

/** Strip em/en dashes so RU UI does not look machine-written. */
export function destylizeDashes(value: string) {
  return value
    .replace(/\s*[\u2014\u2013\u2015\uFE58]\s*/g, ', ')
    .replace(/([^\s\d])\s+-\s+([^\s\d])/g, '$1, $2')
    .replace(/,\s*,+/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/** Ignore em/en dashes, curly quotes, and spacing so stored catalog copy still matches. */
export function foldCopy(value: string) {
  return value
    .replace(/[\u2018\u2019\u201A\u2032]/g, "'")
    .replace(/[\u201C\u201D\u201E\u2033]/g, '"')
    .replace(/[\u2014\u2013\u2212\uFE58\uFE63\uFF0D]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

export function isCatalogCopy(stored: string | undefined, ...catalog: string[]) {
  if (!stored?.trim()) return true
  const folded = foldCopy(stored)
  return catalog.some((item) => foldCopy(item) === folded)
}

export function readQueryLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = new URLSearchParams(window.location.search).get('lang')
    return isLocale(raw) ? raw : null
  } catch {
    return null
  }
}

export function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    return isLocale(raw) ? raw : null
  } catch {
    return null
  }
}

export function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    /* ignore */
  }
}

export function resolveInitialLocale(): Locale {
  return readQueryLocale() ?? readStoredLocale() ?? DEFAULT_LOCALE
}

export function applyDocumentLocale(locale: Locale) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = locale
}
