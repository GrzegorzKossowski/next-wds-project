import { trpc } from "@/trpc/server";
import { ListIcon, StepBackIcon } from "lucide-react";
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
    <div className="m-4">
      <div>infinite page here</div>
      <h1 className="text-4xl mb-4">Witaj zewnętrzny przyszu z kosmosu</h1>
      <h2 className="text-2xl text-center">👨‍🚀🛰️👽</h2>
      <p>
        uwaga: powrót na listę postów przy wizycie z zewnętrznego linku lub po
        F5 prowadzi do świeżej listy, co naturalne dla przychodzących ze świata
        (oni nie byli na infinite scroll), a nie do zapamiętanego wcześniej
        scrolla dla scrollujących
      </p>

      <div className="border border-amber-300 m-4 p-4">
        <h4 className="text-xl my-4">Title: {title}</h4>
        <div className="mb-4">ID: {id}</div>
        <div className="mb-4">Body: {body}</div>
        <div className="mb-4">createdAt: {createdAt}</div>
      </div>

      <Link href={"/infinite"} className="bg-zinc-500 flex w-fit p-1 gap-2">
        <StepBackIcon /> Infinite list <ListIcon />
      </Link>
    </div>
  );
}
