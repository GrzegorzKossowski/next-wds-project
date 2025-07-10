import Link from "next/link";

export default async function AuthErrorPage({
  searchParams,
}: {
  params?: Promise<{ slug: string }>;
  searchParams?: Promise<{ error?: string | undefined }>;
}) {
  const error = await searchParams;

  return (
    <>
      Oops, error
      <hr />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Błąd</h1>
        <p className="mt-4">
          Kod błędu: <strong>{error?.error}</strong>
        </p>
      </div>
      <div className="flex flex-row space-x-3">
        <div>
          <Link href={"/sign-in"}>Login</Link>
        </div>
        <div>
          <Link href={"/sign-up"}>Register</Link>
        </div>
      </div>
    </>
  );
}
