'use client'

import Document from "@/components/Document"
import { useParams } from "next/navigation";

function Documentpage() {
  const {id} =useParams<{id:string}>();
  
  return <div className="flex flex-col flex-1 min-h-screen">
    <Document id={id?.toString()}/>
  </div>;
}
export default Documentpage;

