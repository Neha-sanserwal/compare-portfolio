import { useLocation, withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as Api from "./Api";

const Login = (props) => {
  let location = useLocation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const [, code] = location.search.split("=");
    Api.authenticateUser(code).then((userDetails) => {
      Api.isRegisteredUser(userDetails.login)
        .then((details) => JSON.parse(details))
        .then((details) => {
          if (!details) {
            props.history.push({
              pathname: "/signup",
              state: { userDetails },
            });
            return;
          }
          console.log(details);
          Api.loginUser(details.login).then(() => {
            props.history.push({
              pathname: "/profile",
              state: { userDetails },
            });
          });
        });
    });
  });
  return <div>Loading...</div>;
};

export default withRouter(Login);
