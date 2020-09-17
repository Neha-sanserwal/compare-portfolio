import { useLocation, withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as Api from "./Api";

const Profile = (props) => {
  let location = useLocation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const [, code] = location.search.split("=");
    Api.authenticateUser(code).then((userDetails) => {
      Api.isRegisteredUser(userDetails.login).then((details) => {
        const parsedDetails = JSON.parse(details) || {};
        if (!parsedDetails.login) {
          props.history.push({
            pathname: "/signup",
            state: { userDetails },
          });
        } else {
          setUser(parsedDetails);
        }
      });
    });
  }, []);
  return (
    <div>
      {user && user.login && (
        <div>
          <h1>hello, {user.name}</h1>
        </div>
      )}
    </div>
  );
};

export default withRouter(Profile);
