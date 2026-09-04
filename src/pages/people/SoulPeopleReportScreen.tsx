import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { SoulBrand, SoulButton, SoulNav, SoulRippleBg } from '@/components/soul'
import { useCopy, useI18n } from '@/i18n'
import {
  buildReportContent,
  localizeReportForDisplay,
  PEOPLE_REPORT_META,
  type PeopleReportSection,
  type StoredPeopleReport,
} from './reportContent'
import { demoPerson, getPerson, getPersonReport } from './peopleApi'
import './soul-people.css'
import iconChevron from './assets/icon-chevron.svg'
import iconArrow from '../readings/assets/icon-arrow-light.svg'

const fallbackReport = () =>
  buildReportContent(PEOPLE_REPORT_META.selfName, PEOPLE_REPORT_META.partnerName)

/**
 * Figma WIP · People · Report (805:1970 / 803:1643)
 */
export function SoulPeopleReportScreen() {
  const navigate = useNavigate()
  const t = useCopy()
  const { locale } = useI18n()
  const { personId = 'anna' } = useParams()
  const [partnerName, setPartnerName] = useState(
    demoPerson(personId)?.name || PEOPLE_REPORT_META.partnerName,
  )
  const [report, setReport] = useState<StoredPeopleReport>(fallbackReport)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const person = await getPerson(personId)
        if (cancelled) return
        if (person?.status === 'generating') {
          navigate(`/people/generate/${encodeURIComponent(personId)}`, { replace: true })
          return
        }
        if (person) setPartnerName(person.full_name)
        const stored = await getPersonReport(personId)
        if (cancelled) return
        if (stored?.content) setReport(stored.content)
      } catch {
        /* keep demo copy */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [navigate, personId])

  const reportView = useMemo(
    () => localizeReportForDisplay(report, PEOPLE_REPORT_META.selfName, partnerName),
    [report, partnerName, locale],
  )

  const talkSection = (title: string, body: string) => {
    navigate('/agent', {
      state: {
        starter: t(
          'people.report.talkStarter',
          `Talk through this with me. You and ${partnerName}, “${title}”:\n\n${body}`,
          { partner: partnerName, title, body },
        ),
        quotedNote: title,
        newChat: true,
      },
    })
  }

  const askAboutPair = () => {
    navigate('/agent', {
      state: {
        starter: t('people.report.askStarter', `Ask about you two. Me and ${partnerName}.`, {
          partner: partnerName,
        }),
        quotedNote: t('people.report.quotedPair', `You and ${partnerName}`, { partner: partnerName }),
        newChat: true,
      },
    })
  }

  return (
    <div className="soul-people">
      <SoulRippleBg className="soul-people__bg" />
      <div className="soul-people__scrim" aria-hidden="true" />
      <div className="soul-people__dock-scrim" aria-hidden="true" />

      <div className="soul-people__scroll">
        <header className="soul-people__header soul-people__header--back">
          <div className="soul-people__header-left">
            <button
              type="button"
              className="soul-people__back"
              onClick={() => navigate('/people')}
              aria-label={t('people.backAria', 'Back to People')}
            >
              <img src={iconChevron} alt="" width={22} height={22} />
            </button>
            <SoulBrand />
          </div>
          <div className="soul-people__header-nav" aria-label={t('people.desktopNavAria', 'Desktop navigation')}>
            <SoulNav variant="desktop" />
          </div>
        </header>

        <div className="soul-people__report">
          <section
            className="soul-people__intro soul-people__intro--report"
            aria-labelledby="soul-people-report-title"
          >
            <h1 id="soul-people-report-title" className="soul-people__title">
              {t('people.report.title', `You and ${partnerName}`, { name: partnerName })}
            </h1>
            <p className="soul-people__subtitle soul-people__subtitle--report">
              {reportView.subtitle}
            </p>
          </section>

          <div className="soul-people__cards">
            {reportView.sections.map((section: PeopleReportSection) => {
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
                      {t('people.report.talkThrough', 'Talk this through')}
                      <img src={iconArrow} alt="" width={15} height={15} />
                    </button>
                    <button
                      type="button"
                      className="soul-people__share-btn"
                      aria-label={t('people.report.shareAria', 'Share this section')}
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
            <h2 className="soul-people__closing-title">{reportView.closingTitle}</h2>
            <p className="soul-people__closing-body">{reportView.closingBody}</p>
            <SoulButton block onClick={askAboutPair}>
              {t('people.report.askPair', 'Ask about you two')}
            </SoulButton>
            <button type="button" className="soul-people__text-link" onClick={() => navigate('/people/add')}>
              {t('people.report.addSomeoneElse', 'Add someone else')}
            </button>
            <p className="soul-people__legal">
              <Link to="/terms">{t('people.report.terms', 'Terms')}</Link>
              {' & '}
              <Link to="/privacy">{t('people.report.privacy', 'Privacy Policy')}</Link>
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
