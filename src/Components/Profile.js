import React, { useEffect, useState } from "react";
import * as Api from "./Api";
import Cards from "./Cards";
import useSessionUser from "./hooks/useSessionUser";
const Profile = (props) => {
  const [user] = useSessionUser();
  const [comparisons, setComparisons] = useState({});
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    Api.getComparisons().then(setComparisons);
    Api.getQueue().then(setQueue);
  }, []);

  const comparisonComponent = queue.map((id) => (
    <div key={id} className="comparison">
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
