import { Navigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulPatternChapterScreen } from '@/features/readings/SoulPatternChapterScreen'

/** Retention · Reading · Your pattern — Figma 625:1991 */
export default function PatternChapterPage() {
  const { user, loading, isPremium } = useUser()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth?redirect=/readings/your-pattern" replace />
  if (!isPremium) return <Navigate to="/rates" replace />

  return <SoulPatternChapterScreen />
}
