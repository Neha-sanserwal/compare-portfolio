import React, { useEffect, useState } from "react";
import * as Api from "../Api";

export default () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    Api.getCurrentUser().then(setUser);
  }, []);
  return [user, setUser];
};
