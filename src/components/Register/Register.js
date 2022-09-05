import React from "react";
import "./Register.css";

const Register = ({ onRouteChange }) => {
  return (
    <div className="contanier cc">
      <div className="tableOutline cc shadow rounded">
        <h3>Register</h3>
        <label htmlFor="Name">Name</label>
        <input
          className="accountInput"
          type="text"
          name="Name"
          id="registerName"
        />
        <label htmlFor="email">Email</label>
        <input
          className="accountInput"
          type="email"
          name="email"
          id="registerEmail"
        />
        <label htmlFor="password">Password</label>
        <input
          className="accountInput"
          type="password"
          name="password"
          id="regosterPassword"
        />
        <div className="p-3">
          <input
            className="p-1 px-3 accountBut"
            type="submit"
            value="Register"
            onClick={() => onRouteChange("home")}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
