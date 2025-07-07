import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { courseTable } from "./course.schema";
import { timestamps } from "./columns.helpers";
// import { lessonTable } from "./lesson.schema";

export const courseSectionStatuses = ["public", "private"] as const;
export type CourseSectionStatus = (typeof courseSectionStatuses)[number];
export const courseSectionStatusEnum = pgEnum(
  "course_section_status",
  courseSectionStatuses
);

export const courseToSectionTable = pgTable("courses_to_sections", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  status: courseSectionStatusEnum().notNull().default("private"),
  order: integer().notNull(),
  courseId: uuid()
    .notNull()
    .references(() => courseTable.id, { onDelete: "cascade" }),
  ...timestamps,
});

// relacja 1:1 => [Courses] 1 : 1 [CoursesSections] 1 : 1 [Sections]
export const CourseToSectionTableRelationships = relations(
  courseToSectionTable,
  ({ one }) => ({
    course: one(courseTable, {
      // dla pól/pola courseId z bieżącej tabeli...
      fields: [courseToSectionTable.courseId],
      // ...przypisz referencję do pola id z tabeli courseTable
      references: [courseTable.id],
    }),
    // lessons: many(lessonTable),
  })
);
