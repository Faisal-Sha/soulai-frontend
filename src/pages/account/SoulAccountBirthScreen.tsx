import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulButton, SoulField, SoulNav, SoulRippleBg } from '@/components/soul'
import iconCalendar from '@/components/soul/assets/icon-calendar.svg'
import iconClock from '@/components/soul/assets/icon-clock.svg'
import { useUser } from '@/hooks/useUser'
import {
  isValidBirthdate,
  type BirthdateValue,
} from '@/pages/quiz/lib/dateValidation'
import './soul-account.css'
import iconBack from '../people/assets/icon-chevron.svg'
import { formatBirthTime } from './profileDisplay'

function digitsFromIso(iso: string | null | undefined): string {
  const m = iso ? /^(\d{4})-(\d{2})-(\d{2})/.exec(iso) : null
  return m ? `${m[3]}${m[2]}${m[1]}` : ''
}

function digitsFromTime(raw: string | null | undefined): string {
  return (formatBirthTime(raw) ?? '').replace(/\D/g, '').slice(0, 4)
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
 * Account · Birth details. Same identity columns the quiz wrote.
 * Fields match People · Add (dark glass, not the cream Know card).
 */
export function SoulAccountBirthScreen() {
  const navigate = useNavigate()
  const { user, profile, loading, updateIdentity } = useUser()
  const [name, setName] = useState('')
  const [dobDigits, setDobDigits] = useState('')
  const [timeDigits, setTimeDigits] = useState('')
  const [place, setPlace] = useState('')
  const [saving, setSaving] = useState(false)
  const dobNativeRef = useRef<HTMLInputElement>(null)
  const timeNativeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!profile) return
    setName(profile.full_name?.trim() ?? '')
    setDobDigits(digitsFromIso(profile.dob))
    setTimeDigits(digitsFromTime(profile.birth_time))
    setPlace(profile.birth_place?.trim() ?? '')
  }, [profile])

  if (!loading && !user) {
    return <Navigate to="/login" replace />
  }

  const dobParsed = toBirthdate(dobDigits)
  const dobFilled = dobDigits.length === 8
  const dobValid = isValidBirthdate(dobParsed)
  const dobInvalid = dobFilled && !dobValid
  const timePartial = timeDigits.length > 0 && timeDigits.length < 4
  const timeInvalid =
    timePartial || (timeDigits.length === 4 && !isValidTimeDigits(timeDigits))

  const canSave = name.trim().length > 0 && !saving && !dobInvalid && !timeInvalid

  const applyDobDigits = (raw: string) => {
    setDobDigits(raw.replace(/\D/g, '').slice(0, 8))
  }

  const applyTimeDigits = (raw: string) => {
    setTimeDigits(raw.replace(/\D/g, '').slice(0, 4))
  }

  const onSave = async () => {
    if (!canSave) return
    setSaving(true)
    try {
      await updateIdentity({
        full_name: name.trim(),
        birth_date: dobValid ? toIso(dobParsed) : null,
        birth_time: isValidTimeDigits(timeDigits) ? formatTimeDisplay(timeDigits) : null,
        birth_place: place.trim() || null,
      })
      toast.success('Birth details saved')
      navigate('/account', { replace: true })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not save'
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="soul-account" data-name="Account · Birth details">
      <SoulRippleBg className="soul-account__bg" />
      <div className="soul-account__scrim" aria-hidden="true" />
      <div className="soul-account__dock-scrim" aria-hidden="true" />

      <div className="soul-account__scroll">
        <header className="soul-account__header soul-account__header--back">
          <div className="soul-account__header-left">
            <button
              type="button"
              className="soul-account__back"
              onClick={() => navigate('/account')}
              aria-label="Back to account"
            >
              <img src={iconBack} alt="" width={22} height={22} />
            </button>
            <SoulBrand />
          </div>
          <div className="soul-account__header-nav" aria-label="Desktop navigation">
            <SoulNav variant="desktop" />
          </div>
        </header>

        <section className="soul-account__intro" aria-labelledby="soul-account-birth-title">
          <h1 id="soul-account-birth-title" className="soul-account__title">
            Birth details
          </h1>
          <p className="soul-account__subtitle">
            Changing these rewrites your reading. Use the same facts you were born with.
          </p>
        </section>

        <form
          className="soul-account__birth"
          onSubmit={(e) => {
            e.preventDefault()
            void onSave()
          }}
        >
          <SoulField
            htmlFor="birth-name"
            label="Your name"
            inputProps={{
              id: 'birth-name',
              value: name,
              onChange: (e) => setName(e.target.value),
              autoComplete: 'name',
              placeholder: 'How I should address you',
            }}
          />
          <SoulField
            htmlFor="birth-date"
            label="Date of birth"
            tone={dobInvalid ? 'error' : 'none'}
            message={dobInvalid ? 'Please enter a valid date of birth.' : undefined}
          >
            <div
              className={[
                'soul-input',
                'soul-account__picker',
                dobInvalid ? 'soul-input--error' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <input
                id="birth-date"
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
                className="soul-account__picker-btn"
                aria-label="Open calendar"
                onClick={() =>
                  dobNativeRef.current?.showPicker?.() ?? dobNativeRef.current?.click()
                }
              >
                <img src={iconCalendar} alt="" width={16} height={20} />
              </button>
              <input
                ref={dobNativeRef}
                className="soul-account__native"
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
            htmlFor="birth-time"
            label="Time of birth"
            message={
              timeInvalid
                ? 'Enter a valid time (HH:MM), or leave blank.'
                : 'Leave blank if you do not know it.'
            }
            tone={timeInvalid ? 'error' : 'helper'}
          >
            <div
              className={[
                'soul-input',
                'soul-account__picker',
                timeInvalid ? 'soul-input--error' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <input
                id="birth-time"
                className="soul-input__control"
                type="text"
                inputMode="numeric"
                placeholder="HH:MM"
                value={formatTimeDisplay(timeDigits)}
                aria-invalid={timeInvalid || undefined}
                onChange={(e) => applyTimeDigits(e.target.value)}
              />
              <button
                type="button"
                className="soul-account__picker-btn"
                aria-label="Open time picker"
                onClick={() =>
                  timeNativeRef.current?.showPicker?.() ?? timeNativeRef.current?.click()
                }
              >
                <img src={iconClock} alt="" width={16} height={20} />
              </button>
              <input
                ref={timeNativeRef}
                className="soul-account__native"
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
          <SoulField
            htmlFor="birth-place"
            label="Place of birth"
            inputProps={{
              id: 'birth-place',
              value: place,
              onChange: (e) => setPlace(e.target.value),
              autoComplete: 'off',
              placeholder: 'City, country',
            }}
          />
          <SoulButton
            type="submit"
            block
            className="soul-account__birth-save"
            disabled={!canSave}
          >
            {saving ? 'Saving…' : 'Save'}
          </SoulButton>
        </form>
      </div>

      <div className="soul-account__nav soul-account__nav--mobile">
        <SoulNav />
      </div>
    </div>
  )
}
