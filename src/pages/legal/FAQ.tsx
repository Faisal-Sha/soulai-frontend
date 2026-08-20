import { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'What happens after 7 days?',
    answer:
      'After 7 days, your plan auto-renews at $6.99/month. You can cancel anytime before that — no questions asked.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can cancel anytime from your account settings or by emailing us. No penalties, no hidden fees.',
  },
  {
    question: "What if the reading doesn't feel accurate?",
    answer:
      "We offer a 30-day money-back guarantee. If your reading doesn't feel right, email us and we'll refund you in full.",
  },
  {
    question: 'Is my data private?',
    answer:
      'Absolutely. Your data is encrypted, never shared, and never sold. Your answers are used only to generate your reading.',
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied.",
  },
];

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="faq-page min-h-screen transition-colors text-foreground pt-24 pb-16 overflow-x-hidden max-w-full">
      <div className="container mx-auto px-4 max-w-4xl overflow-hidden">
        <div className="mb-8 md:mb-12 text-center overflow-hidden">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 tracking-tight break-words">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground w-full max-w-2xl mx-auto break-words">
            Find answers to common questions about our subscription plans
          </p>
        </div>

        <div className="space-y-4 overflow-hidden">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow overflow-hidden"
            >
              <details className="group">
                <summary className="flex flex-wrap justify-between items-start gap-4 cursor-pointer list-none">
                  <span className="text-base sm:text-lg font-semibold text-foreground flex-1 min-w-0 pr-2 break-words">
                    {faq.question}
                  </span>
                  <span className="transition-transform group-open:rotate-180 flex-shrink-0 mt-1">
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
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
