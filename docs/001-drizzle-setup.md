# Drizzle setup

Setup bazy:

1. ustaw połączenie z bazą

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

2. ustaw przykładowy schemat

```ts
// index.ts
export { testSchema } from "@/drizzle/schema/test.schema";
```

```ts
// testowy schemat tableli test
// src/drizzle/test.schema.ts
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const testSchema = pgTable("test", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 255 }).notNull(),
  ...timestamps,
});

// dodaj helper do znaczników czasowych
// src/drizzle/columns.helpers.ts
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

3. eksportuj schemat

```ts
export * from "./test.schema";
```

4. generuj i migruj bazę

```bash
$ npx drizzle-kit generate

$ npx drizzle-kit migrate

$ npx drizzle-kit studio

```
