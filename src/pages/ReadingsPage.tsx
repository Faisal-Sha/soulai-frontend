import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulReadingsScreen } from '@/features/readings/SoulReadingsScreen'

/**
 * Retention · Readings list — Figma DEV 625:1793
 * Keeps /reading free for activation PDF reading.
 */
export default function ReadingsPage() {
  const { user, loading, isPremium } = useUser()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth?redirect=/readings" replace />

  return <SoulReadingsScreen isPremium={isPremium} />
}
