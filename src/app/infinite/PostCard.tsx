import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../_components/ui/card";
import { SelectPostTableRow } from "@/drizzle/schema";

export const PostCard = ({ post }: { post: SelectPostTableRow }) => {
  const { id, body, title } = post;
  return (
    <Link href={`/infinite/${id}`}>
      <Card className="mb-4">
        <CardTitle className="mx-5">{title}</CardTitle>
        <CardContent>{body}</CardContent>
        <CardFooter className="flex justify-end">
          <span className="bg-red-500 text-white px-3 font-extrabold rounded-[999px] min-w-[100px] text-center">
            {id}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};
