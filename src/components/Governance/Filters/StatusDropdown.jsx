import PropTypes from "prop-types";
import "./filters.css";

export default function StatusDropdown({ isOpen, toggleOpenDropdown }) {
  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        id="status"
        onClick={() => toggleOpenDropdown("status")}
      >
        Status <span className="arrow-down">&#x25BE;</span>
      </button>
      {isOpen && (
        <ul className="dropdown-content">
          <li>Active</li>
          <li>Pending</li>
          <li>Passed</li>
          <li>Rejected</li>
        </ul>
      )}
    </div>
  );
}

StatusDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleOpenDropdown: PropTypes.func.isRequired,
};
