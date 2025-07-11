import Link from "next/link";

export default function Header() {
  return (
    <nav className="py-2 flex gap-4 text-xl border-b-2">
      <Link className="border-b border-b-blue-500" href="/">
        Home
      </Link>
      <Link className="border-b border-b-blue-500" href="/parallels">
        Parallels
      </Link>
      <Link className="border-b border-b-blue-500" href="/parallels/settings">
        Settings(T)
      </Link>
      <Link className="border-b border-b-blue-500" href="/parallels/details">
        Details(A)
      </Link>
      <Link className="border-b border-b-blue-500" href="/parallels/common">
        Common(T&A)
      </Link>
    </nav>
  );
}
