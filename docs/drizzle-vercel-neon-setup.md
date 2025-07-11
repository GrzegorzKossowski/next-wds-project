# Drizzle Vercel Neon DB setup

## instalacja

```bash
npm i drizzle-orm @neondatabase/serverless dotenv
npm i -D drizzle-kit tsx

```

```bash
# .env
# Recommended for most uses
DATABASE_URL=postgres://neondb_owner:npg_xxxxxxxxxxx@ep-rapid-glade-xxxxxxxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

## drizzle.config.ts

```ts
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env file");
}

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema",
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Wyświetla monit o potwierdzenie uruchomienia wydrukowanych instrukcji SQL podczas uruchamiania 'drizzle-kit push'.
  strict: true,
  // Wyświetla wszystkie polecenia SQL podczas drizzle-kit push.
  verbose: true,
});
```

## db.ts

```ts
// src/drizzle/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema/index";

config({ path: ".env" }); // or .env.local

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
```

## Schemas

```ts
// src/drizzle/schema/index.ts
export * from "./user.schema";
```

```ts
// src/drizzle/schema/user.schema.ts
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
// import { relations } from "drizzle-orm";
// import { userToCourseAccessTable } from "./userToCourse_access.schema";

export const userRoles = ["user", "admin"] as const;
export type UserRoleType = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);

export type SelectUserTableRow = typeof userTable.$inferSelect;
export type InsertUserTableRow = typeof userTable.$inferInsert;

export const userTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull(),
  emailVerified: timestamp({ withTimezone: true }),
  name: text().notNull(),
  password: varchar("password").notNull(),
  role: userRoleEnum().notNull().default("user"),
  image: text(),
  deletedAt: timestamp({ withTimezone: true }),
  ...timestamps,
});

// export const UserRelationship = relations(userTable, ({ many }) => ({
//   userToCourseAccess: many(userToCourseAccessTable),
// }));
```

```ts
// src/drizzle/schema/collumn.helpers.ts
import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull()
    // run javascript function on every update => change date to now()
    .$onUpdate(() => new Date()),
};
```
