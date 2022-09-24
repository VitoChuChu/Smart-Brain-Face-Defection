import React, { useState } from "react";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import ImgLinkForm from "./components/ImgLinkForm/ImgLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import "./App.css";

function App() {
  let [status, setStatue] = useState(false);
  let [route, setRoute] = useState("signin");
  let [input, setInput] = useState();
  let [imageUrl, setImageUrl] = useState("");
  let [boxes, setBoxes] = useState([]);
  let [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const initialState = () => {
    setImageUrl("");
    setInput("");
    setBoxes([]);
    setRoute("signin");
    setStatue(false);
    setUser({
      id: "",
      name: "",
      email: "",
      entries: 0,
      joinedDate: "",
    });
  };

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onStatusChange = (x) => {
    setStatue(x);
  };
  const onRouteChange = (route) => {
    setRoute(route);
    if (route === "signout") {
      initialState();
    } else if (route === "home") {
      setStatue(true);
    } else if (route === "delete") {
      if (window.confirm("Are you sure you want to delete your account?")) {
        deleteUser();
      } else {
        setStatue(true);
        setRoute("home");
      }
    }
  };
  const deleteUser = () => {
    let deleteEmail = prompt("Please enter your email : ");
    if (user.email === deleteEmail) {
      fetch("https://smart-brain-backend-2022-09-24.herokuapp.com/delete", {
        method: "delete",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: deleteEmail }),
      }).then(alert("User Deleted"));
      initialState();
    } else {
      alert("Email is incorrect");
      initialState();
    }
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const cleanInput = () => {
    setBoxes([]);
    displayFaceBox(faceLocation());
    document.getElementById("input").value = "";
  };

  const onDefectButton = () => {
    setImageUrl(input);
    fetch("https://smart-brain-backend-2022-09-24.herokuapp.com/imageUrl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.status.code === 10000) {
          fetch("https://smart-brain-backend-2022-09-24.herokuapp.com/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((resp) => resp.json())
            .then((count) => {
              let newUser = { ...user, entries: count };
              setUser(newUser);
            })
            .catch(console.log);
        } else {
          alert("There is no face on the image!!!");
        }
        displayFaceBox(faceLocation(resp));
      })
      .catch((err) => {
        console.log(err);
      });
    cleanInput();
  };

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
  };

  // Particles setting vvvvv
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  const particlesLoaded = (container) => {
    return;
  };
  const options = {
    fpsLimit: 60,
    interactivity: {
      detect_on: "canvas",
    },
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: "#ff0000",
        animation: {
          enable: true,
          speed: 10,
          sync: true,
        },
      },
      shape: {
        type: "star",
      },
      opacity: {
        value: 0.5,
        random: false,
        animation: {
          enable: false,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: 10,
        random: true,
        animation: {
          enable: false,
          speed: 10,
          minimumValue: 0.1,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outMode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
    },
    smooth: true,
    detectRetina: true,
  };
  // Particles setting ^^^^^

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
        className="particles"
      />
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
            user={user}
          />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </div>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
      <Footer />
    </div>
  );
}

export default App;
