import { v4 as uuid } from "uuid";
import defaultState from "./InitialState";
export enum Types {
  createNotebook = "CREATE_NOTEBOOK",
  renameNotebook = "RENAME_NOTEBOOK",
  deleteNotebook = "DELETE_NOTEBOOK",
  createNote = "CREATE_NOTE",
  renameNote = "RENAME_NOTE",
  deleteNote = "DELETE_NOTE",
  setNote = "SET_NOTE",
  setNotebook = "SET_NOTEBOOK",
  setContent = "SET_CONTENT",
  toggleTodo = "TOGGLE_TODO",
}

type Note = {
  name: string;
  id: string;
  isTodo: boolean;
  done: boolean;
  content: string;
};

type Notebook = {
  name: string;
  id: string;
  notes: Note[];
};

export type StateType = {
  notebooks: Notebook[];
  activeNotebook: string | null;
  activeNote: string | null;
  activeContent: string | null;
  activeNoteName: string | null;
};

export function getIndex(id: string | null, array: any): number {
  if (!id) return -1;
  return array.findIndex((element: any) => element.id === id);
}
type Action = {
  type: string;
  payload: any;
};

const initialState: StateType = defaultState;

export const appReducer = (
  state: StateType = initialState,
  action: Action
): StateType => {
  const { type, payload } = action;

  let updatedNotebooks = state.notebooks;
  let { activeNote, activeNotebook, activeContent, activeNoteName } = state;
  if (type === Types.createNotebook) {
    activeNotebook = uuid();
    activeNote = null;
    updatedNotebooks.push({
      id: activeNotebook,
      name: payload.name,
      notes: [],
    });
    return {
      ...state,
      notebooks: updatedNotebooks,
      activeNotebook,
      activeNote,
      activeContent: null,
      activeNoteName: null,
    };
  }

  if (type === Types.setNotebook) {
    let updateNotebookIdx = getIndex(payload.id, updatedNotebooks);
    let newActiveNote = updatedNotebooks[updateNotebookIdx].notes.length
      ? updatedNotebooks[updateNotebookIdx].notes[0]
      : null;
    return {
      ...state,
      activeNotebook: payload.id,
      activeNote: newActiveNote ? newActiveNote.id : null,
      activeContent: newActiveNote ? newActiveNote.content : null,
      activeNoteName: newActiveNote ? newActiveNote.name : null,
    };
  }

  let notebookIdx = getIndex(activeNotebook, state.notebooks);
  let noteIdx =
    notebookIdx !== -1
      ? getIndex(activeNote, state.notebooks[notebookIdx].notes)
      : -1;
  if (type === Types.setContent) {
    updatedNotebooks[notebookIdx].notes[noteIdx].content = payload.content;
    return {
      ...state,
      notebooks: updatedNotebooks,
      activeContent: payload.content,
    };
  }
  if (type === Types.renameNote) {
    let renameNoteIdx = getIndex(
      payload.id,
      updatedNotebooks[notebookIdx].notes
    );
    updatedNotebooks[notebookIdx].notes[renameNoteIdx].name = payload.name;
    return {
      ...state,
      notebooks: [...updatedNotebooks],
    };
  }
  if (type === Types.renameNotebook) {
    let renameNotebookIdx = getIndex(payload.id, updatedNotebooks);
    updatedNotebooks[renameNotebookIdx].name = payload.name;
    return {
      ...state,
      notebooks: [...updatedNotebooks],
    };
  }
  if (type === Types.toggleTodo) {
    let toggledNoteIdx = getIndex(
      payload.id,
      updatedNotebooks[notebookIdx].notes
    );
    updatedNotebooks[notebookIdx].notes[
      toggledNoteIdx
    ].done = !updatedNotebooks[notebookIdx].notes[toggledNoteIdx].done;
    console.log(updatedNotebooks[notebookIdx].notes[toggledNoteIdx]);
    return {
      ...state,
      notebooks: [...updatedNotebooks],
    };
  }
  if (type === Types.setNote) {
    let newActiveNoteIdx = getIndex(
      payload.id,
      updatedNotebooks[notebookIdx].notes
    );
    return {
      ...state,
      activeNote: payload.id,
      activeContent:
        updatedNotebooks[notebookIdx].notes[newActiveNoteIdx].content,
      activeNoteName:
        updatedNotebooks[notebookIdx].notes[newActiveNoteIdx].name,
    };
  } else if (type === Types.deleteNotebook) {
    if (payload.id === activeNotebook) {
      if (updatedNotebooks.length > 1) {
        if (notebookIdx === updatedNotebooks.length - 1) {
          activeNotebook = updatedNotebooks[notebookIdx - 1].id;
          activeNote = updatedNotebooks[notebookIdx - 1].notes.length
            ? updatedNotebooks[notebookIdx - 1].notes[0].id
            : null;
          activeContent = activeNote
            ? updatedNotebooks[notebookIdx - 1].notes[0].content
            : null;
          activeNoteName = activeNote
            ? updatedNotebooks[notebookIdx - 1].notes[0].name
            : null;
        } else {
          activeNotebook = updatedNotebooks[notebookIdx + 1].id;
          activeNote = updatedNotebooks[notebookIdx + 1].notes.length
            ? updatedNotebooks[notebookIdx + 1].notes[0].id
            : null;
          activeContent = activeNote
            ? updatedNotebooks[notebookIdx + 1].notes[0].content
            : null;
          activeNoteName = activeNote
            ? updatedNotebooks[notebookIdx + 1].notes[0].name
            : null;
        }
      } else
        activeNotebook = activeNote = activeContent = activeNoteName = null;
    }
    updatedNotebooks = updatedNotebooks.filter(
      (notebook) => notebook.id !== payload.id
    );
    return {
      ...state,
      notebooks: updatedNotebooks,
      activeNote,
      activeNotebook,
      activeContent,
      activeNoteName,
    };
  } else if (type === Types.createNote) {
    activeNote = uuid();
    activeContent = "";
    updatedNotebooks[notebookIdx].notes.push({
      name: payload.name,
      id: activeNote,
      isTodo: payload.isTodo,
      done: false,
      content: "",
    });
    return {
      ...state,
      notebooks: updatedNotebooks,
      activeNote,
      activeContent,
      activeNoteName: payload.name,
    };
  } else if (type === Types.deleteNote) {
    let notes = updatedNotebooks[notebookIdx].notes;
    if (notes.length > 1) {
      if (noteIdx === notes.length - 1) {
        activeNote = notes[noteIdx - 1].id;
        activeContent = notes[noteIdx - 1].content;
        activeNoteName = notes[noteIdx - 1].name;
      } else {
        activeNote = notes[noteIdx + 1].id;
        activeContent = notes[noteIdx + 1].content;
        activeNoteName = notes[noteIdx + 1].name;
      }
    } else activeNote = activeContent = activeNoteName = null;
    updatedNotebooks[notebookIdx].notes.splice(noteIdx);
    return {
      ...state,
      notebooks: updatedNotebooks,
      activeNote,
      activeContent,
      activeNoteName,
    };
  }
  return state;
};
