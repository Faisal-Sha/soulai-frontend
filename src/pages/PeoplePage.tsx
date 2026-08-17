import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulPeopleScreen } from '@/features/people/SoulPeopleScreen'

/**
 * Retention · People hub — Figma WIP Empty / List
 */
export default function PeoplePage() {
  const { user, loading } = useUser()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth?redirect=/people" replace />

  return <SoulPeopleScreen />
}