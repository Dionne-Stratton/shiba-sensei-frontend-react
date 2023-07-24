import React from "react";
import { NavLink } from "react-router-dom";

const AuthorizedNav = () => {
  return (
    <div className="headernav">
      <header>
        <div className="">
          <h1>Rabbi Rabbit AuthorizedNav</h1>
        </div>

        <nav id="hnavbuttons">
          <NavLink
            className="main-nav"
            activeClassName="active"
            to="/dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/lessons">
            Lessons
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/account">
            Account
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default AuthorizedNav;
