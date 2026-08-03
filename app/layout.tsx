import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recovery Together",
  description:
    "Peer support for people preparing for or recovering from 7-OH and concentrated kratom products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
