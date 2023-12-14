export const TreasuryABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "CLDamount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "From",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "To",
        type: "address",
      },
    ],
    name: "AssetClaim",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "CLDAddress",
    outputs: [
      {
        internalType: "address",
        name: "CLD",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "NewLimit",
        type: "uint8",
      },
    ],
    name: "ChangeRegisteredAssetLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "CLDamount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "AssetID",
        type: "uint8",
      },
    ],
    name: "GetBackingValueAsset",
    outputs: [
      {
        internalType: "uint256",
        name: "AssetBacking",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "CLDamount",
        type: "uint256",
      },
    ],
    name: "GetBackingValueEther",
    outputs: [
      {
        internalType: "uint256",
        name: "EtherBacking",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "TokenAddress",
        type: "address",
      },
    ],
    name: "IsRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "AssetID",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReceiveRegisteredAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "slot",
        type: "uint8",
      },
    ],
    name: "RegisterAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "RegisteredAssetLimit",
    outputs: [
      {
        internalType: "uint8",
        name: "Limit",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "AssetID",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "TransferERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
    ],
    name: "TransferETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "CLDamount",
        type: "uint256",
      },
    ],
    name: "UserAssetClaim",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
