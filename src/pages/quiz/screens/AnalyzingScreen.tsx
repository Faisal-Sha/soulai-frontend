import { useState, useEffect } from 'react'
import { PROCESSING_SHEETS } from '../data/processingSheets'
import {
  trackProcessingSheetAnswered,
  trackProcessingSheetViewed,
} from '../lib/funnelAnalytics'

interface AnalyzingScreenProps {
  onDone: () => void
}

const STEPS = [
  'Mapping your core patterns',
  'Reading your behavior models',
  'Analyzing how you connect with others',
  'Matching archetypes',
  'Composing your profile',
]

const STEP_MS = 3200

export default function AnalyzingScreen({ onDone }: AnalyzingScreenProps) {
  const [stepIdx, setStepIdx] = useState(0)
  const [activeSheetId, setActiveSheetId] = useState<string | null>(null)
  const [answeredSheetIds, setAnsweredSheetIds] = useState<Set<string>>(() => new Set())

  const activeSheet = PROCESSING_SHEETS.find(s => s.id === activeSheetId) ?? null

  useEffect(() => {
    if (activeSheetId) return

    const sheetForStep = PROCESSING_SHEETS.find(
      s => s.showAtStep === stepIdx && !answeredSheetIds.has(s.id),
    )
    if (sheetForStep) {
      setActiveSheetId(sheetForStep.id)
      trackProcessingSheetViewed(sheetForStep.id)
      return
    }

    if (stepIdx < STEPS.length) {
      const t = setTimeout(() => setStepIdx(i => i + 1), STEP_MS)
      return () => clearTimeout(t)
    }

    onDone()
  }, [stepIdx, activeSheetId, answeredSheetIds, onDone])

  const handleSheetAnswer = (sheetId: string, value: string) => {
    trackProcessingSheetAnswered(sheetId, value)
    setAnsweredSheetIds(prev => new Set(prev).add(sheetId))
    setActiveSheetId(null)
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '70px 0',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Morphing blob with pulsing ring */}
      <div style={{ position: 'relative', marginBottom: 32 }}>
        <div
          aria-hidden="true"
          style={{
            width: 140,
            height: 140,
            background: 'var(--accent-soft)',
            borderRadius: '50% 40% 55% 45% / 50% 50% 45% 55%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'blob-morph 4s ease-in-out infinite alternate',
            position: 'relative',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              border: '2px solid var(--accent)',
              opacity: 0.3,
              animation: 'proc-pulse 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontSize: 48,
              color: 'var(--accent)',
              animation: 'glyph-fade 3s ease-in-out infinite',
            }}
          >
            ✦
          </span>
        </div>
      </div>

      <div
        style={{
          fontSize: 11.5,
          fontWeight: 600,
          color: 'var(--accent)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        Building your portrait
      </div>

      <p
        style={{
          fontFamily: 'var(--display)',
          fontSize: 26,
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: 32,
          letterSpacing: '-0.02em',
        }}
      >
        Finding patterns only in you
      </p>

      <ol
        aria-label="Analysis progress"
        style={{
          width: '100%',
          maxWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {STEPS.map((step, i) => {
          const done = i < stepIdx
          const active = i === stepIdx
          return (
            <li
              key={step}
              aria-current={active ? 'step' : undefined}
              className={done ? 'check-item done' : active ? 'check-item active' : 'check-item'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 0',
                fontSize: 14,
                fontFamily: 'var(--ui)',
                color: done
                  ? 'var(--text-secondary)'
                  : active
                  ? 'var(--text-primary)'
                  : 'var(--text-dim)',
                opacity: done || active ? 1 : 0.4,
                transition: 'opacity 400ms var(--ease), color 400ms var(--ease)',
                textAlign: 'left',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  flexShrink: 0,
                  border: `1.5px solid ${done ? 'var(--success)' : active ? 'var(--accent)' : 'var(--border-strong)'}`,
                  background: done ? 'var(--success)' : active ? 'var(--accent)' : 'var(--card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {done && (
                  <svg width="9" height="9" viewBox="0 0 12 12" aria-hidden="true">
                    <path
                      d="M2 6l3 3 5-6"
                      stroke="var(--text-inverse)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {active && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: -4,
                      borderRadius: '50%',
                      border: '1px solid var(--accent)',
                      opacity: 0.5,
                      animation: 'soul-pulse 1.2s ease-in-out infinite',
                    }}
                  />
                )}
              </div>
              {step}
            </li>
          )
        })}
      </ol>

      {activeSheet && (
        <>
          <div
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.35)',
              zIndex: 40,
            }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="processing-sheet-title"
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              background: 'var(--card)',
              borderTopLeftRadius: 'var(--radius-lg)',
              borderTopRightRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              padding: '20px 20px 28px',
              boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.12)',
            }}
          >
            <p
              id="processing-sheet-title"
              style={{
                fontFamily: 'var(--display)',
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
                marginBottom: 16,
                textAlign: 'left',
              }}
            >
              {activeSheet.question}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activeSheet.options.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSheetAnswer(activeSheet.id, opt.value)}
                  className="quiz-option"
                  style={{ width: '100%' }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
