import { useState, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { IoBuild, IoTrash } from 'react-icons/io5'

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
          const userId = user.sub;
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
      
        // fetch updated transactions
        const updatedTransactions = await fetchTransactions(user.sub);
        setTransactions(updatedTransactions);
      };
      
      const handleDelete = async (transactionId) => {
        await fetch('/api/transactions', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: transactionId }),
        });
      
        // fetch updated transactions
        const updatedTransactions = await fetchTransactions(user.sub);
        setTransactions(updatedTransactions);
      };

      const handleEditClick = (transactionId, currentDescription, currentAmount) => {
        const updatedDescription = prompt('Enter new description:', currentDescription);
        const updatedAmount = prompt('Enter the updated amount', currentAmount);
        
        if ((updatedDescription && updatedDescription !== currentDescription) ||
            (updatedAmount && updatedAmount !== currentAmount)) {
          handleUpdate(transactionId, { description: updatedDescription, amount: updatedAmount });
        }
      };

      
      function TransactionsTable({ transactions }) {
        return (
          <div>
            {transactions.map((transaction) => (
              <div className="bg-bg-300 rounded w-3/4 mx-auto my-4" key={transaction._id}>
                <div className="flex justify-between">
                  <div>
                    <h2>Date</h2>
                    <span className="text-2xl">{transaction.date.split('T')[0]}</span>
                  </div>
                  <div className="flex">
                    <div className="m-4" onClick={() => handleEditClick(transaction._id, transaction.description, transaction.amount)}>
                      <IoBuild />
                    </div>
                    <div className="m-4" onClick={() => handleDelete(transaction._id)}>
                      <IoTrash />
                    </div>
                  </div>
                </div>
                <div className="w-full text-end">
                  <h2>Amount:</h2>
                  <span className="text-2xl">{transaction.amount}</span>
                </div>
                <div className="">
                  <h2>Description</h2>
                  <span className="text-2xl">{transaction.description || transaction.amount}</span>
                </div>
              </div>
            ))}
          </div>
        );
      }

      // function TransactionsTable({ transactions }) {
      //   return (
      //       <div className="container table mx-auto py-6 px-4">
      //       <div className="">
      //           <table className="w-full table-auto text-white">
      //           <thead>
      //               <tr className="text-white bg-black/75">
      //               <th className="px-4 py-2">Date</th>
      //               <th className="px-4 py-2">Amount</th>
      //               <th className="px-4 py-2">Description</th>
      //               <th className="px-4 py-2">Edit</th>
      //               <th className="px-4 py-2">Delete</th>
      //               </tr>
      //           </thead>
      //           <tbody>
      //               {transactions.map((transaction, index) => (
      //               <tr
      //                   key={transaction._id}
      //                   className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
      //               >
      //                   <td className="border px-4 py-2">{user ? transaction.date.split('T')[0] : "N/a"}</td>
      //                   <td className="border px-4 py-2">${user ? transaction.amount : "N/a"}</td>
      //                   <td className="border px-4 py-2">
      //                   {user ? transaction.description || 'No description provided' : "N/a"}
      //                   </td>
      //                   <td className="border px-4 py-2">
      //                   <button onClick={() => handleEditClick(transaction._id, transaction.description, transaction.amount)}>Edit</button>
      //                   </td>
      //                   <td className="border px-4 py-2">
      //                     <button onClick={() => handleDelete(transaction._id)}>🗑️</button>
      //                   </td>
      //               </tr>
      //               ))}
      //           </tbody>
      //           </table>
      //       </div>
      //       </div>
      //   );
      // }

      return (
        <>
          <div className="container mx-auto py-6 px-4">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Your Logs
            </h1>
            <div className="overflow-x-auto">
              {user ? (
                // Render the TransactionsTable component and pass the transactions data
                <TransactionsTable transactions={transactions} />
              ) : (
                <div>
                  <p className="text-center text-xl">
                    Please login to view your logs, amigo! 🚀
                  </p>
                  <TransactionsTable transactions={transactions} />
                </div>
              )}
            </div>
          </div>
        </>
      )
}

