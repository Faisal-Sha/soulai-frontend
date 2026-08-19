import { Link } from "react-router-dom";
import { LegalDocumentLayout, type LegalSection } from "@/components/LegalDocumentLayout";

const LAST_UPDATED = "July 29, 2026";

const sections: LegalSection[] = [
  {
    title: "1. Introduction",
    paragraphs: [
      "This Privacy Policy describes how the Company collects, uses, and shares information about:",
    ],
    items: [
      "visitors to our Site",
      "individuals who download or use the App",
      "individuals who complete the quiz or receive a reading/report",
      "subscribers who purchase our paid features",
      "users who interact with our AI companion/agent",
      "individuals who contact us for information or support",
    ],
    subsections: [
      {
        title: "Scope",
        paragraphs: [
          'Collectively, these are referred to as our "Services."',
          "This policy applies to both Personal Information (data that identifies an individual) and Anonymous Information (data that does not identify a specific individual).",
          "Our Services may be offered to users located in various countries around the world. By using our Services, you understand that your information may be transferred to and processed in countries outside of your country of residence, including Canada and the United States.",
          "For the purposes of applicable data protection laws, including the General Data Protection Regulation (GDPR), CENTRE DE GUERISON DE L'AME INC. acts as the data controller responsible for the collection and processing of personal information described in this Privacy Policy.",
        ],
      },
      {
        title: "Region-Specific Provisions",
        paragraphs: [
          "Certain provisions of this Privacy Policy apply specifically to users located in particular regions, including:",
        ],
        items: [
          "California residents under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA)",
          "residents of the European Economic Area (EEA) under the General Data Protection Regulation (GDPR)",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "Our Services are not directed to children. We do not knowingly collect personal information from children under the age of 18. If you believe that a child has provided personal information to us without parental consent, please contact us using the contact information provided at the end of this Privacy Policy.",
        ],
      },
    ],
  },
  {
    title: "2. What Personal Information We Collect",
    paragraphs: [
      "We collect personal information that you voluntarily provide when you:",
    ],
    items: [
      "register for or log into the App",
      "complete the quiz (including your date of birth and other quiz responses)",
      "purchase a subscription or other paid feature",
      "interact with our AI companion/agent",
      "complete surveys or feedback forms",
      "contact us by email, in-app chat, or other communication channels",
    ],
    subsections: [
      {
        title: "Categories of Personal Information",
        paragraphs: [
          'For purposes of this Policy, "Personal Information" refers to information that can identify a living individual. Examples of categories of personal information may include:',
        ],
      },
      {
        title: "Identifiers",
        items: ["name", "mailing address", "email address", "telephone number"],
      },
      {
        title: "Quiz & Reading Data",
        items: [
          "date of birth and any other details you provide for your reading",
          "your generated reading/report and its contents",
          "messages you exchange with our AI companion/agent",
        ],
      },
      {
        title: "Financial Information",
        items: [
          "payment details (processed by our payment processor, e.g. Stripe)",
          "billing address",
          "transaction and subscription records",
        ],
      },
      {
        title: "Commercial Information",
        items: ["purchasing and subscription history", "feature usage records"],
      },
      {
        title: "Internet & Device Activity",
        items: [
          "IP address",
          "device identifiers and device/browser type",
          "app and website interaction data",
          "session information",
        ],
      },
      {
        title: "Information Collected Automatically",
        paragraphs: [
          "We collect only information that is relevant to the Services we provide.",
          "When you use our App or visit our Site, our servers may automatically collect information including IP address, device and browser type, operating system, referring website, screens/pages viewed, interaction with the Services, and session duration. This information helps us analyze performance and improve user experience.",
          "Our Services may use cookies, mobile analytics SDKs, and tools such as Yandex Metrica to collect this information.",
        ],
      },
      {
        title: "Information From Third Parties",
        paragraphs: [
          "We may receive information from third-party partners including payment processors, marketing partners, analytics providers, advertising networks, and app store platforms. This information may be combined with data you provide directly.",
        ],
      },
    ],
  },
  {
    title: "3. How We Use Personal Information",
    paragraphs: ["We may use personal information to:"],
    items: [
      "generate your quiz results, reading, and report",
      "provide and improve the AI companion/agent experience",
      "process subscription purchases and payments",
      "respond to inquiries and provide customer support",
      "send updates about our Services",
      "provide marketing communications",
      "personalize your experience",
      "analyze App and Site usage",
      "improve our Services, including the accuracy of our reading/report generation",
      "comply with legal obligations",
    ],
    subsections: [
      {
        title: "Legal Bases",
        paragraphs: [
          "Where required by applicable data protection laws (including GDPR), we process personal information based on one or more of the following legal bases: your consent; performance of a contract (for example, generating your reading or processing your subscription); compliance with legal obligations; or legitimate business interests such as improving our Services and maintaining security.",
          "Information collected automatically may be used to administer the App and Site, conduct analytics, improve performance, and enhance security.",
        ],
      },
    ],
  },
  {
    title: "4. Sharing Personal Information",
    paragraphs: [
      "We do not sell personal information. However, we may share information with trusted third-party service providers in order to operate our business, including:",
    ],
    items: [
      "payment processors (e.g. Stripe)",
      "cloud hosting and database providers (used to store quiz, reading, and knowledge-base data)",
      "AI/language-model providers used to power our AI companion/agent",
      "marketing platforms",
      "analytics providers (e.g. Yandex Metrica)",
      "customer service providers",
    ],
    subsections: [
      {
        title: "Other Disclosures",
        paragraphs: [
          "These service providers are contractually required to safeguard your personal information and use it only for the services they provide to us.",
          "We may also disclose information in connection with a business transfer or acquisition, to comply with legal obligations, to enforce our Terms & Conditions, or to protect our rights or the safety of others.",
        ],
      },
    ],
  },
  {
    title: "5. Storage of Personal Information",
    paragraphs: [
      "We take reasonable steps to protect personal information from loss, unauthorized access, misuse, disclosure, or alteration or destruction.",
      "We retain personal information, including your quiz responses and generated reading/report, only as long as necessary to fulfill the purposes described in this policy or as required by law.",
      "You may unsubscribe from marketing communications using the unsubscribe link included in our emails, or manage notification preferences in the App.",
    ],
  },
  {
    title: "6. Access to Other Websites",
    paragraphs: [
      "Our Services may contain links to third-party websites. These websites operate independently and have their own privacy policies. We are not responsible for the privacy practices or content of third-party websites.",
    ],
  },
  {
    title: "7. Protecting Children's Privacy",
    paragraphs: [
      "Our Services are not intended for children under 18 years of age. We comply with the Children's Online Privacy Protection Act (COPPA) and do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "8. Additional Privacy Rights for California Residents (CCPA / CPRA)",
    paragraphs: [
      "If you are a resident of California, you may have additional rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), including:",
    ],
    subsections: [
      {
        title: "Right to Know",
        paragraphs: [
          "You have the right to request information about the personal information we collect about you, including categories of personal information collected, sources of that information, the purpose for collecting or sharing it, and categories of third parties with whom we share it.",
        ],
      },
      {
        title: "Right to Delete",
        paragraphs: [
          "You have the right to request that we delete personal information we have collected about you, subject to certain legal exceptions.",
        ],
      },
      {
        title: "Right to Correct",
        paragraphs: [
          "You may request correction of inaccurate personal information that we maintain about you.",
        ],
      },
      {
        title: "Right to Opt-Out of Sale or Sharing",
        paragraphs: [
          "We do not sell personal information as defined under California law.",
        ],
      },
      {
        title: "Right to Limit Use of Sensitive Personal Information",
        paragraphs: [
          "California residents may request limitations on how sensitive personal information is used.",
        ],
      },
      {
        title: "Right to Non-Discrimination",
        paragraphs: [
          "We will not discriminate against you for exercising your privacy rights.",
        ],
      },
      {
        title: "How to Submit a Privacy Request",
        paragraphs: [
          "To exercise your privacy rights, please contact us at: hello@soulplus-ai.com. We may verify your identity before processing your request.",
        ],
      },
      {
        title: "Mobile Data Privacy",
        paragraphs: [
          "No mobile information will be shared with third parties or affiliates for marketing purposes. Text messaging opt-in data and consent will not be shared with any third parties.",
        ],
      },
    ],
  },
  {
    title: "9. Additional Policies for EEA Residents (GDPR)",
    paragraphs: [
      "Residents of the European Economic Area may have the right to access personal data, correct inaccurate data, request deletion, restrict processing, and object to marketing communications.",
      "Personal data may be transferred outside the European Economic Area, including to Canada, the United States, or other jurisdictions where our service providers or technology infrastructure (including cloud hosting and AI providers) are located. We take reasonable steps to protect personal data during such transfers.",
    ],
    subsections: [
      {
        title: "Data Security Disclaimer",
        paragraphs: [
          "While we take reasonable administrative, technical, and organizational measures to protect personal information, no method of transmission over the internet or method of electronic storage is completely secure. Therefore, we cannot guarantee absolute security.",
        ],
      },
    ],
  },
  {
    title: "10. Artificial Intelligence",
    paragraphs: [
      'SoulPlus uses artificial intelligence ("AI"), proprietary algorithms, and user-provided information to generate personalized insights, reports, recommendations, and conversations.',
      "Our AI Companion and AI-generated reports are intended solely for informational, educational, reflective, and personal development purposes.",
      "While we continuously improve the quality and accuracy of our Services, artificial intelligence may generate inaccurate, incomplete, inconsistent, or outdated information. The Company does not guarantee that any AI-generated content is accurate, complete, reliable, or suitable for any particular purpose.",
      "By using the Services, you acknowledge and agree that:",
    ],
    items: [
      "AI-generated responses are probabilistic and may contain errors;",
      "the Services are designed to provide guidance, reflection, and educational insights rather than objective facts;",
      "you remain solely responsible for all decisions and actions taken based on any information generated by the Services;",
      "the Company does not guarantee any specific outcomes, results, financial benefits, relationship improvements, health improvements, career success, or other personal achievements resulting from the use of the Services.",
    ],
    subsections: [
      {
        title: "Verification",
        paragraphs: [
          "Users should independently verify important information before relying upon it.",
        ],
      },
    ],
  },
  {
    title: "11. Medical and Professional Disclaimer",
    paragraphs: [
      "SoulPlus does not provide medical, psychological, psychiatric, therapeutic, legal, tax, financial, investment, employment, or other licensed professional advice. Nothing generated by the Services should be interpreted as:",
    ],
    items: [
      "medical advice;",
      "diagnosis;",
      "treatment recommendation;",
      "psychological counselling;",
      "psychiatric evaluation;",
      "legal opinion;",
      "financial or investment advice;",
      "employment advice;",
      "emergency guidance.",
    ],
    subsections: [
      {
        title: "Seek Qualified Help",
        paragraphs: [
          "If you require medical, psychological, psychiatric, legal, financial, or other professional assistance, you should consult an appropriately qualified professional.",
          "You should never disregard professional medical advice or delay seeking medical treatment because of information generated by SoulPlus.",
        ],
      },
    ],
  },
  {
    title: "12. How SoulPlus Generates Personalized Insights",
    paragraphs: [
      "SoulPlus combines multiple sources of information to generate personalized insights for users. Depending on the features used, these may include:",
    ],
    items: [
      "user-provided birth information;",
      "proprietary methodologies;",
      "artificial intelligence models;",
      "statistical processing;",
      "behavioral analysis;",
      "historical interaction patterns;",
      "user preferences;",
      "proprietary personalization algorithms.",
    ],
    subsections: [
      {
        title: "Intended Use",
        paragraphs: [
          "Generated reports are intended to provide educational insights, self-reflection, and personal development guidance. They should not be interpreted as factual statements, guarantees, predictions, or professional advice.",
        ],
      },
    ],
  },
  {
    title: "13. No Guarantees",
    paragraphs: ["The Company makes no guarantees regarding:"],
    items: [
      "life outcomes;",
      "financial success;",
      "relationship compatibility;",
      "career advancement;",
      "business performance;",
      "health improvements;",
      "emotional well-being;",
      "spiritual development;",
      "manifestation results.",
    ],
    subsections: [
      {
        title: "Variation",
        paragraphs: ["Individual experiences will vary."],
      },
    ],
  },
  {
    title: "14. User Responsibility",
    paragraphs: [
      "By using SoulPlus, you acknowledge that you are solely responsible for your own decisions, actions, interpretations, and use of any content generated through the Services.",
      "You agree that you will not rely exclusively upon AI-generated content when making significant medical, legal, financial, employment, educational, or other important life decisions.",
    ],
  },
  {
    title: "15. Intellectual Property",
    paragraphs: [
      "All intellectual property rights relating to the Services remain the exclusive property of CENTRE DE GUERISON DE L'AME INC. This includes, without limitation:",
    ],
    items: [
      "proprietary methodologies;",
      "AI prompts;",
      "AI workflows;",
      "generated reports;",
      "report structures;",
      "proprietary algorithms;",
      "scoring systems;",
      "databases;",
      "software;",
      "user interface;",
      "graphics;",
      "branding;",
      "layouts;",
      "text;",
      "source code;",
      "documentation.",
    ],
    subsections: [
      {
        title: "Limited License",
        paragraphs: [
          "Users receive a limited, non-transferable, non-exclusive license to access and use the Services solely for personal, non-commercial purposes.",
          "Users may not:",
        ],
        items: [
          "reproduce;",
          "redistribute;",
          "copy;",
          "scrape;",
          "reverse engineer;",
          "train AI models using;",
          "resell;",
          "commercially exploit any portion of the Services without prior written consent from CENTRE DE GUERISON DE L'AME INC.",
        ],
      },
    ],
  },
  {
    title: "16. Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by applicable law, CENTRE DE GUERISON DE L'AME INC., its officers, directors, employees, contractors, affiliates, licensors, and partners shall not be liable for:",
    ],
    items: [
      "indirect damages;",
      "incidental damages;",
      "consequential damages;",
      "punitive damages;",
      "special damages;",
      "loss of profits;",
      "business interruption;",
      "loss of data;",
      "emotional distress;",
      "reputational harm;",
      "lost opportunities;",
      "investment losses;",
      "career decisions;",
      "relationship outcomes;",
      "health outcomes.",
    ],
    subsections: [
      {
        title: "Liability Cap",
        paragraphs: [
          "The Company's total cumulative liability arising out of or relating to the Services shall not exceed the total amount actually paid by the user during the twelve (12) months preceding the event giving rise to the claim.",
        ],
      },
    ],
  },
  {
    title: "17. Governing Law & Dispute Resolution",
    subsections: [
      {
        title: "Governing Law",
        paragraphs: [
          "These Terms shall be governed by and interpreted in accordance with the laws of the Province of Quebec and the federal laws of Canada applicable therein, without regard to conflict of law principles.",
        ],
      },
      {
        title: "Jurisdiction",
        paragraphs: [
          "The parties agree that any dispute arising out of or relating to the Services shall be subject to the exclusive jurisdiction of the courts located in the Province of Quebec, Canada.",
        ],
      },
      {
        title: "Arbitration (Optional)",
        paragraphs: [
          "Before initiating court proceedings, the parties agree to attempt to resolve disputes through good-faith negotiations.",
          "Where permitted by applicable law, disputes may be resolved through binding arbitration instead of litigation.",
        ],
      },
    ],
  },
  {
    title: "18. Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Changes will be posted on this page (and, where appropriate, in the App) with an updated Last Updated date.",
    ],
  },
  {
    title: "19. Contact Us",
    paragraphs: [
      "If you have any questions regarding this Privacy Policy, please contact us:",
      "CENTRE DE GUERISON DE L'AME INC.",
      "Email: hello@soulplus-ai.com",
      "Website: soulplus-ai.com",
    ],
  },
];

const Privacy = () => (
  <LegalDocumentLayout
    title="Privacy Policy"
    lastUpdated={LAST_UPDATED}
    analyticsName="Privacy Policy"
    analyticsPath="/privacy"
    relatedLink={{ label: "Terms & Conditions", path: "/terms" }}
    intro={
      <>
        <p>
          Thank you for using SoulPlus (the &ldquo;App&rdquo;) and visiting{" "}
          <a
            href="https://soulplus-ai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-2"
          >
            soulplus-ai.com
          </a>{" "}
          (the &ldquo;Site&rdquo;, together with the App, the &ldquo;Services&rdquo;).
        </p>
        <p>
          CENTRE DE GUERISON DE L&apos;AME INC. (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
          &ldquo;us&rdquo;) is a company registered in Canada that operates SoulPlus, a proprietary AI-powered
          personal intelligence platform that combines multiple analytical methodologies, artificial
          intelligence, statistical processing, and user-provided information to generate personalized
          insights and reports, delivered through an interactive quiz, AI-generated readings and reports,
          an AI companion/agent, and subscription features. We are committed to protecting the privacy and
          security of the personal information of our users, website visitors, and service providers.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, process, and protect personally identifiable
          information that you provide when visiting our Site, downloading or using our App, completing the
          quiz, purchasing a subscription, or otherwise interacting with our Services.
        </p>
        <p>
          Our Services may use cookies, mobile analytics, and other tracking technologies (including Yandex
          Metrica) to understand usage and improve the product, and may be used to personalize your
          experience. By continuing to use the Services, you accept the terms of this Privacy Policy, our{" "}
          <Link to="/terms" className="text-primary hover:underline underline-offset-2">
            Terms &amp; Conditions
          </Link>
          , and our Cookies Policy (where applicable). If you disable cookies or tracking, certain features
          of the Services may not function properly.
        </p>
        <p>
          This Privacy Policy describes how we collect and process personally identifiable information
          including, but not limited to: name; email address; date of birth (used to generate your
          personalized reading/report); mailing address; phone number; financial or payment information;
          account information; quiz responses, generated readings/reports, and messages exchanged with our
          AI companion/agent; and other data that may identify an individual.
        </p>
        <p>
          By providing your personal information to us through the Services or through communication with
          us (including email, in-app chat, or phone), you consent to the practices described in this
          Privacy Policy.
        </p>
      </>
    }
    sections={sections}
  />
);

export default Privacy;
