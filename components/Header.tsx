'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import BreadCrumbs from "./ui/BreadCrumbs";

function Header() {
  const {user} =useUser();
  return <div className="flex item-center justify-between p-5">
      {user &&  (
        <Link href="/" > <h1 className=" font-bold text-xl">{user?.firstName}{`'s`} Space</h1> </Link>
      )}
      {/*  Bread crumbs*/}
      <BreadCrumbs/>

      <div>
        <SignedOut>
          <SignInButton/>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
    </div>;
}
export default Header;
