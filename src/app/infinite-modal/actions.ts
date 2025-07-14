import { db } from "@/drizzle/db";
import { postTable } from "@/drizzle/schema";
import { asc } from "drizzle-orm";

export const getPosts = async (offset: number, limit: number) => {
  try {
    const data = await db
      .select()
      .from(postTable)
      .orderBy(asc(postTable.createdAt)) // ← sortowanie po `publish_date`
      .limit(limit)
      .offset(offset); // ← offset działa dokładnie tak jak w SQL

    return data;
  } catch (error) {
    console.error("❌ Błąd pobierania postów z bazy:", error);
    return [];
  }
};
