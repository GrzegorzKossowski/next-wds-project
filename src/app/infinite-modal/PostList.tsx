import { SelectPostTableRow } from "@/drizzle/schema";
import { PostCard } from "./PostCard";
import Link from "next/link";

export default async function PostList({
  posts,
}: {
  posts: SelectPostTableRow[];
}) {
  return (
    <>
      {posts &&
        posts.map((post: SelectPostTableRow) => (
          <Link
            href={`/infinite-modal/${post.id}`}
            key={post.id}
            className="mb-3"
          >
            <PostCard post={post} />
          </Link>
        ))}
    </>
  );
}
