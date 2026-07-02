import { MemberNav } from "@/components/MemberNav";
import { DesignPreviewBanner } from "@/components/DesignPreviewBanner";
import {
  SkeletonBlock,
  SkeletonText,
  SkeletonScreenReaderNote,
} from "@/components/Skeleton";

export default function PillarLibraryLoading() {
  return (
    <div className="flex-1 bg-paper text-ink">
      <DesignPreviewBanner />
      <MemberNav />
      <SkeletonScreenReaderNote />
      {/* Pillar hero placeholder */}
      <div className="bg-stone/70 animate-pulse">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
          <div className="h-4 w-40 bg-paper/50 rounded-[6px] mb-8" />
          <div className="h-16 w-96 max-w-full bg-paper/50 rounded-[12px] mb-6" />
          <div className="h-5 w-80 max-w-full bg-paper/50 rounded-[6px]" />
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <SkeletonText className="w-40 mb-7" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-72 rounded-[16px]" />
          ))}
        </div>
      </main>
    </div>
  );
}
