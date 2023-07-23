import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import Lessons from "./components/Lessons";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <h3>Welcome to Rabbi Rabbit!</h3>
    </div>
  );
}

export default App;
