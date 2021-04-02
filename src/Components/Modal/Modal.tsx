import React from "react";
import "./Modal.scss";

interface Props {
  show: boolean;
}

const Modal: React.FC<Props> = ({ children, show }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">{children}</div>
    </div>
  );
};

export default Modal;
