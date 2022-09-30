import React from "react";
import "./FaceRacegnition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="cc">
      <div className="position-relative">
        <img
          className="p-2 m-2 widthImg"
          src={imageUrl}
          alt=""
          id="inputImage"
          width={"500px"}
          height={"auto"}
        />
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
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
