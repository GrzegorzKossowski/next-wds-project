"use client";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "@/auth/helpers";
import React from "react";
import { Button } from "./ui/button";

export default function AuthButtonClient() {
  const session = useSession();
  return session.data?.user ? (
    <Button 
      variant="default"
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      {session.data?.user?.name} : Sign Out
    </Button>
  ) : (
    <Button
      variant="outline"
      onClick={async () => {
        await signIn();
      }}
    >
      Sign in
    </Button>
  );
}
