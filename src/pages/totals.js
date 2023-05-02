import Nav from "@/components/Nav"
import { useState, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';

async function fetchTransactions(userId) {
    const res = await fetch(`/api/transactions?userId=${userId}`);
    const transactions = await res.json();
    return transactions;
  }

export default function Totals () {
    const [transactions, setTransactions] = useState([]);

    const { user } = useUser();
    const sid = user ? user.sub : null;

    useEffect(() => {
      const userId = sid; // Replace this with the actual user ID from your 0auth.
      fetchTransactions(userId).then((fetchedTransactions) => {
        setTransactions(fetchedTransactions);
      });
    }, []);
    
    return (
        <>
        <Nav />
        <div className="container mx-auto py-6 px-4">
            <h1 className="text-2xl font-semibold mb-6 text-center">Your Transactions</h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto text-black">
                <thead>
                    <tr className="text-gray-700 bg-gray-100">
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                    <tr
                        key={transaction._id}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                        <td className="border px-4 py-2">{transaction.date.split('T')[0]}</td>
                        <td className="border px-4 py-2">${transaction.amount}</td>
                        <td className="border px-4 py-2">
                        {transaction.description || 'No description provided'}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </>
    )
}
