"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoDots } from "@/components/LogoDots";
import { firebaseAuth } from "@/lib/firebase/client";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

/*
 * Magic-link callback — the real flow:
 *  1. Verify the URL is a Firebase email sign-in link.
 *  2. Recover the email from localStorage (stashed by /login or /welcome);
 *     if absent (link opened on a different device), ask for it.
 *  3. signInWithEmailLink → ID token → POST /api/auth/session to mint the
 *     HTTP-only session cookie server-side.
 *  4. Redirect to ?next= or /dashboard.
 *
 * Every failure lands on a readable state with a path back to /login.
 * Until Firebase env vars exist, the invalid-link state renders, which is
 * the correct behaviour for a URL that isn't a real sign-in link anyway.
 */

type Phase = "working" | "need-email" | "error";

export default function LoginCallbackPage() {
  const [phase, setPhase] = useState<Phase>("working");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function completeSignIn(targetEmail: string) {
    const href = window.location.href;
    const cred = await signInWithEmailLink(firebaseAuth(), targetEmail, href);
    const idToken = await cred.user.getIdToken();
    const res = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) throw new Error("session-mint-failed");
    window.localStorage.removeItem("pks_pending_email");
    const next = new URLSearchParams(window.location.search).get("next");
    window.location.replace(next && next.startsWith("/") ? next : "/dashboard");
  }

  useEffect(() => {
    (async () => {
      try {
        if (!isSignInWithEmailLink(firebaseAuth(), window.location.href)) {
          setError("This link isn't a valid sign-in link, or it has already been used.");
          setPhase("error");
          return;
        }
        const stored = window.localStorage.getItem("pks_pending_email");
        if (!stored) {
          setPhase("need-email");
          return;
        }
        await completeSignIn(stored);
      } catch {
        setError("This link has expired or was already used. Request a fresh one and you're in.");
        setPhase("error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setError(null);
    try {
      await completeSignIn(email);
    } catch {
      setSubmitting(false);
      setError("That email doesn't match this link. Use the address the link was sent to.");
    }
  }

  return (
    <div className="flex-1 bg-paper text-ink flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <Link
          href="/"
          className="font-display font-black text-base tracking-tight inline-flex items-center gap-3 mb-12 transition-opacity hover:opacity-80"
        >
          <LogoDots />
          <span>Primrose Studio</span>
        </Link>

        {phase === "working" && (
          <>
            <div className="inline-flex gap-2 mb-10" aria-label="Signing you in">
              <span className="block w-2.5 h-2.5 rounded-full bg-workplace animate-[pulse_1.4s_ease-in-out_infinite]" />
              <span className="block w-2.5 h-2.5 rounded-full bg-financial animate-[pulse_1.4s_ease-in-out_0.15s_infinite]" />
              <span className="block w-2.5 h-2.5 rounded-full bg-career animate-[pulse_1.4s_ease-in-out_0.3s_infinite]" />
              <span className="block w-2.5 h-2.5 rounded-full bg-emotional animate-[pulse_1.4s_ease-in-out_0.45s_infinite]" />
              <span className="block w-2.5 h-2.5 rounded-full bg-safety animate-[pulse_1.4s_ease-in-out_0.6s_infinite]" />
            </div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-career mb-4">
              Verifying your link
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl tracking-[-0.02em] leading-[0.95] mb-3">
              Signing you in.
            </h1>
            <p className="text-[15px] leading-relaxed text-muted max-w-[36ch] mx-auto">
              Hold on a second. You&apos;ll be on your dashboard shortly.
            </p>
          </>
        )}

        {phase === "need-email" && (
          <>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-career mb-4">
              One quick check
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl tracking-[-0.02em] leading-[0.95] mb-3">
              Confirm your email.
            </h1>
            <p className="text-[15px] leading-relaxed text-muted max-w-[40ch] mx-auto mb-8">
              Looks like you opened the link on a different device. Type the
              email it was sent to and you&apos;re in.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4 text-left">
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
                disabled={submitting}
                className="w-full bg-ink text-paper font-display font-extrabold text-base px-7 py-4 rounded-[10px] hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {submitting ? "Signing you in…" : "Continue"}
              </button>
              {error && (
                <div className="text-[13px] text-safety bg-safety/5 border border-safety/15 rounded-[10px] p-3">
                  {error}
                </div>
              )}
            </form>
          </>
        )}

        {phase === "error" && (
          <>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-safety mb-4">
              Link problem
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl tracking-[-0.02em] leading-[0.95] mb-3">
              That link won&apos;t open.
            </h1>
            <p className="text-[15px] leading-relaxed text-muted max-w-[38ch] mx-auto mb-8">
              {error}
            </p>
            <Link
              href="/login"
              className="inline-flex bg-ink text-paper font-display font-extrabold text-base px-7 py-4 rounded-[10px] hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Request a new link →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
