import React, { useEffect, useState } from "react";
import * as Api from "./Api";

const Profile = (props) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    Api.getCurrentUser().then(setUser);
  }, []);

  const card = (
    <div>
      <div className="username">{user.login}</div>
      <div className="details">
        <div className="item">Repo: {user.public_repos} </div>
        <div className="item">Gists:{user.public_gists}</div>
        <div className="item">Stars:{user.stars}</div>
        <div className="item">Followers:{user.followers}</div>
        <div className="item">Forks:{user.forks}</div>
      </div>
    </div>
  );
  return user.login ? card : <div>Loading...</div>;
};

export default Profile;
