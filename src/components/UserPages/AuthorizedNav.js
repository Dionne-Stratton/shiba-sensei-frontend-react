import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/shibaseneiover.png";
import AccountIcon from "../../assets/account-icon.png";

const HeaderNav = (props) => {
  const { setAuth } = props;

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
            <NavLink to="/account">
              <img
                width={50}
                className="account-icon"
                src={AccountIcon}
                alt="Account"
              />
            </NavLink>
            <NavLink
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                setAuth(false);
              }}
            >
              Logout
            </NavLink>
          </div>
        </div>

        <nav id="hnavbuttons">
          <NavLink className="main-nav" activeClassName="active" to="/">
            Dashboard
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/vocab">
            Vocabulary
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/study">
            Study
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
