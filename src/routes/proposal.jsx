import { useState } from "react";
import {
  useLoaderData,
  useLocation,
  Link,
  useOutletContext,
} from "react-router-dom";
import toast from "react-hot-toast";
import { useWeb3, isValidChain } from "../hooks/useWeb3";
import { IncentivizeProposalModal } from "../components";
import { getPercentage } from "../components/Governance/renderUtils";
import { sendTx, returnContractAddress } from "../components/Governance/utils";

export default function Proposal() {
  const { proposalID } = useLoaderData();
  const [proposals, setProposals] = useOutletContext();
  const proposal = proposals[proposalID];

  const { data, functions, setter } = useWeb3();
  let { state } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [votingInfo, setVotingInfo] = useState({
    option: "",
    voteAmount: 0,
  });

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

  const handleApproveTokens = () => {
    toast(`Approving tokens to vote on proposal ${Number(proposalID) + 1}`);

    sendTx(
      functions.contractCall,
      functions.verifyTx,
      "CLD",
      "approve",
      [returnContractAddress("Core"), BigInt(votingInfo.voteAmount)],
      toast,
      [setIsLoading]
    ).then((resp) => {
      if (resp) {
        setter((prevState) => ({
          ...prevState,
          userInfo: {
            ...prevState.userInfo,
            cldCoreAllowance: (
              BigInt(prevState.userInfo.cldCoreAllowance) +
              BigInt(votingInfo.voteAmount)
            ).toString(),
          },
        }));

        toast(`Approved tokens to vote on proposal ${proposalID + 1}`);
      }
    });
  };

  const handleVotingOptionClick = (optionIndex) => {
    sendTx(
      functions.contractCall,
      functions.verifyTx,
      "TestDAO",
      "Vote",
      [
        Number(proposalID) + 1,
        optionIndex === 0,
        BigInt(votingInfo.voteAmount),
      ],
      toast,
      [setIsLoading]
    ).then((resp) => {
      if (resp) {
        toast(
          `Voted ${Object.keys(proposal.options)[optionIndex]} on proposal ${
            Number(proposalID) + 1
          }`
        );

        setter((prevState) => ({
          ...prevState,
          userInfo: {
            cldBalance: (
              BigInt(prevState.userInfo.cldBalance) -
              BigInt(votingInfo.voteAmount)
            ).toString(),
            cldCoreAllowance: (
              BigInt(prevState.userInfo.cldCoreAllowance) -
              BigInt(votingInfo.voteAmount)
            ).toString(),
          },
        }));

        const text = optionIndex === 0 ? "Yes" : "No";

        setProposals((prevState) => {
          const updatedProposals = prevState.map((proposal, index) => {
            if (index === Number(proposalID)) {
              const updatedOptions = {
                ...proposal.options,
                [text]: proposal.options[text] + BigInt(votingInfo.voteAmount),
              };

              return {
                ...proposal,
                options: updatedOptions,
              };
            }

            return proposal;
          });
          console.log(updatedProposals);
          return updatedProposals;
        });
      }
    });
  };

  const handleRangeChange = (newPercentageValue) => {
    const newAmountToSent =
      (Number(data.userInfo.cldBalance) * newPercentageValue) / 100;

    setVotingInfo((prevState) => ({
      ...prevState,
      voteAmount: newAmountToSent,
    }));
  };

  const handleVoteAmountInputChange = (e) => {
    const newValue = Number(e.target.value) * 10 ** 18;

    setVotingInfo((prevState) => ({
      ...prevState,
      voteAmount: newValue,
    }));
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

          {/* <span className="proposal-data">{proposal.proposer}</span> */}

          <span className="proposal-data">{proposal.title}</span>
          <span
            className={`statusBadge statusBadgeModal badge${proposal.status}`}
          >
            {/* {proposal.status} */}
          </span>
        </div>

        {/* <div className="proposalContent">{proposal.content}</div> */}

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

              {
                // proposal.status.toLowerCase() === "active" &&
                isValidChain(data.chain) && (
                  <>
                    <div className="multi-options-results">
                      <h4> Do you agree? </h4> <br />
                      <h3>
                        You are holding {data.userInfo.cldBalance / 10 ** 18}{" "}
                        CLD tokens
                      </h3>
                      <div className="token-input">
                        <label htmlFor="tempB">
                          Choose a token amount to incentivize:
                        </label>
                        <br />
                        <input
                          type="range"
                          id="tempB"
                          name="temp"
                          list="values"
                          value={
                            (votingInfo.voteAmount /
                              Number(data.userInfo.cldBalance)) *
                            100
                          }
                          onChange={(e) =>
                            handleRangeChange(Number(e.target.value))
                          }
                        />
                        <datalist id="values">
                          <option value="0" label="0" />
                          <option value="25" label="25" />
                          <option value="50" label="50" />
                          <option value="75" label="75" />
                          <option value="100" label="100" />
                        </datalist>
                        <input
                          type="number"
                          step="0.05"
                          min="0"
                          onChange={handleVoteAmountInputChange}
                          value={(votingInfo.voteAmount / 10 ** 18).toFixed(2)}
                        />
                      </div>
                      {Number(data.userInfo.cldCoreAllowance) >=
                        BigInt(votingInfo.voteAmount) &&
                        votingInfo.voteAmount != 0 && (
                          <div className="referendum-buttons">
                            {Object.keys(proposal.options).map(
                              (option, index) => {
                                return (
                                  <button
                                    key={option}
                                    className={`modalOptionButton option-button-opt${
                                      index + 1
                                    }`}
                                    onClick={() =>
                                      handleVotingOptionClick(index)
                                    }
                                    disabled={votingInfo.voteAmount === 0}
                                  >
                                    {option}
                                  </button>
                                );
                              }
                            )}
                          </div>
                        )}
                      {Number(data.userInfo.cldCoreAllowance) <
                        BigInt(votingInfo.voteAmount) && (
                        <button
                          onClick={handleApproveTokens}
                          disabled={votingInfo.voteAmount === 0}
                          style={{
                            background: "blue",
                            color:
                              votingInfo.voteAmount === 0 ? "black" : "white",
                          }}
                        >
                          Click to approve tokens
                        </button>
                      )}
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
                )
              }
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
          {/* <h4> Information </h4>

          <div className="voting-data-info">
            <span className="cardTopName">Start date</span>
            <span>{convertTimestamp(proposal.startsIn)}</span>
          </div>

          <div className="voting-data-info">
            <span className="cardTopName">End date</span>
            <span>{convertTimestamp(proposal.endsIn)}</span>
          </div> */}
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
