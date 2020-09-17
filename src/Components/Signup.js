import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Input from "./Input";
import * as Api from "./Api";

export default function (props) {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(location.state.userDetails);

  const handleValue = (key, value) => {
    setUserDetails((prevDetails) =>
      Object.assign(prevDetails, { [key]: value })
    );
  };
  const SaveDetails = () => {
    Api.registerUser(userDetails.login, userDetails);
  };
  return (
    <div>
      <h3>{userDetails.login}</h3>
      <Input initialValue={userDetails.email} handleValue={handleValue} />
      <Input initialValue={userDetails.company} handleValue={handleValue} />
      <button onClick={SaveDetails}>Confirm</button>
    </div>
  );
}
