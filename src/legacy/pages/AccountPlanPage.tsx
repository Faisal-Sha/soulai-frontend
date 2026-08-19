import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulAccountPlanScreen } from '@/features/account/SoulAccountPlanScreen'

/**
 * Retention · Account · Plan — Figma 818:3587
 */
export default function AccountPlanPage() {
  const { user, loading } = useUser()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth?redirect=/account/plan" replace />

  return <SoulAccountPlanScreen />
}
