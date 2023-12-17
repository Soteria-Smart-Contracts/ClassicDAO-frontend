import { getProposals, getProposalData } from "../hooks/interactions/utils";

export async function proposalLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  // todo this needs to pull proposals from the blockchain
  const rawInfo = await getProposals();
  const rawProposals = rawInfo;
  const filteredProposals = rawInfo.filter(
    (proposal) =>
      proposal.title.toLowerCase().includes(q?.toLowerCase()) ||
      proposal.content.toLowerCase().includes(q?.toLowerCase())
  );

  const proposals = q != null ? filteredProposals : rawProposals;

  return { proposals, q };
}

export async function individualProposalLoader({ params }) {
  const proposal = await getProposalData(params.proposalID);
  const proposalID = params.proposalID;

  return {
    // proposal
    proposalID,
  };
}
