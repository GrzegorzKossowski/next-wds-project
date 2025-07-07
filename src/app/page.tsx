import { auth } from "@/auth";
import AuthButtonServer from "./_components/AuthButton.server";
import ThemeSwitch from "./_components/ThemeSwitch";

export default async function Home() {
  const session = await auth();
  return (
    <>
    <div><ThemeSwitch/></div>
      <div>
        {session && JSON.stringify(session, null, 2)}
        </div>
      <div>
        <AuthButtonServer />
      </div>
    </>
  );
}
