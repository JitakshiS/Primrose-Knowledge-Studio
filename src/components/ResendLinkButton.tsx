"use client";

import { useState } from "react";
import { firebaseAuth } from "@/lib/firebase/client";
import { sendSignInLinkToEmail } from "firebase/auth";

/*
 * Resend the magic sign-in link from /welcome. Client island inside the
 * server-rendered page. Uses the email passed via prop (from the ?email=
 * query param post-checkout) or the one stashed by /login. Fails soft
 * with a readable message until Firebase env vars exist.
 */

export function ResendLinkButton({ email }: { email?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function resend() {
    const target =
      email && email.includes("@")
        ? email
        : window.localStorage.getItem("pks_pending_email") ?? "";
    if (!target) {
      setState("error");
      setMessage("We don't have your email on this device. Head to the sign-in page instead.");
      return;
    }
    setState("sending");
    setMessage(null);
    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
      await sendSignInLinkToEmail(firebaseAuth(), target, {
        url: `${siteUrl}/login/callback`,
        handleCodeInApp: true,
      });
      window.localStorage.setItem("pks_pending_email", target);
      setState("sent");
    } catch {
      setState("error");
      setMessage("Couldn't send just now. Try again in a minute, or write to hello@primroseknowledgestudio.com.");
    }
  }

  return (
    <div className="flex flex-col items-stretch sm:items-end gap-2 flex-shrink-0">
      <button
        type="button"
        onClick={resend}
        disabled={state === "sending" || state === "sent"}
        className="bg-ink text-paper font-display font-bold text-sm px-5 py-3 rounded-[10px] hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60"
      >
        {state === "sending"
          ? "Sending…"
          : state === "sent"
            ? "Link sent ✓"
            : "Resend the link"}
      </button>
      {message && (
        <p className="text-[12px] text-safety max-w-[32ch] sm:text-right">
          {message}
        </p>
      )}
    </div>
  );
}
