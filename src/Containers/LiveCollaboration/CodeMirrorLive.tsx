import React, { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useParams } from "react-router-dom";

import MarkdownViewer from "../../Components/MarkdownViewer";
import "./CodeMirrorLive.scss";
require("codemirror/lib/codemirror.css");
require("codemirror/mode/markdown/markdown.js");

interface Props {
  userName?: string;
}

const CodeMirrorEditor: React.FC<Props> = ({ userName = "R" }) => {
  const [codeMirrorText, setCodeMirrorText] = useState("");
  const codeMirrorRef = useRef();

  const { roomId } = useParams<{ roomId: string }>();
  const handleChange = (value: string) => {
    setCodeMirrorText(value);
  };
  useEffect(() => {
    if (!codeMirrorRef.current) return;
    // A Yjs document holds the shared data
    const ydoc = new Y.Doc({
      meta: {
        cellId: roomId,
      },
    });

    const wsProvider = new WebsocketProvider(
      "ws://localhost:1234",
      roomId,
      ydoc
    );
    // Define a shared text type on the document
    const yText = ydoc.getText(`codemirror`);

    wsProvider.awareness.setLocalStateField("user", {
      name: "R",
      color: "#ffaabb",
    });
    const _codemirrorBinding = new CodemirrorBinding(
      yText,
      codeMirrorRef.current,
      wsProvider.awareness
    );

    wsProvider.on("status", (event: any) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });
    return () => {
      _codemirrorBinding.destroy();
      wsProvider.destroy();
    };
  }, [roomId, userName]);

  return (
    <div style={{ marginTop: "48px" }}>
      <div className="collab-workspace" style={{ width: "100vw" }}>
        <CodeMirror
          className="code-mirror"
          editorDidMount={(editor) => {
            codeMirrorRef.current = editor;
          }}
          value={codeMirrorText}
          onBeforeChange={(_editor, _data, value) => {
            handleChange(value);
          }}
          options={{
            lineNumbers: false,
            mode: "markdown",
          }}
        />
        <MarkdownViewer>{codeMirrorText}</MarkdownViewer>
      </div>
    </div>
  );
};

export default CodeMirrorEditor;
