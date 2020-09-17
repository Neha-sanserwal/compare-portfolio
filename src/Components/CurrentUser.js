import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as Api from "./Api";
const CurrentUser = () => {
  let location = useLocation();
  const [user, setUser] = useState();
  useEffect(() => {
    const [, code] = location.search.split("=");
    Api.getUser(code).then(setUser);
  }, [location.search]);
  return <h1>Login page</h1>;
};

export default CurrentUser;
