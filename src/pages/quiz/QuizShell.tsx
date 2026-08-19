import { useEffect, useState, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GoMoon } from 'react-icons/go'
import './quiz.css'
import { initQuizAnalytics } from './lib/analyticsInit'
import { useQuizEngine } from './hooks/useQuizEngine'
import { useUTMParams } from './hooks/useUTMParams'
import { useLeadCapture } from './hooks/useLeadCapture'
import OnboardingFlow from './screens/OnboardingFlow'
import QuizTopicsScreen from './screens/QuizTopicsScreen'
import QuizReinforceScreen from './screens/QuizReinforceScreen'
import QuizNameScreen from './screens/QuizNameScreen'
import QuizBirthdateScreen from './screens/QuizBirthdateScreen'
import QuizBirthTimeScreen from './screens/QuizBirthTimeScreen'
import QuizBirthPlaceScreen from './screens/QuizBirthPlaceScreen'
import QuizEmailScreen from './screens/QuizEmailScreen'
import QuizWaitingScreen from './screens/QuizWaitingScreen'
import QuizResultFreeScreen from './screens/QuizResultFreeScreen'
import QuizPaywallScreen from './screens/QuizPaywallScreen'
import RecognitionScreen from './screens/RecognitionScreen'
import SocialProofScreen from './screens/SocialProofScreen'
import FeedbackScreen from './screens/FeedbackScreen'
import FreeModeScreen from './screens/FreeModeScreen'
import QuestionScreen from './QuestionScreen'
import {
  initFunnelUserProperties,
  trackScreenViewed,
  trackScreenPassed,
  trackPaywallViewed,
  trackPaywallPlanSelected,
  trackPaywallFaqOpened,
  trackPaywallGetPlanClicked,
} from './lib/funnelAnalytics'
import { getScreenKeyFromFlow } from './data/eventTaxonomy'
import { findFlowIndexForPath, findFlowIndexForScreenKey, getRouteForIndex } from './lib/quizRoutes'
import type { QuizAnswerValue } from './types'
import { PAYWALL_SINGLE_PLAN } from './data/paywallPlans'
import { useCheckout } from '@/hooks/useCheckout'

const QUESTION_TYPES = ['single', 'multi', 'yesno', 'slider', 'visual', 'date', 'text', 'email']
const SINGLE_PLAN_ID = PAYWALL_SINGLE_PLAN.id

function injectFonts() {
  if (document.getElementById('quiz-fonts')) return
  const preconnect1 = document.createElement('link')
  preconnect1.rel = 'preconnect'
  preconnect1.href = 'https://fonts.googleapis.com'
  document.head.appendChild(preconnect1)

  const preconnect2 = document.createElement('link')
  preconnect2.rel = 'preconnect'
  preconnect2.href = 'https://fonts.gstatic.com'
  preconnect2.crossOrigin = 'anonymous'
  document.head.appendChild(preconnect2)

  const link = document.createElement('link')
  link.id = 'quiz-fonts'
  link.rel = 'stylesheet'
  link.href =
    'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600;700&display=swap'
  document.head.appendChild(link)
}

export default function QuizShell() {
  const engine = useQuizEngine()
  const utm = useUTMParams()
  const leadCapture = useLeadCapture()
  const navigate = useNavigate()
  const location = useLocation()

  const urlSyncRef = useRef(false)

  const { startCheckout, isProcessing: checkoutProcessing } = useCheckout({
    leadId: leadCapture.leadId,
    trackMetaInitiateCheckout: true,
  })

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('soul_v6_theme')
      if (saved === 'light' || saved === 'dark') return saved
      return 'light'
    } catch {
      return 'light'
    }
  })

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    try { localStorage.setItem('soul_v6_theme', next) } catch { /* ignore */ }
  }

  useEffect(() => {
    injectFonts()
    initQuizAnalytics()
    initFunnelUserProperties(utm, utm.utm_medium)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync engine step → URL
  useEffect(() => {
    const target = getRouteForIndex(engine.idx)
    if (location.pathname !== target) {
      urlSyncRef.current = true
      navigate(target, { replace: true })
    }
  }, [engine.idx, location.pathname, navigate])

  // Sync URL → engine step (browser back/forward)
  useEffect(() => {
    if (urlSyncRef.current) {
      urlSyncRef.current = false
      return
    }
    const pathIdx = findFlowIndexForPath(location.pathname)
    if (pathIdx !== engine.idx) {
      engine.goToIndex(pathIdx)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Screen Viewed on step change — reset scroll so new screens open at the top
  useEffect(() => {
    const shell = document.querySelector('.quiz-shell')
    if (shell instanceof HTMLElement) shell.scrollTop = 0
    window.scrollTo(0, 0)

    const screenKey = getScreenKeyFromFlow(engine.screen)
    if (screenKey === 'paywall') {
      trackPaywallViewed(SINGLE_PLAN_ID)
      trackPaywallPlanSelected(SINGLE_PLAN_ID, PAYWALL_SINGLE_PLAN.price)
    } else {
      trackScreenViewed(screenKey)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine.idx])

  const passCurrentScreen = useCallback(async () => {
    const screenKey = getScreenKeyFromFlow(engine.screen)
    await trackScreenPassed(screenKey, engine.answersRef.current)
  }, [engine.screen, engine.answersRef])

  const handleStart = async () => {
    await trackScreenPassed('welcome', engine.answersRef.current)
    engine.goNext()
  }

  const handleAnswerChange = (v: QuizAnswerValue) => {
    const { screen } = engine
    if (screen.id) {
      engine.setAnswer(screen.id, v)
    }
  }

  const handleContinue = async () => {
    if (!engine.canProceed()) return
    await passCurrentScreen()
    engine.goNext()
  }

  const handleInterstitialNext = async () => {
    await passCurrentScreen()
    engine.goNext()
  }

  const handleProcessingDone = async () => {
    await trackScreenPassed('processing', engine.answersRef.current)
    engine.goNext()
  }

  const handleEmailSubmit = async () => {
    const { answersRef } = engine
    const answers = answersRef.current
    const email = answers.email
    if (!email) return

    await trackScreenPassed('email', answers)
    engine.goNext()

    const { leadId, error: captureErr } = await leadCapture.captureEmail(email, answers, utm)
    if (captureErr) {
      console.error('[quiz] lead capture failed:', captureErr.message)
    }
  }

  const goToScreenKey = (key: string) => {
    engine.goToIndex(findFlowIndexForScreenKey(key))
  }

  const handleTeaserReveal = () => {
    goToScreenKey('paywall')
  }

  const handleBirthTimeContinue = async () => {
    const known = engine.answersRef.current['birth-time-known']
    const time = engine.answersRef.current['birth-time']
    if (!time || !known || known === 'no') return
    await passCurrentScreen()
    engine.goNext()
  }

  const handleBirthTimeSkip = async () => {
    engine.setAnswer('birth-time-known', 'no')
    engine.setAnswer('birth-time', '')
    await trackScreenPassed('birth-time', engine.answersRef.current)
    engine.goNext()
  }

  const { screen, answers, transitionKey, questionIndex, totalQuestions } = engine
  const isQuestion = QUESTION_TYPES.includes(screen.type)
  const isIntro = screen.type === 'intro'
  const isTopics = screen.id === 'focus'
  const isReinforce = screen.type === 'reinforcement'
  const isName = screen.id === 'name'
  const isBirthdate = screen.id === 'birthdate'
  const isBirthTime = screen.id === 'birth-time'
  const isBirthPlace = screen.id === 'birth-place'
  const isEmail = screen.type === 'email-gate'
  const isWaiting = screen.type === 'analyzing'
  const isTeaser = screen.type === 'teaser'
  const isPaywall = screen.type === 'paywall'
  const isSoulBleed =
    isIntro ||
    isTopics ||
    isReinforce ||
    isName ||
    isBirthdate ||
    isBirthTime ||
    isBirthPlace ||
    isEmail ||
    isWaiting ||
    isTeaser ||
    isPaywall
  const showThemeToggle = !isSoulBleed

  const renderSoulBleedScreen = () => {
    if (isIntro) return <OnboardingFlow onStart={handleStart} />
    if (isTopics) {
      return (
        <QuizTopicsScreen
          value={Array.isArray(answers.focus) ? answers.focus : undefined}
          onChange={v => engine.setAnswer('focus', v)}
          onContinue={handleContinue}
          canProceed={engine.canProceed()}
        />
      )
    }
    if (isReinforce) {
      return <QuizReinforceScreen answers={answers} onNext={handleInterstitialNext} />
    }
    if (isName) {
      return (
        <QuizNameScreen
          value={typeof answers.name === 'string' ? answers.name : undefined}
          onChange={v => engine.setAnswer('name', v)}
          onContinue={handleContinue}
          canProceed={engine.canProceed()}
        />
      )
    }
    if (isBirthdate) {
      return (
        <QuizBirthdateScreen
          value={answers.birthdate}
          onChange={v => engine.setAnswer('birthdate', v)}
          onContinue={handleContinue}
          canProceed={engine.canProceed()}
        />
      )
    }
    if (isBirthTime) {
      return (
        <QuizBirthTimeScreen
          time={typeof answers['birth-time'] === 'string' ? answers['birth-time'] : undefined}
          certainty={
            typeof answers['birth-time-known'] === 'string'
              ? answers['birth-time-known']
              : undefined
          }
          onChangeTime={v => engine.setAnswer('birth-time', v)}
          onChangeCertainty={v => engine.setAnswer('birth-time-known', v)}
          onContinue={handleBirthTimeContinue}
          onSkip={handleBirthTimeSkip}
        />
      )
    }
    if (isBirthPlace) {
      return (
        <QuizBirthPlaceScreen
          value={typeof answers['birth-place'] === 'string' ? answers['birth-place'] : undefined}
          onChange={v => engine.setAnswer('birth-place', v)}
          onContinue={handleContinue}
          canProceed={engine.canProceed()}
        />
      )
    }
    if (isEmail) {
      return (
        <QuizEmailScreen
          value={answers.email}
          onChange={v => engine.setAnswer('email', v)}
          onContinue={handleEmailSubmit}
          isLoading={leadCapture.isLoading}
        />
      )
    }
    if (isTeaser) {
      return (
        <QuizResultFreeScreen
          answers={answers}
          onUnlock={() => handleTeaserReveal()}
        />
      )
    }
    if (isPaywall) {
      return (
        <QuizPaywallScreen
          onCheckout={startCheckout}
          isProcessing={!!checkoutProcessing}
          onFaqOpened={trackPaywallFaqOpened}
          onGetPlanClicked={trackPaywallGetPlanClicked}
        />
      )
    }
    return (
      <QuizWaitingScreen
        name={typeof answers.name === 'string' ? answers.name : undefined}
        onDone={handleProcessingDone}
      />
    )
  }

  const renderScreen = () => {
    switch (screen.type) {
      case 'intro':
        return <OnboardingFlow onStart={handleStart} />

      case 'reinforcement':
        return <QuizReinforceScreen answers={answers} onNext={handleInterstitialNext} />

      case 'social-proof':
        return <SocialProofScreen onNext={handleInterstitialNext} />

      case 'feedback':
        return <FeedbackScreen answers={answers} onNext={handleInterstitialNext} />

      case 'recognition':
        return <RecognitionScreen answers={answers} onNext={handleInterstitialNext} />

      case 'analyzing':
        return (
          <QuizWaitingScreen
            name={typeof answers.name === 'string' ? answers.name : undefined}
            onDone={handleProcessingDone}
          />
        )

      case 'email-gate':
        return (
          <QuizEmailScreen
            value={answers.email}
            onChange={v => engine.setAnswer('email', v)}
            onContinue={handleEmailSubmit}
            isLoading={leadCapture.isLoading}
          />
        )

      case 'teaser':
        return (
          <QuizResultFreeScreen
            answers={answers}
            onUnlock={() => handleTeaserReveal()}
          />
        )

      case 'paywall':
        return (
          <QuizPaywallScreen
            onCheckout={startCheckout}
            isProcessing={!!checkoutProcessing}
            onFaqOpened={trackPaywallFaqOpened}
            onGetPlanClicked={trackPaywallGetPlanClicked}
          />
        )

      case 'free-mode':
        return (
          <FreeModeScreen
            onBackToResult={() => goToScreenKey('teaser')}
            onReturnPaywall={() => goToScreenKey('paywall')}
          />
        )

      default:
        if (isTopics) {
          return (
            <QuizTopicsScreen
              value={Array.isArray(answers.focus) ? answers.focus : undefined}
              onChange={v => engine.setAnswer('focus', v)}
              onContinue={handleContinue}
              canProceed={engine.canProceed()}
            />
          )
        }
        if (isName) {
          return (
            <QuizNameScreen
              value={typeof answers.name === 'string' ? answers.name : undefined}
              onChange={v => engine.setAnswer('name', v)}
              onContinue={handleContinue}
              canProceed={engine.canProceed()}
            />
          )
        }
        if (isBirthdate) {
          return (
            <QuizBirthdateScreen
              value={answers.birthdate}
              onChange={v => engine.setAnswer('birthdate', v)}
              onContinue={handleContinue}
              canProceed={engine.canProceed()}
            />
          )
        }
        if (isBirthTime) {
          return (
            <QuizBirthTimeScreen
              time={typeof answers['birth-time'] === 'string' ? answers['birth-time'] : undefined}
              certainty={
                typeof answers['birth-time-known'] === 'string'
                  ? answers['birth-time-known']
                  : undefined
              }
              onChangeTime={v => engine.setAnswer('birth-time', v)}
              onChangeCertainty={v => engine.setAnswer('birth-time-known', v)}
              onContinue={handleBirthTimeContinue}
              onSkip={handleBirthTimeSkip}
            />
          )
        }
        if (isBirthPlace) {
          return (
            <QuizBirthPlaceScreen
              value={typeof answers['birth-place'] === 'string' ? answers['birth-place'] : undefined}
              onChange={v => engine.setAnswer('birth-place', v)}
              onContinue={handleContinue}
              canProceed={engine.canProceed()}
            />
          )
        }
        if (isQuestion) {
          return (
            <QuestionScreen
              screen={screen}
              answers={answers}
              value={screen.id ? (answers as Record<string, unknown>)[screen.id] as never : undefined}
              onChange={handleAnswerChange}
              onContinue={handleContinue}
              onBack={engine.goBack}
              canProceed={engine.canProceed()}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              isLoading={leadCapture.isLoading}
              captureError={leadCapture.error}
              theme={theme}
              onToggleTheme={toggleTheme}
              onRetry={() => {
                const latest = engine.answersRef.current
                if (latest.email) {
                  leadCapture.captureEmail(latest.email, latest, utm)
                }
              }}
            />
          )
        }
        return null
    }
  }

  /* Full-bleed SOUL screens — outside quiz-inner (transform / max-width trap). */
  if (isSoulBleed) {
    return (
      <div className="quiz-shell quiz-shell--onboarding" data-theme={theme}>
        {renderSoulBleedScreen()}
      </div>
    )
  }

  return (
    <div className="quiz-shell" data-theme={theme}>
      <div className="quiz-inner" style={{ position: 'relative' }}>
        {showThemeToggle && !isQuestion && (
          <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="quiz-header-btn"
            style={{ position: 'absolute', top: 16, right: 0, zIndex: 10 }}
          >
            {theme === 'light' ? <GoMoon /> : '☀'}
          </button>
        )}

        <div key={transitionKey} className="quiz-tx-slide" style={{ flex: 1 }}>
          {renderScreen()}
        </div>
      </div>
    </div>
  )
}
