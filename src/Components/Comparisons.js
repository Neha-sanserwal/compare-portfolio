import React, { useEffect, useState, useReducer } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Api from "./Api";
import Cards from "./Cards";
import withAuthorization from "./hoc/withAuthorization";
import Modal from "./Modal";
import alert from "../globals/alert";

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
      let timeOut;
      if (!isComparisonDeleted) {
        props.dispatch({ type: alert.DELETE_FAILURE });
      } else {
        props.dispatch({ type: alert.DELETE_SUCCESS });
      }
      setIsVisible(false);
      timeOut = setTimeout(() => {
        props.dispatch({});
      }, 3000);
      history.push("/profile");
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
      <div className="compare-cards">
        {comparison.cards && <Cards cards={comparison.cards} />}
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
