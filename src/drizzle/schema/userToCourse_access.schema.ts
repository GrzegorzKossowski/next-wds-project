import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";
import { courseTable } from "./course.schema";
import { timestamps } from "./columns.helpers";
import { relations } from "drizzle-orm";

export const userToCourseAccessTable = pgTable(
  "users_to_courses_access",
  {
    userId: uuid()
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    courseId: uuid()
      .notNull()
      .references(() => courseTable.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.userId, t.courseId] })]
);

export const UserCourseAccessRelationships = relations(
  userToCourseAccessTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [userToCourseAccessTable.userId],
      references: [userTable.id],
    }),
    course: one(courseTable, {
      fields: [userToCourseAccessTable.courseId],
      references: [courseTable.id],
    }),
  })
);
