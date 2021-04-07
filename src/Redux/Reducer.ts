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
  populateState = "POPULATE_STATE",
}

export type Note = {
  title: string;
  id: string;
  is_todo: boolean;
  todo_completed: boolean;
  body: string;
};

type Notebook = {
  title: string;
  id: string;
  notes: Note[];
};

export type StateType = {
  notebooks: Notebook[];
  activeNotes?: Note[];
  activeNotebook: string | null;
  activeNote: string | null;
  activeContent: string | null;
  activeNoteTitle: string | null;
};

export var sync = window.localStorage.getItem("joplin-sync") === "on";
export var token = window.localStorage.getItem("joplin-token");
export var url = window.localStorage.getItem("joplin-url");

export function getIndex(id: string | null, array: any): number {
  if (!id || !array) return -1;
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
  let { activeNote, activeNotebook, activeContent, activeNoteTitle } = state;
  let { activeNotes }: any = state;
  if (type === Types.populateState) {
    sync = true;
    token = window.localStorage.getItem("joplin-token");
    url = window.localStorage.getItem("joplin-url");
    return {
      ...state,
      notebooks: payload.notebooks,
      activeNotes: payload.activeNotes,
      activeContent: payload.activeContent,
      activeNote: payload.activeNote,
      activeNotebook: payload.activeNotebook,
      activeNoteTitle: payload.activeNoteTitle,
    };
  }
  if (type === Types.createNotebook) {
    activeNote = null;
    updatedNotebooks.push({
      id: payload.id,
      title: payload.title,
      notes: [],
    });
    return {
      ...state,
      notebooks: updatedNotebooks,
      activeNotebook: payload.id,
      activeNote,
      activeNotes: [],
      activeContent: null,
      activeNoteTitle: null,
    };
  }
  if (type === Types.setNotebook) {
    if (sync) {
      let activeNotes: Note[] = [];
      activeNotes = payload.activeNotes;
      return {
        ...state,
        activeNotes,
        activeNotebook: payload.id,
        activeNote: activeNotes.length ? activeNotes[0].id : null,
        activeNoteTitle: activeNotes.length ? activeNotes[0].title : null,
      };
    }
    let updateNotebookIdx = getIndex(payload.id, updatedNotebooks);
    let newActiveNote = updatedNotebooks[updateNotebookIdx].notes.length
      ? updatedNotebooks[updateNotebookIdx].notes[0]
      : null;
    return {
      ...state,
      activeNotebook: payload.id,
      activeNote: newActiveNote ? newActiveNote.id : null,
      activeContent: newActiveNote ? newActiveNote.body : null,
      activeNoteTitle: newActiveNote ? newActiveNote.title : null,
    };
  }

  let notebookIdx = getIndex(activeNotebook, state.notebooks);
  let noteIdx =
    notebookIdx !== -1
      ? getIndex(
          activeNote,
          sync ? activeNotes : state.notebooks[notebookIdx].notes
        )
      : -1;

  if (type === Types.setContent) {
    if (!sync) updatedNotebooks[notebookIdx].notes[noteIdx].body = payload.body;

    return {
      ...state,
      notebooks: updatedNotebooks,
      activeContent: payload.body,
    };
  }
  if (type === Types.renameNote) {
    let renameNoteIdx = getIndex(
      payload.id,
      sync ? activeNotes : updatedNotebooks[notebookIdx].notes
    );
    if (sync) {
      activeNotes[renameNoteIdx].title = payload.title;
      return {
        ...state,
        activeNotes: [...activeNotes],
        activeNoteTitle: payload.title,
      };
    }
    updatedNotebooks[notebookIdx].notes[renameNoteIdx].title = payload.title;
    return {
      ...state,
      notebooks: [...updatedNotebooks],
    };
  }
  if (type === Types.renameNotebook) {
    let renameNotebookIdx = getIndex(payload.id, updatedNotebooks);
    updatedNotebooks[renameNotebookIdx].title = payload.title;
    return {
      ...state,
      notebooks: [...updatedNotebooks],
    };
  }
  if (type === Types.toggleTodo) {
    let toggledNoteIdx = getIndex(
      payload.id,
      sync ? activeNotes : updatedNotebooks[notebookIdx].notes
    );

    if (sync) {
      activeNotes[toggledNoteIdx].todo_completed = !activeNotes[toggledNoteIdx]
        .todo_completed;
      return { ...state, activeNotes: [...activeNotes] };
    }

    updatedNotebooks[notebookIdx].notes[
      toggledNoteIdx
    ].todo_completed = !updatedNotebooks[notebookIdx].notes[toggledNoteIdx]
      .todo_completed;
    return {
      ...state,
      notebooks: [...updatedNotebooks],
    };
  }
  if (type === Types.setNote) {
    let newActiveNoteIdx = getIndex(
      payload.id,
      sync ? activeNotes : updatedNotebooks[notebookIdx].notes
    );
    return {
      ...state,
      activeNote: payload.id,
      activeContent: sync
        ? activeNotes[newActiveNoteIdx].body
        : updatedNotebooks[notebookIdx].notes[newActiveNoteIdx].body,
      activeNoteTitle: sync
        ? activeNotes[newActiveNoteIdx].title
        : updatedNotebooks[notebookIdx].notes[newActiveNoteIdx].title,
    };
  } else if (type === Types.deleteNotebook) {
    updatedNotebooks = updatedNotebooks.filter(
      (notebook) => notebook.id !== payload.id
    );
    return {
      ...state,
      notebooks: [...updatedNotebooks],
      activeNote: payload.activeNote,
      activeNotebook: payload.activeNotebook,
      activeContent: payload.activeContent,
      activeNoteTitle: payload.activeNoteTitle,
    };
  } else if (type === Types.createNote) {
    activeNote = payload.id;
    activeContent = "";
    if (sync) {
      activeNotes.push({
        title: payload.title,
        id: payload.id,
        is_todo: payload.is_todo,
        todo_completed: false,
        body: "",
      });
    } else
      updatedNotebooks[notebookIdx].notes.push({
        title: payload.title,
        id: activeNote ? activeNote : "",
        is_todo: payload.is_todo,
        todo_completed: false,
        body: "",
      });
    return {
      ...state,
      notebooks: updatedNotebooks,
      activeNote,
      activeContent,
      activeNotes,
      activeNoteTitle: payload.title,
    };
  } else if (type === Types.deleteNote) {
    let notes = sync ? activeNotes : updatedNotebooks[notebookIdx].notes;
    let deleteIdx = getIndex(payload.id, notes);
    if (notes.length > 1) {
      if (deleteIdx === notes.length - 1) {
        activeNote = notes[deleteIdx - 1].id;
        activeContent = notes[deleteIdx - 1].body;
        activeNoteTitle = notes[deleteIdx - 1].title;
      } else {
        activeNote = notes[deleteIdx + 1].id;
        activeContent = notes[deleteIdx + 1].body;
        activeNoteTitle = notes[deleteIdx + 1].title;
      }
    } else activeNote = activeContent = activeNoteTitle = null;
    if (sync) {
      activeNotes.splice(deleteIdx, 1);
      return {
        ...state,
        activeNotes: [...activeNotes],
        activeNote,
        activeContent,
        activeNoteTitle,
      };
    }
    updatedNotebooks[notebookIdx].notes.splice(deleteIdx, 1);
    return {
      ...state,
      notebooks: [...updatedNotebooks],
      activeNote,
      activeContent,
      activeNoteTitle,
    };
  }
  return state;
};
