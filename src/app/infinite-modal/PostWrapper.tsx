"use client";
import { POST_PER_PAGE } from "@/config/constants";
import { trpc } from "@/trpc/client";
import React from "react";
import PostList from "./PostList";
import MorePosts from "./MorePosts";

export default function PostWrapper() {
  const { data, isLoading } = trpc.getPosts.useQuery({
    limit: POST_PER_PAGE,
    offset: 0,
  });
  if (isLoading) return <>Loading...</>;
  return (
    <div>
      <PostList posts={data || []} />
      <MorePosts />
    </div>
  );
}
