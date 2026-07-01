"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ErrorState";

export default function PillarLibraryError({
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
      eyebrow="Pillar library · error"
      headline="Couldn't load this pillar."
      body="Something went wrong pulling this pillar's videos. Try again, or head back to the dashboard for the full library."
      onRetry={reset}
      secondaryHref="/dashboard"
      secondaryLabel="Back to dashboard"
      digest={error.digest}
    />
  );
}
