import React, { PropsWithChildren } from "react";
import Link from "next/link";

export default function InfiniteLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <div>
        <Link href="/" className="bg-zinc-400">Home</Link>
      </div>
      InfiniteLayout
      <div>{children}</div>
    </div>
  );
}
