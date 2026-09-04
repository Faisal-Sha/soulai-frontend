import { useNavigate } from 'react-router-dom'
import { SoulBrand, SoulFooter, SoulRippleBg, SoulTextLink } from '@/components/soul'
import { useCopy } from '@/i18n'
import './soul-about.css'
import iconBack from '../people/assets/icon-chevron.svg'
import photoFounder from './assets/photo-founder.png'

const BOOK_URL = 'https://calendly.com/marialit'

const BELIEFS = [
  { not: 'Not predictions', is: 'Awareness' },
  { not: 'Not mysticism', is: 'Patterns' },
  { not: 'Not fate', is: 'Conscious choice' },
] as const

const USES = [
  'Understand your strengths',
  'Recognise the patterns you repeat',
  'Choose work that actually fits you',
  'Build partnerships consciously',
  'Find the talents you have not used yet',
] as const

/**
 * Figma DEV · 18.1 · About (1142:3506)
 */
export function SoulAboutScreen() {
  const navigate = useNavigate()
  const t = useCopy()

  const goBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

  return (
    <div className="soul-about" data-name="18.1 · About">
      <SoulRippleBg className="soul-about__bg" />
      <div className="soul-about__scrim" aria-hidden="true" />

      <div className="soul-about__scroll">
        <div className="soul-about__column">
          <header className="soul-about__header">
            <div className="soul-about__header-left">
              <button
                type="button"
                className="soul-about__back"
                onClick={goBack}
                aria-label={t('about.backAria', 'Back')}
              >
                <img src={iconBack} alt="" width={22} height={22} />
              </button>
              <SoulBrand />
            </div>
          </header>

          <div className="soul-about__content">
            <section className="soul-about__title">
              <p className="soul-about__eyebrow">{t('about.eyebrow', 'About SOUL+AI')}</p>
              <h1 className="soul-about__heading">
                {t('about.heading', 'Where ancient wisdom meets artificial intelligence')}
              </h1>
            </section>

            <article className="soul-about__card soul-about__card--founder">
              <div className="soul-about__photo">
                <img src={photoFounder} alt={t('about.founder.photoAlt', 'Maria Lit')} width={342} height={320} />
              </div>
              <div className="soul-about__card-body">
                <div className="soul-about__heading-block">
                  <h2 className="soul-about__card-title">{t('about.founder.name', 'Maria Lit')}</h2>
                  <p className="soul-about__role">{t('about.founder.role', 'Life coach, author, researcher')}</p>
                </div>
                <p className="soul-about__body">
                  {t(
                    'about.founder.p1',
                    'For over a decade Maria worked with thousands of people across different countries, through career shifts, relationships, and the transitions nobody plans for. One pattern kept repeating.',
                  )}
                </p>
                <blockquote className="soul-about__quote">
                  {t(
                    'about.founder.quote',
                    'People are not lost. They are disconnected from their own structure.',
                  )}
                </blockquote>
                <p className="soul-about__body">
                  {t(
                    'about.founder.p2',
                    'Behind every life story there is a pattern. Behind every decision there is energy. Behind every talent there is a system.',
                  )}
                </p>
                <p className="soul-about__body">
                  {t(
                    'about.founder.p3',
                    'Maria spent years studying the Destiny Matrix, numerology, archetypes and behavioural psychology, and then asked one question: what if a symbolic system this old could be structured, analysed and scaled by a machine? That question became SOUL+AI.',
                  )}
                </p>
              </div>
            </article>

            <div className="soul-about__pair">
              <article className="soul-about__card soul-about__card--believe">
                <h2 className="soul-about__card-title">{t('about.believe.title', 'What we believe')}</h2>
                <p className="soul-about__body">
                  {t(
                    'about.believe.body',
                    'Technology should not replace human intuition. It should sharpen it. The Matrix gives the structure, the AI gives the depth. Together they work as a navigation system for your own potential.',
                  )}
                </p>
                <div className="soul-about__rows">
                  {BELIEFS.map((row, i) => (
                    <div key={row.is} className="soul-about__row">
                      <p className="soul-about__row-not">
                        {t(
                          i === 0
                            ? 'about.believe.notPredictions'
                            : i === 1
                              ? 'about.believe.notMysticism'
                              : 'about.believe.notFate',
                          row.not,
                        )}
                      </p>
                      <p className="soul-about__row-is">
                        {t(
                          i === 0
                            ? 'about.believe.awareness'
                            : i === 1
                              ? 'about.believe.patterns'
                              : 'about.believe.choice',
                          row.is,
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="soul-about__card soul-about__card--for">
                <h2 className="soul-about__card-title">{t('about.for.title', "What it's for")}</h2>
                <p className="soul-about__lede">
                  {t('about.for.lede', 'In a world run by algorithms, this one points back at you.')}
                </p>
                <ol className="soul-about__list">
                  {USES.map((item, i) => (
                    <li key={item} className="soul-about__list-item">
                      <span className="soul-about__list-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="soul-about__list-text">
                        {t(`about.for.use${i + 1}`, item)}
                      </span>
                    </li>
                  ))}
                </ol>
              </article>
            </div>

            <article className="soul-about__card soul-about__card--work">
              <div className="soul-about__work-copy">
                <h2 className="soul-about__card-title">{t('about.work.title', 'Work with Maria')}</h2>
                <p className="soul-about__body">
                  {t(
                    'about.work.body',
                    'If you would like a private consultation or a strategic session, you can book time with her directly.',
                  )}
                </p>
              </div>
              <SoulTextLink
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.work.book', 'Book a personal session')}
              </SoulTextLink>
            </article>

            <SoulFooter className="soul-about__footer" />
          </div>
        </div>
      </div>
    </div>
  )
}
