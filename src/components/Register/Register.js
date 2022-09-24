import React, { useState } from "react";
import "./Register.css";

const Register = ({ onRouteChange, loadUser }) => {
  let [registerName, setRegisterName] = useState("");
  let [registerEmail, setRegisterEmail] = useState("");
  let [registerPassword, setRegisterPassword] = useState("");

  const onRegisterNameChange = (e) => {
    setRegisterName(e.target.value);
  };
  const onRegisterEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };
  const onRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };

  const onSubmitRegister = () => {
    fetch("https://smart-brain-backend-2022-09-24.herokuapp.com/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      }),
    })
      .then((resp) => resp.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        } else {
          alert("Email existed");
        }
      });
  };

  return (
    <div className="contanier cc">
      <div className="tableOutline cc shadow rounded zoomIn">
        <h3>Register</h3>
        <label htmlFor="Name">Name</label>
        <input
          className="accountInput"
          type="text"
          name="Name"
          id="registerName"
          onChange={onRegisterNameChange}
        />
        <label htmlFor="email">Email</label>
        <input
          className="accountInput"
          type="email"
          name="email"
          id="registerEmail"
          onChange={onRegisterEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          className="accountInput"
          type="password"
          name="password"
          id="regosterPassword"
          onChange={onRegisterPasswordChange}
        />
        <div className="p-3">
          <input
            className="p-1 px-3 accountBut pointer"
            type="submit"
            value="Register"
            onClick={onSubmitRegister}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
