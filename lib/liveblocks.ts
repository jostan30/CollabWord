import { Liveblocks } from "@liveblocks/node";

const key = process.env.LIVEBLOCK_SECRET_KEY;

if(!key) {
    throw new Error("LIVEBLOCK_SECRET_KEY NOT SET");
}
const liveblocks = new Liveblocks({
    secret: key,
});

export default liveblocks;