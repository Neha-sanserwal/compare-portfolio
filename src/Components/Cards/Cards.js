import React, { useReducer } from "react";
import Moment from "react-moment";
import changeHover from "../util/changeHover";
import CARD_ITEM from "../../globals/cardItem";
import "./cards.css";

const DeleteBtn = (props) => {
  const { handleClick } = props;
  return (
    <div className="delete-Icon" onClick={handleClick}>
      <i className="fa fa-times-circle" aria-hidden="true"></i>
    </div>
  );
};

export default (props) => {
  const [classes, dispatch] = useReducer(changeHover, {});
  return props.cards.map((info) => (
    <div className="card" key={info.id}>
      {props.deleteCard && (
        <div>
          <DeleteBtn
            handleClick={() => {
              props.deleteCard(info.id);
            }}
          />
        </div>
      )}
      <div className="card-header">
        <div>
          <a href={info.html_url} target="_blank" rel="noopener noreferrer">
            {info.full_name}
          </a>
        </div>
        <img src={info.owner.avatar_url} />
      </div>
      <div
        className={`item ${classes.language}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.LANGUAGE })}
        onMouseLeave={() => dispatch({})}
      >
        <div className="label">
          <i className="fa fa-language" aria-hidden="true"></i>
          Language
        </div>
        {info.language || "Not available"}
      </div>
      <div
        className={`item ${classes.stars}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.STARS })}
        onMouseLeave={() => dispatch({})}
      >
        <div className="label">
          <i className="fa fa-star" aria-hidden="true"></i>
          Stars
        </div>
        {info.stargazers_count}
      </div>
      <div
        className={`item ${classes.forks}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.FORKS })}
        onMouseLeave={() => dispatch({})}
      >
        <div className="label">
          <i className="fa fa-code-fork" aria-hidden="true"></i>
          Forks
        </div>
        {info.forks}
      </div>
      <div
        className={`item ${classes.openIssue}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.OPEN_ISSUES })}
        onMouseLeave={() => dispatch({})}
      >
        <div className="label">
          <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
          Open issues
        </div>
        {info.open_issues_count}
      </div>
      <div
        className={`item ${classes.createdAt}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.CREATED_AT })}
        onMouseLeave={() => dispatch({})}
      >
        <div className="label">
          <i className="fa fa-birthday-cake" aria-hidden="true"></i>
          Created At
        </div>
        <Moment fromNow interval={2000}>
          {info.created_at}
        </Moment>
      </div>
      <div
        className={`item ${classes.lastUpdated}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.LAST_UPDATED })}
        onMouseLeave={() => dispatch({})}
      >
        <div className="label">
          <i className="fa fa-wrench" aria-hidden="true"></i>
          Last update
        </div>
        <Moment fromNow interval={2000}>
          {info.updated_at}
        </Moment>
      </div>
    </div>
  ));
};
