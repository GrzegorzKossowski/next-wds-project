"use server";
import { signIn as naSignIn, signOut as naSignOut } from "./index";

// export auth functions as server actions

export async function signIn() {
  await naSignIn();
}

export async function signOut() {
  await naSignOut();
}
