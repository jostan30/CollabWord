'use client'
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { createNewDocument } from "../actions/actions";
import { toast } from "react-toastify";

function NewDocumentbutton() {
  const [isPending , startTransition ] =useTransition();
  const router  = useRouter();

  const handleCreateNewDocument =()=>{
    startTransition(async ()=>{
      //Create Document
      const {docId} = await createNewDocument();
      toast.success("Document Created");
      router.push(`/doc/${docId}`);
    })
  }

  return (
    <div>
      <Button onClick={handleCreateNewDocument} className=" text-center mt-2" disabled ={isPending}> {isPending? "Creating..." :"NewDocument"}</Button>
    </div>
  );
}

export default NewDocumentbutton;
