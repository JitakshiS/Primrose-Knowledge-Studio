"use client";

import { useState } from "react";
import { firebaseAuth } from "@/lib/firebase/client";
import { sendSignInLinkToEmail } from "firebase/auth";

/*
 * Magic-link login. Flow:
 *  1. User enters email here, we call sendSignInLinkToEmail (client SDK).
 *  2. Firebase emails them a link back to /login/callback?apiKey=...&oobCode=...
 *  3. The callback page completes sign-in (signInWithEmailLink), gets an ID
 *     token, POSTs it to /api/auth/session which mints a server-side session
 *     cookie via the Admin SDK.
 *  4. We redirect to the `next` query param or /dashboard.
 *
 * The callback page is NOT YET BUILT, comes in the next commit once we have
 * a Firebase project to test against end-to-end.
 */

function LogoDots() {
  return (
    <span className="inline-flex gap-[3px]">
      <i className="block w-2 h-2 rounded-[2px] bg-workplace" />
      <i className="block w-2 h-2 rounded-[2px] bg-financial" />
      <i className="block w-2 h-2 rounded-[2px] bg-career" />
      <i className="block w-2 h-2 rounded-[2px] bg-emotional" />
      <i className="block w-2 h-2 rounded-[2px] bg-safety" />
    </span>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setState("sending");
    setError(null);
    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
      await sendSignInLinkToEmail(firebaseAuth(), email, {
        url: `${siteUrl}/login/callback`,
        handleCodeInApp: true,
      });
      window.localStorage.setItem("pks_pending_email", email);
      setState("sent");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setState("error");
    }
  }

  return (
    <div className="flex-1 bg-paper text-ink flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="font-display font-black text-lg tracking-tight flex items-center gap-3 mb-10"
        >
          <LogoDots />
          <span>Primrose Studio</span>
        </a>

        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-4">
          Members · sign in
        </div>
        <h1 className="font-display font-black text-4xl tracking-[-0.02em] leading-[0.95] mb-3">
          Sign in with a magic link.
        </h1>
        <p className="text-[15px] leading-relaxed text-muted mb-8">
          We&apos;ll email you a one-tap link. No passwords to manage. The link
          works once.
        </p>

        {state === "sent" ? (
          <div className="bg-card border border-ink/6 rounded-[16px] p-6">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-3">
              Check your email
            </div>
            <p className="text-[15px] leading-relaxed text-ink">
              A sign-in link is on its way to <strong>{email}</strong>. It
              works for the next 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-[10px] bg-card border border-ink/10 text-ink placeholder:text-soft focus:outline-none focus:border-career focus:ring-2 focus:ring-career/15 transition"
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className="w-full bg-ink text-paper font-display font-extrabold text-base px-7 py-4 rounded-[10px] hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : "Email me a sign-in link"}
            </button>
            {state === "error" && error && (
              <div className="text-[13px] text-safety bg-safety/5 border border-safety/15 rounded-[10px] p-3">
                {error}
              </div>
            )}
          </form>
        )}

        <p className="mt-10 text-[13px] text-muted">
          Not a member yet?{" "}
          <a href="/#pricing" className="text-ink underline underline-offset-2">
            Become one
          </a>
          .
        </p>
      </div>
    </div>
  );
}
