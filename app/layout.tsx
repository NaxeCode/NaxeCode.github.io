import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const cascadia = localFont({
  src: "../public/fonts/CascadiaCode.woff2",
  variable: "--font-cascadia",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "NaxeCode - Full-Stack Developer Portfolio",
  description:
    "Shipping thoughtful web products with TypeScript, Next.js, and cosmic UI. Fintech, AI, and design systems.",
  openGraph: {
    title: "NaxeCode - Full-Stack Developer Portfolio",
    description:
      "Full-stack developer specializing in Next.js, TypeScript, fintech APIs, and design systems",
    url: "https://naxecode.github.io",
    siteName: "NaxeCode",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${poppins.variable} ${cascadia.variable} font-sans`}>
        <div id="app-root">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <div
          id="modal-root"
          style={{ position: "relative", zIndex: 9999 }}
        ></div>
      </body>
    </html>
  );
}
