import React, { useEffect, useState } from "react";
import * as Api from "./Api";
const Navbar = function (props) {
  useEffect(() => {
    Api.getCurrentUser();
  }, []);
  return <div className="navbar"></div>;
};
