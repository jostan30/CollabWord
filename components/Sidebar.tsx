'use client'

import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { MenuIcon } from "lucide-react";
import NewDocumentbutton from "./NewDocumentbutton";
import DocumentButon from "./DocumentButon";
import { useEffect, useState } from "react";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DocumentData } from "firebase-admin/firestore";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}



function Sidebar() {
  const { user } = useUser(); // Fetch the user from Clerk
  const emailAddress = user?.emailAddresses?.[0]?.toString(); // Access user's email address
  const [groupedData, setgroupedData] = useState<{
    owner: RoomDocument[],
    editor: RoomDocument[],
  }>({
    owner: [],
    editor: [],
  });

  // Construct the Firestore query if the user is logged in
  const collectionQuery = emailAddress
    ? query(
      collectionGroup(db, "rooms"), // Target the "rooms" collection group
      where("userId", "==", emailAddress) // Filter by userId
    )
    : null;

  // Use Firestore hook to fetch data
  const [data, loading, error] = useCollection(collectionQuery);

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          })
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          })
        }
        console.log(acc)
        return acc;
      }, {
      owner: [],
      editor: [],
    }
    )
    setgroupedData(grouped);
  }, [data])

  // Render error state
  if (error) { console.error(error.message) }
  // Render menu options
  const menuOptions = (
    <div className="flex flex-col align-middle">
      <NewDocumentbutton />
      {/* My Documents */}

      {groupedData.owner.length === 0 ? (
        <h2 className="text-gray-500 font-semibold text-sm text-center mt-3 flex flex-col ">
          Get Started
        </h2>
      ) : (
        <>
          <h2 className="text-gray-500 font-semibold text-sm text-center mt-3">
            My Documents
          </h2>
          {
            groupedData.owner.map((doc) => {
              return <DocumentButon key={doc.id} id={doc.roomId} href={`/doc/${doc.id}`} />
            })
          }
        </>
      )}


      {/* Shared with me */}

      {groupedData.editor.length === 0 ? null:(
        <>
          <h2 className="text-gray-500 font-semibold text-sm text-center mt-3">
            Shared Documents
          </h2>
          { groupedData.editor.map((doc) =>{
            return <DocumentButon key={doc.id} id={doc.roomId} href={`/doc/${doc.id}`} />
          })
          }
        </>
      )
      }
        
      
    </div>
  );

  return (
    <div className="p-3 md:p-5 bg-gray-200 relative w-100">
      {/* Mobile View */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side="left" className="justify-items-center p-5 space-y-3.5">
            <SheetHeader>
              <SheetTitle className="text-center text-2xl">Menu</SheetTitle>
            </SheetHeader>
            {menuOptions}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}

export default Sidebar;
