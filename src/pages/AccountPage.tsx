import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulAccountScreen } from '@/features/account/SoulAccountScreen'

/**
 * Retention · Account hub — Figma Account · Full (805:2128)
 */
export default function AccountPage() {
  const { user, loading } = useUser()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth?redirect=/account" replace />

  return <SoulAccountScreen />
}
