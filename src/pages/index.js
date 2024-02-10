import Nav from "@/components/Nav";
import InputForm from "@/components/InputForm";
import Footer from "@/components/Footer";
import Conditional from "@/components/shared/Conditional";
import Totals from "@/components/Totals";
import Groups from "@/components/Groups";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const TABS = {
  HOME: "home",
  CALCULATOR: "calculator",
  LOGS: "logs",
  GROUPS: "groups",
};

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(TABS.HOME);
  const [value, setValue] = useState(new Date());
  const { user, error, isLoading } = useUser();

  function onChange(nextValue) {
    setValue(nextValue);
  }

  const handleButtonClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <main className="w-screen h-screen bg-neutral">
      <Nav />
      <div className="max-width-l">
        <h1 className="p-5 mx-auto my-5 text-5xl font-bold text-primary bg-base-100 w-fit rounded-xl">
          Welcome{" " + user?.name || ""}, to Gig-Econ!
        </h1>
        <div className="max-w-lg mx-auto mb-8">
          <div className="flex ms-4">
            <button
              className={`rounded-t-lg px-4 py-3 mx-1 ${
                selectedTab === TABS.HOME ? "bg-bg-200" : "bg-bg-300"
              }`}
              onClick={() => handleButtonClick(TABS.HOME)}
            >
              Home
            </button>
            <button
              className={`rounded-t-lg px-4 py-3 mx-1 ${
                selectedTab === TABS.CALCULATOR ? "bg-bg-200" : "bg-bg-300"
              }`}
              onClick={() => handleButtonClick(TABS.CALCULATOR)}
            >
              Calculator
            </button>
            <button
              className={`rounded-t-lg px-4 py-3 mx-1 ${
                selectedTab === TABS.LOGS ? "bg-bg-200" : "bg-bg-300"
              }`}
              onClick={() => handleButtonClick(TABS.LOGS)}
            >
              Logs
            </button>
            <button
              className={`rounded-t-lg px-4 py-3 mx-1 ${
                selectedTab === TABS.GROUPS ? "bg-bg-200" : "bg-bg-300"
              }`}
              onClick={() => handleButtonClick(TABS.GROUPS)}
            >
              Groups
            </button>
          </div>
          <div className="p-5 mx-auto text-center bg-bg-200 rounded-xl h-fit">
            <Conditional className="py-4" showWhen={selectedTab === TABS.HOME}>
              <h3 className="text-xl font-bold text-secondary">
                If this is your first time at Gig-Econ, check out the FAQ.
                Otherwise, click the tabs to use the calculator or check your
                current logs
              </h3>
              <h2>
                Click the calculator to just use the calculator, or Login to
                access your past sessions!
              </h2>
            </Conditional>
            <Conditional
              className="py-4"
              showWhen={selectedTab === TABS.CALCULATOR}
            >
              <InputForm />
            </Conditional>
            <Conditional className="py-4" showWhen={selectedTab === TABS.LOGS}>
              <Totals />
            </Conditional>
            <Conditional
              className="py-4"
              showWhen={selectedTab === TABS.GROUPS}
            >
              <Groups />
            </Conditional>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
