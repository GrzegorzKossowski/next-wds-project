"use server";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";

import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";
import { createCallerFactory, createTRPCContext } from "./init.";
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient
);
