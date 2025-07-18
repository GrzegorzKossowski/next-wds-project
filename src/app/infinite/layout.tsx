import React, { PropsWithChildren } from "react";
import Link from "next/link";

export default function InfiniteLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <div>
        <Link href="/" className="bg-zinc-400">
          Home
        </Link>
      </div>
      <h1 className="text-4xl">Infinite Layout</h1>
      <div>{children}</div>
    </div>
  );
}
