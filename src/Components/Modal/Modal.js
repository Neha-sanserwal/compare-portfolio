import React from "react";
import Button from "../Button";
import "./modal.css";
const Modal = (props) => {
  const btnClasses = props.btnClasses || {};
  return props.isVisible ? (
    <div className="modal">
      <div className="popup">
        <div className="header">
          <h4 className="title">{props.text}</h4>
          <button className="close" onClick={props.onCancel}>
            &times;
          </button>
        </div>
        <div className="content">{props.children}</div>
        <div className="footer">
          <Button classes={btnClasses.cancel} onClick={props.onCancel}>
            Cancel
          </Button>
          <Button
            classes={btnClasses.ok || "btn danger-btn"}
            onClick={props.onConfirm}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
