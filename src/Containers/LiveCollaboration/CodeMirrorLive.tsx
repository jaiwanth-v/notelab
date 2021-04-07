import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import "./CodeMirrorLive.scss";
import CodeEditor from "./CreateInstance";
import LiveMarkdownContent from "./LiveMarkdownContent";
import MembersInformation from "./MembersInformation";
import NameForm from "./NameForm";
require("codemirror/lib/codemirror.css");
require("codemirror/mode/markdown/markdown.js");

interface Props {
  userName?: string;
}

const CodeMirrorEditor: React.FC<Props> = ({ userName = "R" }) => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isNew, setNew] = useState(
    window.localStorage.getItem("joplin-name") === null
  );
  const dispatch = useDispatch();
  const toggleNew = () => {
    setNew(false);
  };
  useEffect(() => {
    document.title = "Live Collaboration";
    if (!isNew) {
      CodeEditor(
        dispatch,
        roomId,
        window.localStorage.getItem("joplin-name"),
        "markdown"
      );
    }
  }, [dispatch, isNew, roomId]);
  return isNew ? (
    <NameForm toggleNew={toggleNew} />
  ) : (
    <div>
      <header className="collab-title">
        <MembersInformation />
        <h4>
          This is a collaborative editor. Share this website url to your friends
          or team members to start collaborating.
        </h4>
      </header>
      <div className="collab-workspace">
        <div className="code-mirror" id="live-editor" />
        <LiveMarkdownContent />
      </div>
    </div>
  );
};

export default CodeMirrorEditor;
