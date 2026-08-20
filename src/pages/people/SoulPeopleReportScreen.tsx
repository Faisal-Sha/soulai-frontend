import { Link, useNavigate, useParams } from 'react-router-dom'
import { SoulBrand, SoulButton, SoulNav } from '@/components/soul'
import { DEMO_PEOPLE } from './peopleData'
import { PEOPLE_REPORT_META, PEOPLE_REPORT_SECTIONS } from './reportContent'
import './soul-people.css'
import bgRipple from '../home/assets/bg-ripple.png'
import iconChevron from './assets/icon-chevron.svg'
import iconArrow from '../readings/assets/icon-arrow-light.svg'

/**
 * Figma WIP · People · Report (805:1970 / 803:1643)
 */
export function SoulPeopleReportScreen() {
  const navigate = useNavigate()
  const { personId = 'anna' } = useParams()

  const partnerName =
    DEMO_PEOPLE.find((p) => p.id === personId)?.name ||
    PEOPLE_REPORT_META.partnerName

  const talkSection = (title: string, body: string) => {
    navigate('/agent', {
      state: {
        starter: `Talk through this with me — You and ${partnerName}, “${title}”:\n\n${body}`,
        quotedNote: title,
        newChat: true,
      },
    })
  }

  const askAboutPair = () => {
    navigate('/agent', {
      state: {
        starter: `Ask about you two — me and ${partnerName}.`,
        quotedNote: `You and ${partnerName}`,
        newChat: true,
      },
    })
  }

  return (
    <div className="soul-people">
      <div className="soul-people__bg" aria-hidden="true">
        <div className="soul-people__bg-tile soul-people__bg-tile--1">
          <img src={bgRipple} alt="" />
          <span className="soul-people__bg-dim" />
        </div>
        <div className="soul-people__bg-tile soul-people__bg-tile--2">
          <img src={bgRipple} alt="" />
          <span className="soul-people__bg-dim" />
        </div>
      </div>
      <div className="soul-people__scrim" aria-hidden="true" />
      <div className="soul-people__dock-scrim" aria-hidden="true" />

      <div className="soul-people__scroll">
        <header className="soul-people__header soul-people__header--back">
          <div className="soul-people__header-left">
            <button
              type="button"
              className="soul-people__back"
              onClick={() => navigate('/people')}
              aria-label="Back to People"
            >
              <img src={iconChevron} alt="" width={22} height={22} />
            </button>
            <SoulBrand />
          </div>
          <div className="soul-people__header-nav" aria-label="Desktop navigation">
            <SoulNav variant="desktop" />
          </div>
        </header>

        <div className="soul-people__report">
          <section
            className="soul-people__intro soul-people__intro--report"
            aria-labelledby="soul-people-report-title"
          >
            <h1 id="soul-people-report-title" className="soul-people__title">
              You and {partnerName}
            </h1>
            <p className="soul-people__subtitle soul-people__subtitle--report">
              {PEOPLE_REPORT_META.subtitle}
            </p>
          </section>

          <div className="soul-people__cards">
            {PEOPLE_REPORT_SECTIONS.map((section) => {
              const body = section.paragraphs.join('\n\n')
              return (
                <article key={section.n} className="soul-people__card">
                  <h2 className="soul-people__card-title">
                    <span className="soul-people__card-num">{section.n}.</span> {section.title}
                  </h2>
                  <hr className="soul-people__card-rule" />
                  <div className="soul-people__card-body">
                    {section.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                  <div className="soul-people__card-actions">
                    <button
                      type="button"
                      className="soul-people__talk"
                      onClick={() => talkSection(section.title, body)}
                    >
                      Talk this through
                      <img src={iconArrow} alt="" width={15} height={15} />
                    </button>
                    <button
                      type="button"
                      className="soul-people__share-btn"
                      aria-label="Share this section"
                      onClick={() => navigate(`/people/${personId}/share`)}
                    >
                      <span className="soul-people__share-icon" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          <section className="soul-people__closing">
            <h2 className="soul-people__closing-title">{PEOPLE_REPORT_META.closingTitle}</h2>
            <p className="soul-people__closing-body">{PEOPLE_REPORT_META.closingBody}</p>
            <SoulButton block onClick={askAboutPair}>
              Ask about you two
            </SoulButton>
            <button type="button" className="soul-people__text-link" onClick={() => navigate('/people/add')}>
              Add someone else
            </button>
            <p className="soul-people__legal">
              <Link to="/terms">Terms</Link>
              {' & '}
              <Link to="/privacy">Privacy Policy</Link>
            </p>
          </section>
        </div>
      </div>

      <div className="soul-people__nav soul-people__nav--mobile">
        <SoulNav />
      </div>
    </div>
  )
}