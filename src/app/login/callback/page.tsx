import Link from "next/link";
import { LogoDots } from "@/components/LogoDots";

/*
 * Magic-link callback. Server-rendered "signing you in" placeholder for
 * the design preview. When Firebase is wired this becomes a client
 * component that:
 *   1. Reads ?apiKey and ?oobCode from the URL.
 *   2. Calls signInWithEmailLink(firebaseAuth(), email, window.location.href)
 *      using the email stashed in localStorage under pks_pending_email.
 *   3. POSTs the ID token to /api/auth/session to mint the session cookie.
 *   4. router.replace('/dashboard') (or the ?next= target).
 *   5. Renders error states for: expired link, wrong email, network failure.
 */

export default function LoginCallbackPage() {
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

        {/* Loading dots — pillar-coloured pulse */}
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

        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-soft mt-12">
          If this takes more than a few seconds,{" "}
          <Link
            href="/login"
            className="text-muted hover:text-ink underline underline-offset-2 transition-colors"
          >
            request a new link
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
