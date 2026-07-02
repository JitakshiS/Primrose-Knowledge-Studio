import { MemberNav } from "@/components/MemberNav";
import { DesignPreviewBanner } from "@/components/DesignPreviewBanner";
import {
  SkeletonBlock,
  SkeletonText,
  SkeletonScreenReaderNote,
} from "@/components/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex-1 bg-paper text-ink">
      <DesignPreviewBanner />
      <MemberNav />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
        <SkeletonScreenReaderNote />
        <div className="mb-10 space-y-3">
          <SkeletonText className="w-32" />
          <SkeletonBlock className="h-12 w-72 max-w-full" />
        </div>
        <SkeletonBlock className="h-64 rounded-[24px] mb-12" />
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBlock key={i} className="aspect-[0.78] rounded-[16px]" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-56 rounded-[16px]" />
          ))}
        </div>
      </main>
    </div>
  );
}
