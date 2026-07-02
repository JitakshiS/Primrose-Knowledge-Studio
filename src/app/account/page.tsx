import type { Metadata } from "next";
import Link from "next/link";
import { MemberNav } from "@/components/MemberNav";
import { DesignPreviewBanner } from "@/components/DesignPreviewBanner";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

/*
 * Member account page. Sample data until Firebase wires; then the
 * subscription card reads from subscriptions/{uid} and the email from the
 * session. "Manage billing" hits /api/stripe/portal which 303s to the
 * Stripe-hosted Customer Portal (update card, cancel, invoices — all
 * Stripe's UI, nothing custom to maintain).
 */

export default function AccountPage() {
  return (
    <div className="flex-1 bg-paper text-ink">
      <DesignPreviewBanner />
      <MemberNav />

      <main id="main-content" className="max-w-3xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-2">
          Members · Account
        </div>
        <h1 className="font-display font-black text-4xl lg:text-5xl tracking-[-0.02em] leading-[0.95] mb-10">
          Your account.
        </h1>

        {/* Membership card */}
        <section className="bg-ink text-paper rounded-[20px] p-7 lg:p-9 relative overflow-hidden mb-4">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(ellipse at 80% 20%, var(--pillar-career) 0%, transparent 55%)",
            }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-2">
                  Membership
                </div>
                <div className="font-display font-black text-2xl lg:text-3xl tracking-[-0.02em] leading-none">
                  Full library access.
                </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-paper/10 border border-paper/15 rounded-full px-3.5 py-1.5">
                <span className="block w-2 h-2 rounded-full bg-financial" aria-hidden />
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase">
                  Active
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-7">
              <div>
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-55 mb-1">
                  Plan
                </div>
                <div className="font-display font-bold text-base">
                  $29 CAD / month
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-55 mb-1">
                  Renews
                </div>
                <div className="font-display font-bold text-base">
                  July 26, 2026
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-55 mb-1">
                  Member since
                </div>
                <div className="font-display font-bold text-base">
                  June 2026
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/api/stripe/portal"
                className="bg-paper text-ink font-display font-extrabold text-sm px-5 py-3 rounded-[10px] hover:bg-stone active:scale-[0.98] transition-all duration-150"
              >
                Manage billing →
              </a>
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-55">
                Update card, cancel, invoices · via Stripe
              </span>
            </div>
          </div>
        </section>

        {/* Email + sign-in card */}
        <section className="bg-card border border-ink/6 rounded-[20px] p-7 lg:p-8 mb-4">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-4">
            Sign-in
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-display font-bold text-base mb-0.5">
                member@example.com
              </div>
              <div className="text-[13px] text-muted">
                You sign in with magic links sent to this address. No password
                exists for this account.
              </div>
            </div>
          </div>
        </section>

        {/* Support card */}
        <section className="bg-card border border-ink/6 rounded-[20px] p-7 lg:p-8 mb-4">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-4">
            Help
          </div>
          <div className="text-[14px] leading-relaxed text-muted">
            Billing question, video that won&apos;t play, or anything else:
            write to{" "}
            <a
              href="mailto:hello@primroseknowledgestudio.com"
              className="text-ink underline underline-offset-2 hover:text-career transition-colors"
            >
              hello@primroseknowledgestudio.com
            </a>{" "}
            and you&apos;ll hear back within one business day.
          </div>
        </section>

        {/* Sign out */}
        <section className="flex items-center justify-between px-2 py-4">
          <Link
            href="/login"
            className="font-display font-bold text-sm text-muted hover:text-ink transition-colors"
          >
            Sign out
          </Link>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-soft">
            Signs this device out only
          </span>
        </section>
      </main>

      <footer className="border-t border-ink/8 mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase">
            Legal information, not legal advice
          </div>
          <div>© {new Date().getFullYear()} Primrose Watson</div>
        </div>
      </footer>
    </div>
  );
}
