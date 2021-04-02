import React, { ChangeEvent, FormEvent, useState } from "react";
import "./Notes.scss";
import ResizeBar from "../../Components/ResizeBar/ResizeBar";
import { useDispatch, useSelector } from "react-redux";
import { getIndex, StateType, Types } from "../../Redux/Reducer";
import Modal from "../../Components/Modal/Modal";
interface Props {}

const Notes: React.FC<Props> = () => {
  const notebooks = useSelector((state: StateType) => state.notebooks);
  const activeNotebook = useSelector(
    (state: StateType) => state.activeNotebook
  );
  const activeNote = useSelector((state: StateType) => state.activeNote);
  const notebookIdx = getIndex(activeNotebook, notebooks);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [noteType, setNoteType] = useState("");
  const [noteName, setNoteName] = useState("");

  const setActiveNote = (id: string) => {
    if (id !== activeNote) dispatch({ type: Types.setNote, payload: { id } });
  };
  const createNote = (e: FormEvent<HTMLFormElement>) => {
    if (activeNotebook === null) return;
    e.preventDefault();
    if (!noteName) return;
    dispatch({
      type: Types.createNote,
      payload: { name: noteName, isTodo: noteType === "todo" },
    });
    setNoteName("");
    closeModal();
  };
  const openModal = (text: string) => {
    if (activeNotebook === null) return;
    setNoteType(text);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleModalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteName(e.target.value);
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: Types.toggleTodo, payload: { id } });
  };

  const NotesList = () => {
    const notes = notebookIdx !== -1 ? notebooks[notebookIdx].notes : null;
    if (notes) {
      return (
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id}>
              {note.isTodo ? (
                <div
                  className={`list-todo ${
                    activeNote === note.id ? "active" : ""
                  } ${note.done ? "todo-done" : ""} `}
                  onClick={() => setActiveNote(note.id)}
                >
                  <input
                    type="checkbox"
                    onChange={() => toggleTodo(note.id)}
                    checked={note.done}
                  />
                  <p>{note.name}</p>
                </div>
              ) : (
                <div
                  className={`list-note ${
                    activeNote === note.id ? "active" : ""
                  }`}
                  onClick={() => setActiveNote(note.id)}
                >
                  <p>{note.name}</p>
                </div>
              )}
              <hr />
            </div>
          ))}
        </div>
      );
    } else return null;
  };

  return (
    <>
      <div className="notes">
        <div className="d-flex">
          <form className="form-inline search-bar expand">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="searchbar-input"
                placeholder="Search..."
                autoComplete="off"
              />
              <button className="btn btn-primary">
                <i className="fas fa-search"></i>
              </button>
              <i
                onClick={() => openModal("todo")}
                className="far fa-check-square"
              ></i>
              <i
                onClick={() => openModal("note")}
                className="far fa-sticky-note"
              ></i>
            </div>
          </form>
        </div>
        {activeNotebook === null ? (
          <p className="notes-info">
            There is currently no notebook. Create one by clicking on "+" icon
          </p>
        ) : !notebooks[notebookIdx].notes.length ? (
          <p className="notes-info">
            No notes in here. Create one by clicking on "Note" or "Todo" icon
          </p>
        ) : null}
        <NotesList />
        <Modal show={modal}>
          <form onSubmit={createNote}>
            <div className="modal-form">
              <p>{noteType === "todo" ? "Todo Name: " : "Note Name: "}</p>
              <input
                type="text"
                autoFocus
                value={noteName}
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

        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="hide"
        >
          <symbol id="glass" viewBox="0 0 13 13">
            <path
              d="M5.043 8.534a3.501 3.501 0 0 1-3.491-3.491 3.501 3.501 0 0 1 3.49-3.491 3.501 3.501 0 0 1 3.492 3.49 3.501 3.501 0 0 1-3.491 3.492m7.447 2.25L9.077 8.068a5.062 5.062 0 0 0 1.008-3.025A5.058 5.058 0 0 0 5.043 0 5.058 5.058 0 0 0 0 5.043a5.058 5.058 0 0 0 5.043 5.042 5.062 5.062 0 0 0 3.025-1.008l2.716 3.413c.659.699 1.474.524 1.88 0 .428-.523.525-1.047-.174-1.706"
              fillRule="evenodd"
            ></path>
          </symbol>
        </svg>
      </div>
      <ResizeBar index={1} />
    </>
  );
};

export default Notes;
