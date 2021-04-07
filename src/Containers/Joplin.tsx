import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loader/Loader";
import { Types } from "../Redux/Reducer";
import LoginForm from "./LoginForm/LoginForm";
import Editor from "./Note/Note";
import Notebooks from "./Notebooks/Notebooks";
import Notes from "./Notes/Notes";

const Joplin: React.FC = () => {
  const [isNew, setNew] = useState(
    window.localStorage.getItem("joplin-sync") === null
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const toggleNew = () => {
    setNew(false);
  };

  useEffect(() => {
    const fetchAndPopulate = async () => {
      const token = window.localStorage.getItem("joplin-token");
      const url = window.localStorage.getItem("joplin-url");
      try {
        const notebooksRes = await axios.get(`${url}/folders`, {
          params: { token },
        });
        const notebooks = notebooksRes.data.items;
        if (notebooks.length) {
          const notesRes = await axios.get(
            `${url}/folders/${notebooks[0].id}/notes`,
            {
              params: { token, fields: "id,title,body,is_todo,todo_completed" },
            }
          );
          const notes = notesRes.data.items;
          const activeNote = notes.length ? notes[0].id : null;
          const activeNoteTitle = notes.length ? notes[0].title : null;
          const activeContent = notes.length ? notes[0].body : null;
          dispatch({
            type: Types.populateState,
            payload: {
              notebooks,
              activeNotebook: notebooks[0].id,
              activeNotes: notes,
              activeNote,
              activeNoteTitle,
              activeContent,
            },
          });
        }
      } catch (err) {
        console.log(err);
        alert(
          "Error fetching data. Either the auth token is incorrect or the web clipper service isn't active"
        );
        window.localStorage.removeItem("joplin-sync");
        setNew(true);
      }
    };
    if (!isNew) {
      let sync = window.localStorage.getItem("joplin-sync") === "on";
      try {
      } catch (error) {}
      if (sync) {
        setLoading(true);
        fetchAndPopulate();
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  }, [dispatch, isNew]);

  return isNew ? (
    <LoginForm toggleNew={toggleNew} />
  ) : loading ? (
    <Loader />
  ) : (
    <>
      <Notebooks />
      <Notes />
      <Editor />
    </>
  );
};

export default Joplin;
