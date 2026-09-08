import type { Metadata } from "next";
import ExploreView from "@/components/ExplorePage";

export const metadata: Metadata = {
  alternates: { canonical: "/explore" },
  title: "Explore the rooms",
  description:
    "Browse Just Another Friend's peer-support rooms by recovery stage — preparing to stop, the first days, or further along. Read before you post; no signup required.",
};

export default function ExploreRoute() {
  return <ExploreView />;
}
