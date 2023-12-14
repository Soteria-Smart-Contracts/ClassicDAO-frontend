export const CoreABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FallbackToTreasury",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "NewTreasury",
        type: "address",
      },
    ],
    name: "NewTreasurySet",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
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
        internalType: "uint256",
        name: "ProposalID",
        type: "uint256",
      },
    ],
    name: "ExecuteProposal",
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
    name: "FoundationAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "InitialContractsSet",
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
    inputs: [],
    name: "InitialSetter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IsActiveContract",
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
    inputs: [],
    name: "LatestSale",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MRIdentifier",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ProposalCost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "ProposalInfos",
    outputs: [
      {
        internalType: "string",
        name: "Memo",
        type: "string",
      },
      {
        internalType: "enum Winslow_Core_V1.ProposalTypes",
        name: "ProposalType",
        type: "uint8",
      },
      {
        internalType: "enum Winslow_Core_V1.SimpleProposalTypes",
        name: "SimpleType",
        type: "uint8",
      },
      {
        internalType: "enum Winslow_Core_V1.ProposalStatus",
        name: "Status",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "VotingInstanceID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ProposalVotingLength",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "Proposals",
    outputs: [
      {
        internalType: "address",
        name: "AddressSlot",
        type: "address",
      },
      {
        internalType: "enum Winslow_Core_V1.SecurityStatus",
        name: "SecurityLevel",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "RequestedEtherAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "RequestedAssetAmount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "RequestedAssetID",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "OptionsAvailable",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "Multi",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "Executed",
        type: "bool",
      },
      {
        internalType: "address",
        name: "Proposer",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SaleActive",
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
    inputs: [],
    name: "SaleCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SaleFactoryContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "Sales",
    outputs: [
      {
        internalType: "address",
        name: "SaleContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "CLDSaleAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "StartTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EndTime",
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
        name: "_TreasuryAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_VotingAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_SaleFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_FoundationAddress",
        type: "address",
      },
    ],
    name: "SetInitialContracts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "ProposalAddress",
        type: "address",
      },
    ],
    name: "SubmitErosProposal",
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
    inputs: [
      {
        internalType: "string",
        name: "Memo",
        type: "string",
      },
      {
        internalType: "address",
        name: "Slot",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "VotingLength",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "RequestedEther",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "RequestedAssetAmount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "RequestedAssetID",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "FunctionSelector",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "UnsignedInt1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "UnsignedInt2",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "UnsignedInt3",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "Address1",
            type: "address",
          },
          {
            internalType: "address",
            name: "Address2",
            type: "address",
          },
          {
            internalType: "address",
            name: "Address3",
            type: "address",
          },
          {
            internalType: "bool",
            name: "Bool1",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "Bool2",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "Bool3",
            type: "bool",
          },
        ],
        internalType: "struct Winslow_Core_V1.ProxyProposalArguments",
        name: "ProxyArguments",
        type: "tuple",
      },
    ],
    name: "SubmitProxyProposal",
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
    inputs: [
      {
        internalType: "string",
        name: "Memo",
        type: "string",
      },
      {
        internalType: "address",
        name: "AddressSlot",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "UintSlot",
        type: "uint256",
      },
      {
        internalType: "enum Winslow_Core_V1.SimpleProposalTypes",
        name: "SimpleType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "VotingLength",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "RequestedEther",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "RequestedAssetAmount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "RequestedAssetID",
        type: "uint8",
      },
    ],
    name: "SubmitSimpleProposal",
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
    name: "TreasuryContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VotingContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
