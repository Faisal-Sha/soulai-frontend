import { useI18n } from './I18nProvider'
import './soul-lang-switch.css'

type SoulLangSwitchProps = {
  className?: string
  tone?: 'on-dark' | 'on-light'
}

/** Compact EN | RU toggle. Does not change surrounding layout besides occupying the header's free right side. */
export function SoulLangSwitch({ className = '', tone = 'on-dark' }: SoulLangSwitchProps) {
  const { locale, setLocale, t } = useI18n()
  const next = locale === 'en' ? 'ru' : 'en'

  return (
    <button
      type="button"
      className={`soul-lang-switch${tone === 'on-light' ? ' soul-lang-switch--on-light' : ''} ${className}`.trim()}
      onClick={() => setLocale(next)}
      aria-label={t('common.language.toggleAria', 'Change language')}
    >
      <span className={`soul-lang-switch__item${locale === 'en' ? ' soul-lang-switch__item--on' : ''}`}>
        EN
      </span>
      <span className="soul-lang-switch__rule" aria-hidden="true">
        |
      </span>
      <span className={`soul-lang-switch__item${locale === 'ru' ? ' soul-lang-switch__item--on' : ''}`}>
        RU
      </span>
    </button>
  )
}
