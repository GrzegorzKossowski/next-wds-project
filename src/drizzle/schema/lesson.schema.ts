import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { sectionTable } from "./section.schema";
import { relations } from "drizzle-orm";
import { userToLessonCompleteTable } from "./userLessonComplete.schema";
import { timestamps } from "./columns.helpers";

export const lessonStatuses = ["public", "private", "preview"] as const;
export type LessonStatusType = (typeof lessonStatuses)[number];
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatuses);

export const lessonTable = pgTable("lessons", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  youtubeVideoId: text().notNull(),
  order: integer().notNull(),
  status: lessonStatusEnum().notNull().default("private"),
  sectionId: uuid()
    .notNull()
    .references(() => sectionTable.id, { onDelete: "cascade" }),
    ...timestamps
});

export const LessonRelationships = relations(lessonTable, ({ one, many }) => ({
  section: one(sectionTable, {
    fields: [lessonTable.sectionId],
    references: [sectionTable.id],
  }),
  userToLessonsComplete: many(userToLessonCompleteTable),
}));
