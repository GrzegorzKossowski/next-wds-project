"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";

export default function PostElement({ id }: { id: number }) {
  const router = useRouter();
  const { data, isPending } = trpc.getPostById.useQuery(id);

  if (isPending) return <>isPending....</>;
  if (data && "error" in data) return <>Error...</>;

  return (
    <div>
      <h1 className="text-4xl text-center mb-3">🧻</h1>
      <h1 className="text-4xl">Fajnie, że wciąż z nami</h1>
      <h1>Title: {data?.title}</h1>
      <div>ID: {data?.id}</div>
      <div>Body: {data?.body}</div>
      <div>{data?.createdAt}</div>
      <hr />
      <button onClick={() => router.back()}>Zamknij</button>
    </div>
  );
}
