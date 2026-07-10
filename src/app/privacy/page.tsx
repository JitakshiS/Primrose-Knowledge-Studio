import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

/* noindex until Primrose's real copy lands; flip robots at launch. */
export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy Policy"
      title="Privacy Policy."
      intro="What we collect, why, and who touches it. Membership data is governed by PIPEDA, and this page says exactly how."
      sections={[
        { heading: "What we collect", placeholderNote: "Email address (sign-in), payment details (held by Stripe, never by us), viewing progress. Final wording from Primrose." },
        { heading: "Why we collect it", placeholderNote: "To operate the membership: sign-in, billing, resuming where you left off." },
        { heading: "Who processes your data", placeholderNote: "Named processors: Stripe (payments), Google Firebase (accounts and data, with hosting region), Resend (transactional email), Vercel (hosting), YouTube (video delivery)." },
        { heading: "What we never do", placeholderNote: "No selling data, no ad tracking, no third-party analytics beyond what's listed. Confirm scope with Primrose." },
        { heading: "Your rights under PIPEDA", placeholderNote: "Access, correction, deletion, and how to exercise each, from Primrose." },
        { heading: "Data retention", placeholderNote: "How long account and billing records are kept after cancellation." },
        { heading: "Contact", placeholderNote: "Privacy contact address and expected response time." },
      ]}
    />
  );
}
