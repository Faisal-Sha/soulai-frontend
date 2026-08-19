import { useEffect, useRef, useState } from 'react'
import { SoulBrand, SoulButton, SoulProgress } from '@/components/soul'
import { BIRTH_PLACE_OPTIONS } from '@/lib/birthPlaces'
import '../quiz-birthplace.css'
import bgBirthPlace from '../assets/onboarding/bg-birthplace.png'

const PLACE_OPTIONS = BIRTH_PLACE_OPTIONS

interface QuizBirthPlaceScreenProps {
  value: string | undefined
  onChange: (v: string) => void
  onContinue: () => void
  canProceed: boolean
}

/**
 * Figma DEV · 02.3 · Quiz · Place of birth (node 437:2940)
 * Combobox — pick from the list or type any place.
 */
export default function QuizBirthPlaceScreen({
  value = '',
  onChange,
  onContinue,
  canProceed,
}: QuizBirthPlaceScreenProps) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const query = value.trim()
  const queryLower = query.toLowerCase()
  const filtered = PLACE_OPTIONS.filter((p) =>
    !queryLower || p.toLowerCase().includes(queryLower),
  )
  const exactMatch = PLACE_OPTIONS.some((p) => p.toLowerCase() === queryLower)
  const showCustom = query.length >= 2 && !exactMatch
  const showList = open && (filtered.length > 0 || showCustom)

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const pick = (place: string) => {
    onChange(place)
    setOpen(false)
  }

  return (
    <div className="soul-bp" data-name="02.3 · Quiz · Place of birth">
      <div className="soul-bp__bg" aria-hidden="true">
        <img className="soul-bp__bg-img" src={bgBirthPlace} alt="" />
        <div className="soul-bp__bg-dim" />
      </div>

      <div className="soul-bp__frame">
        <div className="soul-bp__scrim" aria-hidden="true" />

        <div className="soul-bp__content">
          <header className="soul-bp__header">
            <SoulBrand />
          </header>

          <div className="soul-bp__progress-wrap">
            <SoulProgress step={5} total={6} />
          </div>

          <section className="soul-bp__hero">
            <h1 className="soul-bp__title">Where were you born?</h1>
            <p className="soul-bp__subtitle">
              The place you come from shapes how you think — it helps me read your patterns
              more accurately.
            </p>
          </section>

          <div className="soul-bp__form">
            <div className="soul-bp__field" ref={wrapRef}>
              <label className="soul-bp__label" htmlFor="soul-bp-input">
                Place of birth
              </label>
              <div className={`soul-bp__input-wrap${open ? ' soul-bp__input-wrap--open' : ''}`}>
                <input
                  ref={inputRef}
                  id="soul-bp-input"
                  className="soul-bp__input"
                  type="text"
                  role="combobox"
                  aria-expanded={open}
                  aria-controls="soul-bp-list"
                  aria-autocomplete="list"
                  autoComplete="off"
                  placeholder="City, Country"
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                    setOpen(true)
                  }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && canProceed) {
                      e.preventDefault()
                      setOpen(false)
                      onContinue()
                    }
                    if (e.key === 'Escape') setOpen(false)
                  }}
                />
                <button
                  type="button"
                  className="soul-bp__chevron-btn"
                  aria-label={open ? 'Close options' : 'Open options'}
                  tabIndex={-1}
                  onClick={() => {
                    setOpen((v) => !v)
                    inputRef.current?.focus()
                  }}
                >
                  <ChevronIcon open={open} />
                </button>
              </div>
              <p className="soul-bp__helper">
                Pick a city or type your own — any place works.
              </p>

              {showList && (
                <ul id="soul-bp-list" className="soul-bp__list" role="listbox">
                  {showCustom && (
                    <li role="option" aria-selected={false}>
                      <button
                        type="button"
                        className="soul-bp__option soul-bp__option--custom"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pick(query)}
                      >
                        Use &ldquo;{query}&rdquo;
                      </button>
                    </li>
                  )}
                  {filtered.slice(0, 40).map((opt) => (
                    <li key={opt} role="option" aria-selected={opt === value}>
                      <button
                        type="button"
                        className="soul-bp__option"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pick(opt)}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="soul-bp__actions">
              <SoulButton
                block
                onClick={onContinue}
                disabled={!canProceed}
                aria-label="Continue"
              >
                Continue
              </SoulButton>
              <p className="soul-bp__privacy">
                Your details stay private and are never shared.
              </p>
            </div>
          </div>

          <div className="soul-bp__spacer" />
        </div>
      </div>
    </div>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 150ms ease' }}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
