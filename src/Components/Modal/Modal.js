import React from "react";
import styled from "styled-components";
import Button from "../Button";
import DeleteIcon from "../DeleteIcon";
import "./modal.css";

const StyledModal = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  position: relative;
  background: white;
  min-width: 40rem;
  max-width: 62rem;
  min-height: 13rem;
  padding: 1rem;
  z-index: 101;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  padding: 5px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 0.5rem;
`;

const Modal = (props) => {
  const btnClasses = props.btnClasses || {};
  return props.isVisible ? (
    <StyledModal>
      <Popup>
        <Header>
          <h4 className="title">{props.text}</h4>
          <DeleteIcon handleClick={props.onCancel}></DeleteIcon>
        </Header>
        <Content>{props.children}</Content>
        <Footer>
          <Button
            classes={btnClasses.cancel || "btn theme-btn"}
            onClick={props.onCancel}
          >
            Cancel
          </Button>
          <Button
            classes={btnClasses.ok || "btn danger-btn"}
            onClick={props.onConfirm}
          >
            OK
          </Button>
        </Footer>
      </Popup>
    </StyledModal>
  ) : null;
};

export default Modal;
