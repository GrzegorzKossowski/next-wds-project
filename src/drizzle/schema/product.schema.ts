import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
import { relations } from "drizzle-orm";
import { courseToProductTable } from "./courseToProduct.schema";

export const productStatuses = ["public", "private"] as const;
export type ProductStatusType = (typeof productStatuses)[number];
export const productStatusEnum = pgEnum("product_status", productStatuses);

export const productTable = pgTable("products", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text().notNull(),
  priceInDollars: integer().notNull(),
  status: productStatusEnum().notNull().default("private"),
  ...timestamps,
});

export const ProductRelationships = relations(productTable, ({ many }) => ({
  courseProducts: many(courseToProductTable),
}));
