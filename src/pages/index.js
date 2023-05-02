import Nav from '@/components/Nav'
import InputForm from '@/components/InputForm'
import Conditional from '@/components/shared/Conditional'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const [canShow, setCanShow] = useState(false)
  const [value, setValue] = useState(new Date());

  const { user, error, isLoading } = useUser()

  function onChange(nextValue) {
    setValue(nextValue);
  }

  const handleButtonClick = () => {
    setCanShow(!canShow)
  }
  
  return (
    <main className="bg-neutral">
      <Nav />
      <div className='w-1/2'>
      </div>
      <span className="text-xl m-5">{`Hi ${user ? user.name : 'Guest'}, welcome to Freelance Funds`}</span>
      <div className="max-width-l text-center flex flex-col items-center gap-4">
        <h1 className='text-5xl text-primary font-bold bg-base-100 w-fit p-5 rounded-xl my-5'>Count your cash!</h1>
        <div className='w-3/4 bg-base-100 rounded-xl p-5'>
          <h3 className='text-xl font-bold text-secondary'>What is this mess?</h3>
          <p className="py-4">This is a website where you can track income of your cash only jobs (like serving, freelancing, or performing music) and see your total money, as well as the date of your input.</p>
          <p className="py-4">This should, in theory, give you a decent record of your income to track for your taxes as well as just keeping you informed about your business.</p>
          <p className="py-4">I suggest using this calculator on a regular basis so you can see the highs-and-lows yearly of your industry.</p>
          <h2>Click the calculator to just use the calculator, or Login to access your past sessions!</h2>
        </div>
        <button className='btn bg-black my-5' id='showInputForm' onClick={handleButtonClick}>Calculator</button>
        <div>
          <Conditional className="py-4" showWhen={canShow}>
            <InputForm />
          </Conditional>
        </div>
        </div>
    </main>
  )
}
