import React, { useEffect, useRef, useState } from "react";
import "./Note.scss";
import defaultText from "./defaultText";
import { Controlled as CodeMirror } from "react-codemirror2";
import MarkdownViewer from "./MarkdownViewer";
import { useDispatch, useSelector } from "react-redux";
import { StateType, Types } from "../../Redux/Reducer";
require("codemirror/lib/codemirror.css");
require("codemirror/mode/markdown/markdown.js");

interface Props {}
const Note: React.FC<Props> = () => {
  const [editMode, setEditMode] = useState(false);
  const [readerMode, setReaderMode] = useState(false);
  const activeContent: any = useSelector(
    (state: StateType) => state.activeContent
  );
  const [markdownText, setMarkdownText] = useState(
    activeContent ? activeContent : ""
  );
  const dispatch = useDispatch();
  console.log(activeContent);
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

  const editModeClassName =
    "fas fa-pencil-alt navbar-wrapper-icon" + (editMode ? " choosen" : "");
  const readerModeClassName =
    "fas fa-eye navbar-wrapper-icon" + (readerMode ? " choosen" : "");
  const previewClassName =
    "preview " + (readerMode ? "center" : editMode ? "hide" : "");

  return activeContent === null ? (
    <div className="null-editor" />
  ) : (
    <div className="note-editor">
      {/* <nav className="navbar">
        <div className="navbar-wrapper">
          <i
            className={editModeClassName}
            onClick={onToggleEditMode}
            title="Edit mode"
          ></i>
          <i
            className={readerModeClassName}
            onClick={onToggleReaderMode}
            title="Reader mode"
          ></i>
        </div>
      </nav> */}
      <div className="workspace">
        <CodeMirror
          autoScroll
          className="code-mirror cm-m-markdown"
          value={activeContent}
          options={{
            mode: "markdown",
            lineWrapping: true,
            lineNumbers: false,
          }}
          onBeforeChange={(editor, data, value) => {
            console.log(data, value);
            dispatch({ type: Types.setContent, payload: { content: value } });
          }}
          onChange={(editor, data, value) => {}}
        />
        <MarkdownViewer>{activeContent}</MarkdownViewer>
      </div>
    </div>
  );
};

export default Note;
