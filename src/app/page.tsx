import { auth } from "@/auth";
import ThemeSwitch from "./_components/ThemeSwitch";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";
import LastPoll from "./polls/LastPoll";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col space-y-6 m-4">
      <div className="flex flex-row space-x-4">
        <div>
          <ThemeSwitch />
        </div>
        <div>- zmiana wersji kolorystycznej</div>
      </div>

      <div className="flex flex-row space-x-4">
        {session ? (
          <>
            <div>
              <LogoutButton />
            </div>
            <div>
              <div>button wylogowania użytkownika</div>
              <div>{JSON.stringify(session, null, 2)}</div>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link href={"/sign-in"} className="border p-1 bg-zinc-500">
                Login
              </Link>
            </div>
            <div>button logowania uzera</div>
          </>
        )}
      </div>

      {/* link o prywatnego dashboardu */}
      {session && (
        <div className="flex flex-row space-x-4">
          <div>
            <Link href={"/dashboard"}>Private dashboard</Link>
          </div>
          <div>link do prywatnego dashboardu zalogowanego usera</div>
        </div>
      )}

      {session && (
        <div className="flex flex-row space-x-4">
          <div>
            <Link href={"/dashboard"}>Private dashboard</Link>
          </div>
          <div>link do prywatnego dashboardu</div>
        </div>
      )}

      <div className="flex flex-row space-x-4">
        <div>
          <Link href={"/infinite"} className="bg-zinc-500/30 p-1">
            Infinite Scroll
          </Link>
        </div>
        <div>strona z infinite scroll i linkami do artykułów</div>
      </div>

      <div className="flex flex-row space-x-4">
        <div>
          <Link href={"/loader"} className="bg-zinc-500/30 p-2">
            Loader
          </Link>
        </div>
        <div>prosty loader css - [gram.pl]</div>
      </div>

      <div className="flex flex-row space-x-4">
        <div>
          <Link href={"/parallels"} className="bg-zinc-500/30 p-2">
            Parallels
          </Link>
        </div>
        <div>równoległe sloty z różnych stron źródłowych - np. do CMS</div>
      </div>
      <div>
        <LastPoll label="Last" />
      </div>
      <div className="flex flex-row space-x-4">
        <div>
          <Link href={"/polls"} className="bg-zinc-500/30 p-2">
            Polls - sondy
          </Link>
        </div>
        <div>system poslls, na wzór serwisu donald</div>
      </div>
    </div>
  );
}
