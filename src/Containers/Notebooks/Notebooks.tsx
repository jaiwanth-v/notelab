import React, { useRef, useState } from "react";
import "./Notebooks.scss";
import ResizeBar from "../../Components/ResizeBar/ResizeBar";
import { useDispatch, useSelector } from "react-redux";
import { StateType, Types } from "../../Redux/Reducer";
import NotebooksContextMenu from "./NotebooksContextMenu";
import CreateNotebookModal from "./Modals/CreateNotebookModal";
import uuid from "../../Utils/randomIdGenerator";
interface Props {}

const Notebooks: React.FC<Props> = () => {
  const notebooks = useSelector((state: StateType) => state.notebooks);
  const activeNotebook = useSelector(
    (state: StateType) => state.activeNotebook
  );
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const outerRef = useRef(null);

  const createNotebook = (notebookName: string) => {
    if (!notebookName) return;
    const newId = uuid();
    dispatch({
      type: "CREATE_NOTEBOOK",
      payload: { title: notebookName, id: newId },
    });
    closeModal();
  };
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };

  const setActiveNotebook = async (id: string) => {
    if (activeNotebook === id) return;
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

        <div className="notebooks-list" ref={outerRef}>
          <NotebooksContextMenu outerRef={outerRef} />
          <CreateNotebookModal
            closeModal={closeModal}
            createNotebook={createNotebook}
            show={modal}
          />
          {notebooks.map((notebook) => (
            <div
              id={notebook.id}
              key={notebook.id}
              className={`list-notebook ${
                activeNotebook === notebook.id ? "active" : ""
              }`}
              onClick={() => setActiveNotebook(notebook.id)}
            >
              {notebook.title}
            </div>
          ))}
        </div>
      </div>
      <ResizeBar index={0} />
    </>
  );
};

export default Notebooks;
