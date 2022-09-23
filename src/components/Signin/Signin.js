import React, { useState } from "react";
import "./Signin.css";

const Signin = ({ onRouteChange, loadUser }) => {
  let [signinEmail, setSigninEmail] = useState("");
  let [signinPassword, setSigninPassword] = useState("");

  const onEmailChange = (e) => {
    setSigninEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setSigninPassword(e.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signinEmail,
        password: signinPassword,
      }),
    })
      .then((resp) => resp.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        } else {
          alert("Wrong email or password");
        }
      });
  };

  return (
    <div className="contanier cc">
      <div className="tableOutline cc shadow rounded zoomIn">
        <h3>Sign In</h3>
        <label htmlFor="email">Email</label>
        <input
          className="accountInput"
          type="email"
          name="email"
          id="email"
          onChange={onEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          className="accountInput "
          type="password"
          name="password"
          id="password"
          onChange={onPasswordChange}
        />
        <div className="p-3">
          <input
            className="p-1 px-3 accountBut pointer"
            type="submit"
            value="Sign In"
            onClick={onSubmitSignIn}
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
