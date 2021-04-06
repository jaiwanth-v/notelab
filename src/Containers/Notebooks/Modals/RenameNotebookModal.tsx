import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../Components/Modal/Modal";
import { sync, token, Types, url } from "../../../Redux/Reducer";

interface Props {
  show: boolean;
  id: string;
  closeModal: any;
}

const RenameNotebookModal: React.FC<Props> = ({ show, closeModal, id }) => {
  const [notebookName, setNotebookName] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNotebookName(e.target.value);
  };
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sync) {
      axios.put(
        `${url}/folders/${id}`,
        {
          title: notebookName,
        },
        { params: { token } }
      );
    }
    dispatch({
      type: Types.renameNotebook,
      payload: { id, title: notebookName },
    });
    setNotebookName("");
    closeModal();
  };

  return (
    <Modal show={show}>
      <form onSubmit={handleSubmit}>
        <div className="modal-form">
          <p>New Notebook Title:</p>
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

export default RenameNotebookModal;
