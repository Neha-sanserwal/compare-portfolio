import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Api from "./Api";
import Cards from "./Cards";
import withAuthorization from "./hoc/withAuthorization";
import Modal from "./Modal";

const Comparisons = (props) => {
  const history = useHistory();
  const [comparison, setComparison] = useState({});
  const { id } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    Api.getComparison(id).then(setComparison);
  }, []);

  const deleteComparison = () => {
    Api.deleteComparison(id).then(({ isComparisonDeleted }) => {
      isComparisonDeleted && history.push("/profile");
    });
  };

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <div className="page">
      <h2>{comparison.comparisonName}</h2>
      <div className="comparison">
        <div className="compare-cards">
          {comparison.cards && <Cards cards={comparison.cards} />}
        </div>
      </div>
      <div className="btns">
        <Link to={"/profile"}>
          <button className="btn theme-btn">Go to Comparisons</button>
        </Link>
        <button className="btn danger-btn" onClick={showModal}>
          Delete
        </button>
      </div>
      <Modal
        isVisible={isVisible}
        text={`Do you really want to delete Comparison_${id}`}
        onConfirm={deleteComparison}
        onCancel={hideModal}
      ></Modal>
    </div>
  );
};

export default withAuthorization(Comparisons);
