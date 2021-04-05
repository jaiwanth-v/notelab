import React from "react";
import Editor from "./Note/Note";
import Notebooks from "./Notebooks/Notebooks";
import Notes from "./Notes/Notes";

const Joplin: React.FC = () => {
  return (
    <>
      <Notebooks />
      <Notes />
      <Editor />
    </>
  );
};

export default Joplin;
