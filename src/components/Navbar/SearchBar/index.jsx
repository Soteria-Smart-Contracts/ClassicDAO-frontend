import PropTypes from "prop-types";
import { useState } from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { Form, useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ source, q }) => {
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState([]);

  const ref = useOutsideClick(() => {
    setResults([]);
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.length > 0) {
      const filteredResults = source.filter(
        (item) =>
          item.title.toLowerCase().includes(newQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(newQuery.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (result) => {
    const resultIndex = source.findIndex(
      (proposal) => proposal.title === result.title
    );
    navigate(`/proposal/${resultIndex}`);
    setQuery(result.title);
    setResults([]);
  };

  const handleSearchGlassClick = () => {
    const encodedQuery = encodeURIComponent(query);
    navigate(`/governance?q=${encodedQuery}`);
    setResults([]);
  };

  return (
    <Form
      className="search-bar-container"
      role="search"
      action="/governance"
      ref={ref}
    >
      <input
        name="q"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />
      <span
        className="search-icon"
        onClick={handleSearchGlassClick}
        onKeyDown={handleSearchGlassClick}
      >
        <svg
          className="svg-icon search-icon"
          aria-labelledby="title desc"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19.9 19.7"
          alt="search icon"
        >
          <title id="title">Search Icon</title>
          <desc id="desc">A magnifying glass icon.</desc>
          <g className="search-path" fill="none" stroke="#848F91">
            <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
            <circle cx="8" cy="8" r="7" />
          </g>
        </svg>
      </span>

      {results.length > 0 && (
        <div className="results-container">
          <h2>Results:</h2>
          <ul>
            {results.map((result) => (
              <button
                key={result.title}
                tabIndex={0}
                className="result-button"
                onClick={() => handleResultClick(result)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleResultClick(result);
                  }
                }}
              >
                <div>
                  <h3>{result.title}</h3>
                  <p>{result.content.slice(0, 32)}...</p>
                </div>
              </button>
            ))}
          </ul>
        </div>
      )}
    </Form>
  );
};

SearchBar.propTypes = {
  source: PropTypes.array.isRequired,
  q: PropTypes.string,
};

export default SearchBar;
