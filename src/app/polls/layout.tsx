import Link from "next/link";
import React, { PropsWithChildren } from "react";

export default function PollsLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Link href={"/"} className="bg-zinc-500 p-2 mb-4">
        Home
      </Link>
      <h1 className="text-4xl">Polls main layout</h1>
      <main>{children}</main>
    </div>
  );
}
