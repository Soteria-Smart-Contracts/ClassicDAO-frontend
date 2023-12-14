import { useState } from "react";
import { useLoaderData, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useWeb3, isValidChain } from "../hooks/useWeb3";
import { IncentivizeProposalModal } from "../components";
import { getPercentage } from "../components/Governance/renderUtils";

export default function Proposal() {
  const { proposal } = useLoaderData();
  const { data } = useWeb3();
  let { state } = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  function convertTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const dateOptions = { month: "short", day: "numeric", year: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return `${formattedDate}, ${formattedTime}`;
  }

  const handleOpenIncentivizeModalClick = () => {
    if (isOpen) {
      document.querySelector(".incentivize-proposal").close();
      setIsOpen(false);
    } else {
      document.querySelector(".incentivize-proposal").showModal();
      setIsOpen(true);
    }
  };

  const handleVotingOptionClick = (optionIndex) => {
    toast(
      `Voted on the option index ${optionIndex}, \n value: ${
        Object.keys(proposal.options)[optionIndex]
      }`
    );
  };

  return (
    <div className="gov-container">
      <IncentivizeProposalModal
        isOpen={isOpen}
        proposalInfo={proposal}
        handleOpenIncentivizeModalClick={handleOpenIncentivizeModalClick}
      />

      <div className="header-content-container">
        <div className="proposalHeader">
          <Link
            to={state ? "/governance" : "/"}
            disabled={typeof state === "object"}
          >
            <button>&#11013; &nbsp;&nbsp; Back</button>
          </Link>

          <span className="proposal-data">{proposal.proposer}</span>

          <span className="proposal-data">{proposal.title}</span>
          <span
            className={`statusBadge statusBadgeModal badge${proposal.status}`}
          >
            {proposal.status}
          </span>
        </div>

        <div className="proposalContent">{proposal.content}</div>

        <div className="voting-area">
          {!data.connected && <h2> Please connect your wallet to vote </h2>}

          {data.connected && (
            <>
              {(proposal.status.toLowerCase() === "rejected" ||
                proposal.status.toLowerCase() === "passed") &&
                isValidChain(data.chain) && (
                  <div className="referendum-buttons post-referendum">
                    <button className={`option-button-opt8`}>
                      Claim rewards
                    </button>

                    <button className={`option-button-opt9`}>
                      Withdraw votes
                    </button>

                    {proposal.status.toLowerCase() === "passed" && (
                      <button className={`option-button-opt10`}>Execute</button>
                    )}
                  </div>
                )}

              {proposal.status.toLowerCase() === "active" &&
                isValidChain(data.chain) && (
                  <>
                    <div className="multi-options-results">
                      <h4> Do you agree? </h4> <br />
                      <div className="referendum-buttons">
                        {Object.keys(proposal.options).map((option, index) => {
                          return (
                            <button
                              key={option}
                              className={`modalOptionButton option-button-opt${
                                index + 1
                              }`}
                              onClick={() => handleVotingOptionClick(index)}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {Object.keys(proposal.multi).length > 0 && (
                      <>
                        <h5>Choose an option:</h5>
                        <div className="referendum-buttons">
                          {Object.keys(proposal.multi).map((option, index) => (
                            <button
                              key={option}
                              className={`modalOptionButton option-button-opt${
                                index + 3
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
            </>
          )}
        </div>
      </div>

      <div className="voting-data">
        <div>
          <h4> Voting Results </h4>
          {Object.keys(proposal.options).map((option, index) => {
            return (
              <div key={option} className={"option-box modalOption"}>
                <span className="option-name"> {option} </span>
                <span className="votingPercentage">
                  {proposal.options[option] > 0
                    ? getPercentage(option, proposal.options) + "%"
                    : "0%"}{" "}
                </span>
                <meter
                  id={`${option}`}
                  className={`voting-option-percentage-bar voting-option-percentage-bar-opt${
                    index + 1
                  }`}
                  value={getPercentage(option, proposal.options).toString()}
                  max="100"
                />
              </div>
            );
          })}

          <div className="multi-options-results">
            {Object.keys(proposal.multi).length > 0 && (
              <>
                {Object.keys(proposal.multi).map((option, index) => {
                  return (
                    <div key={option} className={"multiOption modalOption"}>
                      <span className="option-name"> {option} </span>
                      <span className="votingPercentage">
                        {proposal.multi[option] > 0
                          ? getPercentage(option, proposal.multi) + "%"
                          : "0%"}{" "}
                      </span>
                      <meter
                        className={`voting-option-percentage-bar voting-option-percentage-bar-opt${
                          index + 1
                        }`}
                        value={getPercentage(option, proposal.multi).toString()}
                        max="100"
                      />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        <div>
          <h4> Information </h4>

          <div className="voting-data-info">
            <span className="cardTopName">Start date</span>
            <span>{convertTimestamp(proposal.startsIn)}</span>
          </div>

          <div className="voting-data-info">
            <span className="cardTopName">End date</span>
            <span>{convertTimestamp(proposal.endsIn)}</span>
          </div>
        </div>

        <div>
          <h4> Incentives </h4>

          <div className="voting-data-info">
            <span className="cardTopName">Total incentives</span>
            <span>XXXXXXX</span>
          </div>

          <div className="voting-data-info">
            <span className="cardTopName">CLD to burn</span>
            <span>XXXXXXX</span>
          </div>

          <div className="voting-data-info">
            <span className="cardTopName">CLD per voter</span>
            <span>XXXXXXX</span>
          </div>

          <div className="voting-data-info">
            <span className="cardTopName">CLD to executioner</span>
            <span>XXXXXXX</span>
          </div>

          {proposal.status.toLowerCase() === "active" &&
            data.connected &&
            isValidChain(data.chain) && (
              <button
                className="incentivize-button"
                onClick={handleOpenIncentivizeModalClick}
              >
                Incentivize
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
