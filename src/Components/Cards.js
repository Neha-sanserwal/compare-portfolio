import React from "react";

export default (props) => {
  return props.cards.map((info) => (
    <div key={info.id}>
      <h3>{info.full_name}</h3>
      <img src={info.owner.avatar_url} />
      language: <div className="item">{info.language}</div>
      forks: <div className="item">{info.forks}</div>
      issues: <div className="item">{info.open_issues_count}</div>
    </div>
  ));
};
