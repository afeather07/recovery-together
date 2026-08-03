import RoomView from "@/components/RoomView";

export default function RoomPage({ params }: { params: { slug: string } }) {
  return <RoomView slug={params.slug} />;
}
