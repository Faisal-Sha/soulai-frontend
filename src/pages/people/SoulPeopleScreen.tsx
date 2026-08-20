import { useMemo } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { SoulBrand, SoulNav } from '@/components/soul'
import { useUser } from '@/hooks/useUser'
import { DEMO_PEOPLE, initialFromName, type PeopleEntry } from './peopleData'
import './soul-people.css'
import bgRipple from '../home/assets/bg-ripple.png'
import iconChevronRight from './assets/icon-chevron-right.svg'

type SoulPeopleScreenProps = {
  /** Override list; empty array = Empty state. Default: demo list. */
  people?: PeopleEntry[]
  /** Force subscription-ended shell — Figma 955:8631 */
  subscriptionEnded?: boolean
}

const ENDED_STATUSES = new Set([
  'canceled',
  'cancelled',
  'expired',
  'inactive',
  'unpaid',
])

const ENDED_BANNER = {
  title: 'Adding people is paused',
  detail:
    'Everything you already read stays open. To read a new pair, resume your subscription.',
} as const

/** Figma 796:3360 — dashed ring 40 + plus 18
 * Ring uses stroke/on-dark (#ffffff59); plus uses brand white (#fffdfa).
 */
function AddSomeoneIcon() {
  return (
    <span className="soul-people__add-icon" aria-hidden="true">
      <svg
        className="soul-people__add-ring"
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          r="18.25"
          stroke="#ffffff59"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="1.2 3.6"
        />
      </svg>
      <svg
        className="soul-people__add-plus"
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 2.75V15.25M2.75 9H15.25"
          stroke="#fffdfa"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

/**
 * Figma WIP · People · Empty (744:1413) · List (744:1577)
 * Subscription ended (955:8631) — `/people?ended=1`
 * Preview: `/people?people=empty` · `/people` (list demo)
 */
export function SoulPeopleScreen({ people, subscriptionEnded: endedProp }: SoulPeopleScreenProps) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { subscription, isPremium } = useUser()

  const subscriptionEnded = useMemo(() => {
    if (endedProp) return true
    if (params.get('ended') === '1' || params.get('ended') === 'true') return true
    const status = subscription?.status?.toLowerCase() ?? ''
    return !isPremium && ENDED_STATUSES.has(status)
  }, [endedProp, params, subscription?.status, isPremium])

  const entries = useMemo(() => {
    if (people) return people
    if (params.get('people') === 'empty') return []
    return DEMO_PEOPLE
  }, [people, params])

  const isEmpty = entries.length === 0

  const onAdd = () => {
    if (subscriptionEnded) return
    navigate('/people/add')
  }

  const onOpenPerson = (entry: PeopleEntry) => {
    if (entry.status === 'generating') {
      navigate(`/people/generate/${entry.id}`)
      return
    }
    navigate(`/people/${entry.id}`)
  }

  const listSubtitle =
    entries.length === 3
      ? 'Three people read against your profile.'
      : entries.length === 1
        ? 'One person read against your profile.'
        : `${entries.length} people read against your profile.`

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

        {subscriptionEnded ? (
          <div className="soul-people__notice" role="status">
            <div className="soul-people__notice-copy">
              <p className="soul-people__notice-title">{ENDED_BANNER.title}</p>
              <p className="soul-people__notice-detail">{ENDED_BANNER.detail}</p>
            </div>
            <Link className="soul-people__notice-manage" to="/account/plan">
              Manage
            </Link>
          </div>
        ) : null}

        <section
          className={`soul-people__intro${isEmpty ? '' : ' soul-people__intro--list'}`}
          aria-labelledby="soul-people-title"
        >
          <h1 id="soul-people-title" className="soul-people__title">
            People
          </h1>
          {isEmpty ? (
            <div className="soul-people__empty-copy">
              <p className="soul-people__lead">No one here yet.</p>
              <p className="soul-people__subtitle">
                It works best with someone you already know well — a partner, a parent, a close
                friend.
              </p>
            </div>
          ) : (
            <p className="soul-people__subtitle">{listSubtitle}</p>
          )}
        </section>

        <section
          className={`soul-people__body${isEmpty ? '' : ' soul-people__body--list'}${subscriptionEnded && !isEmpty ? ' soul-people__body--ended' : ''}`}
          aria-label={isEmpty ? 'Add someone' : 'People list'}
        >
          {!subscriptionEnded ? (
            <button type="button" className="soul-people__add" onClick={onAdd}>
              <span className="soul-people__add-inner">
                <AddSomeoneIcon />
                <span className="soul-people__add-label">Add someone</span>
              </span>
            </button>
          ) : null}

          {!isEmpty ? (
            <>
              {!subscriptionEnded ? (
                <div className="soul-people__spacer" aria-hidden="true" />
              ) : null}
              <ul className="soul-people__list">
                {entries.map((entry) => (
                  <li key={entry.id} className="soul-people__list-item">
                    <button
                      type="button"
                      className="soul-people__row"
                      onClick={() => onOpenPerson(entry)}
                    >
                      <span className="soul-people__avatar" aria-hidden="true">
                        <span className="soul-people__avatar-letter">
                          {initialFromName(entry.name)}
                        </span>
                      </span>
                      <span className="soul-people__row-body">
                        <span className="soul-people__row-name">{entry.name}</span>
                        <span className="soul-people__row-meta">{entry.summary}</span>
                      </span>
                      <img
                        className="soul-people__chevron"
                        src={iconChevronRight}
                        alt=""
                        width={16}
                        height={16}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      </div>

      <div className="soul-people__nav soul-people__nav--mobile">
        <SoulNav />
      </div>
    </div>
  )
}
