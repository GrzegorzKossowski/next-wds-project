import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { courseTable } from "./course.schema";
import { productTable } from "./product.schema";
import { timestamps } from "./columns.helpers";
import { relations } from "drizzle-orm";

export const courseToProductTable = pgTable(
  "courses_to_products",
  {
    courseId: uuid()
      .notNull()
      // nie pozwalaj na kasowanie Kursu będącego w jakimś Produkcie
      .references(() => courseTable.id, { onDelete: "restrict" }),
    productId: uuid()
      .notNull()
      // kasuj wszystko kaskadowo w tej tabeli (nie usuwa kursu, jedynie relację do niego)
      .references(() => productTable.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  // Dzięki złożonemu kluczowi głównemu (PRIMARY KEY (courseId, productId)), zapobiegamy duplikowaniu tej samej relacji.
  (t) => [primaryKey({ columns: [t.courseId, t.productId] })]
);

// relacja 1:1 => [Courses] 1 : 1 [CoursesProducts] 1 : 1 [Products]
export const CourseproductTableRelationships = relations(
  courseToProductTable,
  ({ one }) => ({
    course: one(courseTable, {
      // dla pól/pola courseId z bieżącej tabeli...
      fields: [courseToProductTable.courseId],
      // ...przypisz referencję do pola id z tabeli courseTable
      references: [courseTable.id],
    }),
    product: one(productTable, {
      // dla pól/pola productId z bieżącej tabeli...
      fields: [courseToProductTable.productId],
      // ...przypisz referencję do pola id z tabeli productTable
      references: [productTable.id],
    }),
  })
);
