import React, { ChangeEvent, FormEvent, useState } from "react";
import Modal from "../../../Components/Modal/Modal";

interface Props {
  show: boolean;
  createNote: any;
  closeModal: any;
}

const CreateNoteModal: React.FC<Props> = ({ show, closeModal, createNote }) => {
  const [noteName, setNoteName] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNote(noteName);
    setNoteName("");
  };

  return (
    <Modal show={show}>
      <form onSubmit={handleSubmit}>
        <div className="modal-form">
          <p>Note Title:</p>
          <input
            type="text"
            value={noteName}
            onChange={handleChange}
            className="form-control"
            autoFocus
          />
        </div>
        <div className="modal-buttons">
          <button className="btn btn-light" type="submit">
            OK
          </button>
          <button className="btn btn-light" onClick={closeModal} type="button">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateNoteModal;
