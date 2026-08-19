import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulAccountKnowScreen } from '@/features/account/SoulAccountKnowScreen'

/**
 * Retention · Account · What I know about you — Figma 805:2283
 */
export default function AccountKnowPage() {
  const { user, loading } = useUser()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth?redirect=/account/know" replace />

  return <SoulAccountKnowScreen />
}
