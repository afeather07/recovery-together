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
    default: "Just Another Friend — You do not have to go through this alone",
    template: "%s — Just Another Friend",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Just Another Friend",
    description: "You do not have to go through this alone.",
    siteName: "Just Another Friend",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Another Friend",
    description: "You do not have to go through this alone.",
  },
};

export const viewport: Viewport = {
  themeColor: "#3f6b5c",
  width: "device-width",
  initialScale: 1,
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Just Another Friend",
      url: SITE_URL,
      description: DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Just Another Friend",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <div className="safety-strip" role="note">
          In immediate danger? <a href="tel:988">Call or text 988</a> — free, 24/7 ·{" "}
          <a href="/safety">All crisis resources</a>
        </div>
        <SiteNav />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
