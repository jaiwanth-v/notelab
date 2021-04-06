import axios from "axios";
import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import Dialog from "../../../Components/Dialog/Dialog";
import { sync, token, Types, url } from "../../../Redux/Reducer";

interface Props {
  show: boolean;
  id: string;
  closeModal: any;
  name: string;
}

const ConfirmDeleteNote: React.FC<Props> = ({ show, closeModal, id, name }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sync) {
      axios.delete(`${url}/notes/${id}`, { params: { token } });
    }
    dispatch({
      type: Types.deleteNote,
      payload: { id },
    });
    closeModal();
  };

  return (
    <Dialog visible={show} closeDialog={closeModal}>
      <h5 style={{ marginTop: "15px" }}>
        Are you sure you want to delete the note "{name}"?
      </h5>
      <form onSubmit={handleSubmit}>
        <button className="btn btn-danger" type="submit">
          Delete
        </button>
      </form>
    </Dialog>
  );
};

export default ConfirmDeleteNote;
