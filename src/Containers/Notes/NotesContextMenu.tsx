import React, { useState } from "react";
import useContextMenu from "../../Hooks/useContextMenu";
import ConfirmDelete from "./Modals/ConfirmDeleteNote";
import RenameNoteModal from "./Modals/RenameNoteModal";

interface Props {
  outerRef: any;
}

const NotesContextMenu: React.FC<Props> = ({ outerRef }) => {
  const { xPos, yPos, menu, id, name } = useContextMenu(
    outerRef,
    ".notes-list-item"
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
      <RenameNoteModal show={showModal} closeModal={closeModal} id={id} />
      <ConfirmDelete
        show={showConfirmation}
        closeModal={closeConfirmation}
        id={id}
        name={name}
      />
      {menu ? (
        <ul className="context-menu" style={{ top: yPos, left: xPos }}>
          <li onClick={() => setShow(true)}>Rename Note</li>
          <li onClick={() => setConfirmation(true)}>Delete Note</li>
        </ul>
      ) : null}
    </>
  );
};

export default NotesContextMenu;
