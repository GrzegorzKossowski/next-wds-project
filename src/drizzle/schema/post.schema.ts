import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export type SelectPostTableRow = typeof postTable.$inferSelect;
export type InsertPostTableRow = typeof postTable.$inferInsert;

export const postTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  ...timestamps,
});
