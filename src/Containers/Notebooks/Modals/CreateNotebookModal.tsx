import React, { ChangeEvent, FormEvent, useState } from "react";
import Modal from "../../../Components/Modal/Modal";

interface Props {
  show: boolean;
  createNotebook: any;
  closeModal: any;
}

const CreateNotebookModal: React.FC<Props> = ({
  show,
  closeModal,
  createNotebook,
}) => {
  const [notebookName, setNotebookName] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNotebookName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNotebook(notebookName);
    setNotebookName("");
  };

  return (
    <Modal show={show}>
      <form onSubmit={handleSubmit}>
        <div className="modal-form">
          <p>Notebook Title:</p>
          <input
            type="text"
            value={notebookName}
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

export default CreateNotebookModal;
