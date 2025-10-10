"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

type AppUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
  _id?: string | null;
  isVerified?: boolean;
  isAcceptingMessages?: boolean;
}

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as AppUser | undefined

  return (
    <nav className="p-4 md:p-6 shadow-md bg-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link className="text-xl font-bold mb-4 md:mb-0" href="/">
          Mystery Message
        </Link>
        {session ? (
          <>
            <span className="mr-4">Welcome, {user?.username || user?.email?.split("@")[0]}</span>
            <Button className="w-full md:w-auto" onClick={() => signOut({callbackUrl:"/"})}>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
