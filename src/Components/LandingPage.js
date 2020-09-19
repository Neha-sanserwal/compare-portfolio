import React, { useEffect, useState } from "react";
import * as Api from "./Api";
import Input from "./Input";
export default function (args) {
  const [user, setUser] = useState({});
  useEffect(() => {
    Api.getCurrentUser().then(setUser);
  }, []);
  return (
    <div className="page">
      <div className="banner">
        <h1>Hello, {(user && user.login) || ""} Welcome to Compare.</h1>
      </div>
      <div className="search_area">
        <Input initialValue="" handleValue={() => {}} />
      </div>
    </div>
  );
}
