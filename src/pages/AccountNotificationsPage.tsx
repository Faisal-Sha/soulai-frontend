import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulAccountNotificationsScreen } from '@/features/account/SoulAccountNotificationsScreen'

/**
 * Retention · Account · Notifications — Figma 818:3719
 * Preview blocked: `/account/notifications?blocked=1`
 */
export default function AccountNotificationsPage() {
  const { user, loading } = useUser()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth?redirect=/account/notifications" replace />

  return <SoulAccountNotificationsScreen />
}
