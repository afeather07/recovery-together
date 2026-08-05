import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "Peer support for people preparing to stop, currently stopping, or recovering from 7-OH and concentrated kratom products. Anonymous, mobile-first, always free to join.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Recovery Together — You do not have to go through this alone",
    template: "%s — Recovery Together",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Recovery Together",
    description: "You do not have to go through this alone.",
    siteName: "Recovery Together",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recovery Together",
    description: "You do not have to go through this alone.",
  },
};

export const viewport: Viewport = {
  themeColor: "#3f6b5c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
