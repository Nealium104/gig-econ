import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { IoBuild, IoTrash } from "react-icons/io5";

async function fetchTransactions(userId) {
  const res = await fetch(`/api/transactions?userId=${userId}`);
  const transactions = await res.json();
  return transactions;
}

export default function Totals() {
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
    await fetch("/api/transactions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: transactionId, ...updatedData }),
    });

    // fetch updated transactions
    const updatedTransactions = await fetchTransactions(user.sub);
    setTransactions(updatedTransactions);
  };

  const handleDelete = async (transactionId) => {
    await fetch("/api/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: transactionId }),
    });

    // fetch updated transactions
    const updatedTransactions = await fetchTransactions(user.sub);
    setTransactions(updatedTransactions);
  };

  const handleEditClick = (
    transactionId,
    currentDescription,
    currentAmount
  ) => {
    const updatedDescription = prompt(
      "Enter new description:",
      currentDescription
    );
    const updatedAmount = prompt("Enter the updated amount", currentAmount);

    if (
      (updatedDescription && updatedDescription !== currentDescription) ||
      (updatedAmount && updatedAmount !== currentAmount)
    ) {
      handleUpdate(transactionId, {
        description: updatedDescription,
        amount: updatedAmount,
      });
    }
  };

  function TransactionsTable({ transactions }) {
    return (
      <div>
        {transactions.map((transaction) => (
          <div
            className="w-3/4 mx-auto my-4 font-thin border rounded bg-primary-100 border-white/50 text-text-100"
            key={transaction._id}
          >
            <div className="flex justify-between">
              <div>
                <h2>Date:</h2>
                <span className="text-lg">
                  {transaction.date.split("T")[0]}
                </span>
              </div>
              <div className="flex">
                <div
                  className="m-4"
                  onClick={() =>
                    handleEditClick(
                      transaction._id,
                      transaction.description,
                      transaction.amount
                    )
                  }
                >
                  <IoBuild />
                </div>
                <div
                  className="m-4"
                  onClick={() => handleDelete(transaction._id)}
                >
                  <IoTrash />
                </div>
              </div>
            </div>
            <div className="w-full text-end">
              <h2 className="mx-4">Amount:</h2>
              <span className="text-3xl font-bold text-text-100">{`$${transaction.amount}`}</span>
            </div>
            <div className="">
              <h2>Description:</h2>
              <span className="m-4 text-lg">
                {transaction.description || transaction.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="container px-4 py-6 mx-auto">
        <h1 className="mb-6 text-2xl font-semibold text-center">Your Logs</h1>
        <div className="overflow-x-auto">
          {user ? (
            // Render the TransactionsTable component and pass the transactions data
            <TransactionsTable transactions={transactions} />
          ) : (
            <div>
              <p className="text-xl text-center">
                Please login to view your logs, amigo! 🚀
              </p>
              <TransactionsTable transactions={transactions} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
