import { useState, useEffect } from "react";
import { useWeb3 } from "../../../hooks/useWeb3";
import {
  getTokenBalance,
  getAllowance,
  returnContractAddress,
} from "../../../hooks/interactions/utils";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import "./web3button.css";

export default function Web3Button() {
  const { data, setter, functions } = useWeb3();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data.address != "") {
      const cldBalancePromise = getTokenBalance(
        functions.viewInContract,
        returnContractAddress("CLD"),
        data.address
      );

      const cldCoreAllowancePromise = getAllowance(
        functions.viewInContract,
        returnContractAddress("CLD"),
        data.address,
        returnContractAddress("Core")
      );

      const proposalCostPromise = functions.viewInContract(
        "Core",
        returnContractAddress("Core"),
        "ProposalCost",
        []
      );

      const treasuryAssetCountPromise = functions.viewInContract(
        "Treasury",
        returnContractAddress("Treasury"),
        "RegisteredAssetLimit",
        []
      );

      Promise.all([
        // Pull basic info from the blockchain
        cldBalancePromise,
        cldCoreAllowancePromise,
        proposalCostPromise,
        treasuryAssetCountPromise,
      ]).then(
        ([
          cldBalance,
          useCLDCoreAllowance,
          proposalCostAmount,
          treasuryAssetCount,
        ]) => {
          setter((prevState) => ({
            ...prevState,
            userInfo: {
              cldBalance: cldBalance.toString(), //toString() we can manipulate it later
              cldCoreAllowance: useCLDCoreAllowance.toString(),
            },
            coreInfo: {
              proposalCostInCLD: (
                Number(proposalCostAmount) /
                10 ** 18
              ).toString(),
              treasuryAssetNumber: Number(treasuryAssetCount),
            },
          }));
        }
      );
    }
  }, [data.address]);

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  function handleConnectClick() {
    if (typeof window.ethereum === "undefined") {
      alert("Metamask not installed!");
    } else {
      functions.reqPermissions();
    }
  }

  function handleDisconnectClick() {
    setter({ ...data, address: "", connected: false });
    setIsOpen(false);
  }

  const returnButtonMessage = () => {
    const cldAmount = parseFloat(
      Number(data.userInfo.cldBalance) / 10 ** Number(18)
    );

    if (data.connected) {
      switch (data.chain) {
        case 61: // ETC mainnet
        case "0x3d":
        case "61":
        case 5: // Goerli
        case "0x5":
        case "5":
        case 11155111: // Sepolia
        case "0xaa36a7":
        case "111551115":
          return (
            <div className="dropdown" ref={ref}>
              <button className={"web3"} onClick={() => setIsOpen(!isOpen)}>
                <span className="address">ADDRESS</span> <br />
                <span className="balance">
                  BALANCE:{" "}
                  {isNaN(cldAmount) ? "Checking..." : `${cldAmount} CLD`}{" "}
                </span>
              </button>
              {isOpen && (
                <ul className="dropdown-content web3-button-dropdown-content">
                  {/* Future profile page?
                  <button onClick={() => navigate('/profile')}>Profile</button>
                  */}
                  <button onClick={handleDisconnectClick}>Disconnect</button>
                </ul>
              )}
            </div>
          );

        default:
          return (
            <button
              className={"web3 unsupported-network"}
              onClick={handleDisconnectClick}
            >
              <span className="unsupported-network">
                Unsupported <br /> Network
              </span>
            </button>
          );
      }
    } else {
      return (
        <button className={"web3"} onClick={handleConnectClick}>
          CONNECT
        </button>
      );
    }
  };

  return returnButtonMessage();
}
