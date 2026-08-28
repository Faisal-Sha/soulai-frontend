import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { QUIZ_START, isQuizComplete } from './authActions'
import type { ReactNode } from 'react'

const OPEN_PREFIXES = ['/quiz', '/login', '/forgot-password', '/contact', '/faq', '/privacy', '/terms']

function isOpenPath(pathname: string) {
  return OPEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

/**
 * Logged-in users with no completed quiz must finish the quiz (OAuth-first).
 * Anonymous visitors can still see home and the rest of the shells.
 */
export function QuizGate({ children }: { children: ReactNode }) {
  const { user, profile, loading } = useUser()
  const location = useLocation()

  if (loading || isOpenPath(location.pathname)) return children
  if (user && !isQuizComplete(profile)) {
    return <Navigate to={QUIZ_START} replace />
  }
  return children
}
