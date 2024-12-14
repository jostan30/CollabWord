'use client'

import { useParams } from "next/navigation";
import Document from "../../../components/Document";

function Documentpage() {
  const {id} =useParams<{id:string}>();
  
  return <div className="flex flex-col flex-1 min-h-screen">
    <Document id={id?.toString()}/>
  </div>;
}
export default Documentpage;

