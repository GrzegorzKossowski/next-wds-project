"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { CircleArrowLeftIcon } from "lucide-react";
import GramLoader from "@/app/loader/GramLoader";

export default function PostElement({ id }: { id: number }) {
  const router = useRouter();
  const { data, isPending } = trpc.posts.getPostById.useQuery(id);

  if (isPending)
    return (
      <>
        <GramLoader />
      </>
    );
  if (data && "error" in data) return <>Error...</>;

  return (
    <div>
      <div className="my-2">
        <button onClick={() => router.back()}>
          <CircleArrowLeftIcon size={"30"} />
        </button>
      </div>
      <h1 className="text-4xl mb-4">Fajnie, że wciąż z nami 🧻</h1>
      <p>
        wciąż, ponieważ nastąpiło przekierowanie z listy postów. W przypadku
        odświeżenia (F5) lub linku zewnętrznego, user trafia na inną stronę,
        choć z tymi samymi danymi (przez id posta)
      </p>
      <div className="border border-amber-300 m-4 p-4">
        <h4 className="text-xl my-4">Title: {data?.title}</h4>
        <div className="mb-4">ID: {data?.id}</div>
        <div className="mb-4">Body: {data?.body}</div>
        <div className="mb-4">createdAt: {data?.createdAt}</div>
      </div>
      <hr />
      <div className="my-2">
        <button onClick={() => router.back()}>
          <CircleArrowLeftIcon size={"30"} />
        </button>
      </div>
    </div>
  );
}
