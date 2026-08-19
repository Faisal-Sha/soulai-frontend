import { useState } from 'react'
import OnboardingReadingScreen from './OnboardingReadingScreen'
import OnboardingChatScreen from './OnboardingChatScreen'

interface OnboardingFlowProps {
  onStart: () => void
}

/**
 * Figma DEV onboarding: 01.1 Reading → 01.2 Chat → quiz.
 */
export default function OnboardingFlow({ onStart }: OnboardingFlowProps) {
  const [step, setStep] = useState<'reading' | 'chat'>('reading')

  if (step === 'chat') {
    return (
      <OnboardingChatScreen
        onStart={onStart}
        onBack={() => setStep('reading')}
      />
    )
  }

  return <OnboardingReadingScreen onStart={() => setStep('chat')} />
}
