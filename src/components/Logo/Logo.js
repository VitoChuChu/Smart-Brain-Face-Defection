import React from "react";
import logo from "./brian.png";
import Tilt from "react-parallax-tilt";

const Logo = () => {
  return (
    <Tilt>
      <div className="shadow p-3 m-1 border rounded">
        <img width={"200px"} height={"auto"} src={logo} alt="Brain" />
      </div>
    </Tilt>
  );
};
export default Logo;
