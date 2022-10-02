import React from "react";
import "./FaceRacegnition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="cc">
      <div className="position-relative m-2 p-2">
        <img className="imgSize" src={imageUrl} alt="" id="inputImage" />
        {boxes.map((box, i) => {
          const { leftCol, topRow, rightCol, bottomRow } = box;
          return (
            <div
              key={i}
              className="bounding-box"
              style={{
                left: leftCol,
                top: topRow,
                right: rightCol,
                bottom: bottomRow,
              }}
            >
              <h3 className="numberPosition" style={{ color: "green" }}>
                {i + 1}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
