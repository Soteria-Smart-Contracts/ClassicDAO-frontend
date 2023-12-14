import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getPercentage, getTimeText } from "../renderUtils";
import "../../../assets/styles/governance.css";

export default function ProposalCard({ proposalInfo, proposalID }) {
  const { title, proposer, status, startsIn, endsIn, options } = proposalInfo;
  const currentDateObj = new Date();
  const currentDate = currentDateObj.getTime() / 1000;
  const proposalCreationDate = new Date(
    Math.floor((startsIn - 1 * 24 * 60 * 60) * 1000)
  );

  const sortedOptions = Object.keys(options).sort((a, b) => {
    return proposalInfo.options[b] - proposalInfo.options[a];
  });

  const renderCreationDate = () => {
    return (
      <>
        {`${
          proposalCreationDate.getMonth() + 1
        }-${proposalCreationDate.getDate()}-${
          proposalCreationDate.getYear() - 100
        }`}
      </>
    );
  };

  return (
    <div className="proposalCard">
      <div className="cardTop">
        <span className="cardTopLeft">
          <img src="/img/icons8-avatar-48.png" alt="proposer-img"></img>
          <span className="cardTopName">{proposer}</span>
        </span>

        <span className={`statusBadge badge${status}`}>{status}</span>
      </div>

      <div className="cardContent">
        <span>{title}</span>

        <div className={"optionHolder"}>
          {sortedOptions.length === 2 ? (
            sortedOptions.map((option) => {
              const originalIndex = Object.keys(options).indexOf(option);

              return (
                <div key={option} className="option-box">
                  <span className="option-name"> {option} </span>
                  <span className="votingPercentage">
                    {options[option] > 0
                      ? getPercentage(option, proposalInfo.options) + "%"
                      : "0%"}{" "}
                  </span>
                  <meter
                    id={`${option}`}
                    className={`voting-option-percentage-bar voting-option-percentage-bar-opt${
                      originalIndex + 1
                    }`}
                    value={getPercentage(
                      option,
                      proposalInfo.options
                    ).toString()}
                    max="100"
                  />
                </div>
              );
            })
          ) : (
            <>
              {sortedOptions.slice(0, 2).map((option) => {
                const originalIndex = Object.keys(options).indexOf(option);

                return (
                  <div key={option} className="option-box">
                    <span className="option-name"> {option} </span>
                    <span className="votingPercentage">
                      {options[option] > 0
                        ? getPercentage(option, proposalInfo.options) + "%"
                        : "0%"}{" "}
                    </span>
                    <meter
                      id={`${option}`}
                      className={`voting-option-percentage-bar voting-option-percentage-bar-opt${
                        originalIndex + 1
                      }`}
                      value={getPercentage(
                        option,
                        proposalInfo.options
                      ).toString()}
                      max="100"
                    />
                  </div>
                );
              })}
              <span className="moreButton"> . . . </span>
            </>
          )}
        </div>
      </div>

      <div className="cardBottom">
        <span className="cardBottomProposedOn">
          Proposed on <br />
          {renderCreationDate()}
        </span>

        <Link to={`/proposal/${proposalID}`} state={true}>
          <button className="detailsButton">View Details</button>
        </Link>

        <span className="timeText">
          {getTimeText(currentDate, startsIn, endsIn)}
        </span>
      </div>
    </div>
  );
}

ProposalCard.propTypes = {
  proposalInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    proposer: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    startsIn: PropTypes.number.isRequired,
    endsIn: PropTypes.number.isRequired,
    options: PropTypes.object,
  }).isRequired,
  proposalID: PropTypes.number.isRequired,
};
