import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../Components/Modal/Modal";
import { Types } from "../../../Redux/Reducer";

interface Props {
  show: boolean;
  id: string;
  closeModal: any;
}

const RenameNoteModal: React.FC<Props> = ({ show, closeModal, id }) => {
  const [noteName, setNoteName] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteName(e.target.value);
  };
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: Types.renameNote,
      payload: { id, name: noteName },
    });
    setNoteName("");
    closeModal();
  };

  return (
    <Modal show={show}>
      <form onSubmit={handleSubmit}>
        <div className="modal-form">
          <p>New Note Title:</p>
          <input
            type="text"
            value={noteName}
            onChange={handleChange}
            className="form-control"
            autoFocus
          />
        </div>
        <p style={{ marginTop: "4px", textAlign: "end", fontSize: "14px" }}>
          (You can also rename from the note's header)
        </p>
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

export default RenameNoteModal;
