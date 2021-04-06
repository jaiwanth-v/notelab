import uuid from "../Utils/randomIdGenerator";

const defaultState = {
  notebooks: [
    {
      title: "Welcome",
      id: uuid(),
      notes: [],
    },
  ],
  activeNote: null,
  activeNotebook: null,
  activeContent: null,
  activeNoteTitle: null,
};

export default defaultState;
