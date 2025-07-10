import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import NextAuth, { type User } from "next-auth";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { userTable } from "@/drizzle/schema";
// import { accountsTable } from "@/drizzle/schema/accounts.schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

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
    // expires
    maxAge: 5, // sec
  },
  jwt: {
    // expires
    maxAge: 5, // sec
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },

  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // GitHub,
    // Google,
    Credentials({
      credentials: {
        // email: { label: "Email", type: "text", placeholder: "john@doe.com" },
        // password: {
        //   label: "Password",
        //   type: "password",
        //   placeholder: "password",
        // },
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<User | null> {
        // Pobierz użytkownika z bazy danych po emailu
        const dbUsers = await db
          .select()
          .from(userTable)
          .where(eq(userTable.email, credentials.email as string))
          .limit(1);
        const user = dbUsers[0];

        if (!user) return null;

        // Porównaj hasło z zahashowanym hasłem w bazie
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) return null;

        // Zwróć dane użytkownika zgodne z typem `User`
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-up",
    error: "/error",
  },
});
