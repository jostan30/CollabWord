import { useRoom, useSelf } from "@liveblocks/react/suspense";
import * as Y from "yjs";
import { useEffect, useState } from "react";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteEditor } from "@blocknote/core";
import stringToColor from "@/lib/stringToColor";
import { Avatars } from "./Avatars";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

type EditorProps ={
  doc: Y.Doc; provider: any; 
}

function BlockNote({ doc, provider }: EditorProps) {
  const userInfo = useSelf((me) => me.info);
  
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),

      // Information for this user:
      user: {
        name: userInfo.name,
        color: stringToColor(userInfo.email),
      },
    },
  });
  
  const [darkmode, setdarkmode] = useState(false);
  const buttonStyle = `
  hover:text-white ${
    darkmode
      ? "bg-gray-800 text-gray-300 hover:bg-gray-100 hover:text-gray-700"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-700"
  }`;

  const theme = darkmode? "dark" :"light"

  return (
    <div className="flex flex-col relative rounded-lg bg-white w-full h-full text-gray-900">
      <div className="flex justify-between items-center p-5">
        <Avatars />
        <Button onClick={() => setdarkmode(!darkmode)} className={buttonStyle}>
          {darkmode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      <BlockNoteView
        editor={editor}
        className="relative h-full p-10"
        theme={theme}
      />
    </div>
  );
}

function CollabEditor() {
  const room = useRoom();
  const [Doc, setDoc] = useState<Y.Doc>();
  const [Provider, setProvider] = useState<LiveblocksYjsProvider>();


  

  // Setup LiveBlock Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!Doc || !Provider) {
    return null;
  }

  return (
    <div className=" flex flex-col bg-blend-overlay top-0 right-0 left-0 bottom-0">
      
      <div className=" flex-1 overflow-y-scroll">
      <div className="flex items-center gap-2 justify-end mb-10">
       
      </div>
      <BlockNote doc={Doc} provider={Provider}/>
      </div>
    </div>
  );
}

export default CollabEditor;
