import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
import { userTable } from "./user.schema";
import { productTable } from "./product.schema";
import { relations } from "drizzle-orm";

export const purchaseTable = pgTable("purchases", {
  id: uuid().primaryKey().defaultRandom(),
  pricePaidInCents: integer().notNull(),
  productDetails: jsonb()
    .notNull()
    .$type<{ name: string; description: string; imageUrl: string }>(),
  userId: uuid()
    .notNull()
    .references(() => userTable.id, { onDelete: "restrict" }),
  productId: uuid()
    .notNull()
    .references(() => productTable.id, { onDelete: "restrict" }),
  stripeSessionId: text().notNull().unique(),
  refundedAt: timestamp({ withTimezone: true }),
  ...timestamps,
});

export const PurchaseRelationships = relations(purchaseTable, ({ one }) => ({
  user: one(userTable, {
    fields: [purchaseTable.userId],
    references: [userTable.id],
  }),
  product: one(productTable, {
    fields: [purchaseTable.productId],
    references: [productTable.id],
  }),
}));
