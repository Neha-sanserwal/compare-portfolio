import React, { useEffect, useState } from "react";
import * as Api from "./Api";

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);
  useEffect(() => {
    Api.getCurrentUser().then(setUser);
    Api.getComparisons().then(setCards);
  }, []);

  return <div className="profile"></div>;
};

export default Profile;
