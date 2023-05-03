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
        if (user) {
          const userId = user.sub; // Replace this with the actual user ID from your 0auth.
          fetchTransactions(userId).then((fetchedTransactions) => {
            setTransactions(fetchedTransactions);
          });
        }
      }, [user]);

      const handleUpdate = async (transactionId, updatedData) => {
        await fetch('/api/transactions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: transactionId, ...updatedData }),
        });
      };

      const handleEditClick = (transactionId, currentDescription) => {
        const updatedDescription = prompt('Enter new description:', currentDescription);
        if (updatedDescription && updatedDescription !== currentDescription) {
          handleUpdate(transactionId, { description: updatedDescription });
        }
      };
    
      const handleDelete = async (transactionId) => {
        await fetch('/api/transactions', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: transactionId }),
        });
      };
    
      function TransactionsTable({ transactions }) {
        return (
            <div className="container mx-auto py-6 px-4">
            <h1 className="text-2xl font-semibold mb-6 text-center">Your Transactions</h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto text-black">
                <thead>
                    <tr className="text-gray-700 bg-gray-100">
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Edit</th>
                    <th className="px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                    <tr
                        key={transaction._id}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                        <td className="border px-4 py-2">{user ? transaction.date.split('T')[0] : "N/a"}</td>
                        <td className="border px-4 py-2">${user ? transaction.amount : "N/a"}</td>
                        <td className="border px-4 py-2">
                        {user ? transaction.description || 'No description provided' : "N/a"}
                        </td>
                        <td className="border px-4 py-2">
                          <button onClick={() => handleEditClick(transaction._id, transaction.description)}>Edit</button>
                        </td>
                        <td className="border px-4 py-2">
                          <button onClick={() => handleDelete(transaction._id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        );
      }

    return (
        <>
        <Nav />
        <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Your Transactions
        </h1>
        <div className="overflow-x-auto">
          {user ? (
            // Render the TransactionsTable component and pass the transactions data
            <TransactionsTable transactions={transactions} />
          ) : (
            <p className="text-center text-xl">
              Please login to view your transactions, amigo! 🚀
            </p>
          )}
        </div>
      </div>
        </>
    )
}


// {isLoading ? (
//     <span>Authenticating, please wait... 🕒</span>
//     ) : user ? (
//     <a href="/api/auth/logout">Logout</a>
//     ) : (
//     <a href="/api/auth/login">Login</a>
//     )}