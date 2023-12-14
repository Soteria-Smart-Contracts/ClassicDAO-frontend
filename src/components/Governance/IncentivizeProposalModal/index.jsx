import PropTypes from "prop-types";
//import { useWeb3 } from "../../../hooks/useWeb3";
import toast from "react-hot-toast";

export default function IncentivizeProposalModal(props) {
  const { isOpen, proposalInfo, handleOpenIncentivizeModalClick } = props;
  //const { data } = useWeb3();

  const handleSendTokensClick = () => {
    handleOpenIncentivizeModalClick();

    setTimeout(() => {
      toast(`Sent ${"XXXXX"} tokens`);
    }, 1500);
  };

  return (
    <dialog className="incentivize-proposal">
      {isOpen && (
        <>
          <div>
            <div className="proposalHeader incentivize-modal-header">
              <button
                className="close-button"
                onClick={handleOpenIncentivizeModalClick}
              >
                X
              </button>
              <span className={`proposal-name`}>{proposalInfo.title}</span>
            </div>
          </div>

          <div className="select-tokens-area">
            <h3>You are holding XXXXX CLD tokens</h3>

            <div className="token-input">
              <label htmlFor="tempB">
                Choose a token amount to incentivize:
              </label>
              <br />
              <input type="range" id="tempB" name="temp" list="values" />
              <datalist id="values">
                <option value="0" label="0" />
                <option value="25" label="25" />
                <option value="50" label="50" />
                <option value="75" label="75" />
                <option value="100" label="100" />
              </datalist>
              <input type="number" step="0.01" min="0" max="10"></input>
            </div>

            <div className="options-buttons">
              <button onClick={handleSendTokensClick}>Send</button>

              <button onClick={handleOpenIncentivizeModalClick}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}

IncentivizeProposalModal.propTypes = {
  proposalInfo: PropTypes.shape({
    title: PropTypes.string,
    proposer: PropTypes.string,
    status: PropTypes.string,
    content: PropTypes.string,
    startsIn: PropTypes.number,
    endsIn: PropTypes.number,
    options: PropTypes.object,
    multi: PropTypes.object,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleOpenIncentivizeModalClick: PropTypes.func.isRequired,
};
