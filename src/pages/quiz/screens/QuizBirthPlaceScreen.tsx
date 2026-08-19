import { useEffect, useRef, useState } from 'react'
import { SoulBrand, SoulButton, SoulProgress } from '@/components/soul'
import { useCitySearch } from '../hooks/useCitySearch'
import { getCityDisplayMeta, type CitySearchResult } from '../services/citySearch'
import type { BirthPlaceData } from '../types'
import '../quiz-birthplace.css'
import bgBirthPlace from '../assets/onboarding/bg-birthplace.png'

interface QuizBirthPlaceScreenProps {
  value: string | undefined
  onPlaceChange: (label: string, place: BirthPlaceData | null) => void
  onContinue: () => void
  canProceed: boolean
}

function toBirthPlaceData(result: CitySearchResult): BirthPlaceData {
  return {
    label: result.label,
    city: result.city,
    country: result.country,
    countryCode: result.countryCode,
    state: result.state,
    latitude: result.latitude,
    longitude: result.longitude,
  }
}

/**
 * Figma DEV · 02.3 · Quiz · Place of birth (node 437:2940)
 * Combobox — Photon city search as you type, or enter any place manually.
 */
export default function QuizBirthPlaceScreen({
  value = '',
  onPlaceChange,
  onContinue,
  canProceed,
}: QuizBirthPlaceScreenProps) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const query = value.trim()
  const queryLower = query.toLowerCase()
  const { results, loading, error } = useCitySearch(query)

  const exactMatch = results.some((r) => r.label.toLowerCase() === queryLower)
  const showCustom = query.length >= 2 && !exactMatch
  const showList = open && (loading || error || results.length > 0 || showCustom)

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

  const pick = (label: string, place: BirthPlaceData | null) => {
    onPlaceChange(label, place)
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
                    onPlaceChange(e.target.value, null)
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
                  {loading && query.length >= 2 && (
                    <li className="soul-bp__list-status" aria-live="polite">
                      Searching…
                    </li>
                  )}
                  {error && !loading && (
                    <li className="soul-bp__list-status soul-bp__list-status--error">
                      Could not load cities. Type your place manually.
                    </li>
                  )}
                  {showCustom && (
                    <li role="option" aria-selected={false}>
                      <button
                        type="button"
                        className="soul-bp__option soul-bp__option--custom"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pick(query, null)}
                      >
                        Use &ldquo;{query}&rdquo;
                      </button>
                    </li>
                  )}
                  {results.map((opt) => {
                    const meta = getCityDisplayMeta(opt)
                    const key = `${opt.latitude}-${opt.longitude}-${opt.city}`
                    return (
                      <li key={key} role="option" aria-selected={opt.label === value}>
                        <button
                          type="button"
                          className="soul-bp__option"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => pick(opt.label, toBirthPlaceData(opt))}
                        >
                          <span className="soul-bp__option-label">{opt.city}</span>
                          {meta ? (
                            <span className="soul-bp__option-meta">{meta}</span>
                          ) : null}
                        </button>
                      </li>
                    )
                  })}
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
