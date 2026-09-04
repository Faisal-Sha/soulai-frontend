import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyDocumentLocale,
  DEFAULT_LOCALE,
  destylizeDashes,
  interpolate,
  isEnglish,
  persistLocale,
  readQueryLocale,
  resolveInitialLocale,
  type Locale,
} from './locale'
import { lookup } from './lookup'
import { ruDictionary } from './locales/ru'

export type CopyVars = Record<string, string | number>

export type CopyFn = (key: string, english: string, vars?: CopyVars) => string

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: CopyFn
}

const I18nContext = createContext<I18nContextValue | null>(null)

let currentLocale: Locale = DEFAULT_LOCALE

export function getLocale(): Locale {
  return currentLocale
}

/**
 * English is the live source string. Russian is a key lookup.
 * Missing RU keys fall back to the English passed by the caller.
 */
export function translate(
  locale: Locale,
  key: string,
  english: string,
  vars?: CopyVars,
): string {
  if (isEnglish(locale)) return interpolate(english, vars)
  const raw = lookup(ruDictionary, key)
  return destylizeDashes(interpolate(raw ?? english, vars))
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const initial = resolveInitialLocale()
    currentLocale = initial
    applyDocumentLocale(initial)
    return initial
  })

  const setLocale = useCallback((next: Locale) => {
    currentLocale = next
    persistLocale(next)
    applyDocumentLocale(next)
    setLocaleState(next)
    const fromQuery = readQueryLocale()
    if (fromQuery && fromQuery !== next && typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('lang', next)
      window.history.replaceState({}, '', url)
    }
  }, [])

  const t = useCallback<CopyFn>(
    (key, english, vars) => translate(locale, key, english, vars),
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

export function useCopy(): CopyFn {
  return useI18n().t
}
