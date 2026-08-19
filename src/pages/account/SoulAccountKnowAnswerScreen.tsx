import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { SoulBrand, SoulButton, SoulNav, SoulTextarea, type SoulNavTab } from '@/components/soul'
import {
  findKnowQuestion,
  getKnowSections,
  knowProgress,
  writeKnowAnswer,
} from './knowData'
import './soul-account.css'
import bgRipple from '../home/assets/bg-ripple.png'
import iconArrowLight from '../readings/assets/icon-arrow-light.svg'
import iconBack from '../people/assets/icon-chevron.svg'

/**
 * Figma WIP · Account · What I know · Answering a question (818:3017)
 * iOS keyboard in the mock is not implemented.
 */
export function SoulAccountKnowAnswerScreen() {
  const navigate = useNavigate()
  const { questionId = '' } = useParams()
  const hit = useMemo(() => findKnowQuestion(questionId), [questionId])

  const [value, setValue] = useState(() => hit?.question.answer ?? '')
  const [savedTick, setSavedTick] = useState(0)

  useEffect(() => {
    setValue(hit?.question.answer ?? '')
  }, [hit?.question.answer, questionId])

  useEffect(() => {
    const t = window.setTimeout(() => {
      const el = document.getElementById(`know-answer-${questionId}`) as HTMLTextAreaElement | null
      if (!el) return
      el.focus()
      const len = el.value.length
      el.setSelectionRange(len, len)
    }, 60)
    return () => window.clearTimeout(t)
  }, [questionId])

  const progress = useMemo(
    () => knowProgress(getKnowSections()),
    [questionId, savedTick],
  )

  if (!hit) {
    return <Navigate to="/account/know" replace />
  }

  const { section, question, index } = hit
  const remaining = section.questions.slice(index + 1)
  const doneInSection = section.questions.filter((q) => q.answer?.trim()).length
  const totalInSection = section.questions.length
  const canSave = value.trim().length > 0

  const onNav = (tab: SoulNavTab) => {
    if (tab === 'profile') {
      navigate('/account')
      return
    }
    if (tab === 'home') navigate('/')
    else if (tab === 'readings') navigate('/readings')
    else if (tab === 'people') navigate('/people')
  }

  const persist = () => {
    if (!canSave) return false
    writeKnowAnswer(question.id, value)
    setSavedTick((n) => n + 1)
    return true
  }

  const onSave = () => {
    if (!persist()) return
    navigate('/account/know', { replace: true })
  }

  const onOpenRemaining = (id: string) => {
    if (canSave) persist()
    navigate(`/account/know/${id}`)
  }

  return (
    <div className="soul-account" data-name="Account · What I know about you · Answering a question">
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
              onClick={() => navigate('/account/know')}
              aria-label="Back to What I know"
            >
              <img src={iconBack} alt="" width={22} height={22} />
            </button>
            <SoulBrand />
          </div>
          <div className="soul-account__header-nav" aria-label="Desktop navigation">
            <SoulNav active="profile" onChange={onNav} className="soul-account__top-nav" />
          </div>
        </header>

        <section className="soul-account__intro" aria-labelledby="soul-account-know-answer-title">
          <h1 id="soul-account-know-answer-title" className="soul-account__title">
            What I know about you
          </h1>
          <p className="soul-account__subtitle">
            Your birth data gives me the shape. What you tell me here gives me the detail — and every
            answer changes what I say next.
          </p>
        </section>

        <div className="soul-account__know soul-account__know--answer">
          <p className="soul-account__know-progress soul-account__sr-only" aria-live="polite">
            {progress.answered} of {progress.total} answered
          </p>

          <header className="soul-account__know-head">
            <div className="soul-account__know-head-row">
              <h2 className="soul-account__know-section-title">{section.title}</h2>
              <span className="soul-account__know-count">
                {doneInSection} of {totalInSection}
              </span>
            </div>
            {doneInSection === totalInSection && section.completeNote ? (
              <p className="soul-account__know-note">{section.completeNote}</p>
            ) : null}
          </header>

          <div className="soul-account__know-list">
            <article className="soul-account__answer-card">
              <p className="soul-account__answer-prompt">{question.prompt}</p>
              <SoulTextarea
                id={`know-answer-${question.id}`}
                rows={3}
                className="soul-account__answer-textarea"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Write in your own words…"
                aria-label={question.prompt}
              />
              <SoulButton
                type="button"
                block
                className="soul-account__answer-save"
                disabled={!canSave}
                onClick={onSave}
              >
                Save
              </SoulButton>
            </article>

            {remaining.map((q) => {
              const answered = Boolean(q.answer?.trim())
              return (
                <article key={q.id} className="soul-account__know-card">
                  <p className="soul-account__know-prompt">{q.prompt}</p>
                  <button
                    type="button"
                    className="soul-account__know-link soul-account__know-link--on-dark"
                    onClick={() => onOpenRemaining(q.id)}
                  >
                    {answered ? 'Update' : 'Answer'}
                    <img src={iconArrowLight} alt="" width={14} height={14} />
                  </button>
                </article>
              )
            })}
          </div>
        </div>
      </div>

      <div className="soul-account__nav soul-account__nav--mobile">
        <SoulNav active="profile" onChange={onNav} />
      </div>
    </div>
  )
}
