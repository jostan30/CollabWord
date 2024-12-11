'use client';
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function DocumentButton({ href, id }: { href: string; id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  // Handle loading state
  if (loading) return <p><Loader2 className="mx-auto"/></p>;

  // Handle case when data is undefined or title is missing
  if (!data || !data.title) {
    console.warn(`Document with ID ${id} has no title or is missing.`);
    return null;
  }

  // Render document button
  return (
    <Link
      href={href}
      className={`relative border p-2 rounded-md  mt-3  ${
        isActive ? "bg-gray-200 font-bold border-black" : "border-gray-400 text-center"
      }`}
    >
      <p className="truncate text-center">{data.title}</p>
    </Link>
  );
}

export default DocumentButton;
