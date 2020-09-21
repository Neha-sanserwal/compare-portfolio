import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import * as Api from "./Api";
import "./assets/css/navbar.css";

const Navbar = function (props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    Api.getCurrentUser().then(setUser);
  }, []);

  const handleLogout = () => {
    Api.logout().then(() => {
      setUser({});
    });
  };

  return (
    <div className="navbar">
      <div className="header">
        <a href="/">
          <img src={require("./assets/images/logo.png")} />
        </a>
      </div>
      {user.login ? (
        <div className="navlist">
          <div className="navItem">
            <Link to="/profile">
              <h3>{user.name}</h3>
            </Link>
          </div>
          <div className="navItem">
            <button className="theme-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="navlist">
          <div className="navItem">
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`}
            >
              <button className="theme-btn">Login with github</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
