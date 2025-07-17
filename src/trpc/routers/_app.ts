import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init.";
import { postTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { format } from "date-fns";

export const appRouter = createTRPCRouter({
  getInfinitePosts: baseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().optional(), // offset jako "cursor"
      })
    )
    .query(async ({ input }) => {
      const { limit, cursor = 0 } = input;

      const data = await db
        .select({
          id: postTable.id,
          title: postTable.title,
          body: postTable.body,
        })
        .from(postTable)
        .limit(limit)
        .offset(cursor);

      const nextCursor = data.length === limit ? cursor + limit : undefined;

      return {
        posts: data,
        nextCursor,
      };
    }),
  getPostById: baseProcedure
    .input(z.number().min(1).max(100))
    .query(async ({ input }) => {
      const data = await db
        .select({
          id: postTable.id,
          title: postTable.title,
          body: postTable.body,
          createdAt: postTable.createdAt,
        })
        .from(postTable)
        .where(eq(postTable.id, input))
        .limit(1);
      if (!data) return { error: "Brak postu" };
      const formatedCreatedAt = format(data[0].createdAt, "yyyy-MM-dd HH:mm");
      return { ...data[0], createdAt: formatedCreatedAt };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
