import "./App.css";
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
//Auth
import Register from "./components/Auth/Register";
import Login from "./components/Auth/LogIn";
//Marketing Pages
import HeaderNav from "./components/MarketingPages/HeaderNav";
import LandingPage from "./components/MarketingPages/LandingPage";
import About from "./components/MarketingPages/About";
import Pricing from "./components/MarketingPages/Pricing";
import Contact from "./components/MarketingPages/Contact";
//User Pages
import AuthorizedNav from "./components/UserPages/AuthorizedNav";
import Dashboard from "./components/UserPages/Dashboard";
import Vocabulary from "./components/UserPages/Vocabulary";
import Reading from "./components/UserPages/Reading";
import Account from "./components/UserPages/Account";
import Profile from "./components/UserPages/Profile";
import Lessons from "./components/UserPages/Lessons";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [auth]);

  const navToUse = auth ? <AuthorizedNav setAuth={setAuth} /> : <HeaderNav />;
  const landingPage = auth ? <Dashboard /> : <LandingPage />;

  return (
    <div className="App">
      {navToUse}
      <Switch>
        {/* Marketing Pages */}
        <Route exact path="/">
          {landingPage}
        </Route>
        <Route path="/about" component={About} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/contact" component={Contact} />
        {/* Auth Pages */}
        <Route path="/register">
          <Register setAuth={setAuth} />
        </Route>
        <Route path="/login">
          <Login setAuth={setAuth} />
        </Route>
        {/* User Pages */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/vocab" component={Vocabulary} />
        <Route path="/reading" component={Reading} />
        <Route path="/account" component={Account} />
        <Route path="/profile" component={Profile} />
        <Route path="/lessons" component={Lessons} />
      </Switch>
    </div>
  );
}

export default App;
