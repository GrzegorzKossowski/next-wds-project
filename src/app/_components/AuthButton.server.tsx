import { auth, BASE_PATH } from "@/auth";
import { SessionProvider } from "next-auth/react";
import React from "react";
import AuthButtonClient from "./AuthButton.client";

export default async function AuthButtonServer() {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }
  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}
