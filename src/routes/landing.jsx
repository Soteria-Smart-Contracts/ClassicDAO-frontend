import { useOutletContext } from "react-router-dom";
import {
  CurrentProposals,
  PastProposals,
  GovernanceResume,
} from "../components";
import "../assets/styles/landing.css";

export default function Root() {
  const [proposals] = useOutletContext();

  return (
    <div className="landingGrid">
      <div className="item1">
        <h2>Current proposals</h2>

        <CurrentProposals proposals={proposals} />
      </div>

      <div className="item2">
        <GovernanceResume proposals={proposals} />
      </div>

      <div className="item3">
        <h2>Past proposals</h2>

        <PastProposals proposals={proposals} />
      </div>

      <div className="item4">
        <h3>FAQ</h3>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
        </ul>

        <h3>General CLD resources</h3>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
        </ul>
      </div>
    </div>
  );
}
