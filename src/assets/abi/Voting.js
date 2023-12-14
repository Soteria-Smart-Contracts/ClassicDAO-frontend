export const VotingABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "DAOAddr",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "_ExecusCut",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_BurnCut",
        type: "uint8",
      },
    ],
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
        name: "NewAddress",
        type: "address",
      },
    ],
    name: "NewDAOAddress",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "donator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "VotingInstance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDonated",
        type: "uint256",
      },
    ],
    name: "ProposalIncentivized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "Voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "TotalSent",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "IncentiveShare",
        type: "uint256",
      },
    ],
    name: "TokensReturned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "Voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "VotingInstance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "option",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "votesCasted",
        type: "uint256",
      },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "BurnCut",
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
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "VotingInstance",
        type: "uint256",
      },
      {
        internalType: "enum Winslow_Voting_V1.Vote",
        name: "VoteChoice",
        type: "uint8",
      },
      {
        internalType: "enum Winslow_Voting_V1.MultiOptions",
        name: "OptionChoice",
        type: "uint8",
      },
    ],
    name: "CastMultiVote",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "VotingInstance",
        type: "uint256",
      },
      {
        internalType: "enum Winslow_Voting_V1.Vote",
        name: "VoteChoice",
        type: "uint8",
      },
    ],
    name: "CastVote",
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
        internalType: "address",
        name: "newAddr",
        type: "address",
      },
    ],
    name: "ChangeDAO",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "DAO",
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
        name: "VotingInstance",
        type: "uint256",
      },
    ],
    name: "EndVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "ExecutorCut",
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
        name: "VotingInstance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "IncentivizeProposal",
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
        internalType: "uint256",
        name: "ProposalID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "VotingLength",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "Multi",
        type: "bool",
      },
    ],
    name: "InitializeVoteInstance",
    outputs: [
      {
        internalType: "uint256",
        name: "VoteInstanceID",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "MultiVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "OptionOne",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "OptionTwo",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "OptionThree",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "OptionFour",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "OptionFive",
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
        name: "VotingInstance",
        type: "uint256",
      },
    ],
    name: "ReturnTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "NewExecCut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "NewBurnCut",
        type: "uint256",
      },
    ],
    name: "SetTaxAmount",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "VoterInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "VotesLocked",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "CLDReturned",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "Voted",
        type: "bool",
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
    name: "VotingInstances",
    outputs: [
      {
        internalType: "uint256",
        name: "ProposalID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "VoteStarts",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "VoteEnds",
        type: "uint256",
      },
      {
        internalType: "enum Winslow_Voting_V1.VoteStatus",
        name: "Status",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "TotalCLDVoted",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "MultiVote",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "YEAvotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "NAYvotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "TotalIncentive",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "IncentivePerVote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "CLDtoIncentive",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "CLDToBurn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "CLDToExecutioner",
        type: "uint256",
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
