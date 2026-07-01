"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ErrorState";

export default function VideoError({
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
      eyebrow="Video · error"
      headline="Couldn't load this video."
      body="Something went wrong loading the player or the toolkit. Try again, or browse another video."
      onRetry={reset}
      secondaryHref="/dashboard"
      secondaryLabel="Back to library"
      digest={error.digest}
    />
  );
}
