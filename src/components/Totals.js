import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Transaction from "./Transaction";
import Dummydata from "./Dummydata";

async function fetchTransactions(userId) {
  const res = await fetch(`/api/transactions?userId=${userId}`);
  const transactions = await res.json();
  return transactions;
}

export default function Totals() {
  const [transactions, setTransactions] = useState(Dummydata);

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

  return (
    <>
      <div className="container px-4 py-6 mx-auto">
        <h1 className="mb-6 text-2xl font-semibold text-center">Your Logs</h1>
        <div className="overflow-x-auto">
          {user ? (
            transactions.map((transaction) => (
              <Transaction key={transaction._id} transactions={transaction} />
            ))
          ) : (
            <div>
              <p className="text-xl text-center">
                Please login to view your logs, amigo! 🚀
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
