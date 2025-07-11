# Infinite scroll

## entry point (page.tsx)

```tsx
/// https://github.com/rajeshdavidbabu/infinite-scroll-server-actions/blob/master/src/app/page.tsx

import { PostList } from "@/components/posts/PostList";
import { MorePosts } from "@/components/posts/MorePosts";
import { POST_PER_PAGE } from "@/config/constants";
import { getPosts } from "@/lib/actions";

export default async function Home() {
  const initialPosts = await getPosts(0, POST_PER_PAGE);

  if (!initialPosts) return <>No posts</>;

  return (
    <div className="flex flex-col space-y-4 border border-yellow-500 p-4">
      <PostList posts={initialPosts} />
      <MorePosts />
    </div>
  );
}
```

## PostList component

```tsx
"use client";
import { TPost } from "@/types";
import { PostCard } from "./PostCard";

export const PostList = ({ posts }: { posts: TPost[] }) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post.id} className="mb-3">
            <PostCard post={post}/>
          </div>
        ))}
    </>
  );
};
```

## PostCard

```tsx
import { TPost } from "@/types";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";

export const PostCard = ({ post }: { post: TPost }) => {
  const { author_name, short_news, publish_date } = post;
  return (
    <Card className="w-[560px]">
      <CardTitle className="mx-5">{author_name}</CardTitle>
      <CardContent>{short_news}</CardContent>
      <CardFooter>{publish_date}</CardFooter>
    </Card>
  );
};
```

## MorePosts component

```tsx
"use client";
import { POST_PER_PAGE } from "@/config/constants";
import { TPost } from "@/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PostList } from "./PostList";
import { getPosts } from "@/lib/actions";

export const MorePosts = () => {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<TPost[]>([]);
  const [currentOffset, setCurrentOffset] = useState<number>(POST_PER_PAGE);

  useEffect(() => {
    if (inView) {
      (async () => {
        const newPosts = await getPosts(currentOffset, POST_PER_PAGE);
        setPosts((prev) => [...prev, ...newPosts]);
        setCurrentOffset((prev) => prev + POST_PER_PAGE);
      })();
    }
  }, [inView, currentOffset]);

  return (
    <>
      <PostList posts={posts} />
      <div ref={ref} />
    </>
  );
};
```

## TPost type

```ts
export type TPost = {
  id: string;
  author_name: string;
  short_news: string;
  publish_date: string;
};
```

## server_actions

```tsx
import { API_URL } from "@/config/constants";
import { TPost } from "@/types";

export const getPosts = async (offset: number, limit: number) => {
  // const skip = (offset - 1) * limit;
  const url = `${API_URL}?_start=${offset}&_limit=${limit}&_sort=publish_date&_order=asc`;
  try {
    const response = await fetch(url);
    const data = (await response.json()) as TPost[];
    if (!response.ok) {
      console.error("sth went wrong");
    }
    return data;
  } catch (error: unknown) {
    console.error(error);
  }
  return [];
};
```

## constants

```ts
// json-server
export const API_URL = "http://localhost:4000/posts";
export const POST_PER_PAGE = 8;
```

## json-server data (db.json)

Run server: `// npx json-server -p 4000 db.json`

```json
{
  "posts": [
    {
      "id": "d5a381d2-f4c1-4779-9673-a540cff5df90",
      "author_name": "Roxie Itskovitz",
      "short_news": "In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
      "publish_date": "2020-07-09 08:39:27"
    },
    {
      "id": "92fb5966-39e8-4497-ac95-2fa78753a358",
      "author_name": "Idalia Priscott",
      "short_news": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      "publish_date": "2021-04-24 05:53:54"
    }
  ]
//   ....
}
```
