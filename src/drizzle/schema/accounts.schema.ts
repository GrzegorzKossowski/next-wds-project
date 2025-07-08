import { integer, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";
import { AdapterAccountType } from "next-auth/adapters";

export const accountsTable = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);
