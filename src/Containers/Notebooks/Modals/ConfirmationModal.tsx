import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../../../Components/Dialog/Dialog";
import { getIndex, Types } from "../../../Redux/Reducer";

interface Props {
  show: boolean;
  id: string;
  closeModal: any;
  name: string;
}

const ConfirmationModal: React.FC<Props> = ({ show, closeModal, id, name }) => {
  const dispatch = useDispatch();
  const state: any = useSelector((state) => state);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let {
      activeNote,
      activeNotebook,
      activeContent,
      activeNoteTitle,
      notebooks,
    } = state;
    let activeNotes;
    let notebookIdx = getIndex(activeNotebook, notebooks);
    if (id === activeNotebook) {
      if (notebooks.length > 1) {
        if (notebookIdx === notebooks.length - 1) {
          activeNotebook = notebooks[notebookIdx - 1].id;
          activeNotes = notebooks[notebookIdx - 1].notes;
          activeNote = activeNotes.length ? activeNotes[0].id : null;
          activeContent = activeNote ? activeNotes[0].body : null;
          activeNoteTitle = activeNote ? activeNotes[0].title : null;
        } else {
          activeNotebook = notebooks[notebookIdx + 1].id;
          activeNotes = notebooks[notebookIdx + 1].notes;
          activeNote = activeNotes.length ? activeNotes[0].id : null;
          activeContent = activeNote ? activeNotes[0].body : null;
          activeNoteTitle = activeNote ? activeNotes[0].title : null;
        }
      } else
        activeNotebook = activeNote = activeContent = activeNoteTitle = null;
    }
    dispatch({
      type: Types.deleteNotebook,
      payload: {
        id,
        activeNotes,
        activeContent,
        activeNoteTitle,
        activeNote,
        activeNotebook,
      },
    });
    closeModal();
  };
  return (
    <Dialog visible={show} closeDialog={closeModal}>
      <h5 style={{ marginTop: "15px" }}>
        Are you sure you want to delete notebook "{name}"? <br /> All notes
        under this notebook will be deleted{" "}
      </h5>
      <form onSubmit={handleSubmit}>
        <button className="btn btn-danger" type="submit">
          Delete
        </button>
      </form>
    </Dialog>
  );
};

export default ConfirmationModal;
