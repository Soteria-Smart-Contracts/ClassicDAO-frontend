import { returnContractAddress } from "../../hooks/interactions/utils";
import { renderCoreFunctionParamInputs } from "./renderUtils";

export const sendTx = (
  _contractCall,
  _verifyTx,
  _contractToBeCalled,
  _proposalFunc,
  _args,
  _toast,
  _stateSettersArray
) => {
  const [setIsLoading] = _stateSettersArray;
  console.log(_args);
  return new Promise((resolve, reject) => {
    _contractCall(
      _contractToBeCalled,
      returnContractAddress(_contractToBeCalled),
      _proposalFunc,
      _args
    )
      .then((result) => {
        if (result.success) {
          _toast("tx sent");

          _verifyTx(result.hash).then((status) => {
            switch (status) {
              case 0:
                _toast("failure");
                setIsLoading(false);
                resolve(false);
                break;

              case 1:
                _toast("success");
                setIsLoading(false);
                resolve(true);
                break;

              default:
                setIsLoading(false);
                resolve(false);
                break;
            }
          });
        } else {
          setIsLoading(false);
          _toast("failure");
          resolve(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        _toast("error");
        reject(error);
      });
  });
};

export const returnProposalType = (proposalTarget, proposalFunc) => {
  let proposalTypeNumber;
  let simpleProposalType;

  switch (proposalTarget) {
    case "Treasury":
    case "Core":
    case "Voting":
    case "Sales":
      proposalTypeNumber = 0;
      break;

    case "Eros":
      proposalTypeNumber = 1;
      break;

    case "Proxy":
      proposalTypeNumber = 2;
      break;

    default:
      break;
  }

  switch (proposalFunc) {
    case "sendAsset":
    case "sendEther":
      simpleProposalType = 1;
      break;

    case "registerAsset":
      simpleProposalType = 2;
      break;

    case "changeRegisteredAssetLimit":
      simpleProposalType = 3;
      break;

    case "replaceTreasury":
      simpleProposalType = 4;
      break;

    case "replaceVoting":
      simpleProposalType = 5;
      break;

    case "replaceCore":
      simpleProposalType = 6;
      break;

    case "createSale":
      simpleProposalType = 7;
      break;

    case "changeProposalCost":
      simpleProposalType = 8;
      break;

    case "changeSaleFoundationFee":
      simpleProposalType = 9;
      break;

    case "changeSaleRetractFee":
      simpleProposalType = 10;
      break;

    case "changeSaleMinimumDeposit":
      simpleProposalType = 11;
      break;

    case "changeSaleDefaultSaleLength":
      simpleProposalType = 12;
      break;

    case "changeSaleMaxSalePercent":
      simpleProposalType = 13;
      break;

    case "changeQuorum":
      simpleProposalType = 14;
      break;

    default:
      break;
  }

  return { proposalTypeNumber, simpleProposalType };
};

export const returnSimpleProposalParameters = (
  isItToSendEther,
  _proposalFuncParams,
  simpleProposalType
) => {
  const newArray = [..._proposalFuncParams];

  switch (simpleProposalType) {
    case 1: // SendAssets
      newArray[4] = isItToSendEther ? 0 : newArray[1];
      newArray[1] = 0;
      newArray[2] = isItToSendEther ? _proposalFuncParams[1] * 10 ** 18 : 0;
      newArray[3] = isItToSendEther ? 0 : _proposalFuncParams[2] * 10 ** 18;
      break;

    case 2: // RegisterTreasuryAsset
      newArray[1] = 2; // todo check this with the treasury
      newArray.push(0, 0, 0);
      break;

    case 3: // ChangeRegisteredAssetLimit
      newArray[1] = Number(newArray[0]);
      newArray[0] = "0x0000000000000000000000000000000000000000";
      newArray.push(0, 0, 0);
      break;

    case 4: // ReplaceTreasury
    case 5: // ReplaceVoting
    case 6: // ReplaceCore
      newArray.push(0, 0, 0, 0);
      break;

    case 7: // StartPublicSale
      newArray[1] = 0;
      newArray[2] = 0;
      newArray[3] = Number(newArray[0] * 10 ** 18);
      newArray[0] = "0x0000000000000000000000000000000000000000";
      newArray.push(0);
      break;

    case 8: // ChangeProposalCost
    case 9: // ChangeSaleFoundationFee RequestedEtherAmount in BP
    case 10: // ChangeSaleRetractFee RequestedEtherAmount in BP
    case 11: // ChangeSaleMinimumDeposit
    case 12: // ChangeSaleDefaultSaleLength RequestedEtherAmount in seconds
    case 13: // ChangeSaleMaxSalePercent RequestedEtherAmount in BP
    case 14: // ChangeQuorum RequestedEtherAmount in BP
      if (simpleProposalType === 8) {
        newArray[2] = Number(newArray[0]) * 10 ** 18;
      } else if (simpleProposalType === 12) {
        newArray[2] = Number(newArray[0]) * 86400;
      } else {
        newArray[2] = Number(newArray[0]);
      }

      newArray[1] = 0;
      newArray[0] = "0x0000000000000000000000000000000000000000";
      newArray.push(0, 0);
      break;

    default:
      break;
  }

  return newArray;
};

export { returnContractAddress, renderCoreFunctionParamInputs };
