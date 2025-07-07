import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const TestSchema = pgTable('test', {
id: serial('id').primaryKey(),
label: varchar('label', {length: 255}).notNull(),
...timestamps
})