// layout.tsx (NORMAL LAYOUT - Without BitsRainGlobal)
import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
// import BitsRainGlobal from "@/components/ui/BitsRainGlobal"; // <-- REMOVED IMPORT

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diegopozo.website";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Diego Bruno Pozo — Portfolio",
    template: "%s | Diego Bruno Pozo",
  },
  description:
    "Builder of AI, XR & robotics solutions. I turn ideas into demos, MVPs, and production systems.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Diego Bruno Pozo — Portfolio",
    description:
      "Builder of AI, XR & robotics solutions. I turn ideas into demos, MVPs, and production systems.",
    siteName: "Diego Pozo",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diego Bruno Pozo — Portfolio",
    description:
      "Builder of AI, XR & robotics solutions. I turn ideas into demos, MVPs, and production systems.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable}`}>
      {/* The body retains the dark background color */}
      <body className="font-sans bg-slate-950 text-slate-50 antialiased relative overflow-x-hidden">
        
        {/* REMOVED: <BitsRainGlobal seed={1337} /> */}

        {/* The main content now renders directly as the background will be static */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}