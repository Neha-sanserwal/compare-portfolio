import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Api from "./Api";
import Cards from "./Cards";
const Profile = (props) => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    Api.getOrderList().then(setQueue);
  }, []);

  const comparisonComponent = queue.map((id) => (
    <div key={id} className="comparison">
      <Link to={`/comparisons/${id}`}>{`comparison_${id}`}</Link>
    </div>
  ));
  return (
    <div className="profile">
      <div className="comparisons">{comparisonComponent}</div>
    </div>
  );
};

export default Profile;
