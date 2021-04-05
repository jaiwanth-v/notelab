import React, { useState } from "react";
import useContextMenu from "../../Hooks/useContextMenu";
import ConfirmationModal from "./Modals/ConfirmationModal";
import RenameNotebookModal from "./Modals/RenameNotebookModal";

interface Props {
  outerRef: any;
}

const Menu: React.FC<Props> = ({ outerRef }) => {
  const { xPos, yPos, menu, id, name } = useContextMenu(
    outerRef,
    ".list-notebook"
  );
  const [showModal, setShow] = useState(false);
  const [showConfirmation, setConfirmation] = useState(false);
  const closeModal = () => {
    setShow(false);
  };

  const closeConfirmation = () => {
    setConfirmation(false);
  };

  return (
    <>
      <RenameNotebookModal show={showModal} closeModal={closeModal} id={id} />
      <ConfirmationModal
        show={showConfirmation}
        closeModal={closeConfirmation}
        id={id}
        name={name}
      />
      {menu ? (
        <ul className="context-menu" style={{ top: yPos, left: xPos }}>
          <li onClick={() => setShow(true)}>Rename Notebook</li>
          <li onClick={() => setConfirmation(true)}>Delete Notebook</li>
        </ul>
      ) : null}
    </>
  );
};

export default Menu;
