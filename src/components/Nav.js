import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Nav () {
    const { user } = useUser();

    return (
        <>
        <div className="bg-bg-200 flex justify-between h-20 items-center">
            <div className="transition duration-150 hover:scale-110">
                <Link href='/' className="text-3xl font-bold mx-4">Gig-Econ</Link>
            </div>
            <div className="flex">
                <Link href="/" className="text-xl mx-4 transition duration-150 hover:scale-110">Dashboard</Link>
                <Link className='mx-4 text-xl transition duration-150 hover:scale-110' href='/faq/'>FAQ</Link>
                {user ? (
                    <a className="text-xl mx-4 transition duration-150 hover:scale-110" href="/api/auth/logout">Logout</a>
                    ) : (
                    <a className="text-xl mx-4 transition duration-150 hover:scale-110" href="/api/auth/login">Login</a>
                    )}
            </div>
        </div>
        </>
    )
}

