"use client";
import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import { useInView } from "react-intersection-observer";
import { POST_PER_PAGE } from "@/config/constants";
import { SelectPostTableRow } from "@/drizzle/schema";
import { trpc } from "@/trpc/client";

export default function MorePosts() {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<SelectPostTableRow[]>([]);
  const [currentOffset, setCurrentOffset] = useState<number>(POST_PER_PAGE);

  useEffect(() => {
    if (inView) {
      const { data } = trpc.getPosts.useQuery({
        limit: POST_PER_PAGE,
        offset: currentOffset,
      });
      if (data) setPosts((prev) => [...prev, ...data]);
      setCurrentOffset((prev) => prev + POST_PER_PAGE);
    }
  }, [inView, currentOffset]);


  return (
    <>
      <PostList posts={posts} />
      <div ref={ref} />
    </>
  );
}
