"use client";
import { trpc } from "@/trpc/client";
import React from "react";
import GramLoader from "../loader/GramLoader";
import { format } from "date-fns";
import Link from "next/link";

export default function LastPoll({ label }: { label?: string }) {
  const { data, isLoading } = trpc.polls.getLastPoll.useQuery();

  if (isLoading)
    return (
      <>
        <GramLoader />
      </>
    );

  let timestamp;
  if (data?.createdAt) timestamp = format(data.createdAt, "yyyy-MM-dd, HH:mm");

  return (
    <div className="border border-amber-400 w-fit p-3">
      <h3 className="text-xl mb-4">{label} Poll</h3>
      <div className="text-right w-full">
        <small>{timestamp}</small>
      </div>
      <div className="text-pink-700">Q: {data?.question}</div>
      <hr className="mb-3" />
      {data?.options.map((option) => {
        return (
          <div key={option.id} className="flex">
            <div className="pr-2">o {option.text}</div>
            <div className="ml-auto">{option.voteCount}</div>
          </div>
        );
      })}
      <hr />
      <div className="text-right w-full">
        <small>
          <Link href={"/polls"} className="text-blue-600">
            Więcej takich...
          </Link>
        </small>
      </div>
    </div>
  );
}
