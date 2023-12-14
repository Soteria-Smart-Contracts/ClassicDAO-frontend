import PropTypes from "prop-types";
import { useState } from "react";
// import { useWeb3 } from "../../../hooks/useWeb3";
import CreateProposalButton from "./CreateProposalButton";
import { returnContractAddress, renderCoreFunctionParamInputs } from "../utils";

export default function CreateProposalModal(props) {
  //const { data, functions } = useWeb3();
  const { isOpen, toggleModal } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    proposalTitle: "",
    proposalEndsIn: "",
    proposalDetails: "",
    proposalTarget: "Core",
    proposalContractAdd: "Core",
    proposalFunc: "",
    proposalFuncParams: [],
    options: [
      { text: "New option 1", editing: false, tempText: "" },
      { text: "New option 2", editing: false, tempText: "" },
    ],
  });

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split("T")[0];

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const handleAddOptionClick = () => {
    const index = proposalForm.options.length;

    setProposalForm((prevState) => ({
      ...prevState,
      options: [
        ...prevState.options,
        { text: `New option ${index + 1}`, editing: false },
      ],
    }));
  };

  const handleEditOptionClick = (e) => {
    const options = [...proposalForm.options];
    const selectedButtonIndex = options.findIndex(
      (option) => option.text === e.target.value
    );

    setProposalForm((prevState) => ({
      ...prevState,
      options: [
        ...prevState.options.slice(0, selectedButtonIndex),
        {
          ...prevState.options[selectedButtonIndex],
          editing: true,
          tempText: prevState.options[selectedButtonIndex].text,
        },
        ...prevState.options.slice(selectedButtonIndex + 1),
      ],
    }));
  };

  const handleOptionTextChange = (e) => {
    const newOptions = [...proposalForm.options];
    const selectedButtonIndex = newOptions.findIndex(
      (option) => option.text === e.target.name
    );
    newOptions[selectedButtonIndex] = {
      ...newOptions[selectedButtonIndex],
      tempText: e.target.value,
    };

    setProposalForm((prevState) => ({ ...prevState, options: newOptions }));
  };

  const handleSaveOptionTextClick = (e) => {
    const newOptions = [...proposalForm.options];
    const selectedButtonIndex = newOptions.findIndex(
      (option) => option.text === e.target.name
    );
    newOptions[selectedButtonIndex] = {
      text: newOptions[selectedButtonIndex].tempText,
      editing: false,
      tempText: "",
    };

    setProposalForm((prevState) => ({ ...prevState, options: newOptions }));
  };

  const handleRemoveOptionClick = (e) => {
    const newOptions = [...proposalForm.options].filter((option) => {
      return option.text != e.target.name;
    });

    setProposalForm((prevState) => ({ ...prevState, options: newOptions }));
  };

  const handleProposalDataChange = (e, index = 0) => {
    setProposalForm((prevState) => ({
      ...prevState,
      [e.target.className]: e.target.value,
    }));

    if (e.target.className === "proposalTarget") {
      setProposalForm((prevState) => ({
        ...prevState,
        proposalContractAdd: returnContractAddress(e.target.value),
        proposalFunc: "",
        proposalFuncParams: [],
      }));
    }

    if (e.target.className === "proposalFunc") {
      setProposalForm((prevState) => ({
        ...prevState,
        proposalFunc: e.target.value,
        proposalFuncParams: [],
      }));
    }

    if (e.target.className === "proposalFuncParams") {
      const updatedParams = [...proposalForm.proposalFuncParams];
      updatedParams[index] = e.target.value;
      setProposalForm((prevState) => ({
        ...prevState,
        proposalFuncParams: updatedParams,
      }));
    }
  };

  const renderContractOptionInputs = () => {
    let returnedInputs;

    const coreInputs = (
      <select
        name="proposalFunc"
        id="proposalFunc"
        className="proposalFunc"
        value={proposalForm.proposalFunc}
        onChange={handleProposalDataChange}
      >
        <option value="">Select a function</option>
        <option value="replaceTreasury">Replace Treasury</option>
        <option value="replaceVoting">Replace Voting</option>
        <option value="replaceCore">Replace Core</option>
        <option value="replaceSale">Replace Sale (missing in SC)</option>
      </select>
    );

    const treasuryInputs = (
      <select
        name="proposalFunc"
        id="proposalFunc"
        className="proposalFunc"
        value={proposalForm.proposalFunc}
        onChange={handleProposalDataChange}
      >
        <option value="">Select a function</option>
        <option value="sendAsset">Send asset</option>
        <option value="sendEther">Send ether</option>
        <option value="registerAsset">Register asset</option>
        <option value="changeRegisteredAssetLimit">
          Change Registered Asset Limit
        </option>
      </select>
    );

    const saleInputs = (
      <select
        name="proposalFunc"
        id="proposalFunc"
        className="proposalFunc"
        value={proposalForm.proposalFunc}
        onChange={handleProposalDataChange}
      >
        <option value="">Select a function</option>
        <option value="createSale">Start sale</option>
        <option value="changeSaleFoundationFee">
          Change Sales Foundation fee
        </option>
        <option value="changeSaleRetractFee">Change Sales Retract fee</option>
        <option value="changeSaleMinimumDeposit">
          Change Sales minimum deposit
        </option>
        <option value="changeSaleDefaultSaleLength">
          Change default Sale length
        </option>
        <option value="changeSaleMaxSalePercent">
          Change Sales max percent
        </option>
      </select>
    );

    const votingInputs = (
      <select
        name="proposalFunc"
        id="proposalFunc"
        className="proposalFunc"
        value={proposalForm.proposalFunc}
        onChange={handleProposalDataChange}
      >
        <option value="">Select a function</option>
        <option value="changeProposalCost">Change proposal cost</option>
        <option value="changeQuorum">Change default quorum</option>
      </select>
    );

    switch (proposalForm.proposalTarget) {
      case "Core":
        returnedInputs = coreInputs;
        break;

      case "Treasury":
        returnedInputs = treasuryInputs;
        break;

      case "Voting":
        returnedInputs = votingInputs;
        break;

      case "Sales":
        returnedInputs = saleInputs;
        break;

      default:
        break;
    }

    function capitalizeFirstLetter() {
      return (
        proposalForm.proposalTarget.charAt(0).toUpperCase() +
        proposalForm.proposalTarget.slice(1)
      );
    }

    return (
      <div style={{ display: "inline" }}>
        <label htmlFor="proposalFunc">
          Choose a {capitalizeFirstLetter()} function to execute:
        </label>{" "}
        <br />
        {returnedInputs}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <dialog open={isOpen} className="viewCreateProposal">
          <div className="proposalHeader">
            <button className="close-button" onClick={toggleModal}>
              X
            </button>

            <span className={`proposal-name`}> Create Proposal </span>
          </div>

          <form className="proposalform">
            <input
              label="Proposal title"
              type="text"
              placeholder="Title"
              className="proposalTitle"
              required
              onChange={handleProposalDataChange}
            />
            <input
              type="date"
              placeholder="Ends in"
              className="proposalEndsIn"
              onChange={handleProposalDataChange}
              min={minDateString}
              max={maxDateString}
            />

            <input
              label="Proposal details"
              type="text"
              placeholder="Your proposal details..."
              className="proposalDetails"
              required
              onChange={handleProposalDataChange}
            />

            <label htmlFor="targets">Choose a target contract:</label>
            <select
              name="targets"
              id="targets"
              className="proposalTarget"
              onChange={handleProposalDataChange}
            >
              <optgroup label="DAO Contracts">
                <option value="Core">Core</option>
                <option value="Treasury">Treasury</option>
                <option value="Sales">Sales</option>
                <option value="Voting">Voting</option>
              </optgroup>
              <optgroup label="External contracts">
                <option value="eros">Eros proposal</option>
                <option value="proxy">Proxy proposal</option>
              </optgroup>
            </select>

            {(proposalForm.proposalTarget === "eros" ||
              proposalForm.proposalTarget === "proxy") && (
              <>
                <input
                  label="Contract address"
                  type="text"
                  placeholder="Contract address"
                  className="proposalContractAdd"
                  // value={proposalForm.proposalContractAdd}
                  min="42"
                  max="42"
                  required
                  onChange={handleProposalDataChange}
                />

                <input
                  type="text"
                  placeholder="Function to be called"
                  className="proposalFunc"
                  required
                  onChange={handleProposalDataChange}
                />

                <input
                  type="text"
                  placeholder="Function parameters, separated by a comma"
                  className="proposalFuncParams"
                  required
                  onChange={handleProposalDataChange}
                />
              </>
            )}

            {proposalForm.proposalTarget != "eros" &&
              proposalForm.proposalTarget != "proxy" && (
                <div>
                  {renderContractOptionInputs()}

                  {renderCoreFunctionParamInputs(
                    proposalForm,
                    handleProposalDataChange
                  )}
                </div>
              )}

            <h4
              className={
                proposalForm.proposalTarget === "eros" ||
                proposalForm.proposalTarget === "proxy"
                  ? "multiOptionHeader"
                  : ""
              }
            >
              Voting options:
              {(proposalForm.proposalTarget === "eros" ||
                proposalForm.proposalTarget === "proxy") && (
                <div>
                  <input
                    type="button"
                    name="Yes"
                    value="Yes"
                    className="option-button-opt1"
                  />
                  <input
                    type="button"
                    name="No"
                    value="No"
                    className="option-button-opt2"
                  />
                </div>
              )}
            </h4>

            <div className="optionButtonsHolder">
              {proposalForm.proposalTarget === "eros" ||
              proposalForm.proposalTarget === "proxy" ? (
                <>
                  <span>
                    Click to <br /> edit
                  </span>
                  {proposalForm.options.map(
                    ({ text, editing, tempText }, index) => {
                      return editing ? (
                        <div
                          key={`${text} ${index + 1}`}
                          className="edit-proposal-option"
                        >
                          <input
                            type="text"
                            name={text}
                            value={tempText}
                            className="edit-proposal-option-text"
                            onChange={handleOptionTextChange}
                          />
                          <button
                            className="edit-proposal-option-button"
                            name={text}
                            onClick={handleSaveOptionTextClick}
                          >
                            Save
                          </button>
                          {proposalForm.options.length > 2 && (
                            <button
                              className="edit-proposal-option-button-delete"
                              name={text}
                              onClick={handleRemoveOptionClick}
                            >
                              -
                            </button>
                          )}
                        </div>
                      ) : (
                        <input
                          key={`${text} ${index + 1}`}
                          type="button"
                          className={`option-button-opt${index + 3}`}
                          name={text}
                          value={text}
                          onClick={handleEditOptionClick}
                        />
                      );
                    }
                  )}
                  <input
                    type="button"
                    value="+"
                    className={`addOptionButton`}
                    onClick={handleAddOptionClick}
                    disabled={proposalForm.options.length == 5}
                  />
                </>
              ) : (
                <>
                  <input
                    type="button"
                    name="Yes"
                    value="Yes"
                    className="option-button-opt1"
                  />

                  <input
                    type="button"
                    name="No"
                    value="No"
                    className="option-button-opt2"
                  />
                </>
              )}
            </div>

            <div className="modalFooter">
              <p>
                Proposing FAQ <br />
                <a>How to propose?</a>
              </p>

              <CreateProposalButton
                proposalForm={proposalForm}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          </form>
        </dialog>
      )}
    </>
  );
}

CreateProposalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
