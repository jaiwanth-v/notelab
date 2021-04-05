import React from "react";
import "./Modal.scss";

interface Props {
  show: boolean;
}

const Modal: React.FC<Props> = ({ children, show }) => {
  return show ? (
    <div className="modal d-block">
      <div className="modal-container">{children}</div>
    </div>
  ) : null;
};

export default Modal;
