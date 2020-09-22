import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Api from "./Api";
import "./assets/css/profile.css";

const Profile = (props) => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    Api.getOrderList().then(setQueue);
  }, []);

  const comparisonComponent = queue.map((id) => (
    <div key={id} className="comparison">
      <div className="icon">
        <Link to={`/comparisons/${id}`}>
          <i class="fa fa-folder" aria-hidden="true"></i>
        </Link>
      </div>
      <div className="name">{`comparison_${id}`}</div>
    </div>
  ));
  return (
    <div className="page">
      <h2>My Comparisons</h2>

      <div className="comparisons">{comparisonComponent}</div>
    </div>
  );
};

export default Profile;
