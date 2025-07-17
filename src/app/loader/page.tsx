import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
    <Link href={"/"}>Home</Link>
    <div className="bg-background flex items-center justify-center h-screen">
      <div className="relative text-sm font-bold overflow-hidden bg-[#ca1527] text-white pb-1 px-2">
        <div className="relative ">gram.pl</div>
        <div className="absolute inset-0 bg-background animate-reveal"></div>
      </div>
    </div>
    </>
  );
}
