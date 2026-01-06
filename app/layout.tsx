import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import copyData from "@/data/copy.json";

const cascadia = localFont({
  src: "../public/fonts/CascadiaCode.woff2",
  variable: "--font-cascadia",
});

const poppins = localFont({
  src: "../public/fonts/Poppins-Regular.ttf",
  variable: "--font-poppins",
  weight: "400",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: copyData.site.title,
  description: copyData.site.description,
  openGraph: {
    title: copyData.site.ogTitle,
    description: copyData.site.ogDescription,
    url: "https://naxecode.github.io",
    siteName: copyData.site.brand,
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
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Analytics />
        <div id="app-root">
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
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
