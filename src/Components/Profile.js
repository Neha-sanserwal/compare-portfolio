import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as Api from "./Api";
const Profile = () => {
  let location = useLocation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const [, code] = location.search.split("=");
    Api.authenticateUser(code).then((userDetails) => {
      if (Api.isRegisteredUser(userDetails.username)) {
        Api.setCurrentUser(userDetails).then(() => setUser(userDetails));
      }
    });
  }, [location]);
  return <h1>{JSON.stringify(user)}</h1>;
};

export default Profile;
