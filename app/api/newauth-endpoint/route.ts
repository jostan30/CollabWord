'use server'
import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        console.log("Request received"); // Log when API is hit

        // Ensure user is authenticated
        auth.protect();
        console.log("Authentication protection passed");

        const session = await auth();
        const sessionClaims = session.sessionClaims as { email?: string; fullName?: string; image?: string };
        const { email, fullName, image } = sessionClaims;

        // Validate session claims
        if (!email || !fullName || !image) {
            console.error("Invalid session claims:", sessionClaims);
            return new Response("Invalid session claims", { status: 400 });
        }

        // Parse room parameter from request body
        const { room } = await req.json().catch((err) => {
            console.error("Error parsing request body:", err);
            return null;
        });

        if (!room) {
            console.error("Room parameter missing");
            return new Response("Room parameter missing", { status: 400 });
        }

        // Prepare Liveblocks session
        const sessions = liveblocks.prepareSession(email, {
            userInfo: { name: fullName, email: email, avatar: image },
        });

        // Query Firestore to check if the user is part of the room
        const usersInRoom = await adminDb.collectionGroup("rooms").where("userId", "==", email).get();
        const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

        if (userInRoom?.exists) {
            sessions.allow(room, sessions.FULL_ACCESS);

            // Authorize with Liveblocks and return the response
            const { body, status } = await sessions.authorize();

            // Ensure response is in the expected JSON format
            const parsedBody = typeof body === "string" ? JSON.parse(body) : body;
            if (parsedBody.token) {
                return new Response(JSON.stringify({ token: parsedBody.token }), { status });
            } else {
                console.error("Token not found in Liveblocks response:", parsedBody);
                return new Response("Token not found", { status: 500 });
            }
        } else {
            console.error("User not in room:", room);
            return NextResponse.json({ message: "You are not in this room" }, { status: 403 });
        }

    } catch (error) {
        console.error("Unhandled error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
