import Link from "next/link";
import React from "react";
import GramLoader from "./GramLoader";

export default function page() {
  return (
    <>
      <Link href={"/"}>Home</Link>
      <GramLoader />
    </>
  );
}
