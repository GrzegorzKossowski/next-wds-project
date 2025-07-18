import Link from "next/link";
import React from "react";
import SignUpForm from "./sign-up-form";

export default function SignUpPage() {
  return (
    <>
      <div>
        <Link href={"/"} className="bg-zinc-500 mb-3">
          Home
        </Link>
      </div>
      <h2 className="text-2xl">Register Page</h2>

      <SignUpForm />
      <div className="my-4">
        <Link
          href={"/sign-in"}
          className="border-b-blue-600 border-b text-blue-500"
        >
          Masz konto?{" "}
        </Link>
      </div>
    </>
  );
}
