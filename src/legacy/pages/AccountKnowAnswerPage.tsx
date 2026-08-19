import { Navigate, useParams } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { PageLoader } from '@/components/LoadingSpinner'
import { SoulAccountKnowAnswerScreen } from '@/features/account/SoulAccountKnowAnswerScreen'

/**
 * Retention · Account · What I know · Answering a question — Figma 818:3017
 */
export default function AccountKnowAnswerPage() {
  const { user, loading } = useUser()
  const { questionId = '' } = useParams()

  if (loading) return <PageLoader />
  if (!user) {
    return (
      <Navigate
        to={`/auth?redirect=${encodeURIComponent(`/account/know/${questionId}`)}`}
        replace
      />
    )
  }

  return <SoulAccountKnowAnswerScreen />
}
