import NextAuth, { type User } from "next-auth";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { db } from "../drizzle/db";

export const BASE_PATH = "/api/auth"

export const { auth, handlers, signIn, signOut } = NextAuth({
  // adapter wymaga tabel user i session w DB
  // adapter: DrizzleAdapter(db),
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
        username: { label: "Username", type: "text", placeholder: "username" },
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
            userName: "test1",
            name: "Test 1",
            password: "pass",
            email: "test1@donotreply.com",
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
            user.userName === credentials.username &&
            user.password === credentials.password
        );
        return user
          ? { id: user.id, name: user.name, email: user.email }
          : null;
      },
    }),
  ],
});
