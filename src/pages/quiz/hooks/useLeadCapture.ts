import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useUser } from '@/hooks/useUser'
import type { QuizAnswers, UTMParams } from '../types'

const LS_PENDING = 'soul-pending-lead'

interface PendingLead {
  email: string
  answers: QuizAnswers
  utm: UTMParams
  timestamp: number
}

export function useLeadCapture() {
  const [leadId, setLeadId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { user, refetch } = useUser()

  // On mount: retry any pending lead from a previous failed attempt
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_PENDING)
      if (!raw) return
      const pending: PendingLead = JSON.parse(raw)
      captureEmail(pending.email, pending.answers, pending.utm)
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const captureEmail = useCallback(async (
    email: string,
    answers: QuizAnswers,
    utm: UTMParams,
  ): Promise<{ leadId: string | null; error: Error | null }> => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('quiz-complete', {
        body: {
          email,
          answers,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
        },
      })

      if (fnError) throw new Error(fnError.message)
      const id: string | undefined = data?.profile_id
      if (!id) throw new Error('No profile_id returned')

      setLeadId(id)
      try { localStorage.removeItem(LS_PENDING) } catch { /* ignore */ }
      if (user) {
        try { await refetch() } catch { /* profile will load on next session */ }
      }
      return { leadId: id, error: null }

    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      setError(e)
      // Queue for retry on next page load
      try {
        const pending: PendingLead = { email, answers, utm, timestamp: Date.now() }
        localStorage.setItem(LS_PENDING, JSON.stringify(pending))
      } catch { /* ignore */ }
      return { leadId: null, error: e }
    } finally {
      setIsLoading(false)
    }
  }, [refetch, user])

  return { captureEmail, leadId, isLoading, error }
}
