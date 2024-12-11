'use client'

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs";
import useOwner from "@/lib/useOwner";
import { useRoom } from "@liveblocks/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import {inviteUserToDoc, removeUserFromDoc} from "@/actions/actions";
import { toast } from "react-toastify";
import { EmailAddress } from "@clerk/nextjs/server";


function ManageUsers() {
    const { user } = useUser();
    const isOwner = useOwner();
    const room = useRoom();
    const [inputEmail ,setinputEmail] =useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
    )
   
   
    const FindUser = () => {
        startTransition(async () => {
            const {sucess}= await inviteUserToDoc(inputEmail,room.id);
            if(sucess) {
                toast.success("User Invited Sucessfully");
            } else {
                toast.error("Couldnt Invite User");
            }

        })
    }

    const handleDelete = (userid: string ,roomid:string) => {
        startTransition(async () => {
            if(!user) return;

            const {sucess}= await removeUserFromDoc(userid,roomid);
            if(sucess) {
                toast.success("User Deleted Sucessfully");
            } else {
                toast.error("Couldnt Delete User");
            }

        })
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild >
                    <Button variant="outline">Users {usersInRoom?.docs.length}</Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col ">
                    <DialogTitle className="flex justify-center">Invite User</DialogTitle>
                    <div className="flex p-5 space-x-2">
                        <Input name="email" onChange={e=>setinputEmail(e.target.value)} placeholder="Enter the email of user you want to Invite." />
                        <Button  variant="outline" onClick={()=>FindUser()}>Invite</Button>
                    </div>
                    <hr className="my-2" />
                    {/* Users in Room */}
                    <div className="flex-1 flex-col">
                        {
                            usersInRoom?.docs.map((doc) => {
                                return (
                                    <div className="flex justify-center px-5 align-center justify-between mt-2" key={doc.data().userId}>
                                        <span className=" pt-1 " >{doc.data().userId == user?.emailAddresses[0].toString() ? `(You) ${doc.data().userId}` : doc.data().userId}</span>
                                        <div className="space-x-1">
                                            <Button variant="outline" >{doc.data().role}</Button>
                                            {
                                                isOwner && doc.data().userId !== user?.emailAddresses[0].toString() ?
                                                    <Button variant="destructive" onClick={() => handleDelete(doc.data().userId,doc.data().roomId)}>Delete</Button>
                                                    : null
                                            }
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ManageUsers;
