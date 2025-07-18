import { pollsTable } from "@/drizzle/schema";
import { baseProcedure, createTRPCRouter } from "../init.";
import { z } from "zod";
import { db } from "@/drizzle/db";
import { desc, eq } from "drizzle-orm";

export const pollsRouter = createTRPCRouter({
  getPolls: baseProcedure.query(async () => {
    const data = await db.query.pollsTable.findMany({
      orderBy: [desc(pollsTable.createdAt)],
      with: { options: true },
    });
    return data;
  }),
  getLastPoll: baseProcedure.query(async () => {
    const [poll] = await db.query.pollsTable.findMany({
      orderBy: [desc(pollsTable.createdAt)],
      limit: 1,
      with: {
        options: true,
      },
    });
    return poll || {};
  }),
  getPollById: baseProcedure
    .input(z.number().min(1).max(100))
    .query(async ({ input }) => {
      const poll = await db.query.pollsTable.findFirst({
        where: eq(pollsTable.id, input),
        with: {
          options: true,
        },
      });

      return poll;
    }),
});
