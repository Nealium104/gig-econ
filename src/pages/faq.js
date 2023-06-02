import Nav from "@/components/Nav"

export default function FAQ () {
    return (
        <>
            <Nav />
            <main className="">
                <h1 className="text-5xl text-center mb-5">FAQ</h1>
                <section className="bg-base-200 rounded-xl">
                    <div className="p-5 w-3/4 mx-auto">
                        <div className="my-5 flex flex-col">
                            <h2 className="text-4xl text-secondary">What is this for?</h2>
                            <p className="py-4">This is a website where you can track income of your cash only jobs (like serving, freelancing, or performing music) and see your total money, as well as the date of your input.</p>
                        </div>
                        <div className="my-5">
                            <h2 className="text-4xl text-secondary">Why would I use it?</h2>
                            <p className="py-4">This should, in theory, give you a decent record of your income to track for your taxes as well as just keeping you informed about your business.</p>
                        </div>
                        <div>
                            <h2 className="text-4xl text-secondary">When should I use this?</h2>
                            <p className="py-4">I suggest using this calculator on a regular basis so you can see the highs-and-lows yearly of your industry.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}