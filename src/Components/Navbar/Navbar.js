import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Api from "./Api";
import "./assets/css/navbar.css";
import ROUTES from "../globals/routes";

const Navbar = function (props) {
  const history = useHistory();

  const handleLogout = () => {
    Api.logout().then((isLoggedOut) => {
      if (isLoggedOut) {
        history.push(ROUTES.HOME);
        props.changeSessionUser();
      }
    });
  };
  const { login } = props.user;
  return (
    <div className="navbar">
      <div className="header">
        <Link to={ROUTES.HOME}>
          <img alt="comparer" src={require("./assets/images/logo.png")} />
        </Link>
      </div>
      {login ? (
        <div className="navlist">
          <div className="navItem">{props.user.name}</div>
          <div className="navItem">
            <Link to={ROUTES.COMPARISONS}>Your comparisons</Link>
          </div>
          <button className="navItem btn danger-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="navlist">
          <div className="navItem">
            <a href={ROUTES.LOGIN}>
              <button className="btn nav-btn">Login with github</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
