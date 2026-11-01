import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { HeroHatch } from "@/components/layout/hero-hatch";
import { SiteNav } from "@/components/layout/site-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mrutunjay Yadav — MERN Stack Developer",
  description:
    "Mrutunjay Yadav is a MERN stack developer in Mumbai building fast, data-heavy web apps end to end with Next.js, React, Node, TypeScript and MongoDB.",
};

/**
 * Runs before first paint: restores the saved theme (same `my-theme` key as the
 * original design) and flags that JS is available so GSAP entrance states can
 * be hidden without a flash. Content stays fully visible without JS.
 */
const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('my-theme');if(t==='dark'||t==='light'){d.dataset.theme=t}d.classList.add('js')}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the boot script mutates <html> (data-theme, class) before hydration.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SmoothScroll />
        {/* Centered shell — stops the layout stretching on ultra-wide screens. */}
        <div className="relative mx-auto w-full max-w-[1280px]">
          <HeroHatch />
          <div className="relative z-10">
            <SiteNav />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
