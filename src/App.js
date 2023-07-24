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
import AuthorizedNav from "./components/AuthorizedNav";

function App() {
  let navToUse = localStorage.getItem("token") ? (
    <AuthorizedNav />
  ) : (
    <HeaderNav />
  );
  return (
    <div className="App">
      {navToUse}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/profile" component={Profile} />
        <Route path="/lessons" component={Lessons} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/account" component={Account} />
      </Switch>
    </div>
  );
}

export default App;
