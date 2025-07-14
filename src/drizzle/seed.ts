import { data } from "./data";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { postTable, userTable } from "./schema";
import bcrypt from "bcrypt";

async function seed() {
  try {
    // await db.execute(sql`DROP SCHEMA public CASCADE`);
    // await db.execute(sql`CREATE SCHEMA public`);
    // console.log("✅ Schemat public został usunięty.");

    await db.execute(sql`TRUNCATE TABLE ${userTable} RESTART IDENTITY CASCADE`);
    const password = await bcrypt.hash("123456", 10);
    await db.insert(userTable).values({
      name: "John Doe",
      email: "john@doe.com",
      password,
    });
    
    await db.execute(sql`TRUNCATE TABLE ${postTable} RESTART IDENTITY CASCADE`);
    await db.insert(postTable).values(data);
    console.log("✅ Dane zostały zseedowane.");
  } catch (err) {
    console.error("❌ Błąd seedowania:", err);
  }
}

seed();
