import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
import { relations } from "drizzle-orm";
import { courseToSectionTable } from "./courseToSection.schema";
import { userToCourseAccessTable } from "./userToCourse_access.schema";
import { courseToProductTable } from "./courseToProduct.schema";

export const courseTable = pgTable("courses", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text().notNull(),
  ...timestamps,
});

export const CourseRelationships = relations(courseTable, ({ many }) => ({
  courseToProduct: many(courseToProductTable),
  courseToSection: many(courseToSectionTable),
  userToCourseAccess: many(userToCourseAccessTable),
}));
