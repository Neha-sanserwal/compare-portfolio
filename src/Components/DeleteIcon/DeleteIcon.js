import React from "react";
import styled from "styled-components";

const DltIcon = styled.div`
  position: absolute;
  font-size: 2rem;
  top: -1rem;
  right: -0.5rem;
  color: #c0c0c091;
  &:hover {
    color: #f5494a;
  }
`;

export default (props) => {
  const { handleClick } = props;
  return (
    <DltIcon onClick={handleClick}>
      <i className="fa fa-times-circle" aria-hidden="true"></i>
    </DltIcon>
  );
};
