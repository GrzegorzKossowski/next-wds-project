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
      <div>Post ID: {slug}</div>
      <p>Strona prezentowana po przejściu z listy postów</p>
      <PostElement id={Number(slug)} />
    </div>
  );
}
