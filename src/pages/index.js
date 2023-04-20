import Nav from '@/components/Nav'
import InputForm from '@/components/InputForm'
import Conditional from '@/components/shared/Conditional'
import { useState } from 'react'

export default function Home() {
  const [canShow, setCanShow] = useState(false)

  const handleButtonClick = () => {
    setCanShow(!canShow)
  }
  
  return (
    <main className="bg-neutral">
      <Nav />
      <div className="max-width-l text-center">
        <h1 className="text-5xl my-5 text-center">Welcome to the money counter.</h1>
        <p>This is a website where you can track income of your cash only jobs (like serving or performing music) and see your total money, as well as the date of your input.</p>
        <p>This should, in theory, give you a decent record of your income to track for your taxes as well as just keeping you informed about your business.</p>
        <p>I suggest using this calculator on a regular basis so you can see the highs-and-lows yearly of your industry.</p>
        <h2>Click the button below to get started!</h2>
        <button className='btn bg-black/50 my-5' id='showInputForm' onClick={handleButtonClick}>Get Started</button>
        <Conditional showWhen={canShow}>
          <InputForm />
        </Conditional>
        </div>
    </main>
  )
}
