import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Types } from "../Redux/Reducer";
import Editor from "./Note/Note";
import Notebooks from "./Notebooks/Notebooks";
import Notes from "./Notes/Notes";

const Notelia: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const state = window.localStorage.getItem("notelia-state");
    if(state) {
      dispatch({
        type: Types.populateState,
        payload: JSON.parse(state),
      });
    }
  }, [dispatch]);

  return (
    <>
      <Notebooks />
      <Notes />
      <Editor />
    </>
  );
};

export default Notelia;
