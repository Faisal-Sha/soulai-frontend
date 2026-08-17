// TeaserScreen — FigJam FREE RESULT + CONVERSION MOMENT
// free + locked · tap locked → contextual teaser · save · share (frontend shells)

import { useRef, useState } from 'react'
import PrimaryButton from '../atoms/PrimaryButton'
import {
  buildTeaser,
  TEASER_BLUR_FILLER,
  type LockedChapterTeaser,
} from '../lib/buildTeaser'
import type { QuizAnswers } from '../types'

export interface PaywallContext {
  sectionId: string
  sectionLabel: string
  sectionTitle: string
}

interface TeaserScreenProps {
  answers: QuizAnswers
  onReveal: (context?: PaywallContext) => void
  onSkipToPaywall: () => void
}

function LockIcon({ size = 11 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

export default function TeaserScreen({
  answers,
  onReveal,
  onSkipToPaywall,
}: TeaserScreenProps) {
  const { teaserName, teaserBirth, archetype, lockedChapters } = buildTeaser(answers)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [contextChapter, setContextChapter] = useState<LockedChapterTeaser | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2400)
  }

  const handleSave = () => {
    // Frontend shell — email already captured earlier in funnel
    const email = answers.email
    showToast(
      email
        ? `Saved — we'll keep your preview for ${email}`
        : 'Saved to this device (email already linked in funnel)',
    )
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/quiz/teaser`
    const text = `${teaserName} — my Soul+AI preview`
    try {
      if (navigator.share) {
        await navigator.share({ title: teaserName, text, url })
        return
      }
    } catch {
      /* user cancelled or share failed — fall through */
    }
    try {
      await navigator.clipboard.writeText(url)
      showToast('Share link copied (frontend shell)')
    } catch {
      showToast('Share shell ready — link: /quiz/teaser')
    }
  }

  const openContextual = (ch: LockedChapterTeaser) => {
    setContextChapter(ch)
  }

  const continueToPaywall = () => {
    if (!contextChapter) {
      onSkipToPaywall()
      return
    }
    onReveal({
      sectionId: contextChapter.id,
      sectionLabel: contextChapter.label,
      sectionTitle: contextChapter.title,
    })
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0 0',
        position: 'relative',
      }}
    >
      {toast && (
        <div
          role="status"
          style={{
            position: 'fixed',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 80,
            maxWidth: '90vw',
            background: 'var(--card)',
            border: '1px solid var(--accent)',
            color: 'var(--text-primary)',
            padding: '10px 14px',
            borderRadius: 12,
            fontSize: 13,
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {toast}
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          Free result · conversion moment
        </div>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontSize: 28,
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 3,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {teaserName}
        </div>
        {teaserBirth && (
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{teaserBirth}</div>
        )}
      </div>

      <div
        style={{
          width: 104,
          height: 104,
          margin: '20px auto 10px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 42%, rgba(243,196,215,0.95) 0%, rgba(215,166,223,0.85) 42%, rgba(182,164,231,0.7) 72%, transparent 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          dangerouslySetInnerHTML={{
            __html: `<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.95)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>`,
          }}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.85)',
            borderRadius: 99,
            padding: '8px 16px',
            fontSize: 12,
            color: 'var(--accent)',
            fontWeight: 600,
            backdropFilter: 'blur(var(--glass-blur))',
          }}
        >
          <LockIcon size={12} /> Free + locked sections
        </span>
      </div>

      {/* FigJam: Save + Share */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          marginBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        <button type="button" onClick={handleSave} className="quiz-header-btn" style={{ width: 'auto', padding: '8px 14px', fontSize: 12, fontWeight: 600 }}>
          Save result
        </button>
        <button type="button" onClick={handleShare} className="quiz-header-btn" style={{ width: 'auto', padding: '8px 14px', fontSize: 12, fontWeight: 600 }}>
          Share
        </button>
      </div>

      <OpenCard
        label="WHO THEY ARE"
        pages="1 of 9 · ~2 pages"
        title={archetype.name}
        bodyHtml={archetype.body}
      />

      {lockedChapters.map(ch => (
        <LockedCard
          key={ch.id}
          label={ch.label}
          title={ch.title}
          firstLine={ch.firstLine}
          pagesHint={ch.pagesHint}
          onUnlock={() => openContextual(ch)}
        />
      ))}

      <div
        ref={ctaRef}
        style={{ padding: '8px 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <PrimaryButton onClick={() => onReveal()}>I want depth — see plans</PrimaryButton>
        <button
          type="button"
          onClick={onSkipToPaywall}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent)',
            fontFamily: 'var(--ui)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            padding: '8px 0',
            textAlign: 'center',
          }}
        >
          What&apos;s included →
        </button>
      </div>

      {/* FigJam: Tap locked → contextual teaser */}
      {contextChapter && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Section teaser"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            background: 'rgba(15,15,20,0.55)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={() => setContextChapter(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              background: 'var(--card)',
              borderRadius: 20,
              border: '1px solid var(--border)',
              padding: 20,
              marginBottom: 8,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: 8 }}>
              {contextChapter.label}
            </div>
            <h3
              style={{
                fontFamily: 'var(--display)',
                fontSize: 22,
                margin: '0 0 10px',
                color: 'var(--text-primary)',
              }}
            >
              {contextChapter.title}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '0 0 8px' }}>
              {contextChapter.firstLine}
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-muted)', margin: '0 0 18px' }}>
              This section is locked. Unlock full depth and your action plan for this chapter.
            </p>
            <PrimaryButton onClick={continueToPaywall}>Unlock this section →</PrimaryButton>
            <button
              type="button"
              onClick={() => setContextChapter(null)}
              style={{
                width: '100%',
                marginTop: 10,
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: 13,
                cursor: 'pointer',
                padding: 8,
              }}
            >
              Not now
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function OpenCard({
  label,
  pages,
  title,
  bodyHtml,
}: {
  label: string
  pages: string
  title: string
  bodyHtml: string
}) {
  return (
    <div
      style={{
        background: 'var(--card)',
        backdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
        WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(160%)',
        border: '1px solid var(--border)',
        borderRadius: 18,
        padding: '15px 16px',
        marginBottom: 11,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: '1px', color: 'var(--accent)', fontWeight: 600 }}>
          {label}
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{pages}</span>
      </div>
      <div
        style={{
          fontFamily: 'var(--display)',
          fontSize: 19,
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 7,
          lineHeight: 1.25,
        }}
      >
        {title}
      </div>
      <div
        style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--text-secondary)' }}
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </div>
  )
}

function LockedCard({
  label,
  title,
  firstLine,
  pagesHint,
  onUnlock,
}: {
  label: string
  title: string
  firstLine: string
  pagesHint: string
  onUnlock: () => void
}) {
  return (
    <button
      type="button"
      onClick={onUnlock}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        background: 'var(--surface-alt)',
        backdropFilter: 'blur(var(--glass-blur)) saturate(140%)',
        WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(140%)',
        border: '1px solid var(--border)',
        borderRadius: 18,
        padding: '15px 16px',
        marginBottom: 11,
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
          gap: 8,
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: '1px', color: 'var(--accent)', fontWeight: 600 }}>
          {label}
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: 'var(--accent-soft)',
            borderRadius: 99,
            padding: '3px 9px',
            fontSize: 10,
            color: 'var(--accent)',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          <LockIcon /> Locked · {pagesHint}
        </span>
      </div>
      <div
        style={{
          fontFamily: 'var(--display)',
          fontSize: 19,
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 7,
          lineHeight: 1.25,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
        {firstLine}{' '}
        <span
          aria-hidden="true"
          style={{
            filter: 'blur(4.5px)',
            color: 'var(--accent)',
            opacity: 0.75,
            userSelect: 'none',
          }}
        >
          {TEASER_BLUR_FILLER}
        </span>
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 12,
          color: 'var(--accent)',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <LockIcon /> Tap for teaser →
      </div>
    </button>
  )
}
