import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, AlertCircle, RefreshCcw, Quote as QuoteIcon, Download, Loader2, MessageCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ReadingRecord, ReadingData, isPartnerReading, PartnerReadingData } from '@/types/reading';
import { ReadingSection } from '@/components/ReadingSection';
import { PartnerReadingView } from '@/components/PartnerReadingView';
import { downloadReadingPdf } from '@/lib/downloadReadingPdf';
import { trackReadingViewed } from '@/features/quiz/lib/funnelAnalytics';
import '@/styles/reading-theme.css';
import '@/styles/partner-reading.css';

/** Normalize quiz / profile DOB shapes → YYYY-MM-DD */
function resolveIsoDob(input: unknown): string | null {
  if (!input) return null;
  if (typeof input === 'string') {
    const s = input.trim();
    const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
    const dmy = s.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
    if (dmy) {
      return `${dmy[3]}-${dmy[2].padStart(2, '0')}-${dmy[1].padStart(2, '0')}`;
    }
    return null;
  }
  if (typeof input === 'object' && input !== null) {
    const b = input as { day?: string | number; month?: string | number; year?: string | number };
    if (b.day != null && b.month != null && b.year != null) {
      return `${b.year}-${String(b.month).padStart(2, '0')}-${String(b.day).padStart(2, '0')}`;
    }
  }
  return null;
}

function dobFromQuizAnswers(answers: unknown): string | null {
  if (!answers || typeof answers !== 'object') return null;
  const a = answers as Record<string, unknown>;
  return (
    resolveIsoDob(a.birthdate) ||
    resolveIsoDob(a.birthDate) ||
    resolveIsoDob(a.dob) ||
    null
  );
}

const downloadLabels = {
  en: { button: 'Download PDF Report', loading: 'Downloading…', success: 'PDF download started', failed: 'Could not download PDF. Please try again.' },
  ru: { button: 'Скачать PDF отчет', loading: 'Загрузка…', success: 'Загрузка PDF началась', failed: 'Не удалось скачать PDF. Попробуйте снова.' },
} as const;

const ReadingPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const dl = downloadLabels[language === 'ru' ? 'ru' : 'en'];
  const { user, profile, subscription, isPremium, loading: userLoading, dataLoaded, refetch } = useUser();
  const [reading, setReading] = useState<ReadingRecord | null>(null);
  const [resolvedDob, setResolvedDob] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const isTriggeringRef = React.useRef(false);

  const handleManualRefetch = async () => {
    setIsRefetching(true);
    try {
      await refetch();
      await fetchReading();
    } finally {
      setIsRefetching(false);
    }
  };

  const fetchReading = useCallback(async (retryCount = 0) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      console.log('[ReadingPage] Fetching reading for user:', user.id);

      const { data, error: fetchError } = await (supabase
        .from('readings') as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.error('[ReadingPage] fetchError details:', {
          code: fetchError.code,
          message: fetchError.message,
          details: fetchError.details,
          hint: fetchError.hint
        });
        // Retry logic for network errors (max 2 retries)
        if (retryCount < 2 && (fetchError.message?.includes('fetch') || fetchError.code === 'PGRST301')) {
          console.log(`[ReadingPage] Retrying fetch... (Attempt ${retryCount + 1})`);
          setTimeout(() => fetchReading(retryCount + 1), 2000);
          return;
        }
        throw fetchError;
      }

      if (data) {
        setReading(data as any);

        if (data.status === 'processing' || data.status === 'generating') {
          setTimeout(fetchReading, 5000);
        } else if (
          data.status === 'ready' &&
          (data as any)?.content?.format === 'partner_v1' &&
          !isTriggeringRef.current
        ) {
          // Upgrade draft V1 readings to premium V2 content
          console.log('[ReadingPage] partner_v1 detected — regenerating as partner_v2');
          triggerGeneration({ leadId: (data as any)?.lead_id });
        }
      } else if (!isTriggeringRef.current) {
        triggerGeneration();
      }
    } catch (err: any) {
      console.error('Error fetching reading:', err);
      // Check for network errors or specific Supabase errors
      const errorMessage = err.message || 'Failed to load your reading.';
      if (errorMessage.includes('fetch') || err.name === 'TypeError') {
        setError('Network error: Could not connect to the cosmic matrix. Please check your connection.');
      } else {
        setError(errorMessage);
      }
    } finally {
      if (!isTriggeringRef.current) {
        setLoading(false);
      }
    }
  }, [user, subscription]);

  const triggerGeneration = async (opts?: { leadId?: string | null }) => {
    if (!user || isTriggeringRef.current) return;
    try {
      isTriggeringRef.current = true;
      setLoading(true);
      setError(null);
      const planType = subscription?.plan_type || 'discovery';
      const leadId = opts?.leadId ?? (reading as any)?.lead_id ?? undefined;

      console.log('[ReadingPage] Triggering generation for plan:', planType, 'leadId:', leadId);

      // We use a non-blocking-ish approach: invoke and catch errors (timeouts are common)
      // but immediately start polling fetchReading to see if it started
      supabase.functions.invoke('generate-reading', {
        body: {
          userId: user.id,
          planType,
          leadId: leadId || undefined,
        },
      }).then(({ error }) => {
        if (error) {
          console.warn('[ReadingPage] Generation trigger returned error (might be timeout):', error);
        }
      }).catch(err => {
        console.warn('[ReadingPage] Generation trigger fetch error:', err);
      }).finally(() => {
        // Allow triggering again after some time if still not found
        setTimeout(() => { isTriggeringRef.current = false; }, 10000);
      });

      // Wait a moment for the DB to update then start polling
      setTimeout(fetchReading, 2000);
    } catch (err: any) {
      console.error('Error in triggerGeneration:', err);
      setError('Could not start reading generation. Please contact support.');
      setLoading(false);
      isTriggeringRef.current = false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchReading();
    }
  }, [user, fetchReading]);

  // Resolve DOB for the reading UI: profile → reading metadata → quiz lead
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const fromProfile = resolveIsoDob(profile?.dob);
      const fromMeta = resolveIsoDob((reading?.content as PartnerReadingData | null)?.metadata?.dob);
      if (fromProfile || fromMeta) {
        if (!cancelled) setResolvedDob(fromProfile || fromMeta);
        return;
      }

      if (!user?.id) {
        if (!cancelled) setResolvedDob(null);
        return;
      }

      try {
        // Prefer lead linked to this reading
        const leadId = (reading as any)?.lead_id as string | undefined;
        if (leadId) {
          const { data: lead } = await (supabase.from('quiz_leads') as any)
            .select('answers')
            .eq('id', leadId)
            .maybeSingle();
          const fromLead = dobFromQuizAnswers(lead?.answers);
          if (fromLead) {
            if (!cancelled) setResolvedDob(fromLead);
            // Soft-backfill profile so future loads have it
            if (!profile?.dob) {
              void (supabase.from('profiles') as any)
                .update({ dob: fromLead })
                .eq('id', user.id);
            }
            return;
          }
        }

        const { data: leads } = await (supabase.from('quiz_leads') as any)
          .select('answers')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);

        for (const row of leads || []) {
          const fromLead = dobFromQuizAnswers(row?.answers);
          if (fromLead) {
            if (!cancelled) setResolvedDob(fromLead);
            if (!profile?.dob) {
              void (supabase.from('profiles') as any)
                .update({ dob: fromLead })
                .eq('id', user.id);
            }
            return;
          }
        }

        if (!cancelled) setResolvedDob(null);

        // Last resort: ask generate-reading to backfill profile.dob + metadata.dob
        const { data: genData } = await supabase.functions.invoke('generate-reading', {
          body: { userId: user.id, planType: 'discovery' },
        });
        if (genData && !cancelled) {
          const { data: prof } = await (supabase.from('profiles') as any)
            .select('dob')
            .eq('id', user.id)
            .maybeSingle();
          const fromBackfill = resolveIsoDob(prof?.dob);
          if (fromBackfill) {
            setResolvedDob(fromBackfill);
            return;
          }
          const { data: reread } = await (supabase.from('readings') as any)
            .select('content')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
          const fromPatched = resolveIsoDob(reread?.content?.metadata?.dob);
          if (fromPatched) setResolvedDob(fromPatched);
        }
      } catch (err) {
        console.warn('[ReadingPage] DOB resolve failed', err);
        if (!cancelled) setResolvedDob(null);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [user?.id, profile?.dob, reading]);

  useEffect(() => {
    if (!userLoading && dataLoaded && user) {
      trackReadingViewed(subscription?.plan_type ?? undefined);
    }
  }, [userLoading, dataLoaded, user, subscription?.plan_type]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // One-click download: rebuild on server, then stream the PDF file (no print dialog).
      let currentReadingId: string | null = (reading as any)?.id ?? null;

      if (user) {
        const { data } = await (supabase.from('readings') as any)
          .select('id, pdf_url')
          .eq('user_id', user.id)
          .maybeSingle();
        currentReadingId = data?.id ?? currentReadingId;
      }

      if (!currentReadingId || !user) {
        console.warn('[PDF] No reading ID found');
        toast.error(dl.failed);
        return;
      }

      const { error: genError } = await supabase.functions.invoke('generate-pdf', {
        body: {
          userId: user.id,
          readingId: currentReadingId,
          forceRebuild: true,
        },
      });
      if (genError) {
        console.warn('[PDF] generate-pdf failed', genError);
      }

      let result = await downloadReadingPdf({
        readingId: currentReadingId,
        fullName: profile?.full_name,
      });

      if (!result.ok && result.code === 'pdf_not_ready') {
        await supabase.functions.invoke('generate-pdf', {
          body: { userId: user.id, readingId: currentReadingId, forceRebuild: true },
        });
        result = await downloadReadingPdf({
          readingId: currentReadingId,
          fullName: profile?.full_name,
        });
      }

      if (!result.ok) {
        console.warn('[PDF] download failed', result.code);
        if (result.code === 'unauthorized') {
          navigate('/auth?redirect=/reading');
          return;
        }
        toast.error(dl.failed);
        return;
      }

      toast.success(dl.success);
    } catch (err) {
      console.error('[PDF] Download error:', err);
      toast.error(dl.failed);
    } finally {
      setIsDownloading(false);
    }
  };

  // Show a neutral spinner while auth + subscription data is still loading.
  // This prevents any flash of the locked screen for subscribed users.
  if (userLoading || !dataLoaded) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center text-white font-sans">
        <p>Please log in to view your reading.</p>
      </div>
    );
  }

  // ── Subscription gate ─────────────────────────────────────────────────────
  // dataLoaded is true here, so subscription state is final — no flash possible.
  if (!isPremium) {
    console.log('[ReadingPage] Access denied: User is not premium', {
      plan: subscription?.plan_type,
      status: subscription?.status
    });
    return (
      <div className="min-h-screen bg-[#0F0F0F] relative overflow-hidden flex flex-col items-center justify-center text-white px-4">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-md text-center space-y-8">
          {/* Lock icon */}
          <div className="w-24 h-24 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7a4.5 4.5 0 00-9 0v3.5M5 10.5h14a1 1 0 011 1V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-8.5a1 1 0 011-1z" />
            </svg>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-serif font-bold text-gold">Your Reading is Ready</h2>
            <p className="text-white/60 leading-relaxed">
              Your personal Destiny Matrix reading has been generated and is waiting for you.
              Subscribe to unlock full access and receive your PDF report by email.
            </p>
          </div>

          <button
            onClick={() => navigate('/rates')}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-gold/80 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg"
          >
            Unlock My Reading
          </button>

          <button
            onClick={handleManualRefetch}
            disabled={isRefetching}
            className="w-full py-3 bg-white/5 border border-white/10 text-white/60 rounded-2xl font-medium text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw size={16} className={isRefetching ? 'animate-spin' : ''} />
            {isRefetching ? 'Checking Subscription...' : 'Already Subscribed? Refresh Status'}
          </button>

        
        </div>
      </div>
    );
  }

  if (loading && !reading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] relative overflow-hidden flex flex-col items-center justify-center text-white gap-8">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-gold/10 border-t-gold rounded-full animate-spin" />
            <Sparkles className="absolute inset-0 m-auto text-gold animate-pulse" size={40} />
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-serif font-bold tracking-tight text-gold uppercase">Aligning Your Energies</h2>
            <p className="text-white/30 font-light tracking-[0.3em] uppercase text-xs animate-pulse">Consulting the celestial matrix...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] relative overflow-hidden flex flex-col items-center justify-center text-white gap-8 p-4">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
        <AlertCircle className="text-red-500 relative z-10" size={64} />
        <div className="text-center max-w-md relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-4 text-white">Architectural Error</h2>
          <p className="text-white/50 mb-10 leading-relaxed">{error}</p>
          <button
            onClick={fetchReading}
            className="w-full py-4 bg-gold/10 border border-gold/30 text-gold rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gold/20 transition-all hover:scale-[1.02]"
          >
            <RefreshCcw size={20} />
            Reconnect to Matrix
          </button>
        </div>
      </div>
    );
  }

  if (reading?.status === 'processing' || reading?.status === 'generating') {
    return (
      <div className="min-h-screen bg-[#0F0F0F] relative overflow-hidden flex flex-col items-center justify-center text-white gap-8">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-[#1A1230]/60 border border-white/10 p-12 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative z-10">
          <div className="flex flex-col items-center gap-10">
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-gold via-purple-500 to-gold h-full animate-loading-bar shadow-[0_0_20px_rgba(212,175,122,0.6)]" />
            </div>
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-serif font-bold text-gold">Sourcing Wisdom</h2>
              <p className="text-white/50 font-light italic leading-relaxed">
                Your personal partner reading is being woven through the stars...
              </p>
            </div>
            <div className="flex justify-center gap-4 w-full mt-2">
              <div className="px-6 py-2.5 bg-white/5 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Calculation</div>
              <div className="px-6 py-2.5 bg-white/5 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.2em] text-gold font-bold animate-pulse">Synthesis</div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes loading-bar {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          .animate-loading-bar {
            animation: loading-bar 30s linear forwards;
          }
        `}</style>
      </div>
    );
  }

  const content = reading?.content as ReadingData;
  
  if (!content) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] relative overflow-hidden flex flex-col items-center justify-center text-white gap-8">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-gold/10 border-t-gold rounded-full animate-spin" />
            <Sparkles className="absolute inset-0 m-auto text-gold animate-pulse" size={40} />
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-serif font-bold tracking-tight text-gold uppercase">Preparing Your Journey</h2>
            <p className="text-white/30 font-light tracking-[0.3em] uppercase text-xs animate-pulse">Assembling cosmic insights...</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Partner reading (client HTML template) ────────────────────────────────
  if (isPartnerReading(content)) {
    return (
      <PartnerReadingView
        content={content as PartnerReadingData}
        fullName={profile?.full_name || "Seeker"}
        dob={resolvedDob || profile?.dob || (content as PartnerReadingData)?.metadata?.dob || null}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        downloadLabel={dl.button}
        onBack={() => navigate("/")}
        onAskMentor={() => navigate('/activation/mentor')}
      />
    );
  }

  // ── Legacy reading layout (pre partner_v1) ────────────────────────────────
  return (
    <div className="min-h-screen py-20 report-viewer-root selection:bg-gold/30 overflow-y-auto custom-scrollbar">
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />

      <div className="fixed top-8 left-8 z-[150] no-print">
        <button
          onClick={() => navigate("/")}
          className="group p-3 bg-[#1A1230]/80 backdrop-blur-3xl border border-gold/20 rounded-xl text-gold/60 hover:text-gold hover:border-gold/40 transition-all duration-500 shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex items-center justify-center"
          title="Return to Home"
        >
          <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="fixed top-8 right-8 z-[150] no-print">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="group flex items-center gap-2 px-4 py-3 bg-[#1A1230]/80 backdrop-blur-3xl border border-gold/20 rounded-xl text-gold/60 hover:text-gold hover:border-gold/40 disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-sm shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02]"
          title={dl.button}
        >
          {isDownloading ? (
            <Loader2 size={18} className="animate-spin shrink-0" />
          ) : (
            <Download size={18} className="shrink-0 group-hover:scale-105 transition-transform" />
          )}
          <span className="hidden sm:inline">{isDownloading ? dl.loading : dl.button}</span>
        </button>
      </div>

      {/* ACTIVATION · first value — mentor-ready shell then Home chat */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] no-print px-4 w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate('/activation/mentor')}
          className="w-full group flex items-center justify-center gap-2 px-5 py-3.5 bg-gold/15 backdrop-blur-3xl border border-gold/30 rounded-2xl text-gold hover:bg-gold/25 hover:border-gold/50 font-semibold text-sm shadow-[0_15px_30px_rgba(0,0,0,0.45)] transition-all duration-500"
        >
          <MessageCircle size={18} className="shrink-0" />
          Your mentor is ready — ask a question
        </button>
      </div>

      <div id="page-container" className="flex flex-col items-center relative z-[105] gap-24 px-4 mx-auto w-fit">
        <div className="report-page-wrapper flex flex-col items-center justify-center p-0 shadow-[0_80px_150px_-20px_rgba(0,0,0,1)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="relative z-10 text-center space-y-12 px-20">
            <div className="space-y-10">
              <div className="flex items-center justify-center gap-4 text-gold/60 font-bold tracking-[0.3em] text-[14px] uppercase">
                SOULMATE READING
              </div>
              <h1 className="font-serif font-bold tracking-tighter leading-[0.9] text-white/90 py-2">
                {content.title || "Your Destiny"}
              </h1>
            </div>
            <div className="pt-24 space-y-4">
              <div className="text-gold/40 text-[12px] uppercase tracking-[0.3em] font-bold">B O R N</div>
              <p className="text-5xl font-serif italic text-white/90">{profile?.dob || "Stellar Origin"}</p>
            </div>
            <div className="pt-32 flex items-center justify-center gap-20 text-white/20 text-[10px] uppercase tracking-[0.5em] font-bold">
              <div className="flex flex-col gap-3">
                <span className="text-gold/40 tracking-[0.6em]">RECIPIENT</span>
                <span className="text-gold/80 font-medium tracking-normal text-2xl">{profile?.full_name || "Seeker of Truth"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="report-page-wrapper flex flex-col p-24">
          <div className="section-title-container">
            <div className="section-label">Opening Resonance</div>
            <h2 className="font-serif font-bold tracking-tight">Executive Insights</h2>
          </div>
          <div className="flex-1 flex flex-col gap-16 mt-12">
            <div className="relative">
              <QuoteIcon className="absolute -left-16 -top-10 text-gold opacity-20" size={60} />
              <div className="font-serif italic text-white/80 leading-[1.6] relative z-10" style={{ fontSize: "21px" }}>
                {content.summary}
              </div>
            </div>
            <div className="space-y-10 mt-20">
              <h3 className="section-label">Priority Energetic Directives</h3>
              <div className="grid grid-cols-1 gap-6">
                {content.recommendations?.slice(0, 4).map((rec: string, i: number) => (
                  <div key={i} className="flex items-start gap-8 bg-white/5 p-8 rounded-[2rem] border border-gold/10">
                    <span className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold text-lg shrink-0 border border-gold/20">
                      {i + 1}
                    </span>
                    <p className="text-xl text-white/70 font-light leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {content.sections?.map((section) => (
          <ReadingSection key={section.id} section={section} />
        ))}

        <div className="report-page-wrapper flex flex-col items-center justify-center p-28 text-center bg-black/40">
          <div className="space-y-24 flex-1 flex flex-col justify-center">
            {content.affirmations?.map((aff, i) => (
              <div key={i} className="space-y-6">
                <p className="text-[9px] uppercase tracking-[0.5em] text-gold/20 font-bold italic">Cosmic Invocation {i + 1}</p>
                <h3 className="text-3xl font-serif font-medium leading-tight max-w-4xl mx-auto italic text-white/80 px-12">
                  &ldquo;{aff}&rdquo;
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingPage;



