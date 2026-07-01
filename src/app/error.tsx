"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ErrorState";

/*
 * Root error boundary. Catches any error thrown in any route segment that
 * doesn't have its own error.tsx closer to it. Client component per Next.js
 * requirement. Log to console for now; wire to a real error-reporting
 * service (Sentry / Vercel monitoring / etc.) at production hardening pass.
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      headline="Something went wrong."
      body="We hit an unexpected error loading this page. Try again in a moment, or head back to the studio."
      onRetry={reset}
      secondaryHref="/"
      secondaryLabel="Back to studio"
      digest={error.digest}
    />
  );
}
