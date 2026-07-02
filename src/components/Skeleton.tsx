/*
 * Skeleton primitives for loading.tsx files. Stone-coloured pulse blocks
 * matching the design system radii, so loading states read as "the page
 * taking shape" rather than a generic spinner.
 */

export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-stone/70 rounded-[12px] animate-pulse ${className}`}
      aria-hidden
    />
  );
}

export function SkeletonText({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-stone/70 rounded-[6px] animate-pulse h-4 ${className}`}
      aria-hidden
    />
  );
}

export function SkeletonScreenReaderNote() {
  return <span className="sr-only">Loading</span>;
}
