import React from "react";
import styled from "styled-components";
import "./button.css";
const ButtonType = {
  primary: "blueviolet",
  danger: "#f5494a",
};

const Btn = styled.button`
  border-radius: 5px;
  min-width: 8rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 700;
  background: none;
  cursor: pointer;
  border: ${(props) => `1px solid ${ButtonType[props.type] || "white"}`};
  padding: 0 0.5rem;
  color: ${(props) => ButtonType[props.type] || "white"};
  &:hover {
    background: ${(props) => ButtonType[props.type]};
    color: white;
    border: ${(props) => ButtonType[props.type]};
  }
`;

const Button = (props) => {
  return (
    <button className={props.classes} onClick={props.onClick || null}>
      {props.children}
    </button>
  );
};

export default Button;
