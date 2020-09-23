import React from "react";
import "./assets/css/modal.css";
const Modal = (props) => {
  return props.isVisible ? (
    <div className="modal">
      <div className="popup">
        <div className="header">
          <h4 className="title">{props.text}</h4>
          <button className="close" onClick={props.onCancel}>
            &times;
          </button>
        </div>
        {props.children}
        <div className="footer">
          <button className="btn theme-btn" onClick={props.onCancel}>
            Cancel
          </button>
          <button className="btn danger-btn" onClick={props.onConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
