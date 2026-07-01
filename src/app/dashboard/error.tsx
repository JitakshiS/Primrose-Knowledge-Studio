"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ErrorState";

export default function DashboardError({
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
      eyebrow="Members · error"
      headline="Couldn't load your library."
      body="Something went wrong on our end. Try again in a moment. If it keeps happening, sign out and back in."
      onRetry={reset}
      secondaryHref="/login"
      secondaryLabel="Sign in again"
      digest={error.digest}
    />
  );
}
