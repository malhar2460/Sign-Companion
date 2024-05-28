import "./App.css";
import { useState, useEffect } from "react";
import HandGestureRecognition from "./cont/HandGestureRecognition";
// import { stopReportingRuntimeErrors } from "react-error-overlay";
import axios from "axios";
import Text_sign from "./cont/Text_sign";
import Login from "./cont/Login";
import Contact from "./cont/Contact";
import Aboutus from "./cont/Aboutus";
import Signup from "./cont/Signup";
import Admin from "./cont/Admin";
import Speech from "./cont/Speech";
import Graph from "./cont/Graph";
import Home from "./cont/Home";
import Welcome from "./cont/Welcome";
import Welcome_admin from "./cont/Welcome_admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  // if (process.env.NODE_ENV === "development") {
  //   stopReportingRuntimeErrors(); // disables error overlays
  // }
  // const {ddate,setdate} = useState('')
  // const {ttime,settime} = useState('')

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is month 0, so add 1
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const [duration, setDuration] = useState(0);
  const [source, setSource] = useState("");

  const [user, setUser] = useState("");

  // Callback function to update user state when the user logs in

  const handleUserLogin = (userData) => {
    setUser(userData);
    console.log("userData", localStorage.getItem("user"));
  };

  const [guestId, setGuestId] = useState("");

  // Callback function to update guest_id state from the HandGestureRecognition component
  const handleGuestIdUpdate = (guestIdFromRecognition) => {
    setGuestId(guestIdFromRecognition);
    console.log("From rec", localStorage.getItem("guest_id"));
  };

  // Function to update the duration on the server
  const updateDurationOnServer = () => {
    const departureTime = new Date().getTime();
    const durationInSeconds = Math.floor((departureTime - arrivalTime) / 1000); // Duration in seconds

    // Send the duration and source information to the backend
    const sourceUrl = document.referrer || "Direct"; // Retrieve the source URL or consider it as Direct if not available
    setSource(sourceUrl);

    // Make a request to your Django backend API endpoint to store the duration and source information

    // =====================================================================================================================

    // if (window.performance) {
    //   if (performance.navigation.type != 1) {
    const isPageReloaded =
      window.performance && performance.navigation.type === 1;
    if (!isPageReloaded) {
      axios
        .post(
          "http://127.0.0.1:8000/data/",
          {
            user_id: localStorage.getItem("user"),
            guest_id: localStorage.getItem("guest_id"),
            duration: durationInSeconds,
            date: formatDate(new Date(arrivalTime)),
            time: new Date(arrivalTime).toLocaleTimeString(),
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("user", "notfound");
        })
        .catch((error) => {
          console.error("Error while updating duration on the server", error);
        });
    }
  };

  // Function to start the ping mechanism
  const startPing = () => {
    const intervalId = setInterval(() => {
      updateDurationOnServer();
    }, 99999); // Send a ping every 60 seconds (adjust as needed)

    // Clear the interval when the component unmounts or the tab is closed
    return () => {
      clearInterval(intervalId);
    };
  };

  // Retrieve the arrival time from localStorage
  // const arrivalTime = parseInt(localStorage.getItem('arrivalTime'), 10);
  const arrivalTime = new Date().getTime();
  // Add an event listener to handle the beforeunload event

  useEffect(() => {
    // Retrieve the arrival time from localStorage
    const arrivalTime = parseInt(localStorage.getItem("arrivalTime"), 10);

    // Add an event listener to handle the beforeunload event
    const handleBeforeUnload = () => {
      updateDurationOnServer();
    };

    window.onbeforeunload = handleBeforeUnload;

    window.addEventListener("unload", handleBeforeUnload);

    // Clear the event listener when the component unmounts
    return () => {
      window.removeEventListener("unload", handleBeforeUnload);
    };
  });

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route
            path="/sign_text"
            element={
              <HandGestureRecognition onGuestIdUpdate={handleGuestIdUpdate} />
            }
          ></Route>
          <Route path="/text_sign" element={<Text_sign />}></Route>
          <Route path="/contactus" element={<Contact />}></Route>

          <Route path="/graph" element={<Graph />}></Route>
          <Route path="/" element={<Home />}></Route>

          <Route path="/aboutus" element={<Aboutus />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/speech" element={<Speech />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/welcome_admin" element={<Welcome_admin />}></Route>
          <Route
            path="/login"
            element={<Login onUserLogin={handleUserLogin} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
