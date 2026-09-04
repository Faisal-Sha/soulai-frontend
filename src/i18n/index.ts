export { I18nProvider, useCopy, useI18n, getLocale, translate } from './I18nProvider'
export { SoulLangSwitch } from './SoulLangSwitch'
export {
  DEFAULT_LOCALE,
  LOCALES,
  destylizeDashes,
  foldCopy,
  isCatalogCopy,
  isEnglish,
  isLocale,
  type Locale,
} from './locale'
export type { CopyFn, CopyVars } from './I18nProvider'
export {
  termsSections as ruTermsSections,
  termsTitle as ruTermsTitle,
  termsLastUpdated as ruTermsLastUpdated,
  termsIntro as ruTermsIntro,
} from './locales/ru/termsSections'
export {
  privacySections as ruPrivacySections,
  privacyTitle as ruPrivacyTitle,
  privacyLastUpdated as ruPrivacyLastUpdated,
  privacyIntro as ruPrivacyIntro,
} from './locales/ru/privacySections'
