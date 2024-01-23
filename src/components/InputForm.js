import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const denominations = [100, 50, 20, 10, 5, 1];

export default function InputForm() {
  const [formData, setFormData] = useState({
    description: '',
    bills: denominations.reduce((acc, val) => ({ ...acc, [val]: '' }), {}),
  });
  const [total, setTotal] = useState(0);

  const { user } = useUser();
  const sid = user ? user.sub : null;

  const calculateTotal = () => {
    const newTotal = denominations.reduce((acc, denomination) => acc + (parseInt(formData.bills[denomination]) || 0) * denomination, 0);
    setTotal(newTotal);
  };

  useEffect(calculateTotal, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sid) {
      console.error('User is not logged in or user information is not available yet');
      return;
    }

    const date = new Date().toISOString().split('T')[0];
    const { description } = formData;

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: sid,
          date,
          description,
          amount: total,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFormData({
        description: '',
        bills: denominations.reduce((acc, val) => ({ ...acc, [val]: '' }), {}),
      });
      setTotal(0);
    } catch (error) {
      console.error('There has been a problem with your fetch operation: ', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBillChange = (denomination) => (e) => {
    setFormData((prevState) => ({
      ...prevState,
      bills: {
        ...prevState.bills,
        [denomination]: e.target.value,
      },
    }));
  };

  return (
    <>
      <div className="flex justify-center pb-5">
        <div className="w-96">
          <form className="" id="transaction-form" onSubmit={handleSubmit}>
            <h2 className="justify-center text-secondary text-4xl">Count your money!</h2>
            <p className="rounded-lg p-5">Count your number of dollar bills in order. Press tab or select a new bill quantity and watch your total update! Press submit to log the date of your money!</p>
            <span>You are {user ? 'logged in' : 'not logged in'}</span>
            <div className='w-full'>
            {denominations.map((denomination) => (
            <div key={denomination} className="my-4 w-full flex justify-evenly items-center h-20 bg-primary-100 rounded shadow-xl transition duration-150 focus-within:scale-110">
              <label className="text-xl h-10 flex items-center" htmlFor={denomination.toString()}>${denomination}x</label>
              <input
                type="number"
                placeholder={`Quantity of $${denomination} bills`}
                className="h-10 text-xl rounded text-center text-black/50"
                id={denomination.toString()}
                name={denomination.toString()}
                value={formData.bills[denomination]}
                onChange={handleBillChange(denomination)}
              />
            </div>
        ))}
            </div>
            <div>
              <h3>Description (optional):</h3>
              <input type="text" placeholder="Write a short description" className="text-black/50 w-3/4 max-w-xs h-14 text-xl px-4" id="description" name="description" value={formData.description} onChange={handleInputChange} />
            </div>
            <div className="flex items-center justify-center">
              <div className='flex flex-col items-center'>
              <div className='p-4 my-4 text-xl relative bg-bg-200'>
                      <p 
                          className='text-text-100 text-4xl bg-primary-100 px-6 py-2 rounded shadow-xl'
                          type="text"
                          pattern="\d*"
                          value={total}
                          onChange={event => setTotal(Number(event.target.value))}
                      >{`$ ${total}`}</p>
                  </div>
                <button className="bg-primary-100 text-2xl px-4 py-2 rounded-lg shadow-xl" type="submit" disabled={!sid}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}