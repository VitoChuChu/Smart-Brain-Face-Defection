import React, { useState } from "react";
import Clarifai from "clarifai";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import ImgLinkForm from "./components/ImgLinkForm/ImgLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

import "./App.css";

function App() {
  let [status, setStatue] = useState(false);
  let [route, setRoute] = useState("signin");
  let [input, setInput] = useState();
  let [imageUrl, setImageUrl] = useState("");
  let [boxes, setBoxes] = useState([]);

  const onStatusChange = (x) => {
    setStatue(x);
  };

  const onRouteChange = (route) => {
    setRoute(route);
    if (route === "signout") {
      setRoute("signin");
      setStatue(false);
    } else if (route === "home") {
      setStatue(true);
    }
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const app = new Clarifai.App({
    apiKey: "d77fc9bda81541c09320abae4ae108a4",
  });
  const onDefectButton = () => {
    setImageUrl(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((resp) => {
        faceLocation(resp);
        displayFaceBox(faceLocation(resp));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const faceLocation = (data) => {
  //   const image = document.getElementById("inputImage");
  //   const width = Number(image.clientWidth);
  //   const height = Number(image.clientHeight);
  //   const facePoint = data.outputs[0].data.regions[0].region_info.bounding_box;
  //   console.log(facePoint);
  //   return {
  //     leftCol: facePoint.left_col * width,
  //     topRow: facePoint.top_row * height,
  //     rightCol: width - facePoint.right_col * width,
  //     bottomRow: height - facePoint.bottom_row * height,
  //   };
  // };

  const faceLocation = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.clientWidth);
    const height = Number(image.clientHeight);
    const facePoints = data.outputs[0].data.regions;
    const facePointsLocation = facePoints.map((x) => {
      return x.region_info.bounding_box;
    });
    return facePointsLocation.map((face) => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });
  };

  const displayFaceBox = (boxes) => {
    setBoxes(boxes);
    console.log(boxes);
  };

  return (
    <div className="App">
      <Nav
        onRouteChange={onRouteChange}
        onStatusChange={onStatusChange}
        status={status}
      />
      {route === "home" ? (
        <div>
          <ImgLinkForm
            onInputChange={onInputChange}
            onDefectButton={onDefectButton}
          />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </div>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
      <Footer />
    </div>
  );
}

export default App;
