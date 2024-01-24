import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Nav() {
  const { user } = useUser();

  return (
    <>
      <nav className="flex items-center justify-between w-full h-20 bg-bg-200">
        <div className="transition duration-150 hover:scale-110">
          <Link
            href="/"
            className="mx-4 text-3xl font-bold transition duration-150 hover:scale-110 hover:text-primary-100"
          >
            Gig-Econ
          </Link>
        </div>
        <div className="flex">
          <Link
            href="/"
            className="mx-4 text-xl transition duration-150 hover:scale-110 hover:text-primary-100"
          >
            Dashboard
          </Link>
          <Link
            className="mx-4 text-xl transition duration-150 hover:scale-110 hover:text-primary-100"
            href="/faq/"
          >
            FAQ
          </Link>
          {user ? (
            <a
              className="mx-4 text-xl transition duration-150 hover:scale-110 hover:text-primary-100"
              href="/api/auth/logout"
            >
              Logout
            </a>
          ) : (
            <a
              className="mx-4 text-xl transition duration-150 hover:scale-110 hover:text-primary-100"
              href="/api/auth/login"
            >
              Login
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
