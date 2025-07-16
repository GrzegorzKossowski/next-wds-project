"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";

export default function PostElement({ id }: { id: number }) {
  const router = useRouter();
  const { data, isFetching, isLoading, isPending } =
    trpc.getPostById.useQuery(id);

  if (isPending) return <>isPending....</>;
  if (isLoading) return <>isLoading....</>;
  if (isFetching) return <>isFetching....</>;

  return (
    <div>
      <h1>Title: {data?.title}</h1>
      <div>ID: {data?.id}</div>
      <div>Body: {data?.body}</div>
      <div>{data?.createdAt.getDay()}</div>
      <hr />
      <button onClick={() => router.back()}>Zamknij</button>
    </div>
  );
}
