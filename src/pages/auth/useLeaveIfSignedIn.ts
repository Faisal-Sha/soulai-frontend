import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { getPostAuthPath } from './authActions'

/** Send returning sessions off the login screens. */
export function useLeaveIfSignedIn() {
  const { user, loading } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (loading || !user) return
    navigate(getPostAuthPath(location.search), { replace: true })
  }, [loading, location.search, navigate, user])
}
