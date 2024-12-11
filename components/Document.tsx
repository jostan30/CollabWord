'use client'
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ManageUsers from "./ManageUsers";
import { useEffect, useState, useTransition } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore"; import CollabEditor from "./CollabEditor";
import DeleteDocument from "./DeleteDocument";
import useOwner from "@/lib/useOwner";
;


function Document({ id }: {
    id: string;
}) {
    const [input, setinput] = useState("");
    const [isPending, startTransition] = useTransition();
    const [data, loading, error] = useDocumentData(doc(db, "documents", id))
    const isOwner = useOwner();

    useEffect(() => {
        if (!data) return;
        setinput(data.title);
    }, [data])

    const updateTitle = () => {
        startTransition(async () => {
            await updateDoc(doc(db, "documents", id), {
                title: input,
            })
        })
    }

    return <div>
        <div className="flex flex-col">
            {/* Update Title */}
            <div className="flex max-w items-center space-x-2  p-5">
                <Input className="max-w" value={input} onChange={(e) => { setinput(e.target.value) }} />
                <Button onClick={updateTitle} disabled={isPending}
                >{isPending ? "Updating" : "Update"}</Button>
                {/* isOwner && Delete Document */}
                {isOwner && 
                <DeleteDocument id={id}  />
                }
               
            </div>

        </div>

        <div className="flex max-w items-center space-x-2 px-5 mb-0">
            {/* isOwner && I Manage Users */}
            {isOwner && <ManageUsers/>}

            {/* Avatar */}
        </div>

        {/* Collaborative Editor */}
        <CollabEditor />

    </div>;

}
export default Document;
