"use client";
import { POST_PER_PAGE } from "@/config/constants";
import { trpc } from "@/trpc/client";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PostCard } from "./PostCard";
import GramLoader from "../loader/GramLoader";

export default function PostWrapper() {
  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = trpc.posts.getInfinitePosts.useInfiniteQuery(
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

  // 🛠 STAN 1: Początkowe ładowanie
  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <GramLoader />
        <div className="text-center text-xl text-gray-600 animate-pulse">
          ⏳ Trwa ładowanie postów...
        </div>
      </div>
    );
  }

  // 🛠 STAN 2: Błąd
  if (isError) {
    return (
      <div className="text-center py-10 text-xl text-red-600">
        ❌ Wystąpił błąd podczas ładowania postów.
      </div>
    );
  }

  // 🛠 STAN 3: Brak danych
  if (posts.length === 0) {
    return (
      <div className="text-center py-10 text-xl text-gray-500">
        😕 Brak dostępnych postów.
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="space-y-6">
        <h3 className="text-xl">Posty</h3>
        <p>kliknięcie posta przekierowuje na stronę konkretnego posta</p>
        <div className="relative grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
        <div ref={ref} />
        {/* 🛠 STAN 4: Dociąganie kolejnych postów */}
        {isFetchingNextPage && (
          <p className="text-center text-yellow-500 py-4 animate-pulse h-[100px] bg-pink-500 mb-7">
            ⏬ Ładowanie kolejnych postów...
          </p>
        )}
        {/* 🛠 STAN 5: Koniec listy */}
        {!hasNextPage && (
          <div className="w-full h-[300px] bg-amber-300 text-2xl flex justify-center items-center text-red-600 font-black">
            🎉 Nic więcej nie ma...
          </div>
        )}
      </div>
    </div>
  );
}
