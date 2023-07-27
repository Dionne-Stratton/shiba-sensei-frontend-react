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
import Lessons from "./components/UserPages/Lessons";
import Reviews from "./components/UserPages/Reviews";

function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [userLessons, setUserLessons] = useState([]);
  const [vocab, setVocab] = useState([]);
  const [lesson1, setLesson1] = useState([]);
  const token = localStorage.getItem("token");
  // console.log("app user:", user);

  useEffect(() => {
    getVocab();
    if (token) {
      setAuth(true);
      getUser();
    } else {
      setAuth(false);
    }
  }, [auth]);

  function getVocab() {
    axios
      .get("http://localhost:5000/vocab")
      .then((res) => {
        setVocab(res.data);
        let lesson1set = res.data.filter((word) => word.lesson === 1);
        // console.log("lesson1set:", lesson1set);
        setLesson1(lesson1set);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUser() {
    if (token) {
      axios
        .get("http://localhost:5000/profile", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // console.log("lesson1:", lesson1);

  const navToUse = auth ? <AuthorizedNav setAuth={setAuth} /> : <HeaderNav />;
  const landingPage = auth ? (
    <Dashboard
      user={user}
      vocab={vocab}
      setUser={setUser}
      setUserLessons={setUserLessons}
      userLessons={userLessons}
    />
  ) : (
    <LandingPage />
  );

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
          <Register setAuth={setAuth} lesson1={lesson1} />
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
