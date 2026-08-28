import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { SoulBrand, SoulButton, SoulField, SoulNav } from '@/components/soul'
import { useUser } from '@/hooks/useUser'
import './soul-account.css'
import bgRipple from '../home/assets/bg-ripple.png'
import iconBack from '../people/assets/icon-chevron.svg'
import { dateInputValue, formatBirthTime } from './profileDisplay'

/**
 * Account · Birth details — edits the same identity columns the quiz wrote.
 * Changing them is meant to rewrite later readings.
 */
export function SoulAccountBirthScreen() {
  const navigate = useNavigate()
  const { user, profile, loading, updateIdentity } = useUser()
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [time, setTime] = useState('')
  const [place, setPlace] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!profile) return
    setName(profile.full_name?.trim() ?? '')
    setDob(dateInputValue(profile.dob))
    setTime(formatBirthTime(profile.birth_time) ?? '')
    setPlace(profile.birth_place?.trim() ?? '')
  }, [profile])

  if (!loading && !user) {
    return <Navigate to="/login" replace />
  }

  const canSave = name.trim().length > 0 && !saving

  const onSave = async () => {
    if (!canSave) return
    setSaving(true)
    try {
      await updateIdentity({
        full_name: name.trim(),
        birth_date: dob || null,
        birth_time: time || null,
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
      <div className="soul-account__bg" aria-hidden="true">
        <div className="soul-account__bg-tile soul-account__bg-tile--1">
          <img src={bgRipple} alt="" />
          <span className="soul-account__bg-dim" />
        </div>
        <div className="soul-account__bg-tile soul-account__bg-tile--2">
          <img src={bgRipple} alt="" />
          <span className="soul-account__bg-dim" />
        </div>
      </div>
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

        <div className="soul-account__birth">
          <article className="soul-account__answer-card">
            <SoulField
              htmlFor="birth-name"
              label="Your name"
              inputProps={{
                value: name,
                onChange: (e) => setName(e.target.value),
                autoComplete: 'name',
                placeholder: 'How I should address you',
              }}
            />
            <SoulField
              htmlFor="birth-date"
              label="Date of birth"
              inputProps={{
                type: 'date',
                kind: 'date',
                value: dob,
                onChange: (e) => setDob(e.target.value),
              }}
            />
            <SoulField
              htmlFor="birth-time"
              label="Time of birth"
              message="Leave blank if you do not know it."
              tone="helper"
              inputProps={{
                type: 'time',
                kind: 'time',
                value: time,
                onChange: (e) => setTime(e.target.value),
              }}
            />
            <SoulField
              htmlFor="birth-place"
              label="Place of birth"
              inputProps={{
                value: place,
                onChange: (e) => setPlace(e.target.value),
                autoComplete: 'off',
                placeholder: 'City, country',
              }}
            />
            <SoulButton
              type="button"
              block
              className="soul-account__answer-save"
              disabled={!canSave}
              onClick={() => void onSave()}
            >
              {saving ? 'Saving…' : 'Save'}
            </SoulButton>
          </article>
        </div>
      </div>

      <div className="soul-account__nav soul-account__nav--mobile">
        <SoulNav />
      </div>
    </div>
  )
}
