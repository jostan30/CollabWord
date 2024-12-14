'use client'
import { ReactNode, useEffect } from "react";
import {LiveblocksProvider} from "@liveblocks/react/suspense";
import { usePathname, useRouter } from "next/navigation";


function LiveBlocksProvider({ children }: {
    children: ReactNode,
}) {
    const path = usePathname();
    const segments = path.split("/");
    const roomId = segments[segments.length - 1];
    

    const router = useRouter();
    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const res = await fetch('/api/newauth-endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ room :roomId  }),
                });

                if (!res.ok) {
                    // Redirect user out of the room if not authorized
                    router.push('/unauthorized'); // Change to your desired redirect page
                }
            } catch (error) {
                console.error("Error verifying user auth:", error);
                router.push('/unauthorized'); // Fallback redirect
            }
        };

        // Polling or real-time updates to recheck authorization
        const interval = setInterval(checkUserAuth, 5000); // Check every 5 seconds
        return () => clearInterval(interval); // Cleanup on component unmount
    }, [router]);


    if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
        throw new Error('NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not defined')
    }

    return <LiveblocksProvider throttle={16} authEndpoint='/api/newauth-endpoint'>
        {children}</LiveblocksProvider>;
}
export default LiveBlocksProvider;
