import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../_components/ui/card";
import { SelectPostTableRow } from "@/drizzle/schema";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import GramLoader from "../loader/GramLoader";

export const PostCard = ({
  post,
}: {
  post: Omit<SelectPostTableRow, "createdAt" | "updatedAt">;
}) => {
  const { id, body, title } = post;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(
    (id: number) => {
      if (isLoading) return;
      setIsLoading(true);
      router.push(`/infinite/${id}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );

  return (
    <Card
      onClick={() => handleClick(id)}
      className="relative cursor-pointer overflow-hidden"
    >
      <CardTitle className="mx-5">{title}</CardTitle>
      <CardContent>{body}</CardContent>
      <CardFooter className="flex justify-end">
        <span className="bg-red-500 text-white px-3 font-extrabold rounded-[999px] min-w-[100px] text-center">
          {id}
        </span>
      </CardFooter>
      {isLoading && (
        <div className="absolute inset-0 bg-foreground/80 flex items-center justify-center overflow-hidden">
          <GramLoader />
        </div>
      )}
    </Card>
  );
};
