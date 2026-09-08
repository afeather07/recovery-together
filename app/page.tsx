import type { Metadata } from "next";
import HomeGate from "@/components/HomeGate";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeGate />;
}
