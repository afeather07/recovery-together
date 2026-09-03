import type { Metadata } from "next";
import ProfileSettings from "@/components/ProfileSettings";

export const metadata: Metadata = {
  title: "Profile & Settings",
  description: "Manage your nickname, reply notifications, and privacy on Just Another Friend.",
};

export default function ProfilePage() {
  return <ProfileSettings />;
}
