import RoomProvider from "../../../components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { ReactNode } from "react";

async function Doclayout({children, params }: {
  children: ReactNode;
  params: { id: string };
}) {
  auth.protect();  // Ensure the user is authenticated

  // Wait for params to be resolved before using it
  const { id } = await params;

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default Doclayout;
