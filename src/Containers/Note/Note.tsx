import React, { useEffect, useRef, useState } from "react";
import "./Note.scss";
// import defaultText from "./defaultText";
import { Controlled as CodeMirror } from "react-codemirror2";
import MarkdownViewer from "./MarkdownViewer";
import { useDispatch, useSelector } from "react-redux";
import { StateType, Types } from "../../Redux/Reducer";
import { getCursorState } from "./MarkdownHelpers/Formatting";
import Toolbar from "./MarkdownHelpers/Toolbar";
require("codemirror/lib/codemirror.css");
require("codemirror/mode/markdown/markdown.js");

interface Props {}
const Note: React.FC<Props> = () => {
  const [editMode, setEditMode] = useState(false);
  const [readerMode, setReaderMode] = useState(false);
  const activeContent: any = useSelector(
    (state: StateType) => state.activeContent
  );
  const activeNoteName = useSelector(
    (state: StateType) => state.activeNoteName
  );
  const [cs, setCs] = useState({});
  const cmRef = useRef();
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

  const updateCursorState = () => {
    setCs(getCursorState(cmRef.current));
  };

  let isPreviewScrolling = useRef(false),
    isEditorScrolling = useRef(false);
  let previewElm = document.querySelector(".markdown-body");
  let editorElm = document.querySelector(".CodeMirror-vscrollbar");
  useEffect(() => {
    function onEditorScroll(e: any) {
      if (!isEditorScrolling.current) {
        isPreviewScrolling.current = true;
        previewElm!.scrollTop = e.target.scrollTop;
      }
      isEditorScrolling.current = false;
    }

    function onPreviewScroll(e: any) {
      if (!isPreviewScrolling.current) {
        isEditorScrolling.current = true;
        editorElm!.scrollTop = e.target.scrollTop;
      }
      isPreviewScrolling.current = false;
    }
    if (previewElm) previewElm!.addEventListener("scroll", onPreviewScroll);
    if (editorElm) editorElm!.addEventListener("scroll", onEditorScroll);
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
        onInput={(e) =>
          dispatch({
            type: Types.renameNote,
            payload: { name: e.currentTarget.textContent },
          })
        }
      >
        {activeNoteName}
      </h3>
      <div className="note-toolbar">
        <Toolbar cmRef={cmRef.current} cs={cs} />
        <div className="view-modes">
          <i className="fas fa-user-friends" title="Start Collaboration"></i>
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
            autoScroll
            className="code-mirror cm-m-markdown"
            value={activeContent}
            editorDidMount={(editor) => (cmRef.current = editor)}
            options={{
              mode: "markdown",
              lineWrapping: true,
              lineNumbers: false,
            }}
            onBeforeChange={(editor, data, value) => {
              dispatch({ type: Types.setContent, payload: { content: value } });
            }}
            onCursorActivity={updateCursorState}
          />
        ) : null}
        {!editMode ? <MarkdownViewer>{activeContent}</MarkdownViewer> : null}
      </div>
    </div>
  );
};

export default Note;
