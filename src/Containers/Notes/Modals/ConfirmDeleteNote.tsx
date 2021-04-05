import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../Components/Modal/Modal";
import { Types } from "../../../Redux/Reducer";

interface Props {
  show: boolean;
  id: string;
  closeModal: any;
  name: string;
}

const ConfirmDeleteNote: React.FC<Props> = ({ show, closeModal, id, name }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: Types.deleteNote,
      payload: { id },
    });
    closeModal();
  };

  return (
    <Modal show={show}>
      <div className="modal-form">
        <h5>Are you sure you want to delete note "{name}"?</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-buttons">
          <button className="btn btn-light" type="submit">
            Yes
          </button>
          <button className="btn btn-light" onClick={closeModal} type="button">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmDeleteNote;
