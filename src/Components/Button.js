import React from "react";

const Button = (props) => {
  return (
    <button
      className={`btn ${props.classes || "theme-btn"}`}
      onClick={props.onClick || null}
    >
      {props.children}
    </button>
  );
};

export default Button;
