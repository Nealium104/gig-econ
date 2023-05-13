import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Nav () {
    const { user, error, isLoading } = useUser();

    return (
        <>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href='/' className="btn btn-ghost normal-case text-xl">Freelance Funds!</Link>
            </div>
            <div className="flex">
                <Link href='/faq/'>FAQ</Link>
                <Link href="/totals" className="mx-4">Transactions</Link>
                {isLoading ? (
                    <span>Authenticating...</span>
                    ) : user ? (
                    <a href="/api/auth/logout">Logout</a>
                    ) : (
                    <a href="/api/auth/login">Login</a>
                    )}
            </div>
        </div>
        </>
    )
}

