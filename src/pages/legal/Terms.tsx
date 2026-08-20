import { Link } from "react-router-dom";
import { LegalDocumentLayout, type LegalSection } from "@/components/LegalDocumentLayout";

const LAST_UPDATED = "July 29, 2026";

const sections: LegalSection[] = [
  {
    title: "1. Introduction",
    paragraphs: [
      'Welcome to SoulPlus (the "App"), including the associated website at soulplus-ai.com (the "Website", together with the App, the "Services").',
      'The Services are owned and operated by Soul Healing Centre Inc. ("Company," "we," "our," or "us"), a company registered in Canada. SoulPlus is built on the Matrix of Destiny methodology and delivers this methodology through an interactive quiz, AI-generated readings and reports, and an AI companion/agent.',
      'These Terms & Conditions ("Terms") govern your access to and use of the App, the Website, and any quizzes, readings, reports, subscriptions, AI-generated content, or other features made available through the Services.',
      "Please read these Terms carefully before using the Services. By downloading, accessing, or using the App or Website, you agree to be bound by these Terms. If you do not agree with these Terms, you must not use the Services.",
      "These Terms apply to all visitors, users, subscribers, and others who access or use the Services.",
    ],
  },
  {
    title: "2. Privacy",
    paragraphs: [
      "Your use of the Services is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information, including information you provide through the quiz (such as your date of birth) in order to generate your reading and report. By using the Services, you agree to the practices described in the Privacy Policy.",
    ],
  },
  {
    title: "3. Eligibility",
    paragraphs: [
      "You must be at least 18 years old to use the Services or purchase a subscription. By using the Services, you represent and warrant that you are at least 18 years of age. If you are under 18, you may not use the Services.",
    ],
  },
  {
    title: "4. International Users",
    paragraphs: [
      "The Services may be accessed by users from different countries around the world, and may be made available through third-party app stores (such as the Apple App Store or Google Play), which may have their own additional terms. By using the Services, you acknowledge that you are responsible for complying with the laws and regulations of your country of residence, and you understand that your information may be processed and stored in Canada or other jurisdictions where our service providers operate.",
    ],
  },
  {
    title: "5. Consideration",
    paragraphs: [
      "You acknowledge that these Terms are supported by reasonable and valuable consideration, including your ability to access and use the App, the Website, its content, and the Services.",
    ],
  },
  {
    title: "6. Restrictions on Use; Limited License",
    paragraphs: [
      'All content made available through the Services ("Content"), including but not limited to text, graphics, logos, and icons; the quiz, its questions, and its underlying methodology; AI-generated readings, reports, and chat/agent responses; images, videos, and digital downloads; and software and app functionality, is the property of Soul Healing Centre Inc. or its licensors and is protected by copyright, trademark, and other intellectual property laws.',
      "The Company grants you a limited, non-exclusive, non-transferable license to access and use the App, the Website, and their Content for your own personal, non-commercial use only, including the reading/report generated for you personally.",
      "You may not:",
    ],
    items: [
      "reproduce, distribute, or modify Content from the App or Website",
      "use the Content or your personal reading/report for commercial purposes",
      "attempt to gain unauthorized access to the Services",
      "use automated tools such as scraping, bots, or data mining tools",
      "resell or redistribute the Services, Content, or any generated reading/report without written permission",
      "reverse-engineer, decompile, or attempt to extract the underlying methodology, prompts, or logic used to generate readings, reports, or AI responses",
    ],
    subsections: [
      {
        title: "Termination of License",
        paragraphs: [
          "Unauthorized use automatically terminates the license granted under these Terms.",
        ],
      },
    ],
  },
  {
    title: "7. Account Security",
    paragraphs: [
      "Certain Services require you to create an account. You are responsible for maintaining the confidentiality of your account credentials. Any activity conducted using your account credentials will be considered authorized by you. You must notify us immediately of any unauthorized use of your account.",
    ],
  },
  {
    title: "8. System Requirements",
    paragraphs: [
      "Access to the Services may require a compatible mobile device or browser, a functioning internet connection, and any applications or software we specify from time to time. The Company may modify these technical requirements at any time without notice. You are responsible for ensuring your device and internet connection meet the necessary requirements.",
    ],
  },
  {
    title: "9. Subscriptions, Billing & Cancellation",
    paragraphs: [
      "Certain features of the Services, including your full reading/report and ongoing AI companion access, are offered on a paid, auto-renewing subscription basis (which may include an initial trial period at a reduced price, as described at checkout).",
    ],
    items: [
      "By starting a trial or subscription, you authorize us (or our payment processor) to charge your chosen payment method the price shown at checkout, and, unless cancelled before the trial ends, the recurring subscription price shown at checkout, on a recurring basis until you cancel.",
      "Subscriptions automatically renew for successive periods of the same length unless you cancel before the end of the current period.",
      "You may cancel your subscription at any time through your account/subscription settings in the App, or by contacting us at the email address below; cancellation takes effect at the end of the current billing period unless otherwise required by law.",
      "Except where required by applicable law, payments are non-refundable; any money-back guarantee will be honored only as expressly stated at the time of purchase.",
      "We may change subscription pricing or plans; any pricing changes will be communicated in advance and will apply to future billing periods, not to periods already paid for.",
    ],
  },
  {
    title: "10. User Submissions",
    paragraphs: [
      'Users may submit comments, feedback, testimonials, reviews, or other content ("User Content"). By submitting User Content, you grant the Company a perpetual, worldwide, royalty-free, non-exclusive license to use, reproduce, distribute, modify, publish, or display such content in connection with our business and marketing activities.',
      "You represent that you have the legal right to submit such content and that it does not violate the rights of any third party. The Company reserves the right to remove or edit User Content at its discretion.",
    ],
  },
  {
    title: "11. Third-Party Links",
    paragraphs: [
      "The Services may contain links to third-party websites or services. These are not under the control of the Company, and we are not responsible for their content, policies, or practices. Your use of third-party websites or services is at your own risk.",
    ],
  },
  {
    title: "12. AI-Generated Content & Personal Development Disclaimer",
    paragraphs: [
      "The Services, including the quiz, your personalized reading/report, and any AI companion or agent responses, are generated using an automated system based on the Matrix of Destiny methodology, and are intended for personal development, entertainment, educational, and informational purposes only.",
      "The Services are not intended to diagnose, treat, cure, or prevent any medical or psychological condition. Nothing provided through the Services should be considered medical advice, psychological therapy or mental health treatment, legal advice, or financial advice. You should consult qualified professionals for medical, psychological, financial, or legal concerns.",
      "AI-generated content is produced automatically and, while we take reasonable steps to keep it accurate and consistent with our methodology, it may occasionally contain errors, omissions, or interpretations that do not fully reflect your personal circumstances. Use of the Services and any reliance on the readings, reports, or AI responses is voluntary, and individual experiences may vary. The Company does not guarantee specific outcomes or results from use of the Services.",
    ],
  },
  {
    title: "13. Disclaimer of Warranties",
    paragraphs: [
      'The Services, and all content and materials made available through them, are provided "as is" and "as available." To the fullest extent permitted by law, the Company disclaims all warranties, including merchantability, fitness for a particular purpose, and non-infringement.',
      "We do not guarantee that the Services will operate without interruption, will be free from errors, or will be secure or free of harmful components.",
    ],
  },
  {
    title: "14. Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law, the Company shall not be liable for any indirect, incidental, or consequential damages, loss of profits, business interruption, or personal decisions made based on the Services or their content.",
      "In no event shall the Company's total liability exceed the amount you paid for the Services in the 12 months before the claim arose, or $100 USD, whichever is greater.",
    ],
  },
  {
    title: "15. Indemnification",
    paragraphs: [
      "You agree to indemnify and hold harmless the Company, its officers, employees, contractors, affiliates, partners, and representatives from any claims, damages, losses, or expenses arising from your use of the Services, your violation of these Terms, or any content submitted by you.",
    ],
  },
  {
    title: "16. Force Majeure",
    paragraphs: [
      "The Company shall not be liable for any failure or delay in performance resulting from events beyond its reasonable control, including natural disasters, acts of government, internet or cloud-service outages, technical failures, war, or labor disputes.",
    ],
  },
  {
    title: "17. Termination",
    paragraphs: [
      "The Company reserves the right to terminate or restrict your access to the Services at any time if you violate these Terms. Upon termination, you must stop using the Services and delete any materials obtained from them; any active subscription will be cancelled in accordance with Section 9.",
    ],
  },
  {
    title: "18. Dispute Resolution",
    paragraphs: [
      "If a dispute arises out of or relates to these Terms or your use of the Services, the parties agree to first attempt to resolve the dispute through good-faith negotiations. If the dispute cannot be resolved informally, it may be submitted to binding arbitration or a court of competent jurisdiction in Canada, as permitted by applicable law.",
      "You agree to resolve disputes individually and waive participation in class actions to the extent permitted by law.",
    ],
  },
  {
    title: "19. Governing Law",
    paragraphs: [
      "These Terms shall be governed by and interpreted in accordance with the laws of Canada and the applicable laws of the Province of Quebec, where Soul Healing Centre Inc. is registered, without regard to conflict of law principles.",
    ],
  },
  {
    title: "20. Electronic Communications",
    paragraphs: [
      "By using the Services, you consent to receive communications from us electronically. Electronic communications satisfy any legal requirement that such communications be in writing.",
    ],
  },
  {
    title: "21. Entire Agreement",
    paragraphs: [
      "These Terms & Conditions constitute the entire agreement between you and the Company regarding your use of the Services. If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.",
    ],
  },
  {
    title: "22. Contact Information",
    paragraphs: [
      "If you have any questions regarding these Terms & Conditions, please contact us:",
      "Soul Healing Centre Inc.",
      "Email: hello@soulplus-ai.com",
      "Website: soulplus-ai.com",
    ],
  },
];

const Terms = () => (
  <LegalDocumentLayout
    title="Terms & Conditions"
    lastUpdated={LAST_UPDATED}
    relatedLink={{ label: "Privacy Policy", path: "/privacy" }}
    intro={
      <>
        <p>
          These Terms &amp; Conditions govern your access to and use of SoulPlus, including the website at{" "}
          <a
            href="https://soulplus-ai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="soul-legal__inline-link"
          >
            soulplus-ai.com
          </a>
          , the interactive quiz, AI-generated readings and reports, and the AI companion/agent.
        </p>
        <p>
          By using the Services, you also agree to our{" "}
          <Link to="/privacy" className="soul-legal__inline-link">
            Privacy Policy
          </Link>
          . Please read these Terms carefully. If you do not agree, you must not use the Services.
        </p>
      </>
    }
    sections={sections}
  />
);

export default Terms;
