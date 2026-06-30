import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AdminPage() {
  return (
    <div className="flex-1 bg-paper text-ink flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-safety mb-5">
          Admin · Primrose only
        </div>
        <h1 className="font-display font-black text-5xl tracking-[-0.025em] leading-[0.9] mb-6">
          Admin panel coming soon.
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Add a video (title, pillar, description, YouTube video ID, toolkit
          PDF), edit, delete, feature as Newest Addition. Locked to the
          single admin profile via middleware + Firestore Security Rules.
        </p>
      </div>
    </div>
  );
}
