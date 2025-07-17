import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
import { relations } from "drizzle-orm";

export const pollsTable = pgTable("polls", {
  id: serial("id").primaryKey(),
  question: varchar("title", { length: 512 }).notNull().unique(), // treść pytania
  ...timestamps,
});

export const pollOptionsTable = pgTable("poll_options", {
  id: serial("id").primaryKey(),
  pollId: integer("poll_id")
    .notNull()
    .references(() => pollsTable.id, { onDelete: "cascade" }),
  text: varchar("text", { length: 255 }).notNull(), // treść opcji, np. "Tak", "Nie"
  voteCount: integer("vote_count").default(0).notNull(), // liczba głosów
  ...timestamps,
});

// Relacje między tabelami (opcjonalne, dla Drizzle ORM typu relational)
export const pollsRelations = relations(pollsTable, ({ many }) => ({
  options: many(pollOptionsTable),
}));

export const pollOptionsTableRelations = relations(pollOptionsTable, ({ one }) => ({
  poll: one(pollsTable, {
    fields: [pollOptionsTable.pollId],
    references: [pollsTable.id],
  }),
}));
