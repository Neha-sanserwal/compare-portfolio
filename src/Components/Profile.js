import React, { useEffect, useState } from "react";
import * as Api from "./Api";
import Cards from "./Cards";
const Profile = (props) => {
  const [comparisons, setComparisons] = useState({});
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    Api.getComparisons().then(({ orderList, comparisons }) => {
      console.log(orderList);
      setQueue(orderList);
      setComparisons(comparisons);
    });
  }, []);

  const comparisonComponent = queue.map((id) => (
    <div key={id} className="comparison">
      {console.log(comparisons, [id])}
      {comparisons[id] && <Cards cards={JSON.parse(comparisons[id])} />}
    </div>
  ));
  return (
    <div className="profile">
      <div className="comparisons">{comparisonComponent}</div>
    </div>
  );
};

export default Profile;
