import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
import { relations } from "drizzle-orm";
import { userToCourseAccessTable } from "./userToCourse_access.schema";

export const userRoles = ["user", "admin"] as const;
export type UserRoleType = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);

export const userTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  clerkUserId: text().notNull().unique(),
  email: text().notNull(),
  name: text().notNull(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  deletedAt: timestamp({ withTimezone: true }),
  ...timestamps,
});

export const UserRelationship = relations(userTable, ({ many }) => ({
  userToCourseAccess: many(userToCourseAccessTable),
}));
