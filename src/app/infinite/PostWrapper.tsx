"use client";
import { POST_PER_PAGE } from "@/config/constants";
import { trpc } from "@/trpc/client";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PostCard } from "./PostCard";

export default function PostWrapper() {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.getInfinitePosts.useInfiniteQuery(
      { limit: POST_PER_PAGE },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }

    return () => {};
  }, [fetchNextPage, hasNextPage, inView]);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl">Posty</h1>
      <div className="grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
      <div ref={ref} />
      {isFetchingNextPage && <p>Ładowanie...</p>}
      {!hasNextPage && (
        <div className="w-full h-[300px] bg-amber-300 text-2xl flex justify-center items-center text-red-600 font-black">
          No more posts...
        </div>
      )}
    </div>
  );
}
