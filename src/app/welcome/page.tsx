import type { Metadata } from "next";
import Link from "next/link";
import { LogoDots } from "@/components/LogoDots";
import { ResendLinkButton } from "@/components/ResendLinkButton";

export const metadata: Metadata = {
  title: "Welcome",
  description:
    "Welcome to Primrose Studio. Check your email for the sign-in link.",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{
  session_id?: string;
  email?: string;
}>;

const STEPS = [
  {
    num: "01",
    accent: "text-workplace",
    title: "Check your inbox.",
    body: "The sign-in link is on its way. Look for one from Primrose Studio. Check spam if it doesn't show up in five minutes.",
  },
  {
    num: "02",
    accent: "text-career",
    title: "Tap the link.",
    body: "One tap signs you in. The link works once, for fifteen minutes. After that, request a new one.",
  },
  {
    num: "03",
    accent: "text-safety",
    title: "Start watching.",
    body: "You'll land on your dashboard with the five pillars laid out. The Newest Addition is featured front and centre.",
  },
];

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { email = "your inbox" } = await searchParams;

  return (
    <div className="flex-1 bg-paper text-ink flex flex-col">
      <header className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="font-display font-black text-base tracking-tight flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <LogoDots />
          <span>Primrose Studio</span>
        </Link>
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
          Step 1 of 2 · Verify your email
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 lg:px-10 py-12 lg:py-20">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-career mb-6 inline-flex items-center gap-2">
          <span className="block w-1.5 h-1.5 rounded-full bg-career" aria-hidden />
          You&apos;re in
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[0.95] mb-5">
          Your library is waiting.
        </h1>
        <p className="text-base lg:text-lg leading-relaxed text-muted mb-10 max-w-[52ch]">
          We&apos;ve sent a sign-in link to <strong className="text-ink">{email}</strong>.
          One tap and you&apos;re in. The link works once and expires in fifteen
          minutes.
        </p>

        {/* Three steps */}
        <section className="space-y-3 mb-10">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="bg-card border border-ink/6 rounded-[16px] p-6 lg:p-7 flex items-start gap-5 shadow-[0_4px_20px_-8px_rgba(15,15,15,0.06)] transition-all hover:border-ink/15 hover:-translate-y-0.5"
            >
              <div className={`font-mono text-xs tracking-[0.14em] ${s.accent} font-bold flex-shrink-0 mt-1`}>
                {s.num}
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg lg:text-xl tracking-[-0.015em] leading-tight mb-1.5">
                  {s.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Resend + Help */}
        <div className="bg-stone/40 rounded-[16px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="font-display font-bold text-[15px] mb-0.5">
              Didn&apos;t get the email?
            </div>
            <div className="text-[13px] text-muted">
              Resend the link, or write us at{" "}
              <a
                href="mailto:hello@primroseknowledgestudio.com"
                className="text-ink underline underline-offset-2 hover:text-career transition-colors"
              >
                hello@primroseknowledgestudio.com
              </a>
              .
            </div>
          </div>
          <ResendLinkButton email={email === "your inbox" ? undefined : email} />
        </div>
      </main>

      <footer className="border-t border-ink/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase">
            Legal information, not legal advice
          </div>
          <div>© {new Date().getFullYear()} Primrose Watson</div>
        </div>
      </footer>
    </div>
  );
}
