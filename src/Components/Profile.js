import React, { useEffect, useState } from "react";
import * as Api from "./Api";

const Profile = (props) => {
  const [sessionUser, setSessionUser] = useState({});
  useEffect(() => {
    Api.getCurrentUser().then((details) => {
      Api.getRepos(details.login).then((repos) => {
        setSessionUser(details);
      });
    });
  }, []);
  let { info } = sessionUser;
  info = info || {};
  const card = (
    <div>
      <div className="username">{info.login}</div>
      <div className="details">
        <div className="item">Repo: {info.public_repos} </div>
        <div className="item">Gists:{info.public_gists}</div>
        <div className="item">Followers:{info.followers}</div>
      </div>
    </div>
  );
  return info.login ? card : <div>Loading...</div>;
};

export default Profile;
