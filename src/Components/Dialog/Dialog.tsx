import React from "react";
import "./Dialog.scss";
interface Props {
  visible: boolean;
  closeDialog: () => void;
}

const Dialog: React.FC<Props> = ({ children, visible, closeDialog }) => {
  return (
    <div className={`cd-popup ${visible ? "is-visible" : null}`} role="alert">
      <div className="cd-popup-container">
        {children}
        <i
          onClick={closeDialog}
          className="fas fa-times cd-popup-close img-replace"
        ></i>
      </div>
    </div>
  );
};

export default Dialog;
