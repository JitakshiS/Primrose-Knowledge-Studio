import { MemberNav } from "@/components/MemberNav";
import { DesignPreviewBanner } from "@/components/DesignPreviewBanner";
import {
  SkeletonBlock,
  SkeletonText,
  SkeletonScreenReaderNote,
} from "@/components/Skeleton";

export default function VideoLoading() {
  return (
    <div className="flex-1 bg-paper text-ink">
      <DesignPreviewBanner />
      <MemberNav />
      <main className="max-w-5xl mx-auto px-6 lg:px-10 py-8 lg:py-12">
        <SkeletonScreenReaderNote />
        <SkeletonText className="w-56 mb-6" />
        <div className="mb-8 space-y-3">
          <SkeletonText className="w-36" />
          <SkeletonBlock className="h-14 w-full max-w-2xl" />
          <SkeletonText className="w-44" />
        </div>
        <SkeletonBlock className="aspect-video rounded-[16px] mb-8" />
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <SkeletonBlock className="h-48 rounded-[16px]" />
          <SkeletonBlock className="h-48 rounded-[16px]" />
        </div>
      </main>
    </div>
  );
}
