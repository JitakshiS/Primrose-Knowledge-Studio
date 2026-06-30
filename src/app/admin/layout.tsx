import type { Metadata } from "next";
import { AdminNav } from "@/components/AdminNav";
import { DesignPreviewBanner } from "@/components/DesignPreviewBanner";

export const metadata: Metadata = {
  title: { default: "Admin", template: "Admin · %s · Primrose Studio" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 bg-paper text-ink">
      <DesignPreviewBanner />
      <AdminNav />
      {children}
    </div>
  );
}
