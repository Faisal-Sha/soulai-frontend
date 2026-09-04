// FreeModeScreen. FigJam EXIT / RETURN (frontend shell)

import PrimaryButton from '../atoms/PrimaryButton'
import { useCopy } from '@/i18n'

interface FreeModeScreenProps {
  onBackToResult: () => void
  onReturnPaywall: () => void
}

export default function FreeModeScreen({ onBackToResult, onReturnPaywall }: FreeModeScreenProps) {
  const t = useCopy()
  return (
    <div style={{ padding: '40px 8px 48px', textAlign: 'center', minHeight: '70dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: 12,
        }}
      >
        {t('quiz.freeMode.kicker', 'Free mode')}
      </div>
      <h1
        style={{
          fontFamily: 'var(--display)',
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: '0 0 12px',
          lineHeight: 1.15,
        }}
      >
        {t('quiz.freeMode.title', 'Keep your free preview')}
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '0 0 24px' }}>
        {t(
          'quiz.freeMode.body',
          'You can revisit locked sections anytime. Remarketing (email / ads) is ops-side. This screen is the UX exit node.',
        )}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, margin: '0 auto', width: '100%' }}>
        <PrimaryButton onClick={onBackToResult}>{t('quiz.freeMode.backResult', 'Back to free result')}</PrimaryButton>
        <PrimaryButton onClick={onReturnPaywall} variant="lavender">
          {t('quiz.freeMode.returnPlans', 'Return to plans')}
        </PrimaryButton>
      </div>

      <p style={{ marginTop: 28, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
        {t('quiz.freeMode.note', 'Abandoned quiz / email recovery. Frontend placeholder for later CRM wiring.')}
      </p>
    </div>
  )
}
