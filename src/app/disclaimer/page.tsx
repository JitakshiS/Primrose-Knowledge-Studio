import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

/* noindex until Primrose's real copy lands; flip robots at launch. */
export const metadata: Metadata = {
  title: "Content Disclaimer",
  robots: { index: false, follow: false },
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal · Content Disclaimer"
      title="Content Disclaimer."
      intro="The most important page on this site, stated plainly: the library teaches legal information, and that is different from legal advice."
      sections={[
        { heading: "Information, not advice", placeholderNote: "The full information-vs-advice distinction in Primrose's wording. This is the disclaimer that also appears on every video." },
        { heading: "No lawyer-client relationship", placeholderNote: "Watching videos or being a member does not create a lawyer-client relationship with Primrose Watson." },
        { heading: "Jurisdiction", placeholderNote: "Content is written from Canadian law; provincial variation and out-of-Canada caveats." },
        { heading: "Currency of content", placeholderNote: "Laws change; how the library handles updates, and that members should verify time-sensitive matters." },
        { heading: "When you need a lawyer", placeholderNote: "Plain guidance on when to stop watching videos and retain counsel, plus how to find one (provincial referral services)." },
      ]}
    />
  );
}
