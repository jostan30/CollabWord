'use client'
import RoomProvider from "@/components/RoomProvider";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

async function Doclayout({ children }: { children: ReactNode}) {
  // Directly destructure 'id' from params without awaiting
  const { id } = useParams();

  return <RoomProvider roomId={id.toString()}>{children}</RoomProvider>;
}

export default Doclayout;
