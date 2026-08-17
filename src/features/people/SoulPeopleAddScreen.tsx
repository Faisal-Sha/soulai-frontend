import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SoulBrand, SoulButton, SoulField } from '@/components/soul'
import iconCalendar from '@/components/soul/assets/icon-calendar.svg'
import iconClock from '@/components/soul/assets/icon-clock.svg'
import iconChevronDown from '@/components/soul/assets/icon-chevron-down.svg'
import { BIRTH_PLACE_OPTIONS } from '@/lib/birthPlaces'
import {
  isValidBirthdate,
  type BirthdateValue,
} from '@/features/quiz/lib/dateValidation'
import './soul-people.css'
import bgRipple from '../home/assets/bg-ripple.png'
import iconChevron from './assets/icon-chevron.svg'

function digitsFromBirthdate(v?: BirthdateValue): string {
  if (!v) return ''
  return `${v.day ?? ''}${v.month ?? ''}${v.year ?? ''}`.replace(/\D/g, '').slice(0, 8)
}

function formatDobDisplay(digits: string): string {
  const d = digits.slice(0, 2)
  const m = digits.slice(2, 4)
  const y = digits.slice(4, 8)
  if (!digits) return ''
  if (digits.length <= 2) return d
  if (digits.length <= 4) return `${d} / ${m}`
  return `${d} / ${m} / ${y}`
}

function toBirthdate(digits: string): BirthdateValue {
  return {
    day: digits.slice(0, 2),
    month: digits.slice(2, 4),
    year: digits.slice(4, 8),
  }
}

function toIso(v?: BirthdateValue): string {
  if (!v?.day || !v?.month || v.year?.length !== 4) return ''
  return `${v.year}-${v.month.padStart(2, '0')}-${v.day.padStart(2, '0')}`
}

function formatTimeDisplay(digits: string): string {
  const h = digits.slice(0, 2)
  const m = digits.slice(2, 4)
  if (!digits) return ''
  if (digits.length <= 2) return h
  return `${h}:${m}`
}

function isValidTimeDigits(digits: string): boolean {
  if (digits.length !== 4) return false
  const h = Number(digits.slice(0, 2))
  const m = Number(digits.slice(2, 4))
  return (
    Number.isInteger(h) &&
    Number.isInteger(m) &&
    h >= 0 &&
    h <= 23 &&
    m >= 0 &&
    m <= 59
  )
}

/**
 * Figma WIP · People · Add someone (744:1785)
 * DOB / time pickers match quiz birthdate & birth-time; city is a combobox.
 */
export function SoulPeopleAddScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [dobDigits, setDobDigits] = useState('')
  const [timeDigits, setTimeDigits] = useState('')
  const [place, setPlace] = useState('')
  const [placeOpen, setPlaceOpen] = useState(false)

  const dobNativeRef = useRef<HTMLInputElement>(null)
  const timeNativeRef = useRef<HTMLInputElement>(null)
  const placeWrapRef = useRef<HTMLDivElement>(null)
  const placeInputRef = useRef<HTMLInputElement>(null)

  const dobParsed = toBirthdate(dobDigits)
  const dobFilled = dobDigits.length === 8
  const dobValid = isValidBirthdate(dobParsed)
  const dobInvalid = dobFilled && !dobValid

  const timePartial = timeDigits.length > 0 && timeDigits.length < 4
  const timeInvalid =
    timePartial || (timeDigits.length === 4 && !isValidTimeDigits(timeDigits))
  const timeValue = isValidTimeDigits(timeDigits)
    ? formatTimeDisplay(timeDigits)
    : ''

  const query = place.trim()
  const queryLower = query.toLowerCase()
  const filtered = BIRTH_PLACE_OPTIONS.filter(
    (p) => !queryLower || p.toLowerCase().includes(queryLower),
  )
  const exactMatch = BIRTH_PLACE_OPTIONS.some((p) => p.toLowerCase() === queryLower)
  const showCustom = query.length >= 2 && !exactMatch
  const showPlaceList = placeOpen && (filtered.length > 0 || showCustom)

  const canSubmit =
    name.trim().length > 0 && dobValid && !timeInvalid

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!placeWrapRef.current?.contains(e.target as Node)) setPlaceOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const applyDobDigits = (raw: string) => {
    setDobDigits(raw.replace(/\D/g, '').slice(0, 8))
  }

  const applyTimeDigits = (raw: string) => {
    setTimeDigits(raw.replace(/\D/g, '').slice(0, 4))
  }

  const pickPlace = (next: string) => {
    setPlace(next)
    setPlaceOpen(false)
  }

  const onSubmit = () => {
    if (!canSubmit) return
    const id = name.trim().toLowerCase().replace(/\s+/g, '-') || 'someone'
    try {
      sessionStorage.setItem(
        'soul-people-draft',
        JSON.stringify({
          id,
          name: name.trim(),
          dob: formatDobDisplay(dobDigits),
          time: timeValue,
          place: place.trim(),
        }),
      )
    } catch {
      /* ignore */
    }
    navigate(`/people/generate/${encodeURIComponent(id)}`)
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

      <div className="soul-people__scroll soul-people__scroll--form">
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
          className="soul-people__intro soul-people__intro--list"
          aria-labelledby="soul-people-add-title"
        >
          <h1 id="soul-people-add-title" className="soul-people__title">
            Who should I read you with?
          </h1>
          <p className="soul-people__subtitle">
            Their birth details, the same way you gave me yours.
          </p>
        </section>

        <form
          className="soul-people__form"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <SoulField
            label="Their name"
            htmlFor="people-name"
            inputProps={{
              id: 'people-name',
              placeholder: 'Anna',
              value: name,
              onChange: (e) => setName(e.target.value),
              autoComplete: 'name',
            }}
          />

          <SoulField
            label="Date of birth"
            htmlFor="people-dob"
            tone={dobInvalid ? 'error' : 'none'}
            message={dobInvalid ? 'Please enter a valid date of birth.' : undefined}
          >
            <div
              className={[
                'soul-input',
                'soul-people__picker',
                dobInvalid ? 'soul-input--error' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <input
                id="people-dob"
                className="soul-input__control"
                type="text"
                inputMode="numeric"
                autoComplete="bday"
                placeholder="DD / MM / YYYY"
                value={formatDobDisplay(dobDigits)}
                aria-invalid={dobInvalid || undefined}
                onChange={(e) => applyDobDigits(e.target.value)}
              />
              <button
                type="button"
                className="soul-people__picker-btn"
                aria-label="Open calendar"
                onClick={() =>
                  dobNativeRef.current?.showPicker?.() ?? dobNativeRef.current?.click()
                }
              >
                <img src={iconCalendar} alt="" width={16} height={20} />
              </button>
              <input
                ref={dobNativeRef}
                className="soul-people__native"
                type="date"
                tabIndex={-1}
                aria-hidden="true"
                value={toIso(dobValid ? dobParsed : undefined)}
                max={new Date().toISOString().slice(0, 10)}
                min="1900-01-01"
                onChange={(e) => {
                  const iso = e.target.value
                  if (!iso) return
                  const [y, m, d] = iso.split('-')
                  applyDobDigits(`${d}${m}${y}`)
                }}
              />
            </div>
          </SoulField>

          <SoulField
            label="Time of birth · Optional"
            htmlFor="people-time"
            tone={timeInvalid ? 'error' : 'helper'}
            message={
              timeInvalid
                ? 'Enter a valid time (HH:MM), or leave blank.'
                : 'Without it I read the picture, not the detail.'
            }
          >
            <div
              className={[
                'soul-input',
                'soul-people__picker',
                timeInvalid ? 'soul-input--error' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <input
                id="people-time"
                className="soul-input__control"
                type="text"
                inputMode="numeric"
                placeholder="Select time"
                value={formatTimeDisplay(timeDigits)}
                aria-invalid={timeInvalid || undefined}
                onChange={(e) => applyTimeDigits(e.target.value)}
              />
              <button
                type="button"
                className="soul-people__picker-btn"
                aria-label="Open time picker"
                onClick={() =>
                  timeNativeRef.current?.showPicker?.() ?? timeNativeRef.current?.click()
                }
              >
                <img src={iconClock} alt="" width={16} height={20} />
              </button>
              <input
                ref={timeNativeRef}
                className="soul-people__native"
                type="time"
                tabIndex={-1}
                aria-hidden="true"
                value={
                  isValidTimeDigits(timeDigits)
                    ? `${timeDigits.slice(0, 2)}:${timeDigits.slice(2, 4)}`
                    : ''
                }
                onChange={(e) => {
                  const v = e.target.value
                  if (!v) return
                  applyTimeDigits(v.replace(':', ''))
                }}
              />
            </div>
          </SoulField>

          <SoulField label="Place of birth" htmlFor="people-place">
            <div className="soul-people__place" ref={placeWrapRef}>
              <div
                className={[
                  'soul-input',
                  'soul-people__picker',
                  placeOpen ? 'soul-people__picker--open' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <input
                  ref={placeInputRef}
                  id="people-place"
                  className="soul-input__control"
                  type="text"
                  role="combobox"
                  aria-expanded={placeOpen}
                  aria-controls="people-place-list"
                  aria-autocomplete="list"
                  autoComplete="off"
                  placeholder="Select city"
                  value={place}
                  onChange={(e) => {
                    setPlace(e.target.value)
                    setPlaceOpen(true)
                  }}
                  onFocus={() => setPlaceOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setPlaceOpen(false)
                  }}
                />
                <button
                  type="button"
                  className="soul-people__picker-btn"
                  aria-label={placeOpen ? 'Close city list' : 'Open city list'}
                  tabIndex={-1}
                  onClick={() => {
                    setPlaceOpen((v) => !v)
                    placeInputRef.current?.focus()
                  }}
                >
                  <img
                    className={
                      placeOpen
                        ? 'soul-people__chevron soul-people__chevron--open'
                        : 'soul-people__chevron'
                    }
                    src={iconChevronDown}
                    alt=""
                    width={12}
                    height={20}
                  />
                </button>
              </div>

              {showPlaceList && (
                <ul
                  id="people-place-list"
                  className="soul-people__place-list"
                  role="listbox"
                >
                  {showCustom && (
                    <li role="option" aria-selected={false}>
                      <button
                        type="button"
                        className="soul-people__place-option soul-people__place-option--custom"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pickPlace(query)}
                      >
                        Use &ldquo;{query}&rdquo;
                      </button>
                    </li>
                  )}
                  {filtered.slice(0, 40).map((opt) => (
                    <li key={opt} role="option" aria-selected={opt === place}>
                      <button
                        type="button"
                        className="soul-people__place-option"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pickPlace(opt)}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </SoulField>

          <div className="soul-people__form-cta">
            <SoulButton type="submit" block disabled={!canSubmit}>
              Read us together
            </SoulButton>
            <p className="soul-people__privacy">
              Their details stay private and are never shared.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
