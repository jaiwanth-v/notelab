import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import Dialog from "../../../Components/Dialog/Dialog";
import { Types } from "../../../Redux/Reducer";

interface Props {
  show: boolean;
  id: string;
  closeModal: any;
  name: string;
}

const ConfirmationModal: React.FC<Props> = ({ show, closeModal, id, name }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: Types.deleteNotebook,
      payload: { id },
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
