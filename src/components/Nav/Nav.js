import React from "react";
import "./Nav.css";

const Nav = ({ status, onRouteChange }) => {
  if (status) {
    return (
      <nav>
        <p className="pointer" onClick={() => onRouteChange("signout")}>
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav>
        <p className="pointer" onClick={() => onRouteChange("signin")}>
          Sign In
        </p>
        <p className="pointer" onClick={() => onRouteChange("register")}>
          Register
        </p>
      </nav>
    );
  }
};
export default Nav;
