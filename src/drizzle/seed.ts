import { data, pollSeedData } from "./data";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { pollOptionsTable, pollsTable, postTable, userTable } from "./schema";
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


    console.log(`🚽 Clearing Polls DATA`);
    // Czyszczenie tabel z sondami
    await db.execute(
      sql`TRUNCATE TABLE ${pollOptionsTable} RESTART IDENTITY CASCADE`
    );
    await db.execute(
      sql`TRUNCATE TABLE ${pollsTable} RESTART IDENTITY CASCADE`
    );

    console.log(`Seeding Polls DATA`);

    for (const pollData of pollSeedData) {
      const [poll] = await db
        .insert(pollsTable)
        .values({ question: pollData.title })
        .returning({ id: pollsTable.id });

      const options = pollData.options.map((text) => ({
        pollId: poll.id,
        text,
      }));

      await db.insert(pollOptionsTable).values(options);
    }

    // // Dodanie przykładowej sondy (jako pytanie)
    // const [poll] = await db
    //   .insert(pollsTable)
    //   .values({
    //     question: "Jaki język programowania lubisz najbardziej?",
    //   })
    //   .returning({ id: pollsTable.id });

    // // Dodanie 4 opcji do tej sondy
    // const insertedOptions = await db
    //   .insert(pollOptionsTable)
    //   .values([
    //     { pollId: poll.id, text: "JavaScript" },
    //     { pollId: poll.id, text: "Python" },
    //     { pollId: poll.id, text: "Rust" },
    //     { pollId: poll.id, text: "Go" },
    //   ])
    //   .returning({ id: pollOptionsTable.id });

    // console.log("insertedOptions", insertedOptions);

    console.log("✅ Dane zostały zseedowane.");
  } catch (err) {
    console.error("❌ Błąd seedowania:", err);
  }
}

seed();
