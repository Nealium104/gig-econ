import { useState } from 'react';

export default function InputForm() {
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    let newTotal = 0;
    newTotal += parseInt(document.getElementById('100').value || 0) * 100;
    newTotal += parseInt(document.getElementById('50').value || 0) * 50;
    newTotal += parseInt(document.getElementById('20').value || 0) * 20;
    newTotal += parseInt(document.getElementById('10').value || 0) * 10;
    newTotal += parseInt(document.getElementById('5').value || 0) * 5;
    newTotal += parseInt(document.getElementById('1').value || 0) * 1;

    setTotal(newTotal);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="card w-96 bg-base-200 shadow-xl">
          <form className="card-body">
            <h2 className="card-title justify-center">Count your money!</h2>
            <p className="bg-black/50 rounded-lg p-5">Count your number of dollar bills in order. Press tab and watch your total update! Press submit to log the date of your money!</p>
            <label htmlFor="100">$100</label>
            <input
              type="number"
              placeholder="Quantity of $100 bills"
              className="input input-bordered w-full max-w-xs"
              id="100"
              onBlur={calculateTotal}
            />
            <label htmlFor="50">$50</label>
            <input
              type="number"
              placeholder="Quantity of $50 bills"
              className="input input-bordered w-full max-w-xs"
              id="50"
              onBlur={calculateTotal}
            />
            <label htmlFor="20">$20</label>
            <input
              type="number"
              placeholder="Quantity of $20 bills"
              className="input input-bordered w-full max-w-xs"
              id="20"
              onBlur={calculateTotal}
            />
            <label htmlFor="10">$10</label>
            <input
              type="number"
              placeholder="Quantity of $10 bills"
              className="input input-bordered w-full max-w-xs"
              id="10"
              onBlur={calculateTotal}
            />
            <label htmlFor="5">$5</label>
            <input
              type="number"
              placeholder="Quantity of $5 bills"
              className="input input-bordered w-full max-w-xs"
              id="5"
              onBlur={calculateTotal}
            />
            <label htmlFor="1">$1</label>
            <input
              type="number"
              placeholder="Quantity of $1 bills"
              className="input input-bordered w-full max-w-xs"
              id="1"
              onBlur={calculateTotal}
            />
            <div className="flex items-center justify-between">
              <div>
                <span className="badge p-4 text-xl">${total}</span>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}