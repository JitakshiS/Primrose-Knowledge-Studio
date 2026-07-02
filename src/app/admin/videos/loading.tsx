import {
  SkeletonBlock,
  SkeletonText,
  SkeletonScreenReaderNote,
} from "@/components/Skeleton";

/* Admin layout already renders AdminNav + banner around this. */
export default function AdminVideosLoading() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14 flex-1 w-full">
      <SkeletonScreenReaderNote />
      <div className="mb-8 space-y-3">
        <SkeletonText className="w-40" />
        <SkeletonBlock className="h-12 w-64 max-w-full" />
      </div>
      <SkeletonBlock className="h-16 rounded-[16px] mb-6" />
      <SkeletonBlock className="h-96 rounded-[16px]" />
    </main>
  );
}
