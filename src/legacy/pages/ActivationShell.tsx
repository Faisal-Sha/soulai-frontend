/**
 * ACTIVATION frontend shells (FigJam) — no backend / push wiring yet.
 * Mentor ready → notifications onboarding → Home mentor chat.
 */

import { useNavigate } from 'react-router-dom'
import { getActivationMentorPath, getActivationMentorQuestions } from '@/product/activation'
import { useLanguage } from '@/contexts/LanguageContext'

export function MentorReadyPage() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const questions = getActivationMentorQuestions(language)

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center space-y-6">
        <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-primary">Activation · reward</p>
        <h1 className="text-3xl font-serif font-semibold tracking-tight">Your mentor is ready</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Full reading unlocked. This is the personalization moment — frontend shell until UI polish.
        </p>
        <ul className="text-left space-y-2 text-sm text-foreground/80 bg-muted/40 rounded-2xl p-4 border border-border/60">
          {questions.map(q => (
            <li key={q} className="flex gap-2">
              <span className="text-primary">✦</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold"
          onClick={() => navigate('/activation/notifications')}
        >
          Continue → morning insights
        </button>
        <button
          type="button"
          className="w-full text-sm text-muted-foreground"
          onClick={() => navigate(getActivationMentorPath())}
        >
          Skip to mentor chat
        </button>
      </div>
    </div>
  )
}

export function NotificationsOnboardingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center space-y-6">
        <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-primary">Activation · onboarding</p>
        <h1 className="text-3xl font-serif font-semibold tracking-tight">
          Get your insight every morning
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Add icon to home screen + enable notifications. iOS / Android branches are UX shells — push not wired yet.
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-border/60 p-4 bg-muted/30">
            <div className="font-semibold mb-1">iOS</div>
            <p className="text-muted-foreground text-xs leading-relaxed">Share → Add to Home Screen → Allow notifications</p>
          </div>
          <div className="rounded-2xl border border-border/60 p-4 bg-muted/30">
            <div className="font-semibold mb-1">Android</div>
            <p className="text-muted-foreground text-xs leading-relaxed">Install app → Enable notifications</p>
          </div>
        </div>
        <button
          type="button"
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold"
          onClick={() => navigate(getActivationMentorPath())}
        >
          Enable later · go to Home
        </button>
        <button
          type="button"
          className="w-full text-sm text-muted-foreground"
          onClick={() => navigate('/')}
        >
          Skip onboarding
        </button>
        <p className="text-xs text-muted-foreground">If denied → email fallback (shell only).</p>
      </div>
    </div>
  )
}
