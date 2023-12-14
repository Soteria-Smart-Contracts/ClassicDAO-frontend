import PropTypes from "prop-types";
import { useState } from "react";
import { useWeb3, isValidChain } from "../../../hooks/useWeb3";
import SortByDateDropdown from "./SortByDateDropdown";
import StatusDropdown from "./StatusDropdown";
import TypesDropdown from "./TypesDropdown";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

export default function FilterBar(props) {
  const { data } = useWeb3();

  const [openDropdown, setOpenDropdown] = useState("");

  const ref = useOutsideClick(() => {
    setOpenDropdown("");
  });

  const toggleOpenDropdown = (type) => {
    setOpenDropdown(type === openDropdown ? "" : type);
  };

  const returnButtonContent = () => {
    if (data.connected) {
      if (isValidChain(data.chain)) {
        return (
          <>
            CREATE
            <br />
            PROPOSAL
          </>
        );
      } else {
        return (
          <>
            Unsupported <br /> Network
          </>
        );
      }
    } else {
      return (
        <>
          Not <br /> Connected
        </>
      );
    }
  };

  return (
    <div className="filterBar">
      <div className="near-filter-bar" ref={ref}>
        <StatusDropdown
          isOpen={openDropdown === "status"}
          toggleOpenDropdown={toggleOpenDropdown}
        />
        <TypesDropdown
          isOpen={openDropdown === "types"}
          toggleOpenDropdown={toggleOpenDropdown}
        />
        <SortByDateDropdown
          isOpen={openDropdown === "sortByDate"}
          toggleOpenDropdown={toggleOpenDropdown}
        />

        <span>
          <input
            type="checkbox"
            id="votedOnly"
            name="voted_only"
            value="Voted Only"
          />
          <label htmlFor="votedOnly">Voted Only</label>
        </span>
      </div>

      <button
        onClick={props.toggleModal}
        className={`create-proposal-button-governance ${
          isValidChain(data?.chain) ? "" : "unsupported"
        }`}
        disabled={!data.connected || !isValidChain(data?.chain)}
      >
        {returnButtonContent()}
      </button>
    </div>
  );
}

FilterBar.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
