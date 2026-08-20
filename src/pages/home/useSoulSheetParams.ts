import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export type ResumeSheetMode = 'confirm' | 'methods'
export type ResumeQuery = '1' | 'change'

function isOn(value: string | null) {
  return value === '1' || value === 'true'
}

export function readResumeQuery(params: URLSearchParams): ResumeQuery | null {
  const v = params.get('resume')
  if (v === 'change' || v === 'methods') return 'change'
  if (isOn(v) || params.get('sheet') === 'resume') return '1'
  return null
}

export function readInstallQuery(params: URLSearchParams) {
  return isOn(params.get('install'))
}

/**
 * Preview + click wiring for Figma popup sheets.
 * Resume confirm: `?resume=1` · payment method: `?resume=change` · add to home: `?install=1`
 */
export function useSoulSheetParams(extraOnResume?: Record<string, string>) {
  const [params, setParams] = useSearchParams()
  const resume = readResumeQuery(params)
  const installOpen = readInstallQuery(params)

  const patch = useCallback(
    (updates: Record<string, string | null>) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          for (const [key, value] of Object.entries(updates)) {
            if (value == null || value === '') next.delete(key)
            else next.set(key, value)
          }
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )

  const openResume = useCallback(
    (mode: ResumeSheetMode = 'confirm') => {
      patch({
        ...(extraOnResume ?? {}),
        sheet: null,
        resume: mode === 'methods' ? 'change' : '1',
      })
    },
    [extraOnResume, patch],
  )

  const closeResume = useCallback(() => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete('resume')
        if (next.get('sheet') === 'resume') next.delete('sheet')
        return next
      },
      { replace: true },
    )
  }, [setParams])

  const openInstall = useCallback(() => patch({ install: '1' }), [patch])
  const closeInstall = useCallback(() => patch({ install: null }), [patch])

  return {
    resume,
    resumeOpen: resume != null,
    resumeMode: (resume === 'change' ? 'methods' : 'confirm') as ResumeSheetMode,
    installOpen,
    openResume,
    closeResume,
    openInstall,
    closeInstall,
  }
}
