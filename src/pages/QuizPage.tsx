import { Navigate, useLocation } from 'react-router-dom'
import QuizShell from '../features/quiz/QuizShell'

export default function QuizPage() {
  const location = useLocation()
  if (location.pathname === '/quiz' || location.pathname === '/quiz/') {
    return <Navigate to="/quiz/welcome" replace />
  }
  return <QuizShell />
}
