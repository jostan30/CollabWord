import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react";
import { collectionGroup, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

function useOwner() {
    const { user } = useUser(); // Get current user
    const room = useRoom(); // Get current room
    const [isOwner, setIsOwner] = useState(false);

    // Fetch users in the room based on roomId
    const [usersInRoom, loading, error] = useCollection(
        room?.id
            ? query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
            : null // Pass null if room.id is not defined
    );

    useEffect(() => {
        if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
            // Find owners in the room
            const owners = usersInRoom.docs.filter(
                (doc) => doc.data().role === "owner"
            );

            // Check if the current user is an owner
            if (
                owners.some(
                    (owner) =>
                        owner.data().userId ===
                        user?.emailAddresses?.[0]?.emailAddress
                )
            ) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        }
    }, [usersInRoom, user]);

    return isOwner;
}

export default useOwner;
