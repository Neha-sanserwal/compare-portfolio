import React, { useState, useEffect } from "react";
import * as Api from "../Api";
export default (isLoggedIn) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    console.log("called");
    Api.getCurrentUser().then(setUser);
  }, [isLoggedIn]);
  return user;
};
