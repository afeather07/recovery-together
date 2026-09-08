import type { Metadata } from "next";
import JourneyView from "@/components/JourneyPage";

export const metadata: Metadata = {
  alternates: { canonical: "/journey" },
  title: "My Journey",
  description:
    "Your recovery stage, your room, and any replies waiting for you — so you never have to hunt for where you left off.",
};

export default function JourneyRoute() {
  return <JourneyView />;
}
