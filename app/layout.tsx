import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/shared/MotionProvider";
import { SITE } from "@/lib/site";

// Inter for the interface, Hind Siliguri for Bengali letters
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${SITE.name} Studio`, template: `%s | ${SITE.name} Studio` },
  description: SITE.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// Runs before the first paint: saved choice first, then the system setting.
const themeScript = `try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${hindSiliguri.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-bg text-ink">
        <a
          href="#main"
          className="sr-only rounded-field bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Suspense fallback={<div className="h-16 border-b border-line bg-bg" />}>
            <Navbar />
          </Suspense>
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
