import "./App.css";
import axios from "axios";
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
import Reviews from "./components/UserPages/Reviews";

function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [vocab, setVocab] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
      getVocab();
    } else {
      setAuth(false);
    }
  }, [auth]);

  function getVocab() {
    axios
      .get("http://localhost:5000/vocab")
      .then((res) => {
        setVocab(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const navToUse = auth ? <AuthorizedNav setAuth={setAuth} /> : <HeaderNav />;
  const landingPage = auth ? <Dashboard setUser={setUser} /> : <LandingPage />;

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
        <Route path="/vocab">
          <Vocabulary vocab={vocab} />
        </Route>
        <Route path="/reading" component={Reading} />
        <Route path="/account">
          <Account user={user} setUser={setUser} />
        </Route>
        <Route path="/profile">
          <Profile user={user} setUser={setUser} />
        </Route>
        <Route path="/lessons">
          <Lessons user={user} setUser={setUser} vocab={vocab} />
        </Route>
        <Route path="/reviews">
          <Reviews user={user} setUser={setUser} vocab={vocab} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
