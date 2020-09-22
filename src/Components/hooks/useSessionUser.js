import React, { useEffect, useState } from "react";
import * as Api from "../Api";

export default (isLoggedIn) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    Api.getCurrentUser().then(setUser);
  }, [isLoggedIn]);
  return user;
};
