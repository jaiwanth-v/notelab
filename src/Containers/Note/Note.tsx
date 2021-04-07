/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./Note.scss";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useDispatch, useSelector } from "react-redux";
import { StateType, sync, Types, url, token } from "../../Redux/Reducer";
import Toolbar from "./MarkdownHelpers/Toolbar";
import MarkdownViewer from "../../Components/MarkdownViewer";
import Dialog from "../../Components/Dialog/Dialog";
import axios from "axios";
require("codemirror/lib/codemirror.css");
require("codemirror/mode/markdown/markdown.js");

interface Props {}
const Note: React.FC<Props> = () => {
  const [editMode, setEditMode] = useState(false);
  const [readerMode, setReaderMode] = useState(false);
  const activeContent: any = useSelector(
    (state: StateType) => state.activeContent
  );
  const activeNoteTitle = useSelector(
    (state: StateType) => state.activeNoteTitle
  );
  const activeNote = useSelector((state: StateType) => state.activeNote);
  const [showToolbar, setToolbar] = useState(false); //to trigger a rerender on editor mount
  const [showCollab, setCollabModal] = useState(false);
  const [collaborating, setCollaborating] = useState(false);
  const cmRef: any = useRef();

  const dispatch = useDispatch();
  const onToggleEditMode = () => {
    const newEditModeState = !editMode;
    const newReaderModeState = newEditModeState ? false : readerMode;
    setReaderMode(newReaderModeState);
    setEditMode(newEditModeState);
  };

  const onToggleReaderMode = () => {
    const newReaderModeState = !readerMode;
    const newEditModeState = newReaderModeState ? false : editMode;
    setReaderMode(newReaderModeState);
    setEditMode(newEditModeState);
  };

  const handleChange = (editor: any, data: any, value: string) => {
    if (sync) {
      axios.put(
        `${url}/notes/${activeNote}`,
        {
          body: value,
        },
        { params: { token } }
      );
    }
    dispatch({ type: Types.setContent, payload: { body: value } });
  };

  const handleCollaboration = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (collaborating) {
      setCollaborating(false);
      return;
    }
    e.preventDefault();
    try {
      await axios.post(
        `https://joplin-server.eu-gb.cf.appdomain.cloud/${activeNote}`,
        {
          content: activeContent,
        }
      );
      setCollaborating(true);
      const newWindow = window.open(
        `http://localhost:3000/live/${activeNote}`,
        "_blank",
        "noopener,noreferrer"
      );
      if (newWindow) newWindow.opener = null;
    } catch (err) {
      alert(
        "Some error occured please try later, probably the server is down."
      );
      setCollaborating(false);
      console.log("Error");
    }
  };

  const closeCollab = () => {
    setCollabModal(false);
  };

  let isPreviewScrolling = useRef(false),
    isEditorScrolling = useRef(false);
  let previewElm = document.querySelector(".markdown-body");
  let editorElm = document.querySelector(".CodeMirror-vscrollbar");
  useEffect(() => {
    function onEditorScroll(e: any) {
      if (!isEditorScrolling.current) {
        isPreviewScrolling.current = true;
        if (!previewElm) previewElm = document.querySelector(".markdown-body");
        previewElm!.scrollTop = e.target.scrollTop;
      }
      isEditorScrolling.current = false;
    }

    function onPreviewScroll(e: any) {
      if (!isPreviewScrolling.current) {
        isEditorScrolling.current = true;
        if (!editorElm)
          editorElm = document.querySelector(".CodeMirror-vscrollbar");
        editorElm!.scrollTop = e.target.scrollTop;
      }
      isPreviewScrolling.current = false;
    }
    if (!previewElm) {
      previewElm = document.querySelector(".markdown-body");
    }
    if (!editorElm) {
      editorElm = document.querySelector(".CodeMirror-vscrollbar");
    }
    previewElm!.addEventListener("scroll", onPreviewScroll);
    editorElm!.addEventListener("scroll", onEditorScroll);
    return () => {
      if (previewElm)
        previewElm!.removeEventListener("scroll", onPreviewScroll);
      if (editorElm) editorElm!.removeEventListener("scroll", onEditorScroll);
    };
  }, [editorElm, previewElm]);

  return activeContent === null ? (
    <div className="null-editor" />
  ) : (
    <div className="note-editor">
      <h3
        className="note-header"
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onBlur={(e) => {
          dispatch({
            type: Types.renameNote,
            payload: { title: e.currentTarget.textContent, id: activeNote },
          });
        }}
      >
        {activeNoteTitle}
      </h3>
      <Dialog
        visible={showCollab}
        closeDialog={closeCollab}
        closeButtonVisibility={!collaborating}
      >
        <h2> Live Collaboration </h2>
        <h5> You can invite people to this note to collaborate with you. </h5>
        <button
          className={`btn ${collaborating ? "btn-danger" : "btn-light"} `}
          onClick={handleCollaboration}
        >
          {!collaborating ? (
            <>
              <i className="far fa-play-circle" /> Start Session{" "}
            </>
          ) : (
            <>
              <i className="far fa-stop-circle" /> Stop Collaborating
            </>
          )}
        </button>
      </Dialog>
      <div className="note-toolbar">
        {!readerMode && showToolbar && <Toolbar cmRef={cmRef.current} />}
        <div className="view-modes">
          <i
            onClick={() => setCollabModal(true)}
            className="fas fa-user-friends"
            title="Start Collaboration"
          ></i>
          <i
            className={`fas fa-eye navbar-wrapper-icon ${
              readerMode ? "active" : ""
            }`}
            onClick={onToggleReaderMode}
            title="Reader mode"
          ></i>
          <i
            className={`fas fa-pencil-alt navbar-wrapper-icon" ${
              editMode ? "active" : ""
            }`}
            onClick={onToggleEditMode}
            title="Edit mode"
          ></i>
        </div>
      </div>
      <div className="workspace">
        {!readerMode ? (
          <CodeMirror
            className="code-mirror cm-m-markdown"
            value={activeContent}
            editorDidMount={(editor) => {
              cmRef.current = editor;
              setToolbar(true);
            }}
            options={{
              mode: "markdown",
              lineWrapping: true,
              lineNumbers: false,
              autofocus: true,
            }}
            onBeforeChange={handleChange}
          />
        ) : null}
        {!editMode ? <MarkdownViewer>{activeContent}</MarkdownViewer> : null}
      </div>
    </div>
  );
};

export default Note;
