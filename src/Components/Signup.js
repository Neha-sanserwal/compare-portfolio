import React, { useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import Input from "./Input";
import * as Api from "./Api";

const SignUp = function (props) {
  const location = useLocation();
  const state = location.state || {};
  const [userDetails, setUserDetails] = useState(() => state.userDetails || {});

  const handleValue = (key, value) => {
    setUserDetails((prevDetails) =>
      Object.assign(prevDetails, { [key]: value })
    );
  };
  const SaveDetails = () => {
    Api.registerUser(userDetails.login, userDetails).then(() => {
      Api.loginUser(userDetails.login).then(() => {
        props.history.push("/profile");
      });
    });
  };
  return (
    <div>
      {console.log(userDetails)}
      <h3>{userDetails.login}</h3>
      <Input initialValue={userDetails.name} handleValue={handleValue} />
      <br />
      <Input initialValue={userDetails.email} handleValue={handleValue} />
      <br />
      <Input initialValue={userDetails.company} handleValue={handleValue} />
      <br />
      <button onClick={SaveDetails}>Confirm</button>
    </div>
  );
};

export default withRouter(SignUp);
