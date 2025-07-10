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
