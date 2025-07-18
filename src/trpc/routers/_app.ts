import { createTRPCRouter } from "../init.";
import { lazy } from "@trpc/server";

export const appRouter = createTRPCRouter({
  posts: lazy(() => import("./posts.router").then((m) => m.postRouter)),
  polls: lazy(() => import("./polls.router").then((m) => m.pollsRouter)),
});
// export type definition of API
export type AppRouter = typeof appRouter;
