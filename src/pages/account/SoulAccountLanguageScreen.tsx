import { useNavigate } from 'react-router-dom'
import { SoulBrand, SoulNav, SoulRippleBg } from '@/components/soul'
import { useCopy, useI18n, type Locale } from '@/i18n'
import './soul-account.css'
import iconBack from '../people/assets/icon-chevron.svg'

const OPTIONS: { id: Locale; titleEn: string; metaEn: string }[] = [
  { id: 'en', titleEn: 'English', metaEn: 'Default' },
  { id: 'ru', titleEn: 'Русский', metaEn: 'Russian' },
]

/**
 * Account · Language. Same frequency-card pattern as Notifications.
 * English remains the product default; this only switches the locale overlay.
 */
export function SoulAccountLanguageScreen() {
  const navigate = useNavigate()
  const { locale, setLocale } = useI18n()
  const t = useCopy()

  return (
    <div className="soul-account" data-name="Account · Language">
      <SoulRippleBg className="soul-account__bg" />
      <div className="soul-account__scrim" aria-hidden="true" />
      <div className="soul-account__dock-scrim" aria-hidden="true" />

      <div className="soul-account__scroll">
        <header className="soul-account__header soul-account__header--back">
          <div className="soul-account__header-left">
            <button
              type="button"
              className="soul-account__back"
              onClick={() => navigate('/account')}
              aria-label={t('account.backAria', 'Back to account')}
            >
              <img src={iconBack} alt="" width={22} height={22} />
            </button>
            <SoulBrand />
          </div>
          <div className="soul-account__header-nav" aria-label={t('account.desktopNavAria', 'Desktop navigation')}>
            <SoulNav variant="desktop" />
          </div>
        </header>

        <section className="soul-account__intro" aria-labelledby="soul-account-lang-title">
          <h1 id="soul-account-lang-title" className="soul-account__title">
            {t('account.language.title', 'Language')}
          </h1>
          <p className="soul-account__subtitle">
            {t(
              'account.language.subtitle',
              'Choose the language SOUL+AI uses in the app. English is the original.',
            )}
          </p>
        </section>

        <div className="soul-account__stack">
          <div className="soul-account__section">
            <p className="soul-account__section-label">
              {t('account.language.section', 'App language')}
            </p>
            <div
              className="soul-account__freq"
              role="radiogroup"
              aria-label={t('account.language.section', 'App language')}
            >
              {OPTIONS.map((opt) => {
                const selected = locale === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={`soul-account__freq-card${
                      selected ? ' soul-account__freq-card--selected' : ''
                    }`}
                    onClick={() => setLocale(opt.id)}
                  >
                    <span className="soul-account__freq-title">
                      {t(`common.language.name.${opt.id}`, opt.titleEn)}
                    </span>
                    <span className="soul-account__freq-meta">{opt.metaEn}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="soul-account__nav soul-account__nav--mobile">
        <SoulNav />
      </div>
    </div>
  )
}
