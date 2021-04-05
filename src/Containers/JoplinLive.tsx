import React from "react";
import CodeMirrorEditor from "./LiveCollaboration/CodeMirrorLive";

interface Props {}

const JoplinLive: React.FC<Props> = () => {
  return <CodeMirrorEditor userName="Jaiwanth" />;
};

export default JoplinLive;
