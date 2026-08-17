import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulPeopleGenerateScreen } from '@/features/people/SoulPeopleGenerateScreen'

export default function PeopleGeneratePage() {
  const { user, loading } = useUser()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth?redirect=/people" replace />

  return <SoulPeopleGenerateScreen />
}