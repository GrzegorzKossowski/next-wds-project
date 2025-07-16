import { auth } from "@/auth";
import ThemeSwitch from "./_components/ThemeSwitch";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4 m-5">
        <ThemeSwitch />
        <div>{session && JSON.stringify(session, null, 2)}</div>
      </div>
      <div>
        {session ? (
          <LogoutButton />
        ) : (
          <Link href={"/sign-in"} className="border p-1 bg-zinc-500">
            Login
          </Link>
        )}
        {session && <Link href={"/dashboard"}>Private dashboard</Link>}
        <Link href={"/parallels"} className="bg-zinc-500/30 p-2 m-2">
          Parallels
        </Link>
        <Link href={"/infinite"} className="bg-zinc-500/30 p-2 m-2">
          Infinite Scroll
        </Link>
      </div>
    </div>
  );
}
