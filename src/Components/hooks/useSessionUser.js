import React, { useState, useEffect } from "react";
import * as Api from "../../Apis/Api";
export default (isLoggedIn) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    Api.getCurrentUser().then(setUser);
  }, [isLoggedIn]);
  return user;
};
