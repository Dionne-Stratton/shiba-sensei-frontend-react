import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/RabbiRabbitLogo2.png";
import AccountIcon from "../../assets/account-icon.png";
import { useHistory } from "react-router-dom";

const HeaderNav = (props) => {
  const { setAuth, setSelectedLesson } = props;
  const history = useHistory();

  // function handleClick(e) {
  //   setSelectedLesson(Number(e.target.value));
  //   //
  //   history.push("/vocab");
  // }
  const handleClick = (e) => {
    setSelectedLesson(Number(e.target.value));
    // console.log("e.target.value", e.target.value);
    if (e.target.value !== "select") {
      // console.log("inside if", e.target.value);
      // console.log("clicked");
      history.push("/vocab");
    }
    // document.querySelector(".select").value = "select";
  };
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
          <select
            className="main-nav select"
            name="lesson-select"
            onClick={handleClick}
          >
            <option value="select" onClick={handleClick}>
              Vocabulary
            </option>
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
