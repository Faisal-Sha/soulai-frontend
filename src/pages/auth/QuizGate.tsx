import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { QUIZ_START, isQuizComplete } from './authActions'
import type { ReactNode } from 'react'

const OPEN_PREFIXES = [
  '/quiz',
  '/login',
  '/forgot-password',
  '/paid',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
  '/about',
]

function isOpenPath(pathname: string) {
  return OPEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

/**
 * The app is for people who already paid.
 * Quiz, login, paid-return, About, and legal stay public.
 * Unsigned visitors hitting home/account/people are sent to login
 * (login itself points new people at the quiz).
 */
export function QuizGate({ children }: { children: ReactNode }) {
  const { user, profile, loading } = useUser()
  const location = useLocation()

  if (loading || isOpenPath(location.pathname)) return children
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (!isQuizComplete(profile)) {
    return <Navigate to={QUIZ_START} replace />
  }
  return children
}
