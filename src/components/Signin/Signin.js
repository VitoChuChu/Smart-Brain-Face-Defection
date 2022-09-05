import React from "react";
import "./Signin.css";

const Signin = ({ onRouteChange }) => {
  return (
    <div className="contanier cc">
      <div className="tableOutline cc shadow rounded">
        <h3>Sign In</h3>
        <label htmlFor="email">Email</label>
        <input className="accountInput" type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input
          className="accountInput "
          type="password"
          name="password"
          id="password"
        />
        <div className="p-3">
          <input
            className="p-1 px-3 accountBut"
            type="submit"
            value="Sign In"
            onClick={() => onRouteChange("home")}
          />
          <p className="p-2 pointer" onClick={() => onRouteChange("register")}>
            Register
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signin;
