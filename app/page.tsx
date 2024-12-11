import { Button } from "@/components/ui/button";
import "./globals.css"
import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
      <main className="flex flex-row gap-4 row-start-2 items-center sm:items-start mt-2 md:mt-4">
       <ArrowLeftCircle className="w-10 h-7 pl-2 mr-0"/>
       <h1 className="font-bold text-lg md:text-xl ">Get started creating a New Document </h1>
      </main>
  
  );
}
