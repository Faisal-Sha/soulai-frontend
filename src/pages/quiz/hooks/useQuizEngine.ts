import { useState, useEffect, useCallback, useRef } from 'react'
import { QUIZ_FLOW, QUESTION_TYPES } from '../data/quizFlow'
import { readFunnelState, patchFunnelState } from '../lib/funnelAnalytics'
import { isValidBirthdate } from '../lib/dateValidation'
import type { QuizAnswers, QuizAnswerValue, QuizScreen, BirthPlaceData } from '../types'

const LS_STATE = 'soul_v7_state' // bumped: FigJam frontend remap (email before analyzing + new steps)
const LS_IDX_LEGACY = 'soul-idx'
const LS_ANS_LEGACY = 'soul-ans'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ── Pure validation function (exported for unit testing) ──────────────────────
export function canProceed(screen: QuizScreen, answers: QuizAnswers): boolean {
  const type = screen.type
  if (!QUESTION_TYPES.includes(type as typeof QUESTION_TYPES[number])) return true
  if (type === 'slider') return true

  const id = screen.id as keyof QuizAnswers
  const value = answers[id]

  if (type === 'email') {
    return typeof answers.email === 'string' && EMAIL_RE.test(answers.email)
  }
  if (type === 'date') {
    return isValidBirthdate(answers.birthdate)
  }
  if (type === 'multi') {
    return Array.isArray(value) && (value as string[]).length > 0
  }
  if (type === 'text') {
    return typeof value === 'string' && value.trim().length > 0
  }
  return value !== undefined
}

/** FigJam: birth-time step is always shown (certainty / skip handled on-screen). */
export function shouldSkipScreen(screen: QuizScreen, _answers: QuizAnswers): boolean {
  void screen
  void _answers
  return false
}

// ── localStorage helpers ──────────────────────────────────────────────────────
function migrateLegacyStorage(): { idx: number; answers: QuizAnswers } {
  try {
    const rawIdx = localStorage.getItem(LS_IDX_LEGACY)
    const rawAns = localStorage.getItem(LS_ANS_LEGACY)
    const idx = rawIdx ? parseInt(rawIdx, 10) : 0
    const answers: QuizAnswers = rawAns ? JSON.parse(rawAns) : {}
    if (rawIdx || rawAns) {
      localStorage.removeItem(LS_IDX_LEGACY)
      localStorage.removeItem(LS_ANS_LEGACY)
    }
    return {
      idx: isNaN(idx) ? 0 : Math.max(0, Math.min(idx, QUIZ_FLOW.length - 1)),
      answers,
    }
  } catch {
    return { idx: 0, answers: {} }
  }
}

function readStorage(): { idx: number; answers: QuizAnswers } {
  try {
    const raw = localStorage.getItem(LS_STATE)
    if (raw) {
      const parsed = JSON.parse(raw) as { step?: number; answers?: QuizAnswers }
      const idx = typeof parsed.step === 'number' ? parsed.step : 0
      return {
        idx: Math.max(0, Math.min(idx, QUIZ_FLOW.length - 1)),
        answers: parsed.answers ?? {},
      }
    }
  } catch {
    /* fall through */
  }

  const legacy = migrateLegacyStorage()
  patchFunnelState({ step: legacy.idx, answers: legacy.answers })
  return legacy
}

function writeStorage(idx: number, answers: QuizAnswers) {
  try {
    const current = readFunnelState()
    localStorage.setItem(
      LS_STATE,
      JSON.stringify({
        ...current,
        step: idx,
        answers,
      }),
    )
  } catch {
    /* localStorage unavailable */
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useQuizEngine() {
  const [idx, setIdx] = useState<number>(() => readStorage().idx)
  const [answers, setAnswers] = useState<QuizAnswers>(() => readStorage().answers)
  const [transitionKey, setTransitionKey] = useState(0)

  const answersRef = useRef<QuizAnswers>(answers)
  const lastNavTime = useRef(0)

  const screen = QUIZ_FLOW[idx]

  const questionIndex = QUIZ_FLOW.slice(0, idx).filter(s =>
    QUESTION_TYPES.includes(s.type as typeof QUESTION_TYPES[number]),
  ).length

  const totalQuestions = QUIZ_FLOW.filter(s =>
    QUESTION_TYPES.includes(s.type as typeof QUESTION_TYPES[number]),
  ).length

  useEffect(() => {
    writeStorage(idx, answers)
  }, [idx, answers])

  const goToIndex = useCallback((target: number) => {
    const clamped = Math.max(0, Math.min(target, QUIZ_FLOW.length - 1))
    setTransitionKey(k => k + 1)
    setIdx(clamped)
  }, [])

  const goNext = useCallback(() => {
    const now = Date.now()
    if (now - lastNavTime.current < 300) return
    lastNavTime.current = now
    setTransitionKey(k => k + 1)
    setIdx(i => {
      let next = Math.min(i + 1, QUIZ_FLOW.length - 1)
      while (next < QUIZ_FLOW.length && shouldSkipScreen(QUIZ_FLOW[next], answersRef.current)) {
        next += 1
      }
      return Math.min(next, QUIZ_FLOW.length - 1)
    })
  }, [])

  const goBack = useCallback(() => {
    const now = Date.now()
    if (now - lastNavTime.current < 300) return
    lastNavTime.current = now
    setTransitionKey(k => k + 1)
    setIdx(i => {
      let prev = Math.max(0, i - 1)
      while (prev > 0 && shouldSkipScreen(QUIZ_FLOW[prev], answersRef.current)) {
        prev -= 1
      }
      return prev
    })
  }, [])

  const setAnswer = useCallback((id: string, value: QuizAnswerValue) => {
    setAnswers(prev => {
      const next: QuizAnswers = { ...prev, [id]: value }
      // Clear exact time only when user explicitly doesn't know it
      if (id === 'birth-time-known' && value === 'no') {
        delete next['birth-time']
      }
      answersRef.current = next
      return next
    })
  }, [])

  const setBirthPlace = useCallback((label: string, place: BirthPlaceData | null) => {
    setAnswers(prev => {
      const next: QuizAnswers = { ...prev, 'birth-place': label }
      if (place) next['birth-place-data'] = place
      else delete next['birth-place-data']
      answersRef.current = next
      return next
    })
  }, [])

  const checkCanProceed = useCallback(() => {
    return canProceed(screen, answers)
  }, [screen, answers])

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(LS_STATE)
      localStorage.removeItem(LS_IDX_LEGACY)
      localStorage.removeItem(LS_ANS_LEGACY)
    } catch { /* ignore */ }
    setIdx(0)
    setAnswers({})
    setTransitionKey(k => k + 1)
  }, [])

  return {
    idx,
    screen,
    answers,
    answersRef,
    transitionKey,
    questionIndex,
    totalQuestions,
    setAnswer,
    setBirthPlace,
    goNext,
    goBack,
    goToIndex,
    canProceed: checkCanProceed,
    reset,
  }
}
