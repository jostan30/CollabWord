'use client'

import LiveBlocksProvider from "@/components/LiveBlocksProvider";
import { ReactNode } from "react";

function Pagelayout({ children }: {children: ReactNode}) {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>
}
export default Pagelayout;
