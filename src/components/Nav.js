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
                <Link className='mx-4' href='/faq/'>FAQ</Link>
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

