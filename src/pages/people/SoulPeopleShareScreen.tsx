import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulNav } from '@/components/soul'
import { DEMO_PEOPLE } from './peopleData'
import { PEOPLE_REPORT_META } from './reportContent'
import './soul-people.css'
import bgRipple from '../home/assets/bg-ripple.png'
import inviteMark from './assets/invite-mark.svg'
import iconLink from './assets/icon-link.svg'

/**
 * Figma WIP · People · Share card (748:1512)
 */
export function SoulPeopleShareScreen() {
  const navigate = useNavigate()
  const { personId = 'anna' } = useParams()
  const partnerName =
    DEMO_PEOPLE.find((p) => p.id === personId)?.name || PEOPLE_REPORT_META.partnerName

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${PEOPLE_REPORT_META.shareLink}`)
      toast.message('Link copied')
    } catch {
      toast.message('Could not copy')
    }
  }

  return (
    <div className="soul-people soul-people--share">
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

      <div className="soul-people__scroll soul-people__scroll--share">
        <header className="soul-people__header">
          <button
            type="button"
            className="soul-people__brand"
            onClick={() => navigate('/')}
            aria-label="SOUL+AI home"
          >
            <SoulBrand />
          </button>
          <div className="soul-people__header-nav" aria-label="Desktop navigation">
            <SoulNav variant="desktop" />
          </div>
        </header>

        <div className="soul-people__share">
          <section
            className="soul-people__intro soul-people__intro--share"
            aria-labelledby="soul-people-share-title"
          >
            <h1 id="soul-people-share-title" className="soul-people__title">
              Share with {partnerName}
            </h1>
            <p className="soul-people__subtitle soul-people__subtitle--share">
              She reads one line — then her own.
            </p>
          </section>

          <article className="soul-people__invite">
            <div className="soul-people__invite-brand">
              <img
                className="soul-people__invite-mark"
                src={inviteMark}
                alt=""
                width={20}
                height={20}
              />
              <span>SOUL+AI</span>
            </div>
            <hr className="soul-people__invite-rule" />
            <div className="soul-people__invite-body">
              <p className="soul-people__invite-quote">
                “{PEOPLE_REPORT_META.shareQuote}”
              </p>
              <p className="soul-people__invite-pair">
                {PEOPLE_REPORT_META.selfName} and {partnerName}
              </p>
            </div>
          </article>

          <p className="soul-people__share-note">
            Nothing else travels with the link — birth details and the rest of the reading stay
            private.
          </p>

          <div className="soul-people__link-field">
            <img
              className="soul-people__link-icon-img"
              src={iconLink}
              alt=""
              width={18}
              height={18}
            />
            <span className="soul-people__link-url">{PEOPLE_REPORT_META.shareLink}</span>
            <button type="button" className="soul-people__copy" onClick={() => void onCopy()}>
              Copy link
            </button>
          </div>
        </div>
      </div>

      <div className="soul-people__nav soul-people__nav--mobile">
        <SoulNav />
      </div>
    </div>
  )
}
