import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ProposalCard, FilterBar, CreateProposalModal } from "../components";
import "../assets/styles/governance.css";

export default function Governance() {
  const [proposals] = useOutletContext();

  const [viewCreateProposalDialog, setViewCreateProposalDialog] =
    useState(false);

  const toggleCreateProposalModal = () => {
    setViewCreateProposalDialog(!viewCreateProposalDialog);
  };

  return (
    <div className="governanceMain">
      <div className="governanceHeader">
        <h1>Proposals</h1>
        <FilterBar toggleModal={toggleCreateProposalModal} />
      </div>

      <CreateProposalModal
        isOpen={viewCreateProposalDialog}
        toggleModal={toggleCreateProposalModal}
      />

      <div className="cardHolder">
        {proposals.length ? (
          proposals.map((_proposal, index) => {
            return (
              <ProposalCard
                key={_proposal.title}
                proposalInfo={_proposal}
                proposalID={index}
              />
            );
          })
        ) : (
          <>No proposals</>
        )}
      </div>
    </div>
  );
}
