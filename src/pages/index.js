import Nav from '@/components/Nav'
import InputForm from '@/components/InputForm'
import Conditional from '@/components/shared/Conditional'
import Totals from '@/components/Totals'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const [canShow, setCanShow] = useState(false)
  const [canShow2, setCanShow2] = useState(false)
  const [value, setValue] = useState(new Date());

  const { user, error, isLoading } = useUser()

  function onChange(nextValue) {
    setValue(nextValue);
  }

  const handleButtonClick = () => {
    setCanShow(!canShow)
  }
  
  const handleButtonClick2 = () => {
    setCanShow2(!canShow2)
  }

  return (
    <main className="bg-neutral">
      <Nav />
      <div className='w-1/2'>
      </div>
      <div className="max-width-l text-center flex flex-col items-center gap-4">
        <h1 className='text-5xl text-primary font-bold bg-base-100 w-fit p-5 rounded-xl my-5'>Count your cash!</h1>
        <span className="text-xl">{`Hi ${user ? user.name : 'Guest'}, welcome to Freelance Funds`}</span>
        <div className='w-3/4 bg-base-100 rounded-xl p-5'>
          <h3 className='text-xl font-bold text-secondary'>If this is your first time at freelance funds, check out the FAQ. Otherwise, use the calculator below or check your current logs</h3>
          <h2>Click the calculator to just use the calculator, or Login to access your past sessions!</h2>
        <button className='btn bg-black my-5' id='showInputForm' onClick={handleButtonClick}>Calculator</button>
        <button className='btn bg-black my-5' onClick={handleButtonClick2}>Your Logs</button>
        </div>
        <div>
          <Conditional className="py-4" showWhen={canShow}>
            <InputForm />
          </Conditional>
          <Conditional className="py-4" showWhen={canShow2}>
            <Totals />
          </Conditional>
        </div>
        </div>
    </main>
  )
}
