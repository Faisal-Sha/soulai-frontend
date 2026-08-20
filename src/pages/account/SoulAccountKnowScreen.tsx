import { useNavigate } from 'react-router-dom'
import { SoulBrand, SoulNav, SoulTextLink } from '@/components/soul'
import { getKnowSections, knowProgress, type KnowQuestion } from './knowData'
import './soul-account.css'
import bgRipple from '../home/assets/bg-ripple.png'
import iconArrowLight from '../readings/assets/icon-arrow-light.svg'
import iconBack from '../people/assets/icon-chevron.svg'

/**
 * Figma WIP · Account · What I know about you · Full (805:2283)
 * Answered cards match Q · Update (818:2395).
 */
export function SoulAccountKnowScreen() {
  const navigate = useNavigate()
  const sections = getKnowSections()
  const progress = knowProgress(sections)

  const onOpenQuestion = (q: KnowQuestion) => {
    navigate(`/account/know/${q.id}`)
  }

  return (
    <div className="soul-account" data-name="Account · What I know about you · Full">
      <div className="soul-account__bg" aria-hidden="true">
        <div className="soul-account__bg-tile soul-account__bg-tile--1">
          <img src={bgRipple} alt="" />
          <span className="soul-account__bg-dim" />
        </div>
        <div className="soul-account__bg-tile soul-account__bg-tile--2">
          <img src={bgRipple} alt="" />
          <span className="soul-account__bg-dim" />
        </div>
      </div>
      <div className="soul-account__scrim" aria-hidden="true" />
      <div className="soul-account__dock-scrim" aria-hidden="true" />

      <div className="soul-account__scroll">
        <header className="soul-account__header soul-account__header--back">
          <div className="soul-account__header-left">
            <button
              type="button"
              className="soul-account__back"
              onClick={() => navigate('/account')}
              aria-label="Back to account"
            >
              <img src={iconBack} alt="" width={22} height={22} />
            </button>
            <SoulBrand />
          </div>
          <div className="soul-account__header-nav" aria-label="Desktop navigation">
            <SoulNav variant="desktop" />
          </div>
        </header>

        <section className="soul-account__intro" aria-labelledby="soul-account-know-title">
          <h1 id="soul-account-know-title" className="soul-account__title">
            What I know about you
          </h1>
          <p className="soul-account__subtitle">
            Your birth data gives me the shape. What you tell me here gives me the detail — and every
            answer changes what I say next.
          </p>
        </section>

        <div className="soul-account__know">
          <p className="soul-account__know-progress" aria-live="polite">
            {progress.answered} of {progress.total} answered
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
                      {done} of {total}
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
                            <SoulTextLink onClick={() => onOpenQuestion(q)}>Update</SoulTextLink>
                          </>
                        ) : (
                          <>
                            <p className="soul-account__know-prompt">{q.prompt}</p>
                            <button
                              type="button"
                              className="soul-account__know-link soul-account__know-link--on-dark"
                              onClick={() => onOpenQuestion(q)}
                            >
                              Answer
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
