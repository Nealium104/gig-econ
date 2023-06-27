import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Nav () {
    const { user } = useUser();

    return (
        <>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href='/' className="btn btn-ghost normal-case text-xl">Gig-Econ</Link>
            </div>
            <div className="flex">
                <Link href="/">Dashboard</Link>
                <Link className='mx-4' href='/faq/'>FAQ</Link>
                {user ? (
                    <a href="/api/auth/logout">Logout</a>
                    ) : (
                    <a href="/api/auth/login">Login</a>
                    )}
            </div>
        </div>
        </>
    )
}

