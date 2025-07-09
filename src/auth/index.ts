import NextAuth, { type User } from "next-auth";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { db } from "../drizzle/db";
// import { userTable } from "@/drizzle/schema";
// import { accountsTable } from "@/drizzle/schema/accounts.schema";

export const BASE_PATH = "/api/auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // adapter wymaga tabel user i session w DB
  // adapter: DrizzleAdapter(db, {
  //   usersTable: userTable,
  //   accountsTable: accountsTable
  // }),
  // session zastępuje bazę tymczasową
  session: {
    strategy: "jwt",
  },
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // GitHub,
    // Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@doe.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials): Promise<User | null> {
        const users = [
          {
            id: "test-user-1",
            userName: "John Doe",
            name: "John Doe",
            password: "123456",
            email: "john@doe.com",
          },
          {
            id: "test-user-2",
            userName: "test2",
            name: "Test 2",
            password: "pass",
            email: "test2@donotreply.com",
          },
        ];
        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );
        return user
          ? { id: user.id, name: user.name, email: user.email }
          : null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-up",
    error: "/error",
  },
});
