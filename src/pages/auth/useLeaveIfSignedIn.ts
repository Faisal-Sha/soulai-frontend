import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { getPostAuthPath, isQuizComplete, pathAfterSignIn } from './authActions'

/** Send returning sessions off the login screens. Incomplete quiz → quiz. */
export function useLeaveIfSignedIn() {
  const { user, profile, loading } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (loading || !user) return
    navigate(pathAfterSignIn(isQuizComplete(profile), getPostAuthPath(location.search)), {
      replace: true,
    })
  }, [loading, location.search, navigate, profile, user])
}
