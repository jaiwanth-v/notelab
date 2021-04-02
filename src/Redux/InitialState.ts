import { v4 as uuid } from "uuid";

const defaultState = {
  notebooks: [
    {
      name: "Welcome",
      id: uuid(),
      notes: [],
    },
  ],
  activeNote: null,
  activeNotebook: null,
  activeContent: null,
  activeNoteName: null,
};

export default defaultState;
