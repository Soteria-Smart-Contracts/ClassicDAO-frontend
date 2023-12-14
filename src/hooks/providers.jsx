import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import { returnABI } from "./interactions/utils";

export const Web3Context = createContext();

export function Web3Providers({ children }) {
  const [web3Data, setWeb3Data] = useState({
    connected: false,
    address: "",
    chain: 0,
    provider: {},
    userInfo: {
      cldBalance: "",
      cldCoreAllowance: "",
    },
    coreInfo: {
      proposalCostInCLD: "",
      treasuryAssetNumber: 0,
    },
  });

  function requestPermissions() {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((address) => {
        if (address.length > 0) {
          window.ethereum
            .request({
              method: "eth_chainId",
            })
            .then((chainID) => {
              setWeb3Data((prevState) => ({
                ...prevState,
                connected: true,
                address: address[0],
                chain: chainID,
                provider: new ethers.BrowserProvider(window.ethereum),
              }));
            });
        }
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Permissions needed to continue.");
        } else {
          console.error(error);
        }
      });
  }

  function handleChainChanged(_chainId) {
    // We recommend reloading the page, unless you must do otherwise.
    setWeb3Data({ ...web3Data, chain: _chainId });
  }

  if (typeof window !== "undefined" && window.ethereum) {
    window.ethereum.on("chainChanged", (_chainId) =>
      handleChainChanged(_chainId)
    );
  }

  const web3State = useMemo(() => {
    // NOTE Blockchain interactions
    async function executeContractCall(
      contractToCall,
      contractAddress,
      functionName,
      params
    ) {
      const abi = returnABI(contractToCall);
      const signer = await web3Data.provider.getSigner();

      const contrato = new ethers.Contract(contractAddress, abi, signer);
      try {
        const tx = await contrato[functionName](...params);
        return { success: true, hash: tx.hash };
      } catch (error) {
        console.log(error);
        return { success: false, error: error };
      }
    }

    async function verifyTxStatus(txHash) {
      let receipt = await web3Data.provider.getTransactionReceipt(txHash);

      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      while (!receipt) {
        await delay(5000);
        receipt = await web3Data.provider.getTransactionReceipt(txHash);
      }

      return receipt.status;
    }

    async function viewContractInfo(
      contractToCall,
      contractAddress,
      functionName,
      params
    ) {
      const abi = returnABI(contractToCall);
      const signer = await web3Data.provider.getSigner();

      const contrato = new ethers.Contract(contractAddress, abi, signer);
      try {
        const transaction = await contrato[functionName](...params);

        const receipt = await transaction;
        return receipt;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    // NOTE hook exports
    const functions = {
      reqPermissions: requestPermissions,
      contractCall: executeContractCall,
      viewInContract: viewContractInfo,
      verifyTx: verifyTxStatus,
    };

    return { data: web3Data, setter: setWeb3Data, functions };
  }, [web3Data]);

  return (
    <Web3Context.Provider value={web3State}>{children}</Web3Context.Provider>
  );
}

Web3Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
