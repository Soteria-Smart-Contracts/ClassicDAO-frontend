import PropTypes from "prop-types";
import { useWeb3 } from "../../../hooks/useWeb3";
import toast from "react-hot-toast";
import {
  sendTx,
  returnProposalType,
  returnSimpleProposalParameters,
  returnContractAddress,
} from "../utils";

const CreateProposalButton = (props) => {
  const { data, setter, functions } = useWeb3();

  const { proposalForm, isLoading, setIsLoading } = props;
  const hasValidAllowance =
    BigInt(data.userInfo.cldCoreAllowance) >=
    BigInt(data.coreInfo.proposalCostInCLD);
  const hasEnoughCLD =
    BigInt(Number(data.userInfo.cldBalance) / 10 ** 18) >=
    BigInt(data.coreInfo.proposalCostInCLD);

  const isProposalFormInvalid = () => {
    const basisPointsBasedProposals = [
      "changeSaleFoundationFee",
      "changeSaleRetractFee",
      "changeSaleMaxSalePercent",
      "changeQuorum",
    ];

    if (
      basisPointsBasedProposals.includes(proposalForm.proposalFunc) &&
      proposalForm.proposalFuncParams[0] > 10000
    ) {
      return true;
    }

    for (const key in proposalForm) {
      if (
        Object.hasOwn(proposalForm, key) &&
        key !== "options" &&
        key !== "proposalFuncParams"
      ) {
        if (proposalForm[key].length === 0 || proposalForm[key] === "") {
          return true;
        }
      }

      if (key === "proposalFuncParams" && proposalForm[key].length === 0) {
        return true;
      }
    }

    for (const option of proposalForm.options) {
      if (option.editing) {
        return true;
      }
    }

    return false;
  };

  const handleApproveTokens = () => {
    sendTx(
      functions.contractCall,
      functions.verifyTx,
      "CLD",
      "approve",
      [
        returnContractAddress("Core"),
        BigInt(Number(data.coreInfo.proposalCostInCLD) * 10 ** 18),
      ],
      toast,
      [setIsLoading]
    ).then((successful) => {
      if (successful) {
        console.log("hiehie");
        setter((prevState) => ({
          ...prevState,
          userInfo: {
            ...prevState.userInfo,
            cldCoreAllowance: data.coreInfo.proposalCostInCLD,
          },
        }));
      }
    });
  };

  const renderButtonContent = () => {
    let buttonText;

    if (isProposalFormInvalid()) {
      buttonText = "Invalid\nproposal content";
    } else {
      buttonText = "Create";
    }

    if (!hasEnoughCLD) {
      buttonText = "Not enough\n CLD tokens";
    }

    if (!hasValidAllowance) {
      buttonText = "Approve\nproposal cost";
    }

    if (isLoading) {
      buttonText = "Loading...";
    }

    return buttonText;
  };

  const handleCreateProposalClick = () => {
    // todo integrate this
    //if (window.confirm("Are you sure the proposal data is correct?")) {
    //if (window.confirm("Are you ABSOLUTELY sure the data is correct?")) {
    setIsLoading(true);

    const calculateSecondsDifference = () => {
      const currentDateString = new Date();

      const endDate = new Date(proposalForm.proposalEndsIn);

      const currentDateInSeconds = Math.floor(
        currentDateString.getTime() / 1000
      );
      const endDateInSeconds = Math.floor(endDate.getTime() / 1000);

      const secondsDifference = endDateInSeconds - currentDateInSeconds;

      return secondsDifference;
    };

    const { proposalTypeNumber, simpleProposalType } = returnProposalType(
      proposalForm.proposalTarget,
      proposalForm.proposalFunc
    );

    const proposalFormToSend = {
      // todo integrate this
      ...proposalForm,
      proposalEndsIn: calculateSecondsDifference(),
      options: ["Yes", "No"],
      proposalFuncParams: returnSimpleProposalParameters(
        proposalForm.proposalFunc === "sendEther",
        proposalForm.proposalFuncParams,
        simpleProposalType
      ),
    };

    delete proposalFormToSend["proposalTarget"];

    if (
      proposalForm.proposalTarget === "eros" ||
      proposalForm.proposalTarget === "proxy"
    ) {
      proposalFormToSend["multi"] = proposalForm.options.map(
        (option) => option.text
      );
    }

    console.log(JSON.stringify(proposalFormToSend));

    switch (proposalTypeNumber) {
      case 0:
        sendTx(
          functions.contractCall,
          functions.verifyTx,
          "Core",
          "SubmitSimpleProposal",
          [
            // We send the whole JSON to display it later
            JSON.stringify(proposalFormToSend), // 0 memo
            proposalFormToSend.proposalFuncParams[0], // 1 AddressSlot
            proposalFormToSend.proposalFuncParams[1], // 2 UintSlot
            simpleProposalType, // 3 SimpleType
            proposalFormToSend.proposalEndsIn, // 4 VotingLength
            proposalFormToSend.proposalFuncParams[2], // 5 RequestedEther
            proposalFormToSend.proposalFuncParams[3], // 6 RequestedAssetAmount
            proposalFormToSend.proposalFuncParams[4], // 7 RequestedAssetID
          ],
          toast,
          [setIsLoading]
        );
        break;

      case 1:
        console.log("eros proposal!");
        break;

      case 2:
        console.log("proxy proposal!");
        break;

      default:
        break;
    }

    //toast(`New proposal named: ${proposalForm.proposalTitle} created`);
    //}
    //}
  };

  return (
    <input
      type="button"
      className={
        hasEnoughCLD && hasValidAllowance
          ? ""
          : "create-proposal-modal-create-button"
      }
      value={renderButtonContent()}
      onClick={
        hasValidAllowance && !isProposalFormInvalid()
          ? handleCreateProposalClick
          : handleApproveTokens
      }
      disabled={hasEnoughCLD && hasValidAllowance && isProposalFormInvalid()}
    />
  );
};

CreateProposalButton.propTypes = {
  proposalForm: PropTypes.shape({
    proposalTitle: PropTypes.string.isRequired,
    proposalDetails: PropTypes.string.isRequired,
    proposalFunc: PropTypes.string.isRequired,
    proposalTarget: PropTypes.string.isRequired,
    proposalContractAdd: PropTypes.string.isRequired,
    proposalEndsIn: PropTypes.string.isRequired,
    proposalFuncParams: PropTypes.array,
    options: PropTypes.array,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default CreateProposalButton;
