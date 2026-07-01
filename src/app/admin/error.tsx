"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ErrorState";

export default function AdminError({
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
      eyebrow="Admin · error"
      headline="Admin panel hit a snag."
      body="Something went wrong loading this admin surface. Try again, or head back to the overview. Your work isn't lost."
      onRetry={reset}
      secondaryHref="/admin"
      secondaryLabel="Admin overview"
      digest={error.digest}
    />
  );
}
