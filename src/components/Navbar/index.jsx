import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import Web3Button from "./Web3Button";
import Logo from "../../assets/Logo";
import "./navbar.css";

export default function Navbar({ proposals, q, populateProposals }) {
  const [active, setActive] = useState(false);
  let currentLocation = useLocation();

  const links = [
    {
      title: "Governance",
      location: "governance",
    },
    {
      title: "Treasury",
      location: "treasury",
    },
  ];

  const returnLinks = () => {
    const linkElements = links.map(({ title, location }) => {
      return (
        <Link
          className={
            currentLocation.pathname === `/${location}`
              ? "link selectedLink"
              : "link"
          }
          key={title}
          to={`/${location}`}
        >
          {title}
        </Link>
      );
    });

    return linkElements;
  };

  return (
    <>
      <nav className="bar">
        <img
          src="/bars-solid.svg"
          className="hamburger-menu-bars"
          onClick={() => setActive(!active)}
          onKeyDown={() => setActive(!active)}
          alt="burger-menu"
          title="mobile-menu"
        />

        <div className="linkHolder">
          <Link to="/" className="homeIcon">
            <Logo isLandingPage={currentLocation.pathname === "/"} />
          </Link>

          {returnLinks()}
        </div>

        <div className="search-container">
          <SearchBar source={proposals} q={q} />
        </div>

        <div className="web3-container">
          <Web3Button populateProposals={populateProposals} />
        </div>
      </nav>

      {active && (
        <div className="mobile-nav-menu">
          <Link
            className={
              currentLocation.pathname === "/" ? "link selectedLink" : "link"
            }
            to={`/`}
          >
            Home
          </Link>
          {returnLinks()}
          <SearchBar source={proposals} q={q} />
        </div>
      )}
    </>
  );
}

Navbar.propTypes = {
  proposals: PropTypes.array.isRequired,
  q: PropTypes.string,
  populateProposals: PropTypes.func.isRequired,
};
