// https://authjs.dev/guides/pages/signin
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default function SignInPage() {
  return (
    <>
      <div>Login Page</div>
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", {
              redirectTo: "/",
              ...Object.fromEntries(formData),
            });
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`/error?error=${error.type}`);
            }
            throw error;
          }
        }}
        className="flex flex-col space-y-2 w-[350px]"
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
        <input type="submit" value="Sign In" />
      </form>
    </>
  );
}
