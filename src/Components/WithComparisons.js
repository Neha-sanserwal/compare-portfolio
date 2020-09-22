import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Api from "./Api";
import Cards from "./Cards";
const WithComparisons = (props) => {
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    Api.getComparison(id).then(setCards);
  }, []);

  const deleteComparison = () => {
    Api.deleteComparison(id).then(({ isComparisonDeleted }) => {
      isComparisonDeleted && history.push("/profile");
    });
  };

  return (
    <div className="page">
      <h2>{`Comparison${id}`}</h2>
      <div className="comparison">
        <div className="compare-cards">
          <Cards cards={cards} />
        </div>
      </div>
      <div className="btns">
        <Link to={"/profile"}>
          <button className="btn theme-btn">Go to Comparisons</button>
        </Link>
        <button className="btn danger-btn" onClick={deleteComparison}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default WithComparisons;
