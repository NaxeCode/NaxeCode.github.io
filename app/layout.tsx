import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import copyData from "@/data/copy.json";

export const viewport: Viewport = {
  themeColor: "#0b0e1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
export const metadata: Metadata = {
  metadataBase: new URL("https://naxe.dev"),
  title: copyData.site.title,
  description: copyData.site.description,
  openGraph: {
    title: copyData.site.ogTitle,
    description: copyData.site.ogDescription,
    url: "https://naxe.dev/",
    siteName: copyData.site.brand,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1280, height: 640, alt: "Aladdin Ali · Naxe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: copyData.site.ogTitle,
    description: copyData.site.ogDescription,
    site: "@NaxeDev",
    creator: "@NaxeDev",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
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
