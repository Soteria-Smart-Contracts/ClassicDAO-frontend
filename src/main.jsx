import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Root from "./routes/landing";
import Governance from "./routes/governance";
import Proposal from "./routes/proposal.jsx";
import ErrorPage from "./routes/error-page.jsx";
import { proposalLoader, individualProposalLoader } from "./routes/loaders.js";
import Profile from "./routes/profile";
import Treasury from "./routes/treasury";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    loader: proposalLoader,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/governance",
        element: <Governance />,
      },
      {
        path: "proposal/:proposalID",
        loader: individualProposalLoader,
        errorElement: <ErrorPage />,
        element: <Proposal />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/treasury",
        element: <Treasury />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
