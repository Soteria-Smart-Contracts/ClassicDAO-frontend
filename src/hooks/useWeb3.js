import { useContext } from "react";
import { Web3Context } from "./providers";

export function useWeb3() {
  const context = useContext(Web3Context);

  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Providers");
  }

  return context;
}

export const isValidChain = (chain) => {
  switch (chain) {
    case 61: // ETC mainnet
    case "0x3d":
    case "61":
    case 63: // ETC mordor testnet
    case "0x3f":
    case "63":
    case 5: // Goerli
    case "0x5":
    case "5":
    case 11155111: // Sepolia
    case "0xaa36a7":
    case "111551115":
      return true;

    default:
      return false;
  }
};
