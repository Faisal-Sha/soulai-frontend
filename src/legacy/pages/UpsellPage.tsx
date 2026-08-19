// Upsell B is disabled — single-plan checkout goes straight to /processing.
// This route remains as a redirect for old Stripe success URLs and bookmarks.

import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export default function UpsellPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    const target = sessionId ? `/processing?session_id=${sessionId}` : '/processing'
    navigate(target, { replace: true })
  }, [navigate, sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
}
