import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Api from "../../Apis/Api";
import Cards from "../Cards";
import withAuthorization from "../hoc/withAuthorization";
import Modal from "../Modal/Modal";
import alert from "../../globals/alert";
import ROUTES from "../../globals/routes";
import Button from "../Button";

const Comparison = (props) => {
  const history = useHistory();
  const [comparison, setComparison] = useState({});
  const { id } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    Api.getComparison(id).then(setComparison);
  }, [id]);

  const deleteComparison = () => {
    Api.deleteComparison(id).then(({ isComparisonDeleted }) => {
      if (!isComparisonDeleted) {
        props.dispatch({ type: alert.DELETE_FAILURE });
      } else {
        props.dispatch({ type: alert.DELETE_SUCCESS });
      }
      setIsVisible(false);
      setTimeout(() => {
        props.dispatch({});
      }, 3000);
      history.push(ROUTES.COMPARISONS);
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
        <Link to={ROUTES.COMPARISONS}>
          <Button classes="btn theme-btn">Go to Comparisons</Button>
        </Link>
        <Button classes="danger-btn" onClick={showModal}>
          Delete
        </Button>
      </div>
      <Modal
        isVisible={isVisible}
        text={`Do you really want to delete ${comparison.comparisonName}`}
        onConfirm={deleteComparison}
        onCancel={hideModal}
      ></Modal>
    </div>
  );
};

export default withAuthorization(Comparison);
