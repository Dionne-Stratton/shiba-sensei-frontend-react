import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/RabbiRabbitLogo2.png";
import AccountIcon from "../../assets/account-icon.png";
import { useHistory } from "react-router-dom";

const HeaderNav = (props) => {
  const { setAuth, setSelectedLesson } = props;
  const history = useHistory();

  function handleClick(e) {
    setSelectedLesson(Number(e.target.value));
    document.querySelector(".select").value = "select";
    history.push("/vocab");
  }
  return (
    <div className="headernav">
      <header>
        <div className="header-title">
          <img className="logo" src={Logo} alt="Rabbi Rabbit Logo" />
          <div className="auth-nav">
            <NavLink to="/account">
              <img
                width={50}
                className="account-icon"
                src={AccountIcon}
                alt="Account"
              />
            </NavLink>
            {/* clicking logout button will remove the token from local storage and redirect to landingpage */}
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
          {/* create a button below with a dropdown for vocabulary component to select lesson by number */}
          <select className="main-nav select" name="lesson-select">
            <option value="select">Vocabulary</option>
            <option value="1" onClick={handleClick}>
              Lesson 1
            </option>
            <option value="2" onClick={handleClick}>
              Lesson 2
            </option>
            <option value="3" onClick={handleClick}>
              Lesson 3
            </option>
          </select>
          {/* <NavLink className="main-nav" activeClassName="active" to="/vocab">
            Vocabulary
          </NavLink> */}
          <NavLink className="main-nav" activeClassName="active" to="/reading">
            Reading
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
