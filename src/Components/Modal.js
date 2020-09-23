import React from "react";
import "./assets/css/modal.css";
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
          <button
            className={btnClasses.cancel || "btn theme-btn"}
            onClick={props.onCancel}
          >
            Cancel
          </button>
          <button
            className={btnClasses.ok || "btn danger-btn"}
            onClick={props.onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
