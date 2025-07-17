"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { CircleArrowLeftIcon } from "lucide-react";
import GramLoader from "@/app/loader/GramLoader";

export default function PostElement({ id }: { id: number }) {
  const router = useRouter();
  const { data, isPending } = trpc.getPostById.useQuery(id);

  if (isPending)
    return (
      <>
        <GramLoader />
      </>
    );
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
      <div className="w-full text-right">
        <button onClick={() => router.back()}>
          <CircleArrowLeftIcon size={"50"} />
        </button>
      </div>
    </div>
  );
}
