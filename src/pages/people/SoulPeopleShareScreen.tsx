import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulNav, SoulRippleBg } from '@/components/soul'
import { displayName } from '@/pages/account/profileDisplay'
import { useUser } from '@/hooks/useUser'
import { PEOPLE_REPORT_META } from './reportContent'
import { demoPerson, getPerson, getPersonReport } from './peopleApi'
import './soul-people.css'
import inviteMark from './assets/invite-mark.svg'
import iconLink from './assets/icon-link.svg'

/**
 * Figma WIP · People · Share card (748:1512)
 */
export function SoulPeopleShareScreen() {
  const navigate = useNavigate()
  const { personId = 'anna' } = useParams()
  const { profile } = useUser()
  const [partnerName, setPartnerName] = useState(
    demoPerson(personId)?.name || PEOPLE_REPORT_META.partnerName,
  )
  const [quote, setQuote] = useState(PEOPLE_REPORT_META.shareQuote)
  const [shareUrl, setShareUrl] = useState('')

  const selfName = displayName(profile?.full_name, profile?.email)

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    setShareUrl(`${origin}/people/${personId}/share`)

    let cancelled = false
    void (async () => {
      try {
        const person = await getPerson(personId)
        if (cancelled) return
        if (person) setPartnerName(person.full_name)
        const stored = await getPersonReport(personId)
        if (cancelled) return
        if (stored?.content?.shareQuote) setQuote(stored.content.shareQuote)
        if (stored?.share_token && origin) {
          setShareUrl(`${origin}/people/${personId}/share`)
        }
      } catch {
        /* demo link */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [personId])

  const displayLink = shareUrl.replace(/^https?:\/\//, '')

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || `https://${PEOPLE_REPORT_META.shareLink}`)
      toast.message('Link copied')
    } catch {
      toast.message('Could not copy')
    }
  }

  return (
    <div className="soul-people soul-people--share">
      <SoulRippleBg className="soul-people__bg" />
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
              She reads one line. Then her own.
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
                “{quote}”
              </p>
              <p className="soul-people__invite-pair">
                {selfName} and {partnerName}
              </p>
            </div>
          </article>

          <p className="soul-people__share-note">
            Nothing else travels with the link. Birth details and the rest of the reading stay
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
            <span className="soul-people__link-url">{displayLink || PEOPLE_REPORT_META.shareLink}</span>
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
