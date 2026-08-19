import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SoulBrand, SoulNav, type SoulNavTab } from '@/components/soul'
import { DEMO_PEOPLE, initialFromName } from './peopleData'
import './soul-people.css'
import bgRipple from '../home/assets/bg-ripple.png'
import iconChevron from './assets/icon-chevron.svg'
import markHero from './assets/pair-mark-hero.svg'
import glassOrb from './assets/pair-glass-orb.png'

const STEPS = [
  'Where the two of you meet',
  'What works without effort',
  'Where you grind',
  'What this year asks of you',
  'The one thing worth changing',
] as const

/** Delay between each checklist line lighting up */
const STEP_MS = 1400
/** Pause after the last line before leaving for the report */
const DONE_MS = 900

/**
 * Figma WIP · People · Generate · Pair (796:3815)
 * Center glass orb stays fixed in the Mark/hero rings; initials ride the revolving rings.
 */
export function SoulPeopleGenerateScreen() {
  const navigate = useNavigate()
  const { personId = 'anna' } = useParams()
  /** How many checklist lines are enabled (0 = all waiting). */
  const [enabledCount, setEnabledCount] = useState(0)

  const name = useMemo(() => {
    const demo = DEMO_PEOPLE.find((p) => p.id === personId)
    if (demo) return demo.name
    try {
      const raw = sessionStorage.getItem('soul-people-draft')
      if (raw) {
        const draft = JSON.parse(raw) as { name?: string }
        if (draft.name) return draft.name
      }
    } catch {
      /* ignore */
    }
    return personId
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }, [personId])

  const selfInitial = 'P'
  const otherInitial = initialFromName(name)

  useEffect(() => {
    if (enabledCount >= STEPS.length) {
      const t = window.setTimeout(() => {
        navigate(`/people/${encodeURIComponent(personId)}`, { replace: true })
      }, DONE_MS)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setEnabledCount((n) => n + 1), STEP_MS)
    return () => window.clearTimeout(t)
  }, [enabledCount, navigate, personId])

  const onNav = (tab: SoulNavTab) => {
    if (tab === 'people') {
      navigate('/people')
      return
    }
    if (tab === 'home') navigate('/')
    else if (tab === 'readings') navigate('/readings')
    else if (tab === 'profile') navigate('/account')
  }

  return (
    <div className="soul-people soul-people--generate">
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

      <div className="soul-people__scroll soul-people__scroll--generate">
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
        </header>

        <section
          className="soul-people__intro soul-people__intro--generate"
          aria-labelledby="soul-people-gen-title"
        >
          <h1 id="soul-people-gen-title" className="soul-people__title">
            Reading you and {name}
          </h1>
          <p className="soul-people__subtitle soul-people__subtitle--generate">
            Five parts. I take them in order.
          </p>
        </section>

        <div className="soul-people__pair" aria-hidden="true">
          {/* Revolving muted rings — letters ride on the ring path */}
          <div className="soul-people__pair-spin">
            <div className="soul-people__pair-mark">
              <img src={markHero} alt="" width={176} height={176} />
            </div>

            <div className="soul-people__pair-carrier soul-people__pair-carrier--self">
              <div className="soul-people__pair-face">
                <span className="soul-people__pair-letter">{selfInitial}</span>
              </div>
            </div>

            <div className="soul-people__pair-carrier soul-people__pair-carrier--other">
              <div className="soul-people__pair-face">
                <span className="soul-people__pair-letter">{otherInitial}</span>
              </div>
            </div>
          </div>

          {/* Magnific glass orb — fixed in the center of the rings */}
          <div className="soul-people__pair-orb-wrap">
            <img
              className="soul-people__pair-orb"
              src={glassOrb}
              alt=""
              width={51}
              height={51}
            />
          </div>
        </div>

        <ul className="soul-people__checklist" aria-live="polite">
          {STEPS.map((label, i) => {
            const on = i < enabledCount
            const current = i === enabledCount - 1
            return (
              <li
                key={label}
                className={[
                  'soul-people__check',
                  on ? 'soul-people__check--on' : 'soul-people__check--dim',
                  current ? 'soul-people__check--current' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span aria-hidden="true">✓</span>
                <span>{label}</span>
              </li>
            )
          })}
        </ul>

        <p className="soul-people__gen-note">
          This one takes a minute. You can leave — it will be here when you come back.
        </p>
      </div>

      <div className="soul-people__nav soul-people__nav--mobile">
        <SoulNav active="people" onChange={onNav} />
      </div>
    </div>
  )
}
