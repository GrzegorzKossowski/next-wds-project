// app/actions/registerUser.ts
"use server";

import { db } from "@/drizzle/db";
import { InsertUserTableRow, userTable } from "@/drizzle/schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    return { success: false, error: "Brak wymaganych danych." };
  }

  const existingUsers = await db
    .select()
    .from(userTable)
    .where(or(eq(userTable.email, email), eq(userTable.name, name)))
    .limit(1);

  if (existingUsers.length > 0) {
    return { success: false, error: "Użytkownik już istnieje." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: InsertUserTableRow = {
    name,
    email,
    password: hashedPassword,
  };

  await db.insert(userTable).values(newUser);

  return { success: true };
}
