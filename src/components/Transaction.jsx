import { IoBuild, IoTrash } from "react-icons/io5";

export default function Transaction({
  transaction,
  handleDelete,
  handleEditClick,
}) {
  console.log(transaction.date);
  return (
    <div>
      <div className="w-3/4 mx-auto my-4 font-thin border rounded bg-primary-100 border-white/50 text-text-100">
        <div className="flex justify-between">
          <div>
            <h2>Date:</h2>
            <span className="text-lg">
              {transaction.date?.toLocaleString("en-US") ?? "No Date"}
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
            <div className="m-4" onClick={() => handleDelete(transaction._id)}>
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
    </div>
  );
}
