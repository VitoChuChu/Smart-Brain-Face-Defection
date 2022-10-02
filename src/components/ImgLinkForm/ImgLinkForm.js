import React from "react";
import Logo from "../Logo/Logo";
import "./ImgLinkForm.css";

const ImgLinkForm = ({ onInputChange, onDefectButton, user, counts }) => {
  return (
    <div className="container">
      <div className="row cc">
        <div className="col-12 cc w-50">
          <Logo />
        </div>
        <div className="col-12">
          <div className="fs-4">{`${user.name}, Here is your current entry counts : `}</div>
          <h1>
            {user.entries}
            {counts ? (
              <span style={{ color: "green", fontSize: "1.25rem" }}>
                {" "}
                +{counts}
              </span>
            ) : null}
          </h1>
          <p className="m-1">AI brain is ready to detect the faces</p>
        </div>
        <div className="col-10 col-xl-10 urlbackground shadow rounded">
          <input
            id="input"
            className="p-1 widthInput"
            type="text"
            onChange={onInputChange}
            placeholder="Please enter an url of the image"
          />
          <button
            className="p-1 ms-1 btn btn-outline-dark"
            onClick={onDefectButton}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImgLinkForm;
