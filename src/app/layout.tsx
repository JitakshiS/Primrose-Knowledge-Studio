import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://primroseknowledgestudio.com";
const SITE_DESCRIPTION =
  "A subscription library of in-depth videos on your rights, your money, and your safety. Taught by a working Canadian lawyer in plain English.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Primrose Studio · The knowledge they didn't teach you",
    template: "%s · Primrose Studio",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Primrose Studio",
  authors: [{ name: "Primrose Watson" }],
  creator: "Primrose Watson",
  keywords: [
    "Canadian law",
    "legal knowledge",
    "workplace rights",
    "financial wellness",
    "personal safety",
    "Gen Z legal education",
    "Primrose Watson",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: "Primrose Studio",
    title: "Primrose Studio · The knowledge they didn't teach you",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Primrose Studio · The knowledge they didn't teach you",
    description: SITE_DESCRIPTION,
    creator: "@primrosewatson",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-2.5 focus:rounded-[8px] font-display font-bold text-sm"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
