import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as Api from "./Api";
const Profile = () => {
  let location = useLocation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const [, code] = location.search.split("=");
    Api.authenticateUser(code).then((userDetails) => {
      Api.isRegisteredUser(userDetails.login).then((details) => {
        Api.setCurrentUser(details).then(() => setUser(details));
      });
    });
  }, [location]);
  return <div>{user.login ? <div></div> : <div></div>}</div>;
};

export default Profile;
