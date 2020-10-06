import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Api from "../../Apis/Api";
import "./navbar.css";
import ROUTES from "../../globals/routes";
import Button from "../Button";
import * as Logo from "../assets/images/logo.png";
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
          <img alt="comparer" src={Logo} />
        </Link>
      </div>
      {login ? (
        <div className="navlist">
          <div className="navItem">{props.user.name}</div>
          <div className="navItem">
            <Link to={ROUTES.COMPARISONS}>
              <Button classes="btn nav-btn">Your comparisons</Button>
            </Link>
          </div>
          <div className="navItem">
            <Button classes="btn danger-btn" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <div className="navlist">
          <div className="navItem">
            <a href={ROUTES.LOGIN}>
              <Button type="nav" classes="btn nav-btn">
                Login with github
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
