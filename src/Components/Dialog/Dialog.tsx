import React from "react";
import "./Dialog.scss";
interface Props {
  visible: boolean;
  closeDialog: () => void;
  closeButtonVisibility?: boolean;
}

const Dialog: React.FC<Props> = ({
  children,
  visible,
  closeDialog,
  closeButtonVisibility,
}) => {
  return (
    <div className={`cd-popup ${visible ? "is-visible" : null}`} role="alert">
      <div className="cd-popup-container">
        {children}
        {closeButtonVisibility ? (
          <i
            onClick={closeDialog}
            className="fas fa-times cd-popup-close img-replace"
          ></i>
        ) : null}
      </div>
    </div>
  );
};

Dialog.defaultProps = {
  closeButtonVisibility: true,
};

export default Dialog;
