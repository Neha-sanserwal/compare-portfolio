import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Api from "./Api";
import Cards from "./Cards";
const WithComparisons = (props) => {
  const [cards, setCards] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    Api.getComparison(id).then(setCards);
  }, []);
  return (
    <div className="profile">
      <div className="comparison">
        <Cards cards={cards} />
      </div>
    </div>
  );
};

export default WithComparisons;
