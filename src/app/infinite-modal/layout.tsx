import Link from "next/link";
import React, { ReactNode } from "react";

export default function InfiniteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1 className="text-2xl my-2">Infinite Layout</h1>
      <Link href="/" className="border p-1 bg-slate-500">Home</Link>
      <div>{children}</div>
    </>
  );
}
