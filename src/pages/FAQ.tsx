import React, { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import * as analytics from '@/lib/mixpanel';

const FAQ = () => {
    const { t } = useLanguage();

    useEffect(() => {
        // Optional analytics tracking for FAQ page
        analytics.trackPageView('FAQ', '/faq');
        window.scrollTo(0, 0);
    }, []);

    const faqs = [
        { question: t('faqQuestion1'), answer: t('faqAnswer1') },
        { question: t('faqQuestion2'), answer: t('faqAnswer2') },
        { question: t('faqQuestion3'), answer: t('faqAnswer3') },
        { question: t('faqQuestion4'), answer: t('faqAnswer4') },
        { question: t('faqQuestion5'), answer: t('faqAnswer5') },
    ];

    return (
        <main className="faq-page min-h-screen transition-colors text-foreground pt-24 pb-16 overflow-x-hidden max-w-full">
            <div className="container mx-auto px-4 max-w-4xl overflow-hidden">
                <div className="mb-8 md:mb-12 text-center overflow-hidden">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 tracking-tight break-words">
                        {t('faqTitle')}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground w-full max-w-2xl mx-auto break-words">
                        {t('faqSubtitle')}
                    </p>
                </div>

                <div className="space-y-4 overflow-hidden">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow overflow-hidden">
                            <details className="group">
                                <summary className="flex flex-wrap justify-between items-start gap-4 cursor-pointer list-none">
                                    <span className="text-base sm:text-lg font-semibold text-foreground flex-1 min-w-0 pr-2 break-words">{faq.question}</span>
                                    <span className="transition-transform group-open:rotate-180 flex-shrink-0 mt-1">
                                        <ChevronDown className="w-5 h-5 sm:w-6 h-6 text-muted-foreground" />
                                    </span>
                                </summary>
                                <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
                                    {faq.answer}
                                </p>
                            </details>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default FAQ;
