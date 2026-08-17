import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulPeopleShareScreen } from '@/features/people/SoulPeopleShareScreen'

export default function PeopleSharePage() {
  const { user, loading } = useUser()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth?redirect=/people" replace />

  return <SoulPeopleShareScreen />
}