import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import * as Api from "./Api";

const Navbar = function (props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    Api.getCurrentUser().then(setUser);
  }, []);
  return (
    <div className="navbar">
      {user.login ? (
        <div style={{ display: "flex", width: "100%" }}>
          <Link to="/profile">
            <h3>{user.name}</h3>
          </Link>
          <Link to="/logout">
            <button>Logout</button>
          </Link>
        </div>
      ) : (
        <div>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`}
          >
            <button>Login with github</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
