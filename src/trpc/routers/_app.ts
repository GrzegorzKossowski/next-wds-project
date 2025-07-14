import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init.";
import { postTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

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
        .select()
        .from(postTable)
        .limit(limit)
        .offset(cursor);

      const nextCursor = data.length === limit ? cursor + limit : undefined;

      return {
        posts: data,
        nextCursor,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
