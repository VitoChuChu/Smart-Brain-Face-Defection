import React from "react";
import Logo from "../Logo/Logo";
import "./ImgLinkForm.css";

const ImgLinkForm = ({ onInputChange, onDefectButton }) => {
  return (
    <div className="container">
      <div className="row cc">
        <div className="col-12 cc w-50">
          <Logo />
        </div>
        <div className="col-12">
          <h4>Vito, Here is your current entry count : </h4>
          <h2>Score</h2>
          <p className="m-1">AI brain is ready to detect the faces</p>
        </div>
        <div className="col-10 col-xl-10 urlbackground shadow">
          <input
            className="p-1 widthInput"
            type="text"
            onChange={onInputChange}
          />
          <button className="p-1" onClick={onDefectButton}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImgLinkForm;
