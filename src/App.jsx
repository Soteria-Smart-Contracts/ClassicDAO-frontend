import { Outlet, useLoaderData } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Web3Providers } from "./hooks/providers";
import { Navbar, HelpButton } from "./components/";

import "./App.css";

function App() {
  const { proposals, q } = useLoaderData();

  return (
    <Web3Providers>
      <Navbar proposals={proposals} q={q} />
      <Toaster position="top-right" />

      <div className="content">
        <Outlet context={[proposals]} />
      </div>
      <HelpButton />
    </Web3Providers>
  );
}

export default App;
