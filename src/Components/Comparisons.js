import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Api from "./Api";
import "./assets/css/profile.css";
import withAuthorization from "./hoc/withAuthorization";

const ComparisonFolder = (props) => {
  const [comparison, setComparison] = useState({});

  useEffect(() => {
    Api.getComparison(props.id).then(setComparison);
  }, []);

  return (
    <div className="comparison">
      <div className="icon">
        <Link to={`/comparison/${props.id}`}>
          <i className="fa fa-folder" aria-hidden="true"></i>
        </Link>
      </div>
      <div className="name">{comparison.comparisonName}</div>
    </div>
  );
};

const Comparisons = (props) => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    Api.getOrderList().then(setQueue);
  }, []);

  const comparisonComponent = queue.map((id) => (
    <ComparisonFolder key={id} id={id} />
  ));
  return (
    <div className="page">
      <h2>My Comparisons</h2>
      <div className="comparisons">{comparisonComponent}</div>
    </div>
  );
};

export default withAuthorization(Comparisons);
