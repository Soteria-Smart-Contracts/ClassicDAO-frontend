import { Outlet, useLoaderData } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useWeb3 } from "./hooks/useWeb3";
import { getTestProposals } from "./hooks/interactions/utils";
import { Navbar, HelpButton } from "./components/";

import "./App.css";
import { useState } from "react";

function App() {
  const { functions } = useWeb3();
  const { proposals, q } = useLoaderData();
  const [testProposals, setTestProposals] = useState([]);

  function populateProposals() {
    getTestProposals(functions.viewInContract).then((response) => {
      const _testProposals = [];

      response.forEach((proposal) => {
        _testProposals.push({
          title: proposal[0],
          proposer: "TEST",
          status: "TEST",
          startsIn: 0,
          endsIn: 0,
          content: "TEST",
          options: {
            Yes: proposal[1],
            No: proposal[2],
          },
          multi: {},
          passed: proposal[3],
          executed: proposal[4],
        });
      });

      setTestProposals(_testProposals);
    });
  }

  return (
    <>
      <Navbar
        proposals={proposals}
        q={q}
        populateProposals={populateProposals}
      />
      <Toaster position="top-right" />

      <div className="content">
        <Outlet
          context={[
            // proposals,
            testProposals,
            setTestProposals,
          ]}
        />
      </div>
      <HelpButton />
    </>
  );
}

export default App;
