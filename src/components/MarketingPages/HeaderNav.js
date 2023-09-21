import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/shibaseneiover.png";

const HeaderNav = () => {
  return (
    <div className="headernav">
      <header>
        <div className="header-title">
          <div className="title">
            <img className="logo" src={Logo} alt="Shiba Sensei Logo" />
            <div className="title-text">
              <h2 id="shiba">Shiba</h2>
              <h2 id="sensei">Sensei</h2>
            </div>
          </div>
          <div className="auth-nav">
            <NavLink
              className="main-nav"
              activeClassName="active"
              to="/auth/login"
            >
              Login
            </NavLink>
            <NavLink
              className="main-nav"
              activeClassName="active"
              to="/auth/register"
            >
              Register
            </NavLink>
          </div>
        </div>

        <nav id="hnavbuttons">
          <NavLink className="main-nav" activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/about">
            About
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/pricing">
            Pricing
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/contact">
            Contact
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default HeaderNav;
