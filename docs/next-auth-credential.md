# NextAuth Auth v5 Credentials

Uwaga: wersja bez providerów [google, github, itp], bez DB, jedynie własne formularze logowania, dane tylko uzerów (credentials)

## Auth setup

```ts
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
    maxAge: 10, // sec
    updateAge: 10, // odśwież token po X aktywności
  },
  jwt: {
    maxAge: 10, // sec
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
```

## Login (Sign-in)

```tsx
// src/app/(auth)/sign-in/page.tsx
// https://authjs.dev/guides/pages/signin
import React from "react";
import Link from "next/link";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default function SignInPage() {
  return (
    <>
      <div>Login Page</div>
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", {
              redirectTo: "/dashboard",
              ...Object.fromEntries(formData),
            });
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`/error?error=${error.type}`);
            }
            throw error;
          }
        }}
      >
        <input name="email" id="email" defaultValue={"john@doe.com"} />
        <input
          name="password"
          id="password"
          type="password"
          defaultValue={"123456"}
          className="bg-zinc-400/30"
        />
        <input type="submit" value="Sign In" />
      </form>
      <div>
        <Link href={"/sign-up"}> Jesteś nowy? </Link>
      </div>
    </>
  );
}
```


## Register (Sign-up)

```tsx
// src\app\(auth)\sign-in\page.tsx
// server page
import Link from "next/link";
import React from "react";
import SignUpForm from "./sign-up-form";

export default function SignUpPage() {
  return (
    <>
      <div>Register Page</div>
      <SignUpForm />
      <div className="my-4">
        <Link href={"/sign-in"}>Masz konto? </Link>
      </div>
    </>
  );
}
```

```tsx
// src\app\(auth)\sign-up\sign-up-form.tsx
"use client";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { registerUser } from "./actions";
import { toast } from "sonner";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await registerUser(formState);

      if (result.success) {
        toast.success("Konto utworzone! Możesz się zalogować.");
        router.push("/sign-in");
      } else {
        toast.error(result.error || "Coś poszło nie tak.");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col w-[350px] space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Imię"
          onChange={handleChange}
          value={formState.name}
          className="w-full bg-zinc-500/30"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formState.email}
          className="w-full bg-zinc-500/30"
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          onChange={handleChange}
          value={formState.password}
          className="w-full bg-zinc-500/30"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-orange-400/30 text-white px-4 py-2 rounded"
        >
          {isPending ? "Rejestruję..." : "Zarejestruj się"}
        </button>
      </form>
    </>
  );
}

```


```tsx
// src\app\(auth)\sign-up\actions.ts
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
```

## Private page

```tsx
// src\app\(private)\dashboard\page.tsx
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { RefreshSessionButton } from "./ExpireSession";

export default async function page() {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <div>
      <div>Private page this is</div>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>{session && JSON.stringify(session, null, 2)}</div>
      <RefreshSessionButton />
    </div>
  );
}
```

## Expire session

Serwer odświeża sesję kiedy wykonuje getSession().

```tsx
"use client";
import { getSession } from "next-auth/react";
import { toast } from "sonner";

export function RefreshSessionButton() {
  const refresh = async () => {
    const session = await getSession();
    if (session) {
      toast.success("Sesja odświeżona!");
    } else {
      toast.error("Sesja wygasła.");
    }
  };

  return (
    <button onClick={refresh} className="text-blue-500 underline">
      Odśwież sesję
    </button>
  );
}
```