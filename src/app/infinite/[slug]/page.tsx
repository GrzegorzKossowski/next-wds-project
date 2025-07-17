import { trpc } from "@/trpc/server";
import Link from "next/link";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await trpc.getPostById(Number(slug));
  if ("error" in data) return <>Error...</>;
  const { id, body, title, createdAt } = data;

  return (
    <div>
      <h1 className="text-4xl text-center">👨‍🚀🛰️👽</h1>
      <h1 className="text-4xl">Witaj zewnętrzny przyszu z kosmosu </h1>
      <h1 className="text-2xl">{title}</h1>
      <h1>Title: {title}</h1>
      <div>ID: {id}</div>
      <div>Body: {body}</div>
      <div>{createdAt}</div>
      <hr />
      <Link href={"/infinite"} className="bg-zinc-500">
        Infinite list
      </Link>
    </div>
  );
}
