import { auth } from "@/auth";
import AuthButtonServer from "./_components/AuthButton.server";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <div>{JSON.stringify(session, null, 2)}</div>
      <div>
        <AuthButtonServer />
      </div>
    </>
  );
}
