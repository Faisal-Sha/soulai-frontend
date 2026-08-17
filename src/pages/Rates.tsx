import React, { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import * as analytics from '@/lib/mixpanel';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCheckout } from '@/hooks/useCheckout';
import { useUser } from '@/hooks/useUser';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const PLAN_ID = 'fullAccess' as const;

const RatesPage = () => {
  const { language, t } = useLanguage();
  const { subscription } = useUser();
  const [showSubWarning, setShowSubWarning] = useState(false);

  const { startCheckout, isProcessing } = useCheckout({
    onBeforeRedirect: () => {
      analytics.trackPurchaseInitiated('7-Day Full Access', '$6.99/month after trial', '$0.99');
    },
  });

  useEffect(() => {
    analytics.trackSubscriptionPageView();
  }, []);

  const plan = {
    id: PLAN_ID,
    name: '7-Day Full Access',
    price: '$0.99',
    period: 'for 7 days',
    subscription: '$0.99 today · Then $6.99/month · Cancel anytime',
    features: [
      'Your full Soulmate Portrait — 9 chapters',
      'A complete description of yourself in relationships: patterns, behavioral models, and relationship desires',
      'Your core tendencies in all areas of life',
      'Your karmic patterns — what keeps repeating',
      'Daily energy forecast',
      '10 free AI chat messages',
    ],
  };

  const handlePurchaseClick = () => {
    analytics.trackPlanSelected(plan.name, plan.subscription, plan.price);

    if (subscription?.status === 'active' || subscription?.status === 'trialing') {
      setShowSubWarning(true);
      return;
    }

    startCheckout(PLAN_ID);
  };

  const proceedWithNewPurchase = () => {
    setShowSubWarning(false);
    startCheckout(PLAN_ID);
  };

  const faqItems = [
    { question: t('faqQuestion1'), answer: t('faqAnswer1') },
    { question: t('faqQuestion2'), answer: t('faqAnswer2') },
    { question: t('faqQuestion3'), answer: t('faqAnswer3') },
    { question: t('faqQuestion4'), answer: t('faqAnswer4') },
  ];

  return (
    <main className="rates-page min-h-screen transition-colors text-foreground overflow-x-hidden max-w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl overflow-hidden">

        <section className="rates-page-header mb-12 overflow-hidden">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            <div className="w-full md:w-1/2 overflow-hidden">
              <h1 className="rates-page__title text-2xl font-semibold mb-4 sm:mb-8 tracking-tight break-words">{t('ratesTitle')}</h1>
              <div className="rates-page__description space-y-3 sm:space-y-6 text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed break-words">
                <p>{t('ratesIntro1')}</p>
                <p>{t('ratesIntro2')}</p>
                <p>
                  {t('ratesIntro4')}{' '}
                  <a href="/faq/" className="text-primary hover:underline font-semibold">
                    {t('ratesFAQ')}
                  </a>{' '}
                  {t('ratesPage')}.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-full min-h-[300px] sm:min-h-[400px] max-h-[600px]">
                <img
                  src="/avatar.jpeg"
                  alt="Avatarium"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.getElementById('avatar-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div
                  id="avatar-fallback"
                  className="hidden h-full bg-gradient-to-br from-primary/10 via-accent/10 to-mystical/10 rounded-2xl p-8 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent mb-6 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">A</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Avatarium</h3>
                  <p className="text-muted-foreground">Discover your path through ancient numerology wisdom</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="all-rates mb-16 overflow-hidden" id="rates-list">
          <h3 className="all-rates__title text-xl sm:text-3xl font-light mb-6 sm:mb-8">{t('availablePlans')}</h3>
          <div className="max-w-lg mx-auto">
            <div className="relative rounded-xl p-4 sm:p-6 border-2 border-primary bg-primary/5 shadow-lg h-full flex flex-col w-full">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-max">
                <div className="px-4 py-1 rounded-full text-sm font-semibold shadow-md whitespace-nowrap bg-gradient-to-r from-gold to-gold-bronze text-gold-foreground">
                  Unlock now
                </div>
              </div>

              <div className="mb-4 overflow-hidden pt-2">
                <h3 className="text-xl sm:text-2xl font-light text-foreground mb-1 break-words">{plan.name}</h3>
                <p className="text-sm text-muted-foreground break-words">{t('thisPlanIncludes')}</p>
              </div>

              <div className="flex-grow mb-6 overflow-hidden">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                      <span className="text-sm text-foreground leading-relaxed break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-foreground break-words">{plan.subscription}</p>
              </div>

              <div className="mb-6 overflow-hidden">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 w-full">
                  <span className="text-2xl sm:text-3xl font-light text-primary">{plan.price}</span>
                  <span className="text-[10px] sm:text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <div className="mt-auto">
                <Button
                  variant="default"
                  className="w-full h-12 text-base px-2"
                  disabled={isProcessing === PLAN_ID}
                  onClick={handlePurchaseClick}
                >
                  <span className="truncate w-full">
                    {isProcessing === PLAN_ID ? (
                      <span>Starting checkout…</span>
                    ) : (
                      `Get my reading for ${plan.price}`
                    )}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 overflow-hidden">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{t('faqTitle')}</h2>
            <p className="text-sm sm:text-base text-muted-foreground">{t('faqSubtitle')}</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow overflow-hidden">
                <details className="group">
                  <summary className="flex flex-wrap justify-between items-start gap-4 cursor-pointer list-none">
                    <span className="text-base sm:text-lg font-semibold text-foreground flex-1 min-w-0 pr-2 break-words">{faq.question}</span>
                    <span className="transition-transform group-open:rotate-180 flex-shrink-0 mt-1">
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </span>
                  </summary>
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{faq.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-border text-center text-xs sm:text-sm text-muted-foreground overflow-hidden">
          <p className="mb-2 break-words">{t('footerNote1')}</p>
          <p className="break-words">{t('footerNote2')}</p>
        </div>
      </div>

      <AlertDialog open={showSubWarning} onOpenChange={setShowSubWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'ru' ? 'У вас уже есть подписка' : 'You already have a subscription'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ru'
                ? 'У вас уже активна подписка. Если вы продолжите, Stripe создаст новую подписку поверх текущей. Вы уверены?'
                : 'You already have an active subscription. Proceeding will create a new subscription on top of your current one. Are you sure?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowSubWarning(false)}>
              {language === 'ru' ? 'Отмена' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={proceedWithNewPurchase}>
              {language === 'ru' ? 'Продолжить' : 'Continue anyway'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default RatesPage;
