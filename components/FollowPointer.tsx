'use client';

import stringToColor from "@/lib/stringToColor";
import { motion } from "framer-motion";

function FollowPointer({ info, x, y }: {
    info: {
        name: string,
        email: string,
        avatar: string
    } | null,
    x: number,
    y: number
}) {
    if (!info) {
        console.warn("Missing info object");
        return null; // Safely return null if info is not provided
    }

    const color = stringToColor(info?.email || 'default@example.com');

    return (
        <motion.div
            className="absolute z-50 flex flex-col items-center"
            style={{
                top: y,
                left: x,
                pointerEvents: "none",
            }}
            initial={{
                scale: 0.8,
                opacity: 0.8,
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            exit={{
                scale: 0.5,
                opacity: 0,
            }}
        >
            {/* Pointer Icon */}
            <motion.div
                className="h-10 w-10 rounded-full flex items-center justify-center shadow-md"
                style={{
                    backgroundColor: color,
                    boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.2)`,
                }}
                initial={{
                    scale: 0.8,
                    opacity: 0.8,
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                exit={{
                    scale: 0.5,
                    opacity: 0,
                }}
            >
                <svg
                    stroke="white"
                    fill="white"
                    strokeWidth="1"
                    viewBox="0 0 16 16"
                    className="h-6 w-6 transform rotate-45"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557l8.528 15.467a.5.5 0 0 1-.917.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916L12.728 5.657a.5.5 0 0 1 .556.103z"></path>
                </svg>
            </motion.div>

            {/* User Info Tooltip */}
            <motion.div
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                }}
                initial={{
                    scale: 0.9,
                    opacity: 0,
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                exit={{
                    scale: 0.9,
                    opacity: 0,
                }}
                className={
                    "px-3 py-1 mt-2 shadow-lg text-center font-medium rounded-lg text-sm"
                }
            >
                {info?.name || info?.email || "Unknown"}
            </motion.div>
        </motion.div>
    );
}

FollowPointer.defaultProps = {
    info: {
        name: "Guest",
        email: "guest@example.com",
        avatar: "",
    },
    x: 0,
    y: 0,
};

export default FollowPointer;
