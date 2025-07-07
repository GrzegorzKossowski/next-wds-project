import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
import { courseTable } from "./course.schema";
import { relations } from "drizzle-orm";
import { lessonTable } from "./lesson.schema";

export const sectionStatuses = ["public", "private"] as const;
export type SectionStatusType = (typeof sectionStatuses)[number];
export const sectionStatusEnum = pgEnum("section_status", sectionStatuses);

export const sectionTable = pgTable("sections", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  status: sectionStatusEnum().notNull().default("private"),
  order: integer().notNull(),
  courseId: uuid()
    .notNull()
    .references(() => courseTable.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const SectionRelationship = relations(sectionTable, ({ one, many }) => ({
  // relacja do tabeli course
  course: one(courseTable, {
    // z tej tabeli, pola courseId
    fields: [sectionTable.courseId],
    // do tabeli coruse, do pola id
    references: [courseTable.id],
  }),
  lessons: many(lessonTable),
}));
