// https://authjs.dev/guides/pages/signin
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function SignInPage() {
  return (
    <>
      <div>
        <Link href={"/"} className="bg-zinc-500 mb-3">
          Home
        </Link>
      </div>
      <h2 className="text-2xl mb-4">Login Page</h2>
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
        className="flex flex-col space-y-2 w-[350px] p-4 border"
      >
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          defaultValue={"john@doe.com"}
          className="bg-zinc-400/30"
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          defaultValue={"123456"}
          className="bg-zinc-400/30"
        />
        <input type="submit" value="Sign In" className="bg-zinc-500 my-2" />
        <div>
          <small>uwaga, sesja trwa 10 sec.</small>
        </div>
      </form>
      <div>
        <Link
          href={"/sign-up"}
          className="border-b-blue-600 border-b text-blue-500"
        >
          {" "}
          Jesteś nowy?{" "}
        </Link>
      </div>
    </>
  );
}
