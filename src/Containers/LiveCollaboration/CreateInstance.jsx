import * as Y from "yjs";
import CodeMirror from "codemirror";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";
import { sync, token, Types, url } from "../../Redux/Reducer";
import axios from "axios";
require("codemirror/lib/codemirror.css");
require("codemirror/mode/markdown/markdown.js");
const CodeEditor = (dispatch, id, username, mode) => {
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider("ws://localhost:1234", id, ydoc);
  const yText = ydoc.getText("codemirror");
  const editorContainer = document.getElementById("live-editor");
  const editor = new CodeMirror(editorContainer, {
    mode: mode,
    lineNumbers: false,
    lineWrapping: true,
  });
  const binding = new CodemirrorBinding(yText, editor, provider.awareness);
  binding.awareness.setLocalStateField("user", {
    color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
    name: username,
  });
  ydoc.on("update", () => {
    const body = ydoc.toJSON().codemirror.replace("↵", "\\n");
    if (sync) {
      axios.put(`${url}/notes/${id}`, { body }, { params: { token } });
    }
    dispatch({
      type: Types.setContent,
      payload: { body },
    });
  });
  const awareness = binding.awareness;
  awareness.on("change", () => {
    document.querySelector(
      ".members-info"
    ).innerHTML = `Number of people in this room: ${
      awareness.getStates().size
    }`;
  });
  if (id !== null) {
    provider.connect();
  } else {
    provider.disconnect();
  }
  return { provider, ydoc, yText, binding, Y };
};

export default CodeEditor;
