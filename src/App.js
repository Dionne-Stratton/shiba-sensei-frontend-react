import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import Lessons from "./components/Lessons";
import Dashboard from "./components/Dashboard";
import Login from "./components/Auth/LogIn";
import Register from "./components/Auth/Register";
import Account from "./components/Account";
import HeaderNav from "./components/HeaderNav";

function App() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://rabbi-rabbit-api.herokuapp.com/api/users/profile", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="App">
      <HeaderNav />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/profile" component={Profile} />
        <Route path="/lessons" component={Lessons} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route
          path="/account"
          render={(props) => <Account {...props} profile={profile} />}
        />
      </Switch>
    </div>
  );
}

export default App;
