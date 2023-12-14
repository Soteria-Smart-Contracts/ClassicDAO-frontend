import PropTypes from "prop-types";
import "./filters.css";

export default function TypesDropdown({ isOpen, toggleOpenDropdown }) {
  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        id="types"
        onClick={() => toggleOpenDropdown("types")}
      >
        Types <span className="arrow-down">&#x25BE;</span>
      </button>
      {isOpen && (
        <ul className="dropdown-content">
          <li>Protocol</li>
          <li>Economic</li>
          <li>Community</li>
        </ul>
      )}
    </div>
  );
}

TypesDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleOpenDropdown: PropTypes.func.isRequired,
};
