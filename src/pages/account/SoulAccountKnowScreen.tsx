import { useNavigate } from 'react-router-dom'
import { SoulBrand, SoulNav, SoulRippleBg, SoulTextLink } from '@/components/soul'
import { useCopy } from '@/i18n'
import { type KnowQuestion } from './knowData'
import { useKnowAnswers } from './useKnowAnswers'
import './soul-account.css'
import iconArrowLight from '../readings/assets/icon-arrow-light.svg'
import iconBack from '../people/assets/icon-chevron.svg'

/**
 * Figma WIP · Account · What I know about you · Full (805:2283)
 * Answered cards match Q · Update (818:2395).
 */
export function SoulAccountKnowScreen() {
  const navigate = useNavigate()
  const t = useCopy()
  const { sections, progress } = useKnowAnswers()

  const onOpenQuestion = (q: KnowQuestion) => {
    navigate(`/account/know/${q.id}`)
  }

  return (
    <div className="soul-account" data-name="Account · What I know about you · Full">
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

        <section className="soul-account__intro" aria-labelledby="soul-account-know-title">
          <h1 id="soul-account-know-title" className="soul-account__title">
            {t('account.know.title', 'What I know about you')}
          </h1>
          <p className="soul-account__subtitle">
            {t(
              'account.know.subtitle',
              'Your birth data gives me the shape. What you tell me here gives me the detail. And every answer changes what I say next.',
            )}
          </p>
        </section>

        <div className="soul-account__know">
          <p className="soul-account__know-progress" aria-live="polite">
            {t('account.know.answeredOf', `${progress.answered} of ${progress.total} answered`, {
              answered: progress.answered,
              total: progress.total,
            })}
          </p>

          {sections.map((section) => {
            const done = section.questions.filter((q) => q.answer?.trim()).length
            const total = section.questions.length
            const complete = done === total

            return (
              <section key={section.id} className="soul-account__know-section">
                <header className="soul-account__know-head">
                  <div className="soul-account__know-head-row">
                    <h2 className="soul-account__know-section-title">{section.title}</h2>
                    <span className="soul-account__know-count">
                      {t('account.know.of', `${done} of ${total}`, { done, total })}
                    </span>
                  </div>
                  {complete && section.completeNote ? (
                    <p className="soul-account__know-note">{section.completeNote}</p>
                  ) : null}
                </header>

                <div className="soul-account__know-list">
                  {section.questions.map((q) => {
                    const answered = Boolean(q.answer?.trim())
                    return (
                      <article
                        key={q.id}
                        className={`soul-account__know-card${
                          answered ? ' soul-account__know-card--answered' : ''
                        }`}
                      >
                        {answered ? (
                          <>
                            <div className="soul-account__know-body">
                              <p className="soul-account__know-prompt">{q.prompt}</p>
                              <p className="soul-account__know-answer">“{q.answer}”</p>
                            </div>
                            <SoulTextLink onClick={() => onOpenQuestion(q)}>
                              {t('account.know.update', 'Update')}
                            </SoulTextLink>
                          </>
                        ) : (
                          <>
                            <p className="soul-account__know-prompt">{q.prompt}</p>
                            <button
                              type="button"
                              className="soul-account__know-link soul-account__know-link--on-dark"
                              onClick={() => onOpenQuestion(q)}
                            >
                              {t('account.know.answer', 'Answer')}
                              <img src={iconArrowLight} alt="" width={14} height={14} />
                            </button>
                          </>
                        )}
                      </article>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      <div className="soul-account__nav soul-account__nav--mobile">
        <SoulNav />
      </div>
    </div>
  )
}
