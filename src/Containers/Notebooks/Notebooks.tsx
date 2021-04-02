import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import "./Notebooks.scss";
import ResizeBar from "../../Components/ResizeBar/ResizeBar";
import { useDispatch, useSelector } from "react-redux";
import { StateType, Types } from "../../Redux/Reducer";
import Modal from "../../Components/Modal/Modal";
interface Props {}

const Notebooks: React.FC<Props> = () => {
  const notebooks = useSelector((state: StateType) => state.notebooks);
  const activeNotebook = useSelector(
    (state: StateType) => state.activeNotebook
  );
  const [notebookName, setNotebookName] = useState("");
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const inputRef: any = useRef(null);
  const createNotebook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!notebookName) return;
    dispatch({
      type: "CREATE_NOTEBOOK",
      payload: { name: notebookName },
    });
    closeModal();
    setNotebookName("");
  };
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };
  const handleModalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNotebookName(e.target.value);
  };

  const setActiveNotebook = (id: string) => {
    if (activeNotebook !== id)
      dispatch({ type: Types.setNotebook, payload: { id } });
  };

  return (
    <>
      <div className="notebooks">
        <header className="notebooks-header">
          <div className="notebooks-title">
            <i className="fas fa-book"></i>
            <h5>NOTEBOOKS</h5>
          </div>
          <i className="fas fa-plus" onClick={openModal}></i>
        </header>
        <Modal show={modal}>
          <form onSubmit={createNotebook}>
            <div className="modal-form">
              <p>Notebook Title:</p>
              <input
                ref={inputRef}
                type="text"
                value={notebookName}
                onChange={handleModalChange}
                className="form-control"
              />
            </div>
            <div className="modal-buttons">
              <button className="btn btn-light" type="submit">
                OK
              </button>
              <button
                className="btn btn-light"
                onClick={closeModal}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        {notebooks.map((notebook) => (
          <div
            key={notebook.id}
            className={`list-notebook ${
              activeNotebook === notebook.id ? "active" : ""
            }`}
            onClick={() => setActiveNotebook(notebook.id)}
          >
            {notebook.name}
          </div>
        ))}
      </div>
      <ResizeBar index={0} />
    </>
  );
};

export default Notebooks;
