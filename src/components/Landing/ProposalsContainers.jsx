import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getTimeText } from "../Governance/renderUtils";

const currentDateObj = new Date();
const currentDate = currentDateObj.getTime() / 1000;

const getProposalID = (_proposals, title) => {
  return _proposals.findIndex((proposal) => proposal.title === title);
};

function CurrentProposals({ proposals }) {
  const orderedProposals = proposals
    .filter((proposal) => {
      return (
        proposal.status.toLowerCase() === "active" ||
        proposal.status.toLowerCase() === "pending"
      );
    })
    .slice(0, 4);

  return (
    <div className="container">
      {orderedProposals.map((proposal) => {
        return (
          <Link
            to={`/proposal/${getProposalID(proposals, proposal.title)}`}
            state={false}
            key={proposal.title + proposal.endsIn}
            className="proposal-line"
          >
            <div className="title-time-container">
              <span className="tituloProposal"> {proposal.title} </span>
              <span className="proposal-time">
                {getTimeText(currentDate, proposal.startsIn, proposal.endsIn)}
              </span>
            </div>
            <span
              className={`statusBadge badge${proposal.status} proposal-button ${
                proposal.status === "Pending" ? "pending-button" : ""
              }`}
            >
              {proposal.status}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function GovernanceResume({ proposals }) {
  const activeProposals = proposals
    .filter((proposal) => {
      return (
        proposal.status.toLowerCase() === "active" ||
        proposal.status.toLowerCase() === "pending"
      );
    })
    .slice(0, 4);
  const stakedValue = proposals.reduce((accumulator, proposal) => {
    const options = proposal.options;
    const values = Object.values(options);
    const sum = values.reduce((acc, value) => BigInt(acc) + value, 0);
    return BigInt(accumulator) + sum;
  }, 0);

  return (
    <div className="container resume">
      <div className="subItem1">
        <p>
          <span className="title-sub-item">Active Proposals</span> <br />
          <span className="item-sub">{activeProposals.length}</span>
        </p>

        <p>
          <span className="title-sub-item">Active Voters</span> <br />
          <span className="item-sub">XX</span>
        </p>

        <p>
          <span className="title-sub-item">CLD Holders</span> <br />
          <span className="item-sub">XX</span>
        </p>
      </div>

      <div className="subItem2">
        <p>
          <span className="title-sub-item">Staked tokens</span> <br />
          <span className="item-sub">CLD$ {stakedValue}</span>
        </p>

        <p>
          <span className="title-sub-item">Staked value</span> <br />
          <span className="item-sub">$ XXX.XX</span>
        </p>
      </div>
    </div>
  );
}

function PastProposals({ proposals }) {
  const pastProposals = proposals
    .filter((proposal) => {
      return (
        proposal.status.toLowerCase() != "active" &&
        proposal.status.toLowerCase() != "pending"
      );
    })
    .slice(0, 4);

  return (
    <div className="container">
      {pastProposals.map((proposal) => {
        return (
          <Link
            to={`/proposal/${getProposalID(proposals, proposal.title)}`}
            state={false}
            key={proposal.title + proposal.endsIn}
            className="past-proposals"
          >
            <div className="title-time-container">
              <span> {proposal.title} </span>{" "}
              <span className="proposal-time">
                {" "}
                {getTimeText(
                  currentDate,
                  proposal.startsIn,
                  proposal.endsIn
                )}{" "}
              </span>
            </div>
            <span
              className={`statusBadge badge${proposal.status} past-proposal-button`}
            >
              {proposal.status}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

CurrentProposals.propTypes = {
  proposals: PropTypes.arrayOf(
    PropTypes.shape({
      filter: PropTypes.func,
      title: PropTypes.string,
      proposer: PropTypes.string,
      status: PropTypes.string,
      content: PropTypes.string,
      startsIn: PropTypes.number,
      endsIn: PropTypes.number,
      options: PropTypes.object,
    })
  ).isRequired,
};

GovernanceResume.propTypes = {
  proposals: PropTypes.arrayOf(
    PropTypes.shape({
      filter: PropTypes.func,
      reduce: PropTypes.func,
      title: PropTypes.string,
      proposer: PropTypes.string,
      status: PropTypes.string,
      content: PropTypes.string,
      startsIn: PropTypes.number,
      endsIn: PropTypes.number,
      options: PropTypes.object,
    })
  ).isRequired,
};

PastProposals.propTypes = {
  proposals: PropTypes.arrayOf(
    PropTypes.shape({
      filter: PropTypes.func,
      title: PropTypes.string,
      proposer: PropTypes.string,
      status: PropTypes.string,
      content: PropTypes.string,
      startsIn: PropTypes.number,
      endsIn: PropTypes.number,
      options: PropTypes.object,
    })
  ).isRequired,
};

export { CurrentProposals, GovernanceResume, PastProposals };
