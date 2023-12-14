import { ERC20ABI, CoreABI, VotingABI, TreasuryABI } from "../../assets/abi";
import { testProposals } from "../../assets/testInfo";

export function returnABI(contractToCall) {
  switch (contractToCall) {
    case "ERC20":
    case "CLD":
      return ERC20ABI;

    case "Core":
      return CoreABI;

    case "Voting":
      return VotingABI;

    case "Treasury":
      return TreasuryABI;

    default:
      break;
  }
}

export function returnContractAddress(contractToCall) {
  switch (contractToCall) {
    // todo change these on deploy
    case "Core":
      return "0xE6667b8f8FC9ABAAa3100aB2F76827D1A7973A93";

    case "CLD":
      return "0x5D08FC99cf526EC21ae44fA3471E88362000319D";

    case "Treasury":
      return "0x7Df709cc477ba79ada138B23E1bf6CceadB65370";

    case "Voting":
      return "0x4EE21D18c946e688CAd7cB2E0A33aaCA83A11579";

    case "Sales":
      return "0x4F3D472947B7F944603BD8967a29F4E6C9cd2a85";

    default:
      return "";
  }
}

export const getTokenDecimals = async (_viewInContract, tokenAddress) => {
  const targetDecimals = await _viewInContract(
    "ERC20",
    tokenAddress,
    "decimals",
    []
  );

  return Number(targetDecimals); //.toLocaleString();
};

export const getTokenBalance = async (
  _viewInContract,
  tokenAddress,
  targetAddress
) => {
  const targetBalance = await _viewInContract(
    "ERC20",
    tokenAddress,
    "balanceOf",
    [targetAddress]
  );

  return targetBalance;
};

export const getAllowance = async (
  _viewInContract,
  tokenAddress,
  userAddress,
  targetAddress
) => {
  const targetAllowance = await _viewInContract(
    "ERC20",
    tokenAddress,
    "allowance",
    [userAddress, targetAddress]
  );

  const formattedAllowance = Number(targetAllowance);

  return parseFloat(formattedAllowance / 10 ** Number(18)); //.toLocaleString();
};

export const getProposals = async () => {
  const proposals = testProposals;

  return proposals;
};

export const getProposalData = async (proposalID) => {
  const proposals = await getProposals();

  return proposals[proposalID];
};

export const ethUSDPrice = async () => {
  const rawResponse = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=ETC&tsyms=USD`
  );
  const rawPriceData = await rawResponse.json();

  return rawPriceData.USD;
};

export const cleanAddress = (_address, n, i) => {
  if (typeof _address === "string") {
    let firstHalf = _address.slice(0, n);
    let secondHalf = _address.slice(i);

    return firstHalf + "..." + secondHalf;
  } else {
    return "";
  }
};
