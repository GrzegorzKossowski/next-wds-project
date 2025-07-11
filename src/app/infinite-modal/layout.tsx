import Link from "next/link";
import React, { ReactNode } from "react";

export default function InfiniteLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <div>Infinite Layout</div>
      <Link href="/">Home</Link>
      <div>
        {children}
        {modal}
      </div>
    </>
  );
}
