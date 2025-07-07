import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull()
    // run javascript function on every update => change date to now()
    .$onUpdate(() => new Date()),
};

