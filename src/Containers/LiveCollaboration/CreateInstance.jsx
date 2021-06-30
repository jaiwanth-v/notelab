import * as Y from "yjs";
import CodeMirror from "codemirror";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";
import { Types } from "../../Redux/Reducer";
require("codemirror/lib/codemirror.css");
require("codemirror/mode/markdown/markdown.js");

const CreateInstance = (dispatch, id, username, mode) => {
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider(
    `wss://notelia-server.eu-gb.cf.appdomain.cloud:443`,
    id,
    ydoc
  );
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

export default CreateInstance;
