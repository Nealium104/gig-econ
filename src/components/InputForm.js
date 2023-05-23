import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function InputForm() {
  const [total, setTotal] = useState(0);

  const { user } = useUser();
  const sid = user ? user.sub : null;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const date = new Date().toISOString().split('T')[0];
    if (!sid) {
      console.error('User is not logged in or user information is not available yet');
      return;
    }

    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: sid,
        date,
        description,
        amount: total,
      }),
    });

    // Clear the form and total, because who doesn't love a fresh start?
    document.getElementById('transaction-form').reset();
    setTotal(0);
  };

  return (
    <>
      <div className="flex justify-center pb-5">
        <div className="card w-96 bg-black/25 shadow-xl">
          <form className="card-body" id="transaction-form" onSubmit={handleSubmit}>
            <h2 className="card-title justify-center text-secondary text-4xl">Count your money!</h2>
            <p className="bg-black/50 rounded-lg p-5">Count your number of dollar bills in order. Press enter and watch your total update! Press submit to log the date of your money!</p>
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
            <div>
              <h3>Description (optional):</h3>
              <input type="text" placeholder="Write a short description" className="input input-bordered w-full max-w-xs" id="description" />
            </div>
            <div className="flex items-center justify-center">
              <div className='flex flex-col items-center'>
              <div className='badge p-4 my-4 text-xl' style={{position: 'relative'}}>
                      <span style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)'}}>$</span>
                      <input 
                          className='bg-base-200'
                          type="number"
                          value={total}
                          onChange={event => setTotal(Number(event.target.value))}
                          style={{paddingLeft: '20px'}}
                      />
                  </div>
                <button className="btn btn-primary" type="submit" disabled={!sid}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}