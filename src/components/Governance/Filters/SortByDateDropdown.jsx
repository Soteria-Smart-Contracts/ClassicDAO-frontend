import PropTypes from "prop-types";
import "./filters.css";

export default function SortByDateDropdown({ isOpen, toggleOpenDropdown }) {
  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle sortbydate"
        id="sortByDate"
        onClick={() => toggleOpenDropdown("sortByDate")}
      >
        Sort by date <span className="arrow-down">&#x25BE;</span>
      </button>
      {isOpen && (
        <ul className="dropdown-content">
          <li>Recent first</li>
          <li>Oldest first</li>
        </ul>
      )}
    </div>
  );
}

SortByDateDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleOpenDropdown: PropTypes.func.isRequired,
};
