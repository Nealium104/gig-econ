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
        <div className="w-96">
          <form className="" id="transaction-form" onSubmit={handleSubmit}>
            <h2 className="justify-center text-secondary text-4xl">Count your money!</h2>
            <p className="rounded-lg p-5">Count your number of dollar bills in order. Press enter and watch your total update! Press submit to log the date of your money!</p>
            <div className='w-full'>
              <div className='my-4 w-full flex justify-evenly items-center h-20 bg-primary-100 rounded shadow-xl transition duration-150 focus-within:scale-110'>
                <label className="text-xl h-10 flex items-center" htmlFor="100">$100x</label>
                <input
                  type="number"
                  placeholder="Quantity of $100 bills"
                  className="h-10 text-xl rounded text-center"
                  id="100"
                  onBlur={calculateTotal}
                />
              </div>
              <div className="my-4 w-full flex justify-evenly items-center h-20 bg-primary-100 rounded shadow-xl transition duration-150 focus-within:scale-110">
                <label className="text-xl h-10 flex items-center" htmlFor="50">$50x</label>
                <input
                  type="number"
                  placeholder="Quantity of $50 bills"
                  className="h-10 text-xl rounded text-center"
                  id="50"
                  onBlur={calculateTotal}
                />
              </div>
              <div className="my-4 w-full flex justify-evenly items-center h-20 bg-primary-100 rounded shadow-xl transition duration-150 focus-within:scale-110">
                <label className="text-xl h-10 flex items-center" htmlFor="20">$20x</label>
                <input
                  type="number"
                  placeholder="Quantity of $20 bills"
                  className="h-10 text-xl rounded text-center"
                  id="20"
                  onBlur={calculateTotal}
                />
              </div>
              <div className="my-4 w-full flex justify-evenly items-center h-20 bg-primary-100 rounded shadow-xl transition duration-150 focus-within:scale-110">
                <label className="text-xl h-10 flex items-center" htmlFor="10">$10x</label>
                <input
                  type="number"
                  placeholder="Quantity of $10 bills"
                  className="h-10 text-xl rounded text-center"
                  id="10"
                  onBlur={calculateTotal}
                />
              </div>
              <div className="my-4 w-full flex justify-evenly items-center h-20 bg-primary-100 rounded shadow-xl transition duration-150 focus-within:scale-110">
                <label className="text-xl h-10 flex items-center" htmlFor="5">$5x</label>
                <input
                  type="number"
                  placeholder="Quantity of $5 bills"
                  className="h-10 text-xl rounded text-center"
                  id="5"
                  onBlur={calculateTotal}
                />
              </div>
              <div className="my-4 w-full flex justify-evenly items-center h-20 bg-primary-100 rounded shadow-xl transition duration-150 focus-within:scale-110">
                <label className="text-xl h-10 flex items-center" htmlFor="1">$1x</label>
                <input
                  type="number"
                  placeholder="Quantity of $1 bills"
                  className="h-10 text-xl rounded text-center"
                  id="1"
                  onBlur={calculateTotal}
                />
              </div>
            </div>
            <div>
              <h3>Description (optional):</h3>
              <input type="text" placeholder="Write a short description" className="w-3/4 max-w-xs h-14 text-xl px-4" id="description" />
            </div>
            <div className="flex items-center justify-center">
              <div className='flex flex-col items-center'>
              <div className='p-4 my-4 text-xl relative bg-bg-200'>
                      <p 
                          className='text-text-100 text-4xl bg-primary-100 p-4 rounded shadow-xl'
                          type="text"
                          pattern="\d*"
                          value={total}
                          onChange={event => setTotal(Number(event.target.value))}
                          style={{paddingLeft: '20px'}}
                      >{`$ ${total}`}</p>
                  </div>
                <button className="bg-primary-100 px-4 py-2 rounded-lg shadow-xl" type="submit" disabled={!sid}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}