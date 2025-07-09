import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <div>
      <div>Private page this is</div>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>{session && JSON.stringify(session, null, 2)}</div>
    </div>
  );
}
