import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";
import { lessonTable } from "./lesson.schema";
import { timestamps } from "./columns.helpers";
import { relations } from "drizzle-orm";

export const userToLessonCompleteTable = pgTable(
  "user_to_lesson_complete",
  {
    userId: uuid()
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    lessonId: uuid()
      .notNull()
      .references(() => lessonTable.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.userId, t.lessonId] })]
);

export const UserLessonCompleteRelationships = relations(
  userToLessonCompleteTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [userToLessonCompleteTable.userId],
      references: [userTable.id],
    }),
    lesson: one(lessonTable, {
      fields: [userToLessonCompleteTable.lessonId],
      references: [lessonTable.id],
    }),
  })
);
