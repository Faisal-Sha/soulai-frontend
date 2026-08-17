import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulPeopleAddScreen } from '@/features/people/SoulPeopleAddScreen'

export default function PeopleAddPage() {
  const { user, loading } = useUser()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth?redirect=/people/add" replace />

  return <SoulPeopleAddScreen />
}