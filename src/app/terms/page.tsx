import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

/* noindex until Primrose's real copy lands; flip robots at launch. */
export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Terms of Service"
      title="Terms of Service."
      intro="The agreement between you and Primrose Knowledge Studio when you become a member. Written in plain English, like everything else here."
      sections={[
        { heading: "Who we are", placeholderNote: "Legal entity name, jurisdiction, and contact details, from Primrose." },
        { heading: "Your membership", placeholderNote: "What the $29/month membership includes, billing cadence, renewal terms." },
        { heading: "Content is information, not advice", placeholderNote: "The core disclaimer, in Primrose's own wording: library content is legal information, not legal advice, and no lawyer-client relationship is formed." },
        { heading: "Your account", placeholderNote: "Magic-link sign-in, account responsibility, one member per account." },
        { heading: "Acceptable use", placeholderNote: "Personal use only; no redistribution of videos, toolkits, or sign-in links." },
        { heading: "Cancellation and refunds", placeholderNote: "Cancel anytime via the account page; access runs to the end of the paid period. Refund policy per Primrose." },
        { heading: "Intellectual property", placeholderNote: "Ownership of videos, toolkits, and brand; the license members receive." },
        { heading: "Limitation of liability", placeholderNote: "From Primrose." },
        { heading: "Changes to these terms", placeholderNote: "How updates are communicated to members." },
        { heading: "Governing law", placeholderNote: "Province and venue, from Primrose." },
      ]}
    />
  );
}
