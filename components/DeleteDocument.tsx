'use client'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DeleteDocmumentfromDb } from "@/actions/actions";
import { toast } from "react-toastify";


function DeleteDocument({ id }: { id: string }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const deleteDocument = () => {
        setIsOpen(!isOpen);
        startTransition(async () => {
            const success = await DeleteDocmumentfromDb(id);
            // Show success toast
            if (success) {
                toast.success("Document deleted successfully");
                
                // Redirect to home page
                router.push("/");
            } else {
                // Show error toast
                toast.error("Something went wrong, please try again");
            }
        });
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="h-9 w-20 font-semibold text-primary-foreground rounded-md bg-red-500">Delete</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center justify-center">Are you sure you want to delete?</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center align-center">
                        <DialogFooter>
                            <Button onClick={deleteDocument} disabled={isPending}>Yes</Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DeleteDocument;
