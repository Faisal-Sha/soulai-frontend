import { useCallback, useMemo } from 'react'
import { useUser } from '@/hooks/useUser'
import {
  findKnowQuestion,
  getKnowSections,
  knowProgress,
  readKnowAnswers,
  writeKnowAnswer,
} from './knowData'

/** Signed-in: soul_profiles.know_answers. Guest preview: session + Figma demo copy. */
export function useKnowAnswers() {
  const { user, profile, saveKnowAnswer } = useUser()
  const preview = !user
  const stored = user ? (profile?.know_answers ?? {}) : readKnowAnswers()

  const sections = useMemo(
    () => getKnowSections(stored, { preview }),
    [preview, stored],
  )

  const progress = useMemo(() => knowProgress(sections), [sections])

  const lookup = useCallback(
    (questionId: string) => findKnowQuestion(questionId, stored, { preview }),
    [preview, stored],
  )

  const saveAnswer = useCallback(
    async (questionId: string, answer: string) => {
      if (user) await saveKnowAnswer(questionId, answer)
      else writeKnowAnswer(questionId, answer)
    },
    [saveKnowAnswer, user],
  )

  return { sections, progress, preview, lookup, saveAnswer }
}

