import { auth } from "@/auth";
import Link from "next/link";
import React from "react";
import { RefreshSessionButton } from "./ExpireSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl">DASHBOARD (private)</h2>
      <div className="mb-4 text-xl">Private page this is</div>
      <div>
        <Link href="/" className="bg-zinc-500/30 p-1 my-2">
          Home
        </Link>
      </div>
      <div>dane sesji:</div>
      <div>{session && JSON.stringify(session, null, 2)}</div>
      <div>sesja trwa 10 sec. W tym czasie można ją odświeżyć.</div>
      <div>
        <RefreshSessionButton />
      </div>
    </div>
  );
}
