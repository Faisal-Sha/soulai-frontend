import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulPeopleReportScreen } from '@/features/people/SoulPeopleReportScreen'

export default function PeopleReportPage() {
  const { user, loading } = useUser()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth?redirect=/people" replace />

  return <SoulPeopleReportScreen />
}