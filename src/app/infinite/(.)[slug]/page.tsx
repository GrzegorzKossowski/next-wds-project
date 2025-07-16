import React from "react";
import PostElement from "./PostElement";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <div className="text-red-500">INTERCEPTED INFINITE SLUG PAGE</div>
      <div>page {slug}</div>
      <PostElement id={Number(slug)} />
    </div>
  );
}
