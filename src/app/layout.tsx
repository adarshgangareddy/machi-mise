import type { Metadata } from "next";
import { Geist, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-jp",
});

export const metadata: Metadata = {
  title: {
    template: "%s | machi-mise",
    default: "machi-mise — まちの店",
  },
  description:
    "Discover authentic Japanese restaurants and local shops. まちの店 — あなたの地元を探索しよう。",
  keywords: ["japanese restaurants", "local shops", "まちの店", "japan directory"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "machi-mise",
    title: "machi-mise — まちの店",
    description:
      "Discover authentic Japanese restaurants and local shops. まちの店 — あなたの地元を探索しよう。",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "machi-mise",
    description:
      "Discover authentic Japanese restaurants and local shops. まちの店 — あなたの地元を探索しよう。",
  },
  metadataBase: new URL("https://machi-mise.jp"),
};

export function generateViewport() {
  return {
    themeColor: "#dc2626",
    colorScheme: "dark",
    width: "device-width",
    initialScale: 1,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${geist.variable} ${notoJp.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50">
        {children}
      </body>
    </html>
  );
}
