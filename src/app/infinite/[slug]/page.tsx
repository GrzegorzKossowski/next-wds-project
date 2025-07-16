import { trpc } from "@/trpc/server";
import Link from "next/link";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { id, body, title, createdAt } = await trpc.getPostById(Number(slug));

  return (
    <div>
      <h1>Title: {title}</h1>
      <div>ID: {id}</div>
      <div>Body: {body}</div>
      <div>{createdAt.getDay()}</div>
      <hr />
      <Link href={"/infinite"}>Infinite list</Link>
    </div>
  );
}
