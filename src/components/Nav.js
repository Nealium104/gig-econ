import Link from "next/link";

export default function Nav () {
    return (
        <>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href='/' className="btn btn-ghost normal-case text-xl">Money Counter!</Link>
            </div>
            <div className="flex">
                <Link href="/totals" className="mx-4">Transactions</Link>
                <a href="/api/auth/logout">Logout</a>
            </div>
        </div>
        </>
    )
}

