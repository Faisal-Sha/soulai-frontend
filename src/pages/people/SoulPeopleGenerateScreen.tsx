import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SoulBrand, SoulNav, SoulRippleBg } from '@/components/soul'
import { DEMO_PEOPLE, initialFromName } from './peopleData'
import './soul-people.css'
import iconChevron from './assets/icon-chevron.svg'
import markHero from './assets/pair-mark-hero.svg'
import { SoulGlassOrb } from '../quiz/SoulGlassOrb'

const STEPS = [
  'Where the two of you meet',
  'What works without effort',
  'Where you grind',
  'What this year asks of you',
  'The one thing worth changing',
] as const

/** Figma 1017:3884 cohort — 10.5s play-once, then a short settle before the report */
const SEQUENCE_MS = 10500
const DONE_MS = 900

/**
 * Figma DEV · People · Generate · Pair (1017:3884)
 * Mark/hero steps 180° per checklist item; P / A stay on the ring; orb stays centered.
 */
export function SoulPeopleGenerateScreen() {
  const navigate = useNavigate()
  const { personId = 'anna' } = useParams()

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
    const t = window.setTimeout(() => {
      navigate(`/people/${encodeURIComponent(personId)}`, { replace: true })
    }, SEQUENCE_MS + DONE_MS)
    return () => window.clearTimeout(t)
  }, [navigate, personId])

  return (
    <div
      className="soul-people soul-people--generate"
      data-name="People · Generate · Pair"
    >
      <SoulRippleBg className="soul-people__bg" />
      <div className="soul-people__scrim" aria-hidden="true" />
      <div className="soul-people__dock-scrim" aria-hidden="true" />

      <div className="soul-people__scroll soul-people__scroll--generate">
        <header className="soul-people__header soul-people__header--back soul-people-gen__enter soul-people-gen__enter--header">
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

        <section
          className="soul-people__intro soul-people__intro--generate"
          aria-labelledby="soul-people-gen-title"
        >
          <h1
            id="soul-people-gen-title"
            className="soul-people__title soul-people-gen__enter soul-people-gen__enter--title"
          >
            Reading you and {name}
          </h1>
          <p className="soul-people__subtitle soul-people__subtitle--generate soul-people-gen__enter soul-people-gen__enter--subtitle">
            Five parts. I take them in order.
          </p>
        </section>

        <div className="soul-people__pair" aria-hidden="true">
          <div className="soul-people__pair-mark">
            <img src={markHero} alt="" width={176} height={176} />
          </div>

          <div className="soul-people__pair-orb-wrap soul-people-gen__enter soul-people-gen__enter--orb">
            <SoulGlassOrb className="soul-people__pair-orb" width={51} height={51} />
          </div>

          <div className="soul-people__pair-letter soul-people__pair-letter--self soul-people-gen__enter soul-people-gen__enter--letter-self">
            <span className="soul-people__pair-face soul-people__pair-face--self">
              {selfInitial}
            </span>
          </div>

          <div className="soul-people__pair-letter soul-people__pair-letter--other soul-people-gen__enter soul-people-gen__enter--letter-other">
            <span className="soul-people__pair-face soul-people__pair-face--other">
              {otherInitial}
            </span>
          </div>
        </div>

        <ul className="soul-people__checklist" aria-live="polite">
          {STEPS.map((label, i) => (
            <li key={label} className={`soul-people__check soul-people__check--${i + 1}`}>
              <span aria-hidden="true">✓</span>
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <p className="soul-people__gen-note soul-people-gen__enter soul-people-gen__enter--note">
          This one takes a minute. You can leave — it will be here when you come back.
        </p>
      </div>

      <div className="soul-people__nav soul-people__nav--mobile soul-people-gen__enter soul-people-gen__enter--dock">
        <SoulNav />
      </div>
    </div>
  )
}
