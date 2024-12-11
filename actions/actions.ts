'use server';
import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
    auth.protect();

    const session = await auth();
    const sessionClaims = session.sessionClaims as { email?: string }; // Explicit typing
    const email = sessionClaims.email;

    if (!email) {
        throw new Error("User email not found in session claims");
    }
 

    // Create a new document in the 'documents' collection
    const docCollectionRef = adminDb.collection('documents');
    const docRef = await docCollectionRef.add({
        title: 'New Document',
    });

    // Create a sub-collection 'rooms' for the user in the 'users' collection
    await adminDb
        .collection('users')
        .doc(email) // Use the valid email
        .collection('rooms')
        .doc(docRef.id) // Use the newly created document ID
        .set({
            userId: email,
            role: 'owner',
            createdAt: new Date(),
            roomId: docRef.id,
        });

    return { docId: docRef.id };
}


export async function DeleteDocmumentfromDb (id:string){
    auth.protect();
    
    try {
        await adminDb.collection("documents").doc(id).delete();

        //get all users who belong to the room
        const query = await adminDb
        .collectionGroup("rooms")
        .where("roomId","==",id)
        .get();

        //delete all room references in users collection
        const batch = adminDb.batch();

        query.docs.forEach((doc)=>{
            batch.delete(doc.ref);
        })

        await batch.commit();
        await liveblocks.deleteRoom(id);

        return {sucess:true};

    } catch (error) {
        return{sucess :false};
    }
}
 

export  async function removeUserFromDoc (userid :string, roomid:string) {
    auth.protect();
    try {

        await adminDb 
        .collection("users")
        .doc(userid)
        .collection("rooms")
        .doc(roomid)
        .delete();
        
        return {sucess :true};
    } catch (error) {
        return {sucess :false};
    }
}

export  async function inviteUserToDoc (userid :string, roomid:string) {
    auth.protect();
    try {

        await adminDb 
        .collection("users")
        .doc(userid)
        .collection("rooms")
        .doc(roomid)
        .set({
            userId: userid,
            role: 'editor',
            createdAt: new Date(),
            roomId: roomid,
        })
        
        return {sucess :true};
    } catch (error) {
        return {sucess :false};
    }
}



export {};
