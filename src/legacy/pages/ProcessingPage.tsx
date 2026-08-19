import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, Sparkles, FileText, Mail, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { usePaywallSubscriptionPurchase } from '@/hooks/usePaywallSubscriptionPurchase';

const STEPS = [
  { id: 'user',     label: 'Finalizing your account', icon: Sparkles },
  { id: 'matrix',   label: 'Calculating your Destiny Matrix', icon: Sparkles },
  { id: 'reading',  label: 'Generating personalized AI insights', icon: Sparkles },
  { id: 'pdf',      label: 'Preparing your PDF report', icon: FileText },
  { id: 'email',    label: 'Sending access link to your inbox', icon: Mail },
];

export default function ProcessingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { user, subscription, loading } = useUser();

  // Meta Purchase — main paywall checkout (fallback)
  usePaywallSubscriptionPurchase(sessionId);
  const [currentStep, setCurrentStep] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email shown in the "check your inbox" banner for non-logged-in users.
  // Read from quiz answers stored in localStorage — set when user submitted email gate.
  const [quizEmail, setQuizEmail] = useState<string | null>(null);

  useEffect(() => {
    // Only show the banner when coming from a post-payment redirect (session_id in URL)
    // and the user is not yet logged in (just subscribed for the first time).
    if (sessionId && !user) {
      try {
        const raw = localStorage.getItem('soul_v7_state') ?? localStorage.getItem('soul_v6_state') ?? localStorage.getItem('soul-ans');
        if (raw) {
          const parsed = JSON.parse(raw)
          const answers = parsed.answers ?? parsed
          if (answers?.email) setQuizEmail(answers.email)
        }
      } catch { /* ignore */ }
    }
  }, [searchParams, user]);

  const checkStatus = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error: fetchError } = await (supabase
        .from('readings') as any)
        .select('status, id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data?.status === 'ready') {
        // Existing reading (e.g. returning subscriber) — skip fake generation steps
        setIsReady(true);
        setCurrentStep(STEPS.length - 1);
      } else if (data?.status === 'generating') {
        setCurrentStep(2);
        setTimeout(checkStatus, 3000);
      } else if (data?.status === 'failed') {
        setError('Generation failed. Please try again.');
      } else {
        // Missing — trigger generation for first-time / rates buyers
        triggerGeneration();
        setTimeout(checkStatus, 5000);
      }
    } catch (err) {
      console.error('Error checking status:', err);
    }
  }, [user]);

  const triggerGeneration = async () => {
    if (!user) return;
    try {
      const planType = subscription?.plan_type || 'full_access_7day';

      // We don't await the full response here because it might take > 60s
      // The DB polling will pick up the 'ready' state
      supabase.functions.invoke('generate-reading', {
        body: { userId: user.id, planType }
      }).catch(err => console.warn('Edge function invoke error (might be timeout):', err));

      setCurrentStep(1);
    } catch (err) {
      console.error('Error triggering generation:', err);
    }
  };

  useEffect(() => {
    if (user) {
      checkStatus();
    }
  }, [user, checkStatus]);

  // Simulate progress through the first few steps while waiting (new readings only)
  useEffect(() => {
    if (isReady || error) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        // Only auto-advance the first two steps (Account and Matrix)
        if (prev < 2) return prev + 1;
        return prev;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isReady, error]);

  // ACTIVATION · reward: always land on /reading when ready — never home
  // (mentor handoff is offered from Reading → /?mentor=1)
  useEffect(() => {
    if (!isReady) return;
    const timer = setTimeout(() => {
      navigate('/reading', { replace: true });
    }, 1500);
    return () => clearTimeout(timer);
  }, [isReady, navigate]);

  const isGuest = !loading && !user;

  // Guest after checkout: set-password / login prompt (post-payment-screen.html)
  if (isGuest) {
    const emailDisplay = quizEmail || 'your email';
    const waitingItems = [
      'All 9 chapters of your Soulmate Portrait',
      'A full map of you — your patterns, behavioral models, and more',
      'Compatibility with any partner, anytime',
      'A short thought on your day, every morning',
    ];

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#EFEBFB] to-[#E7E1F7] dark:from-background dark:to-background flex items-center justify-center px-3 py-8 sm:py-12">
        <div className="w-full max-w-[480px]">
          <div className="bg-white dark:bg-card rounded-[22px] shadow-lg border border-black/5 dark:border-white/10 px-[22px] pt-[26px] pb-[30px]">
            {/* Envelope icon */}
            <div className="w-[88px] h-[88px] mx-auto mt-2 mb-[22px] rounded-full bg-[#8B5CF6] flex items-center justify-center text-white shadow-md">
              <Mail className="w-[42px] h-[42px]" strokeWidth={1.7} />
            </div>

            <h1 className="text-center text-[27px] leading-[1.2] font-extrabold text-[#7C3AED] dark:text-primary mb-3">
              Done! Your report is<br />already in your inbox.
            </h1>
            <p className="text-center text-[15px] leading-[1.5] text-[#4a4a58] dark:text-muted-foreground mb-[22px] px-1">
              Your full Soulmate Portrait, your personality breakdown, and daily guidance — all open now.
            </p>

            {/* Green info + what's waiting */}
            <div className="bg-[#E7F6ED] dark:bg-green-950/30 border border-[#BFE6CD] dark:border-green-800 rounded-2xl px-[18px] pt-[18px] pb-4 mb-2 text-left">
              <h2 className="text-[16px] font-bold text-[#1f7a45] dark:text-green-300 mb-2">
                One quick step to open it all
              </h2>
              <p className="text-[14px] leading-[1.55] text-[#2f7d54] dark:text-green-400">
                {quizEmail ? (
                  <>
                    We&apos;ve emailed a set-password link to{' '}
                    <span className="font-bold text-[#155e35] dark:text-green-200">{emailDisplay}</span>
                    {' '}— set your password and you&apos;re in.
                  </>
                ) : (
                  <>
                    We&apos;ve emailed a set-password link to your inbox — set your password and you&apos;re in.
                    Already have an account? Log in below.
                  </>
                )}
              </p>

              <div className="mt-4 pt-3.5 border-t border-[#CDEAD8] dark:border-green-800/60">
                <div className="text-[13px] font-bold text-[#1f7a45] dark:text-green-300 mb-2.5 tracking-wide">
                  WHAT&apos;S WAITING INSIDE
                </div>
                <ul className="space-y-2.5">
                  {waitingItems.map(item => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-[#2f7d54] dark:text-green-400"
                    >
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#2ea866]" strokeWidth={2.4} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="h-px bg-[#E4DEF3] dark:bg-white/10 my-5 mx-0.5" />

            <Button
              className="w-full h-[54px] rounded-2xl text-[16px] font-bold bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-none"
              onClick={() => navigate('/auth?redirect=/reading')}
            >
              Log in and open my portrait
            </Button>
            <button
              type="button"
              className="block w-full text-center mt-4 text-[15px] font-semibold text-[#2b2b38] dark:text-foreground/80 bg-transparent border-none cursor-pointer"
              onClick={() => navigate('/set-password')}
            >
              I have a set-password link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex items-center justify-center px-4 py-16 font-sans relative">
      {/* Background blobs — clipped to prevent horizontal scroll */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-700 pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-md relative z-10 transition-all duration-500">
        {/* Card — explicit light/dark styles, no .glass dependency */}
        <div className="
          rounded-[2rem] shadow-2xl text-center p-8 sm:p-10
          bg-white/80 border border-black/8 backdrop-blur-2xl
          dark:bg-white/5 dark:border-white/10
        ">

          {/* Icon */}
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className={`absolute inset-0 bg-primary/20 rounded-full ${!isReady && !error ? 'animate-ping' : ''}`} />
            <div className="relative bg-gradient-to-br from-primary to-accent rounded-full w-full h-full flex items-center justify-center shadow-lg">
              {isReady ? (
                <CheckCircle2 className="w-10 h-10 text-white" />
              ) : error ? (
                <AlertCircle className="w-10 h-10 text-white" />
              ) : (
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              )}
            </div>
            {!isReady && !error && (
              <Sparkles className="absolute -top-1 -right-1 text-gold animate-pulse" size={20} />
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-tight mb-3">
            {isReady
              ? 'Your Reading is Unlocked'
              : error
              ? 'Something Went Wrong'
              : 'Sourcing Your Wisdom'}
          </h1>

          {/* Description */}
          <div className="mb-8">
            {!isReady && !error && (
              <div className="w-full bg-primary/10 h-1.5 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                />
              </div>
            )}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {isReady
                ? 'Full access is ready. Opening your personal reading…'
                : error
                ? 'We encountered an error. Please refresh the page to try again.'
                : 'Our AI is synthesizing your energetic blueprint. This usually takes 30–60 seconds.'}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3 text-left mb-8">
            {STEPS.map((step, i) => {
              const isCompleted = i < currentStep || isReady;
              const isActive = i === currentStep && !isReady && !error;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 transition-all duration-700 ${
                    isCompleted || isActive ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-1'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500 border ${
                    isCompleted
                      ? 'bg-green-500/10 border-green-500/30'
                      : isActive
                      ? 'bg-primary/10 border-primary/30'
                      : 'bg-black/5 border-black/10 dark:bg-white/5 dark:border-white/10'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Icon className={`w-4 h-4 ${isActive ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[13px] font-medium ${
                      isActive ? 'text-foreground' : isCompleted ? 'text-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                    {isActive && (
                      <span className="text-[10px] text-primary/70 uppercase tracking-widest font-semibold animate-pulse">
                        In progress
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {isReady && (
              <Button
                className="w-full h-12 rounded-xl gap-2 font-semibold"
                onClick={() => navigate('/reading', { replace: true })}
              >
                View My Reading
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
            {error && (
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl font-semibold"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            )}
          </div>

          {!isReady && !error && (
            <p className="mt-8 text-[11px] text-muted-foreground/50 uppercase tracking-widest font-medium">
             
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
