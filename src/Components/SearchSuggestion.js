import React from "react";

export default (props) => {
  if (!props.list.length) {
    return <div></div>;
  }
  const list = props.list.map((repo, index) => (
    <div
      className="suggestion-item"
      key={repo.id}
      onClick={() => {
        props.handleClick(repo.id);
      }}
    >
      <div className="item-name"> {repo.full_name}</div>
      <div className="item-img">
        <img alt={repo.name} src={repo.owner.avatar_url} />
      </div>
    </div>
  ));
  return <div className="suggestion-box">{list}</div>;
};
