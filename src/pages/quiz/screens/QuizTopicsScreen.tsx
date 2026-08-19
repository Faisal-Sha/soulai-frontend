import { SoulBrand, SoulButton, SoulChip, SoulProgress } from '@/components/soul'
import '../quiz-topics.css'
import bgTopics from '../assets/onboarding/bg-topics.png'

const TOPICS = [
  { v: 'money-career', label: 'Money & career' },
  { v: 'family-roots', label: 'Family & roots' },
  { v: 'confidence', label: 'Confidence' },
  { v: 'purpose-meaning', label: 'Purpose & meaning' },
  { v: 'big-decisions', label: 'Big decisions' },
  { v: 'love-relationships', label: 'Love & relationships' },
  { v: 'emotional-balance', label: 'Emotional balance' },
  { v: 'just-curious', label: 'Just curious' },
] as const

interface QuizTopicsScreenProps {
  value: string[] | undefined
  onChange: (v: string[]) => void
  onContinue: () => void
  canProceed: boolean
}

/**
 * Figma DEV · 02.1 · Quiz · Topics (node 437:2749)
 */
export default function QuizTopicsScreen({
  value = [],
  onChange,
  onContinue,
  canProceed,
}: QuizTopicsScreenProps) {
  const toggle = (v: string) => {
    const set = new Set(value)
    if (set.has(v)) set.delete(v)
    else set.add(v)
    onChange([...set])
  }

  return (
    <div className="soul-qt" data-name="02.1 · Quiz · Topics">
      <div className="soul-qt__bg" aria-hidden="true">
        <img className="soul-qt__bg-img" src={bgTopics} alt="" />
        <div className="soul-qt__bg-dim" />
      </div>

      <div className="soul-qt__frame">
        <div className="soul-qt__scrim" aria-hidden="true" />

        <div className="soul-qt__content">
          <header className="soul-qt__header">
            <SoulBrand />
          </header>

          <div className="soul-qt__progress-wrap">
            <SoulProgress step={1} total={5} />
          </div>

          <section className="soul-qt__hero">
            <h1 className="soul-qt__title">Where do you want things to change?</h1>
            <p className="soul-qt__subtitle">
              Pick as many as you want — it tells me where to focus for you first.
            </p>
          </section>

          <div className="soul-qt__chips" role="group" aria-label="Focus topics">
            {TOPICS.map((topic) => (
              <SoulChip
                key={topic.v}
                label={topic.label}
                selected={value.includes(topic.v)}
                onClick={() => toggle(topic.v)}
                className="soul-qt__chip"
              />
            ))}
          </div>

          <div className="soul-qt__spacer" />

          <div className="soul-qt__cta">
            <SoulButton
              block
              onClick={onContinue}
              disabled={!canProceed}
              aria-label="Continue"
            >
              Continue
            </SoulButton>
          </div>
        </div>
      </div>
    </div>
  )
}
